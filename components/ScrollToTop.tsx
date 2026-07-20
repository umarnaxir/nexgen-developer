"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";

/**
 * Always land at the top of a page on route change (navbar, sidebar, footer links).
 * Also clears leftover ScrollTrigger pin math that can leave you mid-page.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !("scrollRestoration" in history)) return;
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    registerGsapPlugins();

    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();

    const raf = window.requestAnimationFrame(() => {
      scrollTop();
      ScrollTrigger.refresh();
    });

    // After layout/images settle (previous page pin height can linger briefly)
    const t1 = window.setTimeout(() => {
      scrollTop();
      ScrollTrigger.refresh();
    }, 50);
    const t2 = window.setTimeout(scrollTop, 200);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
