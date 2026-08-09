#!/usr/bin/env node
/**
 * Seeds content/*.json from existing TypeScript data sources.
 * Plain Node — no extra deps. Converts Lucide icon refs to strings.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");

const FEATURED_PROJECT_IDS = new Set([11, 12, 13, 14, 15]);

function read(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

function writeJson(filename, data) {
  const out = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(out, JSON.stringify(data, null, 2) + "\n", "utf8");
  return out;
}

/** Stable UUID-like id from a string key (slug / name). */
function idFromKey(key) {
  const hex = createHash("sha256").update(key).digest("hex").slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/** Remove TypeScript `type` / `export type` aliases (brace-aware). */
function stripTypeAliases(code) {
  const re = /(?:export\s+)?type\s+\w+\s*=/g;
  let result = "";
  let lastIndex = 0;
  let match;

  while ((match = re.exec(code)) !== null) {
    result += code.slice(lastIndex, match.index);
    let i = match.index + match[0].length;
    while (i < code.length && /\s/.test(code[i])) i++;

    if (code[i] === "{") {
      let depth = 0;
      for (; i < code.length; i++) {
        if (code[i] === "{") depth++;
        else if (code[i] === "}") {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        }
      }
      while (i < code.length && /\s/.test(code[i])) i++;
      if (code[i] === ";") i++;
    } else {
      while (i < code.length && code[i] !== ";") i++;
      if (code[i] === ";") i++;
    }

    lastIndex = i;
    re.lastIndex = i;
  }

  result += code.slice(lastIndex);
  return result;
}

/**
 * Evaluate a TS-ish data module after stripping imports/types/exports.
 * Returns the value of `exportName` (or the whole module.exports if provided).
 */
function evalDataModule(source, { exportName, preProcess } = {}) {
  let code = source;

  if (preProcess) {
    code = preProcess(code);
  }

  // Strip imports
  code = code.replace(/^import\s+[\s\S]*?;\s*$/gm, "");

  // Strip `export type Name = ...` / `type Name = ...` with brace awareness
  code = stripTypeAliases(code);

  // Remove TypeScript type annotations on exports: `export const x: Type =` → `const x =`
  code = code.replace(
    /export\s+const\s+(\w+)(?:\s*:\s*[^=]+)?\s*=/g,
    "const $1 ="
  );

  // Remaining bare exports
  code = code.replace(/export\s+const\s+/g, "const ");

  // Drop re-export helpers like `const allBlogs = blogs;`
  // (safe — we only need named data)

  const wrapped = `${code}\n; return ${exportName};`;
  try {
    return new Function(wrapped)();
  } catch (err) {
    throw new Error(`Failed to evaluate export "${exportName}": ${err.message}`);
  }
}

function parseDisplayDateToISO(dateStr) {
  // e.g. "January 20, 2026"
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function sectionsToContent(sections = []) {
  return sections
    .map((s) => {
      if (s.type === "text" && s.content) return s.content;
      if (s.type === "heading" && s.heading) return s.heading;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

// ─── Projects ───────────────────────────────────────────────────────────────

function seedProjects() {
  const raw = read("app/projects/data.ts");
  const projects = evalDataModule(raw, {
    exportName: "projects",
    preProcess(code) {
      // icon: GraduationCap → icon: "GraduationCap"
      return code.replace(/icon:\s*([A-Za-z][A-Za-z0-9]*)/g, 'icon: "$1"');
    },
  });

  return projects.map((p, index) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    detailedDescription: p.detailedDescription,
    image: p.image,
    gallery: [],
    link: p.link,
    technologies: p.technologies,
    category: p.category,
    features: p.features,
    duration: p.duration,
    client: p.client,
    icon: p.icon,
    color: p.color,
    featured: FEATURED_PROJECT_IDS.has(p.id),
    order: index + 1,
  }));
}

// ─── Team ───────────────────────────────────────────────────────────────────

function seedTeam() {
  const raw = read("app/team/data.ts");
  const teamMembers = evalDataModule(raw, { exportName: "teamMembers" });

  return teamMembers.map((m, index) => ({
    id: idFromKey(`team:${m.name}`),
    name: m.name,
    designation: m.title,
    email: "",
    phone: "",
    image: m.image,
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
      instagram: "",
    },
    role: "member",
    enabled: true,
    order: index + 1,
  }));
}

// ─── Blogs ──────────────────────────────────────────────────────────────────

function seedBlogs() {
  const listRaw = read("app/blogs/data.ts");
  const postsRaw = read("app/blogs/[slug]/data.ts");

  const blogs = evalDataModule(listRaw, { exportName: "blogs" });
  const blogPosts = evalDataModule(postsRaw, {
    exportName: "blogPosts",
    preProcess(code) {
      // Remove the allBlogs re-export line (depends on imported blogs)
      return code.replace(/export\s+const\s+allBlogs\s*=\s*blogs\s*;?\s*/g, "");
    },
  });

  return blogs.map((listItem) => {
    const post = blogPosts[listItem.slug] || {};
    const images =
      Array.isArray(post.images) && post.images.length > 0
        ? post.images
        : listItem.image
          ? [listItem.image]
          : [];
    const image = listItem.image || images[0] || "";
    const excerpt = post.excerpt || listItem.excerpt || "";
    const sections = post.sections || [];
    const date = post.date || listItem.date;
    const publishDate = parseDisplayDateToISO(date);

    return {
      id: idFromKey(`blog:${listItem.slug}`),
      title: post.title || listItem.title,
      slug: listItem.slug,
      excerpt,
      description: excerpt,
      date,
      publishDate: publishDate || date,
      category: post.category || listItem.category,
      image,
      images,
      content: sectionsToContent(sections),
      sections,
      author: post.author || "NexGen Developers Team",
      readTime: post.readTime || "",
      keywords: post.keywords || [],
      internalLink: post.internalLink || { href: "", text: "" },
      externalLink: post.externalLink || { href: "", text: "" },
      status: "published",
      featuredImage: image,
    };
  });
}

// ─── Contact & Footer ───────────────────────────────────────────────────────

function seedContact() {
  return {
    companyName: "NexGen Developers",
    email: "workwithnexgen@gmail.com",
    phone: "+916006161726",
    phoneDisplay: "+91 600-616-1726",
    address: "Baramulla, Jammu and Kashmir, India",
    addressRegion: "Kashmir, India",
    mapsLink: "",
    whatsapp:
      "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.",
  };
}

function seedFooter() {
  return {
    companyName: "NexGen Developers",
    companyInfo: "Have an idea? Let's connect.",
    copyrightText: "© {year} NexGen Developers",
    craftedText: "Crafted in Kashmir",
    social: {
      facebook:
        "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F",
      instagram:
        "https://www.instagram.com/nexgendv?igsh=MTJiczF6aDNxbjB2eg%3D%3D&utm_source=qr",
      linkedin: "https://www.linkedin.com/company/105880683/",
      twitter: "https://x.com/nexgendv",
      github: "",
      youtube: "",
    },
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });

  const projects = seedProjects();
  const team = seedTeam();
  const blogs = seedBlogs();
  const contact = seedContact();
  const footer = seedFooter();

  const paths = {
    projects: writeJson("projects.json", projects),
    team: writeJson("team.json", team),
    blogs: writeJson("blogs.json", blogs),
    contact: writeJson("contact.json", contact),
    footer: writeJson("footer.json", footer),
  };

  // Ensure content dir is trackable even if JSON were ignored later
  const gitkeep = path.join(CONTENT_DIR, ".gitkeep");
  if (!fs.existsSync(gitkeep)) {
    fs.writeFileSync(gitkeep, "", "utf8");
  }

  console.log("Seeded content files:");
  console.log(`  projects.json  → ${projects.length} projects`);
  console.log(`  team.json      → ${team.length} members`);
  console.log(`  blogs.json     → ${blogs.length} posts`);
  console.log(`  contact.json   → company contact`);
  console.log(`  footer.json    → footer config`);
  console.log("");
  for (const [key, p] of Object.entries(paths)) {
    console.log(`  ${key}: ${p}`);
  }
}

main();
