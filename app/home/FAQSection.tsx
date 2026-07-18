"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { FAQSchema } from "@/lib/seo/faq-schema";

const faqs = [
  {
    question: "What services does NexGen Developers offer?",
    answer:
      "We're a service-based team of freelance developers and designers offering web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, deployment & DevOps, and ongoing maintenance & support. We work with startups and local businesses to build, launch, and grow their products.",
  },
  {
    question: "How do I get started or request a quote?",
    answer:
      "Reach out through our contact page or send us an email with a short description of what you need. We'll get back to you to discuss your requirements, scope, timeline, and pricing, and share a proposal before any work begins.",
  },
  {
    question: "Do you work with startups and small businesses?",
    answer:
      "Yes. We specialize in helping startups and local brands. Whether you need a single landing page, a full web or mobile app, or ongoing marketing and support, we tailor our services to your goals and budget.",
  },
  {
    question: "Do you share resources or insights?",
    answer:
      "Yes, we publish articles and guides on our blog covering technology, development, and business topics. It's a free resource — no account or sign-up needed — to help startups and businesses learn and stay updated.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing options including project-based pricing (fixed price for complete projects), hourly rates (pay for actual time worked), and monthly retainers (dedicated support & maintenance). Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive maintenance and support services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements. We offer both one-time support and monthly retainer packages depending on your needs.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !headerRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(listRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-light border-t border-black/[0.06] py-14 sm:py-16 lg:py-20"
    >
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
        <div ref={headerRef} className="mb-10 max-w-2xl sm:mb-12">
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">FAQ</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl lg:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-black/55">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

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
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 sm:px-6 sm:py-5"
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums transition-colors duration-300 ${
                        isOpen ? "bg-teal-600 text-white" : "bg-black/[0.05] text-black/40"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-base ${
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
  );
}
