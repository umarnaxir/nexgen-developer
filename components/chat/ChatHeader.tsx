"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

function ChatHeaderComponent({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
          <Bot className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white leading-tight">
            NexGen AI
          </h3>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] text-white/50 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Right: Close Button */}
      <motion.button
        onClick={onClose}
        className="flex items-center justify-center w-7 h-7 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close chat"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

export default memo(ChatHeaderComponent);
