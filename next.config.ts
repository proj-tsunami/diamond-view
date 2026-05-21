import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< Updated upstream
=======
  allowedDevOrigins: [
    "dvstudio.site",
    "dvsdashboard.site",
    "tsunamidashboard.site",
    "tsunamistudio.site",
  ],
  output: "export",
>>>>>>> Stashed changes
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
