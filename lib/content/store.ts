import { promises as fs } from "fs";
import path from "path";
import type {
  AdminUser,
  Blog,
  ContactInfo,
  ContentKey,
  FooterSettings,
  Project,
  ServiceRecord,
  TeamMember,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

type ContentMap = {
  projects: Project[];
  team: TeamMember[];
  blogs: Blog[];
  contact: ContactInfo;
  footer: FooterSettings;
  users: AdminUser[];
  services: ServiceRecord[];
};

function filePath(key: ContentKey) {
  return path.join(CONTENT_DIR, `${key}.json`);
}

export async function readContent<K extends ContentKey>(
  key: K
): Promise<ContentMap[K]> {
  const raw = await fs.readFile(filePath(key), "utf8");
  return JSON.parse(raw) as ContentMap[K];
}

export async function writeContent<K extends ContentKey>(
  key: K,
  data: ContentMap[K]
): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(filePath(key), JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readContent("projects");
  return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function getTeamMembers(options?: {
  includeDisabled?: boolean;
}): Promise<TeamMember[]> {
  const team = await readContent("team");
  const filtered = options?.includeDisabled
    ? team
    : team.filter((m) => m.enabled !== false);
  return [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getTeamMemberById(
  id: string
): Promise<TeamMember | undefined> {
  const team = await readContent("team");
  return team.find((m) => m.id === id);
}

export async function getBlogs(options?: {
  includeDrafts?: boolean;
}): Promise<Blog[]> {
  const blogs = await readContent("blogs");
  const filtered = options?.includeDrafts
    ? blogs
    : blogs.filter((b) => b.status === "published");
  return [...filtered].sort(
    (a, b) =>
      new Date(b.publishDate || b.date).getTime() -
      new Date(a.publishDate || a.date).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await readContent("blogs");
  return blogs.find((b) => b.slug === slug);
}

export async function getBlogById(id: string): Promise<Blog | undefined> {
  const blogs = await readContent("blogs");
  return blogs.find((b) => b.id === id);
}

export async function getContactInfo(): Promise<ContactInfo> {
  return readContent("contact");
}

export async function getFooterSettings(): Promise<FooterSettings> {
  return readContent("footer");
}

export async function getUsers(options?: {
  includeDisabled?: boolean;
}): Promise<AdminUser[]> {
  const users = await readContent("users");
  const filtered = options?.includeDisabled
    ? users
    : users.filter((u) => u.enabled !== false);
  return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getUserByEmail(
  email: string
): Promise<AdminUser | undefined> {
  const users = await readContent("users");
  return users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export async function getUserById(id: string): Promise<AdminUser | undefined> {
  const users = await readContent("users");
  return users.find((u) => u.id === id);
}

export async function getServices(options?: {
  includeDisabled?: boolean;
}): Promise<ServiceRecord[]> {
  const services = await readContent("services");
  const filtered = options?.includeDisabled
    ? services
    : services.filter((s) => s.enabled !== false);
  return [...filtered].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getServiceById(
  id: string
): Promise<ServiceRecord | undefined> {
  const services = await readContent("services");
  return services.find((s) => s.id === id);
}

export async function getServiceBySlug(
  slug: string,
  parentSlug?: string | null
): Promise<ServiceRecord | undefined> {
  const services = await getServices({ includeDisabled: true });
  return services.find((s) => {
    if (s.slug !== slug) return false;
    if (parentSlug) return s.parentSlug === parentSlug;
    return !s.parentSlug;
  });
}

export async function getContentStats() {
  const [projects, team, blogs, services, users] = await Promise.all([
    getProjects(),
    getTeamMembers({ includeDisabled: true }),
    getBlogs({ includeDrafts: true }),
    getServices({ includeDisabled: true }),
    getUsers({ includeDisabled: true }),
  ]);

  return {
    projects: projects.length,
    featuredProjects: projects.filter((p) => p.featured).length,
    team: team.length,
    teamActive: team.filter((m) => m.enabled).length,
    blogs: blogs.length,
    blogsPublished: blogs.filter((b) => b.status === "published").length,
    blogsDraft: blogs.filter((b) => b.status === "draft").length,
    services: services.length,
    servicesActive: services.filter((s) => s.enabled).length,
    users: users.length,
    usersActive: users.filter((u) => u.enabled).length,
  };
}

export function nextProjectId(projects: Project[]): number {
  return projects.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\b(?:in|for)[- ](?:19|20)\d{2}\b/g, "")
    .replace(/\b(?:19|20)\d{2}\b/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueSlug(value: string, takenSlugs: string[]): string {
  const base = slugify(value);
  if (!takenSlugs.includes(base)) return base;
  let n = 2;
  while (takenSlugs.includes(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}
