"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import GalaxyBackground from "@/components/GalaxyBackground";

interface ServiceDetailHeroProps {
  heading: string;
  image?: string;
}

export default function ServiceDetailHero({ heading }: ServiceDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(gridRef.current, { opacity: 0, duration: 1.2 }).from(
        headlineRef.current?.querySelectorAll(".hero-line") ?? [],
        { y: 64, opacity: 0, duration: 0.95, stagger: 0.1 },
        "-=0.75"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 24;
      grid.style.transform = `translate(${x}px, ${y}px)`;
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <header
      ref={sectionRef}
      className="section-dark relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <GalaxyBackground />
      </div>

      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-700 ease-out will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      <div className="section-container relative z-10">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to services
        </Link>

        <div className="max-w-4xl">
          <h1
            ref={headlineRef}
            className="text-[clamp(2rem,8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white"
          >
            {heading.split(" ").length > 3 ? (
              <>
                <span className="hero-line block">
                  {heading.split(" ").slice(0, Math.ceil(heading.split(" ").length / 2)).join(" ")}
                </span>
                <span className="hero-line block text-white/90">
                  {heading.split(" ").slice(Math.ceil(heading.split(" ").length / 2)).join(" ")}
                </span>
              </>
            ) : (
              <span className="hero-line block">{heading}</span>
            )}
          </h1>
        </div>
      </div>
    </header>
  );
}
