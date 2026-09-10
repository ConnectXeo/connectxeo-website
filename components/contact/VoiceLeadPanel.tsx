"use client";

import { useLeadVoice } from "@/hooks/useLeadVoice";

function levelBars(level: number, count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const threshold = (i + 1) / count;
    const active = level >= threshold * 0.35;
    const h = 6 + ((i % 5) + 1) * 4;
    return (
      <span
        key={i}
        className="w-1 rounded-full transition-all duration-75"
        style={{
          height: active ? h : 4,
          background: active
            ? "var(--color-primary, #6366f1)"
            : "rgba(148,163,184,0.25)",
        }}
      />
    );
  });
}

export default function VoiceLeadPanel() {
  const {
    sessionState,
    messages,
    localAudioLevel,
    agentAudioLevel,
    agentSpeaking,
    agentJoined,
    connect,
    disconnect,
    error,
  } = useLeadVoice();

  const isLive =
    sessionState === "connecting" ||
    sessionState === "listening" ||
    sessionState === "speaking";

  const statusLabel =
    sessionState === "idle"
      ? "Ready when you are"
      : sessionState === "connecting"
        ? "Connecting…"
        : sessionState === "speaking"
          ? "Maya is speaking"
          : sessionState === "listening"
            ? agentJoined
              ? "Listening — speak naturally"
              : "Waiting for Maya…"
            : sessionState === "error"
              ? "Something went wrong"
              : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div
          className={`relative w-28 h-28 rounded-full flex items-center justify-center border transition-all ${
            agentSpeaking
              ? "border-primary/60 shadow-[0_0_40px_rgba(99,102,241,0.35)]"
              : isLive
                ? "border-primary/30"
                : "border-border"
          } bg-card`}
        >
          <div
            className={`absolute inset-3 rounded-full bg-primary/10 ${
              agentSpeaking ? "animate-pulse" : ""
            }`}
          />
          <span className="relative text-sm font-semibold tracking-wide text-foreground">
            Maya
          </span>
        </div>

        <div>
          <p className="text-base font-semibold text-foreground">
            Talk to ConnectXeo
          </p>
          <p className="mt-1 text-sm text-muted max-w-sm mx-auto">
            Skip the form. Speak with Maya — she will take a few details so our
            team can follow up.
          </p>
          <p className="mt-2 text-xs text-muted uppercase tracking-wider">
            {statusLabel}
          </p>
        </div>

        {/* levels */}
        {isLive && (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <div className="flex items-end justify-center gap-1 h-10">
              {levelBars(
                Math.max(localAudioLevel, agentSpeaking ? agentAudioLevel : 0)
              )}
            </div>
            <div className="flex justify-between text-[10px] text-muted uppercase tracking-wider px-1">
              <span>You</span>
              <span>Maya</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          {!isLive ? (
            <button
              type="button"
              onClick={() => void connect()}
              className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Let&apos;s talk
            </button>
          ) : (
            <button
              type="button"
              onClick={disconnect}
              className="bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/40 font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center gap-2"
            >
              End call
            </button>
          )}
        </div>

        {sessionState === "connecting" && (
          <p className="text-xs text-muted">
            Allow microphone access when the browser asks.
          </p>
        )}

        {error && (
          <div className="w-full bg-secondary/10 border border-secondary/30 text-secondary text-sm px-4 py-3 rounded-xl text-left">
            {error}
            <button
              type="button"
              onClick={() => void connect()}
              className="ml-2 underline text-foreground"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="border border-border rounded-xl bg-background/50 max-h-64 overflow-y-auto p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted mb-2">
            Transcript
          </p>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`text-sm leading-relaxed ${
                m.role === "agent" ? "text-foreground" : "text-muted"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted mr-2">
                {m.role === "agent" ? "Maya" : "You"}
              </span>
              {m.text}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted text-center leading-relaxed">
        By starting a call you agree we may contact you about this enquiry at
        the details you share. Prefer email?{" "}
        <a
          href="mailto:admin@connectxeo.com"
          className="text-primary hover:underline"
        >
          admin@connectxeo.com
        </a>
      </p>
    </div>
  );
}
