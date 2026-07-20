"use client";

import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

interface PrivacySectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
  altBg?: boolean;
  id?: string;
}

export default function PrivacySection({
  icon: Icon,
  title,
  children,
  delay = 0,
  id,
}: PrivacySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
        y: 24,
        opacity: 0,
        duration: 0.65,
        delay: Math.min(delay, 0.2),
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [delay]);

  const sectionId =
    id ??
    title
      .toLowerCase()
      .replace(/^\d+\.\s*/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="scroll-mt-28 rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_48px_-36px_rgba(0,0,0,0.1)] transition-colors hover:border-teal-500/20 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-600">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl">{title}</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-black/60 sm:text-base [&_strong]:font-semibold [&_strong]:text-black">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
