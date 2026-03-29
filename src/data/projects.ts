// src/data/projects.ts

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "half";
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  tagline: string;
  summary: string;
  services: string[];
  heroType: "video" | "image";
  heroSrc: string;
  heroPoster: string;
  cardImage: string;
  gallery: GalleryItem[];
  sequence?: {
    path: string;
    desktopFrames: number;
    mobileFrames: number;
  };
};

export const projects: Project[] = [
  {
    slug: "massey-minis",
    title: "Massey Minis",
    category: "Campaign",
    year: "2025",
    client: "Massey Services",
    tagline: "TINY TRUCKS. BIG IMPACT.",
    summary:
      "A multi-platform campaign bringing Massey Services' fleet to life at miniature scale — blending practical effects with post-production polish to deliver playful, premium branded content.",
    services: ["Creative Development", "Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-01.jpg`,
    heroPoster: `${BASE}/images/generated/project-01.jpg`,
    cardImage: `${BASE}/images/generated/project-01.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Massey Minis hero shot", layout: "full" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Behind the scenes", layout: "half" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Miniature detail", layout: "half" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Final composite", layout: "full" },
    ],
  },
  {
    slug: "reliaquest",
    title: "Reliaquest",
    category: "Commercial",
    year: "2025",
    client: "Reliaquest",
    tagline: "SECURING WHAT MATTERS.",
    summary:
      "A commercial spot positioning Reliaquest's cybersecurity platform through cinematic storytelling — clean visuals, deliberate pacing, and a tone that earns trust without overselling.",
    services: ["Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-02.jpg`,
    heroPoster: `${BASE}/images/generated/project-02.jpg`,
    cardImage: `${BASE}/images/generated/project-02.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "Reliaquest hero", layout: "full" },
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "On set", layout: "half" },
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "Lighting setup", layout: "half" },
    ],
  },
  {
    slug: "publix-back-to-school",
    title: "Publix — Back to School",
    category: "Branded Content",
    year: "2024",
    client: "Publix",
    tagline: "FRESH START.",
    summary:
      "Branded content for Publix's back-to-school campaign — warm, family-driven storytelling grounded in real moments and natural performances.",
    services: ["Creative Development", "Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-03.jpg`,
    heroPoster: `${BASE}/images/generated/project-03.jpg`,
    cardImage: `${BASE}/images/generated/project-03.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Publix campaign hero", layout: "full" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Family scene", layout: "half" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Product styling", layout: "half" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Final frame", layout: "full" },
    ],
  },
  {
    slug: "barr-sccu",
    title: "&Barr + SCCU",
    category: "Campaign",
    year: "2024",
    client: "&Barr / Space Coast Credit Union",
    tagline: "YOUR MONEY. YOUR WAY.",
    summary:
      "A campaign for Space Coast Credit Union via &Barr — approachable, community-centered spots that make financial services feel human and accessible.",
    services: ["Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-04.jpg`,
    heroPoster: `${BASE}/images/generated/project-04.jpg`,
    cardImage: `${BASE}/images/generated/project-04.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "SCCU campaign hero", layout: "full" },
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "Interview setup", layout: "half" },
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "Community footage", layout: "half" },
    ],
  },
  {
    slug: "barr-massey-services",
    title: "&Barr + Massey Services",
    category: "Commercial",
    year: "2024",
    client: "&Barr / Massey Services",
    tagline: "BUILT ON SERVICE.",
    summary:
      "Commercial production for Massey Services through &Barr — showcasing the people and craft behind one of Florida's largest service companies.",
    services: ["Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-05.jpg`,
    heroPoster: `${BASE}/images/generated/project-05.jpg`,
    cardImage: `${BASE}/images/generated/project-05.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Massey Services hero", layout: "full" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Field crew", layout: "half" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Equipment detail", layout: "half" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Aerial shot", layout: "full" },
    ],
  },
  {
    slug: "adidas-bleacher-report",
    title: "Adidas + Bleacher Report",
    category: "Sports / Entertainment",
    year: "2023",
    client: "Adidas / Bleacher Report",
    tagline: "GAME RECOGNIZE GAME.",
    summary:
      "A sports and entertainment collaboration between Adidas and Bleacher Report — high-energy content blending athletic culture with brand storytelling.",
    services: ["Creative Development", "Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-06.jpg`,
    heroPoster: `${BASE}/images/generated/project-06.jpg`,
    cardImage: `${BASE}/images/generated/project-06.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Adidas x BR hero", layout: "full" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Athlete portrait", layout: "half" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Behind the scenes", layout: "half" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Final edit frame", layout: "full" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
