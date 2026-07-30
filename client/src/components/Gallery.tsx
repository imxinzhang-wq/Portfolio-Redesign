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

const WORDMARK_TOP = "-14%";
const WORDMARK_END = 0.42;

/*
  ── The two speeds ────────────────────────────────────────────────────────
  Both are literal multiples of scroll speed: 1 means the element climbs the
  screen at exactly the rate the page scrolls, 2 means twice that. They are
  the only two numbers that set the parallax, and they are directly
  comparable — which is the whole reason for expressing them this way rather
  than as the old depth-times-drift, where the actual rate was an emergent
  property of four constants and nobody could tell the two apart by reading.

  The title is the nearer, faster element, so it is the larger of the two.
*/
const TEXT_SPEED = 1.15;
const PHOTO_SPEED = 0.55;

/*
  How far below its resting place each element begins. Both start clear of the
  fold: the photograph's resting top edge is 10vh down, so 95vh puts it just
  off the bottom, and 104vh puts the title's at 90vh — right on the bottom
  edge, so it enters immediately and gets the full height of the screen to
  cross.

  That full-screen run is what lets the title be the faster element and still
  be around when the photograph lands. At 78vh it started halfway up, ran out
  of screen in 640px, and was long gone by the time the photograph settled
  1300px later — the shrink included, which happened to an element nobody
  could see.
*/
const PHOTO_OFFSET_VH = 95;
const TEXT_OFFSET_VH = 104;

/*
  Scroll distances, in vh, and these now mean exactly what they say — see the
  PIN_VH note below for why they previously did not.

  TEXT_LEAD_VH is the run the title gets on its own before the photograph
  starts moving at all. Each element's slide then takes however long its own
  distance at its own speed requires, so the entry's length is derived from
  the four numbers above rather than set independently of them: pick a speed
  and a distance, and the duration follows. Setting all three by hand is how
  the photograph ended up covering 900px in 200px of scroll.
*/
const TEXT_LEAD_VH = -14;
const PHOTO_SLIDE_VH = PHOTO_OFFSET_VH / PHOTO_SPEED;
const ENTRY_VH = TEXT_LEAD_VH + PHOTO_SLIDE_VH;

/*
  Every photograph after the first gets an equal SEGMENT_VH of scroll as its
  own dwell, so scrolling past it is what swaps in the next one. Position
  never moves during a dwell; only the photograph itself changes.

  SEGMENT_VH is deliberately short — about one wheel notch each — so the
  sequence rips through rather than dwelling.
*/
const SEGMENT_VH = 26;

/*
  PIN_VH is the scroll actually consumed while the stage is pinned, and it is
  what every fraction below divides by. TOTAL_VH — the section's height — is
  that plus the 100vh the sticky child itself occupies.

  These being the same number is the bug this replaces. scrollYProgress is
  normalised over the track's scrollable range, which is height minus the
  sticky child, but the fractions were dividing by the full height. Every vh
  constant therefore delivered only PIN_VH/TOTAL_VH of its stated distance —
  49% of it, as the section was tuned — so everything ran about twice as fast
  as the numbers implied, and hand-tuning them meant fighting that factor.
*/
const PIN_VH = ENTRY_VH + PHOTOS.length * SEGMENT_VH;
const TOTAL_VH = PIN_VH + 100;

const PHOTO_START = TEXT_LEAD_VH / PIN_VH;
const ENTRY_FRAC = ENTRY_VH / PIN_VH;

/*
  ── The title's hold ──────────────────────────────────────────────────────
  The title does not climb straight through and out. It rises, parks near the
  top of the screen, and sits there shrinking very slowly while the
  photograph carries on up past it; once it is small it resumes and leaves.

  TEXT_PARK_VH is the y it holds at. With WORDMARK_TOP at -14vh, 26vh puts
  the type's top edge 12vh down the screen.

  TEXT_RISE_VH is derived — the climb to the park is just that distance at
  TEXT_SPEED — but TEXT_HOLD_VH is set by hand on purpose, and this is the
  one number here that is NOT allowed to follow from the others.

  It was briefly `ENTRY_VH - TEXT_RISE_VH`, so the shrink would finish on the
  same frame the photograph settled. That reads well but it couples the length
  of the shrink to the photograph's timing: moving TEXT_LEAD_VH from 34 to -14
  to bring the photograph in sooner also cut the hold from 78vh to 30vh, and a
  30vh shrink is not the slow one this is supposed to be. The hold is a
  deliberate duration, so it gets its own number.

  It does still need to end near ENTRY_VH, though, and that is what
  PHOTO_SPEED is holding up: the photograph is meant to be climbing for the
  whole hold, so if it settles early the frames start cutting underneath a
  title that is still shrinking on top of them. Slowing the climb is the way
  to buy that time — delaying the start instead would cost the photograph its
  entrance, which is what TEXT_LEAD_VH at -14 is deliberately spending.

  So: hold 90vh ends at 158vh, photograph settles at 159vh. Change one and
  check the other.

  The shrink runs across the hold, which is the whole point of the hold: it
  is the one thing still moving while the type sits still.
*/
const TEXT_PARK_VH = 26;
const TEXT_HOLD_VH = 90;
const TEXT_RISE_VH = (TEXT_OFFSET_VH - TEXT_PARK_VH) / TEXT_SPEED;
const SHRINK = [
  TEXT_RISE_VH / PIN_VH,
  (TEXT_RISE_VH + TEXT_HOLD_VH) / PIN_VH,
] as const;

function Wordmark({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  /*
    Three phases: climb from TEXT_OFFSET_VH at TEXT_SPEED, hold at
    TEXT_PARK_VH, then carry on from the park at the same speed and off the
    top of the screen. Everything is in vh so the rates hold at any viewport
    height.

    Resuming from TEXT_PARK_VH rather than from where an uninterrupted climb
    would have reached is what makes the hold a hold: the scroll spent parked
    is not paid back afterwards, so the type leaves from where it stopped
    instead of jumping to catch up.
  */
  const y = useTransform(progress, (p) => {
    const scrolled = p * PIN_VH;
    if (scrolled < TEXT_RISE_VH) {
      return `${TEXT_OFFSET_VH - TEXT_SPEED * scrolled}vh`;
    }
    const afterHold = scrolled - (TEXT_RISE_VH + TEXT_HOLD_VH);
    if (afterHold <= 0) return `${TEXT_PARK_VH}vh`;
    return `${TEXT_PARK_VH - TEXT_SPEED * afterHold}vh`;
  });
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
    [`${PHOTO_OFFSET_VH}vh`, "0vh"],
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
