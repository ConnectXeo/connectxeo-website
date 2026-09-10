import { NextResponse } from "next/server";
import { normalizeLiveKitLeadPayload } from "@/lib/leads";
import {
  appendLeadToGoogleSheet,
  isGoogleSheetsConfigured,
} from "@/lib/google-sheets-leads";

/**
 * POST /api/leads
 *
 * LiveKit Agent Builder → Call ending → Data collection endpoint URL
 *   https://www.connectxeo.com/api/leads
 *
 * Header:
 *   Authorization: Bearer <LEADS_WEBHOOK_SECRET>
 *
 * Body (LiveKit):
 *   { job_id, room_id, room, started_at, ended_at, summary?, results? }
 *
 * Source of truth: Google Sheet when LEADS_GOOGLE_SHEET_ID + service account env set.
 * Without Sheet config the endpoint still accepts (200) and returns the normalized lead
 * so you can verify LiveKit wiring first — set Sheet env to persist.
 */

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getBearer(req: Request): string | null {
  const h = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!h) return null;
  const m = /^Bearer\s+(.+)$/i.exec(h.trim());
  return m ? m[1].trim() : null;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "connectxeo-leads",
    sheet_configured: isGoogleSheetsConfigured(),
    usage: "POST LiveKit end-of-call JSON with Authorization: Bearer <secret>",
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
    return NextResponse.json({ error: "Expected JSON object" }, { status: 400 });
  }

  const lead = normalizeLiveKitLeadPayload(body);

  let stored: "google_sheet" | "accepted_only" = "accepted_only";
  let storeDetail: string | undefined;

  if (isGoogleSheetsConfigured()) {
    try {
      const result = await appendLeadToGoogleSheet(lead);
      stored = "google_sheet";
      storeDetail = result.updatedRange;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sheet write failed";
      console.error("[leads] sheet error", msg);
      return NextResponse.json(
        {
          error: "Failed to save lead to Google Sheet",
          detail: msg,
          lead_id: lead.lead_id,
        },
        { status: 502 }
      );
    }
  } else {
    console.warn(
      "[leads] accepted without Sheet persistence — set LEADS_GOOGLE_SHEET_ID + service account env",
      lead.lead_id,
      lead.email,
      lead.full_name
    );
  }

  // Optional notify webhook (Zapier/Make/email bridge)
  const notifyUrl = process.env.LEADS_NOTIFY_WEBHOOK_URL?.trim();
  if (notifyUrl) {
    try {
      await fetch(notifyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "lead.created", lead }),
      });
    } catch (err) {
      console.error("[leads] notify webhook failed", err);
      // do not fail the lead save
    }
  }

  return NextResponse.json({
    ok: true,
    lead_id: lead.lead_id,
    stored,
    store_detail: storeDetail,
    lead: {
      full_name: lead.full_name,
      email: lead.email,
      company_name: lead.company_name,
      primary_service: lead.primary_service,
      status: lead.status,
    },
  });
}
