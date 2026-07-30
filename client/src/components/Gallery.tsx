import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
  Every photograph ships as WebP at three widths, and the browser is told what
  each plate actually renders at so it can pick one. The single 1200px JPEG this
  replaces was between one and seven times larger than the box it went into,
  depending on the slot, and the nine of them landed as 3.19MB the moment the
  gallery came into view.

  The JPEGs stay in the repository as the masters the variants are derived from;
  nothing imports them, so they are not built.

  Numbers are the ones the photographs were uploaded under, gaps and all —
  referring to one by the number it already has beats keeping a mapping in your
  head. They are read off the filenames rather than listed, so adding a
  photograph is a matter of dropping its three variants in.
*/
const VARIANTS = import.meta.glob<string>(
  "../../../attached_assets/film-*-*.webp",
  { eager: true, query: "?url", import: "default" },
);

type Variant = { width: number; url: string };

const SOURCES = (() => {
  const byNumber: Record<string, Variant[]> = {};
  for (const [path, url] of Object.entries(VARIANTS)) {
    const match = path.match(/film-(\d+)-(\d+)\.webp$/);
    if (!match) continue;
    (byNumber[match[1]] ??= []).push({ width: Number(match[2]), url });
  }
  return Object.keys(byNumber)
    .sort((a, b) => Number(a) - Number(b))
    .map((number) => {
      const widths = byNumber[number].sort(
        (a: Variant, b: Variant) => a.width - b.width,
      );
      return {
        number,
        srcSet: widths.map((v: Variant) => `${v.url} ${v.width}w`).join(", "),
        // The middle width as the fallback for anything that cannot read srcSet.
        src: widths[Math.floor(widths.length / 2)].url,
      };
    });
})();

// Portraits only, every one cropped to exactly 3:4, so every plate in the
// sequence is the same shape and only the photo inside it changes.
const PORTRAIT = 3 / 4;

const PHOTOS = SOURCES.map((source) => ({ ...source, ratio: PORTRAIT }));

const WORDMARK = "Beyond Design";

/*
  The title's own depth and drift, independent of the photograph's. Both climb
  the screen the whole time the section is pinned, but at different rates —
  that gap in speed is what the entrance reads as parallax rather than two
  things simply appearing together. The title is the faster of the two, so it
  also finishes its climb first and is off the top of the screen well before
  the photographs are done cycling.
*/
const WORDMARK_DEPTH = 1.35;
const DRIFT = 700;
const WORDMARK_TOP = "-14%";

const WORDMARK_END = 0.42;

/*
  Scroll distance is split into two kinds of segment: ENTRY_VH is spent once,
  sliding the first photograph up into its resting, centred position. Every
  photograph after that — including the first, once it has arrived — gets an
  equal SEGMENT_VH of scroll as its own dwell, so scrolling past it is what
  swaps in the next one. Position never moves during a dwell; only the
  photograph itself changes.

  SEGMENT_VH is deliberately short — around one wheel notch per photograph —
  so the sequence rips through rather than dwelling.
*/
const ENTRY_VH = 70;
const SEGMENT_VH = 14;
const TOTAL_VH = ENTRY_VH + PHOTOS.length * SEGMENT_VH;
const ENTRY_FRAC = ENTRY_VH / TOTAL_VH;

/*
  The title has to read first and the photograph second, so the photograph
  does not begin its slide until the entry is a third gone. Before that it
  is parked a full viewport down, off screen — the title has the frame to
  itself, coming up through the middle, and the photograph only starts to
  show once the type is well established.

  Both still finish together at ENTRY_FRAC, which is what keeps it reading as
  one arrival at two speeds rather than two separate entrances.
*/
const PHOTO_START = ENTRY_FRAC * 0.35;
const ENTRY_OFFSET = "100vh";

/*
  The shrink runs AFTER the entry, not during it: the title spends the entry
  rising at full size, and only once it has arrived does it start shrinking
  and carry on up and out of frame.
*/
const SHRINK_VH = 35;
const SHRINK = [ENTRY_FRAC, ENTRY_FRAC + SHRINK_VH / TOTAL_VH] as const;

