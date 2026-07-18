"use client";

import { useEffect, useRef } from "react";
import { Rocket, Smile, Star, Globe } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

const stats = [
  { icon: Rocket, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Smile, value: 30, suffix: "+", label: "Happy Clients" },
  { icon: Star, value: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Globe, value: 12, suffix: "+", label: "Countries Served" },
];

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  index,
  dark,
}: (typeof stats)[number] & { index: number; dark?: boolean }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !itemRef.current || !valueRef.current) return;

    const counter = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 88%",
        },
        y: 28,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
      });

      gsap.to(counter, {
        val: value,
        duration: 1.4,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 88%",
        },
        onUpdate: () => {
          if (valueRef.current) {
            valueRef.current.textContent = `${Math.round(counter.val)}${suffix}`;
          }
        },
      });
    }, itemRef);

    return () => ctx.revert();
  }, [index, suffix, value]);

  return (
    <div
      ref={itemRef}
      className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
        dark
          ? "border border-white/[0.08] bg-white shadow-[0_20px_56px_-40px_rgba(0,0,0,0.5)] hover:border-teal-500/25"
          : "border border-black/[0.06] bg-white shadow-[0_20px_56px_-40px_rgba(0,0,0,0.14)] hover:border-teal-500/20 hover:shadow-[0_28px_64px_-36px_rgba(0,0,0,0.18)]"
      }`}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-teal-500/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-600 transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </span>

      <p className="text-3xl font-semibold tabular-nums tracking-[-0.03em] text-black sm:text-4xl">
        <span ref={valueRef}>0{suffix}</span>
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-black/50">{label}</p>
    </div>
  );
}

type StatsBarProps = {
  /** Use dark section background to keep black/white page rhythm. */
  tone?: "light" | "dark";
};

export default function StatsBar({ tone = "light" }: StatsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${dark ? "section-dark" : "section-light"} section-y`}
      aria-label="Company stats"
    >
      <div className="section-container">
        <div ref={headerRef} className="mb-10 max-w-xl sm:mb-12">
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.35em] ${
              dark ? "text-white/40" : "text-black/40"
            }`}
          >
            By the numbers
          </span>
          <h2
            className={`mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-4xl ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Results that speak for themselves.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} index={index} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
}
