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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 96)}px`; // max 4 lines
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    // Reset height
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

  return (
    <div className="px-3 pb-3 pt-2 border-t border-white/[0.06]">
      <div className="flex items-end gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3 py-2 focus-within:border-teal-500/30 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none bg-transparent text-[13px] text-white/90 placeholder:text-white/25 outline-none leading-relaxed max-h-24 scrollbar-hide disabled:opacity-50"
          aria-label="Chat message input"
        />

        {/* Character count */}
        {nearLimit && (
          <span
            className={`text-[9px] font-mono flex-shrink-0 mb-0.5 ${
              atLimit ? "text-red-400" : "text-white/30"
            }`}
          >
            {value.length}/{maxLength}
          </span>
        )}

        {/* Send button */}
        <motion.button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg
            bg-gradient-to-br from-teal-500 to-teal-600 text-white
            disabled:opacity-30 disabled:cursor-not-allowed
            shadow-md shadow-teal-500/20 cursor-pointer"
          whileHover={value.trim() && !isLoading ? { scale: 1.08 } : {}}
          whileTap={value.trim() && !isLoading ? { scale: 0.92 } : {}}
          aria-label="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      <p className="text-[9px] text-white/20 text-center mt-1.5 select-none">
        Shift+Enter for new line · Enter to send
      </p>
    </div>
  );
}
