"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

export type ServiceNavItem = { id: string; label: string };

interface ServicePageNavProps {
  items: ServiceNavItem[];
}

function getSiteNavHeight() {
  const site = document.querySelector("header.fixed");
  return site instanceof HTMLElement ? site.getBoundingClientRect().height : 80;
}

function getScrollOffset() {
  const local = document.querySelector('nav[aria-label="On this page"]');
  const localH = local instanceof HTMLElement ? local.getBoundingClientRect().height : 52;
  return getSiteNavHeight() + localH + 8;
}

export default function ServicePageNav({ items }: ServicePageNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [pinned, setPinned] = useState(false);
  const ignoreSpyUntil = useRef(0);
  const didAlignHash = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const idsKey = items.map((item) => item.id).join("|");

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const syncPin = () => {
      setPinned(sentinel.getBoundingClientRect().top <= getSiteNavHeight());
    };

    syncPin();
    window.addEventListener("scroll", syncPin, { passive: true });
    window.addEventListener("resize", syncPin);
    return () => {
      window.removeEventListener("scroll", syncPin);
      window.removeEventListener("resize", syncPin);
    };
  }, []);

  useEffect(() => {
    const idList = idsKey.split("|").filter(Boolean);
    if (idList.length === 0) return;

    const syncFromScroll = () => {
      if (performance.now() < ignoreSpyUntil.current) return;
      const offset = getScrollOffset() + 4;
      let current = idList[0];
      for (const id of idList) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    return () => {
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
    };
  }, [idsKey]);

  useEffect(() => {
    if (didAlignHash.current) return;
    const hash = window.location.hash.replace(/^#/, "");
    const idList = idsKey.split("|").filter(Boolean);
    if (!hash || !idList.includes(hash)) return;
    didAlignHash.current = true;
    setActive(hash);
    ignoreSpyUntil.current = performance.now() + 900;
    const timer = window.setTimeout(() => scrollToSection(hash), 60);
    return () => window.clearTimeout(timer);
  }, [idsKey, scrollToSection]);

  if (items.length === 0) return null;

  const bar = (
    <nav
      ref={barRef}
      aria-label="On this page"
      className={`z-30 border-b border-black/[0.08] bg-white/95 backdrop-blur-md ${
        pinned ? "fixed inset-x-0 top-[var(--site-nav-height)]" : "relative"
      }`}
    >
      <div className="section-container">
        <LayoutGroup id="service-page-nav">
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:py-3 [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setActive(item.id);
                    ignoreSpyUntil.current = performance.now() + 900;
                    const url = `${window.location.pathname}${window.location.search}#${item.id}`;
                    window.history.replaceState(null, "", url);
                    scrollToSection(item.id);
                  }}
                  className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors sm:px-4 sm:text-[13px] ${
                    isActive ? "text-white" : "text-black/45 hover:text-black"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="service-page-nav-active"
                      className="absolute inset-0 rounded-full bg-black"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </nav>
  );

  return (
    <>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden />
      {bar}
      {pinned ? (
        <div
          aria-hidden
          style={{ height: barRef.current?.offsetHeight ?? 52 }}
        />
      ) : null}
    </>
  );
}
