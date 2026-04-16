/**
 * Import all /_assets/Photography/Frame Grabs/ folders into Sanity.
 *
 * For each folder:
 *   - Compress every PNG/JPG to a web-ready JPEG (max 2400px, q=82)
 *   - Upload to Sanity as image assets
 *   - Attach to a Project document:
 *       • Use existing slug if the folder name maps to one (see SLUG_MAP)
 *       • Otherwise create a new Project doc from the folder name
 *   - First image becomes hero + card; remaining become gallery
 *
 * Run: SANITY_TOKEN=xxx node scripts/import-framegrabs.mjs
 */

import { createClient } from "@sanity/client";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRAMEGRAB_ROOT = path.join(
  __dirname,
  "..",
  "..",
  "_assets",
  "Photography",
  "Frame Grabs",
);

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

// Folder name → existing Sanity slug (otherwise a new doc is created)
const SLUG_MAP = {
  "Massey": "massey-minis",
  "Reliaquest": "reliaquest",
  "Publix": "publix-back-to-school",
  "SCCU": "barr-sccu",
  "Bleacher": "adidas-bleacher-report",
};

// Pretty display titles for new projects
const TITLE_MAP = {
  "BPD": "BPD",
  "Expedia": "Expedia",
  "Flyers": "Philadelphia Flyers",
  "Ft Lauderdale": "Fort Lauderdale",
  "Icarus": "Icarus",
  "Lightning": "Tampa Bay Lightning",
  "MFA": "MFA",
  "Miter": "Miter",
  "Moffitt": "Moffitt Cancer Center",
  "NY Giants": "New York Giants",
  "Orlando City": "Orlando City",
  "Orlando Magic": "Orlando Magic",
  "PSH": "PSH",
  "Threatlocker": "Threatlocker",
  "USF": "USF",
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function prettyAlt(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Compress into a temp buffer (no intermediate file) then upload
async function uploadFrame(filepath, filename) {
  const compressedBuffer = await sharp(filepath)
    .rotate() // respect any EXIF orientation
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  const asset = await client.assets.upload("image", compressedBuffer, {
    filename: filename.replace(/\.[^.]+$/, ".jpg"),
  });
  return asset._id;
}

function imageRef(assetId) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

async function processFolder(folderName, order) {
  const folderPath = path.join(FRAMEGRAB_ROOT, folderName);
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log(`— skipping ${folderName} (no frames)`);
    return;
  }

  const existingSlug = SLUG_MAP[folderName];
  const slug = existingSlug || slugify(folderName);
  const title = TITLE_MAP[folderName] || folderName;
  const isNew = !existingSlug;

  console.log(`\n📦 ${folderName} → ${slug}${isNew ? " [NEW]" : ""}`);

  // Upload all frames
  const assetIds = [];
  for (const f of files) {
    process.stdout.write(`   ↑ ${f} ... `);
    const id = await uploadFrame(path.join(folderPath, f), f);
    assetIds.push({ id, alt: prettyAlt(f) });
    process.stdout.write("ok\n");
  }

  // Build gallery (all images, alternating full/half layout by index)
  const gallery = assetIds.map((a, i) => ({
    _type: "object",
    _key: `${slug}-${i}`,
    image: imageRef(a.id),
    alt: a.alt,
    // First image full-width, then pairs of halves, then occasional full
    layout: i === 0 ? "full" : (i % 5 === 0 ? "full" : "half"),
  }));

  // Fetch existing doc (if updating)
  const docId = `project-${slug}`;
  const existing = isNew ? null : await client.getDocument(docId).catch(() => null);

  const doc = {
    _id: docId,
    _type: "project",
    title: existing?.title ?? title,
    slug: { _type: "slug", current: slug },
    category: existing?.category ?? "Commercial",
    year: existing?.year ?? "2025",
    client: existing?.client ?? title,
    tagline: existing?.tagline ?? "",
    summary: existing?.summary ?? "",
    services: existing?.services ?? ["Production", "Post Production"],
    heroType: "image",
    heroImage: imageRef(assetIds[0].id),
    cardImage: imageRef(assetIds[0].id),
    gallery,
    order: existing?.order ?? 100 + order,
  };

  await client.createOrReplace(doc);
  console.log(`   ✓ ${files.length} frames → ${slug}`);
}

async function run() {
  const only = process.env.ONLY_FOLDERS
    ? new Set(process.env.ONLY_FOLDERS.split(",").map((s) => s.trim()))
    : null;

  const folders = fs
    .readdirSync(FRAMEGRAB_ROOT)
    .filter((f) => fs.statSync(path.join(FRAMEGRAB_ROOT, f)).isDirectory())
    .filter((f) => !only || only.has(f));

  console.log(`Found ${folders.length} project folders\n`);

  for (let i = 0; i < folders.length; i++) {
    try {
      await processFolder(folders[i], i);
    } catch (e) {
      console.error(`\n  ✗ ${folders[i]}: ${e.message}`);
    }
  }

  console.log("\n✅ Import complete.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
