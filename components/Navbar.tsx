"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/* ── Nav links ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Services",  href: "/services"  },
  { label: "Solutions", href: "/solutions" },
  { label: "About",     href: "/about"     },
  { label: "Team",      href: "/team"      },
  { label: "Blog",      href: "/blog"      },
];

/* ── Hamburger icon ─────────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5 transition-transform duration-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const pathname    = usePathname();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  /* Detect scroll to slightly increase backdrop opacity */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(8,9,10,0.92)"
            : "rgba(8,9,10,0.80)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
          aria-label="Main navigation"
        >
          {/* ── Logo ───────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="ConnectXeo home"
          >
            {/* Accent dot */}
            <span
              aria-hidden="true"
              className="block h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125"
              style={{ background: "#5e6ad2" }}
            />
            <span
              className="text-[15px] tracking-[-0.3px] transition-colors duration-200"
              style={{ color: "#f7f8f8", fontWeight: 600 }}
            >
              ConnectXeo
            </span>
          </Link>

          {/* ── Desktop links ──────────────────────────────── */}
          <ul
            className="hidden items-center gap-1 md:flex"
            role="list"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150"
                    style={{
                      color: active ? "#5e6ad2" : "#999999",
                    }}
                    onMouseEnter={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#f7f8f8";
                    }}
                    onMouseLeave={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#999999";
                    }}
                  >
                    {label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0.5 left-3 right-3 h-[1px] rounded-full"
                        style={{ background: "#5e6ad2" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ────────────────────────────────── */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contact"
              className="text-[13px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "#5e6ad2",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* ── Mobile: hamburger ──────────────────────────── */}
          <button
            className="flex items-center justify-center rounded-md p-2 transition-colors duration-150 md:hidden"
            style={{ color: "#999999" }}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onMouseEnter={e => (e.currentTarget.style.color = "#f7f8f8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#999999")}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col pt-[64px] md:hidden"
          style={{
            background: "rgba(8,9,10,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <ul className="flex flex-col gap-1 px-6 pt-6" role="list">
            <li>
              <Link
                href="/"
                className="flex items-center rounded-md px-3 py-3 text-[15px] font-medium transition-colors duration-150"
                style={{ color: pathname === "/" ? "#5e6ad2" : "#999999" }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center rounded-md px-3 py-3 text-[15px] font-medium transition-colors duration-150"
                    style={{ color: active ? "#5e6ad2" : "#999999" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="mx-6 mt-4 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-hidden="true"
          />

          <div className="px-6 pt-4">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center rounded-lg py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#5e6ad2", borderRadius: "8px" }}
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}

      {/* Spacer so fixed header does not overlap content */}
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}
