import type { MetadataRoute } from "next";

const SITE_URL = "https://diamondview.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
