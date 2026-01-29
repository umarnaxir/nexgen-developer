"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const SENTINEL_ID = "back-to-top-sentinel";
const LAYOUT_ROOT_ID = "layout-root";

function getScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const { scrollY } = window;
  const { scrollHeight, clientHeight } = document.documentElement;
  const maxScroll = Math.max(0, scrollHeight - clientHeight);
  if (maxScroll <= 0) return 0;
  return Math.min(100, (scrollY / maxScroll) * 100);
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const updateProgress = useCallback(() => setScrollProgress(getScrollProgress()), []);

  useEffect(() => {
    const root = document.getElementById(LAYOUT_ROOT_ID) ?? document.body;
    let sentinel = document.getElementById(SENTINEL_ID) as HTMLDivElement | null;

    if (!sentinel) {
      sentinel = document.createElement("div");
      sentinel.id = SENTINEL_ID;
      sentinel.setAttribute("aria-hidden", "true");
      sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:10px;pointer-events:none;";
      root.prepend(sentinel);
      sentinelRef.current = sentinel;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        setVisible(!e.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    observerRef.current.observe(sentinel);

    const onScroll = () => {
      updateProgress();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observerRef.current?.disconnect();
      observerRef.current = null;
      const el = document.getElementById(SENTINEL_ID);
      if (el && el.parentNode) el.parentNode.removeChild(el);
      sentinelRef.current = null;
    };
  }, [updateProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!visible) return null;

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-black bg-white text-black shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      {/* Circular progress ring */}
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${(scrollProgress / 100) * 97.4} 97.4`}
            className="text-black transition-all duration-150"
          />
        </svg>
      </span>
      {/* Arrow icon */}
      <span className="relative flex items-center justify-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
      {/* Scroll % label */}
      <span className="relative text-[10px] font-medium tabular-nums text-black">
        {Math.round(scrollProgress)}%
      </span>
    </button>,
    document.body
  );
}
