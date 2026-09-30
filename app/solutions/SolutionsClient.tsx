"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleNetwork from "@/components/ParticleNetwork";

gsap.registerPlugin(ScrollTrigger);

const SEGMENTS = [
  {
    id: "startups",
    label: "Startups",
    headline: "Ship fast without burning runway",
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
    id: "smes",
    label: "SMEs",
    headline: "Enterprise capability without enterprise headcount",
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
    id: "enterprises",
    label: "Enterprises",
    headline: "From AI pilots to production-grade systems",
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
    id: "agencies",
    label: "Agencies",
    headline: "Offer AI without building it in-house",
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

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

export default function SolutionsClient() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const seg = SEGMENTS[active];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".sol-hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".sol-fade").forEach((el) => {
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

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      panel,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [active]);

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
          <p className="sol-hero-reveal flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Who we help
          </p>
          <h1
            className="sol-hero-reveal mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Solutions for every{" "}
            <span className="text-primary">stage of growth</span>
          </h1>
          <p className="sol-hero-reveal mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Whether you&apos;re a two-person startup or a global enterprise, we build AI
            and automation solutions shaped around your specific challenges.
          </p>
        </div>
      </section>

      {/* SEGMENT SWITCHER */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="sol-fade flex flex-wrap gap-2" role="tablist" aria-label="Business segments">
            {SEGMENTS.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  i === active
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-muted hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div key={seg.id} ref={panelRef} className="mt-16">
            <div className="mb-12 max-w-3xl">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
                {seg.label}
              </p>
              <h2
                className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl"
                style={{ fontWeight: 700 }}
              >
                {seg.headline}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Pain points */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  The challenges you face
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {seg.painPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-sm leading-7 text-muted">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  How ConnectXeo helps
                </h3>
                <div className="mt-6 flex flex-col gap-4">
                  {seg.solutions.map((sol) => (
                    <div
                      key={sol.title}
                      className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors duration-500 hover:border-primary/40"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-foreground" style={{ fontWeight: 700 }}>
                          {sol.title}
                        </h4>
                        <p className="mt-1 text-sm leading-7 text-muted">{sol.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-40 lg:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            Don&apos;t see your exact situation?
          </p>
          <h2
            className="mx-auto mt-6 max-w-5xl text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Every business is different. Let&apos;s talk.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Book a free 30-minute call and we&apos;ll tell you honestly whether and how
            we can help.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Book a free call
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/services"
              className="text-sm font-semibold text-muted underline decoration-border underline-offset-8 transition-colors hover:text-foreground"
            >
              See our services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
