"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ExternalLink, Pencil, Star, Trash2, Users } from "lucide-react";
import { resolveProjectIcon } from "@/lib/content/project-icons";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type AdminProjectCardProps = {
  project: Project;
  index: number;
  canDelete?: boolean;
  onDelete?: () => void;
};

export function AdminProjectCard({
  project,
  index,
  canDelete,
  onDelete,
}: AdminProjectCardProps) {
  const Icon = resolveProjectIcon(project.icon);

  return (
    <article className="group overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-[0_24px_64px_-40px_rgba(230,201,166,0.45)] transition hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_28px_72px_-36px_rgba(230,201,166,0.65)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-soft">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg border border-gold/35 bg-black/50 px-2.5 py-1 text-gold backdrop-blur-md">
          <Icon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
            {project.category || "Project"}
          </span>
        </div>
        {project.featured ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-primary">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 text-[10px] font-semibold tabular-nums tracking-[0.2em] text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-primary sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-gray">
          {project.description}
        </p>

        {project.technologies.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-gold/20 bg-background-soft px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 ? (
              <span className="text-[10px] text-text-gray">
                +{project.technologies.length - 4}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-gray">
          {project.duration ? (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gold-dark" />
              {project.duration}
            </span>
          ) : null}
          {project.client ? (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gold-dark" />
              {project.client}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-gold/15 pt-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-gold-dark hover:text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live site
            </a>
          ) : null}
          <div className="ml-auto flex gap-2">
            <Link href={`/admin/projects/${project.id}`}>
              <AdminButton size="sm" variant="secondary">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </AdminButton>
            </Link>
            {canDelete && onDelete ? (
              <AdminButton
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </AdminButton>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

type AdminServiceCardProps = {
  service: {
    id: string;
    label: string;
    slug: string;
    category: string;
    enabled: boolean;
    content: { description: string; image: string; benefits: string[] };
    parentSlug?: string | null;
  };
  canDelete?: boolean;
  onDelete?: () => void;
};

export function AdminServiceCard({
  service,
  canDelete,
  onDelete,
}: AdminServiceCardProps) {
  const href =
    service.parentSlug === "digital-marketing"
      ? `/services/digital-marketing/${service.slug}`
      : `/services/${service.slug}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-sm transition hover:border-gold hover:shadow-md">
      <div className="relative aspect-[16/10] bg-background-soft">
        {service.content.image ? (
          <Image
            src={service.content.image}
            alt={service.label}
            fill
            className="object-cover"
            sizes="33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            service.enabled
              ? "bg-gold text-primary"
              : "bg-primary/70 text-gold-light"
          )}
        >
          {service.enabled ? "Active" : "Hidden"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-primary">{service.label}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-text-gray">
          {service.content.description}
        </p>
        <p className="mt-2 text-[11px] capitalize text-gold-dark">{service.category}</p>
        <div className="mt-3 flex flex-wrap gap-2 border-t border-gold/15 pt-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-gold-dark hover:text-primary"
          >
            View on site →
          </a>
          <div className="ml-auto flex gap-2">
            <Link href={`/admin/services/${service.id}`}>
              <AdminButton size="sm" variant="secondary">
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </AdminButton>
            </Link>
            {canDelete && onDelete ? (
              <AdminButton
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </AdminButton>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
