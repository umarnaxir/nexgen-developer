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
  variant?: "primary" | "outline" | "outline-light";
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
    primary: "bg-white text-black hover:bg-neutral-100",
    outline: "border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5",
    "outline-light":
      "border border-black/15 bg-transparent text-black hover:border-black/30 hover:bg-black/[0.03]",
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
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300",
        variantStyles[variant],
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
