"use client";

// HermesOrb — glass/liquid sphere representing the Hermes AI agent.
// States: idle (slow ambient drift), listening (brighter, faster drift),
// speaking (blinking/flare pulse — the agent is actively processing).

type OrbState = "idle" | "listening" | "speaking";

interface HermesOrbProps {
  state?: OrbState;
}

export default function HermesOrb({ state = "idle" }: HermesOrbProps) {
  const isProcessing = state === "listening" || state === "speaking";

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Fluid-sized square wrapper — scales with viewport on every device */}
      <div className="relative flex items-center justify-center w-[min(70vw,50vh,26rem)] h-[min(70vw,50vh,26rem)]">
        {/* Ambient outer glow */}
        <div
          className={[
            "absolute inset-[-12%] rounded-full blur-2xl transition-opacity duration-500",
            "bg-[radial-gradient(circle,rgba(96,165,250,0.5),rgba(234,179,8,0.25)_55%,transparent_75%)]",
            isProcessing ? "opacity-100 animate-pulse" : "opacity-60",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* Processing blink ring */}
        {isProcessing && (
          <span className="absolute inset-[-5%] rounded-full border border-cyan-300/50 animate-ping" />
        )}

        {/* Glass sphere body */}
        <div
          className={[
            "relative z-10 w-[85%] h-[85%] rounded-full overflow-hidden",
            "bg-black",
            "shadow-[0_0_70px_rgba(59,130,246,0.45),inset_0_0_40px_rgba(0,0,0,0.6)]",
            "transition-transform duration-500",
            state === "idle" ? "animate-[orbIdle_6s_ease-in-out_infinite]" : "",
            state === "listening" ? "animate-[orbIdle_3s_ease-in-out_infinite]" : "",
            state === "speaking" ? "animate-[orbBlink_1.1s_ease-in-out_infinite]" : "",
          ].join(" ")}
        >
          {/* Base swirl gradient — blue / gold / violet glass */}
          <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_45%_40%,#1d4ed8,#0ea5e9_20%,#facc15_45%,#0f172a_65%,#7c3aed_85%,#1d4ed8)] opacity-90" />

          {/* Deep shadow crescent (bottom-left) for sphere depth */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_70%,transparent_35%,rgba(0,0,0,0.75)_75%)]" />

          {/* Swirl / motion lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M10,55 C30,30 55,70 85,35"
              fill="none"
              stroke="rgba(191,219,254,0.7)"
              strokeWidth="1.4"
            />
            <path
              d="M15,40 C40,60 60,25 90,50"
              fill="none"
              stroke="rgba(226,232,240,0.5)"
              strokeWidth="0.8"
            />
            <circle cx="60" cy="35" r="20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
          </svg>

          {/* Specular highlight (top-left glass shine) */}
          <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-white/40 blur-xl" />
          <div className="absolute top-[15%] left-[20%] w-[15%] h-[15%] rounded-full bg-white/80 blur-sm" />

          {/* Glass rim */}
          <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
        </div>
      </div>

      {/* Status label */}
      <span
        className={[
          "text-xs sm:text-sm font-mono tracking-widest uppercase",
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
