/**
 * Blog utilities — reads .mdx files from /content/blog/
 * Uses only Node.js built-ins (fs, path) — no external dependencies needed.
 * Frontmatter is parsed manually (simple YAML between --- delimiters).
 */

import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  content: string; // raw markdown body (after frontmatter)
}

/** Parse simple YAML frontmatter between --- delimiters */
function parseFrontmatter(raw: string): { meta: PostFrontmatter; body: string } {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    return {
      meta: { title: "", date: "", author: "", excerpt: "", tags: [] },
      body: raw,
    };
  }
  const yamlText = fmMatch[1];
  const body = fmMatch[2];

  const meta: PostFrontmatter = { title: "", date: "", author: "", excerpt: "", tags: [] };
  for (const line of yamlText.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim();

    if (key === "title") meta.title = val.replace(/^["']|["']$/g, "");
    else if (key === "date") meta.date = val.replace(/^["']|["']$/g, "");
    else if (key === "author") meta.author = val.replace(/^["']|["']$/g, "");
    else if (key === "excerpt") meta.excerpt = val.replace(/^["']|["']$/g, "");
    else if (key === "tags") {
      // Handle inline array: ["AI", "Blog"] or [AI, Blog]
      meta.tags = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
  }
  return { meta, body };
}

/** Get all post slugs */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Get metadata for all posts, sorted by date descending */
export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { meta } = parseFrontmatter(raw);
      return { ...meta, slug };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single post including its body */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return { ...meta, slug, content: body };
}
