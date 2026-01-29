"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls window to top on every route change (navbar, footer, or any Link).
 * Works on both desktop and mobile.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
