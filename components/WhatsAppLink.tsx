"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import {
  isWhatsAppHref,
  openWhatsAppApp,
  WHATSAPP_HREF,
  WHATSAPP_REL,
} from "@/lib/whatsapp";

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function WhatsAppLink({
  href,
  onClick,
  rel,
  target,
  children,
  ...rest
}: WhatsAppLinkProps) {
  const resolvedHref =
    !href || isWhatsAppHref(href) ? WHATSAPP_HREF : href;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (!isWhatsAppHref(resolvedHref)) return;
    event.preventDefault();
    openWhatsAppApp();
  };

  return (
    <a
      href={resolvedHref}
      target={target ?? "_blank"}
      rel={rel ?? WHATSAPP_REL}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
