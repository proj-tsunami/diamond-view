import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "dvstudio.site",
    "dvsdashboard.site",
    "tsunamidashboard.site",
    "tsunamistudio.site",
  ],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
