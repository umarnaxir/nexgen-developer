import { NextResponse } from "next/server";
import { getSession } from "./auth";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function withAdminAuth<T>(
  handler: () => Promise<T>
): Promise<T | NextResponse> {
  const session = await getSession();
  if (!session) return jsonError("Unauthorized", 401);
  return handler();
}
