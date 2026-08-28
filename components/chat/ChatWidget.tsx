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
              <div className="fixed bottom-20 right-4 z-50 flex h-[min(35rem,calc(100dvh-7rem))] max-h-[calc(100dvh-7rem)] w-[min(22.5rem,calc(100dvw-2rem))] items-center justify-center rounded-xl border border-gold/20 bg-black">
                <motion.div
                  className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full"
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
        className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50
          flex h-14 w-14 rounded-full
          flex items-center justify-center
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black
          cursor-pointer ${
            isOpen
              ? "overflow-hidden bg-gradient-to-br from-gold-dark to-gold-dark text-white shadow-lg shadow-gold-dark/25 hover:shadow-xl hover:shadow-gold-dark/35"
              : "bg-black border border-white/10"
          }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        initial={false}
        animate={
          isOpen
            ? { boxShadow: "0 10px 18px -3px rgb(209 172 129 / 0.4)" }
            : {
                boxShadow: [
                  "0 0 12px 2px rgb(230 201 166 / 0.35), 0 0 28px 6px rgb(230 201 166 / 0.15)",
                  "0 0 22px 6px rgb(230 201 166 / 0.65), 0 0 48px 14px rgb(230 201 166 / 0.3)",
                  "0 0 12px 2px rgb(230 201 166 / 0.35), 0 0 28px 6px rgb(230 201 166 / 0.15)",
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
              <motion.div
                className="absolute inset-0"
                animate={{
                  filter: [
                    "brightness(1) saturate(1)",
                    "brightness(1.25) saturate(1.15)",
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

              <motion.span
                className="pointer-events-none absolute inset-[18%] rounded-full bg-gold/30 blur-md"
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.85, 1.05, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer pulse rings — only when closed */}
        {!isOpen && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-gold/50"
              animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full border border-gold-light/40"
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
