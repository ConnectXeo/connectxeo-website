import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — ConnectXeo",
  description:
    "Learn about ConnectXeo — founded in 2025 by Sami Ullah in Pakistan. Our mission is to make AI and automation accessible to every business.",
};

const VALUES = [
  {
    icon: "💡",
    title: "Innovation",
    desc: "We push the boundaries of what AI can do, shipping ideas that are months ahead of the curve.",
  },
  {
    icon: "🏆",
    title: "Quality",
    desc: "Every line of code, every model, and every design is held to the highest production standard.",
  },
  {
    icon: "🤝",
    title: "Trust",
    desc: "We build long-term partnerships. Transparent communication and honest delivery — always.",
  },
  {
    icon: "🚀",
    title: "Impact",
    desc: "We measure success by the real-world outcomes we unlock for the businesses we serve.",
  },
];

const WHAT_WE_BUILD = [
  {
    title: "AI / ML Solutions",
    desc: "Custom model training, fine-tuning, computer vision, NLP, and end-to-end ML pipelines.",
    color: "from-blue-500/20 to-indigo-500/10",
    badge: "bg-blue-500/10 text-blue-400",
    icon: "🧠",
  },
  {
    title: "Agentic Systems",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows without human supervision.",
    color: "from-cyan-500/20 to-teal-500/10",
    badge: "bg-cyan-500/10 text-cyan-400",
    icon: "🤖",
  },
  {
    title: "Automation",
    desc: "End-to-end process automation that eliminates repetitive work across your entire technology stack.",
    color: "from-amber-500/20 to-orange-500/10",
    badge: "bg-amber-500/10 text-amber-400",
    icon: "⚡",
  },
  {
    title: "Web Development",
    desc: "Fast, responsive, and scalable web applications built with modern frameworks and clean architecture.",
    color: "from-emerald-500/20 to-green-500/10",
    badge: "bg-emerald-500/10 text-emerald-400",
    icon: "🌐",
  },
  {
    title: "Model Training",
    desc: "Specialised training pipelines including RLHF, LoRA fine-tuning, and domain adaptation.",
    color: "from-violet-500/20 to-purple-500/10",
    badge: "bg-violet-500/10 text-violet-400",
    icon: "📚",
  },
  {
    title: "Cloud Solutions",
    desc: "Cloud-native architecture, DevOps pipelines, and infrastructure that scales with your growth.",
    color: "from-rose-500/20 to-pink-500/10",
    badge: "bg-rose-500/10 text-rose-400",
    icon: "☁️",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/3 h-[520px] w-[700px] rounded-full bg-violet-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-blue-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
              About ConnectXeo
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Building the AI-powered{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                future of business
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              ConnectXeo is a SaaS company on a mission to bring world-class AI, automation,
              and intelligent tooling to businesses of every size — from startups to enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* ── Company Story ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Text */}
            <div>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-violet-400">
                Our Story
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Founded in 2025, rooted in Pakistan
              </h2>
              <div className="mt-6 space-y-4 text-muted leading-7">
                <p>
                  ConnectXeo was founded in 2025 by{" "}
                  <span className="font-semibold text-foreground">Sami Ullah</span>, an AI
                  Engineer and entrepreneur based in Pakistan, with a single bold conviction:
                  that the power of AI and intelligent automation should not be locked behind
                  expensive consulting firms or limited to Fortune 500 companies.
                </p>
                <p>
                  Starting with a small but high-performance team of specialists, ConnectXeo
                  quickly established itself as a trusted partner for businesses seeking to
                  integrate cutting-edge AI into their products and operations — without the
                  complexity or the cost that usually comes with it.
                </p>
                <p>
                  Today, we operate as a fully AI-augmented SaaS company, combining human
                  expertise with intelligent agents to deliver faster, higher-quality outcomes
                  than traditional agencies can match.
                </p>
              </div>
            </div>

            {/* Founder card */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xl font-bold text-white">
                    SU
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sami Ullah</p>
                    <p className="text-sm text-muted">Founder &amp; AI Engineer</p>
                    <p className="text-xs text-muted mt-0.5">📍 Pakistan</p>
                  </div>
                </div>
                <blockquote className="border-l-2 border-violet-500 pl-4 italic text-muted">
                  &ldquo;Every business deserves access to AI that actually works — not
                  buzzwords, but real automation and intelligence that moves the needle.&rdquo;
                </blockquote>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">2025</p>
                    <p className="mt-0.5 text-xs text-muted">Founded</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">16+</p>
                    <p className="mt-0.5 text-xs text-muted">Team Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">6</p>
                    <p className="mt-0.5 text-xs text-muted">Service Areas</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-6 h-[200px] w-[200px] rounded-full bg-violet-500 opacity-[0.06] blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-violet-400">
              Our Mission
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              One sentence. Absolute clarity.
            </h2>
            <div className="mt-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-blue-500/5 px-8 py-10">
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                &ldquo;To make AI and automation{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  accessible to every business.
                </span>
                &rdquo;
              </p>
            </div>
            <p className="mt-6 text-muted leading-7">
              We strip away the complexity, the jargon, and the gatekeeping — so businesses of
              every size can harness AI that delivers measurable, real-world results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-violet-400">
              What Guides Us
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Our core values
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 text-3xl">{v.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ─────────────────────────────────────── */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-violet-400">
              Our Services
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              What we build
            </h2>
            <p className="mt-4 text-muted">
              Six specialised practice areas, each backed by deep expertise and a track record of real results.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_BUILD.map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border border-border bg-gradient-to-br ${item.color} p-6 shadow-sm`}
              >
                <div className="mb-3 text-3xl">{item.icon}</div>
                <span className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${item.badge}`}>
                  {item.title}
                </span>
                <p className="text-sm text-muted leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500 opacity-[0.07] blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to work with us?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Let&apos;s talk about what you&apos;re building. Whether you need a full AI stack or just
              one piece of the puzzle, we&apos;re here to help.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-500 hover:shadow-violet-500/25 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Get in touch
              </Link>
              <Link
                href="/team"
                className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                Meet the team →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
