import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Development — ConnectXeo",
  description:
    "Pixel-perfect web apps and SaaS platforms built with Next.js and React. Fast, accessible, and built to scale from launch day.",
};

const INCLUDED = [
  "UI/UX design with Figma mockups before a line of code is written",
  "Next.js and React development with TypeScript",
  "Tailwind CSS for maintainable, responsive styling",
  "Server-side rendering, static generation, and edge functions",
  "REST and GraphQL API design and development",
  "Authentication: OAuth, JWT, Clerk, NextAuth",
  "Database integration: PostgreSQL, MongoDB, Supabase, Prisma",
  "Payment integration: Stripe, PayFast, LemonSqueezy",
  "Third-party API integrations (CRMs, marketing tools, etc.)",
  "Performance optimisation, Core Web Vitals, and SEO",
  "CI/CD pipeline setup and cloud deployment",
  "Post-launch support and feature iteration",
];

const USE_CASES = [
  {
    title: "SaaS Platforms",
    desc: "Full-stack SaaS apps with subscription billing, multi-tenancy, and user dashboards — ready to sell from day one.",
    icon: "🚀",
  },
  {
    title: "Marketing Websites",
    desc: "High-converting landing pages and marketing sites that load fast, look premium, and rank well on Google.",
    icon: "🌐",
  },
  {
    title: "Admin Dashboards",
    desc: "Internal tools and data dashboards that give your team real-time visibility and control over their operations.",
    icon: "📊",
  },
  {
    title: "E-commerce Stores",
    desc: "Custom storefronts with product management, cart, checkout, and order tracking — Shopify and headless commerce.",
    icon: "🛍️",
  },
  {
    title: "Developer Portals",
    desc: "API documentation sites, developer dashboards, and SDK portals that make your platform easy to integrate.",
    icon: "🔌",
  },
  {
    title: "Web Apps & MVPs",
    desc: "Rapid MVP development to validate your idea with real users — shipped in weeks, not months.",
    icon: "⚡",
  },
];

const TECH = [
  "Next.js 15", "React 19", "TypeScript", "Tailwind CSS",
  "Prisma", "PostgreSQL", "Supabase", "Stripe",
  "Clerk / NextAuth", "Vercel", "AWS", "GraphQL",
];

export default function WebDevelopmentPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-emerald-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-green-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Web Development</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-500 uppercase tracking-widest">
              Digital
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Web{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                Development
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              We build pixel-perfect, high-performance web apps and SaaS
              platforms on modern frameworks — designed to convert visitors,
              delight users, and scale without pain.
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
              From the first Figma frame to a live production deployment with
              CI/CD, monitoring, and ongoing support — we handle the full
              lifecycle.
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

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">What you can expect</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["< 2 weeks", "From kickoff to first working prototype"],
                ["100", "Lighthouse performance score target on all pages"],
                ["Mobile-first", "Every screen designed for phone, tablet, desktop"],
                ["Full handover", "Source code, docs, and team training included"],
              ].map(([stat, desc]) => (
                <li key={stat} className="flex items-start gap-4">
                  <span className="shrink-0 text-base font-bold text-primary whitespace-nowrap">{stat}</span>
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
              What we build
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              From landing pages to full-stack SaaS — we&apos;ve built it all.
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
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s build something great
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Share your vision — even a rough idea on a napkin. We&apos;ll scope it,
              design it, build it, and ship it faster than you expect.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Start Your Project
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
