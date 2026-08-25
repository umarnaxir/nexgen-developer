"use client";

import { motion } from "framer-motion";
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
  const hasLink = Boolean(member.profileUrl?.trim());
  const cardClass =
    "group relative aspect-[3/4] overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-900 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.2)]";

  const inner = (
    <>
      <MotionImage
        src={member.image}
        alt={`${member.name}, ${member.designation} at NexGen Developers`}
        title={`${member.name} — ${member.designation}`}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        priority={index < 4}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {hasLink ? (
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 bg-black/50 text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:right-4 sm:top-4">
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      ) : null}

      <span className="absolute left-3 top-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:left-4 sm:top-4">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <div className="h-px w-8 bg-gold/70 transition-all duration-300 group-hover:w-12" />
        <h3 className="mt-2 text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[11px] leading-snug text-white/60 sm:text-xs">
          {member.designation}
        </p>
      </div>
    </>
  );

  if (hasLink) {
    return (
      <motion.a
        href={member.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-aos="fade-up"
        data-aos-delay={Math.min(index * 60, 240)}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn(cardClass, "block cursor-pointer")}
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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cardClass}
    >
      {inner}
    </motion.article>
  );
}

export default function TeamGrid({ teamMembers }: TeamGridProps) {
  return (
    <section id="team" className="section-light section-y">
      <div className="section-container">
        <div
          className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between"
          data-aos="fade-up"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl lg:text-4xl">
              Developers, designers, and specialists.
            </h2>
          </div>
          <span className="text-sm tabular-nums text-black/40">
            {String(teamMembers.length).padStart(2, "0")} members
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id || member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
