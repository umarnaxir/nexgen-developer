"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MotionImage from "@/components/motion/MotionImage";
import { homeServices, type HomeService } from "./data";

function ServiceCard({
  service,
  index,
  variant = "desktop",
}: {
  service: HomeService;
  index: number;
  variant?: "mobile" | "desktop";
}) {
  const ServiceIcon = service.icon;
  const isMobile = variant === "mobile";

  return (
    <article
      className={
        isMobile
          ? "services-mobile-card group relative shrink-0 overflow-hidden rounded-2xl bg-neutral-900"
          : "group relative h-[min(56vh,500px)] w-[70vw] max-w-[720px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out hover:-translate-y-1 lg:h-[min(62vh,620px)] lg:w-[calc(54vw-1.5rem)] lg:max-w-[880px]"
      }
    >
      <MotionImage
        src={service.image}
        alt={service.title}
        fill
        sizes={isMobile ? "88vw" : "(max-width: 1024px) 70vw, 54vw"}
        priority={index < 2}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
            <ServiceIcon className="h-4 w-4" />
          </span>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-tight text-white sm:text-2xl">
          {service.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/75 sm:text-sm">
          {service.description}
        </p>

        {!isMobile ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {service.highlights.map((highlight) => (
              <li key={highlight}>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/85">
                  <Sparkles className="h-2.5 w-2.5" />
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          href={service.href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white sm:mt-5"
        >
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const desktopViewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    registerGsapPlugins();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;
    if (!sectionRef.current || !pinRef.current || !desktopTrackRef.current || !desktopViewportRef.current) {
      return;
    }

    const getNavOffset = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--site-nav-height").trim() || "5rem";
      const probe = document.createElement("div");
      probe.style.height = raw;
      document.body.appendChild(probe);
      const px = probe.getBoundingClientRect().height;
      probe.remove();
      return Math.ceil(px) || 80;
    };

    const getScrollAmount = () => {
      const track = desktopTrackRef.current;
      const viewport = desktopViewportRef.current;
      if (!track || !viewport) return 0;
      return Math.max(track.scrollWidth - viewport.offsetWidth, 0);
    };

    const ctx = gsap.context(() => {
      gsap.to(desktopTrackRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => `top ${getNavOffset()}px`,
          end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.5)}`,
          pin: pinRef.current,
          scrub: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${Math.max(self.progress, 0.015)})`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const card = scroller.querySelector("article");
      const width = card instanceof HTMLElement ? card.offsetWidth + 12 : scroller.clientWidth;
      if (!width) return;
      const next = Math.round(scroller.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(next, 0), homeServices.length - 1));
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-[var(--site-nav-height)] bg-white text-black"
      aria-label="Services"
    >
      <div className="px-4 py-6 sm:px-6 md:hidden lg:px-14">
        <div className="mx-auto w-full max-w-7xl" data-aos="fade-up">
        <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
          Services
        </span>
        <h2 className="mt-3 text-[1.9rem] font-bold leading-[1.15] tracking-[-0.03em] text-black">
          <span className="block">Everything you need to</span>
          <span className="block">
            launch and <span className="text-gold-dark">scale.</span>
          </span>
        </h2>

        <div ref={mobileScrollerRef} className="services-mobile-scroller mt-6">
          {homeServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} variant="mobile" />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden>
          {homeServices.map((service, index) => (
            <span
              key={service.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-5 bg-gold-dark" : "w-1.5 bg-gold/40"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/services"
            className="text-sm font-semibold text-gold-dark underline decoration-gold/80 decoration-2 underline-offset-[6px]"
          >
            View all services
          </Link>
        </div>
        </div>
      </div>

      <div
        ref={pinRef}
        className="relative hidden h-[calc(100svh-var(--site-nav-height))] min-h-[calc(100svh-var(--site-nav-height))] px-4 py-5 sm:px-6 md:flex md:flex-col lg:px-14"
      >
        <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <div className="mb-4 flex w-full shrink-0 items-end justify-between gap-6">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
              Services
            </span>
            <h2 className="mt-3 text-[clamp(1.35rem,3.4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-black">
              Everything you need to launch and <span className="text-gold-dark">scale.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm tabular-nums text-black/45">
              {String(homeServices.length).padStart(2, "0")} services
            </span>
            <div className="h-px w-40 overflow-hidden bg-gold/30">
              <div
                ref={progressRef}
                className="h-full origin-left bg-gold-dark"
                style={{ transform: "scaleX(0.015)" }}
              />
            </div>
          </div>
        </div>

        <div ref={desktopViewportRef} className="min-h-0 flex-1 overflow-hidden">
          <div ref={desktopTrackRef} className="flex h-full w-max gap-4">
            {homeServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} variant="desktop" />
            ))}
          </div>
        </div>

        <div className="mt-4 flex shrink-0 justify-end">
          <Link
            href="/services"
            className="text-[15px] font-semibold text-gold-dark underline decoration-gold/80 decoration-2 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary"
          >
            View all services
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
