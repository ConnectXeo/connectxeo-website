/**
 * Optional Google Sheets append via service account (no extra npm deps).
 * Env:
 *   LEADS_GOOGLE_SHEET_ID
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (PEM, use \n for newlines)
 *   LEADS_GOOGLE_SHEET_RANGE  optional, default "Leads!A:Y"
 */

import { createSign } from "crypto";
import {
  LEAD_SHEET_HEADERS,
  leadToSheetRow,
  type NormalizedLead,
} from "@/lib/leads";

function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64url");
}

async function getGoogleAccessToken(
  email: string,
  privateKeyPem: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claim}`;
  const key = privateKeyPem.replace(/\\n/g, "\n");
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const sig = signer.sign(key, "base64url");
  const jwt = `${unsigned}.${sig}`;

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Google token failed: ${res.status} ${t.slice(0, 300)}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Google token missing access_token");
  return json.access_token;
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.LEADS_GOOGLE_SHEET_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim()
  );
}

export async function appendLeadToGoogleSheet(
  lead: NormalizedLead
): Promise<{ ok: true; updatedRange?: string }> {
  const sheetId = process.env.LEADS_GOOGLE_SHEET_ID!.trim();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.trim();
  const range = (process.env.LEADS_GOOGLE_SHEET_RANGE || "Leads!A:Y").trim();

  const token = await getGoogleAccessToken(email, privateKey);

  // Ensure header row exists (idempotent best-effort)
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    range.split("!")[0] + "!A1:Y1"
  )}`;
  const metaRes = await fetch(metaUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (metaRes.ok) {
    const meta = (await metaRes.json()) as { values?: string[][] };
    const first = meta.values?.[0]?.[0];
    if (!first) {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
          range.split("!")[0] + "!A1"
        )}?valueInputOption=RAW`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values: [Array.from(LEAD_SHEET_HEADERS)] }),
        }
      );
    }
  }

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [leadToSheetRow(lead)] }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Sheets append failed: ${res.status} ${t.slice(0, 400)}`);
  }
  const json = (await res.json()) as { updates?: { updatedRange?: string } };
  return { ok: true, updatedRange: json.updates?.updatedRange };
}
