"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Code2, Lightbulb, PenTool, Rocket } from "lucide-react";

const steps = [
  { label: "Idea", icon: Lightbulb, x: "12%", y: "58%" },
  { label: "Design", icon: PenTool, x: "30%", y: "24%" },
  { label: "Build", icon: Code2, x: "50%", y: "10%" },
  { label: "Launch", icon: Rocket, x: "70%", y: "24%" },
  { label: "Grow", icon: BarChart3, x: "88%", y: "56%" },
] as const;

export default function HeroProcessWave() {
  return (
    <div className="relative mx-auto h-[255px] w-full max-w-full overflow-x-clip overflow-y-visible sm:h-[300px] lg:h-[360px] lg:overflow-visible">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-[18%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(230,201,166,0.38),transparent_68%)] blur-2xl"
      />

      <svg
        viewBox="0 0 900 380"
        className="hero-wave-drift absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-wave-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e6c9a6" stopOpacity="0" />
            <stop offset="18%" stopColor="#d1ac81" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f3e0c8" stopOpacity="1" />
            <stop offset="82%" stopColor="#d1ac81" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e6c9a6" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-wave-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M20 250 C 140 250, 170 110, 280 90 C 400 68, 430 210, 540 150 C 650 90, 690 70, 780 130 C 840 170, 860 230, 890 250"
          stroke="url(#hero-wave-stroke)"
          strokeWidth="18"
          strokeLinecap="round"
          filter="url(#hero-wave-glow)"
          opacity="0.45"
        />
        <path
          className="hero-wave-flow"
          d="M20 250 C 140 250, 170 110, 280 90 C 400 68, 430 210, 540 150 C 650 90, 690 70, 780 130 C 840 170, 860 230, 890 250"
          stroke="url(#hero-wave-stroke)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {[
          [120, 232],
          [210, 128],
          [330, 86],
          [470, 168],
          [620, 102],
          [750, 118],
          [840, 210],
        ].map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            className="hero-spark"
            cx={cx}
            cy={cy}
            r={index % 2 === 0 ? 2.6 : 1.7}
            fill="#d1ac81"
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        ))}
      </svg>

      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.label}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: step.x, top: step.y }}
          >
            <div
              className="hero-step group relative flex cursor-pointer flex-col items-center"
              style={{ animationDelay: `${index * 0.28}s` }}
            >
              <span
                className="hero-step-ring"
                style={{ animationDelay: `${index * 0.28}s` }}
              />
              <span className="hero-step-node relative flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 bg-[#6a4e27] text-gold-light shadow-[0_8px_22px_-10px_rgba(80,56,20,0.7)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-gold group-hover:bg-[#8a6734] group-hover:text-white group-hover:shadow-[0_12px_28px_-8px_rgba(209,172,129,0.7)] sm:h-11 sm:w-11">
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />
              </span>
              <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-primary/70 transition-colors duration-300 group-hover:text-gold-dark">
                {step.label}
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute left-1/2 top-[46%] z-[1] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <Link
          href="/"
          aria-label="NexGen Developers home"
          className="hero-logo group relative block"
        >
          <span className="hero-logo-pulse pointer-events-none absolute inset-[-22%] rounded-full border border-gold/40" />
          <div className="hero-logo-float relative flex h-[7.75rem] w-[7.75rem] items-center justify-center sm:h-[9.25rem] sm:w-[9.25rem]">
            <span className="hero-orbit absolute inset-[-18%] rounded-full border border-dashed border-gold/35" />
            <span className="hero-orbit-rev absolute inset-[-8%] rounded-full border border-gold/25" />
            <span className="hero-logo-mark relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-gold/50 bg-[#111111]">
              <Image
                src="/logo/nav-logo.png"
                alt=""
                width={588}
                height={425}
                className="relative z-10 h-auto w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                priority
              />
              <span className="hero-logo-shine" />
            </span>
          </div>
        </Link>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/75">
          NexGen Developers
        </p>
      </div>
    </div>
  );
}
