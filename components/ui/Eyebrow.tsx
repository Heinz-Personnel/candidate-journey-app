import type { ReactNode } from "react";

export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`block font-body font-bold text-[0.72rem] uppercase tracking-[0.14em] ${
        onDark ? "text-hbo-hell" : "text-hbo-basis"
      } ${className}`}
    >
      {children}
    </span>
  );
}
