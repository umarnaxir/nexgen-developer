import { NextResponse } from "next/server";
import { getTeamMembers } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const team = await getTeamMembers();
  return NextResponse.json({ team });
}
