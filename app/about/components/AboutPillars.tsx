"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { aboutPillars } from "../data";

function PillarCard({
  pillar,
  index,
  className = "",
}: {
  pillar: (typeof aboutPillars)[number];
  index: number;
  className?: string;
}) {
  const Icon = pillar.icon;
  const goldCard = index === 1 || index === 2;

  return (
    <motion.article
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 80, 240)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`group relative overflow-hidden rounded-[1.35rem] border p-6 sm:p-7 ${
        goldCard
          ? "border-gold/40 bg-gold text-primary"
          : "border-gold/30 bg-[linear-gradient(155deg,#1c1710_0%,#111111_50%,#0a0a0a_100%)] text-white"
      } ${className}`}
    >
      <div className="relative flex items-start justify-between gap-4">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full text-[12px] font-semibold tabular-nums ${
            goldCard ? "bg-primary text-gold" : "border border-gold/40 bg-gold text-primary"
          }`}
        >
          {pillar.number}
        </span>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            goldCard ? "bg-primary/10 text-primary" : "bg-gold/15 text-gold"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <h3
        className={`mt-5 text-lg font-semibold tracking-[-0.02em] sm:text-xl ${
          goldCard ? "text-primary" : "text-white"
        }`}
      >
        {pillar.title}
      </h3>
      <p
        className={`mt-2 text-[14px] leading-relaxed sm:text-[15px] ${
          goldCard ? "text-primary/70" : "text-gold-light/80"
        }`}
      >
        {pillar.description}
      </p>
    </motion.article>
  );
}

export default function AboutPillars() {
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
      setActiveIndex(Math.min(Math.max(next, 0), aboutPillars.length - 1));
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0e0d0d] section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.08)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-gold-dark/20 blur-[120px]"
      />

      <div className="section-container relative z-10">
        <div className="mb-6 max-w-xl lg:mb-8" data-aos="fade-up">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold">
            Why teams stay
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-white">
            Built for <span className="text-gold">momentum.</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-gold-light/75">
            Four reasons engagements last: one studio, visible progress, and pricing that
            matches the brief.
          </p>
        </div>

        <div className="md:hidden">
          <div ref={scrollerRef} className="process-mobile-scroller">
            {aboutPillars.map((pillar, index) => (
              <PillarCard
                key={pillar.number}
                pillar={pillar}
                index={index}
                className="process-mobile-card min-h-[280px]"
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
            {aboutPillars.map((pillar, index) => (
              <span
                key={pillar.number}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-gold/35"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-5 md:grid">
          {aboutPillars.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
