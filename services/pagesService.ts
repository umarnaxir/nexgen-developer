"use client";

// Page content interface
export interface PageContent {
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  updatedAt: string;
}

export interface PageSection {
  id: string;
  type: "hero" | "text" | "features" | "stats" | "cta" | "team" | "values" | "faq" | "custom";
  title?: string;
  subtitle?: string;
  content?: string;
  items?: SectionItem[];
  visible: boolean;
  order: number;
}

export interface SectionItem {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  link?: string;
  value?: string;
}

const PAGES_STORAGE_KEY = "nexgen_pages";

// Default page content
const DEFAULT_PAGES: PageContent[] = [
  {
    id: "privacy",
    slug: "privacy",
    title: "Privacy Policy",
    sections: [
      {
        id: "privacy-hero",
        type: "hero",
        title: "Privacy Policy",
        subtitle: "Last updated: February 1, 2026",
        visible: true,
        order: 0,
      },
      {
        id: "privacy-content",
        type: "text",
        title: "Your Privacy Matters",
        content: `<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>

<h2>2. How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

<h2>3. Information Sharing</h2>
<p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information.</p>

<h2>4. Data Security</h2>
<p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

<h2>5. Cookies</h2>
<p>We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings.</p>

<h2>6. Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at privacy@nexgen.dev</p>`,
        visible: true,
        order: 1,
      },
    ],
    seo: {
      metaTitle: "Privacy Policy | NexGen",
      metaDescription: "Read our privacy policy to understand how we collect, use, and protect your personal information.",
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "terms",
    slug: "terms",
    title: "Terms & Conditions",
    sections: [
      {
        id: "terms-hero",
        type: "hero",
        title: "Terms & Conditions",
        subtitle: "Last updated: February 1, 2026",
        visible: true,
        order: 0,
      },
      {
        id: "terms-content",
        type: "text",
        title: "Terms of Service",
        content: `<h2>1. Acceptance of Terms</h2>
<p>By accessing and using NexGen's services, you accept and agree to be bound by the terms and provisions of this agreement.</p>

<h2>2. Services</h2>
<p>NexGen provides web development, mobile app development, and digital solutions. The specific services will be outlined in individual project agreements.</p>

<h2>3. User Responsibilities</h2>
<p>You agree to provide accurate information and maintain the confidentiality of your account credentials.</p>

<h2>4. Intellectual Property</h2>
<p>All content, trademarks, and intellectual property on this website are owned by NexGen unless otherwise stated.</p>

<h2>5. Limitation of Liability</h2>
<p>NexGen shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>

<h2>6. Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>

<h2>7. Contact</h2>
<p>For questions about these terms, contact us at legal@nexgen.dev</p>`,
        visible: true,
        order: 1,
      },
    ],
    seo: {
      metaTitle: "Terms & Conditions | NexGen",
      metaDescription: "Read our terms and conditions to understand the rules and regulations for using NexGen services.",
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "home",
    slug: "home",
    title: "Home Page",
    sections: [
      {
        id: "home-hero",
        type: "hero",
        title: "Build Your Digital Future with NexGen",
        subtitle: "We create innovative web and mobile solutions that drive business growth",
        visible: true,
        order: 0,
      },
      {
        id: "home-stats",
        type: "stats",
        title: "Our Impact",
        visible: true,
        order: 1,
        items: [
          { id: "stat-1", title: "Projects Completed", value: "150+" },
          { id: "stat-2", title: "Happy Clients", value: "100+" },
          { id: "stat-3", title: "Years Experience", value: "5+" },
          { id: "stat-4", title: "Team Members", value: "20+" },
        ],
      },
      {
        id: "home-services",
        type: "features",
        title: "Our Services",
        subtitle: "What We Offer",
        visible: true,
        order: 2,
        items: [
          { id: "service-1", title: "Web Development", description: "Custom websites and web applications built with modern technologies", icon: "code" },
          { id: "service-2", title: "Mobile Apps", description: "Native and cross-platform mobile applications", icon: "smartphone" },
          { id: "service-3", title: "UI/UX Design", description: "Beautiful and intuitive user interfaces", icon: "palette" },
          { id: "service-4", title: "Cloud Solutions", description: "Scalable cloud infrastructure and services", icon: "cloud" },
        ],
      },
      {
        id: "home-cta",
        type: "cta",
        title: "Ready to Start Your Project?",
        subtitle: "Let's discuss how we can help bring your ideas to life",
        visible: true,
        order: 3,
      },
    ],
    seo: {
      metaTitle: "NexGen - Digital Solutions & Web Development",
      metaDescription: "NexGen provides innovative web development, mobile apps, and digital solutions to help businesses grow.",
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "about",
    slug: "about",
    title: "About Us",
    sections: [
      {
        id: "about-hero",
        type: "hero",
        title: "About NexGen",
        subtitle: "We're a team of passionate developers and designers creating digital excellence",
        visible: true,
        order: 0,
      },
      {
        id: "about-story",
        type: "text",
        title: "Our Story",
        content: `<p>Founded in 2021, NexGen started with a simple mission: to help businesses succeed in the digital age. What began as a small team of developers has grown into a full-service digital agency serving clients worldwide.</p>

<p>We believe in the power of technology to transform businesses. Our approach combines technical expertise with creative thinking to deliver solutions that not only meet but exceed our clients' expectations.</p>`,
        visible: true,
        order: 1,
      },
      {
        id: "about-values",
        type: "values",
        title: "Our Values",
        visible: true,
        order: 2,
        items: [
          { id: "value-1", title: "Innovation", description: "We stay ahead of technology trends" },
          { id: "value-2", title: "Quality", description: "We never compromise on quality" },
          { id: "value-3", title: "Collaboration", description: "We work closely with our clients" },
          { id: "value-4", title: "Integrity", description: "We operate with honesty and transparency" },
        ],
      },
    ],
    seo: {
      metaTitle: "About Us | NexGen",
      metaDescription: "Learn about NexGen's mission, values, and the team behind our digital solutions.",
    },
    updatedAt: new Date().toISOString(),
  },
];

// Initialize default pages
export function initializePages(): void {
  if (typeof window === "undefined") return;

  const existingPages = localStorage.getItem(PAGES_STORAGE_KEY);
  if (!existingPages) {
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(DEFAULT_PAGES));
  }
}

// Get all pages
export function getPages(): PageContent[] {
  if (typeof window === "undefined") return [];

  const pagesJson = localStorage.getItem(PAGES_STORAGE_KEY);
  if (!pagesJson) {
    initializePages();
    return DEFAULT_PAGES;
  }

  try {
    return JSON.parse(pagesJson);
  } catch {
    return DEFAULT_PAGES;
  }
}

// Save pages to localStorage
export function savePages(pages: PageContent[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
}

// Get page by ID
export function getPageById(id: string): PageContent | undefined {
  const pages = getPages();
  return pages.find((page) => page.id === id);
}

// Get page by slug
export function getPageBySlug(slug: string): PageContent | undefined {
  const pages = getPages();
  return pages.find((page) => page.slug === slug);
}

// Update page
export function updatePage(id: string, updates: Partial<PageContent>): PageContent | null {
  const pages = getPages();
  const index = pages.findIndex((page) => page.id === id);

  if (index === -1) return null;

  pages[index] = {
    ...pages[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  savePages(pages);
  return pages[index];
}

// Update page section
export function updatePageSection(pageId: string, sectionId: string, updates: Partial<PageSection>): boolean {
  const pages = getPages();
  const pageIndex = pages.findIndex((page) => page.id === pageId);

  if (pageIndex === -1) return false;

  const sectionIndex = pages[pageIndex].sections.findIndex((section) => section.id === sectionId);
  if (sectionIndex === -1) return false;

  pages[pageIndex].sections[sectionIndex] = {
    ...pages[pageIndex].sections[sectionIndex],
    ...updates,
  };
  pages[pageIndex].updatedAt = new Date().toISOString();

  savePages(pages);
  return true;
}

// Add section to page
export function addPageSection(pageId: string, section: PageSection): boolean {
  const pages = getPages();
  const pageIndex = pages.findIndex((page) => page.id === pageId);

  if (pageIndex === -1) return false;

  pages[pageIndex].sections.push(section);
  pages[pageIndex].updatedAt = new Date().toISOString();

  savePages(pages);
  return true;
}

// Delete section from page
export function deletePageSection(pageId: string, sectionId: string): boolean {
  const pages = getPages();
  const pageIndex = pages.findIndex((page) => page.id === pageId);

  if (pageIndex === -1) return false;

  pages[pageIndex].sections = pages[pageIndex].sections.filter((section) => section.id !== sectionId);
  pages[pageIndex].updatedAt = new Date().toISOString();

  savePages(pages);
  return true;
}

// Reorder sections
export function reorderPageSections(pageId: string, sectionIds: string[]): boolean {
  const pages = getPages();
  const pageIndex = pages.findIndex((page) => page.id === pageId);

  if (pageIndex === -1) return false;

  const reorderedSections = sectionIds
    .map((id, index) => {
      const section = pages[pageIndex].sections.find((s) => s.id === id);
      if (section) {
        return { ...section, order: index };
      }
      return null;
    })
    .filter(Boolean) as PageSection[];

  pages[pageIndex].sections = reorderedSections;
  pages[pageIndex].updatedAt = new Date().toISOString();

  savePages(pages);
  return true;
}
