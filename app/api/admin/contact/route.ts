import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin/auth";
import { getContactInfo, writeContent } from "@/lib/content/store";
import type { ContactInfo } from "@/lib/content/types";

function revalidateContactPaths() {
  revalidatePath("/");
  revalidatePath("/contact-us");
  revalidatePath("/admin/contact");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const contact = await getContactInfo();
  return NextResponse.json({ contact });
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getContactInfo();

    const contact: ContactInfo = {
      companyName:
        body.companyName !== undefined
          ? String(body.companyName).trim()
          : current.companyName,
      email: body.email !== undefined ? String(body.email).trim() : current.email,
      phone: body.phone !== undefined ? String(body.phone).trim() : current.phone,
      phoneDisplay:
        body.phoneDisplay !== undefined
          ? String(body.phoneDisplay).trim()
          : current.phoneDisplay,
      address:
        body.address !== undefined ? String(body.address).trim() : current.address,
      addressRegion:
        body.addressRegion !== undefined
          ? String(body.addressRegion).trim()
          : current.addressRegion,
      mapsLink:
        body.mapsLink !== undefined
          ? String(body.mapsLink).trim()
          : current.mapsLink,
      whatsapp:
        body.whatsapp !== undefined
          ? String(body.whatsapp).trim()
          : current.whatsapp,
    };

    if (!contact.email || !contact.phone) {
      return NextResponse.json(
        { error: "Email and phone are required." },
        { status: 400 }
      );
    }

    await writeContent("contact", contact);
    revalidateContactPaths();
    return NextResponse.json({ contact });
  } catch {
    return NextResponse.json({ error: "Failed to update contact." }, { status: 500 });
  }
}
