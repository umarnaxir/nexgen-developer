import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  setSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const session = await verifyAdminPassword(email, password);
    if (!session) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(session);
    const response = NextResponse.json({
      user: session,
      message: "Logged in successfully.",
    });
    setSessionCookie(response, token);
    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to log in. Please try again." },
      { status: 500 }
    );
  }
}
