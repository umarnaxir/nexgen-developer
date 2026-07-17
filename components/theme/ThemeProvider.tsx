"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Centralized theme provider for the whole site.
 *
 * - `attribute="class"` toggles a `dark` / `light` class on <html>.
 * - Dark remains the DEFAULT theme so the existing experience is unchanged.
 * - Preference is persisted to localStorage by next-themes (key: "theme").
 * - `disableTransitionOnChange` is intentionally OFF — we want the smooth
 *   300–500ms cross-fade defined in globals.css when switching themes.
 */
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      themes={["dark"]}
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
