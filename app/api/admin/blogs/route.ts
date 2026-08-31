import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/admin/auth";
import { getBlogs, uniqueSlug, writeContent } from "@/lib/content/store";
import type { Blog } from "@/lib/content/types";

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blogs");
  if (slug) revalidatePath(`/blogs/${slug}`);
}

function normalizeSections(body: Record<string, unknown>, content: string) {
  if (Array.isArray(body.sections) && body.sections.length > 0) {
    return body.sections as Blog["sections"];
  }
  if (content.trim()) {
    return [{ type: "text" as const, content }];
  }
  return [];
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const blogs = await getBlogs({ includeDrafts: true });
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const blogs = await getBlogs({ includeDrafts: true });
    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const slug = uniqueSlug(String(body.slug || "").trim() || title, blogs.map((b) => b.slug));

    const content = String(body.content || "").trim();
    const image = String(body.image || body.featuredImage || "");
    const publishDate = String(body.publishDate || new Date().toISOString());
    const date =
      String(body.date || "").trim() ||
      new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    const blog: Blog = {
      id: randomUUID(),
      title,
      slug,
      excerpt: String(body.excerpt || body.description || "").trim(),
      description: String(body.description || body.excerpt || "").trim(),
      seoTitle: String(body.seoTitle || "").trim() || undefined,
      date,
      publishDate,
      category: String(body.category || "General").trim(),
      image,
      images: Array.isArray(body.images)
        ? body.images.map(String)
        : image
          ? [image]
          : [],
      content,
      sections: normalizeSections(body, content),
      author: String(body.author || "NexGen Developers Team").trim(),
      readTime: String(body.readTime || "5 min read").trim(),
      keywords: Array.isArray(body.keywords)
        ? body.keywords.map(String)
        : String(body.keywords || "")
            .split(",")
            .map((k: string) => k.trim())
            .filter(Boolean),
      internalLink: {
        href: String(body.internalLink?.href || "/services"),
        text: String(body.internalLink?.text || "Explore our services"),
      },
      externalLink: {
        href: String(body.externalLink?.href || ""),
        text: String(body.externalLink?.text || ""),
      },
      status: body.status === "draft" ? "draft" : "published",
    };

    blogs.unshift(blog);
    await writeContent("blogs", blogs);
    revalidateBlogPaths(blog.slug);
    return NextResponse.json({ blog }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog." }, { status: 500 });
  }
}
