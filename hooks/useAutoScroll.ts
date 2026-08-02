'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Auto-scroll hook for chat messages.
 * Scrolls to bottom when new messages arrive,
 * but respects user's scroll position (won't force-scroll if scrolled up).
 */
export function useAutoScroll<T extends HTMLElement>(deps: unknown[]) {
  const containerRef = useRef<T>(null);
  const shouldAutoScroll = useRef(true);

  // Track whether user has scrolled up
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    shouldAutoScroll.current = isNearBottom;
  }, []);

  // Auto-scroll to bottom when dependencies change
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAutoScroll.current) return;

    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Manual scroll to bottom function
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    shouldAutoScroll.current = true;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  return { containerRef, scrollToBottom };
}
