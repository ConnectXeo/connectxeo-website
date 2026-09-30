"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleNetwork from "@/components/ParticleNetwork";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  {
    n: "01",
    title: "Innovation",
    desc: "We push the boundaries of what AI can do, shipping ideas that are months ahead of the curve.",
  },
  {
    n: "02",
    title: "Quality",
    desc: "Every line of code, every model, and every design is held to the highest production standard.",
  },
  {
    n: "03",
    title: "Trust",
    desc: "We build long-term partnerships. Transparent communication and honest delivery — always.",
  },
  {
    n: "04",
    title: "Impact",
    desc: "We measure success by the real-world outcomes we unlock for the businesses we serve.",
  },
];

const STATS = [
  { value: "2025", label: "Founded" },
  { value: "100%", label: "AI-Augmented" },
  { value: "6", label: "Service Areas" },
  { value: "Global", label: "Clients" },
];

const EXPERTISE = [
  "Machine Learning Systems",
  "LLM Fine-tuning & RAG",
  "Agentic AI & Voice Agents",
  "Cloud & MLOps",
  "Full-Stack Engineering",
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ScrubText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll(".scrub-word");
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: 1 },
      }
    );
  }, []);

  return (
    <p ref={ref} className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
      {text.split(" ").map((w, i) => (
        <span key={i} className="scrub-word mr-[0.28em] inline-block">
          {w}
        </span>
      ))}
    </p>
  );
}

export default function AboutClient() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".about-fade").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.to(".about-photo", {
        y: -60,
        ease: "none",
        scrollTrigger: { trigger: ".about-photo-wrap", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="overflow-x-hidden w-full max-w-full">
      {/* HERO */}
      <section className="grain relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.5)_55%,rgba(8,9,10,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-40 sm:px-6 md:pt-48 lg:px-8">
          <p className="about-hero-reveal flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            About ConnectXeo
          </p>
          <h1
            className="about-hero-reveal mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            We make AI work{" "}
            <span className="text-primary">for business.</span>
          </h1>
          <p className="about-hero-reveal mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            ConnectXeo is a Pakistan-based technology company on a mission to bring
            world-class AI, automation, and intelligent tooling to businesses of every size.
          </p>
          <div className="about-hero-reveal mt-12 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Work with us
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO — Scrubbing text */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-48 lg:px-8">
          <div className="about-fade mb-16 flex items-center gap-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              Our manifesto
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <ScrubText text="We believe AI should not be locked behind expensive consulting firms or reserved for Fortune 500 companies. We believe every business deserves intelligence that actually works — real automation, real models, real outcomes. So we built the company we always wanted to hire: senior engineers, honest pricing, and software that ships." />
        </div>
      </section>

      {/* FOUNDER */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 sm:px-6 md:py-40 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div className="about-photo-wrap about-fade relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl border border-primary/25"
            />
            <div className="about-photo relative overflow-hidden rounded-3xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sami_password.jpeg"
                alt="Sami Ullah — Founder & AI Engineer at ConnectXeo"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl border border-border bg-card px-6 py-4 shadow-2xl shadow-black/30">
              <p className="text-lg font-bold text-foreground" style={{ fontWeight: 700 }}>
                Sami Ullah
              </p>
              <p className="text-sm text-muted">Founder &amp; AI Engineer</p>
            </div>
          </div>

          <div>
            <p className="about-fade font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              The founder
            </p>
            <h2
              className="about-fade mt-5 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Engineer first. Founder second.
            </h2>
            <div className="about-fade mt-8 flex flex-col gap-6">
              <p className="text-base leading-8 text-muted">
                Sami Ullah is an AI Engineer and entrepreneur who founded ConnectXeo in
                2025 with a single conviction: the power of AI and intelligent automation
                should not be locked behind expensive consulting firms or limited to
                Fortune 500 companies.
              </p>
              <p className="text-base leading-8 text-muted">
                Starting with a small but high-performance team of specialists, he grew
                ConnectXeo into a fully AI-augmented company — combining human expertise
                with intelligent agents to deliver faster, higher-quality outcomes than
                traditional agencies can match.
              </p>
            </div>

            <div className="about-fade mt-10 border-t border-border pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Deep expertise in
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {EXPERTISE.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-fade mt-10 rounded-2xl border-l-2 border-primary bg-card p-6">
              <p className="text-base leading-7 text-foreground-secondary">
                &ldquo;Every business deserves access to AI that actually works — not
                buzzwords, but real automation and intelligence that moves the needle.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="about-fade flex flex-col gap-2">
                <dd
                  className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                  style={{ fontWeight: 700 }}
                >
                  {s.value}
                </dd>
                <dt className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* VALUES — Editorial rows */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-40 lg:px-8">
          <div className="about-fade mb-4 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl" style={{ fontWeight: 700 }}>
              What guides us
            </h2>
            <span className="font-mono text-xs tracking-widest text-muted">01 — 04</span>
          </div>

          <div className="border-t border-border">
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="about-fade group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-border py-8 transition-colors duration-500 hover:bg-card/40 sm:grid-cols-[auto_1fr_1.5fr] sm:gap-10 sm:px-4"
              >
                <span className="font-mono text-sm text-muted transition-colors duration-500 group-hover:text-primary">
                  {v.n}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-500 group-hover:text-primary sm:text-3xl" style={{ fontWeight: 700 }}>
                  {v.title}
                </h3>
                <p className="col-span-2 max-w-xl text-sm leading-7 text-muted sm:col-span-1 sm:text-base">
                  {v.desc}
                </p>
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
            Work with us
          </p>
          <h2
            className="mx-auto mt-6 max-w-5xl text-[clamp(2.4rem,5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Let&apos;s build what&apos;s next.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Whether you need a full AI stack or just one piece of the puzzle —
            we&apos;re here to help.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Get in touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/services"
              className="text-sm font-semibold text-muted underline decoration-border underline-offset-8 transition-colors hover:text-foreground"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
