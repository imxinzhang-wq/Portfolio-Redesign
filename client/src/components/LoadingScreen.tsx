import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { GALLERY_PHOTOS } from "@/components/Gallery";

import heroZurich from "@assets/hero-zurich.jpg";
import heroSanFrancisco from "@assets/hero-san-francisco.jpg";
import heroHello from "@assets/hero-hello.mp4";
import collectionsCover from "@assets/collections-cover.webp";
import darmiCover from "@assets/darmi-cover.webp";
import airbnbCover from "@assets/airbnb-cover.jpg";

/*
  Every image the home page will paint, from the headline down to the last
  gallery frame. The loader holds the page until all of it is decoded, so a
  visitor never watches a photograph arrive — which is the whole point of a
  portfolio whose content IS the photographs.

  Affordable only because of what came before it: the covers are WebP and the
  gallery ships ~150kB variants, so the entire home page is now lighter than
  two of the original cover JPEGs were.
*/
const HOME_IMAGES = [
  heroZurich,
  heroSanFrancisco,
  darmiCover,
  collectionsCover,
  airbnbCover,
];

/*
  The clip set into the headline. Not an <img>, so it cannot go through the
  decoder path below — fetching it is enough, since that puts it in the HTTP
  cache for the <video> that mounts underneath.
*/
const HOME_VIDEO = heroHello;

/*
  Case-study assets, warmed after the curtain lifts rather than before it.

  Ordered by how soon a visitor could reach them: Darmi is the first card,
  Collections the second, Airbnb the third. Tagging is deliberately absent —
  its card is `hidden`, so nothing on the site links to it and warming it
  would be spending a visitor's bandwidth on a page they cannot navigate to.

  Globbed rather than listed because the rename gave every asset a scope
  prefix; `darmi-*` IS the set of Darmi's assets now, and a new one dropped
  into the folder joins the prefetch without anyone remembering to add it.
*/
const CASE_STUDY_PREFIXES = ["darmi-", "collections-", "airbnb-"];

const ALL_ASSETS = import.meta.glob<string>(
  "../../../attached_assets/*.{jpg,jpeg,png,webp,mp4,webm}",
  { eager: true, query: "?url", import: "default" },
);

const WORDMARK = "Xin Zhang";

/*
  The floor exists so a warm cache doesn't produce a flash of a screen nobody
  can read — it is set just past the point where the last letter has settled,
  so the entrance always completes.

  The ceiling is the honest limit on how long a logo may sit on screen before
  it stops reading as loading and starts reading as broken. The page is
  revealed at that point regardless, with whatever has not arrived still on
  its way.
*/
const MIN_MS = 1200;
const MAX_MS = 6000;

/* Per-letter delay in, per-letter delay out, and the lead before the first. */
const STAGGER_MS = 55;
const EXIT_STAGGER_MS = 40;
const LEAD_MS = 120;

/* When the backdrop starts fading: once the last letter is on its way out. */
const BACKDROP_EXIT_DELAY = (WORDMARK.length * EXIT_STAGGER_MS + 180) / 1000;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.fetchPriority = "high";
    // Resolve on error too. A missing or blocked asset is a reason to show
    // the page, not a reason to sit on the loader until the ceiling.
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    // Already in the memory cache: some browsers fire neither handler for a
    // complete image assigned in the same tick.
    if (img.complete) resolve();
  });
}

/*
  The gallery's photographs are responsive, so the loader has to ask for them
  the same way the gallery does — same srcSet, same `sizes` — or the browser
  picks a different variant here than it will there and every photograph is
  downloaded twice. `sizes` must be assigned before `srcset`: the selection is
  made when srcset is set, and it reads whatever sizes says at that moment.
*/
function preloadResponsive(srcSet: string, sizes: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.sizes = sizes;
    img.srcset = srcSet;
    if (img.complete) resolve();
  });
}

function preloadVideo(src: string) {
  return fetch(src)
    .then((res) => res.arrayBuffer())
    .then(() => undefined)
    .catch(() => undefined);
}

