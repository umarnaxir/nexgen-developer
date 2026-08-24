"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Light/Dark theme toggle button.
 *
 * Styled to feel native in both the dark glass navbar and the light navbar.
 * Renders a stable placeholder before mount to avoid hydration mismatch.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const base =
    "group relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 active:scale-95 " +
    "border-white/15 bg-white/[0.04] text-white hover:border-gold/60 hover:bg-white/[0.07] " +
    "light:border-gray-200 light:bg-white light:text-gray-700 light:hover:border-gold-dark light:hover:text-gold-dark light:shadow-sm";

  if (!mounted) {
    // Placeholder keeps layout stable and avoids a hydration flash.
    return (
      <span
        aria-hidden
        className={`${base} ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${base} ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
