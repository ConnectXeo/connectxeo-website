import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About Us — ConnectXeo",
  description:
    "Learn about ConnectXeo — founded in 2025 by Sami Ullah in Pakistan. Our mission is to make AI and automation accessible to every business.",
};

const VALUES = [
  { title: "Innovation", desc: "We push the boundaries of what AI can do, shipping ideas that are months ahead of the curve." },
  { title: "Quality", desc: "Every line of code, every model, and every design is held to the highest production standard." },
  { title: "Trust", desc: "We build long-term partnerships. Transparent communication and honest delivery — always." },
  { title: "Impact", desc: "We measure success by the real-world outcomes we unlock for the businesses we serve." },
];

const WHAT_WE_BUILD = [
  { title: "AI / ML Solutions", desc: "Custom model training, fine-tuning, computer vision, NLP, and end-to-end ML pipelines." },
  { title: "Agentic Systems", desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows without human supervision." },
  { title: "Automation", desc: "End-to-end process automation that eliminates repetitive work across your entire technology stack." },
  { title: "Web Development", desc: "Fast, responsive, and scalable web applications built with modern frameworks and clean architecture." },
  { title: "Model Training", desc: "Specialised training pipelines including RLHF, LoRA fine-tuning, and domain adaptation." },
  { title: "Cloud Solutions", desc: "Cloud-native architecture, DevOps pipelines, and infrastructure that scales with your growth." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/3 h-[520px] w-[700px] rounded-full bg-primary opacity-[0.07] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up"><Badge>About ConnectXeo</Badge></div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
              Building the AI-powered{" "}
              <span className="text-primary">future of business</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted animate-fade-up-delay-2">
              ConnectXeo is a SaaS company on a mission to bring world-class AI, automation,
              and intelligent tooling to businesses of every size.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">Our Story</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
                Founded in 2025, rooted in Pakistan
              </h2>
              <div className="mt-6 space-y-4 text-muted leading-7 text-[15px]">
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
                  integrate cutting-edge AI into their products and operations.
                </p>
                <p>
                  Today, we operate as a fully AI-augmented SaaS company, combining human
                  expertise with intelligent agents to deliver faster, higher-quality outcomes
                  than traditional agencies can match.
                </p>
              </div>
            </div>

            <Card className="p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  SU
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sami Ullah</p>
                  <p className="text-sm text-muted">Founder &amp; AI Engineer</p>
                </div>
              </div>
              <blockquote className="border-l-2 border-primary pl-4 italic text-muted text-sm leading-6">
                &ldquo;Every business deserves access to AI that actually works — not
                buzzwords, but real automation and intelligence that moves the needle.&rdquo;
              </blockquote>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontWeight: 590 }}>2025</p>
                  <p className="mt-0.5 text-xs text-muted">Founded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontWeight: 590 }}>16+</p>
                  <p className="mt-0.5 text-xs text-muted">Team Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground" style={{ fontWeight: 590 }}>6</p>
                  <p className="mt-0.5 text-xs text-muted">Service Areas</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading eyebrow="Our Mission" title="One sentence. Absolute clarity." />
            <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.03] px-8 py-12">
              <p className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
                &ldquo;To make AI and automation{" "}
                <span className="text-primary">accessible to every business.</span>&rdquo;
              </p>
            </div>
            <p className="mt-6 text-muted leading-7">
              We strip away the complexity, the jargon, and the gatekeeping — so businesses of
              every size can harness AI that delivers measurable, real-world results.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeading eyebrow="What Guides Us" title="Our core values" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.title} hover className="p-6">
                <h3 className="text-lg font-semibold text-foreground" style={{ fontWeight: 590 }}>{v.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="What we build"
            description="Six specialised practice areas, each backed by deep expertise and a track record of real results."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_BUILD.map((item) => (
              <Card key={item.title} hover className="p-6">
                <h3 className="text-[15px] font-semibold text-foreground" style={{ fontWeight: 590 }}>{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center" style={{ boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
              Ready to work with us?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Let&apos;s talk about what you&apos;re building. Whether you need a full AI stack or just
              one piece of the puzzle, we&apos;re here to help.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact">Get in touch</Button>
              <Button href="/team" variant="secondary">Meet the team</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
