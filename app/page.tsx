import Link from "next/link";
import Hero3DWrapper from "@/components/Hero3DWrapper";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICES = [
  {
    slug: "ai-ml",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: "AI / ML Solutions",
    desc: "Custom model training, fine-tuning, and end-to-end ML pipelines for your business.",
  },
  {
    slug: "agentic",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    title: "Agentic Solutions",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows.",
  },
  {
    slug: "automation",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Automation",
    desc: "End-to-end process automation eliminating repetitive work across your entire stack.",
  },
  {
    slug: "model-training",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 6 0m-6 0H2.25m11.25 0a3 3 0 0 0 3-3m-3 3a3 3 0 1 1-6 0m0 0H8.25m13.5-3a3 3 0 0 1-3 3" />
      </svg>
    ),
    title: "Model Training",
    desc: "Fine-tune foundation models on your proprietary data for domain-specific performance.",
  },
  {
    slug: "web-development",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: "Web Development",
    desc: "Fast, responsive, and scalable web apps built with modern frameworks and clean code.",
  },
  {
    slug: "cloud",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
    title: "Cloud Solutions",
    desc: "Architected cloud infrastructure — secure, scalable, and optimised for AI workloads.",
  },
];

const STEPS = [
  { step: "01", label: "Consult", desc: "We listen first. A discovery call where we understand your goals, constraints, and the problem worth solving." },
  { step: "02", label: "Build", desc: "Our team designs and engineers the solution — iterating quickly with continuous feedback from you." },
  { step: "03", label: "Deploy", desc: "We ship to production, monitor performance, and stay on call to ensure everything runs perfectly." },
];

const VALUE_PROPS = [
  { title: "AI-First by Default", desc: "Every solution is designed with intelligent automation at its core — not bolted on as an afterthought." },
  { title: "Global Reach, Local Rates", desc: "Pakistan-based team with global clients. Enterprise quality without the enterprise price tag." },
  { title: "Trusted & Transparent", desc: "Clear timelines, honest pricing, and open communication from kickoff to delivery." },
  { title: "Rapid Delivery", desc: "We ship fast. MVP in weeks, not months — then we iterate based on real-world feedback." },
];

const STATS = [
  { label: "Services", value: "6+" },
  { label: "AI-Powered", value: "100%" },
  { label: "Based in", value: "Pakistan" },
  { label: "Clients", value: "Global" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <Hero3DWrapper className="opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up">
              <Badge pulse>AI & Automation Agency</Badge>
            </div>

            <h1
              className="mt-8 text-5xl font-bold text-foreground sm:text-6xl lg:text-7xl animate-fade-up-delay-1"
              style={{ fontWeight: 510, letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              Build Smarter.{" "}
              <span className="text-primary">Scale Faster.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted animate-fade-up-delay-2">
              ConnectXeo delivers end-to-end AI, automation, and cloud solutions
              that help businesses move faster, cut costs, and stay ahead in a
              world driven by intelligent technology.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up-delay-3">
              <Button href="/contact">Get Started</Button>
              <Button href="/services" variant="secondary">Our Services</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center">
                <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</dt>
                <dd className="text-2xl font-bold text-foreground" style={{ fontWeight: 590 }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Six services, one team"
          description="From custom AI models to cloud infrastructure — we cover the full stack so you don't have to."
          center
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, icon, title, desc }) => (
            <Link key={slug} href={`/services/${slug}`} className="group">
              <Card hover className="h-full p-6 flex flex-col gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {icon}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground" style={{ fontWeight: 590 }}>{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{desc}</p>
                </div>
                <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work"
            description="A straightforward process that gets you from idea to live product without the chaos."
            center
          />
          <ol className="relative mt-16 grid gap-8 sm:grid-cols-3">
            <div aria-hidden="true" className="absolute top-8 left-1/2 hidden h-px w-[calc(100%-8rem)] -translate-x-1/2 border-t border-dashed border-border sm:block" />
            {STEPS.map(({ step, label, desc }) => (
              <li key={step} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-xl font-bold text-primary shadow-lg shadow-primary/10">
                  {step}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground" style={{ fontWeight: 590 }}>{label}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why ConnectXeo */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Us"
          title="Why ConnectXeo?"
          description="We combine technical depth with business clarity so you get outcomes, not just deliverables."
          center
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {VALUE_PROPS.map(({ title, desc }) => (
            <Card key={title} className="p-6 flex items-start gap-4">
              <span className="mt-0.5 flex-shrink-0 text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground" style={{ fontWeight: 590 }}>{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
              Ready to build something{" "}
              <span className="text-primary">great?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              Tell us about your project and let&apos;s figure out how AI and
              automation can take it to the next level.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact">Let&apos;s Talk</Button>
              <Button href="/services" variant="secondary">Explore Services</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
