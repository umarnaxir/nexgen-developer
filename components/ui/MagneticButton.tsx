"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "outline" | "outline-light" | "gold";
};

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  type = "button",
  disabled,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    primary:
      "border border-gold bg-primary text-primary-foreground shadow-[0_10px_28px_-18px_rgba(14,13,13,0.45)] hover:-translate-y-0.5 hover:bg-gold hover:text-primary hover:shadow-[0_16px_36px_-16px_rgba(230,201,166,0.7)]",
    outline:
      "border border-gold bg-transparent text-primary-foreground hover:-translate-y-0.5 hover:bg-gold hover:text-primary hover:shadow-[0_14px_32px_-16px_rgba(230,201,166,0.55)]",
    "outline-light":
      "border border-gold bg-transparent text-primary hover:-translate-y-0.5 hover:bg-gold hover:text-primary hover:shadow-[0_14px_32px_-16px_rgba(230,201,166,0.55)]",
    gold:
      "border border-gold bg-gold text-primary shadow-[0_12px_28px_-16px_rgba(230,201,166,0.55)] hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-[0_16px_36px_-16px_rgba(230,201,166,0.7)]",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      </span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block disabled:opacity-50">
      {content}
    </button>
  );
}
