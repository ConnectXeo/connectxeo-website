"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Inbox, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/admin", label: "Blog Posts", icon: FileText },
  { href: "/admin/inbox", label: "Email Leads", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
                ConnectXeo
              </span>
              <span className="text-sm font-semibold text-muted-foreground">Admin</span>
            </Link>
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(tab.href)
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-card hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-secondary hover:text-secondary"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}