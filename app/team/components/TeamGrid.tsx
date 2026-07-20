"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers } from "../data";

export default function TeamGrid() {
  return (
    <section className="section-light section-y">
      <div className="section-container">
        <div
          className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl lg:text-4xl">
              Talent across every discipline.
            </h2>
          </div>
          <span className="text-sm tabular-nums text-black/40">
            {String(teamMembers.length).padStart(2, "0")} members
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 60, 240)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-900 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.2)]"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:left-4 sm:top-4">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <div className="h-px w-8 bg-teal-400/70 transition-all duration-300 group-hover:w-12" />
                <h3 className="mt-2 text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-[11px] leading-snug text-white/60 sm:text-xs">{member.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
