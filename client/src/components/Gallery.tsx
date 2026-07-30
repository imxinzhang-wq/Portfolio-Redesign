import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
  Every photograph ships as WebP at three sizes, named `film-N-WxH.webp`, and
  the browser is told what each one actually renders at so it can pick.

  The variants are generated to fixed HEIGHTS — 800, 1200 and 1600 — not fixed
  widths, because height is the dimension the gallery pins down: every frame is
  80vh tall and the width follows from the photograph. Sizing them by width
  instead is what made the landscape ones soft. A 2451x1600 photograph rendered
  to 960px wide is only 626px tall, and the frame wants 720 CSS px at a 900px
  viewport — so it was being upscaled before a retina screen was even in the
  picture.

  Both dimensions are in the filename because both are needed: the width feeds
  srcSet's `w` descriptors, and the pair gives the aspect ratio, which now
  differs per photograph and decides how wide its frame is. Encoding it in the
  name keeps the set self-describing, so adding a photograph is still a matter
  of dropping its three variants in — no manifest to keep in sync.

  1600 is the ceiling because that is roughly the masters' own height; nothing
  is upscaled past its source. The JPEGs/JPGs stay in the repository as those
  masters; nothing imports them, so they are not built.
*/
const VARIANTS = import.meta.glob<string>(
  "../../../attached_assets/film-*-*x*.webp",
  { eager: true, query: "?url", import: "default" },
);

type Variant = { width: number; height: number; url: string };

const SOURCES = (() => {
  const byNumber: Record<string, Variant[]> = {};
  for (const [path, url] of Object.entries(VARIANTS)) {
    const match = path.match(/film-(\d+)-(\d+)x(\d+)\.webp$/);
    if (!match) continue;
    (byNumber[match[1]] ??= []).push({
      width: Number(match[2]),
      height: Number(match[3]),
      url,
    });
  }
  return Object.keys(byNumber)
    .sort((a, b) => Number(a) - Number(b))
    .map((number) => {
      const sizes = byNumber[number].sort(
        (a: Variant, b: Variant) => a.width - b.width,
      );
      const largest = sizes[sizes.length - 1];
      return {
        number,
        ratio: largest.width / largest.height,
        srcSet: sizes.map((v: Variant) => `${v.url} ${v.width}w`).join(", "),
        // The middle size as the fallback for anything that cannot read srcSet.
        src: sizes[Math.floor(sizes.length / 2)].url,
      };
    });
})();

const PHOTOS = SOURCES;

const WORDMARK = "Beyond Design";

const WORDMARK_TOP_VH = -14;
const WORDMARK_TOP = `${WORDMARK_TOP_VH}%`;
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
const PHOTO_SPEED = 0.87;

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

/*
  Every photograph after the first gets an equal SEGMENT_VH of scroll as its
  own dwell, so scrolling past it is what swaps in the next one. Position
  never moves during a dwell; only the photograph itself changes.

  SEGMENT_VH is deliberately short — about one wheel notch each — so the
  sequence rips through rather than dwelling.
*/
const SEGMENT_VH = 26;

/*
  ── The slow zone ─────────────────────────────────────────────────────────
  Once the title has climbed to TEXT_PARK_VH, everything drops to a crawl for
  a stretch — the title AND the photograph together — and that crawl is when
  the title shrinks. Past it both pick up exactly the speeds they had before.

  This replaces a dead stop. Parking the title froze it while the photograph
  carried on, which made them two separate animations that happened to
  overlap; slowing the whole scene keeps them one scene that goes into slow
  motion. Nothing is frozen, so nothing has to un-freeze.

  It is implemented as a time warp rather than as per-element special cases:
  `eased` converts real scroll into the effective scroll both elements
  actually read. They stay on their own speeds throughout and slow together
  because the clock they share slowed, which is why resuming needs no
  catch-up logic.

  SLOW_FACTOR is how much of normal speed the crawl runs at, and SLOW_VH is
  how much real scroll it eats — which is also how long the shrink takes,
  since they are the same window. The effective distance the crawl yields is
  the product, so those two numbers together decide how far the title creeps
  while it shrinks: 50vh at 0.12 buys 6vh of movement, and the title covers
  1.15x that.

  TEXT_PARK_VH is where the crawl begins, and it has to leave room for that
  creep. At 26 the title started the shrink with its top edge 12vh down and
  finished it at 1vh — right against the edge. 40 starts it at 26vh and
  finishes around 19vh, clear of the top the whole way through.
*/
const TEXT_PARK_VH = 40;
const SLOW_FACTOR = 0.12;
const SLOW_VH = 50;

const TEXT_RISE_VH = (TEXT_OFFSET_VH - TEXT_PARK_VH) / TEXT_SPEED;
const SLOW_START_VH = TEXT_RISE_VH;
const SLOW_END_VH = SLOW_START_VH + SLOW_VH;
const SLOW_GAIN_VH = SLOW_FACTOR * SLOW_VH;

/* Real scroll → the effective scroll every moving thing here reads. */
function eased(scrolled: number) {
  if (scrolled < SLOW_START_VH) return scrolled;
  if (scrolled < SLOW_END_VH) {
    return SLOW_START_VH + SLOW_FACTOR * (scrolled - SLOW_START_VH);
  }
  return SLOW_START_VH + SLOW_GAIN_VH + (scrolled - SLOW_END_VH);
}

/* And back again, to work out where in real scroll the photograph lands. */
function unEased(effective: number) {
  if (effective < SLOW_START_VH) return effective;
  if (effective < SLOW_START_VH + SLOW_GAIN_VH) {
    return SLOW_START_VH + (effective - SLOW_START_VH) / SLOW_FACTOR;
  }
  return SLOW_END_VH + (effective - SLOW_START_VH - SLOW_GAIN_VH);
}

