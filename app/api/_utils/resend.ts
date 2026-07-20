const RESEND_API_URL = "https://api.resend.com/emails";

/** Public-facing email shown on the website (never the private inbox). */
export const PUBLIC_CONTACT_EMAIL = "info@nexgendevelopers.in";

/**
 * Private inbox that receives contact / callback / subscribe form emails.
 * Override with RESEND_TO_EMAIL or CONTACT_TO_EMAIL in env.
 */
export const BUSINESS_EMAIL =
  process.env.RESEND_TO_EMAIL ||
  process.env.CONTACT_TO_EMAIL ||
  "nexgendevelopers11@gmail.com";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  `NexGen Developers <${PUBLIC_CONTACT_EMAIL}>`;

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface SendEmailOptions {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendResendEmail({
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "Email service is not configured.",
    };
  }

  const messageId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [BUSINESS_EMAIL],
        subject,
        html,
        text,

        reply_to: replyTo || PUBLIC_CONTACT_EMAIL,

        tags: [
          {
            name: "source",
            value: "website-form",
          },
        ],

        headers: {
          "X-Entity-Ref-ID": messageId,
          "X-Mailer": "NexGen Developers Website",
          "Message-ID": `<${messageId}@nexgendevelopers.in>`,
          "List-Unsubscribe": `<mailto:${PUBLIC_CONTACT_EMAIL}?subject=unsubscribe>`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API Error:", data);

      return {
        ok: false,
        status: response.status,
        error:
          data?.message ||
          data?.error ||
          "Failed to send email.",
        details:
          process.env.NODE_ENV === "development"
            ? data
            : undefined,
      };
    }

    return {
      ok: true,
      status: 200,
      data,
    };
  } catch (error) {
    console.error("Resend Network Error:", error);

    return {
      ok: false,
      status: 502,
      error: "Email service is unavailable.",
      details:
        process.env.NODE_ENV === "development"
          ? error
          : undefined,
    };
  }
}
