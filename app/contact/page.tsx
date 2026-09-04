import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us — ConnectXeo",
  description: "Get in touch with ConnectXeo. Book a free discovery call or send us a message about your AI, automation, or web project.",
};

const CONTACT_CHANNELS = [
  { label: "Email", value: "admin@connectxeo.com", href: "mailto:admin@connectxeo.com", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>) },
  { label: "TikTok", value: "@connectxeo", href: "https://tiktok.com/@connectxeo", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" /></svg>) },
  { label: "YouTube", value: "@connectxeo", href: "https://youtube.com/@connectxeo", icon: (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>) },
];

const RESPONSE_ITEMS = [
  { title: "Fast Response", desc: "We reply to all enquiries within 24 hours" },
  { title: "Free Discovery", desc: "First call is always free — no commitment" },
  { title: "Confidential", desc: "Your idea and data stay private. Always." },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="animate-fade-up"><Badge pulse>Let&apos;s Talk</Badge></div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
            Start a <span className="text-primary">conversation</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto animate-fade-up-delay-2">
            Whether you have a clear brief or just an idea, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontWeight: 590 }}>Find us on</h2>
              <div className="space-y-3">
                {CONTACT_CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 border border-border bg-card rounded-xl px-4 py-3.5 hover:border-primary/30 transition-all group"
                  >
                    <span className="text-primary">{ch.icon}</span>
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wider mb-0.5">{ch.label}</div>
                      <div className="text-sm font-medium group-hover:text-primary text-foreground transition-colors">{ch.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4" style={{ fontWeight: 590 }}>What to expect</h2>
              <div className="space-y-3">
                {RESPONSE_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-xs text-muted">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-5">
              <p className="text-sm text-muted leading-relaxed">
                ConnectXeo is based in{" "}
                <span className="text-foreground font-medium">Pakistan</span>, serving clients globally.
                We work across timezones — wherever you are, we&apos;ll make it work.
              </p>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontWeight: 590 }}>Send us a message</h2>
              <p className="text-sm text-muted mb-6">Fill in the form and we&apos;ll get back to you within 24 hours.</p>
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
