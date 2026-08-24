"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const dots = [0, 1, 2];

export default function TypingIndicator() {
  return (
    <motion.div
      className="flex items-start gap-2 px-3 py-1"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative flex-shrink-0 rounded-md overflow-hidden bg-black border border-gold/20 mt-0.5"
        style={{ width: 22, height: 22 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/ai-icon.png"
            alt="AI typing"
            width={22}
            height={22}
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="relative flex items-center gap-1 px-2.5 py-2 rounded-xl rounded-tl-sm bg-white/[0.045] border border-white/[0.08]">
        {dots.map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-gold"
            animate={{
              y: [0, -3, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.65,
              repeat: Infinity,
              delay: i * 0.14,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
