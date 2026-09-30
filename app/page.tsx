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
    title: "AI / ML Solutions",
    desc: "Custom model training, fine-tuning, and end-to-end ML pipelines engineered around your data and your constraints.",
    art: "neural",
    slug: "/services/ai-ml",
    span: "md:col-span-3",
  },
  {
    n: "02",
    title: "Agentic Systems",
    desc: "Autonomous AI agents that reason, plan, and execute complex multi-step workflows — with human oversight built in.",
    art: null,
    slug: "/services/agentic",
    span: "md:col-span-3",
  },
  {
    n: "03",
    title: "Automation",
    desc: "End-to-end process automation that eliminates repetitive work across your entire stack.",
    art: null,
    slug: "/services/automation",
    span: "md:col-span-2",
  },
  {
    n: "04",
    title: "Model Training",
    desc: "Fine-tune foundation models on your proprietary data for domain-specific performance.",
    art: null,
    slug: "/services/model-training",
    span: "md:col-span-2",
  },
  {
    n: "05",
    title: "Web Engineering",
    desc: "Fast, responsive, scalable web apps built with modern frameworks and clean architecture.",
    art: null,
    slug: "/services/web-development",
    span: "md:col-span-2",
  },
  {
    n: "06",
    title: "Cloud Infrastructure",
    desc: "Cloud-native architecture, DevOps pipelines, and infrastructure that scales with your growth — secure by default, optimised for AI workloads, and managed end-to-end so your team ships instead of babysitting servers.",
    art: "cloud",
    slug: "/services/cloud",
    span: "md:col-span-6",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "We start with your problem, not your brief. A focused discovery phase to map goals, constraints, and the metric that actually matters.",
  },
  {
    n: "02",
    title: "Design",
    desc: "Architecture before code. We design the system end-to-end — data flow, model choice, interface — and pressure-test it with you.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Short iterations, shipped weekly. You see working software from the first sprint, not a PowerPoint at the end.",
  },
  {
    n: "04",
    title: "Deploy",
    desc: "Production-ready on day one. CI/CD, monitoring, and observability are part of the build, not an afterthought.",
  },
  {
    n: "05",
    title: "Scale",
    desc: "We measure real-world performance, tune what underperforms, and stay on call as your usage grows.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "ConnectXeo rebuilt our support stack with a voice agent that resolves the majority of tier-1 queries overnight. They shipped in four weeks — our team stopped drowning in tickets.",
    name: "Sarah Mitchell",
    role: "COO, Northgate Logistics",
    initials: "SM",
  },
  {
    quote:
      "They fine-tuned a model on our legal corpus and wired it into our review workflow. Accuracy went up, review time went down, and our lawyers finally trust the tool.",
    name: "David Okafor",
    role: "Founder, Lexbridge",
    initials: "DO",
  },
  {
    quote:
      "From infra to frontend, one team handled everything. Our dashboard runs on real-time data now, and the infrastructure bill is a third of what we used to pay.",
    name: "Amara Chen",
    role: "CTO, Finflow",
    initials: "AC",
  },
];

const MARQUEE = [
  "AI/ML Systems",
  "Agentic AI",
  "Voice Agents",
  "Workflow Automation",
  "Cloud Infrastructure",
  "Web Engineering",
  "Model Training",
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.6 4.8 2.4 6.6 7.2 7.2-4.8.6-6.6 2.4-7.2 7.2-.6-4.8-2.4-6.6-7.2-7.2C9.6 8.6 11.4 6.8 12 2Z" />
      <path d="M19 14c.3 2.4 1.2 3.3 3.6 3.6-2.4.3-3.3 1.2-3.6 3.6-.3-2.4-1.2-3.3-3.6-3.6 2.4-.3 3.3-1.2 3.6-3.6Z" opacity=".6" />
    </svg>
  );
}

function NeuralArt() {
  const layers = [
    [40, 60, 180, 300],
    [150, 30, 90, 150, 210, 270],
    [260, 70, 230],
  ];
  const lines: string[] = [];
  for (let i = 0; i < layers[0].length; i++) {
    for (let j = 0; j < layers[1].length; j++) {
      lines.push(`M 40 ${layers[0][i]} L 150 ${layers[1][j]}`);
    }
  }
  for (let i = 0; i < layers[1].length; i++) {
    for (let j = 0; j < layers[2].length; j++) {
      lines.push(`M 150 ${layers[1][i]} L 260 ${layers[2][j]}`);
    }
  }
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden="true">
      {lines.map((d, i) => (
        <path key={i} d={d} stroke="rgba(94,106,210,0.25)" strokeWidth="1" fill="none" />
      ))}
      {layers.flat().map((y, i) => {
        const x = i < layers[0].length ? 40 : i < layers[0].length + layers[1].length ? 150 : 260;
        return <circle key={i} cx={x} cy={y} r="5" fill="#0f1011" stroke="#5e6ad2" strokeWidth="1.5" />;
      })}
      <circle cx="150" cy="150" r="9" fill="rgba(94,106,210,0.25)" stroke="#5e6ad2" strokeWidth="1.5" />
    </svg>
  );
}

