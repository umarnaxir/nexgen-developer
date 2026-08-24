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
  const isFeatured = Boolean(plan.popular);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      whileHover={{
        y: isFeatured ? -8 : -14,
        transition: { duration: 0.28 },
      }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border text-white",
        "bg-[linear-gradient(155deg,#1c1710_0%,#111111_42%,#0a0a0a_100%)]",
        "transition-[box-shadow,border-color,transform] duration-300",
        isFeatured
          ? "z-10 border-gold/70 p-0 shadow-[0_36px_90px_-28px_rgba(230,201,166,0.45)] ring-1 ring-gold/30 md:-mt-8 md:mb-0 md:scale-[1.08]"
          : "border-gold/30 shadow-[0_20px_56px_-36px_rgba(0,0,0,0.55)] hover:border-gold hover:shadow-[0_28px_70px_-24px_rgba(230,201,166,0.4)]"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(230,201,166,0.22),transparent_46%)]"
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/20 blur-2xl transition-opacity duration-300",
          isFeatured ? "opacity-90" : "opacity-0 group-hover:opacity-100"
        )}
      />

      {isFeatured ? (
        <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
          Most popular
        </div>
      ) : (
        <div className="h-1.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-all duration-300 group-hover:via-gold" />
      )}

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          isFeatured ? "p-7 sm:p-9" : "p-6 sm:p-8"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light/70">
              Plan
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-gold">
              {plan.name}
            </h3>
          </div>
          <span className="inline-flex shrink-0 cursor-default items-center gap-1.5 rounded-full border border-gold/35 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-primary">
            <Clock className="h-3 w-3" />
            {plan.timeline}
          </span>
        </div>

        <div className="mt-6 border-b border-gold/20 pb-6">
          <p className="flex items-baseline gap-1">
            <span className="text-[2.35rem] font-semibold leading-none tracking-tight text-gold transition-transform duration-300 group-hover:scale-[1.02] sm:text-[2.7rem]">
              {plan.price}
            </span>
            {!plan.price.toLowerCase().includes("custom") &&
            !plan.price.toLowerCase().includes("requirement") &&
            !plan.price.toLowerCase().startsWith("from") ? (
              <span className="text-sm font-medium text-gold-light/70">USD</span>
            ) : null}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gold-light/85">
            {plan.description}
          </p>
          <p className="mt-3 inline-flex rounded-lg border border-gold/25 bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-light">
            Best for: {plan.bestFor}
          </p>
        </div>

        <ul className="mt-6 flex-1 space-y-3.5">
          <li className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light/60">
            What&apos;s included
          </li>
          {plan.deliverables.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
              className="group/item flex cursor-default items-start gap-3 text-sm text-white/85 transition-colors duration-300 hover:text-gold"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-primary transition-transform duration-300 group-hover/item:scale-110">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          onClick={openContactModal}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative mt-8 w-full overflow-hidden rounded-2xl px-4 py-4 text-sm font-semibold transition-colors duration-300",
            isFeatured
              ? "bg-gold text-primary shadow-lg shadow-gold/25 hover:bg-gold-dark"
              : "border border-gold/50 bg-transparent text-gold-light hover:border-gold hover:bg-gold hover:text-primary"
          )}
        >
          <span className="relative z-10">{plan.ctaLabel}</span>
          {isFeatured ? (
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
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
        className="pointer-events-none absolute inset-x-8 top-1/2 -z-10 hidden h-64 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl md:block"
      />

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:items-center lg:gap-7">
        {plans.map((plan, index) => (
          <PlanCard key={`${service}-${plan.id}`} plan={plan} index={index} />
        ))}
      </div>
    </div>
  );
}
