/*
  Encodes the case studies' motion assets to MP4 + WebM.

  Two encodings because that is what the site already does for the inline
  hero clip: MP4/h264 is universal on real browsers, WebM/VP9 covers the odd
  build shipping without licensed codecs.

  Quality is set high on purpose. These are UI recordings full of small type,
  where compression artefacts read as a blurry product rather than as a
  blurry video, so both encoders run well above their usual defaults.

  Run: node scripts/encode-video.mjs
*/
import { execFile } from "node:child_process";
import { stat } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const run = promisify(execFile);
const ASSETS = new URL("../attached_assets/", import.meta.url).pathname;

/*
  GIF sources. All screen recordings, and GIF is the worst case for those:
  256 colours, no interframe compression, a palette per frame. Six of these
  wear a `.jpg` extension — not a typo to fix in place, `file` reports GIF89a
  for every one, it is just how they came off whatever exported them.

  Their names collide with nothing, so they encode in place: `foo.gif` ->
  `foo.mp4` + `foo.webm`.
*/
const GIFS = [
  "Collection-create_1774547429730.gif",
  "Collection_1774547429731.gif",
  "direction-1_1775590476908.jpg",
  "direction-2_1775590476909.jpg",
  "s-blob-v1-IMAGE-DuANVKTdceA_1774776952323.jpg",
  "s-blob-v1-IMAGE-1zvtK2jYAdI_1775589728784.jpg",
  "s-blob-v1-IMAGE-7igf2FntVFI_1775589728784.jpg",
];

/*
  Video sources — an original screen recording rather than a GIF export of
  one, which is strictly better material. A GIF has already been quantised to
  256 colours and dithered, and that dither is both permanent and expensive:
  the noise moves every frame, which defeats the interframe compression the
  encoder depends on. Vote.mp4 arrives at 888x1920 and 40fps against the
  574x1241 and 20fps of the GIF it replaces.

  They live in masters/ for a plain mechanical reason: encoding `Vote.mp4`
  would otherwise write over `Vote.mp4`. Nothing imports from that directory,
  so the originals cost nothing at runtime.
*/
const MASTERS = path.join(ASSETS, "masters");
const VIDEOS = ["Vote.mp4"];

/*
  h264 needs even dimensions for yuv420p, and several sources are odd
  (1165x865, 231x500). Cropping the odd row/column is invisible and keeps the
  output playable everywhere; scaling instead would resample every frame.
*/
const EVEN = "crop=trunc(iw/2)*2:trunc(ih/2)*2";

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;

async function encode(input, base) {
  const mp4 = path.join(ASSETS, `${base}.mp4`);
  const webm = path.join(ASSETS, `${base}.webm`);

  await run(ffmpeg, [
    "-y", "-i", input,
    "-vf", EVEN,
    "-c:v", "libx264",
    "-crf", "20",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    // Lets playback start before the whole file has arrived.
    "-movflags", "+faststart",
    // These autoplay muted and loop, so an audio track is dead weight — and
    // the Vote recording carries a silent one straight off the recorder.
    "-an",
    mp4,
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
    webm,
  ]);

  const before = (await stat(input)).size;
  console.log(
    `${base.slice(0, 40).padEnd(42)} ${mb(before).padStart(8)} -> ` +
      `mp4 ${mb((await stat(mp4)).size).padStart(7)} / ` +
      `webm ${mb((await stat(webm)).size).padStart(7)}`,
  );
}

for (const file of GIFS) {
  await encode(path.join(ASSETS, file), path.parse(file).name);
}
for (const file of VIDEOS) {
  await encode(path.join(MASTERS, file), path.parse(file).name);
}
