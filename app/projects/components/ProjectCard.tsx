"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { createPortal } from "react-dom";
import { resolveProjectIcon } from "@/lib/content/project-icons";

export type ProjectData = {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  link: string;
  technologies: string[];
  category: string;
  features: string[];
  duration: string;
  client: string;
  icon: LucideIcon | string;
  color: string;
};

type ProjectCardProps = {
  project: ProjectData;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export default function ProjectCard({
  project,
  index,
  isExpanded,
  onToggleExpand,
}: ProjectCardProps) {
  const IconComponent =
    typeof project.icon === "string"
      ? resolveProjectIcon(project.icon)
      : project.icon;
  const imageLeft = index % 2 === 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onToggleExpand();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded, onToggleExpand]);

  const modal = (
    <AnimatePresence>
      {isExpanded ? (
        <motion.div
          key={`overlay-${project.id}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-5 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggleExpand}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto flex h-[70vh] max-h-[70vh] w-[calc(100%-2rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-neutral-950 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] sm:w-full"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/15 blur-3xl"
            />

            <div className="relative flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-4 sm:px-7">
              <span className="inline-flex items-center gap-2 rounded-lg border border-teal-400/25 bg-teal-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-300">
                <IconComponent className="h-3.5 w-3.5" />
                {project.category}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={onToggleExpand}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-teal-400/40 hover:text-teal-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
              <h2
                id={`project-modal-title-${project.id}`}
                className="text-xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-2xl lg:text-[1.75rem]"
              >
                {project.title}
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/50">
                {project.description}
              </p>

              <div className="mt-6">
                <div className="mb-2.5 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-teal-300" />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Technologies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/65"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/45">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-300/80" />
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-300/80" />
                  <span className="font-medium">{project.client}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/[0.08] pt-6">
                <h3 className="text-base font-semibold text-white">Project Details</h3>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                  {project.detailedDescription}
                </p>

                <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-teal-300" />
                  Key Features
                </h4>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + featureIndex * 0.03 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-300" />
                      <span className="text-[13px] leading-snug text-white/65">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex shrink-0 flex-wrap gap-2.5 border-t border-white/[0.08] px-5 py-4 sm:px-7">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 sm:flex-none"
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={onToggleExpand}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-300 transition-colors hover:bg-teal-500/20 sm:flex-none"
              >
                Show Less
                <ArrowRight className="h-3.5 w-3.5 rotate-90" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <motion.article
        layout
        data-aos="fade-up"
        data-aos-delay={Math.min(index * 60, 180)}
        className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_24px_64px_-40px_rgba(0,0,0,0.18)]"
      >
        <div className={`flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          <div className="relative w-full overflow-hidden lg:w-[46%] lg:min-h-[420px]">
            <div className="relative aspect-[16/11] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
            </div>

            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-teal-300 backdrop-blur-md sm:left-5 sm:top-5">
              <IconComponent className="h-3.5 w-3.5" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                {project.category}
              </span>
            </div>

            <span className="absolute bottom-4 right-4 z-10 text-[11px] font-semibold tabular-nums tracking-[0.2em] text-white/50 sm:bottom-5 sm:right-5">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex w-full flex-col lg:w-[54%]">
            <div className="h-px w-full bg-gradient-to-r from-teal-500/50 via-teal-500/20 to-transparent" />

            <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
              <div className="mb-5">
                <h2 className="text-xl font-semibold leading-snug tracking-[-0.03em] text-black sm:text-2xl lg:text-[1.75rem]">
                  {project.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-black/55">{project.description}</p>
              </div>

              <div className="mb-5">
                <div className="mb-2.5 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-teal-700" />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                    Technologies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-black/[0.06] bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-black/65 transition-colors hover:border-teal-500/30 hover:text-teal-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-4 text-sm text-black/50">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-700/80" />
                  <span className="font-medium">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-700/80" />
                  <span className="font-medium">{project.client}</span>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2.5 border-t border-black/[0.06] pt-5">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-900 sm:flex-none"
                >
                  Visit Website
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.a>
                <motion.button
                  type="button"
                  onClick={onToggleExpand}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-teal-500/30 hover:text-teal-800 sm:flex-none"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
