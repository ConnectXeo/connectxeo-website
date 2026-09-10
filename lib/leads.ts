/**
 * Lead intake helpers for LiveKit Agent Builder end-of-call webhooks.
 */

export type NormalizedLead = {
  lead_id: string;
  created_at: string;
  source: string;
  channel: string;
  status: string;
  job_id: string;
  room_id: string;
  room: string;
  started_at: string;
  ended_at: string;
  summary: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
  primary_service: string;
  need_detail: string;
  timeline: string;
  budget_band: string;
  callback_window: string;
  how_found_us: string;
  consent_contact: string;
  website_url: string;
  raw_results_json: string;
};

function asString(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
    return String(v).trim();
  }
  if (Array.isArray(v)) {
    return v.map(asString).filter(Boolean).join("; ");
  }
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    for (const key of [
      "value",
      "text",
      "answer",
      "result",
      "name",
      "email",
      "content",
    ]) {
      if (o[key] != null && typeof o[key] !== "object") {
        return String(o[key]).trim();
      }
    }
    // single nested field
    const vals = Object.values(o)
      .map(asString)
      .filter(Boolean);
    if (vals.length === 1) return vals[0];
    try {
      return JSON.stringify(o);
    } catch {
      return "";
    }
  }
  return "";
}

function pick(
  results: Record<string, unknown>,
  ...keys: string[]
): string {
  const lower = Object.fromEntries(
    Object.entries(results).map(([k, v]) => [k.toLowerCase().replace(/[\s-]/g, "_"), v])
  );
  for (const key of keys) {
    const k = key.toLowerCase().replace(/[\s-]/g, "_");
    if (lower[k] != null) return asString(lower[k]);
  }
  return "";
}

export function normalizeLiveKitLeadPayload(
  body: Record<string, unknown>
): NormalizedLead {
  const resultsRaw = body.results;
  let results: Record<string, unknown> = {};
  if (resultsRaw && typeof resultsRaw === "object" && !Array.isArray(resultsRaw)) {
    results = resultsRaw as Record<string, unknown>;
  }

  const jobId = asString(body.job_id) || asString(body.jobId);
  const roomId = asString(body.room_id) || asString(body.roomId);
  const room = asString(body.room);
  const started = asString(body.started_at) || asString(body.startedAt);
  const ended = asString(body.ended_at) || asString(body.endedAt);
  const summary = asString(body.summary);
  const now = new Date().toISOString();

  const leadId =
    jobId ||
    roomId ||
    `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  return {
    lead_id: leadId,
    created_at: now,
    source: "voice_agent",
    channel: "voice",
    status: "new",
    job_id: jobId,
    room_id: roomId,
    room,
    started_at: started,
    ended_at: ended,
    summary,
    full_name: pick(
      results,
      "full_name",
      "fullname",
      "first_name",
      "caller_name",
      "contact_name"
    ),
    email: pick(results, "email", "work_email", "email_address"),
    phone: pick(results, "phone", "whatsapp", "mobile", "phone_number"),
    company_name: pick(
      results,
      "company_name",
      "company",
      "organization",
      "business_name"
    ),
    role: pick(results, "role", "job_title", "title"),
    primary_service: pick(
      results,
      "primary_service",
      "service",
      "services_interest",
      "need",
      "interest"
    ),
    need_detail: pick(
      results,
      "need_detail",
      "project_detail",
      "message",
      "description",
      "details"
    ),
    timeline: pick(results, "timeline", "timeframe", "when"),
    budget_band: pick(results, "budget_band", "budget", "budget_range"),
    callback_window: pick(
      results,
      "callback_window",
      "timezone",
      "best_time",
      "callback_time"
    ),
    how_found_us: pick(results, "how_found_us", "source", "referral"),
    consent_contact: pick(
      results,
      "consent_contact",
      "consent",
      "contact_consent"
    ),
    website_url: pick(results, "website_url", "website", "url"),
    raw_results_json: (() => {
      try {
        return JSON.stringify(results);
      } catch {
        return "";
      }
    })(),
  };
}

/** Column order for Google Sheet header + rows */
export const LEAD_SHEET_HEADERS = [
  "lead_id",
  "created_at",
  "status",
  "source",
  "channel",
  "full_name",
  "email",
  "phone",
  "company_name",
  "role",
  "primary_service",
  "need_detail",
  "timeline",
  "budget_band",
  "callback_window",
  "how_found_us",
  "consent_contact",
  "website_url",
  "summary",
  "job_id",
  "room_id",
  "room",
  "started_at",
  "ended_at",
  "raw_results_json",
] as const;

export function leadToSheetRow(lead: NormalizedLead): string[] {
  return LEAD_SHEET_HEADERS.map((h) => {
    const v = lead[h as keyof NormalizedLead];
    return v == null ? "" : String(v);
  });
}
