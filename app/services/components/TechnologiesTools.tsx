"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getTechIcon } from "../lib/tech-icon-map";

interface TechnologiesToolsProps {
  technologies: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function TechnologiesTools({ technologies }: TechnologiesToolsProps) {
  const reduceMotion = useReducedMotion();
  const items = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2.5 sm:gap-3">
      {items.map((name, index) => {
        const Icon = getTechIcon(name);
        return (
          <motion.li
            key={name}
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
            transition={{ duration: 0.35, delay: index * 0.035, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-2 text-sm font-medium text-black/75 transition-colors duration-300 hover:border-gold-dark/40 hover:text-black"
          >
            <Icon className="h-4 w-4 text-gold-dark" />
            {name}
          </motion.li>
        );
      })}
    </ul>
  );
}
