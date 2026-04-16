/**
 * One-shot migration — moves src/data/team.ts into Sanity teamMember docs,
 * uploading any wide/close images from /public/images/team/ as image assets.
 *
 * Run with: SANITY_TOKEN=xxx node scripts/migrate-team.mjs
 *
 * Safe to re-run: uses createOrReplace keyed by deterministic _id.
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

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

// Imported inline so this script stays single-file
const team = [
  { name: "Tim Moore", role: "Founder", wideImage: "/images/team/tim_moore-8.jpg", closeImage: "/images/team/tim_moore-9.jpg" },
  { name: "Jeff McKown", role: "President", wideImage: "/images/team/jeff_mckown-4.jpg", closeImage: "/images/team/jeff_mckown-3.jpg" },
  { name: "Erin Cullaro", role: "Vice President", wideImage: "/images/team/erin_cullaro-1.jpg", closeImage: "/images/team/erin_cullaro-4.jpg" },
  { name: "Anthony Santa", role: "Director of Sports + Entertainment", wideImage: "/images/team/anthony_santa-1.jpg", closeImage: "/images/team/anthony_santa-3.jpg" },
  { name: "Susan Mulvey", role: "Executive Producer", closeImage: "/images/team/susan_mulvey-1.jpg" },
  { name: "Vanessa Diaz", role: "Director", wideImage: "/images/team/vanessa_diaz-6.jpg", closeImage: "/images/team/vanessa_diaz-3.jpg" },
  { name: "Jason Blanc", role: "Director", wideImage: "/images/team/jason_blanc-6.jpg", closeImage: "/images/team/jason_blanc-7.jpg" },
  { name: "Ryan Sebastian", role: "Director of Post Production", wideImage: "/images/team/ryan_sebastyan-3.jpg", closeImage: "/images/team/ryan_sebastyan-2.jpg" },
  { name: "Kevin DeLucia", role: "Director of Visual Effects" },
  { name: "Kayla Gremer", role: "Project Manager", wideImage: "/images/team/kayla_gremer_foreid-1.jpg", closeImage: "/images/team/kayla_gremer_foreid-5.jpg" },
  { name: "Lucy Nash", role: "Production Coordinator", wideImage: "/images/team/lucy_nash-3.jpg", closeImage: "/images/team/lucy_nash-4.jpg" },
  { name: "Alex Segovia Walle", role: "Cinematographer" },
  { name: "Alec Piper", role: "Media Manager + Colorist", wideImage: "/images/team/alec_pieper-5.jpg", closeImage: "/images/team/alec_pieper-1.jpg" },
  { name: "Ricardo Campbell", role: "Marketing Editor + Shooter", wideImage: "/images/team/ricardo_campbell-2.jpg", closeImage: "/images/team/ricardo_campbell-1.jpg" },
  { name: "Cory Draper", role: "Senior Editor", wideImage: "/images/team/cory_draper-1.jpg", closeImage: "/images/team/cory_draper-5.jpg" },
  { name: "Noah Lambrix", role: "Editor + Motion Designer", wideImage: "/images/team/noah_lambrix-4.jpg", closeImage: "/images/team/noah_lambrix-5.jpg" },
  { name: "Jon Davila", role: "Consultant" },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function uploadAssetIfPresent(publicPath) {
  if (!publicPath) return null;
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`  skip (missing on disk): ${publicPath}`);
    return null;
  }
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function run() {
  console.log(`Migrating ${team.length} team members…`);
  for (let i = 0; i < team.length; i++) {
    const m = team[i];
    const _id = `teamMember-${slugify(m.name)}`;
    console.log(`[${i + 1}/${team.length}] ${m.name}`);
    const [wideImage, closeImage] = await Promise.all([
      uploadAssetIfPresent(m.wideImage),
      uploadAssetIfPresent(m.closeImage),
    ]);
    await client.createOrReplace({
      _id,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      order: i,
      ...(wideImage && { wideImage }),
      ...(closeImage && { closeImage }),
    });
  }
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
