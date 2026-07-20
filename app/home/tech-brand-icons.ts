import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

type BrandIcon =
  | { type: "svg"; icon: SimpleIcon }
  | { type: "url"; src: string; color?: string; mono?: boolean };

const ICON_LIST = Object.values(simpleIcons).filter(
  (value): value is SimpleIcon =>
    Boolean(value && typeof value === "object" && "slug" in value && "path" in value)
);

const bySlug = new Map(ICON_LIST.map((icon) => [icon.slug, icon]));

/** Exact label → simple-icons slug (when available in current package). */
const EXACT_SLUGS: Record<string, string> = {
  "javascript (es6+)": "javascript",
  typescript: "typescript",
  python: "python",
  java: "openjdk",
  "c++": "cplusplus",
  sql: "mysql",
  html5: "html5",
  css3: "css",

  "react.js": "react",
  "next.js": "nextdotjs",
  "react native": "react",
  "tailwind css": "tailwindcss",
  "styled components": "styledcomponents",
  bootstrap: "bootstrap",
  redux: "redux",
  "responsive web design": "css",
  "progressive web apps (pwa)": "pwa",

  "node.js": "nodedotjs",
  "express.js": "express",
  nestjs: "nestjs",
  django: "django",
  fastapi: "fastapi",
  flask: "flask",
  "rest apis": "swagger",
  graphql: "graphql",
  microservices: "docker",
  "authentication & authorization (jwt, oauth)": "jsonwebtokens",

  "cross-platform mobile applications": "flutter",
  "api integration": "postman",
  "firebase integration": "firebase",
  "push notifications": "firebase",

  "artificial intelligence (ai)": "claude",
  "machine learning (ml)": "scikitlearn",
  "deep learning": "pytorch",
  "generative ai": "googlegemini",
  "large language models (llms)": "googlegemini",
  "prompt engineering": "claude",
  "retrieval-augmented generation (rag)": "langchain",
  "ai chatbots": "metaai",
  langchain: "langchain",
  faiss: "meta",
  opencv: "opencv",
  tensorflow: "tensorflow",
  keras: "keras",
  "scikit-learn": "scikitlearn",
  numpy: "numpy",
  pandas: "pandas",
  matplotlib: "plotly",
  "statistical analysis": "r",
  "predictive modeling": "scikitlearn",
  "data wrangling": "pandas",
  "computer vision": "opencv",

  "data visualization": "plotly",
  "business intelligence": "grafana",
  "database management systems (dbms)": "postgresql",

  mongodb: "mongodb",
  mysql: "mysql",
  postgresql: "postgresql",
  "firebase firestore": "firebase",

  vercel: "vercel",
  docker: "docker",
  git: "git",
  github: "github",
  "git bash": "git",
  "ci/cd": "githubactions",
  "cloud deployment": "googlecloud",

  "jupyter notebook": "jupyter",
  "google colab": "googlecolab",
  kaggle: "kaggle",
  postman: "postman",
  figma: "figma",

  wordpress: "wordpress",
  shopify: "shopify",
  "custom cms development": "sanity",
  "headless cms integration": "contentful",

  "business websites": "googlechrome",
  "corporate websites": "googlechrome",
  "portfolio websites": "behance",
  "e-commerce websites": "shopify",
  "landing pages": "webflow",
  "custom web applications": "nextdotjs",
  "admin dashboards": "grafana",
  "saas platforms": "stripe",
  "api integrations": "postman",
  "payment gateway integration": "stripe",

  "android applications": "android",
  "ios applications": "apple",
  "cross-platform applications": "flutter",
  "e-commerce applications": "shopify",
  "on-demand service apps": "uber",

  "technical seo": "googlesearchconsole",
  "on-page seo": "googlesearchconsole",
  "off-page seo": "googleads",
  "local seo": "googlemaps",
  "seo audits": "semrush",
  "google ads": "googleads",
  "meta ads (facebook & instagram)": "meta",
  "ppc campaign management": "googleads",
  "social media marketing": "instagram",
  "social media management": "buffer",
  "content marketing": "medium",
  "email marketing": "mailchimp",
  "whatsapp marketing": "whatsapp",
  "performance marketing": "googleanalytics",
  "lead generation": "hubspot",
  "conversion rate optimization (cro)": "hotjar",

  "ui design": "figma",
  "ux design": "figma",
  wireframing: "figma",
  prototyping: "figma",
  "responsive design": "css",
  "mobile-first design": "android",
  "user journey design": "miro",

  "ai workflow automation": "n8n",
  "business process automation": "zapier",
  "crm automation": "hubspot",
  "chatbot development": "metaai",
  "email automation": "mailchimp",
  "workflow integration": "zapier",

  "full-stack development": "nextdotjs",
  "object-oriented programming (oop)": "cplusplus",
  "data structures & algorithms (dsa)": "leetcode",
  "software architecture": "diagramsdotnet",
  "clean code principles": "eslint",
  "design patterns": "uml",
  "agile development": "jira",
  "version control": "git",
  "api development": "swagger",
  "system integration": "n8n",
  "performance optimization": "lighthouse",
  "security best practices": "owasp",

  "problem solving": "leetcode",
  "analytical thinking": "googlesheets",
  "ownership mindset": "notion",
  "team collaboration": "discord",
  communication: "discord",
  "project management": "jira",
  "rapid learning": "udemy",
  "client requirement analysis": "notion",
  "technical consulting": "jira",
};

