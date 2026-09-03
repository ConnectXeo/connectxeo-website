import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Model Training — ConnectXeo",
  description:
    "Fine-tune and train custom AI models on your proprietary data. LLM fine-tuning, LoRA/QLoRA, dataset curation, and rigorous evaluation.",
};

const INCLUDED = [
  "Foundation model selection (GPT, LLaMA, Mistral, Gemma, etc.)",
  "Proprietary dataset collection and annotation pipelines",
  "Full fine-tuning, LoRA, and QLoRA training runs",
  "RLHF and preference optimisation (DPO, PPO)",
  "Rigorous evaluation: benchmarks, human evals, red-teaming",
  "Quantisation (GGUF, GPTQ, AWQ) for efficient inference",
  "Model merging and ensemble techniques",
  "Hosted inference API with OpenAI-compatible endpoints",
  "Ongoing retraining as your data grows",
  "Private deployment — your model, your infrastructure",
];

const USE_CASES = [
  {
    title: "Domain-Specific Chatbots",
    desc: "Fine-tune LLMs on your documentation, FAQs, and support tickets to create expert assistants that know your product inside out.",
    icon: "💬",
  },
  {
    title: "Code Generation",
    desc: "Train models on your proprietary codebase and style guides to generate code that follows your conventions automatically.",
    icon: "💻",
  },
  {
    title: "Legal & Compliance",
    desc: "Models trained on legal corpora that understand jurisdiction-specific terminology and surface accurate references.",
    icon: "⚖️",
  },
  {
    title: "Medical / Clinical NLP",
    desc: "Extract diagnoses, medications, and clinical notes from unstructured records with HIPAA-compliant fine-tuned models.",
    icon: "🏥",
  },
  {
    title: "Multilingual Support",
    desc: "Train models for low-resource languages or regional dialects that generic APIs can't handle reliably.",
    icon: "🌍",
  },
  {
    title: "Sentiment & Brand Monitoring",
    desc: "Fine-tune classifiers on industry-specific sentiment to get signal that generic models miss entirely.",
    icon: "📊",
  },
];

const TECH = [
  "Hugging Face Transformers", "PEFT / LoRA", "DeepSpeed", "Axolotl",
  "LLaMA Factory", "Unsloth", "vLLM", "llama.cpp",
  "Weights & Biases", "ONNX Runtime", "TRL", "Flash Attention",
];

export default function ModelTrainingPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-violet-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-purple-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Custom Model Training</span>
            </nav>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-500 uppercase tracking-widest">
              Training
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Custom Model{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                Training
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              Generic foundation models plateau quickly. We fine-tune LLMs and
              specialised models on your proprietary data to unlock domain
              accuracy that no off-the-shelf API can match.
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
              From selecting the right base model to serving the fine-tuned
              result via an API you own — we cover the complete training
              lifecycle with no gaps.
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

            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">Why fine-tune?</h3>
            <ul className="mt-5 space-y-4">
              {[
                ["3–10×", "Better accuracy on domain tasks vs generic APIs"],
                ["90%", "Cost reduction by running smaller, specialised models"],
                ["100%", "Data privacy — your training data never leaves your cloud"],
                ["<1s", "Inference latency with optimised quantised models"],
              ].map(([stat, desc]) => (
                <li key={stat} className="flex items-start gap-4">
                  <span className="shrink-0 text-2xl font-bold text-primary">{stat}</span>
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
              Specialised models beat generic APIs in every vertical that
              matters.
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
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500 opacity-[0.06] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Own a model that knows your domain
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Bring your dataset (or let us help build one) and we&apos;ll train a
              model that outperforms the generic alternatives — and belongs to
              you entirely.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-accent hover:shadow-accent/20"
              >
                Start Training
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
