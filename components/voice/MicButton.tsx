"use client";

// MicButton — large push-to-talk button in the center stage.
// Idle → click → Listening → Hermes responds → Speaking → back to Idle (mock loop).
// Rex replaces the onClick handler with real LiveKit connect/disconnect.

type MicState = "idle" | "listening" | "speaking";

interface MicButtonProps {
  state: MicState;
  onClick: () => void;
  disabled?: boolean;
}

export default function MicButton({
  state,
  onClick,
  disabled = false,
}: MicButtonProps) {
  const isActive = state !== "idle";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={
        state === "idle"
          ? "Start talking to Hermes"
          : "Stop — click to end session"
      }
      className={[
        // Base shape
        "relative flex items-center justify-center rounded-full",
        "w-28 h-28 cursor-pointer select-none",
        "transition-all duration-300 focus:outline-none focus-visible:ring-4",
        "focus-visible:ring-cyan-400/60",

        // Colours
        isActive
          ? "bg-cyan-500 shadow-[0_0_48px_rgba(6,182,212,0.7)] hover:bg-cyan-400"
          : "bg-gray-800 border-2 border-gray-600 hover:border-cyan-500 hover:shadow-[0_0_32px_rgba(6,182,212,0.4)]",

        disabled ? "opacity-40 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {/* Outer pulse when active */}
      {isActive && (
        <span className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping" />
      )}

      {/* Mic icon — SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={[
          "relative z-10 w-12 h-12 transition-colors",
          isActive ? "text-white" : "text-gray-400",
        ].join(" ")}
        aria-hidden="true"
      >
        <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" />
        <path d="M19 10a1 1 0 0 1 2 0 9 9 0 0 1-8 8.944V21h3a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2h3v-2.056A9 9 0 0 1 3 10a1 1 0 0 1 2 0 7 7 0 0 0 14 0z" />
      </svg>
    </button>
  );
}
