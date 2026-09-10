import { NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";

/**
 * POST /api/voice/token
 *
 * Mints a LiveKit access token for the public ConnectXeo lead voice agent
 * (Maya). Each session gets a unique room so agent dispatch from the token
 * runs on room create.
 *
 * Env (server-only):
 *   LIVEKIT_API_KEY
 *   LIVEKIT_API_SECRET
 *   LIVEKIT_URL              default wss://connectxeo-fwni0inw.livekit.cloud
 *   LIVEKIT_AGENT_NAME      Agent Builder dispatch name (required for explicit dispatch)
 *   VOICE_ACCESS            public_demo | admin_only  (default: public_demo for contact)
 *   VOICE_ADMIN_SECRET      required when admin_only
 */

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

export async function POST(request: Request) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const liveKitUrl =
    process.env.LIVEKIT_URL ?? "wss://connectxeo-fwni0inw.livekit.cloud";
  const agentName = (process.env.LIVEKIT_AGENT_NAME ?? "").trim();

  if (!apiKey || !apiSecret) {
    console.error("[voice/token] missing LIVEKIT_API_KEY or LIVEKIT_API_SECRET");
    return NextResponse.json(
      { error: "Server misconfigured: missing LiveKit credentials" },
      { status: 500 }
    );
  }

  if (!agentName) {
    console.error("[voice/token] LIVEKIT_AGENT_NAME is not set");
    return NextResponse.json(
      {
        error:
          "Server misconfigured: LIVEKIT_AGENT_NAME not set (LiveKit Agent Builder dispatch name)",
      },
      { status: 500 }
    );
  }

  const voiceAccess = (process.env.VOICE_ACCESS ?? "public_demo").toLowerCase();
  if (voiceAccess === "admin_only") {
    const adminSecret = process.env.VOICE_ADMIN_SECRET;
    const callerSecret = request.headers.get("x-voice-admin-secret");
    if (!adminSecret) {
      return NextResponse.json(
        { error: "Server misconfigured: VOICE_ADMIN_SECRET not set" },
        { status: 500 }
      );
    }
    if (!callerSecret || callerSecret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let identity = `visitor-${randomBytes(4).toString("hex")}`;
  // Unique room per session so token roomConfig dispatch always applies
  let roomName = `lead-${randomBytes(6).toString("hex")}`;

  try {
    const body = await request.json().catch(() => ({}));
    if (body.identity && typeof body.identity === "string") {
      identity =
        body.identity.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || identity;
    }
    // Do not allow clients to force a shared room — keep unique for dispatch
  } catch {
    // defaults
  }

  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = 3600;

  const payload: Record<string, unknown> = {
    iss: apiKey,
    sub: identity,
    name: identity,
    iat: now,
    nbf: now,
    exp: now + ttlSeconds,
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    },
    // Explicit agent dispatch when this participant creates the room
    roomConfig: {
      agents: [
        {
          agentName,
          metadata: JSON.stringify({
            source: "website_contact",
            page: "contact",
          }),
        },
      ],
    },
  };

  const token = buildHS256JWT(payload, apiSecret);

  return NextResponse.json({
    token,
    url: liveKitUrl,
    roomName,
    agentName,
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST /api/voice/token" },
    { status: 405 }
  );
}
