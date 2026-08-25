import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin/auth";
import {
  getProjects,
  nextProjectId,
  writeContent,
} from "@/lib/content/store";
import type { Project } from "@/lib/content/types";

function revalidateProjectPaths() {
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const projects = await getProjects();
    const id = nextProjectId(projects);

    const project: Project = {
      id,
      title: String(body.title || "").trim(),
      description: String(body.description || "").trim(),
      detailedDescription: String(body.detailedDescription || body.description || "").trim(),
      image: String(body.image || ""),
      gallery: Array.isArray(body.gallery) ? body.gallery.map(String) : [],
      link: String(body.link || ""),
      technologies: Array.isArray(body.technologies)
        ? body.technologies.map(String).filter(Boolean)
        : String(body.technologies || "")
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean),
      category: String(body.category || "").trim(),
      features: Array.isArray(body.features)
        ? body.features.map(String).filter(Boolean)
        : String(body.features || "")
            .split("\n")
            .map((t: string) => t.trim())
            .filter(Boolean),
      duration: String(body.duration || "").trim(),
      client: String(body.client || "").trim(),
      icon: String(body.icon || "Globe"),
      color: String(body.color || "bg-gold"),
      featured: Boolean(body.featured),
      order: typeof body.order === "number" ? body.order : projects.length + 1,
    };

    if (!project.title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    projects.push(project);
    await writeContent("projects", projects);
    revalidateProjectPaths();
    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
