"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MotionImage from "@/components/motion/MotionImage";
import type { TeamMember } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type TeamGridProps = {
  teamMembers: TeamMember[];
};

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const hasLink = Boolean(member.profileUrl?.trim());
  const number = String(index + 1).padStart(2, "0");

  const cardClass = cn(
    "group relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-gold/25 bg-neutral-900 shadow-[0_24px_56px_-36px_rgba(0,0,0,0.45)]",
    hasLink && "cursor-pointer"
  );

  const inner = (
    <>
      <MotionImage
        src={member.image}
        alt={`${member.name}, ${member.designation} at NexGen Developers`}
        title={`${member.name} — ${member.designation}`}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        priority={index < 4}
        className="object-top"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(230,201,166,0.22),transparent_42%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {hasLink ? (
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-black/50 text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-4 sm:top-4">
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      ) : null}

      <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tabular-nums tracking-[0.2em] text-white/55 sm:left-4 sm:top-4">
        {number}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <div className="h-px w-8 bg-gold/80 transition-all duration-300 group-hover:w-12" />
        <h3 className="mt-2 text-sm font-semibold tracking-[-0.03em] text-white sm:text-base">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[11px] leading-snug text-white/60 sm:text-xs">
          {member.designation}
        </p>
      </div>
    </>
  );

  const hover = reduceMotion ? undefined : { y: -6 };

  if (hasLink) {
    return (
      <motion.a
        href={member.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-aos="fade-up"
        data-aos-delay={Math.min(index * 60, 240)}
        whileHover={hover}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn(
          cardClass,
          "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        )}
        aria-label={`Open ${member.name}'s profile`}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.article
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 60, 240)}
      whileHover={hover}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cardClass}
    >
      {inner}
    </motion.article>
  );
}

export default function TeamGrid({ teamMembers }: TeamGridProps) {
  return (
    <section
      id="team"
      className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-[320px] w-[320px] rounded-full bg-gold-dark/[0.08] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-[240px] w-[240px] rounded-full bg-gold/[0.06] blur-[90px]"
      />

      <div className="section-container relative z-10">
        <div
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              Developers, designers, and specialists.
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-sm tabular-nums text-gold-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
            {String(teamMembers.length).padStart(2, "0")} members
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.id || member.name}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
