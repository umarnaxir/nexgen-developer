"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Code2, Compass, PenTool, Rocket, TrendingUp } from "lucide-react";
import { aboutApproach, aboutApproachMetrics } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;
const stepIcons = [Compass, PenTool, Code2, Rocket, TrendingUp] as const;

function parseMetric(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return { amount: match ? Number(match[1]) : 0, suffix: match?.[2] ?? "" };
}

function CountUp({ to }: { to: number }) {
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (reduceMotion) {
      setN(to);
      return;
    }
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, to]);

  return <>{n}</>;
}

function ProcessCard({
  item,
  index,
  className = "",
}: {
  item: (typeof aboutApproach)[number];
  index: number;
  className?: string;
}) {
  const Icon = stepIcons[index] ?? Compass;
  const goldCard = index % 2 === 1;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.015 }}
      className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] p-5 sm:p-6 ${
        goldCard ? "bg-gold text-primary" : "bg-[#111111] text-white"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full ${
          goldCard ? "via-white/35" : "via-gold/20"
        }`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`font-serif text-[2.1rem] leading-none transition-transform duration-300 group-hover:scale-105 ${
            goldCard ? "text-primary/35" : "text-gold-dark/80"
          }`}
        >
          {item.step}
        </span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${
            goldCard ? "bg-primary text-gold" : "bg-gold text-primary"
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.9} />
        </span>
      </div>

      <h3
        className={`relative mt-8 text-[1.35rem] font-semibold tracking-[-0.03em] sm:text-[1.45rem] ${
          goldCard ? "text-primary" : "text-white"
        }`}
      >
        {item.title}
      </h3>
      <p
        className={`relative mt-2 text-[13px] leading-relaxed sm:text-sm ${
          goldCard ? "text-primary/70" : "text-white/60"
        }`}
      >
        {item.text}
      </p>

      <ul className="relative mt-auto flex flex-col gap-1.5 pt-6">
        {item.outcomes.slice(0, 2).map((outcome) => (
          <li
            key={outcome}
            className={`text-[11px] font-medium ${
              goldCard ? "text-primary/80" : "text-gold"
            }`}
          >
            {outcome}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function AboutApproach() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.5 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const card = scroller.querySelector("article");
      const width = card instanceof HTMLElement ? card.offsetWidth + 12 : scroller.clientWidth;
      if (!width) return;
      const next = Math.round(scroller.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(next, 0), aboutApproach.length - 1));
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative bg-white text-black section-y" aria-label="How a project moves">
      <div className="section-container">
          <div className="max-w-2xl" data-aos="fade-up">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
              Process
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,4.8vw,3.15rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-primary">
              How a project <span className="text-gold-dark">moves.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-gray sm:text-base">
              Five clear stages from first conversation to sustained growth.
            </p>
          </div>

          <div className="mt-6 lg:hidden">
            <div ref={scrollerRef} className="process-mobile-scroller">
              {aboutApproach.map((item, index) => (
                <ProcessCard
                  key={item.step}
                  item={item}
                  index={index}
                  className="process-mobile-card min-h-[340px]"
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
              {aboutApproach.map((item, index) => (
                <span
                  key={item.step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-5 bg-gold-dark" : "w-1.5 bg-gold/40"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 hidden grid-cols-5 gap-4 lg:grid">
            {aboutApproach.map((item, index) => (
              <ProcessCard
                key={item.step}
                item={item}
                index={index}
                className="min-h-[280px] shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_48px_-24px_rgba(209,172,129,0.55)]"
              />
            ))}
          </div>

          <div
            ref={metricsRef}
            className="relative mx-auto mt-6 w-[min(100%,52rem)] overflow-hidden rounded-[1.35rem] border border-gold/25 bg-[#111111] px-4 py-5 sm:mt-8 sm:px-8 sm:py-6"
            data-aos="zoom-in"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(230,201,166,0.18),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(209,172,129,0.12),transparent_36%)]"
            />
            <div className="relative grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {aboutApproachMetrics.map((metric, index) => {
                const { amount, suffix } = parseMetric(metric.value);
                return (
                  <div
                    key={metric.label}
                    className={`min-w-0 px-2 text-center sm:px-3 ${
                      index % 2 === 1 ? "border-l border-white/10" : ""
                    } ${index >= 2 ? "border-t border-white/10 sm:border-t-0" : ""} sm:border-l sm:border-white/10 sm:first:border-l-0`}
                  >
                    <p className="text-xl font-semibold tabular-nums tracking-[-0.04em] text-gold sm:text-2xl">
                      {metricsInView ? (
                        <>
                          <CountUp to={amount} />
                          {suffix}
                        </>
                      ) : (
                        `0${suffix}`
                      )}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/70 sm:text-[13px]">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </section>
  );
}
