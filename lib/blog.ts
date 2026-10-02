/**
 * Blog utilities — backed by PostgreSQL (see lib/db-pg.ts).
 * The existing MDX posts in /content/blog/ are seeded into the database
 * automatically on first access.
 */

import { getPublishedPosts, getPostBySlug as getPostRowBySlug, type PostRow } from "./db-pg";

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

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug);
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => {
    const { content, ...meta } = rowToPost(p);
    return meta;
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const row = await getPostRowBySlug(slug);
  if (!row || !row.published) return null;
  return rowToPost(row);
}
