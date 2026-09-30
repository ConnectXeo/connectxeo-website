"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useActionState } from "react";
import { savePost, deletePostAction } from "@/lib/actions";
import { markdownToHtml } from "@/lib/markdown";
import type { PostRow } from "@/lib/db";

const COVERS = [
  { key: "neural", label: "Neural" },
  { key: "cloud", label: "Cloud" },
  { key: "grid", label: "Grid" },
  { key: "pulse", label: "Pulse" },
];

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-primary";

const labelCls = "mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted";

type Filter = "all" | "published" | "draft";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function CoverArt({ cover, title, large }: { cover: string; title: string; large?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-border bg-background-secondary ${
        large ? "h-44" : "h-28"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,106,210,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(94,106,210,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary opacity-20 blur-2xl"
      />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {cover}
      </span>
    </div>
  );
}

export default function AdminClient({ posts }: { posts: PostRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<PostRow | "new" | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (filter === "published" && p.published !== 1) return false;
      if (filter === "draft" && p.published !== 0) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [posts, filter, query]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(panel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
  }, [editing]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  if (editing !== null) {
    return (
      <main ref={panelRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setEditing(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            All posts
          </button>
          <h1 className="text-xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
            {editing === "new" ? "New post" : `Editing — ${editing.title}`}
          </h1>
        </div>
        <Editor
          key={editing === "new" ? "new" : editing.id}
          post={editing === "new" ? null : editing}
          onDone={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            ConnectXeo Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
            Blog posts
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
          >
            View blog
          </a>
          <button
            onClick={logout}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-secondary hover:text-secondary"
          >
            Log out
          </button>
          <button
            onClick={() => setEditing("new")}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            + New post
          </button>
        </div>
      </div>

      {/* Toolbar: search + filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className={`${inputCls} pl-11`}
          />
        </div>
        <div className="flex gap-1 rounded-full border border-border p-1" role="tablist" aria-label="Filter posts">
          {(
            [
              { key: "all", label: "All" },
              { key: "published", label: "Published" },
              { key: "draft", label: "Drafts" },
            ] as { key: Filter; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.key ? "bg-foreground text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-xs text-muted">
          {filtered.length} of {posts.length} posts
        </span>
      </div>

      {/* Post cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border p-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </span>
          <p className="text-sm text-muted">
            {query ? "No posts match your search." : "No posts here — create your first one."}
          </p>
          <button
            onClick={() => setEditing("new")}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            + New post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((p) => {
            const tags: string[] = (() => {
              try {
                return JSON.parse(p.tags || "[]");
              } catch {
                return [];
              }
            })();
            return (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 hover:border-primary/40"
              >
                <div className="relative">
                  <CoverArt cover={p.cover} title={p.title} large />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md ${
                      p.published
                        ? "bg-primary/90 text-white"
                        : "bg-background/80 text-muted"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold leading-snug tracking-tight text-foreground" style={{ fontWeight: 700 }}>
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted">
                    {p.excerpt || "No excerpt yet."}
                  </p>

                  {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 font-mono text-[11px] text-muted">
                    <span className="truncate">/blog/{p.slug}</span>
                    <span className="ml-auto shrink-0">{formatDate(p.created_at)}</span>
                    <span className="shrink-0">{readingTime(p.content)}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-xs font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
                    >
                      View
                    </a>
                    <button
                      onClick={() => setEditing(p)}
                      className="flex-1 rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-85"
                    >
                      Edit
                    </button>
                    {confirmDelete === p.id ? (
                      <button
                        onClick={async () => {
                          await deletePostAction(p.id);
                          setConfirmDelete(null);
                          router.refresh();
                        }}
                        className="flex-1 rounded-full bg-secondary px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-85"
                      >
                        Confirm?
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(p.id)}
                        className="flex-1 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted transition-colors hover:border-secondary hover:text-secondary"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Editor({
  post,
  onDone,
}: {
  post: PostRow | null;
  onDone: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Sami Ullah");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [tags, setTags] = useState(post ? JSON.parse(post.tags || "[]").join(", ") : "");
  const [cover, setCover] = useState(post?.cover ?? "neural");
  const [content, setContent] = useState(post?.content ?? "");
  const [published, setPublished] = useState(post ? post.published === 1 : false);
  const [view, setView] = useState<"write" | "preview">("write");
  const [state, formAction, pending] = useActionState(savePost, { error: null });
  const submitted = useRef(false);

  useEffect(() => {
    if (submitted.current && state.error === null && !pending) {
      submitted.current = false;
      onDone();
    }
  }, [state, pending, onDone]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    submitted.current = true;
    const fd = new FormData();
    fd.set("id", String(post?.id ?? ""));
    fd.set("title", title);
    fd.set("slug", slug);
    fd.set("author", author);
    fd.set("excerpt", excerpt);
    fd.set("tags", tags);
    fd.set("cover", cover);
    fd.set("content", content);
    if (published) fd.set("published", "on");
    formAction(fd);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="title" className={labelCls}>Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Post title" className={inputCls} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className={labelCls}>Slug</label>
            <input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="my-post-slug" className={`${inputCls} font-mono`} />
          </div>
          <div>
            <label htmlFor="author" className={labelCls}>Author</label>
            <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className={labelCls}>Excerpt</label>
          <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="One or two sentences shown on the blog index." className={`${inputCls} resize-none`} />
        </div>

        <div>
          <label htmlFor="tags" className={labelCls}>Tags (comma separated)</label>
          <input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="AI, Automation" className={inputCls} />
        </div>

        <div>
          <label htmlFor="cover" className={labelCls}>Cover style</label>
          <select id="cover" value={cover} onChange={(e) => setCover(e.target.value)} className={inputCls}>
            {COVERS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="content" className={labelCls}>Content (markdown)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            placeholder={"# Your post title\n\nWrite in markdown…"}
            className={`${inputCls} resize-y font-mono leading-6`}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-[#5e6ad2]"
          />
          <span className="text-sm font-medium text-foreground">Published (visible on the blog)</span>
        </label>

        {state.error && (
          <p className="rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            {state.error}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {pending ? "Saving…" : post ? "Save changes" : "Create post"}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="text-sm font-semibold text-muted underline decoration-border underline-offset-8 transition-colors hover:text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Preview</p>
          <div className="flex gap-1 rounded-full border border-border p-1">
            {(["write", "preview"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  view === v ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <CoverArt cover={cover} title={title} large />
          <div className="mt-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
              {title || "Untitled post"}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              /blog/{slug || "slug"} — {post ? formatDate(post.created_at) : "now"}
            </p>
          </div>
          <div className="mt-6">
            <p className="mb-6 border-l-2 border-primary pl-4 text-base italic leading-7 text-muted">
              {excerpt || "No excerpt yet."}
            </p>
            <article dangerouslySetInnerHTML={{ __html: markdownToHtml(content || "*Nothing to preview yet.*") }} />
          </div>
        </div>
      </div>
    </div>
  );
}
