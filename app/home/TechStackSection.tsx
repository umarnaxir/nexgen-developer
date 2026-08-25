"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import {
  techStackCategories,
  totalTechStackItems,
} from "./tech-stack-data";
import { getTechBrandIcon } from "./tech-brand-icons";

type SkillHit = {
  label: string;
  group: string;
};

export default function TechStackSection() {
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

  const activeCategory =
    categories.find((category) => category.id === activeCategoryId) ??
    categories[0] ??
    techStackCategories[0];

  const isSearching = query.trim().length > 0;

  const displayItems: SkillHit[] = useMemo(() => {
    if (isSearching) {
      return categories.flatMap((category) =>
        category.items.map((label) => ({ label, group: category.shortTitle }))
      );
    }
    return activeCategory.items.map((label) => ({
      label,
      group: activeCategory.shortTitle,
    }));
  }, [activeCategory, categories, isSearching]);

  useEffect(() => {
    if (categories.length === 0) return;
    const stillVisible = categories.some((c) => c.id === activeCategoryId);
    if (!stillVisible) setActiveCategoryId(categories[0].id);
  }, [query, categories, activeCategoryId]);

  return (
    <section
      id="tech-stack"
      className="section-light relative min-w-0 overflow-x-clip scroll-mt-24 section-y sm:scroll-mt-28"
      aria-label="Technology stack"
    >
      <div className="section-container relative z-10 min-w-0">
        <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
              Tools
            </span>
            <h2 className="mt-2 text-[clamp(1.7rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-primary">
              Stack we ship with.
            </h2>
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-text-gray">
              {totalTechStackItems}+ tools across {techStackCategories.length} disciplines.
              Pick a category or search the stack.
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-gold/35 bg-[#111111] px-3.5 py-1.5 text-xs font-medium tabular-nums text-gold">
            {totalTechStackItems}+ skills
          </span>
        </div>

        <label className="relative mb-5 block min-w-0 sm:mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-dark" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search React, Python, SEO..."
            className="w-full min-w-0 rounded-2xl border border-gold/35 bg-white py-3.5 pl-11 pr-11 text-sm text-primary outline-none transition-all placeholder:text-gold-dark focus:border-gold focus:shadow-[0_0_0_4px_rgba(230,201,166,0.2)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gold-dark transition-colors hover:bg-gold/15"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </label>

        <div className="min-w-0 lg:hidden">
          <div
            role="tablist"
            aria-label="Stack categories"
            className="flex min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = !isSearching && category.id === activeCategory.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setQuery("");
                    setActiveCategoryId(category.id);
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-gold bg-[#111111] text-white"
                      : "border-gold/30 bg-white text-primary"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-gold" : "text-gold-dark"}`} />
                  {category.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 lg:mt-0 lg:grid-cols-[minmax(0,16.5rem)_minmax(0,1fr)] lg:gap-6">
          <nav
            aria-label="Stack categories"
            className="hidden max-h-[min(68vh,640px)] min-w-0 overflow-y-auto overscroll-contain rounded-[1.35rem] border border-gold/30 bg-[#111111] p-2 lg:block"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = !isSearching && category.id === activeCategory.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategoryId(category.id);
                  }}
                  className={`flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gold text-primary"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-primary text-gold" : "bg-white/10 text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {category.shortTitle}
                    </span>
                    <span
                      className={`block text-[11px] ${isActive ? "text-primary/60" : "text-white/40"}`}
                    >
                      {category.items.length} tools
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold tabular-nums ${
                      isActive ? "text-primary/50" : "text-white/30"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="min-w-0 max-w-full rounded-[1.35rem] border border-gold/30 bg-white p-3 sm:p-5 lg:p-6">
            <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-dark">
                  {isSearching ? "Search" : "Discipline"}
                </p>
                <h3 className="mt-1 truncate text-base font-semibold tracking-[-0.02em] text-primary sm:text-xl">
                  {isSearching ? `Matches for "${query.trim()}"` : activeCategory.title}
                </h3>
              </div>
              <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium tabular-nums text-gold-dark">
                {displayItems.length} {displayItems.length === 1 ? "tool" : "tools"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {displayItems.length > 0 ? (
                <motion.ul
                  key={`${isSearching ? query : activeCategory.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 xl:grid-cols-5"
                >
                  {displayItems.map((item, index) => (
                    <SkillTile
                      key={`${item.group}-${item.label}-${index}`}
                      label={item.label}
                      group={isSearching ? item.group : undefined}
                      index={index}
                    />
                  ))}
                </motion.ul>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[200px] items-center justify-center px-4 text-center text-sm text-text-gray"
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

function SkillTile({
  label,
  group,
  index,
}: {
  label: string;
  group?: string;
  index: number;
}) {
  const brand = getTechBrandIcon(label);
  const [failed, setFailed] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.28), duration: 0.25 }}
      className="group flex min-h-[96px] min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gold/25 bg-[#faf8f5] px-2 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-white hover:shadow-[0_16px_36px_-24px_rgba(230,201,166,0.7)] sm:min-h-[120px] sm:px-2.5 sm:py-3.5"
    >
      <span className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
        {brand.type === "svg" && !failed ? (
          <svg role="img" viewBox="0 0 24 24" aria-hidden className="h-8 w-8 sm:h-9 sm:w-9">
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
          <span className="text-sm font-bold uppercase tracking-wide text-gold-dark">
            {label.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="line-clamp-2 text-[11px] font-semibold leading-snug tracking-[-0.01em] text-primary sm:text-xs">
        {label}
      </span>
      {group ? (
        <span className="text-[10px] font-medium text-gold-dark">{group}</span>
      ) : null}
    </motion.li>
  );
}
