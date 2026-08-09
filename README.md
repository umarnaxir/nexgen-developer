# NexGen Developers — Website & Admin Panel

Marketing website for **NexGen Developers** plus a full **Admin Panel** for managing site content. Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

There is **no external database**. Content is stored as JSON files on disk under `content/`. Admin changes write to those files and the public frontend reads the same source. Uploaded images go to `public/uploads/`.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Architecture overview](#architecture-overview)
5. [Content store (JSON CMS)](#content-store-json-cms)
6. [Public frontend](#public-frontend)
7. [Admin panel](#admin-panel)
8. [Roles & permissions](#roles--permissions)
9. [API reference](#api-reference)
10. [Key libraries & folders](#key-libraries--folders)
11. [Scripts](#scripts)
12. [Deployment notes](#deployment-notes)
13. [Troubleshooting](#troubleshooting)

---

## Tech stack

| Area | Stack |
|------|--------|
| Framework | Next.js 15 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, Framer Motion, GSAP, AOS |
| Auth (admin) | JWT cookie via `jose`, passwords hashed with `bcryptjs` |
| Content | Local JSON files (`content/*.json`) via `lib/content/store.ts` |
| Email | Resend (`app/api/_utils/resend.ts`) |
| Chat | OpenAI-compatible API (`lib/openai.ts`, `lib/chat.ts`) |
| Icons | `lucide-react`, `simple-icons` |
| Admin DnD | `@dnd-kit` (team reorder) |

---

## Quick start

**Prerequisites:** Node.js 18+ and npm / yarn / pnpm.

```bash
# Install
npm install

# Optional: seed JSON content / users / services
npm run seed:content
npm run seed:users
npm run seed:services

# Dev server (Turbopack)
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin](http://localhost:3000/admin)

```bash
npm run build          # production build
npm run build:clean    # wipe .next then build
npm start              # run production server
npm run typecheck      # TypeScript check
```

Default bootstrap admin (override with env — see below):

- Email: `umar@gmail.com`
- Password: `1122`
- Role: `super_admin`

---

## Environment variables

Create `.env` or `.env.local` in the project root.

### Admin / session

| Variable | Purpose |
|----------|---------|
| `ADMIN_EMAIL` | Bootstrap / seed super-admin email |
| `ADMIN_PASSWORD` | Bootstrap / seed password (plaintext for seed + fallback login) |
| `ADMIN_PASSWORD_HASH` | Optional bcrypt hash instead of plaintext fallback |
| `ADMIN_NAME` | Display name for bootstrap user |
| `ADMIN_SESSION_SECRET` | JWT signing secret (**set a strong value in production**) |
| `NEXTAUTH_SECRET` | Fallback if `ADMIN_SESSION_SECRET` is missing |

### Email (Resend)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Required for contact / callback / subscribe emails |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `NexGen Developers <no-reply@yourdomain.com>` |
| `RESEND_TO_EMAIL` or `CONTACT_TO_EMAIL` | Inbox for form submissions |

### Company / chat

| Variable | Purpose |
|----------|---------|
| `COMPANY_NAME` | Brand name (chat headers, etc.) |
| `COMPANY_EMAIL` | Fallback company email |
| `COMPANY_PHONE` | Fallback phone |
| `COMPANY_WEBSITE` | Canonical site URL |
| `OPENAI_API_KEY` | Chat widget LLM |
| `OPENAI_MODEL` | Optional model override |

---

## Architecture overview

```text
┌─────────────────┐     JWT cookie      ┌──────────────────────┐
│  Browser / Admin │ ◄─────────────────► │  middleware.ts        │
│  UI              │                     │  protects /admin/*    │
└────────┬────────┘                     └──────────┬───────────┘
         │                                         │
         ▼                                         ▼
┌─────────────────┐                     ┌──────────────────────┐
│ Public pages    │                     │ /api/admin/*         │
│ (Server Components│                     │ CRUD + upload + auth │
│  + client UI)   │                     └──────────┬───────────┘
└────────┬────────┘                                │
         │                                         │
         └────────────────┬────────────────────────┘
                          ▼
               ┌──────────────────────┐
               │ lib/content/store.ts │
               │ read/write JSON      │
               └──────────┬───────────┘
                          ▼
               ┌──────────────────────┐
               │ content/*.json       │
               │ public/uploads/*     │
               └──────────────────────┘
```

**Important for backend work later:**

- Today this is a **file-based CMS**, not Postgres/Mongo.
- To move to a real DB, replace `lib/content/store.ts` (+ upload storage) while keeping the same TypeScript types in `lib/content/types.ts` and the same `/api/admin/*` and `/api/site/*` shapes.
- After admin writes, many routes call `revalidatePath(...)` so public pages refresh without a full rebuild.

---

## Content store (JSON CMS)

### Location

| File | Data |
|------|------|
| `content/projects.json` | Portfolio projects |
| `content/services.json` | Services + SEO + page content |
| `content/team.json` | Team members (order + visibility) |
| `content/blogs.json` | Blog posts (sections, SEO, draft/published) |
| `content/contact.json` | Public contact details |
| `content/footer.json` | Footer copy + social links |
| `content/users.json` | Admin users (includes `passwordHash`) |

Uploads: `public/uploads/{projects|team|blogs|services|general}/`

### Core modules

| Path | Role |
|------|------|
| `lib/content/types.ts` | Shared TypeScript models (`Project`, `Blog`, `ServiceRecord`, `AdminUser`, …) |
| `lib/content/store.ts` | `readContent` / `writeContent` + getters (`getProjects`, `getBlogs`, …) |
| `lib/content/services-server.ts` | Server-only services loader (avoids `fs` in client bundles) |
| `lib/content/services-runtime.ts` | Runtime helpers for service config |
| `lib/content/project-icons.ts` | Project icon mapping |

### Types snapshot

- **Project** — title, descriptions, image/gallery, link, technologies, featured, order, …
- **TeamMember** — name, designation, image, `enabled` (frontend visibility), `order`
- **Blog** — SEO fields, `sections[]` (`heading` \| `text` \| `image`), keywords, internal/external links, `status`
- **ServiceRecord** — slug, category, SEO, rich `content` (benefits, process, FAQs, …), `enabled`
- **AdminUser** — email, `passwordHash`, `role`, `enabled`
- **AdminRole** — `"super_admin" \| "admin" \| "editor"`

---

## Public frontend

### Main routes

| Route | Purpose |
|-------|---------|
| `/` | Home (hero, services teaser, selected work, tech stack, contact, …) |
| `/about` | About |
| `/services`, `/services/[slug]` | Services index + detail |
| `/services/digital-marketing/[subSlug]` | DM sub-services |
| `/projects` | Projects list |
| `/team` | Team (only `enabled` members, ordered) |
| `/blogs`, `/blogs/[slug]` | Blog listing + post |
| `/contact-us` | Contact |
| `/pricing` | Pricing |
| `/privacy`, `/terms` | Legal (includes payment policy) |

### Layout & navigation

| Path | Notes |
|------|--------|
| `app/layout.tsx` | Root layout; loads contact/footer; detects admin session for nav CTA |
| `components/LayoutWrapper.tsx` | Wraps public site (hides chrome on `/admin`) |
| `components/navigation/SiteNavigation.tsx` | Desktop sidebar + mobile navbar |
| `components/navigation/SidebarNav.tsx` | Desktop menu; **Start a project** → **Go to Admin Panel** when logged in |
| `components/navigation/MobileNavbar.tsx` | Same CTA swap when admin session exists |
| `components/Footer/Footer.tsx` | Footer from `content/footer.json` |
| `components/GalaxyBackground.tsx` | Starfield used on Home + most page heroes |
| `components/PageHero.tsx` | Shared page hero (`variant="galaxy"` default; `image` for Team) |

**Hero background rules**

- Most page heroes use the **galaxy** background (same as Home).
- **Team** and **Contact Us** keep the photo hero (`/images/hero-image.png`).
- Typical hero height: `50vh`.

### Home sections (`app/home/`)

Notable pieces: `HeroSection`, `ServicesSection`, `ProjectsShowcaseSection` (“Selected Work”), `TechStackSection`, `ContactSection`, etc.

### Blog rendering

- Posts are built from `sections` (heading / text / image).
- Inline markdown in text blocks: `**bold**` and `[label](url)`.
- Renderer: `app/blogs/[slug]/components/BlogPostContent.tsx`.

### Forms & extras

- Contact / callback / subscribe → `app/api/contact`, `callback`, `subscribe` + Resend.
- Chat widget → `components/chat/*`, `app/api/chat`.
- Contact modal → `components/modals/ContactModalProvider.tsx`.

### Public “site” APIs (JSON for optional clients)

Under `app/api/site/` — e.g. `blogs`, `projects`, `team`, `contact`, `footer`, `services`. Prefer server loaders from `lib/content/store.ts` inside RSC pages.

---

## Admin panel

### Entry & shell

| Path | Role |
|------|------|
| `/admin` | Login page (`app/admin/page.tsx`) |
| `/admin/dashboard` | Stats + quick actions |
| `middleware.ts` | Redirects unauthenticated users away from `/admin/*` (except login) |
| `components/admin/layout/AdminShell.tsx` | Sidebar + header + main |
| `AdminSidebar.tsx` | Nav links (Users visible to `super_admin` + `admin`) |
| `AdminHeader.tsx` | Global search, profile, logout |
| `AdminPermissionsContext.tsx` | Client-side permission helpers from role |
| `AdminSearchContext.tsx` | Header search query shared with list pages |

### Admin modules (UI)

| Route | Feature |
|-------|---------|
| `/admin/dashboard` | Counts + links |
| `/admin/projects` | CRUD projects |
| `/admin/services` | CRUD services |
| `/admin/team` | Cards, drag-reorder, **Visible on frontend** toggle |
| `/admin/blogs` | SEO form + **Add block** modal (heading / paragraph / image) |
| `/admin/contact` | Contact JSON editor |
| `/admin/footer` | Footer + socials |
| `/admin/users` | User management (`super_admin` / `admin` only) |

Shared UI: `components/admin/ui/` (`AdminButton`, `AdminInput`, `ImageUpload`, `ConfirmModal`).  
Forms: `components/admin/forms/` (`BlogForm`, `TeamForm`, `ProjectForm`, `ServiceForm`, `UserForm`, `BlogBlockModal`).

### Auth flow

1. `POST /api/admin/auth/login` → verifies password → sets HTTP-only JWT cookie `nexgen_admin_session`.
2. `GET /api/admin/auth/me` → current user.
3. `POST /api/admin/auth/logout` → clears cookie.
4. Logic lives in `lib/admin/auth.ts`, `lib/admin/session.ts`, `lib/admin/permissions.ts`.

### Blog admin (SEO)

When adding/editing a blog:

- SEO title, slug, meta description (with length guidance), keywords
- Featured image, status (draft/published), category, author
- **Content blocks** via modal: H2/H3, paragraphs (Bold / Link helpers), images
- Internal + external “Further reading” links

### Team admin

- Fields shown on public Team page: name, designation, image
- `enabled` = visible on frontend
- Drag-and-drop order → `PUT /api/admin/team/reorder`

---

## Roles & permissions

Defined in `lib/admin/permissions.ts` (enforced in APIs + UI).

| Capability | Super Admin | Admin | Editor |
|------------|:-----------:|:-----:|:------:|
| Edit / create content | ✓ | ✓ | ✓ |
| Upload images | ✓ | ✓ | ✓ |
| Toggle visibility / reorder | ✓ | ✓ | ✓ |
| **Delete** content | ✓ | ✓ | ✗ |
| Manage users | ✓ | ✓ | ✗ |
| Assign `super_admin` role | ✓ | ✗ | ✗ |
| Delete / demote / disable Super Admin | ✗ | ✗ | ✗ |

**Rules**

- Super Admin is a **protected default** account — **nobody** can delete it.
- Admin can add Admin/Editor users and manage content end-to-end.
- Editor can edit and upload but **cannot delete** anything.

---

## API reference

### Admin auth

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/admin/auth/login` | `{ email, password }` |
| POST | `/api/admin/auth/logout` | Clears session |
| GET | `/api/admin/auth/me` | Current session user |

### Admin content (session required)

| Resource | Paths |
|----------|--------|
| Stats | `GET /api/admin/stats` |
| Search | `GET /api/admin/search?q=` |
| Projects | `/api/admin/projects`, `/api/admin/projects/[id]` |
| Services | `/api/admin/services`, `/api/admin/services/[id]` |
| Team | `/api/admin/team`, `/api/admin/team/[id]`, `/api/admin/team/reorder` |
| Blogs | `/api/admin/blogs`, `/api/admin/blogs/[id]` |
| Contact | `/api/admin/contact` |
| Footer | `/api/admin/footer` |
| Users | `/api/admin/users`, `/api/admin/users/[id]` |
| Upload | `POST /api/admin/upload` (multipart: `file`, `folder`) |

Delete endpoints return **403** for editors (`canDeleteContent`).

### Public form / chat APIs

| Path | Purpose |
|------|---------|
| `/api/contact` | Contact form email |
| `/api/callback` | Callback request |
| `/api/subscribe` | Newsletter |
| `/api/chat` | Site chat |

### Client helpers

- `lib/admin/client.ts` → `adminFetch()` for admin UI
- `lib/admin/api.ts` → additional admin helpers if present

---

## Key libraries & folders

```text
app/                    # Pages + API routes (App Router)
  admin/                # Login + (panel) dashboard modules
  api/admin/            # Protected admin APIs
  api/site/             # Public JSON endpoints
  home/                 # Landing sections
  services|projects|…   # Marketing pages
components/
  admin/                # Admin shell, forms, UI
  navigation/           # Public sidebar / mobile nav
  Footer|Navbar|modals|chat|…
content/                # JSON CMS (source of truth)
lib/
  admin/                # Auth, session, permissions, client
  content/              # Store + types + service loaders
  seo/                  # Metadata + structured data
  gsap/                 # GSAP registration helpers
middleware.ts           # /admin route protection
public/uploads/         # User-uploaded media
scripts/                # Seed scripts
```

### SEO

- `lib/seo/config.ts`, `page-seo.ts`, `structured-data` usage on blog posts, etc.
- Public sitemap: `public/sitemap.xml` (update when adding permanent routes).

---

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Seed all content | `npm run seed:content` | Writes baseline `content/*.json` from `scripts/seed-content.mjs` |
| Seed users | `npm run seed:users` | Creates bootstrap super admin in `users.json` |
| Seed services | `npm run seed:services` | Syncs services JSON via `scripts/seed-services.ts` |

**Caution:** seeding can overwrite existing JSON. Back up `content/` before running in production-like environments.

---

## Deployment notes

- Works on **Vercel** or any Node host that supports Next.js.
- **Filesystem persistence:** admin writes to `content/` and `public/uploads/`. On ephemeral hosts (many serverless setups), those writes may **not persist**. For production CMS behavior, either:
  - Deploy on a host with a **persistent disk**, or
  - Migrate `lib/content/store.ts` + uploads to a database / object storage (S3, etc.).
- Set all env vars in the host dashboard, especially `ADMIN_SESSION_SECRET` and `RESEND_API_KEY`.
- Do **not** commit real secrets; keep `.env` out of git.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| Cannot log into `/admin` | `content/users.json` exists; run `npm run seed:users`; cookie / `ADMIN_SESSION_SECRET` |
| Admin save does not show on site | `revalidatePath` in that API route; hard refresh; confirm JSON updated under `content/` |
| Editor cannot delete | Expected — only `admin` / `super_admin` can delete |
| Email forms fail | `RESEND_API_KEY` + verified `RESEND_FROM_EMAIL` domain |
| Upload fails | Auth cookie present; `public/uploads` writable |
| Build fails | `npm run typecheck` / `npm run build:clean` |
| `fs` in client bundle | Use server-only loaders (`services-server.ts`); never import `store.ts` into client components |

---

## Contributing / next developer checklist

1. Read this README and skim `lib/content/types.ts` + `lib/content/store.ts`.
2. Run locally, log into `/admin`, edit a team member / blog, confirm the public page updates.
3. Prefer extending existing `/api/admin/*` routes and types over adding a parallel data layer.
4. When adding a new content type: type → JSON file → store helpers → admin API → admin UI → public page → `revalidatePath`.
5. Keep role checks in **API** (source of truth) and mirror in UI via `useAdminPermissions()`.

---

Updated: August 8, 2026
