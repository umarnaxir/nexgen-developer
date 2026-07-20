"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { aboutValues } from "../data";

function ghostSize(title: string) {
 // Longer labels (e.g. Collaboration) stay inside the viewport
 if (title.length >= 12) return "text-[clamp(2.75rem,10vw,7rem)]";
 if (title.length >= 9) return "text-[clamp(3rem,11vw,8rem)]";
 return "text-[clamp(3.25rem,12vw,9rem)]";
}

function labelSize(title: string) {
 if (title.length >= 12) return "text-[clamp(1.45rem,3.4vw,2.15rem)]";
 return "text-[clamp(1.6rem,3.8vw,2.5rem)]";
}

/** White section, type wall with contained sizing. */
export default function AboutValues() {
 const [active, setActive] = useState(0);
 const sectionRef = useRef<HTMLElement>(null);
 const headerRef = useRef<HTMLDivElement>(null);

 const current = aboutValues[active] ?? aboutValues[0];

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

 return (
 <section
 ref={sectionRef}
 className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
 >
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-4"
 >
 <AnimatePresence mode="wait">
 <motion.span
 key={current?.title}
 initial={{ opacity: 0, scale: 0.96, y: 20 }}
 animate={{ opacity: 0.07, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 1.02, y: -12 }}
 transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
 className={`max-w-[min(100%,92vw)] select-none truncate text-center font-semibold uppercase leading-none tracking-[-0.05em] text-black ${ghostSize(current?.title ?? "")}`}
 >
 {current?.title}
 </motion.span>
 </AnimatePresence>
 </div>

 <div className="section-container relative z-10">
 <div ref={headerRef} className="mb-6 max-w-xl sm:mb-8">
 <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
 <span className="h-px w-8 bg-black/20" />
 Values
 </span>
 <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
 How we decide.
 </h2>
 <p className="mt-3 text-[15px] leading-relaxed text-black/50">
 Tap a principle, the page answers in type.
 </p>
 </div>

 <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-12">
 <ul className="flex flex-col">
 {aboutValues.map((value, index) => {
 const isActive = index === active;
 return (
 <li key={value.title} className="border-t border-black/[0.08] last:border-b">
 <button
 type="button"
 onClick={() => setActive(index)}
 onMouseEnter={() => setActive(index)}
 className="flex w-full min-w-0 items-baseline justify-between gap-3 py-5 text-left transition-colors sm:gap-4 sm:py-6"
 >
 <span
 className={`min-w-0 font-semibold tracking-[-0.035em] transition-colors ${labelSize(value.title)} ${
 isActive ? "text-teal-700" : "text-black/30 hover:text-black/55"
 }`}
 >
 {value.title}
 </span>
 <span
 className={`shrink-0 text-[11px] font-semibold tabular-nums tracking-[0.2em] ${
 isActive ? "text-teal-600" : "text-black/20"
 }`}
 >
 {String(index + 1).padStart(2, "0")}
 </span>
 </button>
 </li>
 );
 })}
 </ul>

 <AnimatePresence mode="wait">
 {current ? (
 <motion.p
 key={current.title}
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -8 }}
 transition={{ duration: 0.3 }}
 className="max-w-md text-base leading-relaxed text-black/55 sm:text-lg lg:justify-self-end lg:text-right"
 >
 {current.description}
 </motion.p>
 ) : null}
 </AnimatePresence>
 </div>
 </div>
 </section>
 );
}
