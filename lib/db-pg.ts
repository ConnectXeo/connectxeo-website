import pg from "pg";
import fs from "fs";
import path from "path";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL or POSTGRES_URL environment variable is required");
  }

  pool = new Pool({
    connectionString,
    ssl: connectionString.includes("sslmode=require") ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
  });

  return pool;
}

export async function initializeDatabase(): Promise<void> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        tags TEXT NOT NULL DEFAULT '[]',
        author TEXT NOT NULL DEFAULT 'Sami Ullah',
        cover TEXT NOT NULL DEFAULT 'neural',
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        replied BOOLEAN NOT NULL DEFAULT FALSE,
        reply_text TEXT,
        replied_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
      CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
      CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
    `);
  } finally {
    client.release();
  }
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

export async function seedFromMdx(): Promise<void> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const countResult = await client.query("SELECT COUNT(*) FROM posts");
    if (parseInt(countResult.rows[0].count, 10) > 0) return;

    const blogDir = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(blogDir)) return;

    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

    await client.query("BEGIN");
    try {
      for (const file of files) {
        const slug = file.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
        const { title, date, author, excerpt, tags, body } = parseFrontmatter(raw);

        await client.query(
          `INSERT INTO posts (slug, title, excerpt, content, tags, author, published, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)`,
          [
            slug,
            title || slug,
            excerpt,
            body,
            JSON.stringify(tags),
            author || "Sami Ullah",
            true,
            date ? new Date(date).toISOString() : new Date().toISOString(),
          ]
        );
      }
      await client.query("COMMIT");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    }
  } finally {
    client.release();
  }
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
  published: boolean;
  created_at: string;
  updated_at: string;
}

function mapRow(row: PostRow): PostRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags,
    author: row.author,
    cover: row.cover,
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getAllPosts(): Promise<PostRow[]> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return result.rows.map(mapRow);
}

export async function getPublishedPosts(): Promise<PostRow[]> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM posts WHERE published = true ORDER BY created_at DESC");
  return result.rows.map(mapRow);
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM posts WHERE slug = $1", [slug]);
  return result.rows.length > 0 ? mapRow(result.rows[0]) : null;
}

export async function getPostById(id: number): Promise<PostRow | null> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows.length > 0 ? mapRow(result.rows[0]) : null;
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  const pool = getPool();
  if (excludeId != null) {
    const result = await pool.query("SELECT id FROM posts WHERE slug = $1 AND id != $2", [slug, excludeId]);
    return result.rows.length > 0;
  }
  const result = await pool.query("SELECT id FROM posts WHERE slug = $1", [slug]);
  return result.rows.length > 0;
}

export async function createPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  cover: string;
  published: boolean;
}): Promise<PostRow> {
  const pool = getPool();
  const now = new Date().toISOString();
  const result = await pool.query(
    `INSERT INTO posts (slug, title, excerpt, content, tags, author, cover, published, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
     RETURNING *`,
    [
      data.slug,
      data.title,
      data.excerpt,
      data.content,
      JSON.stringify(data.tags),
      data.author,
      data.cover,
      data.published,
      now,
    ]
  );
  return mapRow(result.rows[0]);
}

export async function updatePost(
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
): Promise<PostRow> {
  const pool = getPool();
  await pool.query(
    `UPDATE posts
     SET slug = $1, title = $2, excerpt = $3, content = $4,
         tags = $5, author = $6, cover = $7, published = $8, updated_at = $9
     WHERE id = $10`,
    [
      data.slug,
      data.title,
      data.excerpt,
      data.content,
      JSON.stringify(data.tags),
      data.author,
      data.cover,
      data.published,
      new Date().toISOString(),
      id,
    ]
  );
  const post = await getPostById(id);
  if (!post) throw new Error("Post not found after update");
  return post;
}

export async function deletePost(id: number): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export interface ContactRow {
  id: number;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  status: string;
  replied: boolean;
  reply_text: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapContactRow(row: any): ContactRow {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    subject: row.subject,
    message: row.message,
    status: row.status,
    replied: row.replied,
    reply_text: row.reply_text,
    replied_at: row.replied_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function createContact(data: {
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
}): Promise<ContactRow> {
  const pool = getPool();
  const now = new Date().toISOString();
  const result = await pool.query(
    `INSERT INTO contacts (name, email, company, subject, message, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, 'new', $6, $6)
     RETURNING *`,
    [data.name, data.email, data.company, data.subject, data.message, now]
  );
  return mapContactRow(result.rows[0]);
}

export async function getAllContacts(): Promise<ContactRow[]> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
  return result.rows.map(mapContactRow);
}

export async function getContactById(id: number): Promise<ContactRow | null> {
  const pool = getPool();
  const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [id]);
  return result.rows.length > 0 ? mapContactRow(result.rows[0]) : null;
}

export async function updateContact(
  id: number,
  data: {
    status?: string;
    replied?: boolean;
    reply_text?: string | null;
  }
): Promise<ContactRow> {
  const pool = getPool();
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (data.status !== undefined) {
    updates.push(`status = $${paramIndex++}`);
    values.push(data.status);
  }
  if (data.replied !== undefined) {
    updates.push(`replied = $${paramIndex++}`);
    values.push(data.replied);
  }
  if (data.reply_text !== undefined) {
    updates.push(`reply_text = $${paramIndex++}`);
    values.push(data.reply_text);
    updates.push(`replied_at = $${paramIndex++}`);
    values.push(new Date().toISOString());
  }

  if (updates.length === 0) {
    const contact = await getContactById(id);
    if (!contact) throw new Error("Contact not found");
    return contact;
  }

  updates.push(`updated_at = $${paramIndex++}`);
  values.push(new Date().toISOString());
  values.push(id);

  await pool.query(
    `UPDATE contacts SET ${updates.join(", ")} WHERE id = $${paramIndex}`,
    values
  );

  const contact = await getContactById(id);
  if (!contact) throw new Error("Contact not found after update");
  return contact;
}

export async function deleteContact(id: number): Promise<void> {
  const pool = getPool();
  await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
}