"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { adminUi } from "@/lib/admin/ui";

type AdminContactPreviewProps = {
  contact: ContactInfo;
  className?: string;
};

export function AdminContactPreview({ contact, className }: AdminContactPreviewProps) {
  return (
    <aside
      className={cn(
        adminUi.card,
        "overflow-hidden p-0",
        className
      )}
    >
      <div className="border-b border-gold/15 bg-[#111111] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Live preview
        </p>
        <p className="mt-0.5 text-[11px] text-gold-light/60">
          Matches Contact page & footer contact column
        </p>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        {contact.phoneDisplay || contact.phone ? (
          <div className="flex items-start gap-3 rounded-lg border border-gold/20 bg-background-soft p-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-gray">
                Phone
              </p>
              <p className="text-sm font-medium text-primary">
                {contact.phoneDisplay || contact.phone}
              </p>
            </div>
          </div>
        ) : null}
        {contact.email ? (
          <div className="flex items-start gap-3 rounded-lg border border-gold/20 bg-background-soft p-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-gray">
                Email
              </p>
              <p className="text-sm font-medium text-primary">{contact.email}</p>
            </div>
          </div>
        ) : null}
        {contact.address || contact.addressRegion ? (
          <div className="flex items-start gap-3 rounded-lg border border-gold/20 bg-background-soft p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-gray">
                Location
              </p>
              {contact.addressRegion ? (
                <p className="text-xs text-gold-dark">{contact.addressRegion}</p>
              ) : null}
              <p className="text-sm text-primary">{contact.address}</p>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

type AdminFooterPreviewProps = {
  footer: FooterSettings;
  className?: string;
};

export function AdminFooterPreview({ footer, className }: AdminFooterPreviewProps) {
  const year = new Date().getFullYear();
  const copyright = (footer.copyrightText || `© {year} ${footer.companyName}`)
    .replace("{year}", String(year))
    .replace("%YEAR%", String(year));

  const socialCount = Object.values(footer.social || {}).filter(Boolean).length;

  return (
    <aside className={cn(adminUi.card, "overflow-hidden p-0", className)}>
      <div className="border-b border-gold/15 bg-[#111111] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          Live preview
        </p>
        <p className="mt-0.5 text-[11px] text-gold-light/60">Site footer bar</p>
      </div>
      <div className="bg-[#111111] p-4 text-white sm:p-5">
        {footer.companyInfo ? (
          <p className="text-sm text-gold-light/80">{footer.companyInfo}</p>
        ) : null}
        <p className="mt-3 text-[12px] text-gold-light/45">{copyright}</p>
        {footer.craftedText ? (
          <p className="mt-1 text-[11px] text-gold-light/35">{footer.craftedText}</p>
        ) : null}
        <p className="mt-3 text-[10px] text-gold-light/40">
          {socialCount} social link{socialCount === 1 ? "" : "s"} configured
        </p>
      </div>
    </aside>
  );
}
