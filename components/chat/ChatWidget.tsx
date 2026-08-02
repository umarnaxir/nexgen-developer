"use client";

import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";

// Lazy load ChatWindow for code splitting
const ChatWindow = lazy(() => import("./ChatWindow"));

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <Suspense
            fallback={
              <div className="fixed bottom-20 right-4 z-50 w-[360px] h-[560px] max-sm:inset-0 max-sm:w-full max-sm:h-full rounded-2xl max-sm:rounded-none bg-[#0a0f14]/90 backdrop-blur-2xl border border-white/[0.08] flex items-center justify-center">
                <motion.div
                  className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            }
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50
          w-13 h-13 rounded-full
          bg-gradient-to-br from-teal-500 to-teal-600
          text-white shadow-lg shadow-teal-500/25
          flex items-center justify-center
          hover:shadow-xl hover:shadow-teal-500/35
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
          cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        initial={false}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing ring — only when closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-teal-400/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
