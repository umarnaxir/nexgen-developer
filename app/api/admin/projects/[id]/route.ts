import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { canDeleteContent, getSession } from "@/lib/admin/auth";
import { getProjects, writeContent } from "@/lib/content/store";
import type { Project } from "@/lib/content/types";

function revalidateProjectPaths() {
  revalidatePath("/");
  revalidatePath("/projects");
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = Number(id);
  const projects = await getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const projectId = Number(id);
    const body = await request.json();
    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === projectId);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const current = projects[index];
    const updated: Project = {
      ...current,
      title: body.title !== undefined ? String(body.title).trim() : current.title,
      description:
        body.description !== undefined
          ? String(body.description).trim()
          : current.description,
      detailedDescription:
        body.detailedDescription !== undefined
          ? String(body.detailedDescription).trim()
          : current.detailedDescription,
      image: body.image !== undefined ? String(body.image) : current.image,
      gallery: Array.isArray(body.gallery)
        ? body.gallery.map(String)
        : current.gallery,
      link: body.link !== undefined ? String(body.link) : current.link,
      technologies: Array.isArray(body.technologies)
        ? body.technologies.map(String).filter(Boolean)
        : typeof body.technologies === "string"
          ? body.technologies
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : current.technologies,
      category:
        body.category !== undefined
          ? String(body.category).trim()
          : current.category,
      features: Array.isArray(body.features)
        ? body.features.map(String).filter(Boolean)
        : typeof body.features === "string"
          ? body.features
              .split("\n")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : current.features,
      duration:
        body.duration !== undefined
          ? String(body.duration).trim()
          : current.duration,
      client:
        body.client !== undefined ? String(body.client).trim() : current.client,
      icon: body.icon !== undefined ? String(body.icon) : current.icon,
      color: body.color !== undefined ? String(body.color) : current.color,
      featured:
        body.featured !== undefined ? Boolean(body.featured) : current.featured,
      order:
        typeof body.order === "number" ? body.order : current.order,
    };

    if (!updated.title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    projects[index] = updated;
    await writeContent("projects", projects);
    revalidateProjectPaths();
    return NextResponse.json({ project: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
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
  const projectId = Number(id);
  const projects = await getProjects();
  const next = projects.filter((p) => p.id !== projectId);

  if (next.length === projects.length) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  await writeContent("projects", next);
  revalidateProjectPaths();
  return NextResponse.json({ message: "Project deleted." });
}
