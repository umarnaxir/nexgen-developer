"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/ui/AdminInput";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import {
  BlogBlockModal,
  CharCount,
  sectionPreviewLabel,
  sectionsToContent,
  stripSectionKeys,
  toEditableSections,
  type EditableSection,
} from "@/components/admin/forms/BlogBlockModal";
import { adminFetch } from "@/lib/admin/client";
import type { Blog } from "@/lib/content/types";

type BlogFormProps = {
  initial?: Blog;
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

function toDatetimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function estimateReadTime(sections: EditableSection[]) {
  const words = sectionsToContent(sections)
    .split(/\s+/)
    .filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function BlogForm({ initial, mode }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<EditableSection | null>(
    null
  );
  const [sections, setSections] = useState<EditableSection[]>(() => {
    if (initial?.sections?.length) return toEditableSections(initial.sections);
    if (initial?.content?.trim()) {
      return toEditableSections([{ type: "text", content: initial.content }]);
    }
    return [];
  });

  const [form, setForm] = useState({
    title: initial?.title || "",
    slug: initial?.slug || "",
    description: initial?.description || initial?.excerpt || "",
    image: initial?.image || "",
    publishDate:
      toDatetimeLocal(initial?.publishDate) ||
      toDatetimeLocal(new Date().toISOString()),
    status: (initial?.status || "draft") as "draft" | "published",
    category: initial?.category || "",
    author: initial?.author || "NexGen Developers Team",
    readTime: initial?.readTime || "5 min read",
    keywords: (initial?.keywords || []).join(", "),
    seoTitle: initial?.seoTitle || "",
    internalHref: initial?.internalLink?.href || "/services",
    internalText: initial?.internalLink?.text || "Explore our services",
    externalHref: initial?.externalLink?.href || "",
    externalText: initial?.externalLink?.text || "",
  });

  const autoReadTime = useMemo(() => estimateReadTime(sections), [sections]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function openAddModal() {
    setEditingSection(null);
    setModalOpen(true);
  }

  function openEditModal(section: EditableSection) {
    setEditingSection(section);
    setModalOpen(true);
  }

  function handleSaveSection(section: EditableSection) {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s._key === section._key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = section;
        return next;
      }
      return [...prev, section];
    });
  }

  function moveSection(index: number, dir: -1 | 1) {
    setSections((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
  }

  function removeSection(key: string) {
    setSections((prev) => prev.filter((s) => s._key !== key));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("SEO title is required");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Meta description is required");
      return;
    }
    if (!form.image.trim()) {
      toast.error("Featured image is required");
      return;
    }
    if (sections.length === 0) {
      toast.error("Add at least one content block");
      return;
    }

    setSaving(true);
    try {
      const publishDate = form.publishDate
        ? new Date(form.publishDate).toISOString()
        : new Date().toISOString();
      const cleanSections = stripSectionKeys(sections);
      const content = sectionsToContent(sections);
      const galleryImages = [
        form.image,
        ...cleanSections
          .filter((s) => s.type === "image" && s.image)
          .map((s) => s.image as string),
      ].filter((v, i, arr) => v && arr.indexOf(v) === i);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.description.trim(),
        description: form.description.trim(),
        seoTitle: form.seoTitle.trim(),
        image: form.image,
        images: galleryImages,
        content,
        sections: cleanSections,
        publishDate,
        status: form.status,
        category: form.category.trim() || "General",
        author: form.author.trim(),
        readTime: form.readTime.trim() || autoReadTime,
        keywords: form.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        internalLink: {
          href: form.internalHref.trim() || "/services",
          text: form.internalText.trim() || "Explore our services",
        },
        externalLink: {
          href: form.externalHref.trim(),
          text: form.externalText.trim(),
        },
      };

      if (mode === "create") {
        await adminFetch("/api/admin/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Blog created");
      } else if (initial) {
        await adminFetch(`/api/admin/blogs/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Blog updated");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SEO essentials */}
        <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-primary">SEO essentials</h2>
          <p className="mt-1 text-sm text-text-gray">
            These fields power search results and social previews. Keep them clear and
            keyword-focused.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <AdminInput
                label="Headline (H1)"
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  update("title", title);
                  if (!slugTouched && mode === "create") {
                    update("slug", slugify(title));
                  }
                }}
                placeholder="The article heading readers see on the page"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <AdminInput
                label="Meta title (optional)"
                value={form.seoTitle}
                onChange={(e) => update("seoTitle", e.target.value)}
                placeholder="Primary keyword for Google — leave blank to use the headline"
              />
              <CharCount
                value={form.seoTitle || form.title}
                idealMin={45}
                idealMax={60}
              />
            </div>

            <div className="sm:col-span-2">
              <AdminInput
                label="URL slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value);
                }}
                hint="Shown as /blogs/your-slug — keep it short and readable"
              />
            </div>

            <div className="sm:col-span-2">
              <AdminTextarea
                label="Meta description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                placeholder="Compelling summary with a soft CTA — this appears under your title in Google"
                required
              />
              <CharCount value={form.description} idealMin={140} idealMax={160} />
            </div>

            <div className="sm:col-span-2">
              <AdminInput
                label="Focus keywords"
                hint="Comma-separated. Use 3–8 relevant phrases."
                value={form.keywords}
                onChange={(e) => update("keywords", e.target.value)}
                placeholder="web development, next.js, seo blog"
              />
            </div>

            <AdminInput
              label="Category"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="AI/ML, Web Development…"
            />
            <AdminInput
              label="Author"
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
            />
          </div>
        </div>

        {/* Featured media + publish */}
        <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-primary">
            Featured image & publishing
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <ImageUpload
                label="Featured image (OG / hero)"
                folder="blogs"
                value={form.image}
                onChange={(url) => update("image", url)}
              />
            </div>
            <AdminInput
              label="Publish date"
              type="datetime-local"
              value={form.publishDate}
              onChange={(e) => update("publishDate", e.target.value)}
            />
            <AdminSelect
              label="Status"
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value as "draft" | "published")
              }
              options={[
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
              ]}
            />
            <AdminInput
              label="Read time"
              value={form.readTime}
              onChange={(e) => update("readTime", e.target.value)}
              hint={`Suggested from content: ${autoReadTime}`}
              placeholder={autoReadTime}
            />
          </div>
        </div>

        {/* Content blocks */}
        <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-primary">
                Article content blocks
              </h2>
              <p className="mt-1 text-sm text-text-gray">
                Add headings, paragraphs, and images like a notes page. Use H2/H3 for
                structure — important for SEO.
              </p>
            </div>
            <AdminButton type="button" onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              Add block
            </AdminButton>
          </div>

          <div className="mt-4 space-y-2">
            {sections.length === 0 ? (
              <button
                type="button"
                onClick={openAddModal}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-gold/35 bg-background-soft px-4 py-10 text-sm text-text-gray transition hover:border-gold hover:bg-gold/10 hover:text-primary"
              >
                <Plus className="h-5 w-5" />
                Click to add your first content block
              </button>
            ) : (
              sections.map((section, index) => (
                <div
                  key={section._key}
                  className="flex items-start gap-2 rounded-md border border-gold/25 bg-background-soft p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-text-gray/70">
                        {section.type === "heading"
                        ? `Heading H${section.headingLevel || 2}`
                        : section.type === "image"
                          ? "Image"
                          : section.type === "list"
                            ? section.ordered
                              ? "Numbered list"
                              : "Bullet list"
                          : "Paragraph"}
                    </p>
                    {section.type === "image" && section.image ? (
                      <div className="relative mt-2 h-20 w-32 overflow-hidden rounded-md border border-gold/25 bg-white">
                        <Image
                          src={section.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <p className="mt-1 line-clamp-2 text-sm text-primary">
                        {sectionPreviewLabel(section)}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <AdminButton
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </AdminButton>
                    <AdminButton
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => moveSection(index, 1)}
                      disabled={index === sections.length - 1}
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </AdminButton>
                    <AdminButton
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => openEditModal(section)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </AdminButton>
                    <AdminButton
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => removeSection(section._key)}
                      aria-label="Delete block"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </AdminButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SEO links */}
        <div className="rounded-md border border-gold/25 bg-white p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-primary">
            Further reading links (SEO)
          </h2>
          <p className="mt-1 text-sm text-text-gray">
            Shown at the end of the post. Internal links help site ranking; external
            links add authority when relevant.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Internal link URL"
              value={form.internalHref}
              onChange={(e) => update("internalHref", e.target.value)}
              placeholder="/services"
            />
            <AdminInput
              label="Internal link label"
              value={form.internalText}
              onChange={(e) => update("internalText", e.target.value)}
              placeholder="Explore our services"
            />
            <AdminInput
              label="External link URL"
              value={form.externalHref}
              onChange={(e) => update("externalHref", e.target.value)}
              placeholder="https://…"
            />
            <AdminInput
              label="External link label"
              value={form.externalText}
              onChange={(e) => update("externalText", e.target.value)}
              placeholder="Read more on…"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <AdminButton type="submit" disabled={saving}>
            {saving
              ? "Saving…"
              : mode === "create"
                ? "Publish / save blog"
                : "Save changes"}
          </AdminButton>
          <AdminButton
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancel
          </AdminButton>
        </div>
      </form>

      <BlogBlockModal
        open={modalOpen}
        initial={editingSection}
        onClose={() => {
          setModalOpen(false);
          setEditingSection(null);
        }}
        onSave={handleSaveSection}
      />
    </>
  );
}
