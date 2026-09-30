"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ParticleNetwork from "@/components/ParticleNetwork";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      setLoading(false);
    }
  };

  return (
    <main className="grain relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0" aria-hidden="true">
        <ParticleNetwork />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.6)_60%,rgba(8,9,10,0.95)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            ConnectXeo Admin
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground" style={{ fontWeight: 700 }}>
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter the admin password to manage blog posts.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="password" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoFocus
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-primary"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-opacity duration-300 hover:opacity-85 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-xs text-muted">
          /admin — restricted area
        </p>
      </div>
    </main>
  );
}
