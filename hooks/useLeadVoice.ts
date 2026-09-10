"use client";

/**
 * useLeadVoice — browser ↔ LiveKit lead agent (Maya on contact page).
 * Unique room + agent dispatch come from POST /api/voice/token.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Room,
  RoomEvent,
  Track,
  ConnectionState,
  RemoteParticipant,
  Participant,
  DisconnectReason,
} from "livekit-client";

export type LeadSessionState =
  | "idle"
  | "connecting"
  | "listening"
  | "speaking"
  | "error";

export interface LeadTranscriptMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

interface UseLeadVoiceReturn {
  sessionState: LeadSessionState;
  messages: LeadTranscriptMessage[];
  localAudioLevel: number;
  agentAudioLevel: number;
  agentSpeaking: boolean;
  agentJoined: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
}

async function fetchToken(): Promise<{ token: string; url: string }> {
  const res = await fetch("/api/voice/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `Token API returned ${res.status}`
    );
  }
  return res.json();
}

export function useLeadVoice(): UseLeadVoiceReturn {
  const [sessionState, setSessionState] = useState<LeadSessionState>("idle");
  const [messages, setMessages] = useState<LeadTranscriptMessage[]>([]);
  const [localAudioLevel, setLocalAudioLevel] = useState(0);
  const [agentAudioLevel, setAgentAudioLevel] = useState(0);
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [agentJoined, setAgentJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomRef = useRef<Room | null>(null);
  const msgCountRef = useRef(0);
  const audioLevelIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

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

  const pushMessage = useCallback((role: "user" | "agent", text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    msgCountRef.current += 1;
    const msg: LeadTranscriptMessage = {
      id: `msg-${msgCountRef.current}`,
      role,
      text: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => {
      // de-dupe consecutive identical lines
      const last = prev[prev.length - 1];
      if (last && last.role === role && last.text === trimmed) return prev;
      return [...prev, msg];
    });
  }, []);

  const handleDataReceived = useCallback(
    (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const text = new TextDecoder().decode(payload);
        let parsed: { message?: string; text?: string; role?: string } = {};
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = { message: text };
        }
        const msgText = parsed.message || parsed.text || text;
        if (!msgText?.trim()) return;
        const role: "user" | "agent" =
          parsed.role === "user" ? "user" : participant ? "agent" : "user";
        pushMessage(role, msgText);
      } catch {
        // ignore
      }
    },
    [pushMessage]
  );

  const handleTranscription = useCallback(
    (
      segments: Array<{ text: string; final: boolean }>,
      participant?: Participant
    ) => {
      for (const seg of segments) {
        if (!seg.final || !seg.text?.trim()) continue;
        const role: "user" | "agent" =
          participant instanceof RemoteParticipant ? "agent" : "user";
        pushMessage(role, seg.text);
      }
    },
    [pushMessage]
  );

  const startAudioLevelPolling = useCallback((room: Room) => {
    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
    }
    audioLevelIntervalRef.current = setInterval(() => {
      setLocalAudioLevel(room.localParticipant?.audioLevel ?? 0);
      let agentLevel = 0;
      let speaking = false;
      for (const p of room.remoteParticipants.values()) {
        agentLevel = p.audioLevel ?? 0;
        speaking = p.isSpeaking;
        break;
      }
      setAgentAudioLevel(agentLevel);
      setAgentSpeaking(speaking);
    }, 50);
  }, []);

  const connect = useCallback(async () => {
    if (roomRef.current) return;

    setSessionState("connecting");
    setError(null);
    setMessages([]);
    setAgentJoined(false);
    msgCountRef.current = 0;

    try {
      const { token, url } = await fetchToken();
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

      room.on(RoomEvent.DataReceived, handleDataReceived);
      room.on(
        RoomEvent.TranscriptionReceived,
        handleTranscription as (...args: unknown[]) => void
      );

      room.on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
        if (state === ConnectionState.Disconnected) {
          setSessionState("idle");
          if (audioLevelIntervalRef.current) {
            clearInterval(audioLevelIntervalRef.current);
          }
          roomRef.current = null;
          setAgentJoined(false);
        }
      });

      room.on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
        const agentIsSpeaking = speakers.some(
          (s) => s instanceof RemoteParticipant
        );
        if (agentIsSpeaking) setSessionState("speaking");
        else if (room.state === ConnectionState.Connected) {
          setSessionState("listening");
        }
      });

      room.on(RoomEvent.ParticipantConnected, () => {
        setAgentJoined(true);
      });

      room.on(RoomEvent.TrackSubscribed, () => {
        setAgentJoined(true);
      });

      room.on(RoomEvent.Disconnected, (_reason?: DisconnectReason) => {
        setSessionState("idle");
        setLocalAudioLevel(0);
        setAgentAudioLevel(0);
        setAgentSpeaking(false);
        setAgentJoined(false);
        if (audioLevelIntervalRef.current) {
          clearInterval(audioLevelIntervalRef.current);
        }
        roomRef.current = null;
      });

      await room.connect(url, token);
      await room.localParticipant.setMicrophoneEnabled(true);
      startAudioLevelPolling(room);
      setSessionState("listening");

      if (room.remoteParticipants.size > 0) {
        setAgentJoined(true);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection failed";
      setError(msg);
      setSessionState("error");
      roomRef.current = null;
    }
  }, [handleDataReceived, handleTranscription, startAudioLevelPolling]);

  const disconnect = useCallback(() => {
    if (roomRef.current) {
      roomRef.current.disconnect(true);
    }
    setSessionState("idle");
    setLocalAudioLevel(0);
    setAgentAudioLevel(0);
    setAgentSpeaking(false);
    setAgentJoined(false);
    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
    }
    roomRef.current = null;
  }, []);

  return {
    sessionState,
    messages,
    localAudioLevel,
    agentAudioLevel,
    agentSpeaking,
    agentJoined,
    connect,
    disconnect,
    error,
  };
}
