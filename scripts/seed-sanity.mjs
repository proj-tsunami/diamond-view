/**
 * One-shot seed script — populates Sanity with 6 placeholder DV projects
 * using BTS images from /public/images/bts/ as hero + gallery imagery.
 *
 * Run with: SANITY_TOKEN=xxx node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BTS_DIR = path.join(__dirname, "..", "public", "images", "bts");

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Missing SANITY_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "mytelucw",
  dataset: "production",
  apiVersion: "2025-05-01",
  token,
  useCdn: false,
});

// Map BTS files → projects. These are placeholders until real imagery arrives.
const projects = [
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
    order: 1,
    hero: "miter-2024-1.jpg",
    card: "miter-2024-1.jpg",
    gallery: [
      { file: "miter-2024-1.jpg", alt: "Massey Minis hero shot", layout: "full" },
      { file: "dsc02828.jpg", alt: "Behind the scenes", layout: "half" },
      { file: "dscf5574.jpg", alt: "Miniature detail", layout: "half" },
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
    order: 2,
    hero: "kforce-2025-1.jpg",
    card: "kforce-2025-1.jpg",
    gallery: [
      { file: "kforce-2025-1.jpg", alt: "Reliaquest hero", layout: "full" },
      { file: "expedia-dr-1.jpg", alt: "On set", layout: "half" },
      { file: "ice02909.jpg", alt: "Lighting setup", layout: "half" },
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
    order: 3,
    hero: "kids_first_2025-1.jpg",
    card: "kids_first_2025-1.jpg",
    gallery: [
      { file: "kids_first_2025-1.jpg", alt: "Publix campaign hero", layout: "full" },
      { file: "orlando_health_2025-1.jpg", alt: "Family scene", layout: "half" },
      { file: "st_leo-2025-1.jpg", alt: "Product styling", layout: "half" },
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
    order: 4,
    hero: "st_leo-2025-1.jpg",
    card: "st_leo-2025-1.jpg",
    gallery: [
      { file: "st_leo-2025-1.jpg", alt: "SCCU campaign hero", layout: "full" },
      { file: "orlando_health_2025-1.jpg", alt: "Interview setup", layout: "half" },
      { file: "expedia-dr-1.jpg", alt: "Community footage", layout: "half" },
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
    order: 5,
    hero: "miter-2024-1.jpg",
    card: "miter-2024-1.jpg",
    gallery: [
      { file: "miter-2024-1.jpg", alt: "Massey Services hero", layout: "full" },
      { file: "ice02909.jpg", alt: "Field crew", layout: "half" },
      { file: "dscf5574.jpg", alt: "Equipment detail", layout: "half" },
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
    order: 6,
    hero: "ny_giants_jersey_bts-2.jpg",
    card: "orlando_magic_2025_bts-1.jpg",
    gallery: [
      { file: "orlando_magic_2025_bts-1.jpg", alt: "Adidas x BR hero", layout: "full" },
      { file: "braves_2025_bts-5.jpg", alt: "Athlete portrait", layout: "half" },
      { file: "tb_lightning_bw_2025-3.jpg", alt: "Behind the scenes", layout: "half" },
      { file: "ny_giants_jersey_bts_bw-19.jpg", alt: "Final edit frame", layout: "full" },
    ],
  },
];

// Upload image asset and return its _ref
const uploadedCache = new Map();
async function uploadImage(filename) {
  if (uploadedCache.has(filename)) return uploadedCache.get(filename);
  const filepath = path.join(BTS_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`Missing image: ${filepath}`);
  }
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload("image", fs.createReadStream(filepath), {
    filename,
  });
  uploadedCache.set(filename, asset._id);
  return asset._id;
}

function imageRef(assetId) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

async function seed() {
  for (const p of projects) {
    console.log(`\n📦 ${p.title}`);

    const heroAssetId = await uploadImage(p.hero);
    const cardAssetId = await uploadImage(p.card);

    const galleryItems = [];
    for (const g of p.gallery) {
      const id = await uploadImage(g.file);
      galleryItems.push({
        _type: "object",
        _key: g.file.replace(/[^a-z0-9]/gi, "") + galleryItems.length,
        image: imageRef(id),
        alt: g.alt,
        layout: g.layout,
      });
    }

    const doc = {
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      year: p.year,
      client: p.client,
      tagline: p.tagline,
      summary: p.summary,
      services: p.services,
      heroType: "image",
      heroImage: imageRef(heroAssetId),
      cardImage: imageRef(cardAssetId),
      gallery: galleryItems,
      order: p.order,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Saved ${p.slug}`);
  }

  console.log("\n✅ Seed complete — 6 projects populated in Sanity");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
