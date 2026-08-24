"use client";

import { motion } from "framer-motion";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { AlertCircle, X } from "lucide-react";

interface ChatWindowProps {
  onClose?: () => void;
}

export default function ChatWindow(_props: ChatWindowProps) {
  const {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearError,
  } = useChat();

  const showSuggestions = messages.length <= 1;

  return (
    <motion.div
      className="fixed z-50
        bottom-20 right-4
        w-[360px] h-[560px]
        max-sm:left-3 max-sm:right-3 max-sm:bottom-[4.75rem] max-sm:w-auto
        max-sm:h-[min(520px,calc(100dvh-6.5rem))] max-sm:max-h-[78dvh]
        flex flex-col
        rounded-xl overflow-hidden
        bg-[#070b10]/92 backdrop-blur-2xl
        border border-white/[0.1]
        shadow-2xl shadow-black/50"
      initial={{ opacity: 0, scale: 0.94, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 32 }}
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
      role="dialog"
      aria-label="NexGen AI Chat Assistant"
    >
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230, 201, 166,0.05),_transparent_55%)]" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />

      <div className="relative z-10 flex flex-col h-full min-h-0">
        <ChatHeader />

        {error && (
          <motion.div
            className="mx-2.5 mt-1.5 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] text-red-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button
              onClick={clearError}
              className="flex-shrink-0 hover:text-red-200 cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </motion.div>
        )}

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          showSuggestions={showSuggestions}
          onSelectSuggestion={sendMessage}
        />

        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
