import { NextRequest, NextResponse } from "next/server";
import { canManageUsers, getSession } from "@/lib/admin/auth";
import {
  getBlogs,
  getProjects,
  getServices,
  getTeamMembers,
  getUsers,
} from "@/lib/content/store";

type SearchResult = {
  type: string;
  id: string;
  title: string;
  href: string;
  meta?: string;
};

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = (request.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const [projects, team, blogs, services] = await Promise.all([
    getProjects(),
    getTeamMembers({ includeDisabled: true }),
    getBlogs({ includeDrafts: true }),
    getServices({ includeDisabled: true }),
  ]);

  const results: SearchResult[] = [];

  for (const project of projects) {
    if (project.title.toLowerCase().includes(q)) {
      results.push({
        type: "project",
        id: String(project.id),
        title: project.title,
        href: `/admin/projects/${project.id}`,
        meta: project.category || undefined,
      });
    }
  }

  for (const member of team) {
    if (member.name.toLowerCase().includes(q)) {
      results.push({
        type: "team",
        id: member.id,
        title: member.name,
        href: `/admin/team/${member.id}`,
        meta: member.designation || undefined,
      });
    }
  }

  for (const blog of blogs) {
    if (blog.title.toLowerCase().includes(q)) {
      results.push({
        type: "blog",
        id: blog.id,
        title: blog.title,
        href: `/admin/blogs/${blog.id}`,
        meta: blog.status,
      });
    }
  }

  for (const service of services) {
    if (service.label.toLowerCase().includes(q)) {
      results.push({
        type: "service",
        id: service.id,
        title: service.label,
        href: `/admin/services/${service.id}`,
        meta: service.category,
      });
    }
  }

  if (canManageUsers(session.role)) {
    const users = await getUsers({ includeDisabled: true });
    for (const user of users) {
      if (
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      ) {
        results.push({
          type: "user",
          id: user.id,
          title: user.name,
          href: `/admin/users/${user.id}`,
          meta: user.email,
        });
      }
    }
  }

  return NextResponse.json({ results: results.slice(0, 12) });
}