/**
 * Brands removed from recent simple-icons (trademark) — real brand artwork via CDN.
 * `mono: true` = black SVG that we tint with CSS mask + brand color.
 */
const EXTERNAL_ICON_URLS: Record<
  string,
  { src: string; color?: string; mono?: boolean }
> = {
  "aws (lambda, s3, ec2)": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  "visual studio code": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  "microsoft office": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
  },
  "microsoft excel (advanced + ai)": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
  },
  java: {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  "power bi": {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/powerbi.svg",
    color: "#F2C811",
    mono: true,
  },
  tableau: {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tableau.svg",
    color: "#E97627",
    mono: true,
  },
  canva: {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/canva.svg",
    color: "#00C4CC",
    mono: true,
  },
  "linkedin ads": {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg",
    color: "#0A66C2",
    mono: true,
  },
  "erp & crm solutions": {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/salesforce.svg",
    color: "#00A1E0",
    mono: true,
  },
  "business applications": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg",
  },
  "google business profile optimization": {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
  },
  "team collaboration": {
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/slack.svg",
    color: "#4A154B",
    mono: true,
  },
};

const KEYWORD_SLUGS: Array<{ match: RegExp; slug: string }> = [
  { match: /javascript|js\b/, slug: "javascript" },
  { match: /typescript/, slug: "typescript" },
  { match: /python/, slug: "python" },
  { match: /react/, slug: "react" },
  { match: /next/, slug: "nextdotjs" },
  { match: /node/, slug: "nodedotjs" },
  { match: /mongo/, slug: "mongodb" },
  { match: /postgres/, slug: "postgresql" },
  { match: /mysql|sql/, slug: "mysql" },
  { match: /firebase/, slug: "firebase" },
  { match: /docker/, slug: "docker" },
  { match: /github/, slug: "github" },
  { match: /git(?!hub)/, slug: "git" },
  { match: /figma/, slug: "figma" },
  { match: /tensor/, slug: "tensorflow" },
  { match: /seo|search console/, slug: "googlesearchconsole" },
  { match: /google ads|ppc/, slug: "googleads" },
  { match: /meta|facebook|instagram/, slug: "meta" },
  { match: /whatsapp/, slug: "whatsapp" },
  { match: /shopify|e-?commerce/, slug: "shopify" },
  { match: /wordpress/, slug: "wordpress" },
  { match: /android/, slug: "android" },
  { match: /ios|apple/, slug: "apple" },
  { match: /flutter|cross-?platform/, slug: "flutter" },
  { match: /stripe|payment/, slug: "stripe" },
  { match: /api/, slug: "postman" },
  { match: /design|ui|ux/, slug: "figma" },
  { match: /ai|ml|machine|llm|chatbot/, slug: "claude" },
];

export function getTechBrandIcon(label: string): BrandIcon {
  const normalized = label.trim().toLowerCase();

  const external = EXTERNAL_ICON_URLS[normalized];
  if (external) return { type: "url", ...external };

  const exactSlug = EXACT_SLUGS[normalized];
  if (exactSlug && bySlug.has(exactSlug)) {
    return { type: "svg", icon: bySlug.get(exactSlug)! };
  }

  for (const { match, slug } of KEYWORD_SLUGS) {
    if (match.test(normalized) && bySlug.has(slug)) {
      return { type: "svg", icon: bySlug.get(slug)! };
    }
  }

  return { type: "svg", icon: bySlug.get("simpleicons")! };
}

/** Dark brand marks (Next, Express, Apple, etc.) need white fill on black UI. */
export function brandFillOnDark(hex: string): string {
  const raw = hex.replace(/^#/, "").toLowerCase();
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  if (full.length !== 6 || Number.isNaN(Number.parseInt(full, 16))) {
    return "#ffffff";
  }
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 80 ? "#ffffff" : `#${full}`;
}
