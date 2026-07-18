"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

export default function ServicesHero() {
 const sectionRef = useRef<HTMLElement>(null);
 const headlineRef = useRef<HTMLHeadingElement>(null);
 const sublineRef = useRef<HTMLParagraphElement>(null);
 const gridRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 registerGsapPlugins();

 const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if (prefersReducedMotion) return;

 const ctx = gsap.context(() => {
 const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

 tl.from(gridRef.current, { opacity: 0, duration: 1.2 })
 .from(
 headlineRef.current?.querySelectorAll(".hero-line") ?? [],
 { y: 80, opacity: 0, duration: 1, stagger: 0.12 },
 "-=0.8"
 )
 .from(sublineRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");
 }, sectionRef);

 return () => ctx.revert();
 }, []);

 useEffect(() => {
 const section = sectionRef.current;
 const grid = gridRef.current;
 if (!section || !grid) return;

 const handleMove = (event: MouseEvent) => {
 const rect = section.getBoundingClientRect();
 const x = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
 const y = ((event.clientY - rect.top) / rect.height - 0.5) * 30;
 grid.style.transform = `translate(${x}px, ${y}px)`;
 };

 section.addEventListener("mousemove", handleMove);
 return () => section.removeEventListener("mousemove", handleMove);
 }, []);

 return (
 <header
 ref={sectionRef}
 className="section-dark relative flex min-h-[72svh] flex-col justify-center overflow-hidden pb-14 pt-[calc(var(--mobile-nav-height)+2rem)] sm:min-h-[68vh] sm:pb-16 sm:pt-28 lg:min-h-[75vh] lg:pb-20 lg:pt-36"
 >
 <div
 ref={gridRef}
 aria-hidden
 className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
 >
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]" />
 <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
 <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[100px]" />
 <motion.div
 className="absolute left-1/2 top-1/2 h-[1px] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
 animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
 />
 </div>

 <div className="section-container relative z-10">
 <div className="max-w-4xl">
 <motion.span
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.2, duration: 0.6 }}
 className="mb-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50"
 >
 <span className="h-px w-8 bg-white/30" />
 Services
 </motion.span>

 <h1
 id="services-heading"
 ref={headlineRef}
 className="text-[clamp(2.25rem,9vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
 >
 <span className="hero-line block">Everything you need</span>
 <span className="hero-line block text-white/90">to launch and scale.</span>
 </h1>

 <p
 ref={sublineRef}
 className="mt-8 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
 >
 Development, marketing, and support, built with clarity, speed, and long-term
 performance in mind.
 </p>
 </div>
 </div>
 </header>
 );
}
