"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/ui/AdminInput";
import { AdminFormSection } from "@/components/admin/ui/AdminFormSection";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields } from "@/lib/content/cms-fields";
import type { ServiceCategory, ServiceRecord } from "@/lib/content/types";

type ServiceFormProps = {
  initial?: ServiceRecord;
  mode: "create" | "edit";
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\b(?:in|for)[- ](?:19|20)\d{2}\b/g, "")
    .replace(/\b(?:19|20)\d{2}\b/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ProcessStep = { title: string; description: string };
type FaqItem = { question: string; answer: string };

function emptySteps(): ProcessStep[] {
  return Array.from({ length: 4 }, () => ({ title: "", description: "" }));
}

function stepsFromService(service?: ServiceRecord): ProcessStep[] {
  const steps = emptySteps();
  (service?.content.process || []).slice(0, 4).forEach((p, i) => {
    steps[i] = { title: p.title || "", description: p.description || "" };
  });
  return steps;
}

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function ServiceForm({ initial, mode }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [form, setForm] = useState({
    label: initial?.label || "",
    slug: initial?.slug || "",
    icon: initial?.icon || "Globe",
    category: (initial?.category || "development") as ServiceCategory,
    parentSlug: initial?.parentSlug === "digital-marketing" ? "digital-marketing" : "",
    enabled: initial?.enabled ?? true,
    order: initial?.order ?? 1,
    image: initial?.content.image || "",
    heading: initial?.content.heading || "",
    description: initial?.content.description || "",
    technologies: initial?.content.technologies || "",
    benefits: (initial?.content.benefits || []).join("\n"),
    whyChoose: (initial?.content.whyChoose || []).join("\n"),
    useCases: (initial?.content.useCases || []).join("\n"),
    expectedResults: (initial?.content.expectedResults || []).join("\n"),
    faqs: (initial?.content.faqs || []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })) as FaqItem[],
    process: stepsFromService(initial),
    ctaHeading: initial?.content.ctaHeading || "",
    ctaDescription: initial?.content.ctaDescription || "",
    relatedSlugs: (initial?.relatedSlugs || []).join(", "),
    seoTitle: initial?.seo.title || "",
    seoDescription: initial?.seo.description || "",
    seoKeywords: (initial?.seo.keywords || []).join(", "),
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateStep(index: number, key: keyof ProcessStep, value: string) {
    setForm((prev) => {
      const process = [...prev.process];
      process[index] = { ...process[index], [key]: value };
      return { ...prev, process };
    });
  }

  function updateFaq(index: number, key: keyof FaqItem, value: string) {
    setForm((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...prev, faqs };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label.trim()) {
      toast.error("Label is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        label: form.label.trim(),
        slug: form.slug.trim() || slugify(form.label),
        icon: form.icon.trim() || "Globe",
        category: form.category,
        parentSlug:
          form.parentSlug === "digital-marketing" ? "digital-marketing" : null,
        enabled: form.enabled,
        order: Number(form.order) || 1,
        relatedSlugs: form.relatedSlugs,
        image: form.image,
        heading: form.heading.trim() || form.label.trim(),
        description: form.description.trim(),
        technologies: form.technologies.trim(),
        benefits: form.benefits,
        whyChoose: form.whyChoose,
        useCases: form.useCases,
        expectedResults: form.expectedResults,
        faqs: form.faqs.filter((f) => f.question.trim() || f.answer.trim()),
        process: form.process
          .map((step, index) => ({
            step: index + 1,
            title: step.title.trim(),
            description: step.description.trim(),
          }))
          .filter((p) => p.title || p.description),
        ctaHeading: form.ctaHeading.trim(),
        ctaDescription: form.ctaDescription.trim(),
        seoTitle: form.seoTitle.trim() || form.label.trim(),
        seoDescription: form.seoDescription.trim(),
        seoKeywords: form.seoKeywords,
      };

      if (mode === "create") {
        await adminFetch("/api/admin/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Service created");
      } else if (initial) {
        await adminFetch(`/api/admin/services/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Service updated");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save service");
    } finally {
      setSaving(false);
    }
  }

  const sections = cmsFields.services.sections;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminFormSection title={sections[0].title} description={sections[0].description}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="Label"
            value={form.label}
            onChange={(e) => {
              const label = e.target.value;
              update("label", label);
              if (!slugTouched) update("slug", slugify(label));
              if (!form.heading) update("heading", label);
            }}
            required
          />
          <AdminInput
            label="Slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", e.target.value);
            }}
            required
          />
          <AdminInput
            label="Icon"
            value={form.icon}
            onChange={(e) => update("icon", e.target.value)}
            hint="Lucide icon name, e.g. Globe"
          />
          <AdminSelect
            label="Category"
            value={form.category}
            onChange={(e) =>
              update("category", e.target.value as ServiceCategory)
            }
            options={[
              { value: "development", label: "Development" },
              { value: "digital-marketing", label: "Digital Marketing" },
              { value: "support", label: "Support" },
            ]}
          />
          <AdminSelect
            label="Parent"
            value={form.parentSlug}
            onChange={(e) => update("parentSlug", e.target.value)}
            options={[
              { value: "", label: "None (top-level)" },
              { value: "digital-marketing", label: "Digital Marketing" },
            ]}
          />
          <AdminInput
            label="Order"
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => update("order", Number(e.target.value))}
          />
          <label className="flex items-center gap-2 pt-7 text-sm text-primary sm:col-span-2">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => update("enabled", e.target.checked)}
              className="h-4 w-4 rounded border-gold/35 text-gold-dark focus:ring-gold-dark"
            />
            Enabled (visible on site)
          </label>
        </div>
      </AdminFormSection>

      <AdminFormSection title={sections[1].title} description={sections[1].description}>
        <div className="grid gap-4">
          <div className="sm:max-w-md">
            <ImageUpload
              label="Image"
              folder="services"
              value={form.image}
              onChange={(url) => update("image", url)}
            />
          </div>
          <AdminInput
            label="Heading"
            value={form.heading}
            onChange={(e) => update("heading", e.target.value)}
          />
          <AdminTextarea
            label="Description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
          />
          <AdminInput
            label="Technologies"
            value={form.technologies}
            onChange={(e) => update("technologies", e.target.value)}
            hint="Comma-separated list"
          />
          <AdminTextarea
            label="Benefits"
            value={form.benefits}
            onChange={(e) => update("benefits", e.target.value)}
            hint="One benefit per line"
            rows={5}
          />
          <AdminInput
            label="Related slugs"
            value={form.relatedSlugs}
            onChange={(e) => update("relatedSlugs", e.target.value)}
            hint="Comma-separated service slugs"
          />
        </div>
      </AdminFormSection>

      <AdminFormSection title={sections[2].title} description={sections[2].description}>
        <div className="space-y-4">
          {form.process.map((step, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border border-gold/15 bg-background-soft p-4 sm:grid-cols-2"
            >
              <AdminInput
                label={`Step ${index + 1} title`}
                value={step.title}
                onChange={(e) => updateStep(index, "title", e.target.value)}
              />
              <AdminInput
                label={`Step ${index + 1} description`}
                value={step.description}
                onChange={(e) =>
                  updateStep(index, "description", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </AdminFormSection>

      <AdminFormSection title={sections[3].title} description={sections[3].description}>
        <div className="grid gap-4">
          <AdminTextarea
            label="Why choose us"
            hint="One point per line"
            value={form.whyChoose}
            onChange={(e) => update("whyChoose", e.target.value)}
            rows={4}
          />
          <AdminTextarea
            label="Use cases"
            hint="One use case per line"
            value={form.useCases}
            onChange={(e) => update("useCases", e.target.value)}
            rows={4}
          />
          <AdminTextarea
            label="Expected results"
            hint="One result per line"
            value={form.expectedResults}
            onChange={(e) => update("expectedResults", e.target.value)}
            rows={4}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">FAQs</span>
              <AdminButton
                type="button"
                size="sm"
                variant="secondary"
                onClick={() =>
                  update("faqs", [...form.faqs, { question: "", answer: "" }])
                }
              >
                <Plus className="h-3.5 w-3.5" />
                Add FAQ
              </AdminButton>
            </div>
            {form.faqs.length === 0 ? (
              <p className="text-xs text-text-gray">No FAQs yet.</p>
            ) : (
              form.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="space-y-2 rounded-md border border-gold/20 bg-background-soft p-3"
                >
                  <AdminInput
                    label={`Question ${index + 1}`}
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                  />
                  <AdminTextarea
                    label="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    rows={2}
                  />
                  <AdminButton
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-red-600"
                    onClick={() =>
                      update(
                        "faqs",
                        form.faqs.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </AdminButton>
                </div>
              ))
            )}
          </div>
        </div>
      </AdminFormSection>

      <AdminFormSection title={sections[4].title} description={sections[4].description}>
        <div className="grid gap-4">
          <AdminInput
            label="CTA heading"
            value={form.ctaHeading}
            onChange={(e) => update("ctaHeading", e.target.value)}
          />
          <AdminTextarea
            label="CTA description"
            value={form.ctaDescription}
            onChange={(e) => update("ctaDescription", e.target.value)}
            rows={3}
          />
          <AdminInput
            label="SEO title"
            value={form.seoTitle}
            onChange={(e) => update("seoTitle", e.target.value)}
          />
          <AdminTextarea
            label="SEO description"
            value={form.seoDescription}
            onChange={(e) => update("seoDescription", e.target.value)}
            rows={3}
          />
          <AdminInput
            label="SEO keywords"
            value={form.seoKeywords}
            onChange={(e) => update("seoKeywords", e.target.value)}
            hint="Comma-separated"
          />
        </div>
      </AdminFormSection>

      <div className="flex flex-wrap gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Add service"
              : "Save changes"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/services")}
        >
          Cancel
        </AdminButton>
      </div>
    </form>
  );
}
