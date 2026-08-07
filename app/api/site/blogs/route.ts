import { NextResponse } from "next/server";
import { getBlogBySlug, getBlogs } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const blog = await getBlogBySlug(slug);
    if (!blog || blog.status !== "published") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ blog });
  }

  const blogs = await getBlogs();
  return NextResponse.json({ blogs });
}
