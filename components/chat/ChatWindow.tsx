"use client";

import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import { AlertCircle, X } from "lucide-react";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearError,
  } = useChat();

  // Show suggestions when only welcome message exists
  const showSuggestions = messages.length <= 1;

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-50
        w-[360px] h-[560px]
        max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none
        flex flex-col
        rounded-2xl overflow-hidden
        bg-[#0a0f14]/90 backdrop-blur-2xl
        border border-white/[0.08]
        shadow-2xl shadow-black/40"
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      role="dialog"
      aria-label="NexGen AI Chat Assistant"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      {/* Header */}
      <ChatHeader onClose={onClose} />

      {/* Error Banner */}
      {error && (
        <motion.div
          className="mx-3 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-300"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={clearError}
            className="flex-shrink-0 hover:text-red-200 cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}

      {/* Messages */}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
      />

      {/* Suggested Questions */}
      <SuggestedQuestions
        onSelect={sendMessage}
        visible={showSuggestions}
      />

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </motion.div>
  );
}
