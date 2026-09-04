import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Solutions — ConnectXeo",
  description:
    "ConnectXeo AI and automation solutions for startups, SMEs, enterprises, and agencies.",
};

const SEGMENTS = [
  {
    id: "startups", label: "Startups",
    painPoints: [
      "Small team, massive backlog — not enough hours to build everything",
      "Burning runway on manual tasks instead of product development",
      "Struggling to compete with larger, better-resourced competitors",
      "Need to ship fast but can't afford to sacrifice quality",
    ],
    solutions: [
      { title: "AI-Powered MVPs", desc: "Ship a working AI product in weeks, not months. We handle the ML stack so your team focuses on the business logic." },
      { title: "Workflow Automation", desc: "Automate your most repetitive tasks first — lead qualification, onboarding, reporting — freeing your team for higher-impact work." },
      { title: "Growth Infrastructure", desc: "From voice agents that qualify inbound leads to AI-driven content pipelines, we build the systems that scale with you." },
    ],
  },
  {
    id: "smes", label: "SMEs",
    painPoints: [
      "Processes that worked at 10 employees are breaking at 50+",
      "Customer support costs are spiralling out of control",
      "Data siloed across spreadsheets, CRMs, and email — no single source of truth",
      "Can't justify a full data science hire but need AI capabilities now",
    ],
    solutions: [
      { title: "Intelligent Automation", desc: "Replace manual multi-step processes with AI workflows. Invoice processing, customer triage, inventory alerts — all automated." },
      { title: "AI Customer Support", desc: "Deploy a voice or chat agent that handles tier-1 support 24/7, escalating only the complex cases to your team." },
      { title: "Data Unification", desc: "Connect your systems and build a single intelligence layer that lets you query and act on your business data with AI." },
    ],
  },
  {
    id: "enterprises", label: "Enterprises",
    painPoints: [
      "Legacy systems and complex compliance requirements slow AI adoption",
      "Internal AI pilots stuck in POC — can't reach production",
      "Multiple vendors, no unified AI strategy",
      "Fear of hallucination and inaccuracy in critical workflows",
    ],
    solutions: [
      { title: "Custom Model Training", desc: "Fine-tune and align LLMs on your proprietary data and domain. Production-grade accuracy with auditability built in." },
      { title: "Enterprise AI Integration", desc: "We bridge the gap between POC and production — hardened pipelines, compliance-aware architecture, and internal SLAs." },
      { title: "Agentic Orchestration", desc: "Multi-agent systems that coordinate complex enterprise workflows — approvals, research, reporting — with human oversight gates." },
    ],
  },
  {
    id: "agencies", label: "Agencies",
    painPoints: [
      "Clients are asking for AI and you don't have the capability in-house",
      "Content production is bottlenecked by human bandwidth",
      "Margins are being squeezed — need to deliver more for less",
      "Hard to differentiate in a crowded agency market",
    ],
    solutions: [
      { title: "White-Label AI Build", desc: "We build AI products and automations that you deliver under your brand. Your client relationships, our engineering." },
      { title: "AI Content Pipelines", desc: "Automated research, drafting, scheduling, and performance monitoring — cut content production time by 70%." },
      { title: "AI Service Productisation", desc: "We help you package AI as a recurring service offering — from discovery to pricing to delivery playbook." },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[700px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-up"><Badge pulse>Who We Help</Badge></div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
            Solutions for every{" "}
            <span className="text-primary">stage of growth</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto animate-fade-up-delay-2">
            Whether you&apos;re a two-person startup or a global enterprise, we build AI and
            automation solutions shaped around your specific challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10 animate-fade-up-delay-3">
            {SEGMENTS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 border border-border bg-card text-sm font-medium px-4 py-2 rounded-full transition-all hover:border-primary hover:text-primary text-muted"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-24 pt-24">
        {SEGMENTS.map((seg) => (
          <section
            key={seg.id}
            id={seg.id}
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <Badge>{seg.label}</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold mb-4" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
                The challenges you face
              </h2>
              <p className="text-muted mb-6 text-[15px]">
                We&apos;ve worked with dozens of {seg.label.toLowerCase()}. These are the challenges we hear most.
              </p>
              <ul className="space-y-3">
                {seg.painPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="text-secondary mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                    <span className="text-muted text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
                How ConnectXeo helps
              </h2>
              {seg.solutions.map((sol) => (
                <Card key={sol.title} hover className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1" style={{ fontWeight: 590 }}>{sol.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{sol.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-border bg-background-secondary">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
            Don&apos;t see your exact situation?
          </h2>
          <p className="text-muted mb-10 max-w-xl mx-auto">
            Every business is different. Book a free 30-minute call and we&apos;ll tell you
            honestly whether and how we can help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact">Book a free call</Button>
            <Button href="/services" variant="secondary">See our services</Button>
          </div>
        </div>
      </section>
    </>
  );
}
