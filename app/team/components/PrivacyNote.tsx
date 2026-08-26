"use client";

import { Lock } from "lucide-react";

export default function PrivacyNote() {
  return (
    <section className="section-light section-y border-t border-black/[0.06]">
      <div className="section-container">
        <div
          data-aos="fade-up"
          className="relative overflow-hidden rounded-[1.35rem] border border-gold/25 bg-[#111111] px-6 py-7 shadow-[0_24px_56px_-32px_rgba(0,0,0,0.45)] sm:px-8 sm:py-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(230,201,166,0.18),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(209,172,129,0.12),transparent_36%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/15 blur-3xl"
          />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-primary">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                Additional team members
              </h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-white/65">
                NexGen Developer also collaborates with several other skilled professionals. Due to
                privacy and confidentiality reasons, their details are not publicly listed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
