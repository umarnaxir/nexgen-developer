"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 72)}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isLoading, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const nearLimit = value.length > maxLength * 0.8;
  const atLimit = value.length >= maxLength;
  const canSend = Boolean(value.trim()) && !isLoading;

  return (
    <div className="relative px-2.5 pb-2.5 pt-1.5 border-t border-white/[0.06]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <motion.div
        className="relative flex items-end gap-1.5 rounded-xl bg-white/[0.04] border px-2.5 py-1.5 transition-colors"
        animate={{
          borderColor: focused
            ? "rgba(230, 201, 166, 0.35)"
            : "rgba(255, 255, 255, 0.08)",
          boxShadow: focused
            ? "0 0 0 1px rgba(230, 201, 166,0.1), 0 0 16px rgba(230, 201, 166,0.06)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask anything about NexGen..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none bg-transparent text-[11.5px] text-white/90 placeholder:text-white/30 outline-none leading-relaxed max-h-[72px] scrollbar-hide disabled:opacity-50"
          aria-label="Chat message input"
        />

        {nearLimit && (
          <span
            className={`text-[8px] font-mono flex-shrink-0 mb-0.5 ${
              atLimit ? "text-red-400" : "text-white/30"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        )}

        <motion.button
          onClick={handleSend}
          disabled={!canSend}
          className="relative flex-shrink-0 flex items-center justify-center w-6.5 h-6.5 rounded-lg
            bg-gradient-to-br from-gold-dark to-gold-dark text-white
            disabled:opacity-30 disabled:cursor-not-allowed
            shadow-md shadow-gold/20 cursor-pointer overflow-hidden"
          style={{ width: 26, height: 26 }}
          whileHover={canSend ? { scale: 1.08 } : {}}
          whileTap={canSend ? { scale: 0.92 } : {}}
          animate={
            canSend
              ? {
                  boxShadow: [
                    "0 2px 8px rgba(230, 201, 166,0.25)",
                    "0 2px 14px rgba(230, 201, 166,0.4)",
                    "0 2px 8px rgba(230, 201, 166,0.25)",
                  ],
                }
              : {}
          }
          transition={
            canSend
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          aria-label="Send message"
        >
          <Send className="w-3 h-3 relative z-10" />
        </motion.button>
      </motion.div>

      <p className="text-[8px] text-white/25 text-center mt-1.5 select-none tracking-wide">
        Shift+Enter for new line · Enter to send
      </p>
    </div>
  );
}
