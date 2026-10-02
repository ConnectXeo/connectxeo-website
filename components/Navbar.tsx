"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-4 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-4 sm:top-6">
      <nav
        aria-label="Main navigation"
        className={`flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border-border bg-background/70 shadow-2xl shadow-black/20 backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          Connect<span className="text-primary">Xeo</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={
              resolvedTheme === "dark"
                ? "Switch to light mode"
                : resolvedTheme === "light"
                  ? "Switch to dark mode"
                  : "Toggle theme"
            }
            className="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            {resolvedTheme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9H21m-18 0H2.34m15.36-6.36-.7.7M6.34 17.66l-.7.7m12.02 0-.7-.7M6.34 6.34l-.7-.7M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />
              </svg>
            ) : resolvedTheme === "light" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            ) : (
              <span className="block h-4 w-4" />
            )}
          </button>

          <Link
            href="/contact"
            className="rounded-full bg-foreground px-5 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-85"
          >
            Let&apos;s Talk
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            {resolvedTheme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9H21m-18 0H2.34m15.36-6.36-.7.7M6.34 17.66l-.7.7m12.02 0-.7-.7M6.34 6.34l-.7-.7M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />
              </svg>
            ) : resolvedTheme === "light" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            ) : (
              <span className="block h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mt-2 rounded-3xl border border-border bg-background/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Let&apos;s Talk
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
