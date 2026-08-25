"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import {
  AdminFieldMeta,
  AdminFormSection,
} from "@/components/admin/ui/AdminFormSection";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields, getCmsMeta } from "@/lib/content/cms-fields";
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
    profileUrl: initial?.profileUrl || "",
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
        profileUrl: form.profileUrl.trim(),
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
      <AdminFormSection
        title="Team member"
        description={cmsFields.team.pageTitle + " — fields match /team cards on the site."}
      >
        <div className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:items-start">
          <ImageUpload
            label="Profile photo"
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
            <div>
              <AdminInput
                label="Profile link (optional)"
                value={form.profileUrl}
                onChange={(e) => update("profileUrl", e.target.value)}
                placeholder="https://linkedin.com/in/…"
                hint="When set, the team card opens this URL on click."
              />
              <AdminFieldMeta
                paths={getCmsMeta("team", "profileUrl")?.frontend || []}
                className="mt-1"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-gold/25 bg-background-soft px-3 py-3">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update("enabled", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gold/35 text-gold-dark focus:ring-gold-dark"
              />
              <span>
                <span className="block text-sm font-medium text-primary">
                  Visible on frontend
                </span>
                <span className="mt-0.5 block text-xs text-text-gray">
                  {form.enabled
                    ? "This member will show on the public Team page."
                    : "Hidden from the public Team page (still kept in admin)."}
                </span>
              </span>
            </label>
            {form.profileUrl.trim() ? (
              <a
                href={form.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-dark hover:text-primary"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Preview profile link
              </a>
            ) : null}
          </div>
        </div>
      </AdminFormSection>

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
