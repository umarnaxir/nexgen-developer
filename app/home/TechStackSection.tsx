"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, Sparkles, X } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import {
  techStackCategories,
  totalTechStackItems,
  type TechStackCategory,
} from "./tech-stack-data";

function SkillChip({
  label,
  index,
  isSelected,
  onSelect,
}: {
  label: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 260, damping: 20 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    x.set(localX - rect.width / 2);
    y.set(localY - rect.height / 2);
    el.style.setProperty("--mx", `${localX}px`);
    el.style.setProperty("--my", `${localY}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      onClick={onSelect}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ delay: Math.min(index * 0.02, 0.32), duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-2xl border px-3.5 py-3 text-left transition-shadow sm:px-4 sm:py-3.5 ${
        isSelected
          ? "border-teal-500/50 bg-teal-600 text-white shadow-[0_18px_40px_-20px_rgba(13,148,136,0.55)]"
          : "border-teal-900/[0.06] bg-white text-black/75 shadow-[0_10px_28px_-22px_rgba(0,0,0,0.25)] hover:border-teal-500/35 hover:text-black hover:shadow-[0_16px_36px_-20px_rgba(13,148,136,0.28)]"
      }`}
    >
      {!isSelected && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(20,184,166,0.12), transparent 70%)",
          }}
        />
      )}
      <span className="relative flex items-center gap-2.5">
        <span
          className={`text-[10px] font-semibold tabular-nums tracking-[0.14em] ${
            isSelected ? "text-teal-100/80" : "text-teal-700/35 group-hover:text-teal-700/55"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[13px] font-semibold tracking-[-0.01em] sm:text-sm">{label}</span>
      </span>
    </motion.button>
  );
}

function CategoryOrb({
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
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      data-category-id={category.id}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-3 py-2.5 transition-all sm:px-3.5 ${
        isActive
          ? "border-teal-500/40 bg-teal-600 text-white shadow-[0_14px_32px_-18px_rgba(13,148,136,0.55)]"
          : "border-teal-900/[0.06] bg-white/80 text-black/55 backdrop-blur-sm hover:border-teal-500/25 hover:bg-white hover:text-black"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
          isActive
            ? "bg-white/15 text-white"
            : "bg-teal-500/10 text-teal-700 group-hover:bg-teal-500/15"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="hidden text-left sm:block">
        <span
          className={`block text-[10px] tabular-nums tracking-[0.12em] ${
            isActive ? "text-white/55" : "text-black/30"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="block max-w-[130px] truncate text-[13px] font-semibold leading-tight tracking-[-0.01em]">
          {category.title}
        </span>
      </span>
      <span className="text-[12px] font-semibold tabular-nums sm:hidden">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.button>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(techStackCategories[0].id);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  const categories = query.trim()
    ? techStackCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) =>
            item.toLowerCase().includes(query.trim().toLowerCase())
          ),
        }))
        .filter((category) => category.items.length > 0)
    : techStackCategories;

  const activeIndex = useMemo(
    () => Math.max(0, categories.findIndex((category) => category.id === activeCategoryId)),
    [categories, activeCategoryId]
  );

  const activeCategory = categories[activeIndex] ?? categories[0] ?? techStackCategories[0];
  const visibleItems = activeCategory?.items ?? [];
  const ActiveIcon = activeCategory.icon;

  const goToCategory = useCallback(
    (index: number) => {
      const category = categories[index];
      if (!category) return;
      setActiveCategoryId(category.id);
      setSelectedSkill(null);
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
      const stillVisible = categories.some((category) => category.id === activeCategoryId);
      if (!stillVisible) setActiveCategoryId(categories[0].id);
    }
  }, [query, categories, activeCategoryId]);

  // Auto-advance categories when idle (paused on hover / search / selection)
  useEffect(() => {
    if (isPaused || query.trim() || selectedSkill || categories.length <= 1) return;
    const timer = window.setInterval(goNext, 4800);
    return () => window.clearInterval(timer);
  }, [isPaused, query, selectedSkill, categories.length, goNext]);

  useEffect(() => {
    registerGsapPlugins();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        immediateRender: false,
      });

      gsap.from(stageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 36,
        opacity: 0,
        duration: 0.95,
        delay: 0.08,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const activeTab = rail.querySelector<HTMLElement>(`[data-category-id="${activeCategoryId}"]`);
    activeTab?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCategoryId]);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;
    const rect = section.getBoundingClientRect();
    glow.style.opacity = "1";
    glow.style.transform = `translate(${event.clientX - rect.left - 200}px, ${event.clientY - rect.top - 200}px)`;
  };

  const handlePointerLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onMouseEnter={() => setIsPaused(false)}
      className="section-light relative min-h-[100svh] overflow-hidden bg-white text-black section-y lg:min-h-[95vh]"
      aria-label="Technology stack and expertise"
    >
      {/* White + teal atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(20,184,166,0.14),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(13,148,136,0.1),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(45,212,191,0.08),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(13,148,136,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(13,148,136,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
      />
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-teal-400/20 opacity-0 blur-3xl transition-opacity duration-500"
      />

      <div className="section-container relative z-10 flex min-h-[calc(100svh-4rem)] flex-col lg:min-h-[calc(95vh-4rem)]">
        <div
          ref={headerRef}
          className="mb-5 flex shrink-0 flex-col gap-5 lg:mb-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-teal-700/55">
              <span className="h-px w-8 bg-teal-500/50" />
              Technology
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.85rem)] font-semibold tracking-[-0.03em] text-black">
              Stack we ship with.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/45">
              Explore {totalTechStackItems}+ tools across {techStackCategories.length} disciplines.
              Hover skills, search anything, or let categories auto-play.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5 text-xs font-medium tabular-nums text-teal-800">
              <Sparkles className="h-3 w-3 text-teal-600" />
              {totalTechStackItems}+ skills
            </span>
            <span className="text-sm tabular-nums text-black/35">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(Math.max(categories.length, 1)).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous category"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-900/10 bg-white text-black/50 shadow-sm transition-all hover:border-teal-500/35 hover:bg-teal-50 hover:text-teal-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next category"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-900/10 bg-white text-black/50 shadow-sm transition-all hover:border-teal-500/35 hover:bg-teal-50 hover:text-teal-800"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <label className="relative mb-4 block shrink-0 sm:mb-5">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-700/40" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsPaused(true);
            }}
            onFocus={() => setIsPaused(true)}
            placeholder="Search technologies, tools, or skills..."
            className="w-full rounded-2xl border border-teal-900/[0.08] bg-white/90 py-3.5 pl-11 pr-11 text-sm text-black shadow-[0_12px_40px_-28px_rgba(13,148,136,0.35)] outline-none backdrop-blur-sm transition-all placeholder:text-black/35 focus:border-teal-500/40 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]"
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

        <div
          ref={railRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mb-4 flex shrink-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-5 sm:gap-2.5"
        >
          {categories.map((category, index) => (
            <CategoryOrb
              key={category.id}
              category={category}
              index={index}
              isActive={activeCategoryId === category.id}
              onClick={() => {
                goToCategory(index);
                setIsPaused(true);
              }}
            />
          ))}
        </div>

        <div
          ref={stageRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-teal-900/[0.07] bg-white/85 shadow-[0_32px_80px_-40px_rgba(13,148,136,0.28)] backdrop-blur-md"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(20,184,166,0.1),transparent_40%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 top-0 select-none font-semibold tabular-nums leading-none text-teal-600/[0.06] sm:text-[10rem] lg:text-[13rem]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </div>

          <div className="relative z-[1] flex shrink-0 flex-wrap items-start justify-between gap-4 border-b border-teal-900/[0.06] px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start gap-3.5">
              <motion.span
                key={activeCategory.id}
                initial={{ scale: 0.85, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-500/25 bg-teal-500/10 text-teal-700"
              >
                <ActiveIcon className="h-5 w-5" />
              </motion.span>
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-teal-700/45">
                  {query.trim() ? "Search results" : "Active category"}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                    className="mt-1 text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl"
                  >
                    {activeCategory.title}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span className="rounded-full border border-teal-500/20 bg-teal-50 px-3 py-1 text-xs font-medium tabular-nums text-teal-800">
                {visibleItems.length} skills
              </span>
              <AnimatePresence>
                {selectedSkill && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="max-w-[240px] truncate text-right text-[11px] text-black/40"
                  >
                    Focused · <span className="font-medium text-teal-700">{selectedSkill}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative z-[1] min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
            <AnimatePresence mode="wait">
              {visibleItems.length > 0 ? (
                <motion.div
                  key={`${activeCategoryId}-${query}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {visibleItems.map((item, index) => (
                    <SkillChip
                      key={`${item}-${index}`}
                      label={item}
                      index={index}
                      isSelected={selectedSkill === item}
                      onSelect={() => {
                        setSelectedSkill((current) => (current === item ? null : item));
                        setIsPaused(true);
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full min-h-[200px] items-center justify-center px-6 text-sm text-black/40"
                >
                  No matches. Try another keyword or clear search.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-[1] shrink-0 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-teal-900/[0.06]">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                  animate={{
                    scaleX: categories.length ? (activeIndex + 1) / categories.length : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {!query && !selectedSkill && (
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-teal-700/40 sm:inline">
                  {isPaused ? "Paused" : "Auto-play"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
