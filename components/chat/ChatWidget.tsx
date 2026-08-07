"use client";

import { useState, lazy, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
              <div className="fixed z-50 bottom-20 right-4 w-[360px] h-[560px] max-sm:left-3 max-sm:right-3 max-sm:bottom-[4.75rem] max-sm:w-auto max-sm:h-[min(520px,calc(100dvh-6.5rem))] max-sm:max-h-[78dvh] rounded-xl bg-[#070b10]/92 backdrop-blur-2xl border border-white/[0.1] flex items-center justify-center">
                <motion.div
                  className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full"
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
        className={`fixed bottom-5 right-5 z-50
          w-14 h-14 rounded-full
          flex items-center justify-center
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
          cursor-pointer ${
            isOpen
              ? "overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/35"
              : "bg-black border border-white/10"
          }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        initial={false}
        animate={
          isOpen
            ? { boxShadow: "0 10px 15px -3px rgb(20 184 166 / 0.25)" }
            : {
                boxShadow: [
                  "0 0 12px 2px rgb(34 211 238 / 0.35), 0 0 28px 6px rgb(34 211 238 / 0.15)",
                  "0 0 22px 6px rgb(34 211 238 / 0.7), 0 0 48px 14px rgb(34 211 238 / 0.35)",
                  "0 0 12px 2px rgb(34 211 238 / 0.35), 0 0 28px 6px rgb(34 211 238 / 0.15)",
                ],
              }
        }
        transition={
          isOpen
            ? { duration: 0.2 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
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
              className="absolute inset-0 overflow-hidden rounded-full"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Icon with brightness pulse so the cyan eyes feel alive */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  filter: [
                    "brightness(1) saturate(1)",
                    "brightness(1.35) saturate(1.4)",
                    "brightness(1) saturate(1)",
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/ai-icon.png"
                  alt="Open AI chat"
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Soft cyan wash over the eye area */}
              <motion.span
                className="pointer-events-none absolute inset-[18%] rounded-full bg-cyan-400/25 blur-md"
                animate={{ opacity: [0.2, 0.65, 0.2], scale: [0.85, 1.05, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer pulse rings — only when closed */}
        {!isOpen && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-cyan-400/50"
              animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border border-cyan-300/40"
              animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.55,
              }}
            />
          </>
        )}
      </motion.button>
    </>
  );
}
