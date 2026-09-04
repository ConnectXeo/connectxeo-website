interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2
        className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}
