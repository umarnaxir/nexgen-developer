"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import type { ServiceDefinition } from "../config";
import { getServiceHref } from "../config";

interface RelatedServicesSectionProps {
  services: ServiceDefinition[];
}

function RelatedServiceCard({
  service,
  index,
}: {
  service: ServiceDefinition;
  index: number;
}) {
  const image = service.content.image ?? "/images/services/website.png";

  return (
    <Link
      href={getServiceHref(service)}
      className="group premium-card-light relative flex h-[340px] w-[88vw] min-w-[300px] max-w-[560px] shrink-0 flex-col justify-end overflow-hidden rounded-xl border border-black/[0.06] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.2)] sm:h-[380px] sm:w-[460px] lg:h-[420px] lg:w-[520px]"
    >
      <Image
        src={image}
        alt={service.label}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 88vw, 520px"
        priority={index < 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      <span className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] text-white sm:text-lg">
          {service.label}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-all group-hover:gap-2.5 group-hover:text-teal-300">
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function RelatedServicesSection({ services }: RelatedServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const items = services.slice(0, 6);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      prefersReducedMotion ||
      !sectionRef.current ||
      !pinRef.current ||
      !trackRef.current ||
      !viewportRef.current ||
      items.length === 0
    ) {
      return;
    }

    const getScrollAmount = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return 0;
      return Math.max(track.scrollWidth - viewport.offsetWidth, 0);
    };

    const updateProgress = (progress: number) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.015)})`;
      }
    };

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.35)}`,
          pin: pinRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="section-light relative overflow-hidden border-t border-black/[0.06]"
      aria-label="Related services"
    >
      <div
        ref={pinRef}
        className="relative flex flex-col justify-start px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 lg:px-14 lg:pb-8 lg:pt-8"
      >
        <div
          ref={headerRef}
          className="container mx-auto mb-5 flex max-w-7xl shrink-0 items-end justify-between gap-4 sm:mb-6"
        >
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
              Explore more
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
              Related services
            </h2>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-all hover:gap-2.5 hover:text-teal-700"
            >
              All services
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-sm tabular-nums text-black/40">
              {String(items.length).padStart(2, "0")} services
            </span>
            <div className="h-px w-24 overflow-hidden bg-black/[0.08] lg:w-32">
              <div
                ref={progressRef}
                className="h-full origin-left bg-teal-600 transition-transform duration-150"
                style={{ transform: "scaleX(0.015)" }}
              />
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="related-services-viewport overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-5 will-change-transform sm:gap-6">
            {items.map((service, index) => (
              <RelatedServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="container mx-auto mt-4 max-w-7xl sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600"
          >
            All services
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
