"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { aboutApproach, aboutApproachMetrics } from "../data";

/**
 * Dark interactive process stage, unique from timeline / carousel / type-wall.
 * Metrics live here (no separate “By the numbers” block).
 */
export default function AboutApproach() {
 const [active, setActive] = useState(0);
 const sectionRef = useRef<HTMLElement>(null);
 const headerRef = useRef<HTMLDivElement>(null);

 const current = aboutApproach[active] ?? aboutApproach[0];
 const total = aboutApproach.length;

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
 }, sectionRef);

 return () => ctx.revert();
 }, []);

 const go = (dir: -1 | 1) => {
 setActive((prev) => (prev + dir + total) % total);
 };

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
 className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal-500/[0.08] blur-[130px]"
 />

 <div className="section-container relative z-10">
 <div
 ref={headerRef}
 className="mb-6 flex flex-col gap-4 sm:mb-7 lg:flex-row lg:items-end lg:justify-between"
 >
 <div className="max-w-xl">
 <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50">
 <span className="h-px w-8 bg-white/30" />
 Approach
 </span>
 <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-white">
 How a project moves.
 </h2>
 <p className="mt-3 text-[15px] leading-relaxed text-white/45">
 Four stages from first conversation to growth, step through them.
 </p>
 </div>

 <div className="flex items-center gap-3">
 <span className="text-sm tabular-nums text-white/40">
 {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
 </span>
 <button
 type="button"
 aria-label="Previous step"
 onClick={() => go(-1)}
 className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-teal-400/40 hover:text-teal-300"
 >
 <ArrowLeft className="h-4 w-4" />
 </button>
 <button
 type="button"
 aria-label="Next step"
 onClick={() => go(1)}
 className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-teal-400/40 hover:text-teal-300"
 >
 <ArrowRight className="h-4 w-4" />
 </button>
 </div>
 </div>

 {/* Step rail */}
 <div className="mb-5 grid grid-cols-2 gap-2 sm:mb-6 sm:grid-cols-4 sm:gap-3">
 {aboutApproach.map((item, index) => {
 const isActive = index === active;
 return (
 <button
 key={item.step}
 type="button"
 onClick={() => setActive(index)}
 onMouseEnter={() => setActive(index)}
 className={`relative overflow-hidden rounded-xl border px-3 py-3 text-left transition-all sm:px-4 sm:py-4 ${
 isActive
 ? "border-teal-400/40 bg-teal-500/[0.12]"
 : "border-white/[0.08] bg-white/[0.03] hover:border-white/15"
 }`}
 >
 <span
 className={`text-[10px] font-semibold tabular-nums tracking-[0.22em] ${
 isActive ? "text-teal-300" : "text-white/30"
 }`}
 >
 {item.step}
 </span>
 <span
 className={`mt-1 block text-sm font-semibold tracking-[-0.02em] sm:text-base ${
 isActive ? "text-white" : "text-white/50"
 }`}
 >
 {item.title}
 </span>
 {isActive ? (
 <motion.span
 layoutId="approach-rail"
 className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-400"
 />
 ) : null}
 </button>
 );
 })}
 </div>

 {/* Stage */}
 <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:min-h-[280px] sm:p-8 lg:p-10">
 <div
 aria-hidden
 className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-400/15 blur-3xl"
 />

 <AnimatePresence mode="wait">
 {current ? (
 <motion.div
 key={current.step}
 initial={{ opacity: 0, y: 18 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -14 }}
 transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
 className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14"
 >
 <span className="text-[clamp(4.5rem,12vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.08]">
 {current.step}
 </span>
 <div>
 <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
 {current.title}
 </h3>
 <p className="mt-3 max-w-xl text-base leading-relaxed text-teal-300/90 sm:text-lg">
 {current.text}
 </p>
 <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/45">
 {current.detail}
 </p>
 </div>
 </motion.div>
 ) : null}
 </AnimatePresence>
 </div>

 {/* Integrated metrics, part of Approach, not a separate section */}
 <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-8 sm:mt-10 sm:grid-cols-4 sm:gap-4 lg:pt-10">
 {aboutApproachMetrics.map((metric) => (
 <div
 key={metric.label}
 className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 transition-colors hover:border-teal-500/25 hover:bg-white/[0.05] sm:px-5"
 >
 <p className="text-2xl font-semibold tabular-nums tracking-[-0.03em] text-white sm:text-3xl">
 {metric.value}
 </p>
 <p className="mt-1 text-[12px] text-white/40 sm:text-[13px]">{metric.label}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
