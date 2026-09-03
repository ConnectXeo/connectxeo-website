import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions — ConnectXeo",
  description:
    "ConnectXeo AI and automation solutions for startups, SMEs, enterprises, and agencies. Discover how we solve your biggest challenges.",
};

const SEGMENTS = [
  {
    id: "startups",
    label: "Startups",
    emoji: "🚀",
    tagClass: "bg-violet-950/60 text-violet-300 border-violet-700/40",
    cardClass: "border-violet-700/30 hover:border-violet-600/60",
    glowClass: "bg-violet-600/10",
    accentClass: "text-violet-400",
    painPoints: [
      "Small team, massive backlog — not enough hours to build everything",
      "Burning runway on manual tasks instead of product development",
      "Struggling to compete with larger, better-resourced competitors",
      "Need to ship fast but can't afford to sacrifice quality",
    ],
    solutions: [
      {
        title: "AI-Powered MVPs",
        desc: "Ship a working AI product in weeks, not months. We handle the ML stack so your team focuses on the business logic.",
      },
      {
        title: "Workflow Automation",
        desc: "Automate your most repetitive tasks first — lead qualification, onboarding, reporting — freeing your team for higher-impact work.",
      },
      {
        title: "Growth Infrastructure",
        desc: "From voice agents that qualify inbound leads to AI-driven content pipelines, we build the systems that scale with you.",
      },
    ],
  },
  {
    id: "smes",
    label: "SMEs",
    emoji: "🏢",
    tagClass: "bg-blue-950/60 text-blue-300 border-blue-700/40",
    cardClass: "border-blue-700/30 hover:border-blue-600/60",
    glowClass: "bg-blue-600/10",
    accentClass: "text-blue-400",
    painPoints: [
      "Processes that worked at 10 employees are breaking at 50+",
      "Customer support costs are spiralling out of control",
      "Data siloed across spreadsheets, CRMs, and email — no single source of truth",
      "Can't justify a full data science hire but need AI capabilities now",
    ],
    solutions: [
      {
        title: "Intelligent Automation",
        desc: "Replace manual multi-step processes with AI workflows. Invoice processing, customer triage, inventory alerts — all automated.",
      },
      {
        title: "AI Customer Support",
        desc: "Deploy a voice or chat agent that handles tier-1 support 24/7, escalating only the complex cases to your team.",
      },
      {
        title: "Data Unification",
        desc: "Connect your systems and build a single intelligence layer that lets you query and act on your business data with AI.",
      },
    ],
  },
  {
    id: "enterprises",
    label: "Enterprises",
    emoji: "🌐",
    tagClass: "bg-cyan-950/60 text-cyan-300 border-cyan-700/40",
    cardClass: "border-cyan-700/30 hover:border-cyan-600/60",
    glowClass: "bg-cyan-600/10",
    accentClass: "text-cyan-400",
    painPoints: [
      "Legacy systems and complex compliance requirements slow AI adoption",
      "Internal AI pilots stuck in POC — can't reach production",
      "Multiple vendors, no unified AI strategy",
      "Fear of hallucination and inaccuracy in critical workflows",
    ],
    solutions: [
      {
        title: "Custom Model Training",
        desc: "Fine-tune and align LLMs on your proprietary data and domain. Production-grade accuracy with auditability built in.",
      },
      {
        title: "Enterprise AI Integration",
        desc: "We bridge the gap between POC and production — hardened pipelines, compliance-aware architecture, and internal SLAs.",
      },
      {
        title: "Agentic Orchestration",
        desc: "Multi-agent systems that coordinate complex enterprise workflows — approvals, research, reporting — with human oversight gates.",
      },
    ],
  },
  {
    id: "agencies",
    label: "Agencies",
    emoji: "🎯",
    tagClass: "bg-rose-950/60 text-rose-300 border-rose-700/40",
    cardClass: "border-rose-700/30 hover:border-rose-600/60",
    glowClass: "bg-rose-600/10",
    accentClass: "text-rose-400",
    painPoints: [
      "Clients are asking for AI and you don't have the capability in-house",
      "Content production is bottlenecked by human bandwidth",
      "Margins are being squeezed — need to deliver more for less",
      "Hard to differentiate in a crowded agency market",
    ],
    solutions: [
      {
        title: "White-Label AI Build",
        desc: "We build AI products and automations that you deliver under your brand. Your client relationships, our engineering.",
      },
      {
        title: "AI Content Pipelines",
        desc: "Automated research, drafting, scheduling, and performance monitoring — cut content production time by 70%.",
      },
      {
        title: "AI Service Productisation",
        desc: "We help you package AI as a recurring service offering — from discovery to pricing to delivery playbook.",
      },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-700/40 text-violet-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            Who We Help
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Solutions for every{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              stage of growth
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Whether you&apos;re a two-person startup or a global enterprise, we build AI and
            automation solutions shaped around your specific challenges.
          </p>

          {/* Segment quick-nav */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {SEGMENTS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`flex items-center gap-2 border text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105 ${s.tagClass}`}
              >
                <span>{s.emoji}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        {SEGMENTS.map((seg) => (
          <section
            key={seg.id}
            id={seg.id}
            className="relative scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Ambient glow */}
            <div
              className={`absolute -inset-20 ${seg.glowClass} rounded-full blur-3xl pointer-events-none opacity-40`}
            />

            {/* Left: pain points */}
            <div className="relative">
              <div
                className={`inline-flex items-center gap-2 border text-sm font-medium px-3 py-1 rounded-full mb-4 ${seg.tagClass}`}
              >
                <span>{seg.emoji}</span>
                {seg.label}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The challenges you face
              </h2>
              <p className="text-slate-400 mb-6">
                We&apos;ve worked with dozens of {seg.label.toLowerCase()}. These are the
                challenges we hear most.
              </p>
              <ul className="space-y-3">
                {seg.painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: solutions */}
            <div className="relative space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How ConnectXeo helps
              </h2>
              {seg.solutions.map((sol) => (
                <div
                  key={sol.title}
                  className={`bg-slate-900/60 border rounded-2xl p-5 transition-all ${seg.cardClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 flex-shrink-0 ${seg.accentClass}`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{sol.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t see your exact situation?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Every business is different. Book a free 30-minute call and we&apos;ll tell you
            honestly whether and how we can help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Book a free call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              See our services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
