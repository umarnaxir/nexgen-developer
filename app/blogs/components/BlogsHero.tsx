"use client";

import GalaxyBackground from "@/components/GalaxyBackground";

export default function BlogsHero() {
  return (
    <header className="section-dark relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      <div className="section-container relative z-10">
        <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-8 bg-white/40" />
          Our Blog
        </span>
        <h1 className="w-full text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
          Insights & updates.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
          Tips and updates from the NexGen Developers team.
        </p>
      </div>
    </header>
  );
}
