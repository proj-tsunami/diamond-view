// src/data/projects.ts

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
    heroSrc: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop", alt: "Massey Minis hero shot", layout: "full" },
      { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop", alt: "Behind the scenes", layout: "half" },
      { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop", alt: "Miniature detail", layout: "half" },
      { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop", alt: "Final composite", layout: "full" },
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
    heroSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Reliaquest hero", layout: "full" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "On set", layout: "half" },
      { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", alt: "Lighting setup", layout: "half" },
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
    heroSrc: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", alt: "Publix campaign hero", layout: "full" },
      { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", alt: "Family scene", layout: "half" },
      { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", alt: "Product styling", layout: "half" },
      { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop", alt: "Final frame", layout: "full" },
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
    heroSrc: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop", alt: "SCCU campaign hero", layout: "full" },
      { src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop", alt: "Interview setup", layout: "half" },
      { src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2574&auto=format&fit=crop", alt: "Community footage", layout: "half" },
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
    heroSrc: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop", alt: "Massey Services hero", layout: "full" },
      { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop", alt: "Field crew", layout: "half" },
      { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop", alt: "Equipment detail", layout: "half" },
      { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2574&auto=format&fit=crop", alt: "Aerial shot", layout: "full" },
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
    heroSrc: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop",
    heroPoster: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop",
    cardImage: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop",
    gallery: [
      { src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop", alt: "Adidas x BR hero", layout: "full" },
      { src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop", alt: "Athlete portrait", layout: "half" },
      { src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop", alt: "Behind the scenes", layout: "half" },
      { src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop", alt: "Final edit frame", layout: "full" },
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
