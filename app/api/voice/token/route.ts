import { NextResponse } from "next/server";
import { createHmac } from "crypto";

/**
 * POST /api/voice/token
 *
 * Mints a LiveKit room JWT for the caller using Node's built-in crypto module.
 * No external livekit-server-sdk needed — LiveKit uses plain HS256 JWTs.
 *
 * Env vars (all server-side only — never sent to the browser):
 *   LIVEKIT_API_KEY     LiveKit project API key
 *   LIVEKIT_API_SECRET  LiveKit project API secret (NEVER expose this)
 *   LIVEKIT_URL         WebSocket URL  (default: wss://connectxeo-fwni0inw.livekit.cloud)
 *   VOICE_ACCESS        public_demo | admin_only  (default: admin_only)
 *   VOICE_ADMIN_SECRET  Required when VOICE_ACCESS=admin_only — caller must send
 *                       header X-Voice-Admin-Secret: <value>
 *
 * Returns:
 *   200  { token: string, url: string }
 *   401  { error: "Unauthorized" }                  (admin_only + bad secret)
 *   500  { error: "Server misconfigured" }           (missing required env vars)
 */

// ── Tiny JWT builder (HS256) ─────────────────────────────────────────────────

function base64urlEncode(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64url");
}

function buildHS256JWT(payload: object, secret: string): string {
  const header = base64urlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64urlEncode(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const sig = createHmac("sha256", secret)
    .update(signingInput)
    .digest("base64url");
  return `${signingInput}.${sig}`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // --- Validate required server-side secrets ---
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const liveKitUrl =
    process.env.LIVEKIT_URL ?? "wss://connectxeo-fwni0inw.livekit.cloud";

  if (!apiKey || !apiSecret) {
    console.error(
      "[voice/token] LIVEKIT_API_KEY or LIVEKIT_API_SECRET not set"
    );
    return NextResponse.json(
      { error: "Server misconfigured: missing LiveKit credentials" },
      { status: 500 }
    );
  }

  // --- VOICE_ACCESS gating ---
  const voiceAccess = (process.env.VOICE_ACCESS ?? "admin_only").toLowerCase();

  if (voiceAccess === "admin_only") {
    const adminSecret = process.env.VOICE_ADMIN_SECRET;
    const callerSecret = request.headers.get("x-voice-admin-secret");

    if (!adminSecret) {
      // admin_only mode requires VOICE_ADMIN_SECRET to be set on the server
      console.error(
        "[voice/token] VOICE_ACCESS=admin_only but VOICE_ADMIN_SECRET is not set"
      );
      return NextResponse.json(
        { error: "Server misconfigured: VOICE_ADMIN_SECRET not set" },
        { status: 500 }
      );
    }

    if (!callerSecret || callerSecret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  // VOICE_ACCESS=public_demo → anyone may proceed

  // --- Optional request body: { identity?, roomName? } ---
  let identity = `visitor-${Date.now()}`;
  let roomName = process.env.LIVEKIT_ROOM ?? "hermes-public";

  try {
    const body = await request.json().catch(() => ({}));
    if (body.identity && typeof body.identity === "string") {
      // Sanitise: strip PII, allow only safe chars
      identity = body.identity.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || identity;
    }
    if (body.roomName && typeof body.roomName === "string") {
      roomName = body.roomName.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 128) || roomName;
    }
  } catch {
    // Non-JSON body is fine — defaults apply
  }

  // --- Mint the LiveKit JWT ---
  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = 3600; // 1 hour

  const payload = {
    // Standard JWT fields
    iss: apiKey,              // Issuer = API key
    sub: identity,            // Subject = participant identity
    iat: now,
    nbf: now,
    exp: now + ttlSeconds,
    // LiveKit video grants
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,       // participant can publish mic audio
      canSubscribe: true,     // participant can hear the agent
      canPublishData: true,   // participant can send data messages
    },
    metadata: "",
  };

  const token = buildHS256JWT(payload, apiSecret);

  return NextResponse.json({ token, url: liveKitUrl });
}

/**
 * GET /api/voice/token  — intentionally not implemented.
 * Tokens must be POSTed to avoid accidental browser prefetch/caching.
 */
export async function GET() {
  return NextResponse.json(
    { error: "Use POST /api/voice/token" },
    { status: 405 }
  );
}
