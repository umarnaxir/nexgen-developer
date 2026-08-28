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
      data-aos="fade-up"
      data-aos-delay={index * 60}
      className="group relative overflow-hidden rounded-xl border border-gold/35 bg-[linear-gradient(155deg,#1c1710_0%,#111111_42%,#0a0a0a_100%)] p-5 text-white shadow-[0_20px_56px_-40px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/55 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(230,201,166,0.22),transparent_46%)]" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/25 opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gold/35 bg-gold text-black transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </span>

      <p className="text-[clamp(1.875rem,1.5rem+1.17vw,2.25rem)] font-semibold tabular-nums tracking-[-0.03em] text-gold">
        <span ref={valueRef}>0{suffix}</span>
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-white/70">{label}</p>
    </div>
  );
}

type StatsBarProps = {
  /** Use dark section background to keep black/white page rhythm. */
  tone?: "light" | "dark";
};

export default function StatsBar({ tone = "light" }: StatsBarProps) {
  const dark = tone === "dark";

  return (
    <section
      className={`${dark ? "section-light" : "section-light"} section-y`}
      aria-label="Company stats"
    >
      <div className="page-gutter">
        <div className="content-cap">
        <div className="mb-10 max-w-xl sm:mb-12" data-aos="fade-up">
          <h2
            className={`text-fluid-h2 font-semibold tracking-[-0.03em] ${
              dark ? "text-primary" : "text-black"
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
      </div>
    </section>
  );
}
