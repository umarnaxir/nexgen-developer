import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/admin/auth";
import { getServices, slugify, writeContent } from "@/lib/content/store";
import type { ServiceCategory, ServiceRecord } from "@/lib/content/types";

const CATEGORIES: ServiceCategory[] = [
  "development",
  "digital-marketing",
  "support",
];

function revalidateServicePaths(service?: ServiceRecord) {
  revalidatePath("/");
  revalidatePath("/services");
  if (service) {
    revalidatePath(`/services/${service.slug}`);
  }
}

function parseCategory(value: unknown): ServiceCategory {
  if (typeof value === "string" && CATEGORIES.includes(value as ServiceCategory)) {
    return value as ServiceCategory;
  }
  return "development";
}

function parseFaqs(
  value: unknown
): { question: string; answer: string }[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        question: String(item?.question || "").trim(),
        answer: String(item?.answer || "").trim(),
      }))
      .filter((f) => f.question || f.answer);
  }
  return [];
}

function parseStringList(value: unknown, splitter: RegExp | string = /[\n,]/): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((v) => v.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(splitter)
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

function parseProcess(
  value: unknown
): { step: number; title: string; description: string }[] {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => ({
        step:
          typeof item?.step === "number" ? item.step : index + 1,
        title: String(item?.title || "").trim(),
        description: String(item?.description || "").trim(),
      }))
      .filter((p) => p.title || p.description);
  }
  return [];
}

function buildService(
  body: Record<string, unknown>,
  existing?: ServiceRecord,
  orderFallback = 1
): ServiceRecord {
  const label = String(body.label ?? existing?.label ?? "").trim();
  const slug = slugify(
    String(body.slug ?? existing?.slug ?? "").trim() || label
  );
  const parentRaw =
    body.parentSlug !== undefined
      ? body.parentSlug
      : existing?.parentSlug ?? null;
  const parentSlug =
    parentRaw === "digital-marketing" ? ("digital-marketing" as const) : null;

  const contentBody =
    body.content && typeof body.content === "object"
      ? (body.content as Record<string, unknown>)
      : {};
  const seoBody =
    body.seo && typeof body.seo === "object"
      ? (body.seo as Record<string, unknown>)
      : {};

  return {
    id: existing?.id || randomUUID(),
    slug,
    label,
    icon: String(body.icon ?? existing?.icon ?? "Globe").trim() || "Globe",
    category: parseCategory(body.category ?? existing?.category),
    parentSlug,
    order:
      typeof body.order === "number"
        ? body.order
        : (existing?.order ?? orderFallback),
    enabled:
      body.enabled !== undefined
        ? Boolean(body.enabled)
        : (existing?.enabled ?? true),
    relatedSlugs:
      body.relatedSlugs !== undefined
        ? parseStringList(body.relatedSlugs, /,/)
        : existing?.relatedSlugs || [],
    seo: {
      title: String(
        seoBody.title ?? body.seoTitle ?? existing?.seo.title ?? label
      ).trim(),
      description: String(
        seoBody.description ??
          body.seoDescription ??
          existing?.seo.description ??
          ""
      ).trim(),
      keywords:
        seoBody.keywords !== undefined || body.seoKeywords !== undefined
          ? parseStringList(seoBody.keywords ?? body.seoKeywords, /,/)
          : existing?.seo.keywords || [],
    },
    content: {
      heading: String(
        contentBody.heading ?? body.heading ?? existing?.content.heading ?? label
      ).trim(),
      description: String(
        contentBody.description ??
          body.description ??
          existing?.content.description ??
          ""
      ).trim(),
      image: String(
        contentBody.image ?? body.image ?? existing?.content.image ?? ""
      ),
      technologies: String(
        contentBody.technologies ??
          body.technologies ??
          existing?.content.technologies ??
          ""
      ).trim(),
      benefits:
        contentBody.benefits !== undefined || body.benefits !== undefined
          ? parseStringList(contentBody.benefits ?? body.benefits, /\n/)
          : existing?.content.benefits || [],
      process:
        contentBody.process !== undefined || body.process !== undefined
          ? parseProcess(contentBody.process ?? body.process)
          : existing?.content.process || [],
      ctaHeading: String(
        contentBody.ctaHeading ??
          body.ctaHeading ??
          existing?.content.ctaHeading ??
          ""
      ).trim(),
      ctaDescription: String(
        contentBody.ctaDescription ??
          body.ctaDescription ??
          existing?.content.ctaDescription ??
          ""
      ).trim(),
      faqs:
        contentBody.faqs !== undefined || body.faqs !== undefined
          ? parseFaqs(contentBody.faqs ?? body.faqs)
          : existing?.content.faqs,
      whyChoose:
        contentBody.whyChoose !== undefined || body.whyChoose !== undefined
          ? parseStringList(contentBody.whyChoose ?? body.whyChoose, /\n/)
          : existing?.content.whyChoose,
      useCases:
        contentBody.useCases !== undefined || body.useCases !== undefined
          ? parseStringList(contentBody.useCases ?? body.useCases, /\n/)
          : existing?.content.useCases,
      expectedResults:
        contentBody.expectedResults !== undefined ||
        body.expectedResults !== undefined
          ? parseStringList(
              contentBody.expectedResults ?? body.expectedResults,
              /\n/
            )
          : existing?.content.expectedResults,
    },
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const services = await getServices({ includeDisabled: true });
  return NextResponse.json({ services });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const services = await getServices({ includeDisabled: true });
    const service = buildService(body, undefined, services.length + 1);

    if (!service.label) {
      return NextResponse.json({ error: "Label is required." }, { status: 400 });
    }
    if (!service.slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    const duplicate = services.find(
      (s) =>
        s.slug === service.slug &&
        (s.parentSlug || null) === (service.parentSlug || null)
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 400 }
      );
    }

    services.push(service);
    await writeContent("services", services);
    revalidateServicePaths(service);
    return NextResponse.json({ service }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create service." },
      { status: 500 }
    );
  }
}
