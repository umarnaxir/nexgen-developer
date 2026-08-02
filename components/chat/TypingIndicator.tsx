"use client";

import { motion } from "framer-motion";

const dots = [0, 1, 2];

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 px-4 py-1">
      {/* Bot avatar */}
      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/20 flex items-center justify-center mt-0.5">
        <span className="text-[10px]">🤖</span>
      </div>

      {/* Typing bubble */}
      <div className="flex items-center gap-1 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06]">
        {dots.map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-teal-400/70"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
