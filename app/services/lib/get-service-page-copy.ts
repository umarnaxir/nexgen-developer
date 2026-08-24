import { deriveOverview } from "./derive-overview";
import {
  SERVICE_DETAIL_COPY,
  type ServiceDetailCopy,
  type ServiceFaq,
} from "./service-detail-copy";

type ServiceCopySource = {
  description: string;
  benefits: string[];
  process: { title: string; description: string }[];
  useCases?: string[];
  faqs?: ServiceFaq[];
};

function fallbackCopy(source: ServiceCopySource): ServiceDetailCopy {
  const { lead, points } = deriveOverview(source.description);
  const sentences = source.description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    lead,
    intro: sentences.length > 1 ? [sentences.slice(0, 2).join(" "), sentences.slice(2).join(" ")].filter(Boolean) : [source.description],
    pillars: points.map((p) => ({ title: p.title, text: p.text })),
    stats: [
      { value: "01", label: "Discovery-led scope" },
      { value: "QA", label: "Built into every release" },
      { value: "Docs", label: "Handover you can run" },
      { value: "Next", label: "A path after launch" },
    ],
    offerings: source.benefits.slice(0, 8).map((title) => ({
      title: title.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim(),
      description: `In scope for this engagement: ${title}. We implement it against your goals, stack, and constraints — with the same quality bar as the rest of the build.`,
    })),
    useCases: (source.useCases ?? []).map((title) => ({
      title,
      description: `A fit when ${title.toLowerCase()} is the context — we tune scope, integrations, and success metrics to that environment.`,
    })),
    process: source.process.map((step) => ({
      title: step.title,
      description: step.description,
    })),
    extraFaqs: [],
  };
}

export function getServicePageCopy(slug: string, source: ServiceCopySource): ServiceDetailCopy {
  return SERVICE_DETAIL_COPY[slug] ?? fallbackCopy(source);
}

export function mergeServiceFaqs(base: ServiceFaq[] | undefined, extra: ServiceFaq[]): ServiceFaq[] {
  const merged: ServiceFaq[] = [];
  const seen = new Set<string>();
  for (const item of [...(base ?? []), ...extra]) {
    const key = item.question.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }
  return merged;
}
