"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";

type ContactCTAProps = {
  variant?: "section" | "embedded";
};

export default function ContactCTA({ variant = "section" }: ContactCTAProps) {
  const { open: openContactModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isEmbedded = variant === "embedded";

  return (
    <section
      ref={sectionRef}
      className={
        isEmbedded
          ? "relative overflow-hidden rounded-xl border border-black/[0.06] bg-black px-5 py-8 text-white sm:px-8 sm:py-10"
          : "section-dark relative overflow-hidden section-y"
      }
    >
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />

      <div className={isEmbedded ? "relative" : "section-container relative"}>
        <div
          ref={contentRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
            Let&apos;s build together
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            Ready to start your project?
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base">
            Get in touch for a free consultation and custom quote. We&apos;ll help you scope, plan,
            and launch with clarity.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton onClick={openContactModal} className="!px-7 !py-3.5 sm:!px-9 sm:!py-4">
              Contact us now
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <a
              href="/contact-us"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-all hover:gap-2.5 hover:text-teal-300"
            >
              Or visit contact page
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
