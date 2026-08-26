"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/ui/AdminInput";
import {
  AdminFieldMeta,
  AdminFormSection,
} from "@/components/admin/ui/AdminFormSection";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields, getCmsMeta } from "@/lib/content/cms-fields";
import { PROJECT_ICON_OPTIONS } from "@/lib/content/project-icons";
import type { Project } from "@/lib/content/types";

type ProjectFormProps = {
  initial?: Project;
  mode: "create" | "edit";
};

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function csvToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProjectForm({ initial, mode }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title || "",
    description: initial?.description || "",
    detailedDescription: initial?.detailedDescription || "",
    image: initial?.image || "",
    link: initial?.link || "",
    technologies: (initial?.technologies || []).join(", "),
    category: initial?.category || "",
    features: (initial?.features || []).join("\n"),
    duration: initial?.duration || "",
    client: initial?.client || "",
    icon: initial?.icon || "Globe",
    featured: initial?.featured || false,
    order: initial?.order ?? 1,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        detailedDescription: form.detailedDescription.trim(),
        image: form.image,
        gallery: initial?.gallery || [],
        link: form.link.trim(),
        technologies: csvToArray(form.technologies),
        category: form.category.trim(),
        features: linesToArray(form.features),
        duration: form.duration.trim(),
        client: form.client.trim(),
        icon: form.icon,
        color: initial?.color || "bg-gold",
        featured: form.featured,
        order: Number(form.order) || 1,
      };

      if (mode === "create") {
        await adminFetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Project created");
      } else if (initial) {
        await adminFetch(`/api/admin/projects/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Project updated");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  const sections = cmsFields.projects.sections;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminFormSection
        title={sections[0].title}
        description={sections[0].description}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminInput
              label="Title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
            <AdminFieldMeta
              paths={getCmsMeta("projects", "title")?.frontend || []}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
            />
            <AdminFieldMeta
              paths={getCmsMeta("projects", "description")?.frontend || []}
              className="mt-1"
            />
          </div>
          <AdminInput
            label="Category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
          <AdminSelect
            label="Category icon"
            value={form.icon}
            onChange={(e) => update("icon", e.target.value)}
            options={PROJECT_ICON_OPTIONS.map((name) => ({
              value: name,
              label: name,
            }))}
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title={sections[1].title}
        description={sections[1].description}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Detailed description"
              value={form.detailedDescription}
              onChange={(e) => update("detailedDescription", e.target.value)}
              rows={5}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Key features"
              hint="One feature per line"
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
              rows={4}
            />
          </div>
          <AdminInput
            label="Duration"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            placeholder="15 - 20 days"
          />
          <AdminInput
            label="Client"
            value={form.client}
            onChange={(e) => update("client", e.target.value)}
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title={sections[2].title}
        description={sections[2].description}
      >
        <div className="grid gap-4">
          <ImageUpload
            label="Cover image"
            folder="projects"
            value={form.image}
            onChange={(url) => update("image", url)}
          />
          <AdminInput
            label="Live project URL"
            value={form.link}
            onChange={(e) => update("link", e.target.value)}
            placeholder="https://"
          />
          <AdminInput
            label="Technologies"
            hint="Comma-separated — shown as tags on /projects"
            value={form.technologies}
            onChange={(e) => update("technologies", e.target.value)}
            placeholder="Next.js, TypeScript, MongoDB"
          />
        </div>
      </AdminFormSection>

      <AdminFormSection
        title={sections[3].title}
        description={sections[3].description}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Sort order"
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value))}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-primary">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-gold/35 text-gold-dark focus:ring-gold-dark"
            />
            Featured on home page
          </label>
        </div>
      </AdminFormSection>

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Create project" : "Save changes"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </AdminButton>
      </div>
    </form>
  );
}
