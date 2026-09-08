import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hermes Voice — ConnectXeo Agentic OS",
  description:
    "Talk directly to Hermes, ConnectXeo's AI operating system. Full-screen voice command center.",
};

// Voice layout: full-screen OS shell — zero marketing chrome.
// No Navbar, no Footer. Black canvas only.
export default function VoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="voice-shell">
      {children}
    </div>
  );
}
