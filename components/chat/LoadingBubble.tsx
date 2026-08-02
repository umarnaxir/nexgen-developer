"use client";

import { motion } from "framer-motion";

export default function LoadingBubble() {
  return (
    <div className="flex items-start gap-2.5 px-4 py-1">
      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/20 flex items-center justify-center mt-0.5">
        <span className="text-[10px]">🤖</span>
      </div>
      <motion.div
        className="w-48 h-8 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
