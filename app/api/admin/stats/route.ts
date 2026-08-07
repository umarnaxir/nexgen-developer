import { NextResponse } from "next/server";
import { getSession } from "@/lib/admin/auth";
import { getContentStats } from "@/lib/content/store";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getContentStats();
  return NextResponse.json({ stats, user: session });
}
