import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/admin/auth";
import { getTeamMembers, writeContent } from "@/lib/content/store";
import type { TeamMember } from "@/lib/content/types";

function revalidateTeamPaths() {
  revalidatePath("/team");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const team = await getTeamMembers({ includeDisabled: true });
  return NextResponse.json({ team });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const team = await getTeamMembers({ includeDisabled: true });

    const member: TeamMember = {
      id: randomUUID(),
      name: String(body.name || "").trim(),
      designation: String(body.designation || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      image: String(body.image || "/images/team/employee-no-profile.jpg"),
      socialLinks: {
        linkedin: String(body.socialLinks?.linkedin || ""),
        twitter: String(body.socialLinks?.twitter || ""),
        github: String(body.socialLinks?.github || ""),
        instagram: String(body.socialLinks?.instagram || ""),
      },
      role: body.role === "admin" || body.role === "super_admin" ? body.role : "member",
      enabled: body.enabled !== false,
      order: typeof body.order === "number" ? body.order : team.length + 1,
    };

    if (!member.name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    team.push(member);
    await writeContent("team", team);
    revalidateTeamPaths();
    return NextResponse.json({ member }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create team member." }, { status: 500 });
  }
}
