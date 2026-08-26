"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { aboutCapabilities } from "../data";

function CapabilityCard({
  item,
  index,
  className = "",
}: {
  item: (typeof aboutCapabilities)[number];
  index: number;
  className?: string;
}) {
  const Icon = item.icon;
  const goldCard = index === 1 || index === 2;

  return (
    <motion.article
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 80, 240)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.35rem] border p-6 sm:min-h-[320px] sm:p-7 ${
        goldCard
          ? "about-gold-diagonal border-gold/50 text-primary shadow-[0_24px_56px_-32px_rgba(209,172,129,0.55)]"
          : "border-gold/30 bg-[#111111] text-white shadow-[0_24px_56px_-32px_rgba(0,0,0,0.55)]"
      } ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${
          goldCard
            ? "bg-[radial-gradient(circle_at_100%_0%,rgba(14,13,13,0.08),transparent_46%)]"
            : "bg-[radial-gradient(circle_at_100%_0%,rgba(230,201,166,0.18),transparent_46%)]"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
            goldCard ? "bg-primary text-gold" : "border border-gold/35 bg-gold text-primary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`text-[11px] font-semibold tabular-nums tracking-[0.25em] ${
            goldCard ? "text-primary/50" : "text-gold"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-8 flex flex-1 flex-col">
        <h3
          className={`text-xl font-semibold tracking-[-0.02em] sm:text-2xl ${
            goldCard ? "text-primary" : "text-white"
          }`}
        >
          {item.title}
        </h3>
        <p className={`mt-2 text-sm font-medium ${goldCard ? "text-primary/70" : "text-gold"}`}>
          {item.summary}
        </p>
        <p
          className={`mt-3 text-[14px] leading-relaxed sm:text-[15px] ${
            goldCard ? "text-primary/65" : "text-gold-light/80"
          }`}
        >
          {item.detail}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {item.points.map((point) => (
            <li
              key={point}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                goldCard
                  ? "bg-primary/10 text-primary"
                  : "border border-gold/30 bg-white/5 text-gold-light"
              }`}
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function AboutCapabilities() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const card = scroller.querySelector("article");
      const width = card instanceof HTMLElement ? card.offsetWidth + 12 : scroller.clientWidth;
      if (!width) return;
      const next = Math.round(scroller.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(next, 0), aboutCapabilities.length - 1));
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-light relative overflow-hidden border-t border-black/[0.06] section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-[320px] w-[320px] rounded-full bg-gold-dark/[0.08] blur-[110px]"
      />

      <div className="section-container relative z-10">
        <div className="mb-6 max-w-2xl sm:mb-8" data-aos="fade-up">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            Capabilities
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            What we ship.
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/50">
            Four practices, one studio.
          </p>
        </div>

        <div className="md:hidden">
          <div ref={scrollerRef} className="process-mobile-scroller">
            {aboutCapabilities.map((item, index) => (
              <CapabilityCard
                key={item.id}
                item={item}
                index={index}
                className="process-mobile-card min-h-[340px]"
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
            {aboutCapabilities.map((item, index) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-5 bg-gold-dark" : "w-1.5 bg-gold/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-5 md:grid lg:gap-6">
          {aboutCapabilities.map((item, index) => (
            <CapabilityCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
