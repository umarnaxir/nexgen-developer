"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import {
  techStackCategories,
  totalTechStackItems,
  type TechStackCategory,
} from "./tech-stack-data";

function SkillPill({
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
  const rotateX = useSpring(useTransform(y, [-30, 30], [6, -6]), { stiffness: 220, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-30, 30], [-6, 6]), { stiffness: 220, damping: 18 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
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
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: index * 0.012, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`cursor-pointer rounded-xl border px-3.5 py-2 text-left text-[13px] font-medium transition-colors ${
        isSelected
          ? "border-black bg-black text-white shadow-[0_14px_36px_-18px_rgba(0,0,0,0.55)]"
          : "border-black/[0.08] bg-white text-black/75 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.35)] hover:border-teal-500/35 hover:text-black"
      }`}
    >
      <span className="mr-2 text-[10px] tabular-nums opacity-40">
        {String(index + 1).padStart(2, "0")}
      </span>
      {label}
    </motion.button>
  );
}

function CategoryButton({
  category,
  isActive,
  onClick,
  index,
}: {
  category: TechStackCategory;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const Icon = category.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      whileHover={{ x: isActive ? 0 : 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
        isActive
          ? "border-black/15 bg-black text-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.55)]"
          : "border-transparent bg-transparent text-black/65 hover:border-black/[0.06] hover:bg-white hover:text-black"
      }`}
    >
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
          isActive
            ? "border-white/15 bg-white/10 text-white"
            : "border-black/[0.08] bg-[#eefaf8] text-black/50 group-hover:text-black/70"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[10px] tabular-nums opacity-35">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="block text-[13px] font-semibold leading-snug">{category.title}</span>
        </span>
        <span
          className={`mt-0.5 block text-[10px] tabular-nums ${
            isActive ? "text-white/50" : "text-black/35"
          }`}
        >
          {category.items.length} skills
        </span>
      </span>
    </motion.button>
  );
}

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categoryListRef = useRef<HTMLDivElement>(null);
  const [activeCategoryId, setActiveCategoryId] = useState(techStackCategories[0].id);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [query, setQuery] = useState("");

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

  const visibleItems = useMemo(() => {
    if (!query.trim()) return activeCategory.items;
    return activeCategory.items;
  }, [query, activeCategory.items]);

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
    goToCategory((activeIndex + 1) % categories.length);
  }, [activeIndex, categories.length, goToCategory]);

  const goPrev = useCallback(() => {
    goToCategory((activeIndex - 1 + categories.length) % categories.length);
  }, [activeIndex, categories.length, goToCategory]);

  useEffect(() => {
    if (query.trim() && categories.length > 0) {
      const stillVisible = categories.some((category) => category.id === activeCategoryId);
      if (!stillVisible) setActiveCategoryId(categories[0].id);
    }
  }, [query, categories, activeCategoryId]);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelector(".tech-stack-shell") ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
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
    const list = categoryListRef.current;
    if (!list) return;
    const activeButton = list.querySelector<HTMLElement>(`[data-category-id="${activeCategoryId}"]`);
    activeButton?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeCategoryId]);

  const ActiveIcon = activeCategory.icon;

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="section-light relative min-h-[100svh] overflow-hidden bg-white text-black lg:h-[95vh]"
      aria-label="Technology stack and expertise"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.09),transparent_40%)]" />

      <div className="tech-stack-shell section-container relative z-10 flex min-h-[100svh] flex-col py-5 sm:py-6 lg:h-full lg:min-h-0">
        <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-4 sm:mb-5">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
              Technology
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl">
              Our Technology Stack &amp; Expertise
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden rounded-full border border-black/10 bg-[#eefaf8] px-3 py-1.5 text-xs tabular-nums text-black/45 sm:inline-flex">
              {totalTechStackItems}+ skills
            </span>
            <span className="text-sm tabular-nums text-black/45">
              {String(activeIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous category"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/55 transition-all hover:border-black/20 hover:bg-black hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next category"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/55 transition-all hover:border-black/20 hover:bg-black hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 shrink-0">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search technologies, tools, or skills..."
              className="w-full rounded-xl border border-black/[0.08] bg-white py-3 pl-11 pr-11 text-sm text-black outline-none transition-all placeholder:text-black/35 focus:border-teal-500/35 focus:shadow-[0_0_0_4px_rgba(20,184,166,0.08)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-black/40 transition-colors hover:bg-black/[0.05] hover:text-black/70"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div
          ref={panelRef}
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-[#f7fbfb] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.18)] lg:flex-row"
        >
          <aside className="flex shrink-0 flex-col border-b border-black/[0.06] bg-white/80 lg:w-[300px] lg:border-b-0 lg:border-r xl:w-[320px]">
            <div className="hidden border-b border-black/[0.06] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/40 lg:block">
              Categories
            </div>

            <div className="flex gap-2 overflow-x-auto p-3 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => goToCategory(index)}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-all ${
                    activeCategoryId === category.id
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black/65"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div
              ref={categoryListRef}
              className="hidden min-h-0 flex-1 space-y-1 overflow-y-auto p-3 lg:block"
            >
              {categories.map((category, index) => (
                <div key={category.id} data-category-id={category.id}>
                  <CategoryButton
                    category={category}
                    index={index}
                    isActive={activeCategoryId === category.id}
                    onClick={() => goToCategory(index)}
                  />
                </div>
              ))}
            </div>
          </aside>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
            <div className="mb-4 flex shrink-0 flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <motion.span
                  key={activeCategory.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#eefaf8] text-black/70"
                >
                  <ActiveIcon className="h-5 w-5" />
                </motion.span>
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/40">
                    {query.trim() ? "Search Results" : "Selected Category"}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeCategory.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
                    >
                      {activeCategory.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium tabular-nums text-black/55">
                  {visibleItems.length} skills
                </span>
                <AnimatePresence>
                  {selectedSkill && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="max-w-[220px] truncate text-right text-[11px] text-black/45"
                    >
                      Focused: <span className="font-medium text-black/70">{selectedSkill}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
              <div className="absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />

              <div className="h-full overflow-y-auto p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {visibleItems.length > 0 ? (
                    <motion.div
                      key={`${activeCategoryId}-${query}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-wrap gap-2.5"
                    >
                      {visibleItems.map((item, index) => (
                        <SkillPill
                          key={`${item}-${index}`}
                          label={item}
                          index={index}
                          isSelected={selectedSkill === item}
                          onSelect={() =>
                            setSelectedSkill((current) => (current === item ? null : item))
                          }
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full items-center justify-center text-sm text-black/45"
                    >
                      Try another keyword or browse a different category.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 shrink-0">
              <div className="h-px overflow-hidden bg-black/10">
                <motion.div
                  className="h-full origin-left bg-black"
                  animate={{ scaleX: (activeIndex + 1) / categories.length }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
