/**
 * Bakes EXIF orientation into pixel data and strips metadata.
 * Run: node scripts/fix-bts-orientation.mjs
 */

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BTS_DIR = path.join(__dirname, "..", "public", "images", "bts");

const files = fs.readdirSync(BTS_DIR).filter((f) => /\.jpe?g$/i.test(f));

for (const f of files) {
  const src = path.join(BTS_DIR, f);
  const tmp = src + ".tmp";
  await sharp(src)
    .rotate() // auto-orient based on EXIF, then strip EXIF
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(tmp);
  fs.renameSync(tmp, src);
  console.log(`✓ ${f}`);
}

console.log(`\nProcessed ${files.length} files.`);
