/**
 * Seed content/services.json from app/services/config.ts definitions.
 * Run: npx tsx scripts/seed-services.ts
 */
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  TOP_LEVEL_SERVICES,
  DIGITAL_MARKETING_SERVICES,
  TOP_LEVEL_SLUGS,
  DIGITAL_MARKETING_SUB_SLUGS,
} from "../app/services/config";

const categories: Record<string, "development" | "digital-marketing" | "support"> = {
  "website-development": "development",
  "app-development": "development",
  "ai-ml": "development",
  "chatbot-development": "development",
  "digital-marketing": "digital-marketing",
  "search-engine-optimization": "digital-marketing",
  "social-media-marketing": "digital-marketing",
  "graphic-designing": "digital-marketing",
  "google-ads": "digital-marketing",
  "meta-ads": "digital-marketing",
  "maintenance-support": "support",
  "deployment-devops": "support",
};

function toRecord(def: any, order: number, parentSlug?: "digital-marketing" | null) {
  const content = def.content || {};
  return {
    id: randomUUID(),
    slug: def.slug,
    label: def.label,
    icon: def.icon || "Globe",
    category: categories[def.slug] || "development",
    parentSlug: parentSlug ?? null,
    order,
    enabled: true,
    relatedSlugs: def.relatedSlugs || [],
    seo: def.seo,
    content: {
      heading: content.heading,
      description: content.description,
      image: content.image || "/images/services/website.png",
      technologies: content.technologies || "",
      benefits: content.benefits || [],
      process: content.process || [],
      ctaHeading: content.ctaHeading,
      ctaDescription: content.ctaDescription,
      faqs: content.faqs || [],
      whyChoose: content.whyChoose || [],
      useCases: content.useCases || [],
      expectedResults: content.expectedResults || [],
    },
  };
}

const services = [
  ...TOP_LEVEL_SLUGS.map((slug, i) =>
    toRecord(TOP_LEVEL_SERVICES[slug], i + 1, null)
  ),
  ...DIGITAL_MARKETING_SUB_SLUGS.map((slug, i) =>
    toRecord(
      DIGITAL_MARKETING_SERVICES[slug],
      TOP_LEVEL_SLUGS.length + i + 1,
      "digital-marketing"
    )
  ),
];

const dir = path.join(process.cwd(), "content");
mkdirSync(dir, { recursive: true });
writeFileSync(
  path.join(dir, "services.json"),
  JSON.stringify(services, null, 2) + "\n"
);
console.log(`Seeded ${services.length} services → content/services.json`);