/*
  The photograph settles once it has covered its offset at its own speed —
  measured in effective scroll, so the crawl stretches it out in real scroll
  exactly as much as it stretches the title.
*/
const ENTRY_VH = unEased(TEXT_LEAD_VH + PHOTO_OFFSET_VH / PHOTO_SPEED);

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

const ENTRY_FRAC = ENTRY_VH / PIN_VH;

// The shrink is the slow zone — that is what the crawl is there to give room
// to, so the two are the same window by construction.
const SHRINK = [SLOW_START_VH / PIN_VH, SLOW_END_VH / PIN_VH] as const;

/*
  Where the nav's "Beyond Design" link should land: the scroll position at
  which the title is centred on screen, full-size, before the crawl starts
  shrinking it. Landing at the track's start instead — the obvious target —
  shows nothing at all, since the title only enters after TEXT_LEAD_VH.

  Runs the Wordmark's own y formula backwards. `offsetHeight` (not a client
  rect) because it ignores the live `scale` transform, so it reads as the
  title's full, unshrunk height no matter where the page currently sits —
  the same height the title actually has at the scale-1 target this solves
  for.
*/
export function getBeyondCenterScrollTop(trackEl: HTMLElement): number | null {
  const wordmark = trackEl.querySelector<HTMLElement>("[data-wordmark]");
  if (!wordmark) return null;

  const vh = window.innerHeight;
  const desiredTopVh = ((vh - wordmark.offsetHeight) / 2) * (100 / vh);
  const targetEased =
    (WORDMARK_TOP_VH + TEXT_OFFSET_VH - desiredTopVh) / TEXT_SPEED;
  const realScrollVh = Math.max(0, Math.min(PIN_VH, unEased(targetEased)));

  const trackTop = window.scrollY + trackEl.getBoundingClientRect().top;
  return trackTop + (realScrollVh * vh) / 100;
}

function Wordmark({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  /*
    One rate all the way through, applied to eased scroll rather than real
    scroll. The crawl is entirely in `eased`, so there are no phases here and
    nothing to resume from — the title never stops, it just spends the slow
    zone covering very little ground.
  */
  const y = useTransform(
    progress,
    (p) => `${TEXT_OFFSET_VH - TEXT_SPEED * eased(p * PIN_VH)}vh`,
  );
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
        data-wordmark
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

  /*
    Reads the same eased scroll the title does, so the photograph goes into
    the crawl and comes out of it in step rather than sailing past at full
    speed while the title labours.

    Clamped at both ends: at 0 so it cannot drift once it has arrived no
    matter how far the rest of the section scrolls, and at its own offset so
    a positive TEXT_LEAD_VH would park it off screen rather than push it
    further down.
  */
  const y = useTransform(progress, (p) => {
    const travelled = PHOTO_SPEED * (eased(p * PIN_VH) - TEXT_LEAD_VH);
    const remaining = PHOTO_OFFSET_VH - travelled;
    return `${Math.min(PHOTO_OFFSET_VH, Math.max(0, remaining))}vh`;
  });

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
        All ten are mounted and stacked, and the swap is a plain opacity flip
        with no transition on it — a hard cut on the frame the scroll crosses
        the boundary.

        Mounting them all is what makes the cut clean rather than merely
        instant: swapping one <img>'s src would hit the network on first
        showing, and at this speed that is a blank frame where the photograph
        should be. Decoding ten up front costs less than that.

        Each is its own size rather than sharing one frame: the height is
        fixed at 80vh so they still read as a set, but the width follows the
        photograph's own ratio, so nothing is cropped. A shared 3:4 box meant
        the four landscape photographs lost most of their width to a
        centre-crop.

        max-width is the one thing that can override the fixed height — a
        landscape frame is about 1.5x its height, so on a viewport narrower
        than roughly 1.4:1 it would otherwise run off the sides. There it
        shrinks to fit instead, which is the better failure.
      */}
      {PHOTOS.map((photo, i) => (
        <img
          key={photo.number}
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={`calc(80vh * ${photo.ratio.toFixed(4)})`}
          alt=""
          aria-hidden
          decoding="async"
          className="absolute max-h-[80vh] max-w-[90vw] rounded-[8px]"
          style={{
            height: "80vh",
            aspectRatio: String(photo.ratio),
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
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
        id="beyond"
        ref={trackRef}
        data-bg-color={bgColor}
        className="relative px-6 py-24"
      >
        <h2 className="font-display mb-10 text-center text-[13vw] font-medium leading-[0.9] tracking-[-0.04em] text-foreground">
          {WORDMARK}
        </h2>
        {/*
          A horizontal, page-at-a-time carousel rather than the old vertical
          stack: each photograph is cropped to a fixed 3:4 card, scroll-snapped
          to the centre of the screen, with the neighbouring cards' edges left
          peeking on either side so the sequence reads as swipeable.

          -mx-6 cancels the section's own side padding so the row can bleed
          to the viewport edge — the peeking slivers need that width, which a
          contained max-w-md wrapper (used for everything else on this
          branch) would clip.

          The side padding is 14vw (rather than 0) so the first and last
          cards can still be scrolled to centre: scroll-snap needs room either
          side of the ends to align them the same way it aligns the middle
          ones.
        */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[14vw] pb-2">
          {PHOTOS.map((photo) => (
            <div
              key={photo.number}
              className="shrink-0 snap-center overflow-hidden rounded-xl"
              style={{ width: "72vw", aspectRatio: "3 / 4" }}
            >
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="72vw"
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
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
      id="beyond"
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
