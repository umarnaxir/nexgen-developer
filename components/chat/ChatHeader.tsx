"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function ChatHeaderComponent() {
  return (
    <div className="relative flex items-center px-3 py-2 border-b border-white/[0.08]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/[0.05] to-transparent" />

      <div className="relative flex items-center gap-2">
        <div className="relative">
          <motion.div
            className="absolute -inset-0.5 rounded-lg bg-gold/20 blur-md"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center justify-center w-7 h-7 overflow-hidden rounded-lg bg-black border border-white/10 shadow-md shadow-gold/20">
            <motion.div
              className="absolute inset-0"
              animate={{
                filter: [
                  "brightness(1) saturate(1)",
                  "brightness(1.25) saturate(1.3)",
                  "brightness(1) saturate(1)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/ai-icon.png"
                alt="NexGen AI"
                width={28}
                height={28}
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className="text-[12px] font-semibold text-white leading-tight tracking-tight">
            NexGen AI
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <motion.span
              className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[9px] text-emerald-300/70 font-medium">
              Online · Ready to help
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatHeaderComponent);
