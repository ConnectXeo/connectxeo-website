/**
 * Blog utilities — backed by SQLite (see lib/db.ts).
 * The existing MDX posts in /content/blog/ are seeded into the database
 * automatically on first access.
 */

import { getAllPosts, getPublishedPosts, getPostBySlug as getPostRowBySlug, type PostRow } from "./db";

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
  content: string;
}

function rowToPost(row: PostRow): Post {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tags || "[]");
  } catch {
    tags = [];
  }
  return {
    slug: row.slug,
    title: row.title,
    date: row.created_at,
    author: row.author,
    excerpt: row.excerpt,
    tags,
    content: row.content,
  };
}

export function getAllSlugs(): string[] {
  return getPublishedPosts().map((p) => p.slug);
}

export function getAllPostsMeta(): PostMeta[] {
  return getPublishedPosts().map((p) => {
    const { content: _content, ...meta } = rowToPost(p);
    return meta;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const row = getPostRowBySlug(slug);
  if (!row || row.published !== 1) return null;
  return rowToPost(row);
}
