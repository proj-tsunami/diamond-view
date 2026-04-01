import type { NextConfig } from "next";

// Set SITE_BASE_PATH="/diamond-view" for GitHub Pages, leave empty for custom domain
const basePath = process.env.SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "dvstudio.site",
    "dvsdashboard.site",
    "tsunamidashboard.site",
    "tsunamistudio.site",
  ],
  output: "export",
  reactStrictMode: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
