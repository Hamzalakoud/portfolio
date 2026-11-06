import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static export for GitHub Pages (see scripts/build-pages.mjs).
// BASE_PATH is the repository name for a project page, or empty for a user site.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? (process.env.BASE_PATH ?? "/portfolio") : "";

const nextConfig: NextConfig = {
  // Cache Components prerenders every page here and keeps visited routes alive
  // for instant back navigation. A static export cannot use it, so it is off there.
  cacheComponents: !pages,
  partialPrefetching: !pages,
  // English and French each have a root layout, so the 404 page stands on its own.
  experimental: { globalNotFound: true },
  // Plain links (the 404 page, PDF downloads) need the base path spelled out.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 88],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    // No image server on static hosting: the files are served as they are.
    ...(pages ? { unoptimized: true } : {}),
  },
  ...(pages ? { output: "export", basePath, trailingSlash: true } : {}),
};

export default nextConfig;
