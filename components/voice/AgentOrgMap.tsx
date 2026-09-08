"use client";

// AgentOrgMap — always-on sidebar showing the ConnectXeo agent roster.
// Departments light up (neon glow) when passed in the `activeAgents` array.
// Rex / the voice hook will push active agent names here as Hermes delegates.

interface Department {
  id: string;
  label: string;
  icon: string;
  agents: string[];
}

const DEPARTMENTS: Department[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    icon: "🤖",
    agents: ["Atlas", "Sage"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    agents: ["Cole"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    agents: ["Pixel"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "🛠️",
    agents: ["Ops"],
  },
  {
    id: "design",
    label: "Design",
    icon: "✏️",
    agents: ["Sketch"],
  },
  {
    id: "social",
    label: "Social",
    icon: "📣",
    agents: ["Echo"],
  },
  {
    id: "pm",
    label: "PM",
    icon: "📋",
    agents: ["Kinza"],
  },
];

interface AgentOrgMapProps {
  // Active agent IDs or labels — departments containing these agents will highlight.
  // Rex passes real agent names from LiveKit participant metadata.
  activeAgents?: string[];
}

export default function AgentOrgMap({
  activeAgents = [],
}: AgentOrgMapProps) {
  const activeLower = activeAgents.map((a) => a.toLowerCase());

  const isDeptActive = (dept: Department) =>
    dept.agents.some(
      (agent) =>
        activeLower.includes(agent.toLowerCase()) ||
        activeLower.includes(dept.id.toLowerCase()) ||
        activeLower.includes(dept.label.toLowerCase())
    );

  return (
    <aside className="flex flex-col gap-2 w-56">
      {/* Header */}
      <div className="mb-2">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Agent Roster
        </p>
        <div className="mt-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
      </div>

      {DEPARTMENTS.map((dept) => {
        const active = isDeptActive(dept);
        return (
          <div
            key={dept.id}
            className={[
              "flex items-center gap-3 px-3 py-2 rounded-lg",
              "border transition-all duration-300",
              active
                ? "bg-cyan-950/60 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                : "bg-gray-900/40 border-gray-800 hover:border-gray-600",
            ].join(" ")}
          >
            {/* Active indicator dot */}
            <span
              className={[
                "flex-shrink-0 w-2 h-2 rounded-full",
                active ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,1)] animate-pulse" : "bg-gray-700",
              ].join(" ")}
            />

            {/* Icon */}
            <span className="text-base leading-none" aria-hidden="true">
              {dept.icon}
            </span>

            {/* Label + agents */}
            <div className="min-w-0">
              <p
                className={[
                  "text-sm font-semibold font-mono leading-none",
                  active ? "text-cyan-300" : "text-gray-400",
                ].join(" ")}
              >
                {dept.label}
              </p>
              <p className="text-[10px] text-gray-600 mt-0.5 truncate">
                {dept.agents.join(", ")}
              </p>
            </div>
          </div>
        );
      })}

      {/* Footer note */}
      <p className="mt-3 text-[10px] font-mono text-gray-700 text-center">
        CONNECTXEO AGENT NETWORK
      </p>
    </aside>
  );
}
