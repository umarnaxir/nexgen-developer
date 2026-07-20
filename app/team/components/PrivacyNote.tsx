"use client";

import { Lock } from "lucide-react";

export default function PrivacyNote() {
  return (
    <section className="section-light section-y border-t border-black/[0.06]">
      <div className="section-container">
        <div
          data-aos="fade-up"
          className="relative overflow-hidden rounded-xl border border-teal-500/20 bg-teal-500/[0.08] p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/25 bg-teal-500/10 text-teal-700">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-black sm:text-xl">
                Additional team members
              </h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-black/60">
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
