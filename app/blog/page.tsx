import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import ParticleNetwork from "@/components/ParticleNetwork";

export const metadata: Metadata = {
  title: "Blog — ConnectXeo",
  description: "Insights on AI/ML, automation, voice agents, and cloud solutions from the ConnectXeo team.",
  alternates: { canonical: "https://www.connectxeo.com/blog" },
  openGraph: {
    title: "Blog — ConnectXeo",
    description: "Insights on AI/ML, automation, voice agents, and cloud solutions from the ConnectXeo team.",
    url: "https://www.connectxeo.com/blog",
    type: "website",
    siteName: "ConnectXeo",
  },
};

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <main className="overflow-x-hidden w-full max-w-full">
      {/* HERO */}
      <section className="grain relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParticleNetwork />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.5)_55%,rgba(8,9,10,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pt-48 lg:px-8">
          <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-muted sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            ConnectXeo Blog
          </p>
          <h1 className="mt-8 max-w-6xl text-[clamp(2.9rem,6.4vw,6.2rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground" style={{ fontWeight: 700 }}>
            Insights on <span className="text-primary">AI &amp; Automation</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Deep dives, tutorials, and practical guides from the team building the next
            generation of AI solutions.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-muted">No posts yet — check back soon.</p>
          ) : (
            <div className="flex flex-col">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group grid grid-cols-1 gap-4 py-10 transition-colors duration-300 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-10 ${
                    i !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <span className="font-mono text-sm text-muted transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl" style={{ fontWeight: 700 }}>
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
          <h2
            className="mx-auto max-w-4xl text-[clamp(2.2rem,4.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontWeight: 700 }}
          >
            Want us to solve your AI challenges?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Book a free discovery call and tell us what you&apos;re trying to build.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-9 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Get in touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
