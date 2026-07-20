# NexGen Developers  -  Website

A marketing site and content platform built with Next.js (App Router), TypeScript, and Tailwind CSS. The project includes contact, callback and newsletter forms that send emails through Resend.

## Key features

- App Router-based Next.js application under the `app/` directory
- Server and API routes for forms and webhooks (Resend integration)
- Reusable UI components and layout primitives in `components/`
- Tailwind CSS for styling and AOS for scroll animations

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Resend for transactional emails
- AOS, lucide-react, sonner, clsx

## Quick start

Prerequisites:

- Node.js 18+ (recommended)
- npm, pnpm, or yarn

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the site.

Build for production:

```bash
npm run build
```

Start the production server (after build):

```bash
npm start
```

Type-check the codebase:

```bash
npm run typecheck
```

## Environment variables

The app uses a few environment variables for external services. Create a `.env.local` in the project root and set the values you need.

- `RESEND_API_KEY`  -  Resend API key used to send emails (required for forms)
- `RESEND_FROM_EMAIL`  -  Optional override for the `from` address (e.g. "NexGen Developers <forms@nexgendevelopers.in>")
- `RESEND_TO_EMAIL` or `CONTACT_TO_EMAIL`  -  The business inbox that receives form submissions (fallbacks are provided in code)

Notes:

- Verify your sending domain in Resend and add recommended DNS records (SPF/DKIM/DMARC) to prevent deliverability issues.
- When running locally without `RESEND_API_KEY`, form endpoints will return a friendly error indicating the email service isn't configured.

## Project structure (high level)

- `app/`  -  Next.js App Router pages, route handlers and per-route components
	- `app/api/`  -  Serverless API routes (contact, callback, subscribe, etc.)
	- `app/home`, `app/blogs`, `app/services`, ...  -  top-level pages and their components
- `components/`  -  shared UI components (Navbar, Footer, modals, UI primitives)
- `lib/`  -  helper utilities and SEO structured data helpers
- `public/`  -  static assets (images, robots, sitemap)

Files to inspect for behavior:

- `app/api/_utils/resend.ts`  -  Resend integration and email helper functions
- `app/page.tsx`  -  root landing page entry
- `components/Navbar/Navbar.tsx` and `components/Footer/Footer.tsx`  -  site chrome

## Deployment

This project is optimized for Vercel but can be deployed to other platforms that support Next.js. For Vercel, create a project and push your repository; Vercel will detect Next.js automatically.

Recommended Vercel settings:

- Set the `RESEND_API_KEY` and any other environment variables in the Vercel project settings.
- Use the default Node.js version suggested by Vercel or match your local Node.js runtime.

## Testing & linting

This repository includes TypeScript and a `typecheck` script. Add linters and test runners as needed (ESLint, Jest/Playwright) and add scripts to `package.json`.

## Contributing

If you want to contribute:

1. Fork the repo and create a feature branch
2. Run the app locally and verify your changes
3. Open a pull request with a clear description

## Troubleshooting

- If you get email errors, verify `RESEND_API_KEY` and the sending domain configuration in Resend.
- For issues building, run `npm run build:clean` to remove `.next` and rebuild.

## Notes

This repository is configured as a private project. Update the README with license and contributor details as appropriate.

---

Updated: May 31, 2026
