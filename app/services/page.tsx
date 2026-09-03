import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — ConnectXeo",
  description:
    "Explore ConnectXeo's full suite of AI/ML, automation, web development, and cloud services designed to transform your business.",
};

/* ── Service data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    slug: "ai-ml",
    eyebrow: "Intelligence",
    title: "AI / ML Solutions",
    desc: "Custom model training, fine-tuning, and end-to-end ML pipelines — from raw data to production-grade predictions at scale.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    color: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-500",
    features: ["Predictive Analytics", "Computer Vision", "NLP Models", "MLOps Pipelines"],
  },
  {
    slug: "model-training",
    eyebrow: "Training",
    title: "Custom Model Training",
    desc: "Fine-tune foundation models on your proprietary data for domain-specific performance that generic APIs simply can't match.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H2.25m11.25 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m0 0H8.25m13.5-3a3 3 0 0 1-3 3M20.25 11.25a3 3 0 0 0-3-3M5.25 11.25a3 3 0 0 1 3-3m0 0H8.25m5.25 0h1.5m-1.5 0a3 3 0 0 1 3 3M5.25 8.25H2.25" />
      </svg>
    ),
    color: "from-violet-500/20 to-purple-500/20",
    accent: "text-violet-500",
    features: ["LLM Fine-tuning", "LoRA / QLoRA", "Dataset Curation", "Model Evaluation"],
  },
  {
    slug: "agentic",
    eyebrow: "Autonomous",
    title: "Agentic Solutions & Voice Agents",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows — plus voice agents that speak and listen in real time.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    color: "from-cyan-500/20 to-sky-500/20",
    accent: "text-cyan-500",
    features: ["Multi-Agent Systems", "Voice Interfaces", "Tool-Use Agents", "RAG Pipelines"],
  },
  {
    slug: "automation",
    eyebrow: "Efficiency",
    title: "Automation",
    desc: "End-to-end process automation that eliminates repetitive work, connects your entire tool stack, and runs 24/7 without intervention.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-500",
    features: ["Workflow Automation", "API Integration", "RPA Bots", "n8n / Make Flows"],
  },
  {
    slug: "web-development",
    eyebrow: "Digital",
    title: "Web Development",
    desc: "Pixel-perfect, high-performance web apps — from landing pages to full SaaS platforms — built on modern frameworks and shipped fast.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    color: "from-emerald-500/20 to-green-500/20",
    accent: "text-emerald-500",
    features: ["Next.js / React", "SaaS Platforms", "API Development", "UI/UX Design"],
  },
  {
    slug: "cloud",
    eyebrow: "Infrastructure",
    title: "Cloud Solutions",
    desc: "Scalable, secure cloud infrastructure — from initial architecture to continuous optimisation across AWS, GCP, and Azure.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
    color: "from-rose-500/20 to-pink-500/20",
    accent: "text-rose-500",
    features: ["Cloud Architecture", "DevOps & CI/CD", "Kubernetes", "Cost Optimisation"],
  },
];

/* ── Stats ────────────────────────────────────────────────────── */
const STATS = [
  { value: "6", label: "Core Services" },
  { value: "100%", label: "AI-Powered" },
  { value: "24/7", label: "Support" },
  { value: "Global", label: "Client Base" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[480px] w-[640px] rounded-full bg-primary opacity-[0.07] blur-3xl" />
          <div className="absolute -bottom-20 right-1/4 h-[380px] w-[520px] rounded-full bg-accent opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Everything you need to scale with AI
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              From custom AI models to cloud infrastructure — we deliver the
              full stack of modern technology so you can focus on growing your
              business.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start a Project
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                About ConnectXeo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <dt className="text-3xl font-bold text-primary">{value}</dt>
                <dd className="mt-1 text-sm font-medium text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What we build
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
            Six specialised practices — each with dedicated teams and proven
            delivery frameworks.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, eyebrow, title, desc, icon, color, accent, features }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              {/* Eyebrow */}
              <span className={`mb-4 text-xs font-semibold uppercase tracking-widest ${accent}`}>
                {eyebrow}
              </span>

              {/* Icon */}
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ${accent} transition-colors group-hover:bg-primary group-hover:text-white`}>
                {icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-7 text-muted">{desc}</p>

              {/* Feature pills */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore service
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Process strip ─────────────────────────────────────── */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How we work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              A structured process that delivers predictable outcomes every time.
            </p>
          </div>

          <ol className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" aria-hidden="true" />

            {[
              { step: "01", title: "Discover & Scope", desc: "We dive deep into your business goals, map existing systems, and define the exact scope — no vague proposals." },
              { step: "02", title: "Design & Prototype", desc: "Architecture, UI mockups, and a working prototype in days so you can validate before we build at scale." },
              { step: "03", title: "Build & Test", desc: "Iterative sprints, rigorous QA, and constant communication — you always know where we are." },
              { step: "04", title: "Deploy & Optimise", desc: "Production launch, monitoring dashboards, and ongoing tuning so performance only ever improves." },
            ].map(({ step, title, desc }, i) => (
              <li key={step} className={`relative flex flex-col items-center gap-8 pb-16 last:pb-0 md:flex-row ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                {/* Step number */}
                <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary shadow-lg">
                  {step}
                </div>
                {/* Content card */}
                <div className={`w-full max-w-sm rounded-2xl border border-border bg-background p-6 ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  <h3 className="text-base font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Tell us about your challenge and we&apos;ll recommend the right solution — no sales pressure, just honest advice.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
