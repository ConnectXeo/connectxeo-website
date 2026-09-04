import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary px-8 py-3.5 text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-primary-hover/20",
  secondary:
    "border border-border bg-card px-8 py-3.5 text-foreground hover:border-primary hover:text-primary",
  ghost:
    "px-4 py-2 text-muted hover:text-foreground hover:bg-card",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
