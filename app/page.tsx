export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <main className="flex max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Connect<span className="text-primary">Xeo</span>
        </h1>
        <p className="max-w-xl text-lg leading-8 text-muted">
          AI/ML Solutions &middot; Custom Model Training &middot; Agentic
          Solutions &middot; Voice Agents &middot; Automation &middot; Cloud
          Services
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent"
          >
            Let&apos;s Talk
          </a>
          <a
            href="/services"
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold transition-colors hover:bg-card"
          >
            Our Services
          </a>
        </div>
      </main>
    </div>
  );
}
