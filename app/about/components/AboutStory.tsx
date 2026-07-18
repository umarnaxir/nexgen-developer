"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { aboutStory } from "../data";

/** All descriptive copy, white section, balanced left / right columns. */
export default function AboutStory() {
 const [activeHighlight, setActiveHighlight] = useState(0);
 const sectionRef = useRef<HTMLElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 registerGsapPlugins();

 const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if (prefersReducedMotion || !sectionRef.current) return;

 const ctx = gsap.context(() => {
 gsap.from(contentRef.current?.children ?? [], {
 scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
 y: 32,
 opacity: 0,
 duration: 0.85,
 stagger: 0.1,
 ease: "power3.out",
 immediateRender: false,
 });
 }, sectionRef);

 return () => ctx.revert();
 }, []);

 const highlight = aboutStory.highlights[activeHighlight] ?? aboutStory.highlights[0];

 return (
 <section
 ref={sectionRef}
 className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
 >
 <div
 aria-hidden
 className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-teal-500/[0.06] blur-[100px]"
 />

 <div className="section-container relative z-10">
 <div
 ref={contentRef}
 className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
 >
 {/* Left, narrative */}
 <div>
 <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
 <span className="h-px w-8 bg-black/20" />
 {aboutStory.eyebrow}
 </span>

 <h2 className="mt-5 text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-black">
 {aboutStory.headline}
 </h2>

 <p className="mt-6 text-base leading-relaxed text-black/55 sm:text-lg">
 {aboutStory.lead}
 </p>

 <div className="mt-8 space-y-4 border-l border-black/[0.08] pl-5 sm:pl-6">
 {aboutStory.paragraphs.map((paragraph) => (
 <p
 key={paragraph.slice(0, 28)}
 className="text-[15px] leading-[1.85] text-black/50 sm:text-base"
 >
 {paragraph}
 </p>
 ))}
 </div>

 <div className="mt-10 flex flex-wrap gap-5">
 <Link
 href="/team"
 className="group inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors hover:text-teal-600"
 >
 Meet the team
 <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
 </Link>
 <Link
 href="/services"
 className="group inline-flex items-center gap-1.5 text-sm font-semibold text-black/45 transition-colors hover:text-black"
 >
 View services
 <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
 </Link>
 </div>
 </div>

 {/* Right, interactive panel (balanced weight) */}
 <aside className="flex flex-col gap-5 lg:gap-6">
 <motion.blockquote
 initial={{ opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="rounded-2xl border border-black/[0.06] bg-neutral-50 p-6 sm:p-7"
 >
 <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-teal-700/80">
 Manifesto
 </p>
 <p className="mt-3 text-lg font-medium leading-snug tracking-[-0.02em] text-black sm:text-xl">
 “{aboutStory.quote}”
 </p>
 </motion.blockquote>

 <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_56px_-40px_rgba(0,0,0,0.12)] sm:p-6">
 <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-black/40">
 What we stand for
 </p>
 <ul className="mt-4 flex flex-col gap-2">
 {aboutStory.highlights.map((item, index) => {
 const isActive = index === activeHighlight;
 return (
 <li key={item.title}>
 <button
 type="button"
 onClick={() => setActiveHighlight(index)}
 onMouseEnter={() => setActiveHighlight(index)}
 className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
 isActive
 ? "border-teal-500/30 bg-teal-500/[0.08]"
 : "border-transparent bg-neutral-50 hover:border-black/[0.06]"
 }`}
 >
 <span
 className={`text-sm font-semibold ${
 isActive ? "text-black" : "text-black/55"
 }`}
 >
 {item.title}
 </span>
 <span
 className={`text-[10px] font-semibold tabular-nums tracking-[0.2em] ${
 isActive ? "text-teal-700" : "text-black/25"
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
 {highlight ? (
 <motion.p
 key={highlight.title}
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -6 }}
 transition={{ duration: 0.25 }}
 className="mt-4 border-t border-black/[0.06] pt-4 text-[14px] leading-relaxed text-black/55 sm:text-[15px]"
 >
 {highlight.text}
 </motion.p>
 ) : null}
 </AnimatePresence>
 </div>

 <dl className="grid grid-cols-2 gap-3 sm:gap-4">
 {aboutStory.meta.map((item) => (
 <div
 key={item.label}
 className="rounded-xl border border-black/[0.06] bg-white px-4 py-3.5 transition-colors hover:border-teal-500/25"
 >
 <dt className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/35">
 {item.label}
 </dt>
 <dd className="mt-1.5 text-sm font-medium text-black">{item.value}</dd>
 </div>
 ))}
 </dl>
 </aside>
 </div>
 </div>
 </section>
 );
}
