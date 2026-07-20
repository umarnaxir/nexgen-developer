"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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
      className="group relative flex h-[250px] w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl border border-black/[0.06] shadow-[0_20px_48px_-32px_rgba(0,0,0,0.25)] sm:h-[270px] sm:w-[calc((100%-1rem)/2)] lg:h-[290px] lg:w-[calc((100%-2rem)/3)]"
    >
      <Image
        src={image}
        alt={service.label}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={index < 3}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      <span className="absolute left-3.5 top-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = services.slice(0, 6);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.95;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
      aria-label="Related services"
    >
      <div className="section-container">
        <div
          className="mb-5 flex items-end justify-between gap-4 sm:mb-6"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
              Related services
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-teal-600 transition-all hover:gap-2.5 hover:text-teal-700"
          >
            All services
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {items.map((service, index) => (
            <RelatedServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => scrollByDir(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:border-teal-600/40 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next services"
            onClick={() => scrollByDir(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:border-teal-600/40 hover:text-teal-700"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
