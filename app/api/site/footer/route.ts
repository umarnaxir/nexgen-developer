import { NextResponse } from "next/server";
import { getFooterSettings } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const footer = await getFooterSettings();
  return NextResponse.json({ footer });
}
