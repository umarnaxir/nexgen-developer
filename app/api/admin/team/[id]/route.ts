import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { canDeleteContent, getSession } from "@/lib/admin/auth";
import { getTeamMembers, writeContent } from "@/lib/content/store";
import type { TeamMember } from "@/lib/content/types";

function revalidateTeamPaths() {
  revalidatePath("/team");
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const team = await getTeamMembers({ includeDisabled: true });
  const member = team.find((m) => m.id === id);
  if (!member) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }
  return NextResponse.json({ member });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const team = await getTeamMembers({ includeDisabled: true });
    const index = team.findIndex((m) => m.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }

    const current = team[index];
    const updated: TeamMember = {
      ...current,
      name: body.name !== undefined ? String(body.name).trim() : current.name,
      designation:
        body.designation !== undefined
          ? String(body.designation).trim()
          : current.designation,
      email: body.email !== undefined ? String(body.email).trim() : current.email,
      phone: body.phone !== undefined ? String(body.phone).trim() : current.phone,
      image: body.image !== undefined ? String(body.image) : current.image,
      socialLinks: {
        linkedin:
          body.socialLinks?.linkedin !== undefined
            ? String(body.socialLinks.linkedin)
            : current.socialLinks?.linkedin || "",
        twitter:
          body.socialLinks?.twitter !== undefined
            ? String(body.socialLinks.twitter)
            : current.socialLinks?.twitter || "",
        github:
          body.socialLinks?.github !== undefined
            ? String(body.socialLinks.github)
            : current.socialLinks?.github || "",
        instagram:
          body.socialLinks?.instagram !== undefined
            ? String(body.socialLinks.instagram)
            : current.socialLinks?.instagram || "",
      },
      role:
        body.role === "admin" || body.role === "super_admin" || body.role === "member"
          ? body.role
          : current.role,
      enabled: body.enabled !== undefined ? Boolean(body.enabled) : current.enabled,
      order: typeof body.order === "number" ? body.order : current.order,
    };

    if (!updated.name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    team[index] = updated;
    await writeContent("team", team);
    revalidateTeamPaths();
    return NextResponse.json({ member: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update member." }, { status: 500 });
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
  const team = await getTeamMembers({ includeDisabled: true });
  const next = team.filter((m) => m.id !== id);

  if (next.length === team.length) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  await writeContent("team", next);
  revalidateTeamPaths();
  return NextResponse.json({ message: "Member deleted." });
}
