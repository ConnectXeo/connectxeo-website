"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth";
import { createPost, updatePost, deletePost, slugExists, getPostById } from "@/lib/db";

export interface PostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  cover: string;
  published: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseTags(input: string): string[] {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export async function savePost(prevState: { error: string | null }, formData: FormData) {
  if (!(await isAdmin())) return { error: "Unauthorized." };

  const id = Number(formData.get("id")) || undefined;
  const slug = slugify(String(formData.get("slug") || ""));
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const author = String(formData.get("author") || "Sami Ullah").trim() || "Sami Ullah";
  const cover = String(formData.get("cover") || "neural");
  const published = formData.get("published") === "on";
  const tags = parseTags(String(formData.get("tags") || ""));

  if (!slug) return { error: "Slug is required." };
  if (!title) return { error: "Title is required." };
  if (slugExists(slug, id)) return { error: "Another post already uses this slug." };

  const data = { slug, title, excerpt, content, tags, author, cover, published };
  if (id && getPostById(id)) {
    updatePost(id, data);
  } else {
    createPost(data);
  }
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]");
  revalidatePath("/admin");
  return { error: null };
}

export async function deletePostAction(id: number) {
  if (!(await isAdmin())) return;
  deletePost(id);
  revalidatePath("/blog");
  revalidatePath("/admin");
}
