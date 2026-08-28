"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, Code2, Lightbulb, PenTool, Rocket } from "lucide-react";

const ORBIT_NODES = [
  { label: "Design", icon: PenTool, angle: -90 },
  { label: "Launch", icon: Rocket, angle: -18 },
  { label: "Grow", icon: BarChart3, angle: 54 },
  { label: "Develop", icon: Code2, angle: 126 },
  { label: "Idea", icon: Lightbulb, angle: 198 },
] as const;

export default function HeroStageVisual() {
  return (
    <div className="hero-stage relative mx-auto aspect-square w-full max-w-[19.5rem] overflow-visible lg:ml-auto lg:mr-0 lg:max-w-[21.5rem] xl:max-w-none">
      <span className="hero-stage-ring pointer-events-none absolute inset-[28%] rounded-full border border-gold/25" />
      <span className="hero-stage-ring-dashed pointer-events-none absolute inset-[14%] rounded-full border border-dashed border-gold/30" />

      <span className="hero-stage-dot pointer-events-none absolute right-[18%] top-[30%] h-1 w-1 rounded-full bg-gold/55" />
      <span
        className="hero-stage-dot pointer-events-none absolute bottom-[28%] left-[20%] h-1 w-1 rounded-full bg-gold/45"
        style={{ animationDelay: "1.6s" }}
      />
      <span
        className="hero-stage-dot pointer-events-none absolute right-[8%] top-[48%] h-1.5 w-1.5 rounded-full bg-gold/50"
        style={{ animationDelay: "0.8s" }}
      />
      <span
        className="hero-stage-dot pointer-events-none absolute left-[12%] top-[16%] h-1 w-1 rounded-full bg-gold/40"
        style={{ animationDelay: "2.1s" }}
      />

      <div className="hero-orbit-spin pointer-events-none absolute inset-[18%]">
        {ORBIT_NODES.map((node) => {
          const Icon = node.icon;
          const rad = (node.angle * Math.PI) / 180;
          const left = 50 + Math.cos(rad) * 50;
          const top = 50 + Math.sin(rad) * 50;

          return (
            <div
              key={node.label}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="hero-orbit-counter flex flex-col items-center gap-1.5">
                <div className="hero-orbit-node pointer-events-auto">
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={1.8} />
                </div>
                <span className="text-[7px] font-semibold uppercase tracking-[0.16em] text-primary/60 sm:text-[8px] sm:tracking-[0.2em]">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <Link href="/" aria-label="NexGen Developers home" className="hero-logo group relative block">
          <div className="hero-logo-float relative flex h-[6.5rem] w-[6.5rem] items-center justify-center sm:h-[7.5rem] sm:w-[7.5rem] lg:h-[8.5rem] lg:w-[8.5rem] xl:h-[10rem] xl:w-[10rem]">
            <span className="hero-logo-mark relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[3px] border-gold bg-[#111111] shadow-[0_16px_36px_-18px_rgba(80,56,20,0.5)]">
              <Image
                src="/logo/logo-02.png"
                alt=""
                width={580}
                height={418}
                className="relative z-10 h-auto w-[78%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                priority
              />
              <span className="hero-logo-shine" />
            </span>
          </div>
        </Link>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark sm:mt-2.5 sm:text-[11px] sm:tracking-[0.22em] xl:text-[12px]">
          NexGen Developers
        </p>
        <span className="mt-1.5 h-px w-12 bg-gold/70" />
      </div>
    </div>
  );
}
