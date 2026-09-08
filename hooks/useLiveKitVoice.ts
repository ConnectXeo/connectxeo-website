"use client";

/**
 * useLiveKitVoice — connects browser to the Hermes LiveKit voice agent.
 *
 * Lifecycle:
 *   1. On mount: fetches token from /api/voice/token
 *   2. connect() → joins LiveKit room, publishes mic audio
 *   3. Listens for agent audio track + data messages (transcripts)
 *   4. disconnect() → cleans up
 *
 * Exposes state for the page: sessionState, messages, activeAgents, audioLevel, etc.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Room,
  RoomEvent,
  Track,
  ConnectionState,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
  LocalParticipant,
  Participant,
  DataPacket_Kind,
  DisconnectReason,
} from "livekit-client";
import type { TranscriptMessage } from "@/components/voice/TranscriptPanel";

export type SessionState =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "error";

interface UseLiveKitVoiceReturn {
  sessionState: SessionState;
  messages: TranscriptMessage[];
  activeAgents: string[];
  /** 0-1 local mic audio level for waveform */
  localAudioLevel: number;
  /** 0-1 agent audio level for waveform */
  agentAudioLevel: number;
  /** true when the agent is speaking (has audio track subscribed and active) */
  agentSpeaking: boolean;
  /** Connect mic → LiveKit room */
  connect: () => Promise<void>;
  /** Disconnect from room */
  disconnect: () => void;
  /** Error message if sessionState === "error" */
  error: string | null;
}

// ── Token fetcher ───────────────────────────────────────────────────────────

