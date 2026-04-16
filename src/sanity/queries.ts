import { client } from "./client";

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
  /** Optional numeric Vimeo ID — when present, the hero renders an embedded player */
  vimeoId?: string;
  /** Hash token for unlisted videos (the h= parameter in the embed URL) */
  vimeoHash?: string;
  gallery: GalleryItem[];
  /** Optional scroll sequence — present on some projects */
  sequence?: {
    path: string;
    desktopFrames: number;
    mobileFrames: number;
  };
};

type FetchOpts = { tags: string[] };

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  { tags }: FetchOpts,
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 },
  });
}

// Append `?auto=format&w=XXXX` — forces Sanity's image pipeline which
// respects EXIF orientation and converts to modern formats.
const PROJECT_FIELDS = `
  "slug": slug.current,
  title,
  category,
  year,
  client,
  tagline,
  summary,
  services,
  heroType,
  vimeoId,
  vimeoHash,
  "heroSrc": coalesce(heroVideo, heroImage.asset->url + "?auto=format&w=2400"),
  "heroPoster": heroImage.asset->url + "?auto=format&w=2400",
  "cardImage": cardImage.asset->url + "?auto=format&w=1600",
  gallery[] {
    "src": image.asset->url + "?auto=format&w=2000",
    alt,
    layout
  }
`;

export async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>(
    `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`,
    {},
    { tags: ["project"] },
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug },
    { tags: ["project", `project:${slug}`] },
  );
}

export async function getProjectSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(
    `*[_type == "project"] | order(order asc) { "slug": slug.current }.slug`,
    {},
    { tags: ["project"] },
  );
}

export async function getAdjacentProjects(slug: string) {
  const slugs = await sanityFetch<string[]>(
    `*[_type == "project"] | order(order asc).slug.current`,
    {},
    { tags: ["project"] },
  );
  const index = slugs.indexOf(slug);
  const prevSlug = slugs[(index - 1 + slugs.length) % slugs.length];
  const nextSlug = slugs[(index + 1) % slugs.length];
  const [prev, next] = await Promise.all([
    getProjectBySlug(prevSlug),
    getProjectBySlug(nextSlug),
  ]);
  return { prev: prev!, next: next! };
}

export type TeamMember = {
  name: string;
  role: string;
  wideImage?: string;
  closeImage?: string;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityFetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc) {
      name,
      role,
      "wideImage": wideImage.asset->url + "?auto=format&w=1600",
      "closeImage": closeImage.asset->url + "?auto=format&w=1200"
    }`,
    {},
    { tags: ["teamMember"] },
  );
}

export type SiteSettings = {
  demoReelUrl: string | null;
  demoReelPoster: string | null;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch<SiteSettings | null>(
    `*[_id == "siteSettings"][0] {
      "demoReelUrl": demoReel.asset->url,
      "demoReelPoster": demoReelPoster.asset->url + "?auto=format&w=2400"
    }`,
    {},
    { tags: ["siteSettings"] },
  );
  return result ?? { demoReelUrl: null, demoReelPoster: null };
}

export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export async function getServices(): Promise<Service[]> {
  return sanityFetch<Service[]>(
    `*[_type == "service"] | order(order asc) { number, title, description, tags }`,
    {},
    { tags: ["service"] },
  );
}
