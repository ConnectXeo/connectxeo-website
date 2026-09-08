"use client";

/**
 * /voice — ConnectXeo Agentic OS Shell
 *
 * Full-screen dark command center wired to Hermes via LiveKit.
 * No site nav/footer — this is an OS, not a page.
 *
 * Integration:
 *  - Token from POST /api/voice/token
 *  - LiveKit room connects to hermes-voice agent
 *  - Mic → LiveKit → Deepgram STT → Groq LLM → ElevenLabs TTS → speaker
 *  - Transcripts arrive via LiveKit TranscriptionReceived or DataChannel
 */

import { useCallback } from "react";
import HermesOrb from "@/components/voice/HermesOrb";
import WaveformVisualizer from "@/components/voice/WaveformVisualizer";
import MicButton from "@/components/voice/MicButton";
import AgentOrgMap from "@/components/voice/AgentOrgMap";
import TranscriptPanel from "@/components/voice/TranscriptPanel";
import { useLiveKitVoice } from "@/hooks/useLiveKitVoice";

export default function VoicePage() {
  const {
    sessionState,
    messages,
    activeAgents,
    agentSpeaking,
    connect,
    disconnect,
    error,
  } = useLiveKitVoice();

  // ── Mic button handler ──────────────────────────────────────────────────
  const handleMicClick = useCallback(() => {
    if (sessionState === "idle" || sessionState === "error") {
      connect();
    } else {
      disconnect();
    }
  }, [sessionState, connect, disconnect]);

  // Map session state to orb/waveform visual state
  const orbState =
    sessionState === "listening"
      ? "listening"
      : sessionState === "speaking" || agentSpeaking
      ? "speaking"
      : "idle";

  const isActive = sessionState !== "idle" && sessionState !== "connecting" && sessionState !== "error";
  const isConnecting = sessionState === "connecting";
  const isError = sessionState === "error";

  return (
    <div className="voice-os-root">
      {/* ── Grid scanline overlay ──────────────────────────────────────────── */}
      <div className="voice-scanlines" aria-hidden="true" />

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <header className="voice-topbar">
        <div className="flex items-center gap-3">
          {/* ConnectXeo wordmark */}
          <span className="text-white font-bold text-lg tracking-tight">
            Connect<span className="text-cyan-400">Xeo</span>
          </span>
          <span className="hidden sm:inline text-gray-700 text-sm font-mono">
            /
          </span>
          <span className="hidden sm:inline text-gray-500 text-sm font-mono">
            Agentic OS
          </span>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2">
          <span
            className={[
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border",
              isConnecting
                ? "border-yellow-600/50 text-yellow-400 bg-yellow-950/30"
                : isError
                ? "border-red-600/50 text-red-400 bg-red-950/30"
                : isActive
                ? "border-cyan-600/50 text-cyan-400 bg-cyan-950/30"
                : "border-gray-700 text-gray-500 bg-gray-900/40",
            ].join(" ")}
          >
            <span
              className={[
                "w-1.5 h-1.5 rounded-full",
                isConnecting
                  ? "bg-yellow-400 animate-pulse"
                  : isError
                  ? "bg-red-400"
                  : isActive
                  ? "bg-cyan-400 animate-pulse"
                  : "bg-gray-600",
              ].join(" ")}
            />
            {isConnecting
              ? "CONNECTING"
              : isError
              ? "ERROR"
              : isActive
              ? "SESSION ACTIVE"
              : "STANDBY"}
          </span>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="voice-main">
        {/* Left pad (balance) */}
        <div className="hidden lg:block w-56 flex-shrink-0" />

        {/* ── Center stage ──────────────────────────────────────────────── */}
        <section className="voice-center">
          {/* Hermes Orb */}
          <HermesOrb state={orbState} />

          {/* Waveform */}
          <div className="mt-14 w-full max-w-md">
            <WaveformVisualizer state={orbState} />
          </div>

          {/* Mic button */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <MicButton
              state={orbState}
              onClick={handleMicClick}
              disabled={isConnecting}
            />
            <p className="text-xs font-mono text-gray-600 text-center mt-2">
              {isConnecting
                ? "Connecting to Hermes..."
                : isError
                ? error ?? "Connection failed — click mic to retry"
                : isActive
                ? "Click to end session"
                : "Click mic to talk to Hermes"}
            </p>
          </div>

          {/* Transcript */}
          <div className="mt-8 w-full">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                Transcript
              </span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <TranscriptPanel messages={messages} />
          </div>
        </section>

        {/* ── Agent Org Map sidebar ─────────────────────────────────────── */}
        <aside className="voice-sidebar">
          <AgentOrgMap activeAgents={activeAgents} />
        </aside>
      </main>

      {/* ── Footer bar ────────────────────────────────────────────────────── */}
      <footer className="voice-footer">
        <span className="text-gray-700 text-[10px] font-mono">
          © {new Date().getFullYear()} ConnectXeo · Hermes Agentic OS v0.1
        </span>
        <span className="text-gray-800 text-[10px] font-mono">
          {isActive ? "VOICE SESSION · LIVEKIT CONNECTED" : "VOICE · READY"}
        </span>
      </footer>
    </div>
  );
}
