import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "filled";
  size?: "sm" | "md";
  children: ReactNode;
}

export function Button({ variant = "outlined", size = "sm", children, className = "", ...props }: Props) {
  const sizes = size === "sm" ? "px-5 py-2 text-xs" : "px-6 py-2.5 text-sm";
  const variants =
    variant === "filled"
      ? "bg-primary text-primary-foreground hover:brightness-110"
      : "border border-foreground/40 text-foreground hover:border-primary hover:text-primary";
  return (
    <button
      {...props}
      className={`${sizes} ${variants} rounded-full font-medium transition-all hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    >
      {children}
    </button>
  );
}
