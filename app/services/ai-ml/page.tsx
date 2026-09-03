import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI / ML Solutions — ConnectXeo",
  description:
    "Custom AI/ML solutions including model training, fine-tuning, computer vision, NLP, and end-to-end ML pipelines built for production.",
};

const INCLUDED = [
  "Custom model design and architecture selection",
  "Data collection, cleaning, and feature engineering",
  "Supervised, unsupervised, and reinforcement learning",
  "Computer vision (detection, classification, segmentation)",
  "Natural language processing and text analytics",
  "Time-series forecasting and anomaly detection",
  "Model evaluation, testing, and validation",
  "MLOps: CI/CD pipelines, monitoring, and model versioning",
  "REST / gRPC API serving for model inference",
  "Cloud deployment (AWS SageMaker, GCP Vertex, Azure ML)",
];

const USE_CASES = [
  {
    title: "Predictive Maintenance",
    desc: "ML models that predict equipment failures before they happen, saving manufacturers millions in downtime.",
    icon: "🔧",
  },
  {
    title: "Fraud Detection",
    desc: "Real-time anomaly detection for fintech platforms — flag suspicious transactions in milliseconds.",
    icon: "🛡️",
  },
  {
    title: "Demand Forecasting",
    desc: "Accurate demand prediction for retail and supply chains, reducing inventory waste and stockouts.",
    icon: "📈",
  },
  {
    title: "Document Intelligence",
    desc: "Extract structured data from unstructured documents — invoices, contracts, medical records.",
    icon: "📄",
  },
  {
    title: "Image Quality Control",
    desc: "Computer vision systems for manufacturing QA that catch defects faster and more accurately than humans.",
    icon: "👁️",
  },
  {
    title: "Customer Churn Prediction",
    desc: "Identify at-risk customers before they leave and trigger personalised retention campaigns automatically.",
    icon: "🎯",
  },
];

const TECH = [
  "Python", "PyTorch", "TensorFlow", "Scikit-learn",
  "Hugging Face", "MLflow", "Ray", "ONNX",
  "Docker", "Kubernetes", "FastAPI", "AWS SageMaker",
];

export default function AIMLPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-blue-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-indigo-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">AI / ML Solutions</span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-500 uppercase tracking-widest">
              Intelligence
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              AI / ML{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              We design, train, and deploy custom machine learning models that
              solve real business problems — from prototype to production, with
              full MLOps support so your models keep improving over time.
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
          {/* Left: description */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything included
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Our AI/ML engagements are end-to-end — we handle every step from
              raw data to a model serving predictions in production. No
              hand-offs, no gaps.
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

          {/* Right: tech stack */}
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

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Typical Timeline</h3>
            <ul className="mt-5 space-y-3">
              {[
                ["Week 1–2", "Discovery, data audit, architecture design"],
                ["Week 3–6", "Model development and iterative training"],
                ["Week 7–8", "Evaluation, hardening, and API wrapping"],
                ["Week 9+", "Production deployment and MLOps setup"],
              ].map(([period, desc]) => (
                <li key={period} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {period}
                  </span>
                  <span className="text-muted">{desc}</span>
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
              Industries we&apos;ve served and problems we&apos;ve solved with custom ML.
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
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to put AI to work?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Let&apos;s talk about your data, your goals, and the model architecture
              that will get you there fastest.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Start Your AI Project
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
