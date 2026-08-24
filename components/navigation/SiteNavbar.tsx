"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Cpu,
  Facebook,
  Globe,
  MessageCircle,
  MousePointerClick,
  Palette,
  Search,
  Server,
  Share2,
  Smartphone,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Hamburger from "@/components/Navbar/Hamburger";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getServicesNavItems, type NavServiceItem } from "@/app/services/config";
import { sidebarLinks } from "./nav-config";

type SiteNavbarProps = {
  isAdminLoggedIn?: boolean;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type FlatService = { label: string; href: string; nested?: boolean };

const SERVICE_META: Record<string, { icon: LucideIcon; blurb: string }> = {
  "/services/website-development": {
    icon: Globe,
    blurb: "Custom sites, web apps, and platforms",
  },
  "/services/app-development": {
    icon: Smartphone,
    blurb: "iOS, Android, and cross-platform apps",
  },
  "/services/ai-ml": {
    icon: Cpu,
    blurb: "Automation, models, and intelligent systems",
  },
  "/services/chatbot-development": {
    icon: MessageCircle,
    blurb: "Conversational AI for support and sales",
  },
  "/services/maintenance-support": {
    icon: Wrench,
    blurb: "Updates, monitoring, and ongoing care",
  },
  "/services/deployment-devops": {
    icon: Server,
    blurb: "Cloud, CI/CD, and production reliability",
  },
  "/services/digital-marketing": {
    icon: TrendingUp,
    blurb: "Full-funnel campaigns that grow demand",
  },
  "/services/digital-marketing/seo": {
    icon: Search,
    blurb: "Rank higher and capture organic traffic",
  },
  "/services/digital-marketing/social-media-marketing": {
    icon: Share2,
    blurb: "Content and community that convert",
  },
  "/services/digital-marketing/graphic-designing": {
    icon: Palette,
    blurb: "Brand, visual identity, and creative assets",
  },
  "/services/digital-marketing/google-ads": {
    icon: MousePointerClick,
    blurb: "Search and performance campaigns",
  },
  "/services/digital-marketing/meta-ads": {
    icon: Facebook,
    blurb: "Facebook and Instagram advertising",
  },
};

function flattenServices(items: NavServiceItem[]): FlatService[] {
  return items.flatMap((item) => [
    { label: item.label, href: item.href },
    ...(item.children ?? []).map((child) => ({ ...child, nested: true })),
  ]);
}

function ServiceMenuLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const meta = SERVICE_META[href];
  const Icon = meta?.icon ?? Globe;

  return (
    <Link
      href={href}
      className={`group/item flex items-start gap-3 rounded-xl px-3 py-2 transition-all duration-200 ${
        active
          ? "bg-white/10 text-white"
          : "text-white/70 hover:bg-white/[0.06] hover:text-gold"
      }`}
    >
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
          active
            ? "border-gold bg-gold/20 text-gold"
            : "border-white/15 bg-white/[0.04] text-gold/80 group-hover/item:border-gold group-hover/item:bg-gold/15 group-hover/item:text-gold"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-medium leading-snug tracking-[-0.015em]">
            {label}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-gold/0 transition-all duration-200 group-hover/item:-translate-y-0 group-hover/item:translate-x-0.5 group-hover/item:text-gold" />
        </span>
        {meta?.blurb ? (
          <span className="mt-0.5 block text-[12.5px] leading-snug text-white/40 transition-colors duration-200 group-hover/item:text-gold/80">
            {meta.blurb}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

function navItemClass(active: boolean, solid: boolean) {
  return `relative px-2.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors duration-200 ${
    active
      ? "font-bold text-gold after:absolute after:inset-x-1 after:bottom-0 after:h-[1.5px] after:bg-gold"
      : solid
        ? "font-medium text-white/75 hover:text-gold"
        : "font-medium text-primary hover:text-gold-dark"
  }`;
}

export default function SiteNavbar({ isAdminLoggedIn = false }: SiteNavbarProps) {
  const pathname = usePathname();
  const { open: openContactModal } = useContactModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(pathname.startsWith("/services"));
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const serviceItems = getServicesNavItems();
  const allServices = flattenServices(serviceItems);
  const buildServices = serviceItems.filter((item) => item.href !== "/services/digital-marketing");
  const growParent = serviceItems.find((item) => item.href === "/services/digital-marketing");
  const growServices = growParent
    ? [
        { label: growParent.label, href: growParent.href, nested: false },
        ...(growParent.children ?? []).map((child) => ({ ...child, nested: true })),
      ]
    : [];

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openServices = () => {
    clearCloseTimer();
    setServicesOpen(true);
  };

  const closeServicesSoon = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setServicesOpen(false), 220);
  };

  const closeAll = useCallback(() => {
    clearCloseTimer();
    setServicesOpen(false);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    closeAll();
    setMobileServicesOpen(pathname.startsWith("/services"));
  }, [pathname, closeAll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [closeAll]);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-[9990] transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-gold/25 bg-[#111111] shadow-[0_12px_40px_-24px_rgba(4,3,3,0.55)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="shrink-0" aria-label="NexGen Developers home">
          <Image
            src="/logo/logo.png"
            alt="NexGen Developers"
            width={48}
            height={48}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {sidebarLinks.map((link) => {
            if (link.href === "/services") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServicesSoon}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    onClick={() => setServicesOpen((open) => !open)}
                    className={`inline-flex items-center gap-0.5 ${navItemClass(servicesActive, solid)}`}
                  >
                    Services
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={menuId}
                    role="navigation"
                    aria-label="Services"
                    aria-hidden={!servicesOpen}
                    className={`absolute left-1/2 top-full z-50 w-[min(54rem,calc(100vw-2.5rem))] origin-top -translate-x-1/2 pt-3 xl:w-[58rem] ${
                      servicesOpen
                        ? "pointer-events-auto visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible -translate-y-1.5 opacity-0"
                    } transition-[opacity,transform] duration-200 ease-out`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-gold/30 bg-[#111111] shadow-[0_28px_80px_-24px_rgba(4,3,3,0.65)]">
                      <div className="grid grid-cols-2 gap-x-8 px-5 py-4">
                        <div>
                          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                            Build
                          </p>
                          <div className="space-y-0.5">
                            {buildServices.map((item) => (
                              <ServiceMenuLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                active={pathname === item.href}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="border-l border-gold/25 pl-8">
                          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                            Grow
                          </p>
                          <div className="space-y-0.5">
                            {growServices.map((item) => (
                              <ServiceMenuLink
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                active={pathname === item.href}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-gold/20 bg-white/[0.04] px-8 py-3.5">
                        <Link
                          href="/services"
                          className="group/all inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                        >
                          View all services
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
                        </Link>
                        <p className="hidden text-[12px] tracking-[-0.01em] text-white/45 sm:block">
                          Product, growth, and ongoing support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={navItemClass(isActivePath(pathname, link.href), solid)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center lg:flex">
          {isAdminLoggedIn ? (
            <Link
              href="/admin/dashboard"
              className="btn-gold inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold"
            >
              Admin
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={openContactModal}
              className="btn-gold inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          <Hamburger
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            forceWhite={solid}
          />
        </div>
        </div>
      </div>

      <div
        className={`lg:hidden ${
          mobileOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        } fixed inset-x-0 bottom-0 top-[4.5rem] bg-[#111111] transition-opacity duration-300 sm:top-20`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => {
                if (link.href === "/services") {
                  return (
                    <li key={link.href}>
                      <div className="flex items-center">
                        <Link
                          href="/services"
                          onClick={closeAll}
                          className={`flex-1 py-3 text-2xl tracking-[-0.03em] ${
                            servicesActive ? "font-bold text-gold" : "font-semibold text-white/80"
                          }`}
                        >
                          Services
                        </Link>
                        <button
                          type="button"
                          aria-expanded={mobileServicesOpen}
                          onClick={() => setMobileServicesOpen((open) => !open)}
                          className="flex h-11 w-11 items-center justify-center text-gold"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <div
                        className={`grid ${
                          mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        } transition-[grid-template-rows,opacity] duration-300`}
                      >
                        <ul className="min-h-0 space-y-0.5 overflow-hidden border-l border-gold/30 py-2 pl-4">
                          {allServices.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={closeAll}
                                className={`block rounded-lg py-2.5 pr-3 text-[15px] ${
                                  item.nested ? "pl-4 text-sm" : "pl-1"
                                } ${
                                  pathname === item.href
                                    ? "font-semibold text-gold"
                                    : "text-white/60 hover:text-gold"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className={`block py-3 text-2xl tracking-[-0.03em] ${
                        active ? "font-bold text-gold" : "font-semibold text-white/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-gold/25 pt-5">
            {isAdminLoggedIn ? (
              <Link
                href="/admin/dashboard"
                onClick={closeAll}
                className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                Go to Admin Panel
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeAll();
                  openContactModal();
                }}
                className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}
