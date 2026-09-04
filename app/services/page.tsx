import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Services — ConnectXeo",
  description:
    "Explore ConnectXeo's full suite of AI/ML, automation, web development, and cloud services designed to transform your business.",
};

const SERVICES = [
  {
    slug: "ai-ml", eyebrow: "Intelligence", title: "AI / ML Solutions",
    desc: "Custom model training, fine-tuning, and end-to-end ML pipelines — from raw data to production-grade predictions at scale.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>),
    features: ["Predictive Analytics", "Computer Vision", "NLP Models", "MLOps Pipelines"],
  },
  {
    slug: "model-training", eyebrow: "Training", title: "Custom Model Training",
    desc: "Fine-tune foundation models on your proprietary data for domain-specific performance that generic APIs simply can't match.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H2.25m11.25 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m0 0H8.25m13.5-3a3 3 0 0 1-3 3" /></svg>),
    features: ["LLM Fine-tuning", "LoRA / QLoRA", "Dataset Curation", "Model Evaluation"],
  },
  {
    slug: "agentic", eyebrow: "Autonomous", title: "Agentic Solutions & Voice Agents",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows — plus voice agents that speak and listen in real time.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>),
    features: ["Multi-Agent Systems", "Voice Interfaces", "Tool-Use Agents", "RAG Pipelines"],
  },
  {
    slug: "automation", eyebrow: "Efficiency", title: "Automation",
    desc: "End-to-end process automation that eliminates repetitive work, connects your entire tool stack, and runs 24/7 without intervention.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>),
    features: ["Workflow Automation", "API Integration", "RPA Bots", "n8n / Make Flows"],
  },
  {
    slug: "web-development", eyebrow: "Digital", title: "Web Development",
    desc: "Pixel-perfect, high-performance web apps — from landing pages to full SaaS platforms — built on modern frameworks and shipped fast.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>),
    features: ["Next.js / React", "SaaS Platforms", "API Development", "UI/UX Design"],
  },
  {
    slug: "cloud", eyebrow: "Infrastructure", title: "Cloud Solutions",
    desc: "Scalable, secure cloud infrastructure — from initial architecture to continuous optimisation across AWS, GCP, and Azure.",
    icon: (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>),
    features: ["Cloud Architecture", "DevOps & CI/CD", "Kubernetes", "Cost Optimisation"],
  },
];

const STATS = [
  { value: "6", label: "Core Services" },
  { value: "100%", label: "AI-Powered" },
  { value: "24/7", label: "Support" },
  { value: "Global", label: "Client Base" },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[480px] w-[640px] rounded-full bg-primary opacity-[0.07] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up"><Badge pulse>Everything you need to scale with AI</Badge></div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted animate-fade-up-delay-2">
              From custom AI models to cloud infrastructure — we deliver the full stack of modern technology so you can focus on growing your business.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up-delay-3">
              <Button href="/contact">Start a Project</Button>
              <Button href="/about" variant="secondary">About ConnectXeo</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <dt className="text-3xl font-bold text-primary" style={{ fontWeight: 590 }}>{value}</dt>
                <dd className="mt-1 text-sm font-medium text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <SectionHeading title="What we build" description="Six specialised practices — each with dedicated teams and proven delivery frameworks." />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, eyebrow, title, desc, icon, features }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              style={{ boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset" }}
            >
              <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-foreground" style={{ fontWeight: 590 }}>{title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-7 text-muted">{desc}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {features.map((f) => (
                  <li key={f} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">{f}</li>
                ))}
              </ul>
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

      {/* Process */}
      <section className="border-t border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeading title="How we work" description="A structured process that delivers predictable outcomes every time." />
          <ol className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" aria-hidden="true" />
            {[
              { step: "01", title: "Discover & Scope", desc: "We dive deep into your business goals, map existing systems, and define the exact scope." },
              { step: "02", title: "Design & Prototype", desc: "Architecture, UI mockups, and a working prototype in days so you can validate early." },
              { step: "03", title: "Build & Test", desc: "Iterative sprints, rigorous QA, and constant communication — you always know where we are." },
              { step: "04", title: "Deploy & Optimise", desc: "Production launch, monitoring dashboards, and ongoing tuning so performance only improves." },
            ].map(({ step, title, desc }, i) => (
              <li key={step} className={`relative flex flex-col items-center gap-8 pb-16 last:pb-0 md:flex-row ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary" style={{ boxShadow: "0 0 24px rgba(94, 106, 210, 0.15)" }}>
                  {step}
                </div>
                <div className={`w-full max-w-sm rounded-2xl border border-border bg-background p-6 ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}>
                  <h3 className="text-base font-bold text-foreground" style={{ fontWeight: 590 }}>{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Tell us about your challenge and we&apos;ll recommend the right solution — no sales pressure, just honest advice.
            </p>
            <div className="mt-10">
              <Button href="/contact">Book a Free Consultation</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
