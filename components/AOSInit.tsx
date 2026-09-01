"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Load AOS after idle so it is not in the main JS payload Googlebot downloads.
 */
export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const load = async () => {
      const [{ default: AOS }] = await Promise.all([
        import("aos"),
        import("aos/dist/aos.css"),
      ]);
      if (cancelled) return;
      AOS.init({
        duration: 780,
        once: true,
        offset: 64,
        delay: 0,
        easing: "ease-out-cubic",
        mirror: false,
        anchorPlacement: "top-bottom",
      });
      void document.fonts?.ready.then(() => {
        if (!cancelled) AOS.refreshHard();
      });
    };

    const w = window;
    const idleId =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(() => void load(), { timeout: 2500 })
        : w.setTimeout(() => void load(), 1);

    return () => {
      cancelled = true;
      if (typeof w.requestIdleCallback === "function") {
        w.cancelIdleCallback(idleId as number);
      } else {
        w.clearTimeout(idleId as number);
      }
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void import("aos").then(({ default: AOS }) => AOS.refreshHard());
    }, 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
