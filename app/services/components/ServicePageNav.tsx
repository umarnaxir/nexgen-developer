"use client";

import { useEffect, useState } from "react";

export type ServiceNavItem = { id: string; label: string };

interface ServicePageNavProps {
  items: ServiceNavItem[];
}

export default function ServicePageNav({ items }: ServicePageNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.set(item.id, entry.intersectionRatio);
          } else {
            visible.delete(item.id);
          }
          let topId = items[0].id;
          let topRatio = 0;
          visible.forEach((ratio, id) => {
            if (ratio >= topRatio) {
              topRatio = ratio;
              topId = id;
            }
          });
          setActive(topId);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--site-nav-height)] z-30 border-b border-black/[0.06] bg-white/90 backdrop-blur-md"
    >
      <div className="section-container">
        <div className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:py-3 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors sm:px-4 sm:text-[13px] ${
                  isActive
                    ? "bg-gold text-primary"
                    : "text-black/50 hover:bg-gold/15 hover:text-gold-dark"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
