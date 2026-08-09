"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { adminFetch } from "@/lib/admin/client";
import type { TeamMember } from "@/lib/content/types";

type TeamFormProps = {
  initial?: TeamMember;
  mode: "create" | "edit";
};

export function TeamForm({ initial, mode }: TeamFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name || "",
    designation: initial?.designation || "",
    image: initial?.image || "",
    enabled: initial?.enabled ?? true,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.designation.trim()) {
      toast.error("Designation is required");
      return;
    }
    if (!form.image.trim()) {
      toast.error("Profile image is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        designation: form.designation.trim(),
        image: form.image,
        email: initial?.email || "",
        phone: initial?.phone || "",
        socialLinks: initial?.socialLinks || {
          linkedin: "",
          twitter: "",
          github: "",
          instagram: "",
        },
        role: initial?.role || "member",
        enabled: form.enabled,
        order: initial?.order ?? 1,
      };

      if (mode === "create") {
        await adminFetch("/api/admin/team", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Team member created");
      } else if (initial) {
        await adminFetch(`/api/admin/team/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Team member updated");
      }

      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save member");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-5 sm:p-6">
        <p className="mb-4 text-sm text-neutral-500">
          These fields appear on the Team page: photo, name, and designation.
        </p>
        <div className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:items-start">
          <ImageUpload
            label="Profile Image"
            folder="team"
            value={form.image}
            onChange={(url) => update("image", url)}
            size="compact"
          />
          <div className="grid gap-4">
            <AdminInput
              label="Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter name"
              required
            />
            <AdminInput
              label="Designation"
              value={form.designation}
              onChange={(e) => update("designation", e.target.value)}
              placeholder="Enter designation"
              required
            />
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500"
              />
              <span>
                <span className="block text-sm font-medium text-neutral-800">
                  Visible on frontend
                </span>
                <span className="mt-0.5 block text-xs text-neutral-500">
                  {form.enabled
                    ? "This member will show on the public Team page."
                    : "Hidden from the public Team page (still kept in admin)."}
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Add member"
              : "Save changes"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/team")}
        >
          Cancel
        </AdminButton>
      </div>
    </form>
  );
}
