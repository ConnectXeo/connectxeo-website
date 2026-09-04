import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Our Team — ConnectXeo",
  description: "Meet the ConnectXeo team — a 16-member AI-augmented workforce spanning Leadership, Social, Studio, and Dev departments.",
};

const DEPARTMENTS = [
  { name: "Leadership", slug: "leadership" },
  { name: "Social", slug: "social" },
  { name: "Studio", slug: "studio" },
  { name: "Dev", slug: "dev" },
];

const TEAM = [
  { name: "Hermes", role: "Orchestrator", department: "leadership", initials: "HE", bio: "The central intelligence that coordinates all agents, routes tasks, and ensures every project stays on track." },
  { name: "CEO", role: "Strategic Director", department: "leadership", initials: "CE", bio: "Sets the strategic direction of ConnectXeo, aligns business goals, and drives long-term vision." },
  { name: "Kinza", role: "Project Manager", department: "leadership", initials: "KI", bio: "Owns project delivery from brief to launch, keeping teams aligned, timelines tight, and clients happy." },
  { name: "Xeo", role: "Social Media Lead", department: "social", initials: "XE", bio: "Drives ConnectXeo's social presence across every platform — strategy, voice, and community growth." },
  { name: "Scout", role: "Trend Scout", department: "social", initials: "SC", bio: "Monitors the digital landscape 24/7 to surface emerging trends before they go mainstream." },
  { name: "Arya", role: "Analyst", department: "social", initials: "AR", bio: "Turns social and market data into actionable insights that sharpen strategy and boost performance." },
  { name: "Nova", role: "Content Creator", department: "studio", initials: "NO", bio: "Crafts compelling written and visual content that educates, entertains, and converts audiences." },
  { name: "Rio", role: "Producer", department: "studio", initials: "RI", bio: "Oversees video and audio production end-to-end — from concept to a polished final deliverable." },
  { name: "Zara", role: "Designer", department: "studio", initials: "ZA", bio: "Creates beautiful, on-brand visual assets — UI designs, graphics, and motion pieces that stand out." },
  { name: "Max", role: "Editor", department: "studio", initials: "MA", bio: "Refines every piece of content to ensure clarity, consistency, and a high standard of quality." },
  { name: "Luna", role: "Captioner", department: "studio", initials: "LU", bio: "Ensures all video content is accessible with accurate, well-timed captions and subtitles." },
  { name: "Blade", role: "Clipper", department: "studio", initials: "BL", bio: "Transforms long-form content into punchy, high-impact short-form clips optimised for every platform." },
  { name: "Rex", role: "Dev Lead", department: "dev", initials: "RE", bio: "Leads the engineering team, sets technical standards, reviews PRs, and makes sure the code ships clean." },
  { name: "Pixel", role: "Frontend Developer", department: "dev", initials: "PI", bio: "Builds everything the user sees — clean, fast, responsive interfaces in Next.js and Tailwind CSS." },
  { name: "Cole", role: "Backend Developer", department: "dev", initials: "CO", bio: "Engineers scalable APIs, databases, and server-side logic that power the products users love." },
  { name: "Dev", role: "GitHub Engineer", department: "dev", initials: "DV", bio: "Owns the Git workflow, CI/CD pipelines, repository hygiene, and automated release processes." },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-primary opacity-[0.07] blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up"><Badge>The Team</Badge></div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-up-delay-1" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>
              Meet the minds behind{" "}
              <span className="text-primary">ConnectXeo</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted animate-fade-up-delay-2">
              A high-performance, AI-augmented team of 16 specialists across Leadership,
              Social, Studio, and Dev — built to move fast and deliver with precision.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-up-delay-3">
              {[
                { label: "Team Members", value: "16" },
                { label: "Departments", value: "4" },
                { label: "Time to Ship", value: "Fast" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card px-6 py-3 text-center">
                  <p className="text-xl font-bold text-foreground" style={{ fontWeight: 590 }}>{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department sections */}
      {DEPARTMENTS.map((dept, dIdx) => {
        const members = TEAM.filter((m) => m.department === dept.slug);
        return (
          <section key={dept.slug} className={`border-b border-border ${dIdx % 2 === 1 ? "bg-background-secondary" : ""}`}>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
              <div className="mb-12 flex items-center gap-4">
                <Badge>{dept.name}</Badge>
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted">{members.length} members</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member) => (
                  <Card key={member.name} hover className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {member.initials}
                    </div>
                    <h3 className="text-base font-semibold text-foreground" style={{ fontWeight: 590 }}>{member.name}</h3>
                    <p className="mt-0.5 text-sm text-muted">{member.role}</p>
                    <p className="mt-3 text-xs leading-5 text-muted">{member.bio}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center" style={{ boxShadow: "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset" }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontWeight: 510, letterSpacing: "-0.03em" }}>
              Want this team on your side?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Get in touch and let&apos;s figure out exactly what you need. No fluff, no long sales cycles — just an honest conversation.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact">Start a conversation</Button>
              <Button href="/about" variant="secondary">Our story</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
