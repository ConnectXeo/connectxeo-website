import Link from "next/link";
import HeroClient from "../components/HeroClient";

/* ── Service data ─────────────────────────────────────────── */
const SERVICES = [
  {
    slug: "ai-ml",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: "AI / ML Solutions",
    desc:  "Custom model training, fine-tuning, and end-to-end ML pipelines for your business.",
  },
  {
    slug: "agentic",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    title: "Agentic Solutions",
    desc:  "Autonomous AI agents that reason, plan, and execute complex multi-step workflows.",
  },
  {
    slug: "voice-agents",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
    title: "Voice Agents",
    desc:  "Conversational AI that speaks, listens, and resolves customer queries in real time.",
  },
  {
    slug: "automation",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Automation",
    desc:  "End-to-end process automation eliminating repetitive work across your entire stack.",
  },
  {
    slug: "web-dev",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: "Web Development",
    desc:  "Fast, responsive, and scalable web apps built with modern frameworks and clean code.",
  },
  {
    slug: "cloud",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
    title: "Cloud Solutions",
    desc:  "Architected cloud infrastructure — secure, scalable, and optimised for AI workloads.",
  },
];

/* ── How We Work ──────────────────────────────────────────── */
const STEPS = [
  { step: "01", label: "Consult", desc: "We listen first. A discovery call where we understand your goals, constraints, and the problem worth solving." },
  { step: "02", label: "Build",   desc: "Our team designs and engineers the solution — iterating quickly with continuous feedback from you." },
  { step: "03", label: "Deploy",  desc: "We ship to production, monitor performance, and stay on call to ensure everything runs perfectly." },
];

/* ── Why ConnectXeo ───────────────────────────────────────── */
const VALUE_PROPS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "AI-First by Default",
    desc: "Every solution is designed with intelligent automation at its core — not bolted on as an afterthought.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Global Reach, Local Rates",
    desc: "Pakistan-based team with global clients. Enterprise quality without the enterprise price tag.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Trusted & Transparent",
    desc: "Clear timelines, honest pricing, and open communication from kickoff to delivery.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "Rapid Delivery",
    desc: "We ship fast. MVP in weeks, not months — then we iterate based on real-world feedback.",
  },
];

/* ── Stats bar ────────────────────────────────────────────── */
const STATS = [
  { label: "Services",   value: "6+" },
  { label: "AI-Powered", value: "100%" },
  { label: "Based in",   value: "Pakistan" },
  { label: "Clients",    value: "Global" },
];

/* ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen items-center overflow-hidden"
        style={{ background: "#08090a" }}
      >
        {/* CSS particle field */}
        <div aria-hidden="true" className="particle-field pointer-events-none absolute inset-0 -z-10" />

        {/* Radial glow behind 3D mesh */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4"
          style={{
            background: "radial-gradient(ellipse at center, rgba(94,106,210,0.10) 0%, rgba(94,106,210,0) 70%)",
          }}
        />

        {/* Client-only: Three.js canvas + GSAP reveal */}
        <HeroClient />

        {/* Hero text content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
          <div className="hero-content max-w-[640px]">
            {/* Eyebrow badge */}
            <div
              className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
              style={{
                borderColor: "rgba(94,106,210,0.35)",
                background:  "rgba(94,106,210,0.08)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#5e6ad2" }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{ color: "#5e6ad2" }}
              >
                AI &amp; Automation Agency
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-headline mb-6 leading-[1.05] tracking-[-1.408px]"
              style={{
                fontSize:   "clamp(40px, 6vw, 64px)",
                fontWeight: 510,
                color:      "#f7f8f8",
                letterSpacing: "-1.408px",
              }}
            >
              Build Smarter
              <br />
              <span style={{ color: "#5e6ad2" }}>with AI.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="hero-sub mb-10 max-w-[480px] leading-[1.65]"
              style={{ fontSize: "15px", color: "#999999" }}
            >
              ConnectXeo delivers end-to-end AI, automation, and cloud
              solutions that help businesses move faster, cut costs, and
              stay ahead in a world driven by intelligent technology.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-wrap gap-3">
              {/* Primary */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full text-[13px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background:    "#5e6ad2",
                  padding:       "12px 24px",
                  borderRadius:  "9999px",
                  boxShadow:     "0 0 32px rgba(94,106,210,0.25)",
                }}
              >
                Get Started
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {/* Ghost */}
              <Link
                href="/services"
                className="inline-flex items-center rounded-full text-[13px] font-semibold transition-colors hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  border:       "1px solid rgba(255,255,255,0.10)",
                  background:   "transparent",
                  padding:      "12px 24px",
                  borderRadius: "9999px",
                  color:        "#f7f8f8",
                }}
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle bottom fade into next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #08090a)" }}
        />

      </section>

      {/* ── 2. Stats bar ────────────────────────────────────── */}
      <section
        className="border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0f1011" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <dt className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#999999" }}>
                  {label}
                </dt>
                <dd className="text-2xl font-bold" style={{ color: "#f7f8f8" }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 3. Services grid ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#5e6ad2" }}>
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#f7f8f8" }}>
            Six services, one team
          </h2>
          <p className="mt-4 text-base leading-7" style={{ color: "#999999" }}>
            From custom AI models to cloud infrastructure — we cover the full
            stack so you don&apos;t have to.
          </p>
        </div>

        <ul role="list" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, icon, title, desc }) => (
            <li key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group flex h-full flex-col gap-4 rounded-2xl border p-6 transition-all hover:shadow-lg"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background:  "#0f1011",
                }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
                  style={{ background: "rgba(94,106,210,0.10)", color: "#5e6ad2" }}
                >
                  {icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold" style={{ color: "#f7f8f8" }}>{title}</h3>
                  <p className="mt-1.5 text-sm leading-6" style={{ color: "#999999" }}>{desc}</p>
                </div>
                <span className="mt-auto flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "#5e6ad2" }}>
                  Learn more
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: "#5e6ad2" }}>
            View all services
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── 4. How We Work ──────────────────────────────────── */}
      <section
        className="border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0f1011" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#5e6ad2" }}>Our Process</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#f7f8f8" }}>How We Work</h2>
            <p className="mt-4 text-base leading-7" style={{ color: "#999999" }}>
              A straightforward process that gets you from idea to live product without the chaos.
            </p>
          </div>

          <ol className="relative mt-16 grid gap-8 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute top-8 left-1/2 hidden h-px w-[calc(100%-8rem)] -translate-x-1/2 border-t border-dashed sm:block"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            />
            {STEPS.map(({ step, label, desc }) => (
              <li key={step} className="relative flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 text-xl font-bold shadow-lg"
                  style={{
                    borderColor: "#5e6ad2",
                    background:  "#08090a",
                    color:       "#5e6ad2",
                    boxShadow:   "0 0 24px rgba(94,106,210,0.12)",
                  }}
                >
                  {step}
                </span>
                <h3 className="mt-5 text-lg font-semibold" style={{ color: "#f7f8f8" }}>{label}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6" style={{ color: "#999999" }}>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Why ConnectXeo ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#5e6ad2" }}>Why Us</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#f7f8f8" }}>Why ConnectXeo?</h2>
          <p className="mt-4 text-base leading-7" style={{ color: "#999999" }}>
            We combine technical depth with business clarity so you get outcomes, not just deliverables.
          </p>
        </div>

        <ul role="list" className="mt-14 grid gap-6 sm:grid-cols-2">
          {VALUE_PROPS.map(({ icon, title, desc }) => (
            <li
              key={title}
              className="flex gap-5 rounded-2xl border p-6"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0f1011" }}
            >
              <span
                className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(94,106,210,0.10)", color: "#5e6ad2" }}
              >
                {icon}
              </span>
              <div>
                <h3 className="text-base font-semibold" style={{ color: "#f7f8f8" }}>{title}</h3>
                <p className="mt-1.5 text-sm leading-6" style={{ color: "#999999" }}>{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 6. Final CTA ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse at center, rgba(94,106,210,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "#f7f8f8" }}>
              Ready to build something{" "}
              <span style={{ color: "#5e6ad2" }}>great?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg" style={{ color: "#999999" }}>
              Tell us about your project and let&apos;s figure out how AI and
              automation can take it to the next level.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full text-[14px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background:   "#5e6ad2",
                  padding:      "14px 32px",
                  borderRadius: "9999px",
                  boxShadow:    "0 0 40px rgba(94,106,210,0.20)",
                }}
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
