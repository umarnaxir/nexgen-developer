# SEO Architecture Documentation

This directory contains the complete SEO architecture for the NexGen Developers website.

## Structure

### `/lib/seo/config.ts`
Centralized SEO configuration containing:
- Site information (name, URL)
- Publisher information
- Default SEO values (title, description, keywords)
- Default OG image settings
- Social media handles
- Author information
- Default robots settings
- Verification codes

### `/lib/seo/utils.ts`
Core SEO utility functions:
- `generateMetadata()` - Generates complete Next.js metadata objects
- `getPageSEO()` - Helper for page-specific SEO
- `SEOProps` interface - Type definitions for SEO properties

### `/lib/seo/page-seo.ts`
Page-specific SEO functions:
- `getHomeSEO()` - Home page SEO
- `getAboutSEO()` - About page SEO
- `getServicesSEO()` - Services page SEO
- `getTeamSEO()` - Team page SEO
- `getProjectsSEO()` - Projects page SEO
- `getBlogsSEO()` - Blogs listing page SEO
- `getBlogPostSEO()` - Dynamic blog post SEO (uses slug)
- `getPrivacySEO()` - Privacy policy page SEO
- `getTermsSEO()` - Terms of service page SEO

### `/lib/seo/structured-data.tsx`
Schema.org structured data components:
- `OrganizationSchema()` - Organization JSON-LD
- `WebsiteSchema()` - Website JSON-LD with search action
- `BreadcrumbSchema()` - Breadcrumb navigation schema
- `ArticleSchema()` - Article schema for blog posts
- `ServiceSchema()` - Service schema for service pages

### `/lib/seo/faq-schema.tsx`
FAQ Schema component:
- `FAQSchema()` - FAQPage JSON-LD for FAQ sections

## Usage

### Adding SEO to a Page

```typescript
import { getAboutSEO } from "@/lib/seo/page-seo";

export const metadata = getAboutSEO();
```

### Adding Structured Data

```typescript
import { OrganizationSchema } from "@/lib/seo/structured-data";

export default function Page() {
  return (
    <>
      <OrganizationSchema />
      {/* Your page content */}
    </>
  );
}
```

### Adding FAQ Schema

```typescript
import { FAQSchema } from "@/lib/seo/faq-schema";

const faqs = [
  { question: "Question?", answer: "Answer." }
];

export default function Page() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      {/* Your FAQ content */}
    </>
  );
}
```

## Features

✅ Centralized SEO configuration
✅ Unique SEO for each page
✅ Dynamic SEO for blog posts using slug
✅ OpenGraph tags for all pages
✅ Twitter Card support
✅ Canonical URLs everywhere
✅ Robots meta tags
✅ Sitemap generation (`/sitemap.xml`)
✅ Robots.txt (`/robots.txt`)
✅ Structured data (Schema.org):
  - Organization
  - Website
  - Article (for blog posts)
  - FAQPage (for FAQ sections)
  - Breadcrumbs (when needed)
  - Service (when needed)

## Files Modified

- `app/layout.tsx` - Added Organization and Website schemas
- `app/page.tsx` - Added home page SEO
- `app/about/page.tsx` - Added about page SEO
- `app/services/page.tsx` - Added services page SEO
- `app/team/page.tsx` - Added team page SEO
- `app/projects/page.tsx` - Added projects page SEO
- `app/blogs/page.tsx` - Added blogs page SEO
- `app/blogs/[slug]/layout.tsx` - Added dynamic blog post SEO
- `app/blogs/[slug]/page.tsx` - Added Article schema
- `app/privacy/page.tsx` - Added privacy page SEO
- `app/terms/page.tsx` - Added terms page SEO
- `app/admin/page.tsx` - Added noindex/nofollow for admin
- `app/home/FAQSection.tsx` - Added FAQ schema
- `app/sitemap.ts` - Generated sitemap
- `app/robots.ts` - Generated robots.txt

## Next Steps

1. Update verification codes in `lib/seo/config.ts`:
   - Google Search Console verification code
   - Bing Webmaster Tools verification code

2. Create and upload OG image:
   - Recommended size: 1200x630px
   - Upload to `/public/og-image.jpg` or update path in config

3. Add social media profiles to Organization schema in `lib/seo/structured-data.tsx`

4. Test SEO implementation:
   - Use Google Search Console
   - Test with Facebook Debugger
   - Test with Twitter Card Validator
   - Validate structured data with Google Rich Results Test
