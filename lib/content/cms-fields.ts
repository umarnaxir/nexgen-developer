import cmsFieldsJson from "@/content/cms-fields.json";

export type CmsFieldsConfig = typeof cmsFieldsJson;

export const cmsFields: CmsFieldsConfig = cmsFieldsJson;

export function getCmsMeta(
  module: keyof CmsFieldsConfig,
  field: string
): { label?: string; frontend?: string[] } | undefined {
  const mod = cmsFields[module];
  if (!mod || !("fields" in mod) || !mod.fields) return undefined;
  const fields = mod.fields as Record<string, { label?: string; frontend?: string[] }>;
  return fields[field];
}
