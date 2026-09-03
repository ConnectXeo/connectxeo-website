import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agentic Solutions & Voice Agents — ConnectXeo",
  description:
    "Autonomous AI agents and real-time voice agents that reason, plan, and execute complex workflows. Multi-agent systems, RAG pipelines, and conversational AI.",
};

const INCLUDED = [
  "Autonomous agent design and orchestration architecture",
  "Multi-agent systems with role specialisation and coordination",
  "Tool-use agents: web search, APIs, databases, code execution",
  "Retrieval-Augmented Generation (RAG) pipelines",
  "Real-time voice agents with sub-200ms response latency",
  "Speech-to-text and text-to-speech integration (Whisper, ElevenLabs)",
  "Telephony integration (Twilio, Vapi, LiveKit)",
  "Memory systems: short-term, long-term, and episodic",
  "Human-in-the-loop escalation and approval workflows",
  "Agent monitoring, tracing, and debugging dashboards",
];

const USE_CASES = [
  {
    title: "AI Customer Support",
    desc: "Voice and chat agents that resolve 80%+ of support queries autonomously — escalating only when genuinely needed.",
    icon: "🎧",
  },
  {
    title: "Sales Development Reps",
    desc: "Outbound calling agents that qualify leads, book demos, and update your CRM — working 24/7 without burnout.",
    icon: "📞",
  },
  {
    title: "Research Assistants",
    desc: "Agents that browse the web, read documents, synthesise findings, and write reports — hours of work in minutes.",
    icon: "🔍",
  },
  {
    title: "DevOps Automation",
    desc: "Agents that monitor infrastructure, diagnose alerts, and trigger runbooks — keeping systems healthy autonomously.",
    icon: "⚙️",
  },
  {
    title: "Healthcare Intake",
    desc: "Voice agents that collect patient history, schedule appointments, and pre-fill EMR forms before the doctor sees them.",
    icon: "🏥",
  },
  {
    title: "E-commerce Concierge",
    desc: "Conversational agents that guide shoppers, handle returns, and upsell — integrated with your order management system.",
    icon: "🛒",
  },
];

const TECH = [
  "LangChain / LangGraph", "CrewAI", "AutoGen", "OpenAI Agents SDK",
  "Whisper", "ElevenLabs", "Twilio", "Vapi",
  "LiveKit", "Pinecone", "Weaviate", "FastAPI",
];

export default function AgenticPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-cyan-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-sky-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Agentic Solutions & Voice Agents</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-500 uppercase tracking-widest">
              Autonomous
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Agentic Solutions{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                & Voice Agents
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              We build autonomous AI agents that reason, plan, and act — and
              voice agents that speak, listen, and resolve in real time. Your
              workflows, running themselves.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Included ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything included
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              From single-agent tools to multi-agent orchestration and real-time
              voice interfaces — we architect and deploy the full stack.
            </p>

            <ul className="mt-8 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="text-sm leading-6 text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Tech Stack</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <hr className="my-8 border-border" />

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Key metrics we target</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["< 200ms", "Voice agent first-response latency"],
                ["80%+", "Autonomous resolution rate (no human needed)"],
                ["99.9%", "Uptime on agent infrastructure"],
                ["24/7", "Operation — no shifts, no breaks, no sick days"],
              ].map(([stat, desc]) => (
                <li key={stat} className="flex items-start gap-4">
                  <span className="shrink-0 text-lg font-bold text-primary whitespace-nowrap">{stat}</span>
                  <span className="text-sm leading-6 text-muted">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Use Cases ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Real-world use cases
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              Where autonomous agents and voice AI are already delivering ROI.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map(({ title, desc, icon }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="text-base font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let your business run itself
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Whether you need a voice agent answering calls or a fleet of
              autonomous agents managing complex workflows — we build it, deploy
              it, and keep it running.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Build Your Agent
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-border px-10 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Explore Other Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
