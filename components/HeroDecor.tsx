"use client";

import { useEffect, useState } from "react";

const SILVER_DOTS =
  "radial-gradient(circle, rgba(214,214,218,0.95) 1.6px, transparent 1.6px)";

/**
 * Interactive decorative layer for page heroes.
 * - Silver dotted boxes in the top-right and bottom-left corners
 * - Animated ambient teal glows + a floating orb
 * - Subtle mouse-parallax: layers drift as the pointer moves
 *
 * Drop inside a `relative overflow-hidden` hero container.
 */
export default function HeroDecor() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setOffset({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-x-0 -top-20 h-[300px] bg-gold-dark/[0.18] blur-[120px] animate-glow-pulse" />
      <div className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-gold-dark/[0.14] blur-[110px]" />
      <div className="absolute -right-20 top-1/4 h-[260px] w-[260px] rounded-full bg-gold/[0.12] blur-[100px]" />

      {/* Floating orb (parallax) */}
      <div
        className="absolute right-1/4 top-1/3 h-28 w-28 rounded-full bg-gradient-to-br from-gold/40 to-gold-dark/10 blur-2xl transition-transform duration-300 ease-out"
        style={{ transform: `translate(${offset.x * 40}px, ${offset.y * 40}px)` }}
      />

      {/* Top-right silver dotted box (parallax) */}
      <div
        className="absolute right-4 top-4 h-28 w-28 opacity-80 transition-transform duration-300 ease-out sm:right-8 sm:top-8 sm:h-40 sm:w-40"
        style={{
          backgroundImage: SILVER_DOTS,
          backgroundSize: "18px 18px",
          transform: `translate(${offset.x * -26}px, ${offset.y * -26}px)`,
        }}
      />

      {/* Bottom-left silver dotted box (parallax) */}
      <div
        className="absolute bottom-4 left-4 h-24 w-24 opacity-75 transition-transform duration-300 ease-out sm:bottom-8 sm:left-8 sm:h-36 sm:w-36"
        style={{
          backgroundImage: SILVER_DOTS,
          backgroundSize: "18px 18px",
          transform: `translate(${offset.x * 26}px, ${offset.y * 26}px)`,
        }}
      />
    </div>
  );
}
