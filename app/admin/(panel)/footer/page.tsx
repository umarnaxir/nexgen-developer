"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  AdminInput,
  AdminTextarea,
} from "@/components/admin/ui/AdminInput";
import { AdminFieldMeta } from "@/components/admin/ui/AdminFormSection";
import { AdminFooterPreview } from "@/components/admin/preview/AdminLivePreview";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields, getCmsMeta } from "@/lib/content/cms-fields";
import type { FooterSettings, SocialLinks } from "@/lib/content/types";

const emptyFooter: FooterSettings = {
  companyName: "",
  companyInfo: "",
  copyrightText: "",
  craftedText: "",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    github: "",
    youtube: "",
  },
};

export default function AdminFooterPage() {
  const [form, setForm] = useState<FooterSettings>(emptyFooter);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await adminFetch<{ footer: FooterSettings }>(
          "/api/admin/footer"
        );
        if (!cancelled) {
          setForm({
            ...data.footer,
            social: { ...emptyFooter.social, ...data.footer.social },
          });
        }
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load footer settings"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateField<K extends keyof Omit<FooterSettings, "social">>(
    key: K,
    value: FooterSettings[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateSocial(key: keyof SocialLinks, value: string) {
    setForm((prev) => ({
      ...prev,
      social: { ...prev.social, [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await adminFetch<{ footer: FooterSettings }>(
        "/api/admin/footer",
        {
          method: "PUT",
          body: JSON.stringify(form),
        }
      );
      setForm({
        ...data.footer,
        social: { ...emptyFooter.social, ...data.footer.social },
      });
      toast.success("Footer settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={cmsFields.footer.pageTitle}
        description={cmsFields.footer.description}
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading footer settings…
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_min(20rem,100%)] xl:grid-cols-[1fr_22rem]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <AdminInput
                    label="Company name"
                    value={form.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="Company info / tagline"
                    value={form.companyInfo}
                    onChange={(e) => updateField("companyInfo", e.target.value)}
                    rows={3}
                  />
                  <AdminFieldMeta
                    paths={getCmsMeta("footer", "companyInfo")?.frontend || []}
                    className="mt-1"
                  />
                </div>
                <AdminInput
                  label="Copyright text"
                  value={form.copyrightText}
                  onChange={(e) => updateField("copyrightText", e.target.value)}
                  hint="Use {year} for the current year"
                />
                <AdminInput
                  label="Crafted text"
                  value={form.craftedText}
                  onChange={(e) => updateField("craftedText", e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
              <h2 className="text-sm font-semibold text-primary">Social links</h2>
              <p className="mt-1 text-xs text-text-gray">
                Leave blank to hide a network from the footer and contact page.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    "facebook",
                    "instagram",
                    "linkedin",
                    "twitter",
                    "github",
                    "youtube",
                  ] as const
                ).map((network) => (
                  <AdminInput
                    key={network}
                    label={network.charAt(0).toUpperCase() + network.slice(1)}
                    value={form.social[network] || ""}
                    onChange={(e) => updateSocial(network, e.target.value)}
                    placeholder="https://"
                  />
                ))}
              </div>
            </div>

            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save footer settings"}
            </AdminButton>
          </form>

          <AdminFooterPreview footer={form} className="lg:sticky lg:top-24 lg:self-start" />
        </div>
      )}
    </div>
  );
}
