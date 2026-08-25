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
import { AdminContactPreview } from "@/components/admin/preview/AdminLivePreview";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields, getCmsMeta } from "@/lib/content/cms-fields";
import type { ContactInfo } from "@/lib/content/types";

const emptyContact: ContactInfo = {
  companyName: "",
  email: "",
  phone: "",
  phoneDisplay: "",
  address: "",
  addressRegion: "",
  mapsLink: "",
  whatsapp: "",
};

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactInfo>(emptyContact);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await adminFetch<{ contact: ContactInfo }>(
          "/api/admin/contact"
        );
        if (!cancelled) setForm(data.contact);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load contact info"
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

  function update<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await adminFetch<{ contact: ContactInfo }>(
        "/api/admin/contact",
        {
          method: "PUT",
          body: JSON.stringify(form),
        }
      );
      setForm(data.contact);
      toast.success("Contact info saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title={cmsFields.contact.pageTitle}
        description={cmsFields.contact.description}
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading contact info…
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
                    onChange={(e) => update("companyName", e.target.value)}
                  />
                </div>
                <div>
                  <AdminInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                  <AdminFieldMeta
                    paths={getCmsMeta("contact", "email")?.frontend || []}
                    className="mt-1"
                  />
                </div>
                <div>
                  <AdminInput
                    label="Phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    hint="E.164 style, e.g. +916006161726"
                    required
                  />
                  <AdminFieldMeta
                    paths={getCmsMeta("contact", "phone")?.frontend || []}
                    className="mt-1"
                  />
                </div>
                <AdminInput
                  label="Phone display"
                  value={form.phoneDisplay}
                  onChange={(e) => update("phoneDisplay", e.target.value)}
                  placeholder="+91 600-616-1726"
                />
                <AdminInput
                  label="Address region"
                  value={form.addressRegion}
                  onChange={(e) => update("addressRegion", e.target.value)}
                />
                <div className="sm:col-span-2">
                  <AdminTextarea
                    label="Address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    rows={3}
                  />
                  <AdminFieldMeta
                    paths={getCmsMeta("contact", "address")?.frontend || []}
                    className="mt-1"
                  />
                </div>
                <AdminInput
                  label="Maps link"
                  value={form.mapsLink}
                  onChange={(e) => update("mapsLink", e.target.value)}
                  placeholder="https://maps.google.com/…"
                />
                <AdminInput
                  label="WhatsApp link"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="https://wa.me/…"
                />
              </div>
            </div>

            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save contact info"}
            </AdminButton>
          </form>

          <AdminContactPreview contact={form} className="lg:sticky lg:top-24 lg:self-start" />
        </div>
      )}
    </div>
  );
}
