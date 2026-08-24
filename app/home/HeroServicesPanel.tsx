"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { heroServices } from "./data";

export default function HeroServicesPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = heroServices[activeIndex];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroServices.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      id="what-we-do"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#111111] text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55)] sm:rounded-[1.75rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,rgba(230,201,166,0.12),transparent_42%)]"
      />

      <div className="relative grid lg:grid-cols-[16.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <nav aria-label="What we do" className="min-w-0 border-b border-white/8 py-4 lg:border-b-0 lg:border-r lg:p-6 lg:py-6">
          <p className="mb-3 px-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark sm:px-5 lg:mb-5 lg:px-0">
            What we do
          </p>
          <ul className="services-tabs-scroller px-4 sm:px-5 lg:px-0">
            {heroServices.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeIndex;
              return (
                <li key={service.title} className="shrink-0 snap-start lg:w-full">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`flex w-max shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-left transition-colors duration-200 lg:w-full lg:min-w-0 lg:gap-2.5 lg:rounded-xl lg:px-3 lg:py-2.5 ${
                      isActive
                        ? "bg-gold/20 text-gold lg:bg-gradient-to-r lg:from-gold/20 lg:to-transparent"
                        : "bg-white/[0.05] text-white/70 hover:bg-white/[0.04] hover:text-white lg:bg-transparent lg:text-white/60"
                    }`}
                  >
                    <span className="hidden text-[11px] font-medium tabular-nums tracking-[0.12em] text-gold-dark lg:inline">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                    <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.01em]">
                      {service.title}
                    </span>
                    <ArrowUpRight
                      className={`ml-auto hidden h-3.5 w-3.5 shrink-0 transition-opacity lg:block ${
                        isActive ? "opacity-80" : "opacity-30"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative hidden min-h-[280px] items-center justify-center p-4 sm:flex lg:min-h-[340px] lg:p-6">
          <div
            aria-hidden
            className="absolute left-1/2 top-[58%] h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
          />
          <Image
            src="/images/hero/laptop.png"
            alt={`${active.title} preview`}
            width={640}
            height={640}
            className="relative z-10 w-[min(100%,340px)] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] lg:w-[min(100%,400px)]"
            priority
          />
        </div>

        <div className="flex flex-col justify-center gap-6 p-5 sm:flex-row sm:items-center sm:p-6 lg:gap-8 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 flex-1"
            >
              <span className="font-serif text-[2.75rem] leading-none text-gold-dark/90 sm:text-[3.25rem]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 font-serif text-[1.65rem] leading-tight text-white sm:text-[1.85rem]">
                {active.title}
              </h2>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/60">
                {active.description}
              </p>
              <Link
                href={active.href}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-dark transition-colors hover:text-gold"
              >
                {active.ctaLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <ul className="shrink-0 space-y-2.5 sm:w-44">
            {active.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[13px] text-white/80">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-dark text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
