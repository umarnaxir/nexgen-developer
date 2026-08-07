"use client";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function AdminButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-11 px-5 text-base",
        variant === "primary" &&
          "bg-teal-600 text-white hover:bg-teal-500 shadow-sm",
        variant === "secondary" &&
          "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
        variant === "ghost" && "text-neutral-600 hover:bg-neutral-100",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-500",
        className
      )}
      {...props}
    />
  );
}
