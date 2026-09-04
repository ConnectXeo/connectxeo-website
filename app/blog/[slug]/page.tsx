import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import Button from "@/components/ui/Button";

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
    alternates: { canonical: `https://www.connectxeo.com/blog/${slug}` },
    openGraph: {
      title: `${post.title} — ConnectXeo Blog`,
      description: post.excerpt,
      url: `https://www.connectxeo.com/blog/${slug}`,
      type: "article",
      siteName: "ConnectXeo",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — ConnectXeo Blog`,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
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
    <>
      <div className="relative max-w-3xl mx-auto px-6 py-16">
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-primary/[0.08] rounded-full blur-3xl" />
        </div>

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-card text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
          {post.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-4 pb-8 border-b border-border mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{post.author}</div>
              <div className="text-xs text-muted">Founder, ConnectXeo</div>
            </div>
          </div>
          <div className="ml-auto text-sm text-muted">{formatDate(post.date)}</div>
        </div>

        {/* Excerpt / lead */}
        <p className="text-lg text-muted leading-relaxed italic mb-8 pl-4 border-l-2 border-primary">
          {post.excerpt}
        </p>

        {/* Article body */}
        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* CTA */}
        <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center" style={{ boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset" }}>
          <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontWeight: 590 }}>
            Ready to put this into practice?
          </h3>
          <p className="text-muted mb-6 text-sm">
            ConnectXeo builds custom AI and automation solutions. Let&apos;s talk about your use case.
          </p>
          <Button href="/contact">Book a free call</Button>
        </div>
      </div>
    </>
  );
}
