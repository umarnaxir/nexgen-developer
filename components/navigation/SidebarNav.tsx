"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { sidebarLinks, SIDEBAR_PANEL_WIDTH } from "./nav-config";
import { getServicesNavItems } from "@/app/services/config";

type SidebarNavProps = {
  isAdminLoggedIn?: boolean;
};

export default function SidebarNav({ isAdminLoggedIn = false }: SidebarNavProps) {
  const pathname = usePathname();
  const { open: openContactModal } = useContactModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isServicesOpen, setIsServicesOpen] = React.useState(pathname.startsWith("/services"));

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const setClosedState = useCallback(() => {
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { xPercent: -100 });
    gsap.set(lineRef.current, { scaleY: 0, opacity: 0 });
    gsap.set(headerRef.current, { y: -12, opacity: 0 });
    gsap.set(linksRef.current.filter(Boolean), { x: 0, opacity: 1 });
    gsap.set(metaRef.current, { y: 0, opacity: 1 });
  }, []);

  const setOpenState = useCallback(() => {
    gsap.set(backdropRef.current, { opacity: 1 });
    gsap.set(panelRef.current, { xPercent: 0 });
    gsap.set(lineRef.current, { scaleY: 1, opacity: 1 });
    gsap.set(headerRef.current, { y: 0, opacity: 1 });
    gsap.set(linksRef.current.filter(Boolean), { x: 0, opacity: 1 });
    gsap.set(metaRef.current, { y: 0, opacity: 1 });
  }, []);

  const closeMenu = useCallback(
    (immediate = false) => {
      if (!isOpenRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (immediate || prefersReducedMotion || !tlRef.current) {
        tlRef.current?.progress(0).pause();
        setClosedState();
        isOpenRef.current = false;
        isAnimatingRef.current = false;
        setIsOpen(false);
        return;
      }

      if (isAnimatingRef.current && tlRef.current.reversed()) return;

      isAnimatingRef.current = true;
      tlRef.current.eventCallback("onReverseComplete", () => {
        setClosedState();
        isOpenRef.current = false;
        isAnimatingRef.current = false;
        setIsOpen(false);
        tlRef.current?.eventCallback("onReverseComplete", null);
      });
      tlRef.current.reverse();
    },
    [setClosedState]
  );

  const openMenu = useCallback(() => {
    if (isOpenRef.current || isAnimatingRef.current) return;

    isOpenRef.current = true;
    setIsOpen(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !tlRef.current) {
      setOpenState();
      return;
    }

    isAnimatingRef.current = true;
    tlRef.current.eventCallback("onComplete", () => {
      isAnimatingRef.current = false;
      tlRef.current?.eventCallback("onComplete", null);
    });
    tlRef.current.play(0);
  }, [setOpenState]);

  const toggleMenu = useCallback(() => {
    if (isOpenRef.current) {
      closeMenu();
      return;
    }
    openMenu();
  }, [closeMenu, openMenu]);

  useEffect(() => {
    registerGsapPlugins();

    setClosedState();

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    )
      .fromTo(
        panelRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.65, ease: "power3.inOut" },
        "-=0.25"
      )
      .fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(
        headerRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        linksRef.current.filter(Boolean),
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(
        metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

    tl.progress(0).pause();

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [setClosedState]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpenRef.current) closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    setIsServicesOpen(pathname.startsWith("/services"));
    closeMenu(true);
  }, [pathname, closeMenu]);

  const serviceItems = getServicesNavItems().flatMap((service) => [
    { label: service.label, href: service.href },
    ...(service.children || []),
  ]);

  return (
    <>
      {!isOpen && (
        <div className="fixed left-0 top-0 z-[9990] flex h-screen w-[5vw] flex-col items-center justify-between border-r border-white/[0.08] bg-black px-2 py-4">
          <Link
            href="/"
            className="flex aspect-square w-full max-w-[3.25rem] items-center justify-center p-3 transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label="NexGen Developers home"
          >
            <Image
              src="/logo/logo.png"
              alt="NexGen Developers"
              width={80}
              height={80}
              className="h-full w-full object-contain"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open navigation menu"
            aria-expanded={false}
            className="group flex aspect-square w-full max-w-[3.25rem] items-center justify-center p-3 text-white transition-colors hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <ChevronRight
              className="h-6 w-6 stroke-[2.5px] transition-transform duration-300 group-hover:translate-x-0.5 sm:h-7 sm:w-7"
              aria-hidden
            />
          </button>
        </div>
      )}

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[9995] overflow-hidden ${
          isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div
          ref={backdropRef}
          className="absolute bottom-0 right-0 top-0 bg-black/70 backdrop-blur-[2px]"
          style={{ left: SIDEBAR_PANEL_WIDTH }}
          onClick={() => closeMenu()}
          aria-hidden
        />

        <aside
          ref={panelRef}
          style={{
            left: 0,
            width: SIDEBAR_PANEL_WIDTH,
            maxWidth: "min(380px, 85vw)",
          }}
          className="absolute top-0 flex h-full flex-col overflow-hidden border-r border-white/[0.08] bg-black text-white shadow-[20px_0_80px_-20px_rgba(0,0,0,0.9)] will-change-transform"
        >
          <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] px-4 sm:px-5">
            <div
              ref={headerRef}
              className="flex shrink-0 items-start justify-between border-b border-white/[0.08] py-5 sm:py-6"
            >
              <Link
                href="/"
                onClick={() => closeMenu(true)}
                className="inline-block transition-opacity hover:opacity-90"
                aria-label="NexGen Developers home"
              >
                <Image
                  src="/logo/logo.png"
                  alt="NexGen Developers"
                  width={56}
                  height={56}
                  className="h-10 w-10 object-contain sm:h-11 sm:w-11"
                />
              </Link>
              <button
                type="button"
                onClick={() => closeMenu()}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav
              aria-label="Primary"
              className="relative min-h-0 overflow-y-auto py-4 sm:py-5"
            >
              <div className="pb-2">
                <Link
                  ref={(el) => {
                    linksRef.current[0] = el;
                  }}
                  href="/"
                  onClick={() => closeMenu(true)}
                  className={`group flex min-w-0 items-center gap-3 rounded-lg py-2.5 transition-all duration-300 sm:gap-3.5 sm:py-3 ${
                    pathname === "/"
                      ? "text-white"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="w-6 shrink-0 text-[10px] font-medium tabular-nums tracking-widest text-white/25">
                    01
                  </span>
                  <span className="min-w-0 truncate text-[1.45rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.6rem] lg:text-[1.75rem]">
                    Home
                  </span>
                </Link>
                <div
                  className={`group flex min-w-0 items-center gap-3 rounded-lg transition-all duration-300 sm:gap-3.5 ${
                    pathname === "/services" || pathname.startsWith("/services/")
                      ? "text-white"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Link
                    ref={(el) => {
                      linksRef.current[1] = el;
                    }}
                    href="/services"
                    onClick={() => closeMenu(true)}
                    className="flex min-w-0 flex-1 items-center gap-3 py-2.5 sm:gap-3.5 sm:py-3"
                  >
                    <span className="w-6 shrink-0 text-[10px] font-medium tabular-nums tracking-widest text-white/25">
                      02
                    </span>
                    <span className="min-w-0 truncate text-[1.45rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.6rem] lg:text-[1.75rem]">
                      Services
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen((open) => !open)}
                    aria-label={`${isServicesOpen ? "Collapse" : "Expand"} services menu`}
                    aria-expanded={isServicesOpen}
                    className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </div>
                <div
                  className={`ml-9 grid transition-[grid-template-rows,opacity] duration-300 sm:ml-10 ${
                    isServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden border-l border-white/10 pl-4">
                    <ul className="space-y-0.5 py-1.5">
                      {serviceItems.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={() => closeMenu(true)}
                            className={`block rounded-md px-2 py-2 text-sm font-medium transition-colors sm:text-[0.95rem] ${
                              pathname === service.href
                                ? "bg-white/[0.08] text-white"
                                : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                            }`}
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <ul className="relative space-y-0.5 sm:space-y-1">
                <div
                  ref={lineRef}
                  className="absolute right-0 top-0 h-full w-px origin-top bg-white/10"
                />
                {sidebarLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const isServices = link.href === "/services";

                  if (isServices || link.href === "/") return null;

                  return (
                    <li key={link.href}>
                      <Link
                        ref={(el) => {
                          linksRef.current[index] = el;
                        }}
                        href={link.href}
                        onClick={() => closeMenu(true)}
                        className={`group flex min-w-0 items-center gap-3 rounded-lg py-2.5 transition-all duration-300 sm:gap-3.5 sm:py-3 ${
                          isActive
                            ? "text-white"
                            : "text-white/40 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span className="w-6 shrink-0 text-[10px] font-medium tabular-nums tracking-widest text-white/25">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 truncate text-[1.45rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.6rem] lg:text-[1.75rem]">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div ref={metaRef} className="shrink-0 border-t border-white/[0.08] py-5 sm:py-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
                Get in touch
              </p>
              <a
                href="mailto:workwithnexgen@gmail.com"
                className="mt-2.5 block text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                workwithnexgen@gmail.com
              </a>
              {isAdminLoggedIn ? (
                <Link
                  href="/admin/dashboard"
                  onClick={() => closeMenu(true)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
                >
                  Go to Admin Panel
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu(true);
                    openContactModal();
                  }}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-[0.98]"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
