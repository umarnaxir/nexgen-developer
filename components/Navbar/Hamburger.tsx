"use client";

import React from "react";
import { motion } from "framer-motion";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (i: number) => ({
      rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
      y: i === 0 ? 7 : i === 2 ? -7 : 0,
      opacity: i === 1 ? 0 : 1,
    }),
  };

  const containerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <motion.button
      onClick={onClick}
      className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      variants={containerVariants}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[6px] bg-black rounded-full"
          style={{
            width: i === 0 ? "24px" : i === 1 ? "20px" : "24px",
            originX: 0.5,
            originY: 0.5,
          }}
          variants={lineVariants}
          custom={i}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
    </motion.button>
  );
}

