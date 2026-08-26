"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bold,
  Heading2,
  ImagePlus,
  Link2,
  List,
  Type,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { ImageUpload } from "@/components/admin/ui/ImageUpload";
import type { BlogSection } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export type EditableSection = BlogSection & { _key: string };

type BlockType = "heading" | "text" | "image" | "list";

type BlogBlockModalProps = {
  open: boolean;
  initial?: EditableSection | null;
  onClose: () => void;
  onSave: (section: EditableSection) => void;
};

function makeKey() {
  return `blk_${Math.random().toString(36).slice(2, 10)}`;
}

function wrapSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  placeholder: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selected = value.slice(start, end) || placeholder;
  const next = value.slice(0, start) + before + selected + after + value.slice(end);
  return {
    next,
    cursorStart: start + before.length,
    cursorEnd: start + before.length + selected.length,
  };
}

export function BlogBlockModal({
  open,
  initial,
  onClose,
  onSave,
}: BlogBlockModalProps) {
  const isEdit = Boolean(initial);
  const [step, setStep] = useState<"pick" | "edit">(isEdit ? "edit" : "pick");
  const [type, setType] = useState<BlockType>(
    (initial?.type as BlockType) || "text"
  );
  const [heading, setHeading] = useState(initial?.heading || "");
  const [headingLevel, setHeadingLevel] = useState<1 | 2 | 3>(
    initial?.headingLevel || 2
  );
  const [content, setContent] = useState(initial?.content || "");
  const [image, setImage] = useState(initial?.image || "");
  const [listItems, setListItems] = useState(
    (initial?.items || []).join("\n")
  );
  const [ordered, setOrdered] = useState(Boolean(initial?.ordered));
  const [showGuide, setShowGuide] = useState(true);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setStep("edit");
      setType(initial.type as BlockType);
      setHeading(initial.heading || "");
      setHeadingLevel(initial.headingLevel || 2);
      setContent(initial.content || "");
      setImage(initial.image || "");
      setListItems((initial.items || []).join("\n"));
      setOrdered(Boolean(initial.ordered));
    } else {
      setStep("pick");
      setType("text");
      setHeading("");
      setHeadingLevel(2);
      setContent("");
      setImage("");
      setListItems("");
      setOrdered(false);
    }
  }, [open, initial]);

  function chooseType(next: BlockType) {
    setType(next);
    setStep("edit");
  }

  function applyFormat(kind: "bold" | "link") {
    const el = textRef.current;
    if (!el) return;
    if (kind === "bold") {
      const { next, cursorStart, cursorEnd } = wrapSelection(
        el,
        "**",
        "**",
        "bold text"
      );
      setContent(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(cursorStart, cursorEnd);
      });
      return;
    }

    const url = window.prompt("Enter URL (https://… or /services)", "https://");
    if (!url) return;
    const { next, cursorStart, cursorEnd } = wrapSelection(
      el,
      "[",
      `](${url.trim()})`,
      "link text"
    );
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  function handleSave() {
    if (type === "heading") {
      if (!heading.trim()) {
        toast.error("Heading text is required");
        return;
      }
      onSave({
        _key: initial?._key || makeKey(),
        type: "heading",
        heading: heading.trim(),
        headingLevel,
      });
      onClose();
      return;
    }

    if (type === "image") {
      if (!image.trim()) {
        toast.error("Upload or choose an image");
        return;
      }
      onSave({
        _key: initial?._key || makeKey(),
        type: "image",
        image: image.trim(),
      });
      onClose();
      return;
    }

    if (type === "list") {
      const items = listItems
        .split("\n")
        .map((item) => item.replace(/^\s*([*\-]|\d+[.)])\s+/, "").trim())
        .filter(Boolean);
      if (!items.length) {
        toast.error("Add at least one list item");
        return;
      }
      onSave({
        _key: initial?._key || makeKey(),
        type: "list",
        items,
        ordered,
      });
      onClose();
      return;
    }

    if (!content.trim()) {
      toast.error("Paragraph content is required");
      return;
    }
    onSave({
      _key: initial?._key || makeKey(),
      type: "text",
      content: content.trim(),
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-gold/25 bg-white shadow-xl sm:rounded-md"
          >
            <div className="flex items-center justify-between border-b border-gold/25 px-4 py-3 sm:px-5">
              <div>
                <h3 className="text-base font-semibold text-primary sm:text-lg">
                  {isEdit ? "Edit content block" : "Add content block"}
                </h3>
                <p className="text-xs text-text-gray">
                  Build SEO-friendly sections: headings, paragraphs, images
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-gray hover:bg-background-soft"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
              {step === "pick" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: "heading" as const,
                      label: "Heading",
                      desc: "H2 / H3 for SEO structure",
                      icon: Heading2,
                    },
                    {
                      id: "text" as const,
                      label: "Paragraph",
                      desc: "Body text with bold & links",
                      icon: Type,
                    },
                    {
                      id: "list" as const,
                      label: "List",
                      desc: "Bullets or numbered items",
                      icon: List,
                    },
                    {
                      id: "image" as const,
                      label: "Image",
                      desc: "Inline image in the article",
                      icon: ImagePlus,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => chooseType(item.id)}
                        className="rounded-md border border-gold/25 p-4 text-left transition hover:border-gold hover:bg-gold/10"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background-soft text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="mt-3 text-sm font-semibold text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs text-text-gray">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {!isEdit && (
                    <button
                      type="button"
                      onClick={() => setStep("pick")}
                      className="text-xs font-medium text-gold-dark hover:underline"
                    >
                      ← Change block type
                    </button>
                  )}

                  {type === "heading" && (
                    <>
                      <AdminSelect
                        label="Heading level"
                        value={String(headingLevel)}
                        onChange={(e) =>
                          setHeadingLevel(Number(e.target.value) as 1 | 2 | 3)
                        }
                        options={[
                          { value: "2", label: "H2 — main section (recommended)" },
                          { value: "3", label: "H3 — subsection" },
                          { value: "1", label: "H1 — use sparingly (page already has one)" },
                        ]}
                      />
                      <AdminInput
                        label="Heading text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="e.g. Why AI Matters for Small Businesses"
                        hint="Include your focus keyword naturally when it fits."
                      />
                    </>
                  )}

                  {type === "text" && (
                    <>
                      <div className="rounded-md border border-gold/40 bg-gold/10 p-3">
                        <button
                          type="button"
                          onClick={() => setShowGuide((v) => !v)}
                          className="flex w-full items-center justify-between text-left text-sm font-medium text-primary"
                        >
                          Formatting instructions
                          <span className="text-xs text-gold-dark">
                            {showGuide ? "Hide" : "Show"}
                          </span>
                        </button>
                        {showGuide && (
                          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-primary/80">
                            <li>
                              <strong>Bold:</strong> select text → click Bold, or type{" "}
                              <code className="rounded bg-white/80 px-1">**your words**</code>
                            </li>
                            <li>
                              <strong>Link:</strong> select text → click Link, or type{" "}
                              <code className="rounded bg-white/80 px-1">
                                [label](https://example.com)
                              </code>
                            </li>
                            <li>
                              <strong>Internal link:</strong> use site paths like{" "}
                              <code className="rounded bg-white/80 px-1">
                                [Our services](/services)
                              </code>
                            </li>
                            <li>
                              Write clear paragraphs (2–4 sentences). One idea per block helps SEO
                              and readability.
                            </li>
                          </ul>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <AdminButton
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => applyFormat("bold")}
                        >
                          <Bold className="h-3.5 w-3.5" />
                          Bold
                        </AdminButton>
                        <AdminButton
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => applyFormat("link")}
                        >
                          <Link2 className="h-3.5 w-3.5" />
                          Insert link
                        </AdminButton>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-primary">
                          Paragraph
                        </label>
                        <textarea
                          ref={textRef}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={10}
                          placeholder="Write your paragraph here. Use **bold** and [links](/path) for emphasis and SEO."
                          className="w-full rounded-md border border-gold/25 bg-white px-3 py-2.5 text-sm leading-relaxed text-primary outline-none transition placeholder:text-text-gray/70 focus:border-gold-dark focus:ring-2 focus:ring-gold/25"
                        />
                      </div>
                    </>
                  )}

                  {type === "image" && (
                    <ImageUpload
                      label="Block image"
                      folder="blogs"
                      value={image}
                      onChange={setImage}
                      size="compact"
                    />
                  )}

                  {type === "list" && (
                    <>
                      <AdminSelect
                        label="List type"
                        value={ordered ? "ordered" : "bullet"}
                        onChange={(e) =>
                          setOrdered(e.target.value === "ordered")
                        }
                        options={[
                          { value: "bullet", label: "Bullet list" },
                          { value: "ordered", label: "Numbered list" },
                        ]}
                      />
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-primary">
                          List items
                        </label>
                        <textarea
                          value={listItems}
                          onChange={(e) => setListItems(e.target.value)}
                          rows={8}
                          placeholder={"One item per line\nSupports **bold** and [links](/path)"}
                          className="w-full rounded-md border border-gold/25 bg-white px-3 py-2.5 text-sm leading-relaxed text-primary outline-none transition placeholder:text-text-gray/70 focus:border-gold-dark focus:ring-2 focus:ring-gold/25"
                        />
                        <p className="mt-1 text-xs text-text-gray">
                          One item per line. You can use **bold** and [label](/path).
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {step === "edit" && (
              <div className="flex justify-end gap-2 border-t border-gold/25 px-4 py-3 sm:px-5">
                <AdminButton type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </AdminButton>
                <AdminButton type="button" onClick={handleSave}>
                  {isEdit ? "Update block" : "Add block"}
                </AdminButton>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function sectionPreviewLabel(section: EditableSection) {
  if (section.type === "heading") {
    return `H${section.headingLevel || 2}: ${section.heading || "Untitled"}`;
  }
  if (section.type === "image") return "Image block";
  if (section.type === "list") {
    const count = (section.items || []).length;
    return `${section.ordered ? "Numbered" : "Bullet"} list (${count} items)`;
  }
  const text = section.content || "";
  return text.length > 80 ? `${text.slice(0, 80)}…` : text || "Empty paragraph";
}

export function sectionsToContent(sections: EditableSection[]) {
  return sections
    .map((s) => {
      if (s.type === "heading") return s.heading || "";
      if (s.type === "text") return s.content || "";
      if (s.type === "list") return (s.items || []).join(" ");
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

export function toEditableSections(sections?: BlogSection[]): EditableSection[] {
  if (!sections?.length) return [];
  return sections.map((s) => ({ ...s, _key: makeKey() }));
}

export function stripSectionKeys(sections: EditableSection[]): BlogSection[] {
  return sections.map(({ _key: _ignored, ...rest }) => rest);
}

export function CharCount({
  value,
  idealMin,
  idealMax,
}: {
  value: string;
  idealMin: number;
  idealMax: number;
}) {
  const len = value.length;
  const ok = len >= idealMin && len <= idealMax;
  return (
    <p
      className={cn(
        "mt-1 text-[11px]",
        ok ? "text-gold-dark" : len === 0 ? "text-text-gray/70" : "text-primary"
      )}
    >
      {len} characters · aim {idealMin}–{idealMax} for SEO
    </p>
  );
}
