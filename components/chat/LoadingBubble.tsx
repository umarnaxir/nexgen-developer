"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingBubble() {
  return (
    <div className="flex items-start gap-2.5 px-4 py-1">
      <div className="flex-shrink-0 w-7 h-7 rounded-lg overflow-hidden bg-black border border-gold/20 mt-0.5">
        <Image
          src="/images/ai-icon.png"
          alt="AI"
          width={28}
          height={28}
          className="object-cover"
        />
      </div>
      <motion.div
        className="w-48 h-9 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.08]"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
