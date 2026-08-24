"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { aboutCapabilities } from "../data";

/** White section, black cards with white content. */
export default function AboutCapabilities() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.72, 420);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section-light relative overflow-hidden border-t border-black/[0.06] section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-[320px] w-[320px] rounded-full bg-gold-dark/[0.05] blur-[110px]"
      />

      <div className="section-container relative z-10">
        <div
          className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              What we ship.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-black/50">
              Scroll sideways, every capability is a full card with its own story.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Scroll capabilities left"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:border-gold-dark/40 hover:text-gold-dark"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll capabilities right"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:border-gold-dark/40 hover:text-gold-dark"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {aboutCapabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="group relative flex h-[340px] w-[min(85vw,320px)] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-background p-6 text-primary shadow-[0_28px_64px_-36px_rgba(0,0,0,0.45)] sm:h-[380px] sm:w-[360px] sm:p-7 md:w-[380px]"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40"
                />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.25em] text-gold-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-primary sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gold/90">{item.summary}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-text-gray sm:text-[15px]">
                    {item.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
          <div className="w-2 shrink-0 sm:w-6" aria-hidden />
        </div>
      </div>
    </section>
  );
}
