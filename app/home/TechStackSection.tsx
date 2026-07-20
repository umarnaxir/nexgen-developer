"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import Image from "next/image";
import {
  techStackCategories,
  totalTechStackItems,
  type TechStackCategory,
} from "./tech-stack-data";
import { getTechBrandIcon } from "./tech-brand-icons";

const BOOK_TONES = [
  "from-teal-700 to-teal-500",
  "from-emerald-800 to-teal-600",
  "from-cyan-800 to-teal-500",
  "from-slate-800 to-teal-700",
  "from-teal-900 to-emerald-600",
  "from-stone-800 to-teal-600",
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(techStackCategories[0].id);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return techStackCategories;
    return techStackCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === activeCategoryId)
  );
  const activeCategory = categories[activeIndex] ?? categories[0] ?? techStackCategories[0];
  const ActiveIcon = activeCategory.icon;

  const goToCategory = useCallback(
    (index: number) => {
      const category = categories[index];
      if (!category) return;
      setActiveCategoryId(category.id);
    },
    [categories]
  );

  const goNext = useCallback(() => {
    if (categories.length === 0) return;
    goToCategory((activeIndex + 1) % categories.length);
  }, [activeIndex, categories.length, goToCategory]);

  const goPrev = useCallback(() => {
    if (categories.length === 0) return;
    goToCategory((activeIndex - 1 + categories.length) % categories.length);
  }, [activeIndex, categories.length, goToCategory]);

  useEffect(() => {
    if (query.trim() && categories.length > 0) {
      const stillVisible = categories.some((c) => c.id === activeCategoryId);
      if (!stillVisible) setActiveCategoryId(categories[0].id);
    }
  }, [query, categories, activeCategoryId]);

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
      gsap.from(stageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.05,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const activeBook = shelf.querySelector<HTMLElement>(
      `[data-category-id="${activeCategoryId}"]`
    );
    activeBook?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCategoryId]);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="section-light relative overflow-hidden bg-white text-black section-y"
      aria-label="Technology stack"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(20,184,166,0.13),transparent_40%),radial-gradient(ellipse_at_90%_100%,rgba(13,148,136,0.08),transparent_42%)]"
      />

      <div className="section-container relative z-10">
        <div
          ref={headerRef}
          className="mb-6 flex items-end justify-between gap-3 sm:mb-8 sm:gap-4"
        >
          <div className="min-w-0 max-w-xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-teal-700/55">
              <span className="h-px w-8 bg-teal-500/50" />
              Technology
            </span>
            <h2 className="mt-3 text-[clamp(1.7rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              Stack we ship with.
            </h2>
            <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-black/45">
              {totalTechStackItems}+ tools across {techStackCategories.length} disciplines —
              browse the shelf or search anything.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <span className="hidden rounded-full border border-teal-500/20 bg-teal-50 px-3 py-1.5 text-xs font-medium tabular-nums text-teal-800 sm:inline-flex">
              {totalTechStackItems}+ skills
            </span>
            <span className="text-xs tabular-nums text-black/35 sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(Math.max(categories.length, 1)).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <NavButton label="Previous category" onClick={goPrev}>
                <ArrowLeft className="h-4 w-4" />
              </NavButton>
              <NavButton label="Next category" onClick={goNext}>
                <ArrowRight className="h-4 w-4" />
              </NavButton>
            </div>
          </div>
        </div>

        <label className="relative mb-5 block sm:mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-700/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies, tools, or skills..."
            className="w-full rounded-2xl border border-teal-900/[0.08] bg-white/95 py-3.5 pl-11 pr-11 text-sm text-black shadow-[0_12px_40px_-28px_rgba(13,148,136,0.35)] outline-none transition-all placeholder:text-black/35 focus:border-teal-500/40 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-black/35 transition-colors hover:bg-teal-50 hover:text-teal-800"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        {/* Icon bookshelf — categories */}
        <div ref={shelfRef} className="relative mb-5 sm:mb-6">
          <div className="flex gap-2.5 overflow-x-auto px-0.5 pb-3 pt-1 [scrollbar-width:none] sm:gap-3 [&::-webkit-scrollbar]:hidden">
            {categories.map((category, index) => (
              <CategoryBook
                key={category.id}
                category={category}
                index={index}
                isActive={category.id === activeCategoryId}
                onClick={() => goToCategory(index)}
              />
            ))}
          </div>
          <div
            aria-hidden
            className="h-2 rounded-full bg-gradient-to-b from-teal-900/10 to-teal-900/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
          />
        </div>

        {/* Open book — skill tags with icons */}
        <div
          ref={stageRef}
          className="relative overflow-hidden rounded-[1.5rem] border border-teal-900/[0.07] bg-white/90 shadow-[0_28px_70px_-42px_rgba(13,148,136,0.32)] sm:rounded-[1.75rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-1 top-0 select-none text-[6.5rem] font-semibold leading-none text-teal-600/[0.05] sm:text-[9rem] lg:text-[11rem]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="relative z-[1] flex flex-col gap-3 border-b border-teal-900/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <motion.span
                key={activeCategory.id}
                initial={{ scale: 0.86, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-500/25 bg-teal-500/10 text-teal-700 sm:h-12 sm:w-12"
              >
                <ActiveIcon className="h-5 w-5" />
              </motion.span>
              <div className="min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal-700/45">
                  {query.trim() ? "Search results" : "Active category"}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-0.5 truncate text-lg font-semibold tracking-[-0.02em] text-black sm:text-2xl"
                  >
                    {activeCategory.title}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <span className="w-fit rounded-full border border-teal-500/20 bg-teal-50 px-3 py-1 text-xs font-medium tabular-nums text-teal-800">
              {activeCategory.items.length} skills
            </span>
          </div>

          <div className="relative z-[1] max-h-[min(58vh,520px)] overflow-y-auto p-3 sm:max-h-[min(52vh,480px)] sm:p-5 lg:p-6">
            <AnimatePresence mode="wait">
              {activeCategory.items.length > 0 ? (
                <motion.ul
                  key={`${activeCategory.id}-${query}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                >
                  {activeCategory.items.map((item, index) => (
                    <SkillBook key={`${item}-${index}`} label={item} index={index} />
                  ))}
                </motion.ul>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[180px] items-center justify-center px-6 text-sm text-black/40"
                >
                  No matches. Try another keyword or clear search.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/50 transition-all hover:border-teal-500/40 hover:bg-teal-50 hover:text-teal-800"
    >
      {children}
    </button>
  );
}

/** Category as an icon-forward book on the shelf */
function CategoryBook({
  category,
  index,
  isActive,
  onClick,
}: {
  category: TechStackCategory;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = category.icon;
  const tone = BOOK_TONES[index % BOOK_TONES.length];

  return (
    <button
      type="button"
      data-category-id={category.id}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={category.title}
      title={category.title}
      className={`group relative flex h-[7.25rem] w-[3.35rem] shrink-0 flex-col items-center justify-between overflow-hidden rounded-md border px-1.5 py-2.5 transition-all duration-300 sm:h-[8.5rem] sm:w-16 sm:rounded-lg ${
        isActive
          ? `-translate-y-2 border-teal-400/50 bg-gradient-to-b ${tone} text-white shadow-[0_18px_36px_-16px_rgba(13,148,136,0.65)]`
          : "border-teal-900/10 bg-gradient-to-b from-white to-teal-50/80 text-teal-800 shadow-[0_8px_20px_-14px_rgba(0,0,0,0.25)] hover:-translate-y-1.5 hover:border-teal-500/30 hover:shadow-[0_14px_28px_-16px_rgba(13,148,136,0.35)]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-[3px] ${
          isActive ? "bg-white/25" : "bg-teal-900/10"
        }`}
      />
      <span
        className={`text-[9px] font-semibold tabular-nums tracking-[0.12em] ${
          isActive ? "text-white/60" : "text-teal-700/40"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
          isActive ? "bg-white/15 text-white" : "bg-teal-500/10 text-teal-700"
        }`}
      >
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </span>
      <span
        className={`w-full truncate text-center text-[9px] font-semibold leading-tight tracking-tight sm:text-[10px] ${
          isActive ? "text-white/90" : "text-black/55"
        }`}
      >
        {category.shortTitle}
      </span>
    </button>
  );
}

/** Skill as a compact icon book + real brand SVG */
function SkillBook({ label, index }: { label: string; index: number }) {
  const brand = getTechBrandIcon(label);
  const [failed, setFailed] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.018, 0.35), duration: 0.28 }}
      className="group relative flex min-h-[88px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-teal-900/[0.06] bg-white px-2 py-3 text-center shadow-[0_10px_28px_-22px_rgba(0,0,0,0.28)] transition-all hover:-translate-y-0.5 hover:border-teal-500/30 hover:bg-teal-50/40 hover:shadow-[0_16px_32px_-20px_rgba(13,148,136,0.28)] sm:min-h-[100px] sm:px-2.5 sm:py-3.5"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-teal-500/40 to-teal-500/5 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
        {brand.type === "svg" && !failed ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            aria-hidden
            className="h-[18px] w-[18px] sm:h-5 sm:w-5"
          >
            <path fill={`#${brand.icon.hex}`} d={brand.icon.path} />
          </svg>
        ) : brand.type === "url" && !failed ? (
          brand.mono && brand.color ? (
            <span
              aria-hidden
              className="h-[18px] w-[18px] sm:h-5 sm:w-5"
              style={{
                backgroundColor: brand.color,
                WebkitMaskImage: `url(${brand.src})`,
                maskImage: `url(${brand.src})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          ) : (
            <Image
              src={brand.src}
              alt=""
              width={22}
              height={22}
              className="h-[18px] w-[18px] object-contain sm:h-5 sm:w-5"
              unoptimized
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wide text-teal-700/50">
            {label.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="line-clamp-2 text-[11px] font-semibold leading-snug tracking-[-0.01em] text-black/75 sm:text-xs">
        {label}
      </span>
    </motion.li>
  );
}
