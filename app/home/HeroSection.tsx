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
      className="hero-glow relative overflow-hidden pb-3 pt-[calc(var(--site-nav-height)+0.75rem)] sm:pb-4 sm:pt-[calc(var(--site-nav-height)+1rem)] lg:pb-5 lg:pt-[calc(var(--site-nav-height)+1.15rem)]"
    >
      <div className="px-4 sm:px-6 lg:px-14">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="flex w-full min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8 xl:gap-10">
            <div className="order-1 w-full min-w-0 lg:order-2">
              <HeroProcessWave />
            </div>

            <div ref={copyRef} className="order-2 w-full min-w-0 max-w-xl lg:order-1">
              <h1 className="text-[clamp(2.85rem,12.5vw,3.55rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-primary lg:text-[clamp(1.85rem,6.5vw,2.75rem)] lg:leading-[0.95] lg:tracking-[-0.04em]">
                <span className="block">We build</span>
                <span className="block text-primary/90">premium digital</span>
                <span className="hero-highlight-word block">products.</span>
              </h1>

              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-gray sm:text-sm">
                We help startups and local brands with AI/ML, chatbots, web &amp; app development,
                and digital marketing, crafting digital experiences that stand out and deliver results.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
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

          <div className="mt-5 w-full min-w-0 sm:mt-6 lg:mt-7">
            <HeroServicesPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
