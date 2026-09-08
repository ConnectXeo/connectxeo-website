"use client";

// HermesOrb — animated CSS orb that represents the Hermes AI agent.
// States: idle (slow pulse), listening (fast pulse + glow), speaking (ripple).
// Rex will swap the state prop in when LiveKit is wired.

type OrbState = "idle" | "listening" | "speaking";

interface HermesOrbProps {
  state?: OrbState;
}

export default function HermesOrb({ state = "idle" }: HermesOrbProps) {
  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer ripple rings — visible when speaking */}
      {state === "speaking" && (
        <>
          <span className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping" />
          <span
            className="absolute inset-[-12px] rounded-full border border-cyan-400/20 animate-ping"
            style={{ animationDelay: "0.3s" }}
          />
          <span
            className="absolute inset-[-24px] rounded-full border border-cyan-400/10 animate-ping"
            style={{ animationDelay: "0.6s" }}
          />
        </>
      )}

      {/* Listening pulse */}
      {state === "listening" && (
        <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse" />
      )}

      {/* Core orb */}
      <div
        className={[
          "relative z-10 w-36 h-36 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700",
          "shadow-[0_0_60px_rgba(6,182,212,0.4)]",
          state === "idle" ? "animate-[orbIdle_4s_ease-in-out_infinite]" : "",
          state === "listening"
            ? "animate-[orbListen_1s_ease-in-out_infinite] shadow-[0_0_90px_rgba(6,182,212,0.7)]"
            : "",
          state === "speaking"
            ? "animate-[orbSpeak_0.6s_ease-in-out_infinite] shadow-[0_0_120px_rgba(6,182,212,0.9)]"
            : "",
        ].join(" ")}
      >
        {/* Inner glow layer */}
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {/* Hermes H wordmark */}
          <span
            className="text-4xl font-bold text-white select-none"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            H
          </span>
        </div>
      </div>

      {/* Status label */}
      <span
        className={[
          "absolute -bottom-7 text-xs font-mono tracking-widest uppercase",
          state === "idle" ? "text-gray-500" : "",
          state === "listening" ? "text-cyan-400" : "",
          state === "speaking" ? "text-violet-400" : "",
        ].join(" ")}
      >
        {state === "idle" && "HERMES · READY"}
        {state === "listening" && "HERMES · LISTENING"}
        {state === "speaking" && "HERMES · SPEAKING"}
      </span>
    </div>
  );
}
