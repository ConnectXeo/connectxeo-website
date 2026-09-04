interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          : ""
      } ${className}`}
      style={{
        boxShadow:
          "rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px",
      }}
    >
      {children}
    </div>
  );
}
