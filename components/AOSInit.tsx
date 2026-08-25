"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Global AOS — once:true, smooth ease.
 * Skipped on pin/GSAP-heavy sections by simply not adding data-aos there
 * (Selected Work pin, home Services pin, service-detail GSAP hero).
 */
export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 780,
      once: true,
      offset: 64,
      delay: 0,
      easing: "ease-out-cubic",
      mirror: false,
      anchorPlacement: "top-bottom",
      disable: () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    void document.fonts?.ready.then(() => AOS.refreshHard());
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      AOS.refreshHard();
    }, 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
