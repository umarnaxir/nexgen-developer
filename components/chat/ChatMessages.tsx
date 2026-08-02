"use client";

import { type Message } from "@/lib/utils";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
  isStreaming,
}: ChatMessagesProps) {
  const { containerRef } = useAutoScroll<HTMLDivElement>([messages, isLoading]);

  // Show typing indicator when loading but NOT streaming (before first chunk)
  const showTyping = isLoading && !isStreaming;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto py-3 space-y-1 scrollbar-hide"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {showTyping && <TypingIndicator />}
    </div>
  );
}
