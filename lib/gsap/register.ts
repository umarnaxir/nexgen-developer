"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // Avoid mobile URL-bar resize thrash that recalculates pinned sections
  // mid-gesture and feels like the page is scrolling on its own.
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  // One refresh after full load so pin end distances match final layout (images/fonts).
  const refreshAfterLoad = () => ScrollTrigger.refresh();
  if (document.readyState === "complete") {
    requestAnimationFrame(refreshAfterLoad);
  } else {
    window.addEventListener("load", refreshAfterLoad, { once: true });
  }

  registered = true;
}

export { gsap, ScrollTrigger };
