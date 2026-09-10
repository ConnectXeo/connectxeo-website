/**
 * LiveKit Cloud Agent Embed Widget.
 * Must be a classic <script> in the initial HTML (not next/script module inject).
 * Set NEXT_PUBLIC_LIVEKIT_EMBED_AGENT_ID to the dashboard agent id (CA_...).
 * Enable Embed + allowed origins in LiveKit Cloud for connectxeo.com.
 */
export default function LiveKitEmbed() {
  const agentId = process.env.NEXT_PUBLIC_LIVEKIT_EMBED_AGENT_ID?.trim();
  if (!agentId) return null;

  const jobMetadata = JSON.stringify({
    source: "website",
    brand: "connectxeo",
  });

  return (
    // LiveKit requires a classic script tag with data-lk-* attributes.
    // eslint-disable-next-line @next/next/no-sync-scripts
    <script
      src="https://cloud.livekit.io/embed-popup.js"
      data-lk-agent={agentId}
      data-lk-color="#5e6ad2"
      data-lk-theme="dark"
      data-lk-job-metadata={jobMetadata}
    />
  );
}
