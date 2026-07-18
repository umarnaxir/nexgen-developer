"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import GetStartedCTA from "@/components/GetStartedCTA";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceOverviewSection from "./ServiceOverviewSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServiceBenefitsSection from "./ServiceBenefitsSection";
import RelatedServicesSection from "./RelatedServicesSection";
import type { ServiceDefinition } from "../config";

interface ServiceLayoutProps {
  heading: string;
  description: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  relatedServices?: ServiceDefinition[];
  currentSlug?: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
  expectedResults?: string[];
}

function useScrollReveal<T extends HTMLElement>(
  triggerRef: React.RefObject<T | null>,
  deps: unknown[] = []
) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !triggerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 82%",
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, triggerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return contentRef;
}

export default function ServiceLayout({
  heading,
  description,
  benefits,
  process: processSteps,
  ctaHeading,
  ctaDescription,
  relatedServices = [],
  currentSlug,
  image,
  faqs = [],
  expectedResults = [],
}: ServiceLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqRef = useRef<HTMLElement>(null);

  const faqContent = useScrollReveal(faqRef);

  const filteredRelated = relatedServices.filter((s) => s.slug !== currentSlug);

  return (
    <main className="min-h-screen">
      <ServiceDetailHero heading={heading} image={image} />

      <ServiceOverviewSection description={description} />

      <ServiceBenefitsSection benefits={benefits} expectedResults={expectedResults} />

      <ServiceProcessSection steps={processSteps} />

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section
          ref={faqRef}
          id="faq"
          className="section-light border-t border-black/[0.06] py-14 sm:py-16 lg:py-20"
        >
          <div ref={faqContent} className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
            <div className="mb-10 max-w-2xl">
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                FAQ
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
                Common questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                      isOpen
                        ? "border-teal-500/25 shadow-[0_20px_56px_-40px_rgba(0,0,0,0.12)]"
                        : "border-black/[0.06] hover:border-black/12"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 sm:px-6 sm:py-5"
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums transition-colors ${
                            isOpen ? "bg-teal-600 text-white" : "bg-black/[0.05] text-black/40"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[15px] font-semibold leading-snug sm:text-base ${
                            isOpen ? "text-black" : "text-black/75"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-teal-500/25 bg-teal-500/10 text-teal-700"
                            : "border-black/[0.08] text-black/45"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-t border-black/[0.05] px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                          <p className="pl-9 text-[14px] leading-relaxed text-black/60 sm:text-[15px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {filteredRelated.length > 0 ? (
        <RelatedServicesSection services={filteredRelated} />
      ) : null}

      <GetStartedCTA
        heading={ctaHeading}
        description={ctaDescription}
        secondaryLink={{ href: "/services", label: "Explore all services" }}
      />
    </main>
  );
}
