import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automation — ConnectXeo",
  description:
    "End-to-end process automation with n8n, Make, RPA bots, and custom API integrations. Eliminate repetitive work and connect your entire tool stack.",
};

const INCLUDED = [
  "Business process mapping and automation opportunity analysis",
  "Workflow automation with n8n, Make (Integromat), and Zapier",
  "Custom RPA bots for legacy systems and browser automation",
  "API integration and middleware development",
  "Database automation and ETL pipelines",
  "Scheduled reporting and alerting systems",
  "Document processing automation (invoices, contracts, forms)",
  "CRM, ERP, and HRMS system integrations",
  "Error handling, retry logic, and monitoring dashboards",
  "Handover documentation and team training",
];

const USE_CASES = [
  {
    title: "Invoice Processing",
    desc: "Automatically extract, validate, and route invoices from email to your accounting system — zero manual data entry.",
    icon: "🧾",
  },
  {
    title: "Lead Nurturing",
    desc: "Trigger personalised email sequences, CRM updates, and Slack notifications the moment a lead fills a form.",
    icon: "🎯",
  },
  {
    title: "HR Onboarding",
    desc: "Provision accounts, send welcome emails, assign tasks, and set up meetings automatically when a new hire is added.",
    icon: "🧑‍💼",
  },
  {
    title: "E-commerce Operations",
    desc: "Sync inventory across platforms, trigger restock alerts, and update pricing rules automatically.",
    icon: "🛍️",
  },
  {
    title: "Report Generation",
    desc: "Scheduled dashboards and executive reports generated and delivered automatically — always fresh, never late.",
    icon: "📊",
  },
  {
    title: "Legacy System Integration",
    desc: "RPA bots that interact with old desktop software and web portals — no API required.",
    icon: "🖥️",
  },
];

const TECH = [
  "n8n", "Make (Integromat)", "Zapier", "Puppeteer",
  "Playwright", "Python", "Node.js", "FastAPI",
  "PostgreSQL", "Redis", "Docker", "Webhook.site",
];

export default function AutomationPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-amber-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-orange-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Automation</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-500 uppercase tracking-widest">
              Efficiency
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Process{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Automation
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              We eliminate the repetitive work that drains your team — connecting
              your tools, automating your workflows, and letting your people
              focus on work that actually matters.
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
              We start by mapping your processes, identify where automation
              delivers the fastest ROI, then build and maintain the full
              solution.
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

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">ROI you can expect</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["60–80%", "Reduction in manual processing time"],
                ["< 1 week", "Time to first automation live in production"],
                ["0 errors", "Data entry mistakes eliminated by automation"],
                ["24/7", "Workflows that run while your team sleeps"],
              ].map(([stat, desc]) => (
                <li key={stat} className="flex items-start gap-4">
                  <span className="shrink-0 text-lg font-bold text-primary whitespace-nowrap">{stat}</span>
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
              Real-world use cases
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              Every process below was once manual. Now it runs itself.
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
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Stop doing it manually
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Tell us which process is eating your team&apos;s time and we&apos;ll show
              you exactly how automation can fix it — usually within days, not
              months.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Automate My Workflow
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
