"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  id?: string;
  className?: string;
};

export default function FAQAccordion({
  faqs,
  title = "Frequently asked questions",
  description,
  id = "faq",
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const active = openIndex !== null ? faqs[openIndex] : null;

  return (
    <section
      id={id}
      className={cn(
        "section-light section-y relative scroll-mt-24 overflow-hidden border-t border-black/[0.06] sm:scroll-mt-28",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold-dark/[0.06] blur-[110px]"
      />

      <div className="section-container relative">
        <div
          className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="mt-3 text-[15px] leading-relaxed text-black/55">{description}</p>
            ) : null}
          </div>

          <div className="hidden items-center gap-3 text-sm tabular-nums text-black/40 sm:flex">
            <span>{String(faqs.length).padStart(2, "0")} questions</span>
            <div className="h-px w-16 overflow-hidden bg-black/10 sm:w-24">
              <motion.div
                className="h-full origin-left bg-gold-dark"
                initial={false}
                animate={{
                  scaleX:
                    openIndex === null || faqs.length <= 1
                      ? 0.08
                      : (openIndex + 1) / faqs.length,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              />
            </div>
          </div>
        </div>

        {/* Desktop: interactive split stage */}
        <div
          className="hidden gap-6 lg:grid lg:grid-cols-[0.95fr_1.15fr] lg:gap-8"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <div
            className="flex flex-col gap-2"
            role="tablist"
            aria-label="FAQ questions"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.button
                  key={faq.question}
                  type="button"
                  role="tab"
                  aria-selected={isOpen}
                  aria-controls={`${baseId}-panel`}
                  id={`${baseId}-tab-${index}`}
                  onClick={() => setOpenIndex(index)}
                  onMouseEnter={() => setOpenIndex(index)}
                  whileTap={{ scale: 0.985 }}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                    isOpen
                      ? "border-gold-dark/35 bg-background text-primary shadow-[0_20px_48px_-32px_rgba(0,0,0,0.4)]"
                      : "border-black/[0.06] bg-white text-black hover:border-black/12"
                  }`}
                >
                  {isOpen ? (
                    <motion.span
                      layoutId="faq-active-glow"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold-dark/15 via-transparent to-transparent"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  ) : null}

                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold tabular-nums tracking-wide transition-colors ${
                      isOpen
                        ? "bg-gold-dark/20 text-gold"
                        : "bg-black/[0.04] text-black/40 group-hover:text-black/60"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`relative min-w-0 flex-1 text-[14px] font-semibold leading-snug tracking-[-0.01em] ${
                      isOpen ? "text-primary" : "text-black/70 group-hover:text-black"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-gold/30 bg-gold-dark/10 text-gold"
                        : "border-black/[0.08] text-black/35"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isOpen ? "minus" : "plus"}
                        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={openIndex !== null ? `${baseId}-tab-${openIndex}` : undefined}
            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-gold/30 bg-background p-7 shadow-[0_28px_64px_-36px_rgba(0,0,0,0.45)] lg:min-h-[380px] lg:p-9"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl"
            />

            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.question}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full min-h-[280px] flex-col"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/90">
                      Answer
                    </span>
                    <span className="text-[11px] font-medium tabular-nums tracking-[0.2em] text-gold-dark">
                      {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                      {String(faqs.length).padStart(2, "0")}
                    </span>
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="mt-5 h-px origin-left bg-gradient-to-r from-gold/70 via-gold/20 to-transparent"
                  />

                  <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.02em] text-primary sm:text-2xl">
                    {active.question}
                  </h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.35 }}
                    className="mt-4 text-[15px] leading-[1.8] text-text-gray"
                  >
                    {active.answer}
                  </motion.p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex((i) =>
                          i === null ? 0 : (i - 1 + faqs.length) % faqs.length
                        )
                      }
                      className="rounded-full border border-gold/35 px-4 py-2 text-sm font-medium text-text-gray transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex((i) => (i === null ? 0 : (i + 1) % faqs.length))
                      }
                      className="rounded-full border border-gold/30 bg-gold-dark/10 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold-dark/20"
                    >
                      Next question
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: animated accordion */}
        <div
          className="flex flex-col gap-2.5 lg:hidden"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-m-panel-${index}`;
            const buttonId = `${baseId}-m-btn-${index}`;

            return (
              <motion.div
                key={faq.question}
                layout
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-gold-dark/30 bg-background shadow-[0_20px_48px_-28px_rgba(0,0,0,0.35)]"
                    : "border-black/[0.06] bg-white"
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold tabular-nums ${
                      isOpen ? "bg-gold-dark/20 text-gold" : "bg-black/[0.05] text-black/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-[15px] font-semibold leading-snug tracking-[-0.01em] ${
                      isOpen ? "text-primary" : "text-black/80"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      isOpen
                        ? "border-gold/30 bg-gold-dark/10 text-gold"
                        : "border-black/[0.08] text-black/40"
                    }`}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gold/30 px-4 pb-5 pt-3 sm:px-5">
                        <p className="pl-10 text-[14px] leading-relaxed text-text-gray sm:text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
