"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Light-first theme for the public site.
 * Dark surfaces are applied per-section (footer, CTAs, feature blocks).
 */
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      themes={["light"]}
      storageKey="theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
