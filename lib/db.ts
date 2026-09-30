import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "blog.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      author TEXT NOT NULL DEFAULT 'Sami Ullah',
      cover TEXT NOT NULL DEFAULT 'neural',
      published INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  seedFromMdx(db);
  return db;
}

function parseFrontmatter(raw: string): {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  body: string;
} {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    return { title: "", date: "", author: "", excerpt: "", tags: [], body: raw };
  }
  const meta = { title: "", date: "", author: "", excerpt: "", tags: [] as string[] };
  for (const line of fmMatch[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key === "title") meta.title = val;
    else if (key === "date") meta.date = val;
    else if (key === "author") meta.author = val;
    else if (key === "excerpt") meta.excerpt = val;
    else if (key === "tags") {
      meta.tags = val
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((t) => t.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    }
  }
  return { ...meta, body: fmMatch[2] };
}

function seedFromMdx(database: Database.Database) {
  const count = database.prepare("SELECT COUNT(*) AS c FROM posts").get() as { c: number };
  if (count.c > 0) return;

  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return;

  const insert = database.prepare(`
    INSERT INTO posts (slug, title, excerpt, content, tags, author, published, created_at, updated_at)
    VALUES (@slug, @title, @excerpt, @content, @tags, @author, 1, @created_at, @created_at)
  `);

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const seedAll = database.transaction(() => {
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { title, date, author, excerpt, tags, body } = parseFrontmatter(raw);
      insert.run({
        slug,
        title: title || slug,
        excerpt,
        content: body,
        tags: JSON.stringify(tags),
        author: author || "Sami Ullah",
        created_at: date ? new Date(date).toISOString() : new Date().toISOString(),
      });
    }
  });
  seedAll();
}

export interface PostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  author: string;
  cover: string;
  published: number;
  created_at: string;
  updated_at: string;
}

export function getAllPosts(): PostRow[] {
  return getDb()
    .prepare("SELECT * FROM posts ORDER BY created_at DESC")
    .all() as PostRow[];
}

export function getPublishedPosts(): PostRow[] {
  return getDb()
    .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC")
    .all() as PostRow[];
}

export function getPostBySlug(slug: string): PostRow | null {
  const row = getDb().prepare("SELECT * FROM posts WHERE slug = ?").get(slug);
  return (row as PostRow) ?? null;
}

export function getPostById(id: number): PostRow | null {
  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id);
  return (row as PostRow) ?? null;
}

export function slugExists(slug: string, excludeId?: number): boolean {
  if (excludeId != null) {
    const row = getDb()
      .prepare("SELECT id FROM posts WHERE slug = ? AND id != ?")
      .get(slug, excludeId);
    return Boolean(row);
  }
  const row = getDb().prepare("SELECT id FROM posts WHERE slug = ?").get(slug);
  return Boolean(row);
}

export function createPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  cover: string;
  published: boolean;
}): PostRow {
  const now = new Date().toISOString();
  const result = getDb()
    .prepare(
      `INSERT INTO posts (slug, title, excerpt, content, tags, author, cover, published, created_at, updated_at)
       VALUES (@slug, @title, @excerpt, @content, @tags, @author, @cover, @published, @now, @now)`
    )
    .run({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      tags: JSON.stringify(data.tags),
      author: data.author,
      cover: data.cover,
      published: data.published ? 1 : 0,
      now,
    });
  return getPostById(Number(result.lastInsertRowid))!;
}

export function updatePost(
  id: number,
  data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    author: string;
    cover: string;
    published: boolean;
  }
): PostRow {
  getDb()
    .prepare(
      `UPDATE posts
       SET slug = @slug, title = @title, excerpt = @excerpt, content = @content,
           tags = @tags, author = @author, cover = @cover, published = @published, updated_at = @now
       WHERE id = @id`
    )
    .run({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      tags: JSON.stringify(data.tags),
      author: data.author,
      cover: data.cover,
      published: data.published ? 1 : 0,
      now: new Date().toISOString(),
      id,
    });
  return getPostById(id)!;
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
}
