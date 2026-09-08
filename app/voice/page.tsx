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
import { useRouter } from "next/navigation";
import HermesOrb from "@/components/voice/HermesOrb";
import WaveformVisualizer from "@/components/voice/WaveformVisualizer";
import AgentOrgMap from "@/components/voice/AgentOrgMap";
import TranscriptPanel from "@/components/voice/TranscriptPanel";
import { useLiveKitVoice } from "@/hooks/useLiveKitVoice";

export default function VoicePage() {
  const router = useRouter();
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

  // ── Exit — end any active session, return to the marketing site ────────
  const handleExit = useCallback(() => {
    if (sessionState !== "idle" && sessionState !== "error") {
      disconnect();
    }
    router.push("/");
  }, [sessionState, disconnect, router]);

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
    <div className="fixed inset-0 flex flex-col bg-black overflow-y-auto">
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Exit — end session and return to the marketing site */}
          <button
            type="button"
            onClick={handleExit}
            aria-label="Exit Agentic OS"
            className={[
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
              "border border-gray-700 bg-gray-900/60",
              "text-xs font-mono text-gray-400 hover:text-white hover:border-gray-500",
              "backdrop-blur-sm transition-colors cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
            ].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M15.707 4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Exit
          </button>

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
      <main className="flex-1 flex flex-col lg:flex-row gap-8 px-4 sm:px-6 pb-6">
        {/* Left pad (balance) */}
        <div className="hidden lg:block w-56 flex-shrink-0" />

        {/* ── Center stage ──────────────────────────────────────────────── */}
        <section className="flex-1 flex flex-col items-center">
          {/* Orb fills the viewport below the header — the OS's hero element */}
          <div className="flex flex-col items-center justify-center min-h-[65vh] sm:min-h-[70vh] w-full">
            {/* Hermes Orb — click to start/stop the session */}
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isConnecting}
              aria-label={
                isActive ? "Stop — click to end session" : "Click to talk to Hermes"
              }
              className={[
                "cursor-pointer bg-transparent border-0 p-0 rounded-full",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/60",
                isConnecting ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <HermesOrb state={orbState} />
            </button>

            <p className="mt-8 text-xs font-mono text-gray-600 text-center px-4">
              {isConnecting
                ? "Connecting to Hermes..."
                : isError
                ? error ?? "Connection failed — click orb to retry"
                : isActive
                ? "Click orb to end session"
                : "Click orb to talk to Hermes"}
            </p>

            {/* Waveform */}
            <div className="mt-6 w-full max-w-md px-4">
              <WaveformVisualizer state={orbState} />
            </div>
          </div>

          {/* Transcript */}
          <div className="mt-8 w-full max-w-2xl px-4">
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
        <aside className="w-full lg:w-56 flex-shrink-0">
          <AgentOrgMap activeAgents={activeAgents} />
        </aside>
      </main>

      {/* ── Footer bar ────────────────────────────────────────────────────── */}
      <footer className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-t border-gray-900">
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
