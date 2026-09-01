import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { canDeleteContent, getSession } from "@/lib/admin/auth";
import { getServices, slugify, writeContent } from "@/lib/content/store";
import type { ServiceCategory, ServiceRecord } from "@/lib/content/types";

const CATEGORIES: ServiceCategory[] = [
  "development",
  "digital-marketing",
  "support",
];

type Params = { params: Promise<{ id: string }> };

function revalidateServicePaths(service?: ServiceRecord) {
  revalidatePath("/");
  revalidatePath("/services");
  if (service) {
    revalidatePath(`/services/${service.slug}`);
  }
}

function parseCategory(value: unknown, fallback: ServiceCategory): ServiceCategory {
  if (typeof value === "string" && CATEGORIES.includes(value as ServiceCategory)) {
    return value as ServiceCategory;
  }
  return fallback;
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
        step: typeof item?.step === "number" ? item.step : index + 1,
        title: String(item?.title || "").trim(),
        description: String(item?.description || "").trim(),
      }))
      .filter((p) => p.title || p.description);
  }
  return [];
}

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const services = await getServices({ includeDisabled: true });
  const service = services.find((s) => s.id === id);
  if (!service) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 });
  }
  return NextResponse.json({ service });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const services = await getServices({ includeDisabled: true });
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Service not found." }, { status: 404 });
    }

    const current = services[index];
    const contentBody =
      body.content && typeof body.content === "object" ? body.content : {};
    const seoBody = body.seo && typeof body.seo === "object" ? body.seo : {};

    const label =
      body.label !== undefined ? String(body.label).trim() : current.label;
    const slug =
      body.slug !== undefined
        ? slugify(String(body.slug).trim() || label)
        : current.slug;

    const parentRaw =
      body.parentSlug !== undefined ? body.parentSlug : current.parentSlug;
    const parentSlug =
      parentRaw === "digital-marketing" ? ("digital-marketing" as const) : null;

    const updated: ServiceRecord = {
      ...current,
      label,
      slug,
      icon:
        body.icon !== undefined
          ? String(body.icon).trim() || "Globe"
          : current.icon,
      category: parseCategory(body.category, current.category),
      parentSlug,
      order: typeof body.order === "number" ? body.order : current.order,
      enabled:
        body.enabled !== undefined ? Boolean(body.enabled) : current.enabled,
      relatedSlugs:
        body.relatedSlugs !== undefined
          ? parseStringList(body.relatedSlugs, /,/)
          : current.relatedSlugs,
      seo: {
        title: String(
          seoBody.title ?? body.seoTitle ?? current.seo.title
        ).trim(),
        description: String(
          seoBody.description ?? body.seoDescription ?? current.seo.description
        ).trim(),
        keywords:
          seoBody.keywords !== undefined || body.seoKeywords !== undefined
            ? parseStringList(seoBody.keywords ?? body.seoKeywords, /,/)
            : current.seo.keywords,
      },
      content: {
        ...current.content,
        heading: String(
          contentBody.heading ?? body.heading ?? current.content.heading
        ).trim(),
        description: String(
          contentBody.description ??
            body.description ??
            current.content.description
        ).trim(),
        image: String(
          contentBody.image ?? body.image ?? current.content.image
        ),
        technologies: String(
          contentBody.technologies ??
            body.technologies ??
            current.content.technologies ??
            ""
        ).trim(),
        benefits:
          contentBody.benefits !== undefined || body.benefits !== undefined
            ? parseStringList(contentBody.benefits ?? body.benefits, /\n/)
            : current.content.benefits,
        process:
          contentBody.process !== undefined || body.process !== undefined
            ? parseProcess(contentBody.process ?? body.process)
            : current.content.process,
        ctaHeading: String(
          contentBody.ctaHeading ??
            body.ctaHeading ??
            current.content.ctaHeading
        ).trim(),
        ctaDescription: String(
          contentBody.ctaDescription ??
            body.ctaDescription ??
            current.content.ctaDescription
        ).trim(),
        faqs:
          contentBody.faqs !== undefined || body.faqs !== undefined
            ? parseFaqs(contentBody.faqs ?? body.faqs)
            : current.content.faqs,
        whyChoose:
          contentBody.whyChoose !== undefined || body.whyChoose !== undefined
            ? parseStringList(contentBody.whyChoose ?? body.whyChoose, /\n/)
            : current.content.whyChoose,
        useCases:
          contentBody.useCases !== undefined || body.useCases !== undefined
            ? parseStringList(contentBody.useCases ?? body.useCases, /\n/)
            : current.content.useCases,
        expectedResults:
          contentBody.expectedResults !== undefined ||
          body.expectedResults !== undefined
            ? parseStringList(
                contentBody.expectedResults ?? body.expectedResults,
                /\n/
              )
            : current.content.expectedResults,
      },
    };

    if (!updated.label) {
      return NextResponse.json({ error: "Label is required." }, { status: 400 });
    }

    const duplicate = services.find(
      (s) =>
        s.id !== id &&
        s.slug === updated.slug &&
        (s.parentSlug || null) === (updated.parentSlug || null)
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 400 }
      );
    }

    services[index] = updated;
    await writeContent("services", services);
    revalidateServicePaths(current);
    revalidateServicePaths(updated);
    return NextResponse.json({ service: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update service." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canDeleteContent(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const services = await getServices({ includeDisabled: true });
  const service = services.find((s) => s.id === id);

  if (!service) {
    return NextResponse.json({ error: "Service not found." }, { status: 404 });
  }

  const next = services.filter((s) => s.id !== id);
  await writeContent("services", next);
  revalidateServicePaths(service);
  return NextResponse.json({ message: "Service deleted." });
}
