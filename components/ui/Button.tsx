import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "onDark" | "pill";
type Size = "default" | "big";

function buttonClasses(variant: Variant, size: Size) {
  if (variant === "pill") {
    return "inline-flex items-center justify-center font-body font-semibold text-[0.8rem] px-[14px] py-[6px] rounded-full border border-schwarz/25 text-hbo-basis bg-transparent hover:bg-schwarz/5";
  }
  const base =
    "inline-flex items-center justify-center font-body font-bold transition-colors duration-150 border-2";
  const variantClasses =
    variant === "onDark"
      ? "bg-weiss text-schwarz border-weiss hover:bg-transparent hover:text-weiss"
      : "bg-hbo-basis text-weiss border-hbo-basis hover:bg-transparent hover:text-hbo-basis";
  const sizeClasses =
    size === "big" ? "px-[40px] py-[26px] text-[1.25rem]" : "px-[30px] py-[18px] text-base";
  return `${base} ${variantClasses} ${sizeClasses}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  return <button className={`${buttonClasses(variant, size)} ${className}`} {...props} />;
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "default",
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonClasses(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}
