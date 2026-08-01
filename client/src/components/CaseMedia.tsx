/*
  One slot for every piece of media a case study drops into its layout.

  The case studies mix stills with screen recordings, and the recordings used
  to be animated GIFs, so every site could just be an <img>. They are MP4 now
  (see scripts/gifs-to-video.mjs) and a <video> needs different markup and
  different attributes — but which sections hold a recording is data, not
  layout: a recording turns up as `concept.image` in one section type, inside
  `section.images` in another. Rather than teach five render sites to branch,
  they all render this, and it decides from the URL.

  The `sources` map is what makes the decision possible. Vite gives an
  imported asset a hashed URL, so `src` arrives here as something like
  `/assets/direction-1-a1b2c3d4.mp4` — the extension survives, which is
  enough to know it is a video, but the matching .webm URL does not, since
  its hash is different. Globbing the directory recovers the pair.
*/
import { useMemo } from "react";

const VIDEO_URLS = import.meta.glob<string>(
  "../../../attached_assets/*.{mp4,webm}",
  { eager: true, query: "?url", import: "default" },
);

/* Hashed URL -> its sibling of the other format, keyed by source basename. */
const WEBM_BY_BASENAME = (() => {
  const map: Record<string, string> = {};
  for (const [path, url] of Object.entries(VIDEO_URLS)) {
    const match = path.match(/\/([^/]+)\.webm$/);
    if (match) map[match[1]] = url;
  }
  return map;
})();

const MP4_BASENAME_BY_URL = (() => {
  const map: Record<string, string> = {};
  for (const [path, url] of Object.entries(VIDEO_URLS)) {
    const match = path.match(/\/([^/]+)\.mp4$/);
    if (match) map[url] = match[1];
  }
  return map;
})();

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function CaseMedia({ src, alt, className }: Props) {
  const webm = useMemo(() => {
    const basename = MP4_BASENAME_BY_URL[src];
    return basename ? WEBM_BY_BASENAME[basename] : undefined;
  }, [src]);

  if (!src.endsWith(".mp4")) {
    return <img src={src} alt={alt} className={className} draggable={false} />;
  }

  return (
    /*
      These replace GIFs, so they behave like GIFs: they start on their own,
      loop forever, and carry no audio track to unmute. `playsInline` is what
      stops iOS taking them fullscreen, and without `muted` a browser will
      refuse to autoplay at all.

      No `controls` and no `preload="none"`: a visitor reading a case study
      should not have to press play on a product demo, and these sit inside
      the flow of the page where a poster frame followed by a load would read
      as a broken image.

      aria-label rather than alt, since <video> has no alt.
    */
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
      {webm && <source src={webm} type="video/webm" />}
    </video>
  );
}
