"use client";

// Blog interface
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    ogImage?: string;
  };
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const BLOGS_STORAGE_KEY = "nexgen_blogs";

// Initialize with some default blogs
const DEFAULT_BLOGS: Blog[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2026",
    slug: "future-of-web-development-2026",
    excerpt: "Exploring the latest trends and technologies shaping the web development landscape in 2026.",
    content: `<h2>Introduction</h2>
<p>The web development industry continues to evolve at a rapid pace. In 2026, we're seeing unprecedented changes in how we build and deploy web applications.</p>

<h2>Key Trends</h2>
<p>Several key trends are shaping the future of web development:</p>
<ul>
<li>AI-powered development tools</li>
<li>Edge computing and serverless architectures</li>
<li>WebAssembly for high-performance applications</li>
<li>Progressive Web Apps becoming the standard</li>
</ul>

<h2>Conclusion</h2>
<p>The future of web development is exciting and full of possibilities. Stay tuned for more updates!</p>`,
    featuredImage: "/images/blog/web-dev.jpg",
    category: "Technology",
    tags: ["Web Development", "Technology", "Trends"],
    author: {
      name: "Umar Nazir",
      avatar: "/images/team/ummar.jpeg",
    },
    seo: {
      metaTitle: "The Future of Web Development in 2026 | NexGen",
      metaDescription: "Discover the latest trends and technologies shaping web development in 2026. From AI tools to edge computing.",
      metaKeywords: ["web development", "2026 trends", "technology"],
    },
    status: "published",
    publishedAt: "2026-01-15T10:00:00Z",
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    excerpt: "Best practices for building large-scale React applications that are maintainable and performant.",
    content: `<h2>Architecture Matters</h2>
<p>When building large React applications, proper architecture is crucial for long-term maintainability.</p>

<h2>Key Principles</h2>
<ul>
<li>Component composition over inheritance</li>
<li>State management strategies</li>
<li>Code splitting and lazy loading</li>
<li>Testing at every level</li>
</ul>`,
    featuredImage: "/images/blog/react-apps.jpg",
    category: "Development",
    tags: ["React", "JavaScript", "Best Practices"],
    author: {
      name: "Umar Nazir",
      avatar: "/images/team/ummar.jpeg",
    },
    seo: {
      metaTitle: "Building Scalable React Applications | NexGen",
      metaDescription: "Learn best practices for building large-scale React applications that scale.",
      metaKeywords: ["React", "scalable applications", "best practices"],
    },
    status: "published",
    publishedAt: "2026-01-20T14:00:00Z",
    createdAt: "2026-01-18T09:00:00Z",
    updatedAt: "2026-01-20T14:00:00Z",
  },
];

// Initialize default blogs
export function initializeBlogs(): void {
  if (typeof window === "undefined") return;

  const existingBlogs = localStorage.getItem(BLOGS_STORAGE_KEY);
  if (!existingBlogs) {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(DEFAULT_BLOGS));
  }
}

// Get all blogs
export function getBlogs(): Blog[] {
  if (typeof window === "undefined") return [];

  const blogsJson = localStorage.getItem(BLOGS_STORAGE_KEY);
  if (!blogsJson) {
    initializeBlogs();
    return DEFAULT_BLOGS;
  }

  try {
    return JSON.parse(blogsJson);
  } catch {
    return DEFAULT_BLOGS;
  }
}

// Save blogs to localStorage
export function saveBlogs(blogs: Blog[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
}

// Get blog by ID
export function getBlogById(id: string): Blog | undefined {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.id === id);
}

// Get blog by slug
export function getBlogBySlug(slug: string): Blog | undefined {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.slug === slug);
}

// Create new blog
export function createBlog(blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">): Blog {
  const blogs = getBlogs();
  const newBlog: Blog = {
    ...blogData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return newBlog;
}

// Update blog
export function updateBlog(id: string, updates: Partial<Blog>): Blog | null {
  const blogs = getBlogs();
  const index = blogs.findIndex((blog) => blog.id === id);

  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveBlogs(blogs);
  return blogs[index];
}

// Delete blog
export function deleteBlog(id: string): boolean {
  const blogs = getBlogs();
  const index = blogs.findIndex((blog) => blog.id === id);

  if (index === -1) return false;

  blogs.splice(index, 1);
  saveBlogs(blogs);
  return true;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Get published blogs only
export function getPublishedBlogs(): Blog[] {
  const blogs = getBlogs();
  return blogs.filter((blog) => blog.status === "published");
}

// Get blogs by category
export function getBlogsByCategory(category: string): Blog[] {
  const blogs = getPublishedBlogs();
  return blogs.filter((blog) => blog.category.toLowerCase() === category.toLowerCase());
}

// Get unique categories
export function getCategories(): string[] {
  const blogs = getBlogs();
  const categories = new Set(blogs.map((blog) => blog.category));
  return Array.from(categories);
}

// Get unique tags
export function getTags(): string[] {
  const blogs = getBlogs();
  const tags = new Set(blogs.flatMap((blog) => blog.tags));
  return Array.from(tags);
}