async function fetchToken(): Promise<{ token: string; url: string }> {
  const res = await fetch("/api/voice/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Token API returned ${res.status}`);
  }
  return res.json();
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useLiveKitVoice(): UseLiveKitVoiceReturn {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [localAudioLevel, setLocalAudioLevel] = useState(0);
  const [agentAudioLevel, setAgentAudioLevel] = useState(0);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomRef = useRef<Room | null>(null);
  const msgCountRef = useRef(0);
  const audioLevelIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  // ── Cleanup on unmount ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect(true);
        roomRef.current = null;
      }
      if (audioLevelIntervalRef.current) {
        clearInterval(audioLevelIntervalRef.current);
      }
    };
  }, []);

  // ── Parse transcript from data channel ──────────────────────────────────
  const handleDataReceived = useCallback(
    (
      payload: Uint8Array,
      participant?: RemoteParticipant,
      _kind?: DataPacket_Kind,
      topic?: string
    ) => {
      try {
        const text = new TextDecoder().decode(payload);

        // LiveKit Agents SDK sends transcription via the "lk-chat-message"
        // topic or the legacy "transcription" topic. Also handle plain text.
        let parsed: { message?: string; text?: string; role?: string } = {};
        try {
          parsed = JSON.parse(text);
        } catch {
          // plain text message
          parsed = { message: text };
        }

        const msgText = parsed.message || parsed.text || text;
        if (!msgText || msgText.trim().length === 0) return;

        const role =
          parsed.role === "user"
            ? "user"
            : participant
            ? "hermes"
            : "user";

        msgCountRef.current += 1;
        const msg: TranscriptMessage = {
          id: `msg-${msgCountRef.current}`,
          role,
          text: msgText.trim(),
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, msg]);
      } catch {
        // silently ignore malformed data
      }
    },
    []
  );

  // ── Handle LiveKit transcription events (Agents SDK v1.x) ──────────────
  const handleTranscription = useCallback(
    (
      segments: Array<{
        id: string;
        text: string;
        final: boolean;
        language?: string;
        startTime?: number;
        endTime?: number;
      }>,
      participant?: Participant
    ) => {
      for (const seg of segments) {
        if (!seg.text || seg.text.trim().length === 0) continue;
        // Only show final segments to avoid duplication
        if (!seg.final) continue;

        const isAgent =
          participant instanceof RemoteParticipant;
        const role: "user" | "hermes" = isAgent ? "hermes" : "user";

        msgCountRef.current += 1;
        const msg: TranscriptMessage = {
          id: `msg-${msgCountRef.current}`,
          role,
          text: seg.text.trim(),
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, msg]);
      }
    },
    []
  );

  // ── Audio level polling ─────────────────────────────────────────────────
  const startAudioLevelPolling = useCallback((room: Room) => {
    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
    }
    audioLevelIntervalRef.current = setInterval(() => {
      // Local mic level
      const localPub = room.localParticipant?.getTrackPublication(
        Track.Source.Microphone
      );
      if (localPub?.track) {
        // audioLevel is 0-1 from the SDK
        setLocalAudioLevel(room.localParticipant?.audioLevel ?? 0);
      } else {
        setLocalAudioLevel(0);
      }

      // Agent audio level — find the first remote participant (the agent)
      let agentLevel = 0;
      let speaking = false;
      for (const p of room.remoteParticipants.values()) {
        agentLevel = p.audioLevel ?? 0;
        speaking = p.isSpeaking;
        break; // only one agent
      }
      setAgentAudioLevel(agentLevel);
      setAgentSpeaking(speaking);
    }, 50); // 20 fps polling
  }, []);

  // ── Connect ─────────────────────────────────────────────────────────────
  const connect = useCallback(async () => {
    if (roomRef.current) {
      // already connected or connecting
      return;
    }

    setSessionState("connecting");
    setError(null);
    setMessages([]);
    setActiveAgents([]);
    msgCountRef.current = 0;

    try {
      // 1. Get token
      const { token, url } = await fetchToken();

      // 2. Create room
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        audioCaptureDefaults: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      roomRef.current = room;

      // 3. Wire events BEFORE connecting
      room.on(RoomEvent.DataReceived, handleDataReceived);
      room.on(
        RoomEvent.TranscriptionReceived,
        handleTranscription as (...args: unknown[]) => void
      );

      // Connection state changes
      room.on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
        if (state === ConnectionState.Disconnected) {
          setSessionState("idle");
          setActiveAgents([]);
          if (audioLevelIntervalRef.current) {
            clearInterval(audioLevelIntervalRef.current);
          }
          roomRef.current = null;
        }
      });

      // Track agent speaking state
      room.on(
        RoomEvent.ActiveSpeakersChanged,
        (speakers: Participant[]) => {
          const agentIsSpeaking = speakers.some(
            (s) => s instanceof RemoteParticipant
          );
          if (agentIsSpeaking) {
            setSessionState("speaking");
          } else if (room.state === ConnectionState.Connected) {
            setSessionState("listening");
          }
        }
      );

      // Track remote participants joining (agent joins room)
      room.on(
        RoomEvent.ParticipantConnected,
        (participant: RemoteParticipant) => {
          // Use participant identity/metadata to light up org map
          const meta = participant.metadata;
          if (meta) {
            try {
              const parsed = JSON.parse(meta);
              if (parsed.agents) setActiveAgents(parsed.agents);
            } catch {
              // metadata isn't JSON, use identity as agent label
              setActiveAgents([participant.identity]);
            }
          }
        }
      );

      room.on(RoomEvent.Disconnected, (_reason?: DisconnectReason) => {
        setSessionState("idle");
        setActiveAgents([]);
        setLocalAudioLevel(0);
        setAgentAudioLevel(0);
        setAgentSpeaking(false);
        if (audioLevelIntervalRef.current) {
          clearInterval(audioLevelIntervalRef.current);
        }
        roomRef.current = null;
      });

      // 4. Connect to LiveKit
      await room.connect(url, token);

      // 5. Publish mic
      await room.localParticipant.setMicrophoneEnabled(true);

      // 6. Start polling audio levels
      startAudioLevelPolling(room);

      // 7. Set to listening
      setSessionState("listening");

      // Light up the AI/ML department to show agent connection
      // Check if agent is already in the room
      for (const p of room.remoteParticipants.values()) {
        setActiveAgents(["AI / ML"]);
        // If participant has metadata, parse it
        if (p.metadata) {
          try {
            const parsed = JSON.parse(p.metadata);
            if (parsed.agents) setActiveAgents(parsed.agents);
          } catch {
            // fallback
          }
        }
        break;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection failed";
      setError(msg);
      setSessionState("error");
      roomRef.current = null;
    }
  }, [handleDataReceived, handleTranscription, startAudioLevelPolling]);

  // ── Disconnect ──────────────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.disconnect(true);
      // State resets happen in the Disconnected event handler
    }
    setSessionState("idle");
    setActiveAgents([]);
    setLocalAudioLevel(0);
    setAgentAudioLevel(0);
    setAgentSpeaking(false);
    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
    }
    roomRef.current = null;
  }, []);

  return {
    sessionState,
    messages,
    activeAgents,
    localAudioLevel,
    agentAudioLevel,
    agentSpeaking,
    connect,
    disconnect,
    error,
  };
}
