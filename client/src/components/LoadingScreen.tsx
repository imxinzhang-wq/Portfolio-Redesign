import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/*
  Imported here rather than passed in from App: this list IS the loader's
  job, and splitting it across two files would leave the next person editing
  the hero with no reason to think the loader cared.
*/
import header1 from "@assets/header1.jpg";
import header2 from "@assets/header2.JPG";
import project1 from "@assets/collection.jpg";
import project2 from "@assets/Darmi_home.jpg";
import project3 from "@assets/Airbnb_Cover_1774813459702.jpg";

/*
  What the loader actually waits for: the two photographs set into the hero
  headline. They are the only images on the first screen, and at ~280kB each
  they resolve inside the floor below on anything but a bad connection.

  The project covers are deliberately NOT here. Darmi_home.jpg is 2.4MB and
  collection.jpg is 3.7MB — unlike the gallery's film photographs, which are
  served as ~150kB webp variants, those two ship at full size. Blocking on
  the first of them measured ~4.8s on a 10Mbps line, i.e. the ceiling, every
  time. Compress them and they can move up here.
*/
const BLOCKING_ASSETS = [header1, header2];

/*
  Fetched but never waited on, and only once the blocking set is done —
  starting everything at once just makes the hero pair share the pipe with
  ~6MB it doesn't need to wait for. Ordered by how soon the visitor scrolls
  past them, so the first project card is usually warm by the time it
  appears.
*/
const WARM_ASSETS = [project2, project1, project3];

const WORDMARK = "Xin Zhang";

/*
  The floor exists so a warm cache doesn't produce a 100ms flash of a screen
  nobody can read — it is set just past the point where the last letter has
  settled, so the animation always completes.

  The ceiling exists so a slow connection can't hold the site hostage: at 4s
  we reveal the page regardless and let the remaining images arrive in place.
  Measured against the production build, the loader lands on its floor from
  50Mbps down to about 3Mbps — the ceiling is there for the cases below that.
*/
const MIN_MS = 1200;
const MAX_MS = 4000;

/* Per-letter delay, and the delay before the first letter moves. */
const STAGGER_MS = 55;
const LEAD_MS = 120;

function preload(src: string, priority: "high" | "low" = "high") {
  return new Promise<void>((resolve) => {
    const img = new Image();
    /*
      The page mounts underneath the loader and immediately requests every
      image on it — a dozen gallery photographs among them. Marking what the
      loader is waiting on as `high` keeps it from queueing behind traffic
      for content that is several screens away.
    */
    img.fetchPriority = priority;
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

    const assets = Promise.all(BLOCKING_ASSETS.map((src) => preload(src))).then(
      () => {
        WARM_ASSETS.forEach((src) => preload(src, "low"));
      },
    );

    /*
      The webfonts are part of the wait too: revealing the page before Outfit
      and Manrope resolve swaps the entire headline a beat after it appears.
      `document.fonts` is universal in the browsers this site targets; the
      optional chain keeps a headless/older runtime from stalling here.
    */
    const fonts = document.fonts?.ready ?? Promise.resolve();

    Promise.all([assets, fonts]).then(finish);

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
          */
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          role="status"
          aria-live="polite"
          data-testid="loading-screen"
        >
          {/*
            Deliberately identical to the navbar wordmark — same face, size,
            weight and tracking, down to the class list. It is the same mark
            arriving early, so the reveal reads as it settling into the
            corner rather than as two different pieces of type.

            Nothing accompanies it. The wait is short enough that a progress
            indicator would only be drawing attention to a wait nobody had
            started minding.

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
