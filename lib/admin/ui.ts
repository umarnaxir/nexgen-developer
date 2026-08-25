/**
 * Centralized admin UI class tokens — black / gold / white to match the frontend.
 * Color hex values live in `content/theme.json`; these map them to Tailwind utilities.
 */
export const adminUi = {
  shell: "min-h-screen overflow-x-hidden bg-background-soft text-foreground",

  sidebar: {
    root: "fixed inset-y-0 left-0 z-[100] flex flex-col bg-[#111111] text-white transition-transform duration-300 ease-out",
    border: "border-gold/20",
    brandTitle: "truncate text-sm font-semibold tracking-tight text-gold",
    brandSub: "truncate text-xs text-gold-light/55",
    iconBtn:
      "hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-gold-light/70 transition hover:bg-gold/10 hover:text-gold lg:inline-flex",
    iconBtnMobile:
      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-gold transition hover:bg-gold/10 active:scale-95 lg:hidden",
    navItem:
      "group flex items-center gap-3 rounded-md px-3 py-3.5 text-[15px] transition sm:py-2.5 sm:text-sm",
    navActive:
      "bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(230,201,166,0.28)]",
    navIdle: "text-gold-light/70 hover:bg-white/5 hover:text-gold",
    visit:
      "flex items-center gap-3 rounded-md px-3 py-3.5 text-[15px] text-gold/90 transition hover:bg-gold/10 hover:text-gold sm:py-2.5 sm:text-sm",
  },

  header: {
    root: "sticky top-0 z-30 border-b border-gold/25 bg-white/95 backdrop-blur-md",
    menuBtn:
      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-primary transition hover:bg-gold/15 hover:text-gold-dark active:scale-95 lg:hidden",
    search:
      "h-10 w-full rounded-md border border-gold/30 bg-background-soft pl-10 pr-3 text-sm text-foreground outline-none transition placeholder:text-text-gray/70 focus:border-gold-dark focus:bg-white focus:ring-2 focus:ring-gold/25 sm:h-11 sm:pr-4",
    searchHit: "flex items-start justify-between gap-3 px-4 py-2.5 transition hover:bg-gold/10",
    avatar: "flex h-8 w-8 items-center justify-center rounded-md bg-gold text-xs font-semibold text-primary",
    profileOpen: "border-gold ring-2 ring-gold/25",
    roleBadge: "mt-2 inline-flex rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold-dark",
  },

  button: {
    primary: "bg-gold text-primary hover:bg-gold-dark shadow-sm",
    secondary:
      "border border-gold/30 bg-white text-primary hover:bg-gold/10",
    ghost: "text-text-gray hover:bg-gold/10 hover:text-primary",
    danger: "bg-red-600 text-white hover:bg-red-500",
  },

  field:
    "h-10 w-full rounded-md border border-gold/30 bg-white px-3 text-sm text-foreground outline-none transition placeholder:text-text-gray/70 focus:border-gold-dark focus:ring-2 focus:ring-gold/25",
  textarea:
    "min-h-[110px] w-full rounded-md border border-gold/30 bg-white px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-text-gray/70 focus:border-gold-dark focus:ring-2 focus:ring-gold/25",
  label: "text-sm font-medium text-primary",
  hint: "text-xs text-text-gray",

  card: "rounded-md border border-gold/25 bg-white",
  cardMuted: "rounded-md border border-gold/20 bg-background-soft",
  tableHead:
    "border-b border-gold/20 bg-background-soft text-xs uppercase tracking-wide text-text-gray",
  tableRow: "hover:bg-gold/[0.06]",
  tableDivider: "divide-y divide-gold/15",

  badge: {
    active: "inline-flex rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-medium text-gold-dark",
    muted:
      "inline-flex rounded-full bg-background-soft px-2.5 py-0.5 text-xs font-medium text-text-gray",
    warning:
      "inline-flex rounded-full bg-gold-light px-2.5 py-0.5 text-xs font-medium text-primary",
    roleSuper: "inline-flex rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-gold",
    roleAdmin: "inline-flex rounded-full bg-gold/25 px-2.5 py-0.5 text-xs font-medium text-primary",
    roleEditor:
      "inline-flex rounded-full bg-background-soft px-2.5 py-0.5 text-xs font-medium text-text-gray",
  },

  link: "inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-gold-dark",
  spinner: "h-4 w-4 animate-spin text-gold-dark",
  checkbox:
    "h-4 w-4 rounded border-gold/40 text-gold-dark focus:ring-gold-dark",
  softHover:
    "hover:border-gold hover:bg-gold/10 hover:text-primary",
  dropzoneHover: "hover:border-gold hover:bg-gold/10 hover:text-gold-dark",
  login: {
    page: "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-4 py-10",
    glow: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,201,166,0.22),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.04),_transparent_50%)]",
    logoWrap:
      "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-gold/30 bg-gold/10",
    form: "rounded-lg border border-gold/25 bg-white p-5 shadow-2xl shadow-black/40 sm:p-8",
  },

  dashboardCard:
    "group relative overflow-hidden rounded-xl border border-gold/30 bg-[#111111] p-5 text-white shadow-[0_24px_56px_-28px_rgba(0,0,0,0.55)] transition duration-200 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_28px_64px_-24px_rgba(230,201,166,0.35)] active:scale-[0.97] sm:p-7 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,_rgba(230,201,166,0.18),_transparent_55%)] before:opacity-100",
  dashboardCardLabel: "relative text-xs font-medium text-gold sm:text-sm",
  dashboardCardValue:
    "relative mt-3 text-xl font-semibold tracking-tight text-white sm:mt-4 sm:text-3xl",
  dashboardCardHint: "relative mt-2 line-clamp-1 text-[11px] text-gold-light/70 sm:text-xs",
} as const;
