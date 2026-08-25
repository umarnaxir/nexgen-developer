"use client";

import { cn } from "@/lib/utils";
import { adminUi } from "@/lib/admin/ui";

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
        variant === "primary" && adminUi.button.primary,
        variant === "secondary" && adminUi.button.secondary,
        variant === "ghost" && adminUi.button.ghost,
        variant === "danger" && adminUi.button.danger,
        className
      )}
      {...props}
    />
  );
}
