import { NextResponse } from "next/server";
import { normalizeLiveKitLeadPayload } from "@/lib/leads";

/**
 * POST /api/leads
 *
 * LiveKit Agent Builder end-of-call webhook.
 *   URL:  https://www.connectxeo.com/api/leads
 *   Header: Authorization: Bearer <LEADS_WEBHOOK_SECRET>
 *
 * Source of truth: Google Sheet via VPS Composio bridge
 *   (LEADS_BRIDGE_URL → composio googlesheets OAuth, no service account)
 */

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getBearer(req: Request): string | null {
  const h =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1].trim() : null;
}

export async function GET() {
  const bridge = Boolean(process.env.LEADS_BRIDGE_URL?.trim());
  return NextResponse.json({
    ok: true,
    service: "connectxeo-leads",
    bridge_configured: bridge,
    usage:
      "POST LiveKit end-of-call JSON with Authorization: Bearer <LEADS_WEBHOOK_SECRET>",
  });
}

export async function POST(request: Request) {
  const secret = process.env.LEADS_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error("[leads] LEADS_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Server misconfigured: LEADS_WEBHOOK_SECRET missing" },
      { status: 500 }
    );
  }

  const token = getBearer(request);
  if (!token || token !== secret) {
    return unauthorized();
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Expected JSON object" },
      { status: 400 }
    );
  }

  const lead = normalizeLiveKitLeadPayload(body);
  const bridgeUrl = process.env.LEADS_BRIDGE_URL?.trim();

  if (!bridgeUrl) {
    console.warn(
      "[leads] accepted without bridge — set LEADS_BRIDGE_URL",
      lead.lead_id,
      lead.email
    );
    return NextResponse.json({
      ok: true,
      lead_id: lead.lead_id,
      stored: "accepted_only",
      lead: {
        full_name: lead.full_name,
        email: lead.email,
        company_name: lead.company_name,
        primary_service: lead.primary_service,
        status: lead.status,
      },
    });
  }

  try {
    const res = await fetch(bridgeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ lead }),
      // Vercel → VPS
      cache: "no-store",
    });
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try {
      json = JSON.parse(text) as Record<string, unknown>;
    } catch {
      json = { raw: text.slice(0, 300) };
    }
    if (!res.ok) {
      console.error("[leads] bridge error", res.status, text.slice(0, 400));
      return NextResponse.json(
        {
          error: "Failed to save lead via Composio bridge",
          detail: json,
          lead_id: lead.lead_id,
        },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      lead_id: lead.lead_id,
      stored: "google_sheet_composio",
      bridge: json,
      lead: {
        full_name: lead.full_name,
        email: lead.email,
        company_name: lead.company_name,
        primary_service: lead.primary_service,
        status: lead.status,
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "bridge unreachable";
    console.error("[leads] bridge fetch failed", msg);
    return NextResponse.json(
      {
        error: "Leads bridge unreachable",
        detail: msg,
        lead_id: lead.lead_id,
      },
      { status: 502 }
    );
  }
}
