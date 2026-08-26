"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { EASE } from "@/lib/motion";
import type { ContactInfo } from "@/lib/content/types";

type HomeCtaSectionProps = {
  contact: ContactInfo;
};

const SHOW_CONTACT_DETAILS = false;

const MAP_NODES = [
  { x: "22%", y: "38%", delay: "0s" },
  { x: "48%", y: "32%", delay: "0.45s" },
  { x: "56%", y: "44%", delay: "0.9s" },
  { x: "76%", y: "40%", delay: "1.35s" },
  { x: "83%", y: "68%", delay: "1.8s" },
];

const GLOBAL_POINTS = [
  { title: "Globally", detail: "12+ countries" },
  { title: "Remote-first", detail: "Across time zones" },
  { title: "Baramulla", detail: "India studio" },
];

export default function HomeCtaSection({ contact }: HomeCtaSectionProps) {
  const { open: openContactModal } = useContactModal();
  const reduceMotion = useReducedMotion();
  const phoneLabel = contact.phoneDisplay || contact.phone;
  const address = contact.address || "Baramulla, Jammu and Kashmir, India";
  const [spot, setSpot] = useState({ x: 50, y: 42 });
  const [hovered, setHovered] = useState(false);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="relative bg-white px-4 pb-8 pt-2 sm:px-6 sm:pb-10 lg:px-14 lg:pb-12">
      <motion.div
        className="group/cta relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-gold/20 bg-[#040303] text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-500 hover:border-gold/55 hover:shadow-[0_32px_90px_-28px_rgba(230,201,166,0.45)] sm:rounded-[1.75rem]"
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setSpot({ x: 50, y: 42 });
        }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <div className="cta-map-drift absolute inset-0">
          <Image
            src="/images/map.png"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 80rem"
            className="object-cover object-center"
            aria-hidden
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(4,3,3,0.62),rgba(4,3,3,0.28)_52%,rgba(4,3,3,0.58))] transition-opacity duration-500 group-hover/cta:opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hovered && !reduceMotion ? 1 : 0,
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(230,201,166,0.22), transparent 34%)`,
          }}
        />
        <div
          aria-hidden
          className="cta-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        />

        {!reduceMotion
          ? MAP_NODES.map((node) => (
              <span
                key={`${node.x}-${node.y}`}
                aria-hidden
                className="pointer-events-none absolute z-[1] hidden sm:block"
                style={{ left: node.x, top: node.y }}
              >
                <span
                  className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-gold/20 animate-ping"
                  style={{ animationDelay: node.delay, animationDuration: "2.8s" }}
                />
                <span
                  className="cta-node-core absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-gold shadow-[0_0_16px_rgba(230,201,166,0.9)]"
                  style={{ animationDelay: node.delay }}
                />
              </span>
            ))
          : null}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] hidden items-center justify-center select-none text-center font-semibold uppercase leading-none tracking-[-0.08em] text-white/[0.12] sm:flex [font-size:clamp(3.2rem,14vw,9.5rem)]"
        >
          Globally
        </span>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-8 text-center sm:px-10 sm:py-9 lg:py-11">

          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-black/30 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm sm:px-4 sm:text-[11px]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Have a project in mind?
          </motion.span>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.6, delay: 0.06, ease: EASE }}
            className="mt-4 text-[2.35rem] font-black uppercase leading-[1.14] tracking-[-0.045em] text-white sm:mt-5 sm:text-[clamp(2.3rem,6.4vw,4rem)] sm:leading-[1.12]"
          >
            Let&apos;s build
            <br />
            something <span className="text-gold">great.</span>
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
            className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold sm:text-xs"
          >
            <Globe className="h-3.5 w-3.5" />
            Globally
          </motion.p>

          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
            className="mt-3 h-px w-14 origin-center bg-gold sm:w-16"
            aria-hidden
          />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/65 sm:mt-5 sm:text-base"
          >
            Have an idea, a product, or a problem worth solving? Let&apos;s turn it into something
            people remember — from Baramulla to clients worldwide.
          </motion.p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {GLOBAL_POINTS.map((point, index) => (
              <motion.span
                key={point.title}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-gold/15 hover:text-gold"
              >
                <span className="font-semibold text-gold">{point.title}</span>
                <span className="text-white/40">·</span>
                {point.detail}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
            className="mt-6 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-6"
          >
            <MagneticButton
              onClick={openContactModal}
              variant="outline"
              className="!w-full !px-7 !py-3.5 !text-[12px] !font-semibold !uppercase !tracking-[0.16em] sm:!w-auto sm:!py-3"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <Link
              href="/contact-us"
              className="group/link inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-gold"
            >
              Talk to us
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
            </Link>
          </motion.div>

          {SHOW_CONTACT_DETAILS ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.34, ease: EASE }}
            className="mt-8 flex w-full flex-col items-center gap-3 text-[14px] text-white/80 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-2 sm:text-[15px]"
          >
            {phoneLabel ? (
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full px-2 py-1 normal-case tracking-normal transition-all duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {phoneLabel}
              </a>
            ) : null}
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full px-2 py-1 break-all normal-case tracking-normal transition-all duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {contact.email}
              </a>
            ) : null}
            <span className="inline-flex max-w-[18rem] items-center justify-center gap-2 rounded-full px-2 py-1 text-center normal-case tracking-normal sm:max-w-none">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              {address}
            </span>
          </motion.div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
