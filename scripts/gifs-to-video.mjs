/*
  Re-encodes the case studies' animated GIFs as MP4 + WebM.

  These are the heaviest things the site ships by a wide margin — one of them
  is 24MB — and they are all screen recordings, which is the worst possible
  case for GIF: 256 colours, no interframe compression, and a full palette
  per frame. h264 and VP9 do the same job at a few percent of the size.

  Six of the eight are GIFs wearing a `.jpg` extension. That is not a typo to
  fix in place — `file` reports GIF89a for every one of them — it is just how
  they came off whatever exported them, and it is why they never looked like
  the problem they were.

  Two encodings because that is what the site already does for the inline
  hero clip: MP4/h264 is universal on real browsers, WebM/VP9 covers the odd
  build shipping without licensed codecs.

  Quality is set high on purpose. These are UI recordings full of small type,
  where compression artefacts read as a blurry product rather than as a
  blurry video, so both encoders are run well above their usual defaults and
  the saving still comes out at 20x or better.

  Run: node scripts/gifs-to-video.mjs
*/
import { execFile } from "node:child_process";
import { stat } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const run = promisify(execFile);
const ASSETS = new URL("../attached_assets/", import.meta.url).pathname;

const GIFS = [
  "Collection-create_1774547429730.gif",
  "Collection_1774547429731.gif",
  "direction-1_1775590476908.jpg",
  "direction-2_1775590476909.jpg",
  "s-blob-v1-IMAGE-QKfUHNi0kV8_1774776952324.jpg",
  "s-blob-v1-IMAGE-DuANVKTdceA_1774776952323.jpg",
  "s-blob-v1-IMAGE-1zvtK2jYAdI_1775589728784.jpg",
  "s-blob-v1-IMAGE-7igf2FntVFI_1775589728784.jpg",
];

/*
  h264 needs even dimensions for yuv420p, and several of these are odd
  (1165x865, 231x500). Cropping the odd row/column is invisible and keeps the
  output playable everywhere; scaling instead would resample the whole frame.
*/
const EVEN = "crop=trunc(iw/2)*2:trunc(ih/2)*2";

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;

for (const file of GIFS) {
  const input = path.join(ASSETS, file);
  const base = path.parse(file).name;

  await run(ffmpeg, [
    "-y", "-i", input,
    "-vf", EVEN,
    "-c:v", "libx264",
    "-crf", "20",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    // Lets playback start before the whole file has arrived.
    "-movflags", "+faststart",
    "-an",
    path.join(ASSETS, `${base}.mp4`),
  ]);

  await run(ffmpeg, [
    "-y", "-i", input,
    "-vf", EVEN,
    "-c:v", "libvpx-vp9",
    "-crf", "28",
    // Required for CRF to act as constant quality rather than a cap.
    "-b:v", "0",
    "-row-mt", "1",
    "-an",
    path.join(ASSETS, `${base}.webm`),
  ]);

  const before = (await stat(input)).size;
  const mp4 = (await stat(path.join(ASSETS, `${base}.mp4`))).size;
  const webm = (await stat(path.join(ASSETS, `${base}.webm`))).size;
  console.log(
    `${base.slice(0, 40).padEnd(42)} ${mb(before).padStart(8)} -> ` +
      `mp4 ${mb(mp4).padStart(7)} / webm ${mb(webm).padStart(7)}  ` +
      `(${(before / mp4).toFixed(0)}x)`,
  );
}
