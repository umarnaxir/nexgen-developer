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
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { adminFetch } from "@/lib/admin/client";
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
    gallery: (initial?.gallery || []).join("\n"),
    link: initial?.link || "",
    technologies: (initial?.technologies || []).join(", "),
    category: initial?.category || "",
    features: (initial?.features || []).join("\n"),
    duration: initial?.duration || "",
    client: initial?.client || "",
    icon: initial?.icon || "Globe",
    color: initial?.color || "bg-teal-500",
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
        gallery: linesToArray(form.gallery),
        link: form.link.trim(),
        technologies: csvToArray(form.technologies),
        category: form.category.trim(),
        features: linesToArray(form.features),
        duration: form.duration.trim(),
        client: form.client.trim(),
        icon: form.icon,
        color: form.color.trim(),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminInput
              label="Title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Detailed description"
              value={form.detailedDescription}
              onChange={(e) => update("detailedDescription", e.target.value)}
              rows={5}
            />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload
              label="Image"
              folder="projects"
              value={form.image}
              onChange={(url) => update("image", url)}
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Gallery URLs"
              hint="One image URL per line (optional)"
              value={form.gallery}
              onChange={(e) => update("gallery", e.target.value)}
              rows={3}
            />
          </div>
          <AdminInput
            label="Link"
            value={form.link}
            onChange={(e) => update("link", e.target.value)}
            placeholder="https://"
          />
          <AdminInput
            label="Category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
          <div className="sm:col-span-2">
            <AdminInput
              label="Technologies"
              hint="Comma-separated"
              value={form.technologies}
              onChange={(e) => update("technologies", e.target.value)}
              placeholder="Next.js, TypeScript, MongoDB"
            />
          </div>
          <div className="sm:col-span-2">
            <AdminTextarea
              label="Features"
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
          <AdminSelect
            label="Icon"
            value={form.icon}
            onChange={(e) => update("icon", e.target.value)}
            options={PROJECT_ICON_OPTIONS.map((name) => ({
              value: name,
              label: name,
            }))}
          />
          <AdminInput
            label="Color"
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
            placeholder="bg-teal-500"
          />
          <AdminInput
            label="Order"
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value))}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500"
            />
            Featured project
          </label>
        </div>
      </div>

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
