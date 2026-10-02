import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <main className="grain relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/3 h-[480px] w-[640px] rounded-full bg-primary opacity-[0.06] blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          href="/blog"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
        >
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl" style={{ fontWeight: 700 }}>
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-4 border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/30">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground" style={{ fontWeight: 700 }}>
                {post.author}
              </div>
              <div className="text-xs text-muted">ConnectXeo</div>
            </div>
          </div>
          <div className="ml-auto font-mono text-sm text-muted">{formatDate(post.date)}</div>
        </div>

        <p className="mt-8 border-l-2 border-primary pl-4 text-lg italic leading-8 text-muted">
          {post.excerpt}
        </p>

        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />

        <div className="mt-16 rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
            Ready to put this into practice?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted">
            ConnectXeo builds custom AI and automation solutions. Let&apos;s talk about your use case.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85"
            >
              Book a free call
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
