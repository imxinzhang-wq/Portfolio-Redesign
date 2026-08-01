/*
  Re-encodes the project covers as WebP.

  The gallery's film photographs already ship as WebP (see Gallery.tsx), but
  the covers never went through anything — collection.jpg and Darmi_home.jpg
  were being served as 3.7MB and 2.4MB baseline JPEGs, which is what kept the
  site's loading screen sitting on its ceiling.

  Resolution is deliberately untouched. These are re-encodes, not resizes:
  the covers fill a 16:9 frame most of the viewport wide, so on a retina
  screen the masters' 2640px is roughly what the frame actually asks for.
  The saving here is the codec, not pixels — and the codec alone is worth
  4-5x on photographic content at a quality nobody can pick out in a
  side-by-side.

  Output keeps the master's name with a `.webp` extension. No dimensions in
  it, unlike the film variants — those encode WxH because srcSet needs the
  width descriptors to pick between three sizes, and a cover has only one.

  Run: node scripts/covers-to-webp.mjs
*/
import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = new URL("../attached_assets/", import.meta.url).pathname;
const MASTERS = new URL("../attached_assets/masters/", import.meta.url).pathname;

/*
  Only the covers that are actually large. The Airbnb and tagging covers are
  1456x720 and ~150kB already — re-encoding them saves tens of kilobytes, so
  they ship as they came.
*/
const COVERS = ["collections-cover.jpg", "darmi-cover.jpg"];

/*
  Set high on purpose. 82 is where the size curve wants to sit and it looks
  fine at a glance, but the collection cover carries visible film grain and
  82 smooths a good deal of it away — inspected at 1:1, the flat wall behind
  the subject loses its speckle. 92 keeps the grain indistinguishable from
  the master and still lands ~4x under the JPEG, which is the trade the
  covers should be making.
*/
const QUALITY = 92;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}kB`;

for (const file of COVERS) {
  const input = path.join(MASTERS, file);
  const image = sharp(input);
  const { width, height } = await image.metadata();
  const base = path.parse(file).name;
  const output = path.join(ASSETS, `${base}.webp`);

  await image.webp({ quality: QUALITY, effort: 6 }).toFile(output);

  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(
    `${file} ${width}x${height}  ${kb(before)} -> ${kb(after)}  ` +
      `(${(before / after).toFixed(1)}x)  ${path.basename(output)}`,
  );
}
