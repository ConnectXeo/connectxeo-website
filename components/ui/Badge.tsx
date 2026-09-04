interface BadgeProps {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export default function Badge({ children, pulse = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary ${className}`}
    >
      {pulse && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      )}
      {children}
    </span>
  );
}
