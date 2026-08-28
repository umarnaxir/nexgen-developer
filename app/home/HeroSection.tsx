"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import HeroStageVisual from "./HeroStageVisual";
import HeroServicesPanel from "./HeroServicesPanel";

const HERO_TITLE = "Turn Ideas Into Premium Digital Products That Grow.";

const TITLE_LEAD = ["Turn", "Ideas", "Into"] as const;
const TITLE_ACCENT = ["Premium", "Digital", "Products"] as const;
const TITLE_CLOSE = ["That", "Grow."] as const;

const EYEBROW_ITEMS = ["Product studio", "Kashmir", "shipping worldwide"] as const;

function HeroTitle() {
  return (
    <h1 className="max-w-[46rem] font-bold tracking-[-0.042em] text-primary">
      <span className="sr-only">{HERO_TITLE}</span>
      <span
        aria-hidden
        className="hero-title-visual block leading-[1.14]"
      >
        <span className="hero-title-line">
          {TITLE_LEAD.map((word) => (
            <span key={word} className="hero-title-mask mr-[0.28em] inline-block overflow-hidden align-bottom last-of-type:mr-0">
              <span className="hero-title-word inline-block will-change-transform">{word}</span>
            </span>
          ))}
        </span>
        <span className="hero-title-accent-row">
          {TITLE_ACCENT.map((word) => (
            <span key={word} className="hero-title-mask mr-[0.28em] inline-block overflow-hidden align-bottom last-of-type:mr-0">
              <span className="hero-title-word hero-title-accent inline-block will-change-transform">
                {word}
              </span>
            </span>
          ))}
          <span className="hero-title-underline-wrap" data-hero-underline aria-hidden>
            <svg
              className="hero-title-underline"
              viewBox="0 0 400 20"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-underline-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b89264" stopOpacity="0.25" />
                  <stop offset="12%" stopColor="#d1ac81" />
                  <stop offset="48%" stopColor="#f0d7b4" />
                  <stop offset="78%" stopColor="#d1ac81" />
                  <stop offset="100%" stopColor="#b89264" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path
                className="hero-title-underline-stroke"
                d="M3 13.2 C 58 6.2, 112 16.8, 178 10.4 S 302 5.2, 397 13.6"
                fill="none"
                stroke="url(#hero-underline-grad)"
                strokeWidth="3.1"
                strokeLinecap="round"
                pathLength="1"
              />
              <path
                className="hero-title-underline-spark"
                d="M3 13.2 C 58 6.2, 112 16.8, 178 10.4 S 302 5.2, 397 13.6"
                fill="none"
                stroke="#fff6e8"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength="1"
              />
            </svg>
          </span>
        </span>
        <span className="hero-title-line mt-1">
          {TITLE_CLOSE.map((word) => (
            <span key={word} className="hero-title-mask mr-[0.28em] inline-block overflow-hidden align-bottom last-of-type:mr-0">
              <span className="hero-title-word inline-block will-change-transform">{word}</span>
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}

function HeroEyebrow() {
  return (
    <p data-hero-eyebrow className="hero-eyebrow mb-3 lg:mb-3.5">
      <span className="hero-eyebrow-glint" aria-hidden />
      <span className="hero-live-dot" />
      {EYEBROW_ITEMS.map((item, index) => (
        <span
          key={item}
          className={index === 2 ? "hidden min-[430px]:contents" : "contents"}
        >
          {index > 0 ? <span className="hero-eyebrow-sep" aria-hidden /> : null}
          <span
            data-hero-eyebrow-item
            className="hero-eyebrow-item"
            style={{ animationDelay: `${index * 2.5}s` }}
          >
            {item}
          </span>
        </span>
      ))}
    </p>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { open: openContactModal } = useContactModal();

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        const words = gsap.utils.toArray<HTMLElement>(".hero-title-word");
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .from("[data-hero-eyebrow]", { y: 10, opacity: 0, duration: 0.45 }, 0.04)
          .from(words, { yPercent: 110, duration: 0.6, stagger: 0.03 }, 0.1)
          .from("[data-hero-copy]", { y: 16, opacity: 0, duration: 0.5 }, 0.28);
      });

      mm.add("(min-width: 1024px)", () => {
        const words = gsap.utils.toArray<HTMLElement>(".hero-title-word");
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .from("[data-hero-eyebrow]", { y: 10, opacity: 0, duration: 0.5 }, 0.04)
          .from(words, { yPercent: 110, duration: 0.7, stagger: 0.04 }, 0.16)
          .from("[data-hero-copy]", { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.46)
          .from("[data-hero-stage]", { opacity: 0, x: 28, scale: 0.96, duration: 0.9 }, 0.14);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-glow relative flex min-h-0 flex-col overflow-hidden pb-4 pt-[calc(var(--site-nav-height)+1.75rem)] sm:pb-4 sm:pt-[calc(var(--site-nav-height)+2rem)] lg:min-h-[100svh] lg:pb-5 lg:pt-[calc(var(--site-nav-height)+1.6rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
        <svg
          className="hero-d-arc"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero-d-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8f1e7" />
              <stop offset="46%" stopColor="#f3eadf" />
              <stop offset="100%" stopColor="#eadcc9" />
            </linearGradient>
          </defs>
          <path
            d="M100 0 C44.8 0 0 44.8 0 100 C0 155.2 44.8 200 100 200 L100 0 Z"
            fill="url(#hero-d-fill)"
          />
        </svg>
        <svg
          className="hero-d-arc-inner"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero-d-inner-fill" x1="0.1" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,252,247,0.14)" />
              <stop offset="100%" stopColor="rgba(226,205,175,0.7)" />
            </linearGradient>
          </defs>
          <path
            d="M100 0 C44.8 0 0 44.8 0 100 C0 155.2 44.8 200 100 200 L100 0 Z"
            fill="url(#hero-d-inner-fill)"
          />
        </svg>
        <svg
          className="hero-d-graph"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <clipPath id="hero-d-graph-clip">
              <path d="M400 0 C179 0 0 179 0 400 C0 621 179 800 400 800 L400 0 Z" />
            </clipPath>
            <linearGradient id="hero-graph-stroke" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#d1ac81" stopOpacity="0" />
              <stop offset="35%" stopColor="#d1ac81" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#e6c9a6" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <g clipPath="url(#hero-d-graph-clip)" fill="#c4a06a">
            <path
              d="M36 640 C 90 580 128 500 176 428 S 286 250 368 168"
              fill="none"
              stroke="url(#hero-graph-stroke)"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
            <path
              d="M52 680 C 110 610 160 530 214 460 S 310 290 372 220"
              fill="none"
              stroke="#d1ac81"
              strokeOpacity="0.28"
              strokeWidth="0.9"
              strokeDasharray="2.5 4"
            />
            {[
              [36, 640, 2.1],
              [92, 572, 1.5],
              [128, 508, 1.8],
              [176, 428, 2.4],
              [228, 348, 1.4],
              [286, 250, 2],
              [332, 198, 1.3],
              [368, 168, 2.6],
              [52, 680, 1.2],
              [214, 460, 1.6],
              [372, 220, 1.4],
              [70, 420, 1.1],
              [118, 300, 1.3],
              [248, 520, 1],
              [310, 400, 1.2],
              [150, 180, 1.1],
              [340, 560, 1],
              [90, 240, 0.9],
              [260, 140, 1.2],
              [380, 320, 1.1],
              [200, 600, 0.95],
              [40, 360, 1],
              [300, 640, 0.9],
              [170, 80, 1.15],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} className="hero-graph-dot" cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-14">
        <div
          data-hero-stage
          className="pointer-events-none absolute right-4 top-0 z-10 hidden w-[min(44vw,25.5rem)] lg:right-4 lg:block xl:right-6 xl:w-[min(40vw,26.5rem)]"
        >
          <div className="pointer-events-auto">
            <HeroStageVisual />
          </div>
        </div>

        <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
          <div className="min-h-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,40%)] lg:items-start">
            <div className="max-w-[40rem] lg:pt-5">
              <HeroEyebrow />

              <HeroTitle />

              <p
                data-hero-copy
                className="mt-3 max-w-[31rem] text-[14px] leading-relaxed text-text-gray sm:mt-3.5 sm:text-[13.5px]"
              >
                From first sketch to launch and growth — we help startups and local brands with AI, chatbots, web & app development, and digital marketing that looks premium and performs.
              </p>

              <div data-hero-copy className="mt-5 hidden w-full flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center lg:flex">
                <MagneticButton
                  onClick={openContactModal}
                  className="!px-5 !py-2.5 !text-[13px]"
                >
                  Start a Project
                  <ArrowRight className="h-3.5 w-3.5" />
                </MagneticButton>
                <MagneticButton
                  href="/projects"
                  variant="outline-light"
                  className="!border-gold-dark !bg-transparent !px-5 !py-2.5 !text-[13px] !text-gold-dark hover:!bg-gold hover:!text-primary"
                >
                  View our work
                  <ArrowRight className="h-3.5 w-3.5" />
                </MagneticButton>
              </div>
            </div>

            <div aria-hidden className="hidden min-h-[18rem] lg:block xl:min-h-[20rem]" />
          </div>

          <div className="relative z-10 mt-3 w-full min-w-0 sm:mt-3.5 lg:mt-4">
            <HeroServicesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
