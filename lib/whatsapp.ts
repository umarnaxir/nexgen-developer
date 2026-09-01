export const WHATSAPP_PHONE = "916006161726";
export const WHATSAPP_MESSAGE =
  "Hi NexGen Developers, I want to discuss a project.";
export const WHATSAPP_REL = "noopener noreferrer nofollow";

function encodedMessage(message = WHATSAPP_MESSAGE) {
  return encodeURIComponent(message);
}

/** Official click-to-chat URL. The OS hands this off to the installed WhatsApp app. */
export function buildWhatsAppHttpsUrl(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage(message)}`;
}

/** Native app protocol — opens WhatsApp Desktop/mobile without WhatsApp Web. */
export function buildWhatsAppAppUrl(message = WHATSAPP_MESSAGE) {
  return `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodedMessage(message)}`;
}

export const WHATSAPP_HREF = buildWhatsAppHttpsUrl();

export function isWhatsAppHref(href?: string | null) {
  if (!href) return false;
  return /wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:\/\//i.test(href);
}

export function normalizeWhatsAppHref(href?: string | null) {
  if (!href?.trim() || isWhatsAppHref(href)) return WHATSAPP_HREF;
  return href;
}

export function openWhatsAppApp() {
  const appUrl = buildWhatsAppAppUrl();
  const started = Date.now();

  window.location.href = appUrl;

  window.setTimeout(() => {
    if (document.visibilityState === "hidden") return;
    if (Date.now() - started > 2000) return;
    window.open(WHATSAPP_HREF, "_blank", "noopener,noreferrer");
  }, 900);
}
