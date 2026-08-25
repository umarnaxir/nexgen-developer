"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import HeroProcessWave from "./HeroProcessWave";
import HeroServicesPanel from "./HeroServicesPanel";

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
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-glow relative flex min-h-[100svh] flex-col overflow-hidden pb-3 pt-[calc(var(--site-nav-height)+3.15rem)] sm:pb-3 sm:pt-[calc(var(--site-nav-height)+3.5rem)] lg:pb-4 lg:pt-[calc(var(--site-nav-height)+4rem)]"
    >
      <div className="flex min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-14">
        <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
          <div className="relative">
            <div className="order-1 w-full min-w-0 lg:absolute lg:right-0 lg:top-0 lg:w-[42%]">
              <HeroProcessWave />
            </div>

            <div ref={copyRef} className="order-2 w-full min-w-0 lg:w-[56%] lg:pr-4">
              <h1 className="text-[clamp(2.85rem,12.5vw,3.55rem)] font-black leading-[1.02] tracking-[-0.035em] text-primary [-webkit-text-stroke:0.45px_currentColor] lg:text-[clamp(1.85rem,6.5vw,2.75rem)] lg:leading-[1.05] lg:tracking-[-0.03em]">
                <span className="block">We build</span>
                <span className="block text-primary/90">custom software</span>
                <span className="hero-highlight-word block">products.</span>
              </h1>

              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-text-gray sm:text-sm lg:max-w-none">
                NexGen Developers is a software development studio for startups and local brands.
                We ship custom software, AI, chatbots, and growth work with one team.
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

          <div className="relative z-10 mt-3 w-full min-w-0 pt-1 sm:mt-3.5 lg:mt-4">
            <HeroServicesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
