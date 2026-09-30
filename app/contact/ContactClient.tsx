"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleNetwork from "@/components/ParticleNetwork";

gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  {
    label: "Email",
    value: "admin@connectxeo.com",
    href: "mailto:admin@connectxeo.com",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    value: "@connectxeo",
    href: "https://tiktok.com/@connectxeo",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    value: "@connectxeo",
    href: "https://youtube.com/@connectxeo",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const EXPECT = [
  { title: "Fast follow-up", desc: "We reply within one business day" },
  { title: "Honest scoping", desc: "Clear timelines and pricing — no surprises" },
  { title: "Confidential", desc: "Your idea and data stay private" },
];

const SERVICE_OPTIONS = [
  "AI / ML Solutions",
  "Custom Model Training",
  "Agentic Systems & Voice",
  "Automation",
  "Web Engineering",
  "Cloud Infrastructure",
  "Not sure yet",
];

const TIMELINE_OPTIONS = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Just exploring"];

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-primary";

export default function ContactClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: SERVICE_OPTIONS[0],
    details: "",
    timeline: TIMELINE_OPTIONS[0],
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".contact-fade").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          results: {
            full_name: form.name,
            email: form.email,
            company_name: form.company,
            primary_service: form.service,
            need_detail: form.details,
            timeline: form.timeline,
            source: "website_contact_form",
          },
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main ref={rootRef} className="overflow-x-hidden w-full max-w-full">
      {/* HERO */}
      <section className="grain relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.5)_55%,rgba(8,9,10,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pt-48 lg:px-8">
          <p className="contact-hero-reveal flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Contact
          </p>
          <h1
            className="contact-hero-reveal mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Let&apos;s build what&apos;s{" "}
            <span className="text-primary">next.</span>
          </h1>
          <p className="contact-hero-reveal mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Tell us about your project — we&apos;ll reply within one business day with
            honest scoping, clear timelines, and a plan.
          </p>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          {/* Left — channels & expectations */}
          <div className="flex flex-col gap-12">
            <div className="contact-fade">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
                Reach us directly
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      {ch.icon}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        {ch.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground" style={{ fontWeight: 700 }}>
                        {ch.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-fade">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
                What to expect
              </h2>
              <ul className="mt-6 flex flex-col gap-5">
                {EXPECT.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground" style={{ fontWeight: 700 }}>
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-fade rounded-2xl border border-border bg-card p-6">
              <p className="text-sm leading-7 text-muted">
                ConnectXeo is based in{" "}
                <span className="font-semibold text-foreground">Pakistan</span>, serving
                clients globally. We work across timezones — wherever you are,
                we&apos;ll make it work.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-fade">
            {status === "sent" ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-card p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
                  Message received.
                </h2>
                <p className="max-w-sm text-sm leading-7 text-muted">
                  Thanks for reaching out — we&apos;ll get back to you within one
                  business day with next steps.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", company: "", service: SERVICE_OPTIONS[0], details: "", timeline: TIMELINE_OPTIONS[0] });
                  }}
                  className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-8 transition-colors hover:decoration-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-8 sm:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
                  Tell us about your project
                </h2>
                <p className="mt-2 text-sm text-muted">
                  A few details help us route your message to the right engineer.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Company <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="company"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Company or project name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Service needed
                    </label>
                    <select id="service" value={form.service} onChange={set("service")} className={inputCls}>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="timeline" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Timeline
                    </label>
                    <select id="timeline" value={form.timeline} onChange={set("timeline")} className={inputCls}>
                      {TIMELINE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="details" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      Project details
                    </label>
                    <textarea
                      id="details"
                      rows={5}
                      value={form.details}
                      onChange={set("details")}
                      placeholder="What are you building? What does success look like?"
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85 disabled:opacity-50 sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  {status !== "sending" && (
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </button>

                {status === "error" && (
                  <p className="mt-4 text-sm text-secondary">
                    Something went wrong — please email us directly at admin@connectxeo.com.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
