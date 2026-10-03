"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Inbox,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Blog Posts", icon: FileText },
  { href: "/admin/inbox", label: "Email Leads", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            ConnectXeo
          </span>
          <span className="text-sm font-semibold text-muted-foreground">Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-1.5 text-muted hover:bg-card hover:text-foreground lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Manage
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted hover:bg-card hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <p className="mb-2 px-3 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Quick Links
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-card hover:text-foreground"
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          View Website
        </a>
        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-card hover:text-foreground"
        >
          <FileText className="h-4 w-4 shrink-0" />
          View Blog
        </a>
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-all hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        {sidebarContent}
      </aside>

      {/* Sidebar - mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-card hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-primary">
            ConnectXeo Admin
          </span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}