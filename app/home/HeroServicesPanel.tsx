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
      data-aos="fade-up"
      className="relative overflow-hidden rounded-xl border border-white/8 bg-[#111111] text-white shadow-[0_20px_56px_-32px_rgba(0,0,0,0.5)] sm:rounded-2xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_50%,rgba(230,201,166,0.12),transparent_42%)]"
      />

      <div className="relative grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
        <nav aria-label="What we do" className="min-w-0 border-b border-white/8 py-4 lg:border-b-0 lg:border-r lg:p-5">
          <p className="mb-2.5 px-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark sm:px-5 lg:mb-3.5 lg:px-0">
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
                    className={`tap-target flex w-max shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-left transition-colors duration-200 lg:w-full lg:min-w-0 lg:gap-2.5 lg:rounded-lg lg:px-2.5 lg:py-2 ${
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
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 items-center gap-5 p-4 sm:gap-6 sm:p-5 lg:min-h-[260px] lg:gap-8 lg:px-6 lg:py-5">
          <div className="relative hidden shrink-0 items-center justify-center sm:flex">
            <div
              aria-hidden
              className="absolute left-1/2 top-[58%] h-24 w-24 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <Image
                  src="/images/hero/laptop.png"
                  alt={`${active.title} preview`}
                  width={640}
                  height={640}
                  className="w-[230px] object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.45)] lg:w-[250px]"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-center lg:gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0 flex-1"
              >
                <span className="font-serif text-[2rem] leading-none text-gold-dark/90 sm:text-[2.25rem]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-tight text-white sm:text-[1.5rem]">
                  {active.title}
                </h2>
                <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/60">
                  {active.description}
                </p>
                <Link
                  href={active.href}
                  className="tap-target mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold-dark transition-colors hover:text-gold"
                >
                  {active.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </AnimatePresence>

            <ul className="shrink-0 space-y-2 sm:w-44">
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
    </div>
  );
}