function Wordmark({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const drift = WORDMARK_DEPTH * DRIFT;
  // Continuous across the whole pin, unlike the photograph: this is what
  // gives the title a different speed than the photo during the entrance,
  // and what carries it on off-screen while the photos are still cycling.
  const y = useTransform(progress, (p) => drift - p * drift * 2);
  const scale = useTransform(progress, [...SHRINK], [1, WORDMARK_END], {
    clamp: true,
  });

  return (
    <motion.div
      aria-hidden
      // Above the photograph, so the title overlaps the top of the frame
      // during the entrance rather than sitting behind it.
      className="pointer-events-none absolute inset-x-0 z-[15] select-none text-center will-change-transform"
      style={{
        top: WORDMARK_TOP,
        transformOrigin: "50% 0%",
        backfaceVisibility: "hidden",
        y,
        scale,
        z: 0,
      }}
    >
      <span
        className="font-display block font-medium leading-[0.82] tracking-[-0.04em] text-foreground text-[clamp(3rem,13.5vw,17rem)]"
        style={{ textRendering: "geometricPrecision" }}
      >
        {WORDMARK}
      </span>
    </motion.div>
  );
}

function Frame({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const [index, setIndex] = useState(0);

  // Slides the frame up into its resting position across the entry window,
  // then holds at rest for good — clamp means nothing after ENTRY_FRAC ever
  // reads anything but "0vh", so the frame cannot drift again once it has
  // arrived, no matter how far the rest of the section scrolls.
  const y = useTransform(
    progress,
    [PHOTO_START, ENTRY_FRAC],
    [ENTRY_OFFSET, "0vh"],
    { clamp: true },
  );

  useMotionValueEvent(progress, "change", (p) => {
    if (p <= ENTRY_FRAC) {
      setIndex(0);
      return;
    }
    const within = (p - ENTRY_FRAC) / (1 - ENTRY_FRAC);
    setIndex(Math.min(PHOTOS.length - 1, Math.floor(within * PHOTOS.length)));
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{ y }}
    >
      {/*
        All nine are mounted and stacked, and the swap is a plain opacity
        flip with no transition on it — a hard cut on the frame the scroll
        crosses the boundary.

        Mounting them all is what makes the cut clean rather than merely
        instant: swapping one <img>'s src would hit the network on first
        showing, and at this speed that is a blank frame where the photograph
        should be. Nine 640px WebPs decoded up front costs less than that.
      */}
      <div
        className="relative max-w-[90vw]"
        style={{ height: "80vh", aspectRatio: String(PORTRAIT) }}
      >
        {PHOTOS.map((photo, i) => (
          <img
            key={photo.number}
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="min(60vh, 90vw)"
            alt=""
            aria-hidden
            decoding="async"
            className="absolute inset-0 h-full w-full rounded-[8px] object-cover"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Gallery({ bgColor }: { bgColor: string }) {
  const trackRef = useRef<HTMLElement>(null);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setStill(narrow.matches || reduced.matches);
    decide();
    narrow.addEventListener("change", decide);
    reduced.addEventListener("change", decide);

    return () => {
      narrow.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  /*
    Default offset — ["start start", "end end"] — rather than anything
    measured against the viewport's own height: the track's height is exactly
    the sticky child's height (100vh) plus however long the pin should last,
    so scrollYProgress running 0-to-1 over the track's own start-to-end is
    already 0-to-1 over the pin's active duration. No lead-in or hold-length
    arithmetic needed on top, the way the old scattered layout required.
  */
  const { scrollYProgress } = useScroll({ target: trackRef });

  /*
    The narrow layout drops the pin and the parallax entirely: absolute
    centring and a scroll-driven slide both assume a wide, mouse-driven
    screen, and neither has anything to hold onto on a phone. A static
    heading and a plain two-column grid of the same nine photographs is the
    nearest a phone gets to "one at a time, arriving with weight".
  */
  if (still) {
    return (
      /*
        The ref stays attached on this branch too. useScroll resolves its
        target on mount, and `still` starts true — leaving the ref off here
        meant it resolved against nothing, fell back to tracking the window,
        and reported 0.42 at the top of the track.
      */
      <section
        ref={trackRef}
        data-bg-color={bgColor}
        className="relative px-6 py-24"
      >
        <div className="mx-auto max-w-md">
          <h2 className="font-display mb-10 text-center text-[13vw] font-medium leading-[0.9] tracking-[-0.04em] text-foreground">
            {WORDMARK}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {PHOTOS.map((photo) => (
              <img
                key={photo.number}
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 28rem) 13rem, 45vw"
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="w-full rounded-[6px] object-cover"
                style={{ aspectRatio: String(PORTRAIT) }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    /*
      The section paints no background of its own — the page wrapper owns the
      colour swap, and a background here would slide up the screen as a hard edge.
    */
    <section
      ref={trackRef}
      data-bg-color={bgColor}
      className="relative"
      style={{ height: `${TOTAL_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Wordmark progress={scrollYProgress} />
        <Frame progress={scrollYProgress} />
      </div>
    </section>
  );
}
