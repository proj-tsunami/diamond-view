/**
 * One-shot headshot update — uploads 2026 headshots from Google Drive
 * to the corresponding Sanity teamMember documents.
 *
 * Uses headshot -1 as closeImage (default card portrait)
 * and headshot -2 as wideImage (hover wide shot).
 *
 * Run with: SANITY_TOKEN=xxx node scripts/update-headshots-2026.mjs
 *
 * Safe to re-run: only patches image fields, leaves all other fields intact.
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const HEADSHOTS_DIR =
  "D:/Drive/My Drive/_WORK/PROJECTS/Diamond View/DVBRAND_2026/MEDIA/Photography/headshots-2026/Finals";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Missing SANITY_TOKEN — run with: SANITY_TOKEN=xxx node scripts/update-headshots-2026.mjs");
  process.exit(1);
}

const client = createClient({
  projectId: "mytelucw",
  dataset: "production",
  apiVersion: "2025-05-01",
  token,
  useCdn: false,
});

// Maps folder name → Sanity document _id (matches slugify(name) from migrate-team.mjs)
const MEMBERS = [
  { folder: "Tim",      id: "teamMember-tim-moore" },
  { folder: "Jeff",     id: "teamMember-jeff-mckown" },
  { folder: "Erin",     id: "teamMember-erin-cullaro" },
  { folder: "Anthony",  id: "teamMember-anthony-santa" },
  { folder: "Susan",    id: "teamMember-susan-mulvey" },
  { folder: "Vanessa",  id: "teamMember-vanessa-diaz" },
  { folder: "Jason",    id: "teamMember-jason-blanc" },
  { folder: "Ryan",     id: "teamMember-ryan-sebastian" },
  { folder: "Kevin",    id: "teamMember-kevin-delucia" },
  { folder: "Kayla",    id: "teamMember-kayla-gremer" },
  { folder: "Lucy",     id: "teamMember-lucy-nash" },
  { folder: "Alex",     id: "teamMember-alex-segovia-walle" },
  { folder: "Alec",     id: "teamMember-alec-piper" },
  { folder: "Ricardo",  id: "teamMember-ricardo-campbell" },
  { folder: "Cory",     id: "teamMember-cory-draper" },
  { folder: "Noah",     id: "teamMember-noah-lambrix" },
];

function findShot(folder, number) {
  const dir = path.join(HEADSHOTS_DIR, folder);
  // Try jpg first, then png
  for (const ext of ["jpg", "png"]) {
    const f = path.join(dir, `${folder}_DV 2026_Headshot-${number}.${ext}`);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

async function uploadImage(filePath) {
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function run() {
  console.log(`Updating headshots for ${MEMBERS.length} team members…\n`);

  for (const m of MEMBERS) {
    const closePath = findShot(m.folder, 1);
    const widePath  = findShot(m.folder, 2);

    if (!closePath && !widePath) {
      console.warn(`[SKIP] ${m.folder} — no shots found`);
      continue;
    }

    process.stdout.write(`[${m.folder}] uploading…`);

    const [closeImage, wideImage] = await Promise.all([
      closePath ? uploadImage(closePath) : Promise.resolve(null),
      widePath  ? uploadImage(widePath)  : Promise.resolve(null),
    ]);

    const patch = client.patch(m.id);
    if (closeImage) patch.set({ closeImage });
    if (wideImage)  patch.set({ wideImage });
    await patch.commit();

    console.log(` done (close: ${closePath ? "✓" : "—"}, wide: ${widePath ? "✓" : "—"})`);
  }

  console.log("\nAll headshots updated.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
