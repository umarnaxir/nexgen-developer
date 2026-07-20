"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { aboutPillars } from "../data";

/** Black section, vertical timeline. */
export default function AboutPillars() {
 const sectionRef = useRef<HTMLElement>(null);
 const headerRef = useRef<HTMLDivElement>(null);
 const listRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 registerGsapPlugins();

 const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if (prefersReducedMotion || !sectionRef.current) return;

 const ctx = gsap.context(() => {
 gsap.from(headerRef.current, {
 scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
 y: 24,
 opacity: 0,
 duration: 0.8,
 ease: "power3.out",
 immediateRender: false,
 });

 gsap.from(listRef.current?.children ?? [], {
 scrollTrigger: { trigger: listRef.current, start: "top 85%" },
 x: -20,
 opacity: 0,
 duration: 0.65,
 stagger: 0.1,
 ease: "power3.out",
 immediateRender: false,
 });
 }, sectionRef);

 return () => ctx.revert();
 }, []);

 return (
 <section
 ref={sectionRef}
 className="section-dark relative overflow-hidden section-y"
 >
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]"
 />
 <div
 aria-hidden
 className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-teal-500/[0.06] blur-[120px]"
 />

 <div className="section-container relative z-10">
 <div ref={headerRef} className="mb-6 max-w-xl lg:mb-7">
 <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
 <span className="h-px w-8 bg-white/30" />
 Why us
 </span>
 <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-white">
 Built for momentum.
 </h2>
 <p className="mt-3 text-[15px] leading-relaxed text-white/45">
 Four reasons teams stick with us, read them as a timeline, not a card grid.
 </p>
 </div>

 <div ref={listRef} className="relative">
 <div
 aria-hidden
 className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-teal-400/50 via-white/15 to-transparent sm:left-[1.4rem]"
 />

 <ul className="flex flex-col gap-3 sm:gap-4">
 {aboutPillars.map((pillar) => {
 const Icon = pillar.icon;
 return (
 <li key={pillar.number}>
 <motion.div
 whileHover={{ x: 6 }}
 transition={{ type: "spring", stiffness: 400, damping: 30 }}
 className="group relative grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-transparent py-3 pl-0 pr-2 transition-colors hover:border-white/[0.08] hover:bg-white/[0.03] sm:gap-6 sm:py-4 sm:pr-4"
 >
 <div className="relative z-10 flex flex-col items-center">
 <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-500/40 bg-black text-[11px] font-semibold tabular-nums text-teal-300 sm:h-11 sm:w-11 sm:text-xs">
 {pillar.number}
 </span>
 </div>

 <div className="min-w-0 pb-1">
 <div className="flex flex-wrap items-center gap-3">
 <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors group-hover:border-teal-500/30 group-hover:text-teal-300">
 <Icon className="h-4 w-4" />
 </span>
 <h3 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
 {pillar.title}
 </h3>
 </div>
 <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
 {pillar.description}
 </p>
 </div>
 </motion.div>
 </li>
 );
 })}
 </ul>
 </div>
 </div>
 </section>
 );
}
