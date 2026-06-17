import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder({ projectId: "mytelucw", dataset: "production" });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function imgUrl(source: any, w: number, h?: number): string {
  let b = builder.image(source).width(w).fit("crop").auto("format");
  if (h) b = b.height(h);
  return b.url();
}

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
  vimeoId?: string;
  vimeoHash?: string;
  gallery: GalleryItem[];
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
    next: { tags, revalidate: 300 },
  });
}

// Raw image ref shape returned from GROQ
type ImageRef = {
  asset: { _id: string; url: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
} | null;

type RawProject = Omit<Project, "cardImage" | "heroPoster" | "heroSrc"> & {
  cardImageRef: ImageRef;
  heroImageRef: ImageRef;
  heroVideo?: string;
  gallery: GalleryItem[];
};

function mapProject(raw: RawProject): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    year: raw.year,
    client: raw.client,
    tagline: raw.tagline,
    summary: raw.summary,
    services: raw.services,
    heroType: raw.heroType,
    vimeoId: raw.vimeoId,
    vimeoHash: raw.vimeoHash,
    sequence: raw.sequence,
    gallery: raw.gallery,
    cardImage: raw.cardImageRef ? imgUrl(raw.cardImageRef, 1600, 900) : "",
    heroPoster: raw.heroImageRef ? imgUrl(raw.heroImageRef, 2400, 1350) : "",
    heroSrc: raw.heroVideo || (raw.heroImageRef ? imgUrl(raw.heroImageRef, 2400) : ""),
  };
}

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
  heroVideo,
  "cardImageRef": cardImage { asset->{_id, url}, crop, hotspot },
  "heroImageRef": heroImage { asset->{_id, url}, crop, hotspot },
  gallery[] {
    "src": image.asset->url + "?auto=format&w=2000",
    alt,
    layout
  }
`;

export async function getProjects(): Promise<Project[]> {
  const raw = await sanityFetch<RawProject[]>(
    `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`,
    {},
    { tags: ["project"] },
  );
  return raw.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const raw = await sanityFetch<RawProject | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug },
    { tags: ["project", `project:${slug}`] },
  );
  return raw ? mapProject(raw) : null;
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
