/**
 * Sets Vimeo IDs + taglines on Sanity project documents.
 * Run: SANITY_TOKEN=xxx node scripts/update-vimeo.mjs
 */

import { createClient } from "@sanity/client";

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

// slug → { vimeoId, vimeoHash (for unlisted), tagline }
const MAP = {
  "lightning": { vimeoId: "1162580352", vimeoHash: "", tagline: "OPEN VIDEO" },
  "icarus": { vimeoId: "1162578371", vimeoHash: "", tagline: "ANTHEM" },
  "psh": { vimeoId: "1168125250", vimeoHash: "201252f7a4", tagline: "LIVING PORTRAITS — CAMERON" },
  "orlando-magic": { vimeoId: "1168124550", vimeoHash: "a370dc1d98", tagline: "25-26 SEASON OPENER" },
  "adidas-bleacher-report": { vimeoId: "1168124052", vimeoHash: "a0558c0908", tagline: "ADIDAS × OCHOCINCO" },
  "bpd": { vimeoId: "1168124291", vimeoHash: "e1e463eb1e", tagline: "HCA UNIVERSITY HOSPITAL" },
  "orlando-city": { vimeoId: "1168124389", vimeoHash: "166dfe32f0", tagline: "GOLD DIGGER" },
  "ft-lauderdale": { vimeoId: "1168124338", vimeoHash: "084a869170", tagline: "CVB" },
  "threatlocker": { vimeoId: "1162580608", vimeoHash: "", tagline: "ZERO TRUST" },
  "massey-minis": { vimeoId: "1162591242", vimeoHash: "670974ed2c", tagline: "MINIATURE MOMENTS — PEST" },
  "barr-sccu": { vimeoId: "1162591380", vimeoHash: "04076d4e7f", tagline: "WATCHDOG" },
  "usf": { vimeoId: "1162580793", vimeoHash: "4860697fb6", tagline: "70 YEARS" },
  "ny-giants": { vimeoId: "1162579445", vimeoHash: "d052fd2589", tagline: "100 YEARS LAUNCH" },
  "moffitt": { vimeoId: "1162579176", vimeoHash: "c24acfa5bf", tagline: "SPEROS" },
  "miter": { vimeoId: "1162579039", vimeoHash: "7fde848ead", tagline: "FIND YOUR LIGHT" },
  "expedia": { vimeoId: "1162578165", vimeoHash: "0780a9f45a", tagline: "FOUR CORNERS TRAILER" },
  "flyers": { vimeoId: "1162578243", vimeoHash: "e4db83b7dc", tagline: "SANHEIM INTRO" },
};

for (const [slug, { vimeoId, vimeoHash, tagline }] of Object.entries(MAP)) {
  const docId = `project-${slug}`;
  try {
    const existing = await client.getDocument(docId);
    if (!existing) {
      console.log(`– skipped ${slug} (no doc)`);
      continue;
    }
    const patch = client.patch(docId).set({
      vimeoId,
      vimeoHash: vimeoHash || undefined,
      heroType: "video",
      ...(existing.tagline ? {} : { tagline }),
    });
    if (!vimeoHash) patch.unset(["vimeoHash"]);
    await patch.commit();
    console.log(`✓ ${slug} → Vimeo ${vimeoId}${vimeoHash ? ` (h=${vimeoHash})` : ""}`);
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message}`);
  }
}

console.log("\n✅ Done.");
