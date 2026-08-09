import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/admin/auth";
import { getFooterSettings, writeContent } from "@/lib/content/store";
import type { FooterSettings } from "@/lib/content/types";

function revalidateFooterPaths() {
  revalidatePath("/");
  revalidatePath("/contact-us");
  revalidatePath("/admin/footer");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const footer = await getFooterSettings();
  return NextResponse.json({ footer });
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getFooterSettings();

    const footer: FooterSettings = {
      companyName:
        body.companyName !== undefined
          ? String(body.companyName).trim()
          : current.companyName,
      companyInfo:
        body.companyInfo !== undefined
          ? String(body.companyInfo).trim()
          : current.companyInfo,
      copyrightText:
        body.copyrightText !== undefined
          ? String(body.copyrightText).trim()
          : current.copyrightText,
      craftedText:
        body.craftedText !== undefined
          ? String(body.craftedText).trim()
          : current.craftedText,
      social: {
        facebook:
          body.social?.facebook !== undefined
            ? String(body.social.facebook).trim()
            : current.social.facebook || "",
        instagram:
          body.social?.instagram !== undefined
            ? String(body.social.instagram).trim()
            : current.social.instagram || "",
        linkedin:
          body.social?.linkedin !== undefined
            ? String(body.social.linkedin).trim()
            : current.social.linkedin || "",
        twitter:
          body.social?.twitter !== undefined
            ? String(body.social.twitter).trim()
            : current.social.twitter || "",
        github:
          body.social?.github !== undefined
            ? String(body.social.github).trim()
            : current.social.github || "",
        youtube:
          body.social?.youtube !== undefined
            ? String(body.social.youtube).trim()
            : current.social.youtube || "",
      },
    };

    await writeContent("footer", footer);
    revalidateFooterPaths();
    return NextResponse.json({ footer });
  } catch {
    return NextResponse.json({ error: "Failed to update footer." }, { status: 500 });
  }
}
