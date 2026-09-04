"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xyzabcde", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const msg = (json as { errors?: Array<{ message: string }> })?.errors?.[0]?.message ?? "Something went wrong. Please try again.";
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-background border border-border text-foreground placeholder-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground-secondary mb-1.5">
            Full name <span className="text-primary">*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder="Sami Ullah" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground-secondary mb-1.5">
            Email address <span className="text-primary">*</span>
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground-secondary mb-1.5">
          Subject <span className="text-primary">*</span>
        </label>
        <input id="subject" name="subject" type="text" required placeholder="How can we help?" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground-secondary mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project, use case, or question..." className={`${inputClass} resize-none`} />
      </div>

      <input type="hidden" name="_replyto" value="admin@connectxeo.com" />

      {status === "error" && (
        <div className="bg-secondary/10 border border-secondary/30 text-secondary text-sm px-4 py-3 rounded-xl">{errorMsg}</div>
      )}

      {status === "success" && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          Message sent! We&apos;ll get back to you within 24 hours.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Sending...
          </>
        ) : status === "success" ? (
          "Sent"
        ) : (
          <>
            Send message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </>
        )}
      </button>
    </form>
  );
}
