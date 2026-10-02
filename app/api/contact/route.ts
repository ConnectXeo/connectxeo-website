import { NextResponse } from "next/server";
import { createContact } from "@/lib/db-pg";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const contact = await createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}