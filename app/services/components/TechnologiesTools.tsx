"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { getTechIcon } from "../lib/tech-icon-map";

interface TechnologiesToolsProps {
  technologies: string;
}

function TechCard({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = getTechIcon(name);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 220, damping: 18 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative overflow-hidden rounded-xl border border-black/[0.06] bg-white p-4 shadow-[0_16px_48px_-36px_rgba(0,0,0,0.14)] transition-colors hover:border-gold-dark/25 sm:p-5"
    >
      <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gold-dark/[0.07] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-dark/20 bg-gold-dark/10 text-gold-dark transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <span className="block text-[10px] font-medium tabular-nums tracking-[0.2em] text-black/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mt-0.5 block text-sm font-semibold leading-snug tracking-[-0.01em] text-black transition-colors group-hover:text-gold-dark">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechnologiesTools({ technologies }: TechnologiesToolsProps) {
  const items = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((tech, index) => (
        <TechCard key={tech} name={tech} index={index} />
      ))}
    </div>
  );
}
