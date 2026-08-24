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
    if (!activeBook) return;

    const left =
      activeBook.offsetLeft - shelf.clientWidth / 2 + activeBook.clientWidth / 2;
    shelf.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeCategoryId]);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="section-light relative overflow-hidden section-y"
      aria-label="Technology stack"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold-dark/[0.08] blur-[130px]"
      />

      <div className="section-container relative z-10">
        <div
          ref={headerRef}
          className="mb-6 flex items-end justify-between gap-3 sm:mb-8 sm:gap-4"
        >
          <div className="min-w-0 max-w-3xl">
            <h2 className="text-[clamp(1.7rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-primary">
              Stack we ship with.
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-text-gray sm:whitespace-nowrap">
              {totalTechStackItems}+ tools across {techStackCategories.length} disciplines,
              browse the shelf or search anything.
            </p>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex sm:flex-row sm:items-center sm:gap-2.5">
            <span className="rounded-full border border-gold/25 bg-gold-dark/10 px-3 py-1.5 text-xs font-medium tabular-nums text-gold">
              {totalTechStackItems}+ skills
            </span>
            <span className="text-xs tabular-nums text-text-gray sm:text-sm">
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
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies, tools, or skills..."
            className="w-full rounded-2xl border border-gold/35 bg-gold/[0.08] py-3.5 pl-11 pr-11 text-sm text-primary outline-none transition-all placeholder:text-gold-dark focus:border-gold/40 focus:bg-gold/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gold-dark transition-colors hover:bg-gold/15 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div ref={shelfRef} className="relative mb-5 sm:mb-6">
          <div className="flex gap-2.5 overflow-x-auto px-0.5 pb-3 pt-4 [scrollbar-width:none] sm:gap-3 sm:pt-5 [&::-webkit-scrollbar]:hidden">
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
          <div aria-hidden className="h-2 rounded-full bg-gold/12" />
        </div>

        <div
          ref={stageRef}
          className="relative overflow-hidden rounded-[1.5rem] border border-gold/35 bg-background sm:rounded-[1.75rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-1 top-0 select-none text-[6.5rem] font-semibold leading-none text-gold/15 sm:text-[9rem] lg:text-[11rem]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="relative z-[1] flex flex-col gap-3 border-b border-gold/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <motion.span
                key={activeCategory.id}
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex items-center justify-center text-gold"
              >
                <ActiveIcon className="h-8 w-8 sm:h-9 sm:w-9" />
              </motion.span>
              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="truncate text-lg font-semibold tracking-[-0.02em] text-primary sm:text-2xl"
                  >
                    {query.trim() ? "Search results" : activeCategory.title}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <span className="w-fit rounded-full border border-gold/25 bg-gold-dark/10 px-3 py-1 text-xs font-medium tabular-nums text-gold">
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
                  className="flex min-h-[180px] items-center justify-center px-6 text-sm text-text-gray"
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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-text-gray transition-all hover:border-gold/40 hover:bg-gold-dark/15 hover:text-gold"
    >
      {children}
    </button>
  );
}

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

  return (
    <button
      type="button"
      data-category-id={category.id}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={category.title}
      title={category.title}
      className={`group relative flex h-[7.75rem] w-[5.5rem] shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border px-2 py-2.5 transition-all duration-300 sm:h-[9rem] sm:w-[6.25rem] sm:rounded-xl sm:px-2.5 sm:py-3 ${
        isActive
          ? "-translate-y-2 border-gold/50 bg-gold-dark/15 text-primary"
          : "border-gold/35 bg-gold/[0.08] text-primary hover:-translate-y-1.5 hover:border-gold/40 hover:bg-gold-dark/10"
      }`}
    >
      <span
        className={`text-[9px] font-semibold tabular-nums tracking-[0.12em] transition-colors ${
          isActive ? "text-gold/80" : "text-gold-dark group-hover:text-gold/70"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors sm:h-11 sm:w-11 ${
          isActive
            ? "bg-gold-dark/20 text-gold"
            : "bg-gold/15 text-text-gray group-hover:bg-gold-dark/20 group-hover:text-gold"
        }`}
      >
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </span>
      <span
        className={`w-full text-center text-[10px] font-semibold leading-tight tracking-tight transition-colors sm:text-[11px] ${
          isActive ? "text-primary" : "text-text-gray group-hover:text-gold-dark"
        }`}
      >
        {category.shortTitle}
      </span>
    </button>
  );
}

function SkillBook({ label, index }: { label: string; index: number }) {
  const brand = getTechBrandIcon(label);
  const [failed, setFailed] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.018, 0.35), duration: 0.28 }}
      className="group flex min-h-[88px] flex-col items-center justify-center gap-2.5 px-2 py-3 text-center sm:min-h-[100px] sm:px-2.5 sm:py-3.5"
    >
      <span className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {brand.type === "svg" && !failed ? (
          <svg
            role="img"
            viewBox="0 0 24 24"
            aria-hidden
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <path fill={`#${brand.icon.hex.replace(/^#/, "")}`} d={brand.icon.path} />
          </svg>
        ) : brand.type === "url" && !failed ? (
          brand.mono ? (
            <span
              aria-hidden
              className="h-8 w-8 sm:h-9 sm:w-9"
              style={{
                backgroundColor: `#${(brand.color ?? "000000").replace(/^#/, "")}`,
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
              width={36}
              height={36}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              unoptimized
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <span className="text-sm font-bold uppercase tracking-wide text-text-gray">
            {label.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="line-clamp-2 text-[11px] font-semibold leading-snug tracking-[-0.01em] text-text-gray sm:text-xs">
        {label}
      </span>
    </motion.li>
  );
}
