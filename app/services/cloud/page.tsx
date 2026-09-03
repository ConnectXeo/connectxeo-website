import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloud Solutions — ConnectXeo",
  description:
    "Scalable, secure cloud infrastructure on AWS, GCP, and Azure. Architecture design, DevOps, Kubernetes, and cost optimisation for growing businesses.",
};

const INCLUDED = [
  "Cloud architecture design and multi-cloud strategy",
  "AWS, Google Cloud, and Azure deployment and management",
  "Infrastructure as Code with Terraform and Pulumi",
  "Kubernetes orchestration and Helm chart management",
  "CI/CD pipeline design with GitHub Actions, GitLab CI, ArgoCD",
  "Container orchestration: Docker, ECS, GKE, AKS",
  "Database management: RDS, Cloud SQL, Cosmos DB, DynamoDB",
  "Security hardening: IAM, VPCs, WAF, secrets management",
  "Observability: logging, metrics, tracing (Grafana, Prometheus, Datadog)",
  "Cloud cost audit and ongoing optimisation",
  "Disaster recovery and backup automation",
  "24/7 infrastructure monitoring and incident response",
];

const USE_CASES = [
  {
    title: "Cloud Migration",
    desc: "Move from on-prem or legacy hosting to modern cloud infrastructure — with zero downtime and a clear rollback plan.",
    icon: "☁️",
  },
  {
    title: "Startup Infrastructure",
    desc: "Production-grade cloud setup from day one — so you can scale from 10 to 10 million users without rewriting everything.",
    icon: "🚀",
  },
  {
    title: "Cost Reduction",
    desc: "Cloud bills spiralling? We audit your spend, right-size resources, and implement savings plans that cut costs 40%+.",
    icon: "💰",
  },
  {
    title: "DevOps as a Service",
    desc: "Your dedicated DevOps team — CI/CD pipelines, deployments, and infrastructure managed without hiring in-house.",
    icon: "⚙️",
  },
  {
    title: "ML Infrastructure",
    desc: "GPU clusters, model serving infrastructure, and MLOps pipelines on cloud — purpose-built for AI workloads.",
    icon: "🧠",
  },
  {
    title: "Compliance & Security",
    desc: "SOC 2, HIPAA, GDPR-ready infrastructure with audit trails, encryption at rest and in transit, and access controls.",
    icon: "🛡️",
  },
];

const TECH = [
  "AWS", "Google Cloud", "Azure", "Terraform",
  "Kubernetes", "Docker", "GitHub Actions", "ArgoCD",
  "Prometheus", "Grafana", "Datadog", "Pulumi",
];

export default function CloudPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-rose-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-pink-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Cloud Solutions</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-500 uppercase tracking-widest">
              Infrastructure
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Cloud{" "}
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              Scalable, secure, and cost-efficient cloud infrastructure built on
              AWS, GCP, and Azure — from initial architecture to continuous
              optimisation as you grow.
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
              We architect and manage your cloud infrastructure end-to-end — so
              your team can ship features instead of babysitting servers.
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

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Infrastructure SLAs</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["99.9%", "Uptime SLA across all managed infrastructure"],
                ["40%+", "Average cloud cost reduction after audit"],
                ["< 15 min", "Mean time to detect and alert on incidents"],
                ["Zero-trust", "Security model applied by default to all deployments"],
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
              Real-world use cases
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              Cloud challenges we solve every week for growing companies.
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
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Infrastructure that scales with you
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Whether you&apos;re migrating to cloud for the first time or optimising
              an existing setup — we architect for your next 10x, not just today.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Talk to a Cloud Expert
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
