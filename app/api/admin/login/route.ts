import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_PASSWORD?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "Admin access is not configured on this deploy." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const valid =
    password.length === secret.length && crypto.timingSafeEqual(Buffer.from(password), Buffer.from(secret));
  if (!valid) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
  return res;
}
