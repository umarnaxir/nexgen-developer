"use client";

import { Check, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import {
  getPricingForService,
  type PricingPlan,
  type PricingServiceType,
} from "../data";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { open: openContactModal } = useContactModal();

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      whileHover={{ y: plan.popular ? -10 : -6, transition: { duration: 0.28 } }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border bg-white",
        "transition-[box-shadow,border-color] duration-400",
        plan.popular
          ? "z-10 border-teal-400/80 shadow-[0_28px_80px_-32px_rgba(13,148,136,0.45)] ring-1 ring-teal-400/25 md:-mt-3 md:mb-3 md:scale-[1.03]"
          : "border-neutral-200/90 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.12)] hover:border-teal-200/70 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.14)]"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.08),transparent_50%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
      />

      {plan.popular ? (
        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
          Most popular
        </div>
      ) : (
        <div className="h-2 bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 transition-all duration-300 group-hover:from-teal-100/80 group-hover:via-teal-50/50 group-hover:to-teal-100/80" />
      )}

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Plan
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-teal-800">
              {plan.name}
            </h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-200/80 bg-neutral-50 px-3 py-1.5 text-[11px] font-medium text-neutral-600 transition-all duration-300 group-hover:border-teal-200 group-hover:bg-teal-50 group-hover:text-teal-800">
            <Clock className="h-3 w-3" />
            {plan.timeline}
          </span>
        </div>

        <div className="mt-6 border-b border-neutral-100 pb-6">
          <p className="flex items-baseline gap-1">
            <span className="text-[2.35rem] font-semibold leading-none tracking-tight text-neutral-900 transition-transform duration-300 group-hover:scale-[1.02] sm:text-[2.6rem]">
              {plan.price}
            </span>
            {!plan.price.toLowerCase().includes("custom") &&
            !plan.price.toLowerCase().startsWith("from") ? (
              <span className="text-sm font-medium text-neutral-400">USD</span>
            ) : null}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {plan.description}
          </p>
          <p className="mt-3 inline-flex rounded-lg bg-teal-50/80 px-2.5 py-1 text-xs font-medium text-teal-900/85">
            Best for: {plan.bestFor}
          </p>
        </div>

        <ul className="mt-6 flex-1 space-y-3.5">
          <li className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            What&apos;s included
          </li>
          {plan.deliverables.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
              className="flex items-start gap-3 text-sm text-neutral-700"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 transition-transform duration-300 group-hover:scale-110">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={openContactModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative mt-8 w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-semibold transition-colors duration-300",
            plan.popular
              ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg shadow-teal-600/25 hover:from-teal-600 hover:to-teal-500"
              : "border border-neutral-200 bg-neutral-50 text-neutral-900 hover:border-teal-300 hover:bg-white hover:text-teal-900"
          )}
        >
          <span className="relative z-10">{plan.ctaLabel}</span>
          {plan.popular ? (
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          ) : null}
        </motion.button>
      </div>
    </motion.article>
  );
}

interface PricingCardsProps {
  service: PricingServiceType;
}

export default function PricingCards({ service }: PricingCardsProps) {
  const { plans } = getPricingForService(service);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-1/2 -z-10 hidden h-64 -translate-y-1/2 rounded-full bg-teal-200/20 blur-3xl md:block"
      />

      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-3 lg:gap-8">
        {plans.map((plan, index) => (
          <PlanCard key={`${service}-${plan.id}`} plan={plan} index={index} />
        ))}
      </div>
    </div>
  );
}
