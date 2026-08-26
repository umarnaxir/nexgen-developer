"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import HeroProcessWave from "./HeroProcessWave";
import HeroServicesPanel from "./HeroServicesPanel";

const TITLE_LINES = [
  { text: "We build", className: "block" },
  { text: "premium digital", className: "block text-primary/90" },
  { text: "products.", className: "hero-highlight-word block" },
] as const;

function HeroTypedTitle() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setLineIndex(TITLE_LINES.length - 1);
      setCharIndex(TITLE_LINES[TITLE_LINES.length - 1].text.length);
      setDone(true);
      return;
    }

    const current = TITLE_LINES[lineIndex];
    if (charIndex < current.text.length) {
      const delay = charIndex === 0 && lineIndex === 0 ? 280 : 46;
      const timer = window.setTimeout(() => setCharIndex((count) => count + 1), delay);
      return () => window.clearTimeout(timer);
    }

    if (lineIndex < TITLE_LINES.length - 1) {
      const timer = window.setTimeout(() => {
        setLineIndex((index) => index + 1);
        setCharIndex(0);
      }, 420);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => setDone(true), 700);
    return () => window.clearTimeout(timer);
  }, [charIndex, lineIndex]);

  return (
    <h1 className="text-[clamp(2.15rem,9.5vw,2.65rem)] font-black leading-[1.05] tracking-[-0.035em] text-primary [-webkit-text-stroke:0.45px_currentColor] sm:text-[clamp(2.45rem,8vw,3rem)] lg:text-[clamp(1.85rem,6.5vw,2.75rem)] lg:leading-[1.05] lg:tracking-[-0.03em]">
      <span className="sr-only">We build premium digital products.</span>
      {TITLE_LINES.map((line, index) => {
        const typed =
          index < lineIndex
            ? line.text
            : index === lineIndex
              ? line.text.slice(0, charIndex)
              : "";
        const showCursor = !done && index === lineIndex;

        return (
          <span key={line.text} aria-hidden className={`relative ${line.className}`}>
            <span className="invisible">{line.text}</span>
            <span className="absolute inset-0 whitespace-pre">
              {typed}
              {showCursor ? <span className="hero-type-cursor" /> : null}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { open: openContactModal } = useContactModal();

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !copyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(copyRef.current?.children ?? [], {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-glow relative flex min-h-[100svh] flex-col overflow-hidden pb-3 pt-[calc(var(--site-nav-height)+4.25rem)] sm:pb-3 sm:pt-[calc(var(--site-nav-height)+3.85rem)] lg:pb-4 lg:pt-[calc(var(--site-nav-height)+4.35rem)]"
    >
      <div className="flex min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-14">
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
          <div className="relative">
            <div className="hidden lg:absolute lg:right-0 lg:top-0 lg:block lg:w-[42%]">
              <HeroProcessWave />
            </div>

            <div className="w-full min-w-0 lg:w-[56%] lg:pr-4">
              <HeroTypedTitle />

              <div ref={copyRef}>
                <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-text-gray sm:text-sm lg:max-w-none">
                  We help startups and local brands with AI/ML, chatbots, web & app development, and digital marketing, crafting digital experiences that stand out and deliver results.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2.5">
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
                    className="!bg-white !px-5 !py-2.5 !text-[13px]"
                  >
                    View our work
                    <ArrowRight className="h-3.5 w-3.5" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-3 w-full min-w-0 pt-1 sm:mt-3.5 lg:mt-4">
            <HeroServicesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