/*
  Warm the case studies in the background. `rel="prefetch"` rather than a
  fetch loop on purpose: it is the one request kind the browser is allowed to
  schedule at its own pace and drop entirely under pressure, which is exactly
  the standing this traffic should have — it is speculative, and it must never
  slow down a visitor who is reading the page it is loading behind.
*/
function prefetchCaseStudies() {
  // Only the format this browser will actually play; fetching both would
  // double the cost of every clip for no gain.
  const canPlayMp4 = document
    .createElement("video")
    .canPlayType("video/mp4; codecs=avc1.42E01E");
  const wanted = canPlayMp4 ? ".webm" : ".mp4";

  // The covers carry a case-study prefix but the home page has already
  // loaded them; prefetching those would be three links asking for what is
  // sitting in the cache.
  const alreadyLoaded = new Set(HOME_IMAGES);

  const urls = CASE_STUDY_PREFIXES.flatMap((prefix) =>
    Object.entries(ALL_ASSETS)
      .filter(([path]) => path.split("/").pop()?.startsWith(prefix))
      .filter(([path]) => !path.endsWith(wanted))
      .map(([, url]) => url)
      .filter((url) => !alreadyLoaded.has(url)),
  );

  for (const url of urls) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  }
}

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const started = Date.now();

    const finish = () => {
      if (cancelled) return;
      // Hold for whatever is left of the floor, so the wordmark is never cut
      // off mid-stagger on a fast load.
      const remaining = Math.max(0, MIN_MS - (Date.now() - started));
      window.setTimeout(() => {
        if (!cancelled) setDone(true);
      }, remaining);
    };

    const images = HOME_IMAGES.map(preloadImage);
    const gallery = GALLERY_PHOTOS.map((photo) =>
      preloadResponsive(photo.srcSet, `calc(80vh * ${photo.ratio.toFixed(4)})`),
    );

    /*
      The webfonts are part of the wait too: revealing the page before Outfit
      and Manrope resolve swaps the entire headline a beat after it appears.
      `document.fonts` is universal in the browsers this site targets; the
      optional chain keeps a headless/older runtime from stalling here.
    */
    const fonts = document.fonts?.ready ?? Promise.resolve();

    Promise.all([...images, ...gallery, preloadVideo(HOME_VIDEO), fonts]).then(
      finish,
    );

    // The ceiling. Not cleared by `finish` — `cancelled` and the `done`
    // state both make a late fire a no-op.
    const ceiling = window.setTimeout(() => {
      if (!cancelled) setDone(true);
    }, MAX_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(ceiling);
    };
  }, []);

  /*
    Freeze the page underneath. Without this the loader is a lid on a
    document that can still be scrolled and tabbed through, and a visitor who
    flicks the wheel during the wait is dropped into the middle of the page
    the moment it clears. Also pins us to the top: a reload preserves scroll
    position, which would otherwise reveal the page mid-way down.
  */
  useEffect(() => {
    if (done) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  /*
    Start warming the case studies once the home page is the visitor's, not
    at the same moment — the point of holding the curtain was to give the
    home page an uncontended connection, and prefetching into that would give
    it back.
  */
  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(prefetchCaseStudies, 1000);
    return () => window.clearTimeout(timer);
  }, [done]);

  const letters = Array.from(WORDMARK);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          /*
            Same cream as the top of the page and as the bar the wordmark is
            about to live in, so the reveal reads as the loader dissolving
            rather than as one screen replacing another. Above the navbar's
            z-50 and the cursor.

            The backdrop waits for the letters before it goes: the wordmark
            leaves the screen, and only then does the screen itself leave.
          */
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: reduceMotion ? 0 : BACKDROP_EXIT_DELAY,
            ease: [0.23, 1, 0.32, 1],
          }}
          role="status"
          aria-live="polite"
          data-testid="loading-screen"
        >
          {/*
            Deliberately identical to the navbar wordmark — same face, size,
            weight and tracking, down to the class list. It is the same mark
            arriving early, so the reveal reads as it settling into the
            corner rather than as two different pieces of type.

            aria-label on the row plus aria-hidden on the pieces: split text
            reads out letter by letter otherwise.
          */}
          <div
            className="flex text-xl font-display font-bold tracking-tighter uppercase text-foreground"
            aria-label={WORDMARK}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                aria-hidden="true"
                // A space has no glyph to animate; give it width and let it
                // be. Sized against the tight tracking the navbar uses.
                className={letter === " " ? "w-[0.26em]" : ""}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: "0.5em" }
                }
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                /*
                  Out through the top, in the order they came in. They rose
                  into place from below and keep going, so the mark reads as
                  passing through the screen rather than reversing out of it,
                  and the stagger that introduced it is what dismisses it.

                  The transition rides inside each target rather than on a
                  shared `transition` prop, because the two cadences differ:
                  the exit is tighter, since a departure as slow as the
                  arrival would hold the page back from a reveal it has
                  already earned.
                */
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0.3 } }
                    : {
                        opacity: 0,
                        y: "-0.55em",
                        transition: {
                          duration: 0.45,
                          delay: (i * EXIT_STAGGER_MS) / 1000,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      }
                }
                transition={{
                  duration: 0.5,
                  delay: (LEAD_MS + i * STAGGER_MS) / 1000,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
