/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep `next dev --turbopack` out of `.next` so `next build` is not poisoned
  // by leftover pages/_document.js that require [turbopack]_runtime.js.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/show/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/digital-marketing/seo",
        destination: "/services/search-engine-optimization",
        permanent: true,
      },
      {
        source: "/services/digital-marketing/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/services/seo",
        destination: "/services/search-engine-optimization",
        permanent: true,
      },
      {
        source: "/blogs/best-practices-for-web-development-in-2025",
        destination: "/blogs/best-practices-for-web-development",
        permanent: true,
      },
      {
        source: "/blogs/graphic-design-trends-for-2025",
        destination: "/blogs/graphic-design-trends",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
