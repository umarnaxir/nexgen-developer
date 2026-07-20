export type TechCategory = "frontend" | "backend" | "database" | "deployment";

export type CategorizedTechStack = Record<TechCategory, string[]>;

export const TECH_CATEGORY_META: Record<
  TechCategory,
  { label: string; shortLabel: string }
> = {
  frontend: { label: "Frontend", shortLabel: "FE" },
  backend: { label: "Backend", shortLabel: "BE" },
  database: { label: "Database", shortLabel: "DB" },
  deployment: { label: "Deployment", shortLabel: "Deploy" },
};

const CATEGORY_LOOKUP: Record<string, TechCategory> = {
  "Next.js": "frontend",
  React: "frontend",
  TypeScript: "frontend",
  "Tailwind CSS": "frontend",
  "Framer Motion": "frontend",
  Streamlit: "frontend",
  Plotly: "frontend",

  "Node.js": "backend",
  "Express.js": "backend",
  FastAPI: "backend",
  Python: "backend",
  "REST APIs": "backend",
  "Authentication System": "backend",
  "JWT Authentication": "backend",
  "Socket.io": "backend",
  "OpenAI API": "backend",
  "LLM Integration": "backend",
  Manim: "backend",
  "Video Processing": "backend",
  "Prompt Engineering": "backend",
  "AI Automation": "backend",
  OpenCV: "backend",
  "Computer Vision": "backend",
  "Face Recognition": "backend",
  "Machine Learning": "backend",
  "Real-Time Processing": "backend",
  "AI Analytics": "backend",
  "AI Recommendation Engine": "backend",
  "Data Analytics": "backend",
  Pandas: "backend",
  NumPy: "backend",
  "CSV Processing": "backend",
  "Business Intelligence": "backend",
  "Data Visualization": "backend",
  "File Upload System": "backend",
  "Dashboard Analytics": "backend",
  "File Management System": "backend",
  "Search Engine": "backend",
  "Payment Gateway Integration": "backend",
  "Booking Integration": "backend",
  "Google Maps API": "backend",

  MongoDB: "database",
  PostgreSQL: "database",
  MySQL: "database",
  Firebase: "database",
  "Database Integration": "database",

  "Cloud Storage": "deployment",
  Vercel: "deployment",
  AWS: "deployment",
  Docker: "deployment",
};

const IGNORED = new Set([
  "Responsive Design",
  "SEO Optimization",
  "Content Management",
  "Social Media Integration",
  "Image Optimization",
  "E-Commerce",
  "Cart System",
  "Interactive Learning Content",
]);

function emptyStack(): CategorizedTechStack {
  return {
    frontend: [],
    backend: [],
    database: [],
    deployment: [],
  };
}

function addUnique(list: string[], value: string) {
  if (!list.includes(value)) list.push(value);
}

export function categorizeProjectTechStack(
  technologies: string[],
  link: string
): CategorizedTechStack {
  const stack = emptyStack();

  for (const tech of technologies) {
    if (IGNORED.has(tech)) continue;

    const category = CATEGORY_LOOKUP[tech];
    if (category) {
      addUnique(stack[category], tech);
      continue;
    }

    if (/mongo/i.test(tech)) {
      addUnique(stack.database, tech);
      continue;
    }

    if (/postgres|mysql|firebase|database|redis|supabase|prisma/i.test(tech)) {
      addUnique(stack.database, tech);
      continue;
    }

    if (/cloud storage|aws|azure|docker|kubernetes|nginx|vercel|netlify|cloud/i.test(tech)) {
      addUnique(stack.deployment, tech);
    }
  }

  if (stack.deployment.length === 0) {
    if (/vercel\.app/i.test(link)) {
      addUnique(stack.deployment, "Vercel");
    } else if (technologies.some((tech) => tech.includes("Next.js"))) {
      addUnique(stack.deployment, "Vercel");
    } else {
      addUnique(stack.deployment, "Production Hosting");
    }
  }

  if (stack.backend.length === 0 && technologies.some((tech) => tech.includes("Next.js"))) {
    addUnique(stack.backend, "Next.js Server");
  }

  if (stack.database.length === 0 && technologies.some((tech) => /database integration/i.test(tech))) {
    addUnique(stack.database, "Integrated Database");
  }

  return stack;
}

export function getActiveTechCategories(stack: CategorizedTechStack): TechCategory[] {
  return (Object.keys(stack) as TechCategory[]).filter((category) => stack[category].length > 0);
}
