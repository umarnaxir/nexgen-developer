"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminButton } from "./AdminButton";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  folder?: "projects" | "team" | "blogs" | "services" | "general";
  label?: string;
  className?: string;
  /** Compact portrait preview for team photos, etc. */
  size?: "default" | "compact";
};

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  label = "Image",
  className,
  size = "default",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const compact = size === "compact";

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <span className="text-sm font-medium text-primary">{label}</span>
      <div
        className={cn(
          "overflow-hidden rounded-md border border-dashed border-gold/35 bg-background-soft",
          compact ? "w-[7.5rem] sm:w-36" : "w-full"
        )}
      >
        {value ? (
          <div
            className={cn(
              "relative w-full",
              compact ? "aspect-[3/4]" : "aspect-[16/10]"
            )}
          >
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute right-1.5 top-1.5 flex gap-1">
              <AdminButton
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className={cn(compact && "px-2 text-[11px]")}
              >
                {compact ? "Change" : "Replace"}
              </AdminButton>
              {!compact && (
                <AdminButton
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => onChange("")}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </AdminButton>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex w-full flex-col items-center justify-center gap-1.5 text-text-gray transition hover:bg-gold/10 hover:text-gold-dark",
              compact ? "aspect-[3/4] px-2" : "aspect-[16/10]"
            )}
          >
            {uploading ? (
              <Loader2
                className={cn(
                  "animate-spin text-gold-dark",
                  compact ? "h-5 w-5" : "h-6 w-6"
                )}
              />
            ) : (
              <ImagePlus className={compact ? "h-5 w-5" : "h-6 w-6"} />
            )}
            <span className={cn("text-center", compact ? "text-[11px] leading-tight" : "text-sm")}>
              {uploading ? "Uploading…" : compact ? "Upload photo" : "Click to upload image"}
            </span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
