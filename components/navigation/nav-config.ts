export type SidebarLink = {
 href: string;
 label: string;
};

export const NAV_RAIL_WIDTH_VW = 5;
/** Fixed left rail, 5% of viewport */
export const NAV_RAIL_WIDTH = `${NAV_RAIL_WIDTH_VW}vw`;
/** Main content area, 95% of viewport */
export const CONTENT_WIDTH = `${100 - NAV_RAIL_WIDTH_VW}vw`;
/** Slide-out nav panel width when menu is open */
export const SIDEBAR_PANEL_WIDTH = "min(380px, 26vw)";

export const sidebarLinks: SidebarLink[] = [
 { href: "/", label: "Home" },
 { href: "/services", label: "Services" },
 { href: "/projects", label: "Projects" },
 { href: "/about", label: "About" },
 { href: "/blogs", label: "Blogs" },
 { href: "/contact-us", label: "Contact" },
];
