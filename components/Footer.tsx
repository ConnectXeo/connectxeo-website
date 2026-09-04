import Link from "next/link";

const SERVICES_LINKS = [
  { label: "AI/ML Solutions", href: "/services/ai-ml" },
  { label: "Model Training", href: "/services/model-training" },
  { label: "Agentic Solutions", href: "/services/agentic" },
  { label: "Automation", href: "/services/automation" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Cloud Solutions", href: "/services/cloud" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
              style={{ fontWeight: 590, letterSpacing: "-0.03em" }}
            >
              Connect<span className="text-primary">Xeo</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Building the future with AI &amp; automation. Pakistan-based,
              globally trusted.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.tiktok.com/@connectxeo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ConnectXeo on TikTok"
                className="rounded-lg p-2 text-muted hover:bg-card hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@connectxeo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ConnectXeo on YouTube"
                className="rounded-lg p-2 text-muted hover:bg-card hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
              Get Started
            </h3>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Ready to transform your business with AI?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {currentYear} ConnectXeo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
