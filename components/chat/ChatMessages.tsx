"use client";

import { type Message } from "@/lib/utils";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  showSuggestions?: boolean;
  onSelectSuggestion?: (question: string) => void;
}

export default function ChatMessages({
  messages,
  isLoading,
  isStreaming,
  showSuggestions = false,
  onSelectSuggestion,
}: ChatMessagesProps) {
  const { containerRef } = useAutoScroll<HTMLDivElement>([messages, isLoading]);

  const showTyping = isLoading && !isStreaming;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto py-2 scrollbar-hide min-h-0"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {showTyping && <TypingIndicator />}

      {showSuggestions && onSelectSuggestion && (
        <SuggestedQuestions onSelect={onSelectSuggestion} visible />
      )}
    </div>
  );
}
