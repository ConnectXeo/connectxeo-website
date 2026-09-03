import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — ConnectXeo",
  description:
    "Insights on AI/ML, automation, voice agents, and cloud solutions from the ConnectXeo team.",
};

const TAG_COLOURS: Record<string, string> = {
  AI: "bg-violet-950/60 text-violet-300 border-violet-700/40",
  "Agentic AI": "bg-violet-950/60 text-violet-300 border-violet-700/40",
  Automation: "bg-blue-950/60 text-blue-300 border-blue-700/40",
  Business: "bg-emerald-950/60 text-emerald-300 border-emerald-700/40",
  "Voice AI": "bg-rose-950/60 text-rose-300 border-rose-700/40",
  LLM: "bg-amber-950/60 text-amber-300 border-amber-700/40",
  Engineering: "bg-cyan-950/60 text-cyan-300 border-cyan-700/40",
  Tutorial: "bg-indigo-950/60 text-indigo-300 border-indigo-700/40",
  Productivity: "bg-teal-950/60 text-teal-300 border-teal-700/40",
};

function tagClass(tag: string) {
  return TAG_COLOURS[tag] ?? "bg-slate-800 text-slate-300 border-slate-700/40";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-950/60 border border-violet-700/40 text-violet-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            ConnectXeo Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Insights on{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI &amp; Automation
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Deep dives, tutorials, and practical guides from the team building the next generation of
            AI solutions.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-center text-slate-400">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-violet-700/50 hover:bg-slate-900/80 transition-all duration-300"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${tagClass(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-400">{post.author}</span>
                  </div>
                  <span className="text-xs text-slate-500">{formatDate(post.date)}</span>
                </div>

                {/* Read more */}
                <div className="mt-4 flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
                  Read article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want us to solve your AI challenges?
          </h2>
          <p className="text-slate-400 mb-8">
            Book a free discovery call and tell us what you&apos;re trying to build.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
