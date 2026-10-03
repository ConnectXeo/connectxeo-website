"use client";

import { usePathname } from "next/navigation";

export default function LiveKitEmbed() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const agentId = process.env.NEXT_PUBLIC_LIVEKIT_EMBED_AGENT_ID?.trim();
  if (!agentId) return null;

  const jobMetadata = JSON.stringify({
    source: "website",
    brand: "connectxeo",
  });

  return (
    <script
      src="https://cloud.livekit.io/embed-popup.js"
      data-lk-agent={agentId}
      data-lk-color="#5e6ad2"
      data-lk-theme="dark"
      data-lk-job-metadata={jobMetadata}
    />
  );
}