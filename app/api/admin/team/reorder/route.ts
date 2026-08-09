import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin/auth";
import { getTeamMembers, writeContent } from "@/lib/content/store";

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const orderedIds = Array.isArray(body.orderedIds)
      ? body.orderedIds.map(String)
      : [];

    if (!orderedIds.length) {
      return NextResponse.json(
        { error: "orderedIds array is required." },
        { status: 400 }
      );
    }

    const team = await getTeamMembers({ includeDisabled: true });
    const byId = new Map(team.map((m) => [m.id, m]));
    const reordered = orderedIds
      .map((id: string, index: number) => {
        const member = byId.get(id);
        if (!member) return null;
        return { ...member, order: index + 1 };
      })
      .filter(Boolean);

    // Keep any members not included at the end
    const included = new Set(orderedIds);
    const leftovers = team
      .filter((m) => !included.has(m.id))
      .map((m, i) => ({ ...m, order: reordered.length + i + 1 }));

    const next = [...reordered, ...leftovers] as typeof team;
    await writeContent("team", next);
    revalidatePath("/team");
    return NextResponse.json({ team: next });
  } catch {
    return NextResponse.json(
      { error: "Failed to reorder team." },
      { status: 500 }
    );
  }
}
