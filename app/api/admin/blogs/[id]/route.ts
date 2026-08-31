import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { canDeleteContent, getSession } from "@/lib/admin/auth";
import { getBlogs, uniqueSlug, writeContent } from "@/lib/content/store";
import type { Blog } from "@/lib/content/types";

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blogs");
  if (slug) revalidatePath(`/blogs/${slug}`);
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blogs = await getBlogs({ includeDrafts: true });
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }
  return NextResponse.json({ blog });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const blogs = await getBlogs({ includeDrafts: true });
    const index = blogs.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    const current = blogs[index];
    const title =
      body.title !== undefined ? String(body.title).trim() : current.title;
    let slug =
      body.slug !== undefined
        ? uniqueSlug(
            String(body.slug).trim() || title,
            blogs.filter((b) => b.id !== id).map((b) => b.slug)
          )
        : current.slug;

    const content =
      body.content !== undefined ? String(body.content).trim() : current.content;
    const image =
      body.image !== undefined
        ? String(body.image)
        : body.featuredImage !== undefined
          ? String(body.featuredImage)
          : current.image;

    const updated: Blog = {
      ...current,
      title,
      slug,
      excerpt:
        body.excerpt !== undefined
          ? String(body.excerpt).trim()
          : body.description !== undefined
            ? String(body.description).trim()
            : current.excerpt,
      description:
        body.description !== undefined
          ? String(body.description).trim()
          : body.excerpt !== undefined
            ? String(body.excerpt).trim()
            : current.description,
      seoTitle:
        body.seoTitle !== undefined
          ? String(body.seoTitle).trim() || undefined
          : current.seoTitle,
      date: body.date !== undefined ? String(body.date).trim() : current.date,
      publishDate:
        body.publishDate !== undefined
          ? String(body.publishDate)
          : current.publishDate,
      category:
        body.category !== undefined
          ? String(body.category).trim()
          : current.category,
      image,
      images: Array.isArray(body.images)
        ? body.images.map(String)
        : image
          ? [image, ...(current.images || []).filter((img) => img !== image)]
          : current.images,
      content,
      sections: Array.isArray(body.sections)
        ? body.sections
        : body.content !== undefined
          ? content
            ? [{ type: "text", content }]
            : []
          : current.sections,
      author:
        body.author !== undefined ? String(body.author).trim() : current.author,
      readTime:
        body.readTime !== undefined
          ? String(body.readTime).trim()
          : current.readTime,
      keywords: Array.isArray(body.keywords)
        ? body.keywords.map(String)
        : typeof body.keywords === "string"
          ? body.keywords
              .split(",")
              .map((k: string) => k.trim())
              .filter(Boolean)
          : current.keywords,
      internalLink: {
        href:
          body.internalLink?.href !== undefined
            ? String(body.internalLink.href)
            : current.internalLink?.href || "/services",
        text:
          body.internalLink?.text !== undefined
            ? String(body.internalLink.text)
            : current.internalLink?.text || "Explore our services",
      },
      externalLink: {
        href:
          body.externalLink?.href !== undefined
            ? String(body.externalLink.href)
            : current.externalLink?.href || "",
        text:
          body.externalLink?.text !== undefined
            ? String(body.externalLink.text)
            : current.externalLink?.text || "",
      },
      status:
        body.status === "draft" || body.status === "published"
          ? body.status
          : current.status,
    };

    if (!updated.title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    blogs[index] = updated;
    await writeContent("blogs", blogs);
    revalidateBlogPaths(current.slug);
    revalidateBlogPaths(updated.slug);
    return NextResponse.json({ blog: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update blog." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canDeleteContent(session.role)) {
    return NextResponse.json(
      { error: "Editors cannot delete content." },
      { status: 403 }
    );
  }

  const { id } = await params;
  const blogs = await getBlogs({ includeDrafts: true });
  const blog = blogs.find((b) => b.id === id);
  const next = blogs.filter((b) => b.id !== id);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  await writeContent("blogs", next);
  revalidateBlogPaths(blog.slug);
  return NextResponse.json({ message: "Blog deleted." });
}
