import { NextResponse } from "next/server";
import { getFeaturedProjects, getProjects } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured") === "true";
  const projects = featured ? await getFeaturedProjects() : await getProjects();
  return NextResponse.json({ projects });
}