function CloudArt() {
  const rows = 5;
  const cols = 9;
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 30 + c * 32;
      const y = 40 + r * 44;
      const hot = (r + c) % 4 === 0;
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={x}
          cy={y}
          r={hot ? 4 : 2}
          fill={hot ? "#5e6ad2" : "rgba(94,106,210,0.3)"}
        />
      );
    }
  }
  return (
    <svg viewBox="0 0 300 240" className="h-full w-full" aria-hidden="true">
      {Array.from({ length: cols - 1 }, (_, c) => (
        <line
          key={`v${c}`}
          x1={30 + c * 32}
          y1={40}
          x2={30 + c * 32}
          y2={40 + (rows - 1) * 44}
          stroke="rgba(94,106,210,0.12)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, r) => (
        <line
          key={`h${r}`}
          x1={30}
          y1={40 + r * 44}
          x2={30 + (cols - 1) * 32}
          y2={40 + r * 44}
          stroke="rgba(94,106,210,0.12)"
          strokeWidth="1"
        />
      ))}
      {dots}
      <path
        d="M 60 200 Q 150 160 240 200"
        stroke="rgba(94,106,210,0.5)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

function HeroPill() {
  return (
    <svg viewBox="0 0 200 60" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="pillg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5e6ad2" />
          <stop offset="100%" stopColor="#9a5eb8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="198" height="58" rx="29" fill="none" stroke="rgba(255,255,255,0.25)" />
      <circle cx="50" cy="30" r="6" fill="url(#pillg)" />
      <circle cx="100" cy="18" r="4" fill="url(#pillg)" opacity="0.8" />
      <circle cx="150" cy="40" r="5" fill="url(#pillg)" opacity="0.9" />
      <circle cx="100" cy="42" r="3" fill="url(#pillg)" opacity="0.6" />
      <path d="M 50 30 L 100 18 M 100 18 L 150 40 M 50 30 L 100 42 M 100 42 L 150 40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const processSectionRef = useRef<HTMLElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processProgressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".fade-section").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".bento-art").forEach((art) => {
        gsap.fromTo(
          art,
          { scale: 0.85, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: art, start: "top 95%", end: "top 45%", scrub: 1 },
          }
        );
      });

      if (processSectionRef.current && processTrackRef.current) {
        const track = processTrackRef.current;
        const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);

        gsap.to(track, {
          x: () => -getAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: processSectionRef.current,
            start: "top top",
            end: () => `+=${getAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (processProgressRef.current) {
          gsap.fromTo(
            processProgressRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: processSectionRef.current,
                start: "top top",
                end: () => `+=${getAmount()}`,
                scrub: 1,
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, [active]);

  const t = TESTIMONIALS[active];

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* HERO — Cinematic Center */}
      <section ref={heroRef} className="grain relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.45)_55%,rgba(8,9,10,0.9)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-40 text-center sm:pt-44">
          <p className="hero-reveal mx-auto flex w-fit items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            AI &amp; Automation Agency
          </p>

          <h1
            className="hero-reveal mx-auto mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            <span className="block">Intelligence that moves</span>
            <span className="block">
              business{" "}
              <span className="mx-[0.12em] inline-block h-[0.68em] w-[2.4em] overflow-hidden rounded-full align-[-0.06em] ring-1 ring-border">
                <HeroPill />
              </span>{" "}
              forward
            </span>
          </h1>

          <p className="hero-reveal mx-auto mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            ConnectXeo designs, builds, and ships end-to-end AI systems, automation, and
            cloud infrastructure for companies that refuse to move slow.
          </p>

          <div className="hero-reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all duration-300 hover:opacity-85"
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Explore services
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
            <div className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-muted" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-border bg-background-secondary py-7" aria-hidden="true">
        <div className="animate-marquee flex w-max">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="whitespace-nowrap px-8 text-sm font-semibold uppercase tracking-[0.35em] text-muted">
                {item}
              </span>
              <SparkIcon />
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — Gapless Bento */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-48 lg:px-8">
        <div className="fade-section mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            What we do
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
            Capabilities that compound
          </h2>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Six practices, one integrated team. Every engagement is engineered,
            measured, and shipped — not slid across a desk.
          </p>
        </div>

        <div className="mt-20 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-6">
          {SERVICES.map((s) => (
            <Link
              key={s.n}
              href={s.slug}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-500 hover:border-primary/40 ${s.span}`}
            >
              {s.art && (
                <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-border bg-background-secondary sm:h-64">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(94,106,210,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(94,106,210,0.08) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="bento-art relative h-40 w-40 sm:h-48 sm:w-48">
                    {s.art === "neural" ? <NeuralArt /> : <CloudArt />}
                  </div>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium tracking-widest text-muted">{s.n}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl" style={{ fontWeight: 700 }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-7 text-muted">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS — Horizontal Scroll */}
      <section ref={processSectionRef} className="overflow-hidden border-y border-border bg-background-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-32 sm:px-6 md:pt-48 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="fade-section">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
              How we work
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl" style={{ fontWeight: 700 }}>
              From first call to production
            </h2>
          </div>
          <p className="fade-section max-w-sm text-sm leading-7 text-muted lg:pb-2 lg:text-right">
            A straightforward process that gets you from idea to live product
            without the chaos. Scroll through the five phases.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-3 px-4 pb-8 sm:px-6 lg:px-8">
          <span className="font-mono text-xs text-muted">01</span>
          <div className="h-px flex-1 bg-border">
            <div ref={processProgressRef} className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="font-mono text-xs text-muted">05</span>
        </div>

        <div
          ref={processTrackRef}
          className="flex w-max gap-5 px-4 pb-32 sm:px-6 md:pb-48 lg:px-8"
        >
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="group flex min-w-[82vw] flex-col gap-6 rounded-3xl border border-border bg-card p-8 transition-colors duration-500 hover:border-primary/40 sm:min-w-[420px] sm:p-12"
            >
              <span
                aria-hidden="true"
                className="text-7xl font-bold leading-none tracking-tight text-primary/15 transition-colors duration-500 group-hover:text-primary/30 sm:text-8xl"
                style={{ fontWeight: 700 }}
              >
                {step.n}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-muted sm:text-base">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="flex min-w-[60vw] items-center justify-center sm:min-w-[380px]">
            <Link
              href="/contact"
              className="group flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border p-10 text-center transition-colors duration-500 hover:border-primary"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-transform duration-500 group-hover:scale-110">
                <ArrowIcon />
              </span>
              <span className="text-xl font-bold text-foreground" style={{ fontWeight: 700 }}>
                Book a discovery call
              </span>
              <span className="text-sm text-muted">Free, focused, and honest.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — Clear Carousel */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 md:py-48 lg:px-8">
        <div className="fade-section mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            Client signal
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
            Proof, not promises
          </h2>
        </div>

        <div className="fade-section mx-auto mt-20 max-w-4xl">
          <div className="relative rounded-3xl border border-border bg-card p-8 sm:p-14">
            <svg
              aria-hidden="true"
              className="absolute -top-5 left-8 h-10 w-10 text-primary sm:left-14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v2h5v-5H6.5A3.5 3.5 0 0 1 10 8Zm10 0c-3.3 0-6 2.7-6 6v2h5v-5h-2.5A3.5 3.5 0 0 1 20 8Z" />
            </svg>

            <div key={active} className="animate-testimonial-in">
              <blockquote className="text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl sm:leading-snug lg:text-[1.75rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30">
                  {t.initials}
                </div>
                <div>
                  <p className="text-base font-bold text-foreground" style={{ fontWeight: 700 }}>
                    {t.name}
                  </p>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-primary" : "w-4 bg-border hover:bg-muted"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="mr-2 font-mono text-xs tracking-widest text-muted">
                {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setActive((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <ArrowLeftIcon />
              </button>
              <button
                onClick={() => setActive((active + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Action */}
      <section className="grain relative overflow-hidden border-t border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.08] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 md:py-48 lg:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            Next step
          </p>
          <h2 className="mx-auto mt-6 max-w-5xl text-[clamp(2.6rem,5.5vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground" style={{ fontWeight: 700 }}>
            Let&apos;s build what&apos;s next.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Tell us about your project and we&apos;ll show you exactly how AI and
            automation can take it further — in one conversation, free.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowIcon />
              </span>
            </Link>
            <a
              href="mailto:admin@connectxeo.com"
              className="text-sm font-semibold text-muted underline decoration-border underline-offset-8 transition-colors hover:text-foreground"
            >
              admin@connectxeo.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
