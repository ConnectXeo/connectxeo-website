import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export ("output: export") is incompatible with the /api/voice/token
  // route handler, which mints LiveKit JWTs server-side using a secret that must
  // never ship to the client. This needs a real Node server (e.g. Vercel, `next start`).
  trailingSlash: true,
};

export default nextConfig;
