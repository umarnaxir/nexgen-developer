"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark section-padding relative"
    >
      <div ref={contentRef} className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-white/[0.08] lg:max-w-none">
            <Image
              src="/images/projects/code2concept.png"
              alt="NexGen Developers team at work"
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              About
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              A studio obsessed with craft.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg">
              We partner with ambitious teams to design and ship digital products that feel
              intentional, refined, and built to last.
            </p>
            <div className="mt-10">
              <MagneticButton href="/about">Learn more</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
