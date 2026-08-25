import themeJson from "@/content/theme.json";
import adminJson from "@/content/admin.json";
import type { AdminRole } from "@/lib/content/types";

export type ThemeConfig = typeof themeJson;
export type AdminConfig = typeof adminJson;

export type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
  roles?: AdminRole[];
};

export const theme: ThemeConfig = themeJson;
export const adminConfig: AdminConfig = adminJson;

export const brand = theme.brand;
export const logos = theme.logos;
export const colors = theme.colors;
export const darkColors = theme.dark;

/** CSS custom-property map matching `app/globals.css` `:root` tokens. */
export const cssVarMap = {
  "--background": colors.background,
  "--background-soft": colors.backgroundSoft,
  "--foreground": colors.foreground,
  "--primary": colors.primary,
  "--primary-deep": colors.primaryDeep,
  "--primary-foreground": colors.primaryForeground,
  "--text-dark": colors.foreground,
  "--text-gray": colors.textGray,
  "--gold": colors.gold,
  "--gold-dark": colors.goldDark,
  "--gold-light": colors.goldLight,
  "--border": colors.border,
  "--ring": colors.ring,
} as const;

export function getAdminNav(role?: AdminRole): AdminNavItem[] {
  return (adminConfig.nav as AdminNavItem[]).filter(
    (item) => !item.roles || (role ? item.roles.includes(role) : false)
  );
}
