import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? "/diamond-view" : "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath,
  assetPrefix: isProd ? "/diamond-view/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
