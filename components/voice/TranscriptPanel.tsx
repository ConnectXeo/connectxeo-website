"use client";

// TranscriptPanel — scrollable transcript area below the waveform.
// Messages will be pushed here by the LiveKit data-channel hook (Rex wires that).
// For now it shows a placeholder / welcome message.

export interface TranscriptMessage {
  id: string;
  role: "user" | "hermes";
  text: string;
  timestamp?: string;
}

interface TranscriptPanelProps {
  messages?: TranscriptMessage[];
}

const PLACEHOLDER: TranscriptMessage[] = [
  {
    id: "welcome",
    role: "hermes",
    text: "Hermes is ready. Press the mic button and speak — I am listening.",
    timestamp: "",
  },
];

export default function TranscriptPanel({
  messages = PLACEHOLDER,
}: TranscriptPanelProps) {
  return (
    <div
      className={[
        "w-full max-w-2xl mx-auto",
        "h-44 overflow-y-auto",
        "bg-gray-950/60 border border-gray-800 rounded-xl px-4 py-3",
        "scroll-smooth",
      ].join(" ")}
      aria-label="Voice session transcript"
      role="log"
    >
      {messages.length === 0 ? (
        <p className="text-gray-700 text-sm font-mono text-center pt-12">
          Transcript will appear here...
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={[
                "flex gap-2 text-sm font-mono",
                msg.role === "hermes" ? "items-start" : "items-start flex-row-reverse",
              ].join(" ")}
            >
              {/* Speaker tag */}
              <span
                className={[
                  "flex-shrink-0 text-[10px] font-bold uppercase tracking-widest pt-[2px]",
                  msg.role === "hermes" ? "text-cyan-500" : "text-violet-400",
                ].join(" ")}
              >
                {msg.role === "hermes" ? "HERMES" : "YOU"}
              </span>

              {/* Text */}
              <p
                className={[
                  "leading-relaxed",
                  msg.role === "hermes" ? "text-gray-300" : "text-gray-400 text-right",
                ].join(" ")}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
