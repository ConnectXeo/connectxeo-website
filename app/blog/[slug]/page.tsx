import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found — ConnectXeo" };
  return {
    title: `${post.title} — ConnectXeo Blog`,
    description: post.excerpt,
  };
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-blue-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors text-sm mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${tagClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-4 pb-8 border-b border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-sm font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{post.author}</div>
              <div className="text-xs text-slate-500">Founder, ConnectXeo</div>
            </div>
          </div>
          <div className="ml-auto text-sm text-slate-500">{formatDate(post.date)}</div>
        </div>

        {/* Excerpt / lead */}
        <p className="text-lg text-slate-300 leading-relaxed italic mb-8 pl-4 border-l-2 border-violet-600">
          {post.excerpt}
        </p>

        {/* Article body */}
        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* CTA */}
        <div className="mt-16 bg-slate-900/60 border border-violet-700/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Ready to put this into practice?
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            ConnectXeo builds custom AI and automation solutions. Let&apos;s talk about your use
            case.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Book a free call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
