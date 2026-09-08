"use client";

import { useEffect, useRef } from "react";

// WaveformVisualizer — animates a fake audio waveform.
// In idle state: flat line.
// In listening / speaking: bar heights animate via mock data.
// Rex replaces the mock bars with real AudioAnalyser data when LiveKit is wired.

type WaveState = "idle" | "listening" | "speaking";

interface WaveformVisualizerProps {
  state?: WaveState;
}

const BAR_COUNT = 40;

export default function WaveformVisualizer({
  state = "idle",
}: WaveformVisualizerProps) {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (state === "idle") {
      // Reset all bars to flat
      barsRef.current.forEach((bar) => {
        if (bar) bar.style.height = "4px";
      });
      return;
    }

    // Mock animation: randomise bar heights
    const interval = setInterval(() => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const max = state === "speaking" ? 72 : 40;
        const min = state === "speaking" ? 8 : 4;
        const h = Math.floor(Math.random() * (max - min) + min);
        bar.style.height = `${h}px`;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [state]);

  const barColor =
    state === "idle"
      ? "bg-gray-700"
      : state === "listening"
      ? "bg-cyan-400"
      : "bg-violet-400";

  return (
    <div
      className="flex items-center justify-center gap-[3px] h-20 px-4"
      aria-label="Audio waveform visualizer"
      role="img"
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
          className={[
            "w-1 rounded-full transition-all",
            barColor,
            state === "idle" ? "" : "duration-75",
          ].join(" ")}
          style={{ height: "4px" }}
        />
      ))}
    </div>
  );
}
