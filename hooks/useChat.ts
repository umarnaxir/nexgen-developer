'use client';

import { useState, useCallback, useRef } from 'react';
import { type Message, generateId } from '@/lib/utils';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `👋 Welcome to **NexGen Developers**!

I'm your AI assistant. I can answer questions about:

• **Services** — Web, Mobile, AI, Cloud, UI/UX
• **Projects** — Our portfolio & case studies
• **Pricing** — Packages & custom quotes
• **Technologies** — Our tech stack
• **Consultation** — Book a free session
• **Hiring** — Careers & open positions

How can I help you today?`,
  timestamp: Date.now(),
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    // Clear any previous error
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Create assistant message placeholder
    const assistantId = generateId();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    try {
      // Prepare messages for API (exclude welcome, limit to last 10)
      const apiMessages = [...messages.filter(m => m.id !== 'welcome'), userMessage]
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

      // Abort any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: controller.signal,
      });

      // Handle rate limiting
      if (response.status === 429) {
        setError('Too many requests. Please wait a moment before trying again.');
        setIsLoading(false);
        return;
      }

      // Handle other HTTP errors
      if (!response.ok && response.status !== 200) {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.error || "Sorry, I'm currently unavailable. Please try again later.");
        setIsLoading(false);
        return;
      }

      const contentType = response.headers.get('content-type') || '';

      // Handle guardrail rejection (JSON response)
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (data.rejected) {
          setMessages(prev => [
            ...prev,
            { ...assistantMessage, content: data.message, timestamp: Date.now() },
          ]);
          setIsLoading(false);
          return;
        }
        if (data.error) {
          setError(data.error);
          setIsLoading(false);
          return;
        }
      }

      // Handle streaming response
      if (!response.body) {
        setError('No response received. Please try again.');
        setIsLoading(false);
        return;
      }

      // Add empty assistant message
      setMessages(prev => [...prev, assistantMessage]);
      setIsStreaming(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        // Update the assistant message content
        const currentContent = accumulated;
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: currentContent, timestamp: Date.now() }
              : m
          )
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Request was aborted, ignore
        return;
      }
      console.error('[Chat Error]', err);
      setError("Sorry, I'm currently unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading]);

  const clearConversation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([{ ...WELCOME_MESSAGE, timestamp: Date.now() }]);
    setError(null);
    setIsLoading(false);
    setIsStreaming(false);
  }, []);

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearConversation,
    clearError,
  };
}
