import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog — ConnectXeo",
  description: "Insights on AI/ML, automation, voice agents, and cloud solutions from the ConnectXeo team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="animate-fade-up"><Badge pulse>ConnectXeo Blog</Badge></div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
            Insights on <span className="text-primary">AI &amp; Automation</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto animate-fade-up-delay-2">
            Deep dives, tutorials, and practical guides from the team building the next generation of AI solutions.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        {posts.length === 0 ? (
          <p className="text-center text-muted">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset" }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-background text-muted">{tag}</span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2" style={{ fontWeight: 590 }}>
                  {post.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">{post.author.charAt(0)}</div>
                    <span className="text-xs text-muted">{post.author}</span>
                  </div>
                  <span className="text-xs text-muted">{formatDate(post.date)}</span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Read article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background-secondary">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
            Want us to solve your AI challenges?
          </h2>
          <p className="text-muted mb-8">Book a free discovery call and tell us what you&apos;re trying to build.</p>
          <Button href="/contact">Get in touch</Button>
        </div>
      </section>
    </>
  );
}
