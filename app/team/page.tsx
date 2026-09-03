import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team — ConnectXeo",
  description:
    "Meet the ConnectXeo team — a 16-member AI-augmented workforce spanning Leadership, Social, Studio, and Dev departments.",
};

/* ── Department config ────────────────────────────────────── */
const DEPARTMENTS: {
  name: string;
  slug: string;
  badge: string;
  accent: string;
  glow: string;
}[] = [
  {
    name: "Leadership",
    slug: "leadership",
    badge: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    accent: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    name: "Social",
    slug: "social",
    badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    accent: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/20",
  },
  {
    name: "Studio",
    slug: "studio",
    badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    accent: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
  },
  {
    name: "Dev",
    slug: "dev",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    accent: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

/* ── Team members ─────────────────────────────────────────── */
const TEAM: {
  name: string;
  role: string;
  department: string;
  initials: string;
  bio: string;
}[] = [
  // Leadership
  {
    name: "Hermes",
    role: "Orchestrator",
    department: "leadership",
    initials: "HE",
    bio: "The central intelligence that coordinates all agents, routes tasks, and ensures every project stays on track.",
  },
  {
    name: "CEO",
    role: "Strategic Director",
    department: "leadership",
    initials: "CE",
    bio: "Sets the strategic direction of ConnectXeo, aligns business goals, and drives long-term vision.",
  },
  {
    name: "Kinza",
    role: "Project Manager",
    department: "leadership",
    initials: "KI",
    bio: "Owns project delivery from brief to launch, keeping teams aligned, timelines tight, and clients happy.",
  },

  // Social
  {
    name: "Xeo",
    role: "Social Media Lead",
    department: "social",
    initials: "XE",
    bio: "Drives ConnectXeo's social presence across every platform — strategy, voice, and community growth.",
  },
  {
    name: "Scout",
    role: "Trend Scout",
    department: "social",
    initials: "SC",
    bio: "Monitors the digital landscape 24/7 to surface emerging trends before they go mainstream.",
  },
  {
    name: "Arya",
    role: "Analyst",
    department: "social",
    initials: "AR",
    bio: "Turns social and market data into actionable insights that sharpen strategy and boost performance.",
  },

  // Studio
  {
    name: "Nova",
    role: "Content Creator",
    department: "studio",
    initials: "NO",
    bio: "Crafts compelling written and visual content that educates, entertains, and converts audiences.",
  },
  {
    name: "Rio",
    role: "Producer",
    department: "studio",
    initials: "RI",
    bio: "Oversees video and audio production end-to-end — from concept to a polished final deliverable.",
  },
  {
    name: "Zara",
    role: "Designer",
    department: "studio",
    initials: "ZA",
    bio: "Creates beautiful, on-brand visual assets — UI designs, graphics, and motion pieces that stand out.",
  },
  {
    name: "Max",
    role: "Editor",
    department: "studio",
    initials: "MA",
    bio: "Refines every piece of content to ensure clarity, consistency, and a high standard of quality.",
  },
  {
    name: "Luna",
    role: "Captioner",
    department: "studio",
    initials: "LU",
    bio: "Ensures all video content is accessible with accurate, well-timed captions and subtitles.",
  },
  {
    name: "Blade",
    role: "Clipper",
    department: "studio",
    initials: "BL",
    bio: "Transforms long-form content into punchy, high-impact short-form clips optimised for every platform.",
  },

  // Dev
  {
    name: "Rex",
    role: "Dev Lead",
    department: "dev",
    initials: "RE",
    bio: "Leads the engineering team, sets technical standards, reviews PRs, and makes sure the code ships clean.",
  },
  {
    name: "Pixel",
    role: "Frontend Developer",
    department: "dev",
    initials: "PI",
    bio: "Builds everything the user sees — clean, fast, responsive interfaces in Next.js and Tailwind CSS.",
  },
  {
    name: "Cole",
    role: "Backend Developer",
    department: "dev",
    initials: "CO",
    bio: "Engineers scalable APIs, databases, and server-side logic that power the products users love.",
  },
  {
    name: "Dev",
    role: "GitHub Engineer",
    department: "dev",
    initials: "DV",
    bio: "Owns the Git workflow, CI/CD pipelines, repository hygiene, and automated release processes.",
  },
];

/* ── Helpers ──────────────────────────────────────────────── */
function getDept(slug: string) {
  return DEPARTMENTS.find((d) => d.slug === slug)!;
}

function getTeamByDept(slug: string) {
  return TEAM.filter((m) => m.department === slug);
}

export default function TeamPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[520px] w-[700px] rounded-full bg-violet-500 opacity-[0.07] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[450px] rounded-full bg-blue-500 opacity-[0.05] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
              The Team
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Meet the minds behind{" "}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                ConnectXeo
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              A high-performance, AI-augmented team of 16 specialists across Leadership,
              Social, Studio, and Dev — built to move fast and deliver with precision.
            </p>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {[
                { label: "Team Members", value: "16" },
                { label: "Departments", value: "4" },
                { label: "Time to Ship", value: "Fast" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-card px-6 py-3 text-center">
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Department sections ──────────────────────────────── */}
      {DEPARTMENTS.map((dept, dIdx) => {
        const members = getTeamByDept(dept.slug);
        return (
          <section
            key={dept.slug}
            className={`border-b border-border ${dIdx % 2 === 1 ? "bg-card/30" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
              {/* Section header */}
              <div className="mb-12 flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${dept.badge}`}>
                  {dept.name}
                </span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted">{members.length} members</span>
              </div>

              {/* Cards grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member) => {
                  const d = getDept(member.department);
                  return (
                    <div
                      key={member.name}
                      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${d.glow}`}
                    >
                      {/* Subtle gradient background */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${d.accent} opacity-0 transition-opacity duration-200 group-hover:opacity-[0.04]`}
                      />

                      {/* Avatar */}
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${d.accent} text-sm font-bold text-white shadow-sm`}
                      >
                        {member.initials}
                      </div>

                      {/* Name + role */}
                      <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
                      <p className="mt-0.5 text-sm text-muted">{member.role}</p>

                      {/* Department badge */}
                      <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${d.badge}`}>
                        {d.name}
                      </span>

                      {/* Bio */}
                      <p className="mt-3 text-xs leading-5 text-muted">{member.bio}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500 opacity-[0.07] blur-3xl" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want this team on your side?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Get in touch and let&apos;s figure out exactly what you need. No fluff, no long
              sales cycles — just an honest conversation about what we can build together.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-500 hover:shadow-violet-500/25 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Start a conversation
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                Our story →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
