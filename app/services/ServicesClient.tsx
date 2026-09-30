"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleNetwork from "@/components/ParticleNetwork";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    n: "01",
    slug: "ai-ml",
    title: "AI / ML Solutions",
    tagline: "From raw data to production-grade predictions",
    desc: "Custom model training, fine-tuning, and end-to-end ML pipelines — from raw data to production-grade predictions at scale. We design, build, and operate the models that power your product.",
    features: ["Predictive Analytics", "Computer Vision", "NLP Models", "MLOps Pipelines"],
  },
  {
    n: "02",
    slug: "model-training",
    title: "Custom Model Training",
    tagline: "Foundation models, tuned on your data",
    desc: "Fine-tune foundation models on your proprietary data for domain-specific performance that generic APIs simply can't match — evaluated, benchmarked, and deployment-ready.",
    features: ["LLM Fine-tuning", "LoRA / QLoRA", "Dataset Curation", "Model Evaluation"],
  },
  {
    n: "03",
    slug: "agentic",
    title: "Agentic Systems & Voice",
    tagline: "Agents that reason, plan, and act",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows — plus voice agents that speak and listen in real time, with human oversight built in.",
    features: ["Multi-Agent Systems", "Voice Interfaces", "Tool-Use Agents", "RAG Pipelines"],
  },
  {
    n: "04",
    slug: "automation",
    title: "Automation",
    tagline: "Workflows that run while you sleep",
    desc: "End-to-end process automation that eliminates repetitive work, connects your entire tool stack, and runs 24/7 without intervention — so your team does higher-impact work.",
    features: ["Workflow Automation", "API Integration", "RPA Bots", "n8n / Make Flows"],
  },
  {
    n: "05",
    slug: "web-development",
    title: "Web Engineering",
    tagline: "Fast, scalable, built to convert",
    desc: "High-performance web apps — from landing pages to full SaaS platforms — built on modern frameworks, accessible by default, and shipped in weeks, not months.",
    features: ["Next.js / React", "SaaS Platforms", "API Development", "UI/UX Design"],
  },
  {
    n: "06",
    slug: "cloud",
    title: "Cloud Infrastructure",
    tagline: "Secure, scalable, cost-optimised",
    desc: "Scalable, secure cloud infrastructure — from initial architecture to continuous optimisation across AWS, GCP, and Azure. Your team ships; we keep the lights on.",
    features: ["Cloud Architecture", "DevOps & CI/CD", "Kubernetes", "Cost Optimisation"],
  },
];

const FLOW = ["Data", "Models", "Agents", "Automation", "Cloud", "Product"];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function ServicesClient() {
  const [open, setOpen] = useState<number | null>(0);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".svc-hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".svc-fade").forEach((el) => {
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

  return (
    <main ref={rootRef} className="overflow-x-hidden w-full max-w-full">
      {/* HERO */}
      <section className="grain relative flex min-h-[92vh] items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.5)_55%,rgba(8,9,10,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-48 sm:px-6 lg:px-8">
          <p className="svc-hero-reveal flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            What we do
          </p>
          <h1
            className="svc-hero-reveal mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Six practices.{" "}
            <span className="text-primary">One team.</span>
          </h1>
          <p className="svc-hero-reveal mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            From custom AI models to cloud infrastructure — every service is engineered,
            measured, and shipped by the same integrated team. Pick one, or compose the full stack.
          </p>
        </div>
      </section>

      {/* SERVICES INDEX — Accordion */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="svc-fade mb-4 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl" style={{ fontWeight: 700 }}>
              The index
            </h2>
            <span className="font-mono text-xs tracking-widest text-muted">01 — 06</span>
          </div>

          <div className="border-t border-border">
            {SERVICES.map((s, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={s.slug}
                  className={`svc-fade border-b border-border transition-colors duration-500 ${
                    isOpen ? "bg-card/50" : "hover:bg-card/30"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 px-2 py-7 text-left sm:gap-10 sm:px-6 sm:py-9"
                  >
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isOpen ? "text-primary" : "text-muted"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`text-2xl font-bold tracking-tight transition-all duration-500 group-hover:text-primary sm:text-4xl lg:text-5xl ${
                        isOpen ? "text-primary" : "text-foreground"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      {s.title}
                    </span>
                    <span className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-500 group-hover:border-primary group-hover:text-primary">
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 px-2 pb-10 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:pb-14 lg:pl-[7.5rem]">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                            {s.tagline}
                          </p>
                          <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
                            {s.desc}
                          </p>
                        </div>
                        <div className="flex flex-col justify-between gap-8 lg:items-end">
                          <ul className="flex flex-wrap gap-2">
                            {s.features.map((f) => (
                              <li
                                key={f}
                                className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted"
                              >
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={`/services/${s.slug}`}
                            className="group/link inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
                          >
                            Explore service
                            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                              <ArrowIcon />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLOW — How services connect */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-40 lg:px-8">
          <div className="svc-fade mx-auto max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              Better together
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl" style={{ fontWeight: 700 }}>
              Every service plugs into the next
            </h2>
            <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
              No silos, no hand-offs between agencies. Each practice feeds the next —
              so your data becomes models, models become agents, and agents run on
              infrastructure you own.
            </p>
          </div>

          <div className="svc-fade mt-20 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
            {FLOW.map((node, i) => (
              <div key={node} className="flex flex-1 items-center lg:flex-col">
                <div className="group flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors duration-500 hover:border-primary/40 lg:flex-1">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
                    {node}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-full bg-border transition-colors duration-500 group-hover:bg-primary/50"
                  />
                </div>
                {i < FLOW.length - 1 && (
                  <span aria-hidden="true" className="flex items-center justify-center px-1 text-primary lg:py-2">
                    <svg className="h-4 w-4 rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-40 lg:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            Not sure where to start?
          </p>
          <h2
            className="mx-auto mt-6 max-w-5xl text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Tell us the problem. We&apos;ll bring the stack.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
            One conversation is enough to map the right combination of services —
            no sales pressure, just honest advice.
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Book a free consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
