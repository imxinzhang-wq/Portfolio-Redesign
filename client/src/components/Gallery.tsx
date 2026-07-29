import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
  Filenames keep the numbers the photographs were uploaded under, gaps and all,
  rather than being renumbered to run consecutively. Referring to one by the
  number it already has beats keeping a mapping in your head.
*/
import film03 from "@assets/film-03.jpg";
import film04 from "@assets/film-04.jpg";
import film06 from "@assets/film-06.jpg";
import film07 from "@assets/film-07.jpg";
import film09 from "@assets/film-09.jpg";
import film10 from "@assets/film-10.jpg";
import film13 from "@assets/film-13.jpg";
import film14 from "@assets/film-14.jpg";
import film15 from "@assets/film-15.jpg";

// Portraits only, every one cropped to exactly 3:4, so a plate's height follows
// from its width and the three sizes stay in proportion to each other.
const PORTRAIT = 3 / 4;

const PHOTOS = [
  { src: film03, ratio: PORTRAIT },
  { src: film04, ratio: PORTRAIT },
  { src: film06, ratio: PORTRAIT },
  { src: film07, ratio: PORTRAIT },
  { src: film09, ratio: PORTRAIT },
  { src: film10, ratio: PORTRAIT },
  { src: film13, ratio: PORTRAIT },
  { src: film14, ratio: PORTRAIT },
  { src: film15, ratio: PORTRAIT },
];

/*
  Every plate carries one number that stands for how near it is, and that number
  drives its size, how fast it drifts past on scroll, and how far it swings under
  the pointer. Tying all three to a single value is what sells the space: a plate
  that is large, quick and responsive reads as close, and separating any of those
  from the others would read as three unrelated animations sharing a screen.

  The plates come in threes of large, medium and small, but a three is a
  grouping, not a row: the tops inside each are staggered by up to a tenth of
  the stage, so nothing lines up on a baseline and the reader reads a scatter
  rather than a table. The sizes change places between groups so the columns
  never line up either, and the groups do not share a width — the first spans
  the full measure, the second stops short on the right, the third starts late
  on the left, putting the empty space somewhere different each time. Nothing
  crosses the 6% margin on either side.

  The tops below are the arrangement at rest, and rest is the middle of the
  section: every plate's drift passes through zero there, so this is exactly
  what the reader sees when a group is centred on screen. The groups are packed
  close on that reading. Away from the middle the depths pull them apart and
  they will run into each other, but by then they are near the top or bottom
  edge and on their way out of frame.

  Each of the three sizes is a fixed width and a fixed depth, below. Since depth
  is what sets the drift, two plates of the same size always travel at the same
  rate — groups differ in width through their gaps and starting offsets, never
  by resizing a plate, so nothing quietly breaks that.
*/
/*
  Each width is capped in vh as well as set in vw. A plate is 3:4, so its height
  comes from its width, which is in vw — while the vertical spacing between
  groups is a share of the stage, which is in vh. On a wide, short screen the
  first grows and the second does not, and plates that clear each other at
  1440x900 close right up. The vh term holds every plate's height to the same
  fraction of the screen whatever the aspect ratio, which is what the spacing
  was written against. The cost is a wider right margin on very wide screens,
  since the groups no longer reach their stated end.
*/
const LARGE = { width: "min(33vw, 53vh)", depth: 1 };
const MEDIUM = { width: "min(23vw, 37vh)", depth: 0.5 };
const SMALL = { width: "min(16vw, 26vh)", depth: 0.22 };

/*
  The gaps inside a group are uneven on purpose — 11vw then 5vw in the first,
  4 then 2 in the second, 4 then 6 in the third. Even gaps read as a row that
  has been spaced out; uneven ones read as three things that happen to be near
  each other.

  The three widths now sum to 72vw against a measure of 88, so the spare room a
  group has to be asymmetric with is thinner than it was. The first group still
  spans the full measure, the second still stops short on the right and the
  third still starts in from the left — by 10vw and 6vw rather than 11 and 10.
*/
const PLATES = [
  // 03, 04, 06 — full measure, 6% to 94%.
  { photo: 0, left: "6%", top: "3%", ...LARGE },
  { photo: 1, left: "50%", top: "14%", ...SMALL },
  { photo: 2, left: "71%", top: "7%", ...MEDIUM },

  // 09, 07, 10 — stopping at 84% to leave the right open.
  { photo: 4, left: "6%", top: "40%", ...MEDIUM },
  { photo: 3, left: "33%", top: "42%", ...LARGE },
  { photo: 5, left: "68%", top: "36%", ...SMALL },

  /*
    13, 15, 14 — kept together at the end, starting at 12% to open the left.
    The large one sits at 78%: it follows directly below the large plate in the
    group above, and that pair needs about a fifth of a screen between them to
    read as separate rather than as one tall column. Growing the large size ate
    into that — the gap fell to 0.13 screens at 74% — so the plate moves down to
    win it back.
  */
  { photo: 6, left: "12%", top: "68%", ...SMALL },
  { photo: 8, left: "32%", top: "73%", ...MEDIUM },
  { photo: 7, left: "61%", top: "78%", ...LARGE },
];

const STAGE_HEIGHT = "260vh";

/*
  Blank space ahead of the stage, now that there is no copy to hold it. The
  drift already pushes every plate a further DRIFT down at the start of the
  section, so the first group arrives late on its own and a small gap is enough
  to keep the section from opening flush against the one before it.
*/
const LEAD = "10vh";

/*
  Lead plus stage plus enough tail for the last plates to clear, and no more.
  Anything beyond that is dead screen: the plates scroll with the page, so a
  longer section does not slow them down, it only adds black after the stage has
  gone by.
*/
const SECTION_HEIGHT = "300vh";

/*
  Pixels a plate at depth 1 drifts across the section's full pass through the
  viewport, and how far it slides against the pointer. Depths run 0.12 to 1, so
  the widest pairing separates by 0.88 x DRIFT, a little over 600px — more than
  two thirds of a screen between the fastest and slowest plate.

  Depth is carried by movement alone. Blurring the far plates and turning the
  arrangement in perspective were both tried and both taken out: position and
  rate do the work, and the rest only decorates it.
*/
const DRIFT = 700;
const SWAY = 90;

/*
  The wordmark. Its depth sits above every plate's, so it climbs the screen
  faster than anything else and is the first thing to leave.

  WORDMARK_TOP is far enough above the first group that the type's top edge
  clears the photographs' from the moment it enters. Being quicker, it starts
  the section pushed further down than they are — by the difference in depth
  times DRIFT, 245px — so it has to be that much higher again at rest to come
  in overhead rather than from below.
*/
const WORDMARK = "Beyond Design";
const WORDMARK_DEPTH = 1.35;
const WORDMARK_TOP = "-14%";
const WORDMARK_END = 0.42;

/*
  The hold. Across this stretch of the section nothing moves: the stage is
  translated down by exactly as much as the page has scrolled, and every drift
  is frozen, so the arrangement sits still while the reader keeps scrolling and
  only the wordmark shrinks. Past it everything picks up together from where it
  stopped.

  It is placed to catch the wordmark just before it leaves the top of the
  screen, so the shrink happens while the type is still worth looking at.
*/
const HOLD = [0.24, 0.44] as const;

function Wordmark({
  motionProgress,
  progress,
  still,
}: {
  motionProgress: MotionValue<number>;
  progress: MotionValue<number>;
  still: boolean;
}) {
  const drift = WORDMARK_DEPTH * DRIFT;
  const y = useTransform(motionProgress, (p) => drift - p * drift * 2);
  // Scale runs off the raw progress, not the held one: the shrink is the whole
  // point of the hold, so it is the one thing that must keep moving through it.
  const scale = useTransform(progress, [...HOLD], [1, WORDMARK_END]);

  return (
    <motion.div
      aria-hidden
      /*
        Above the plates, which top out at z-index 10, so the photographs pass
        behind the letters rather than over them. Not selectable and not in the
        tab order: it is the section's title, but the section is a wall of
        pictures with nothing to read.
      */
      className="pointer-events-none absolute inset-x-0 z-[15] select-none text-center will-change-transform"
      style={{
        top: WORDMARK_TOP,
        // Scaling about the top keeps the letters anchored where they start
        // instead of sliding up out of position as they shrink.
        transformOrigin: "50% 0%",
        /*
          A scaling glyph is re-rasterised at every new size, and the hinting
          snaps its stems to a different pixel grid each time, which is what the
          shrink was shimmering with. The geometry was never the problem — the
          plates and the type both measure 0px of drift through the hold.

          will-change plus a translateZ hand the element its own compositing
          layer, so the GPU resamples one raster instead of the text being drawn
          again every frame. geometricPrecision turns off the hinting that does
          the snapping. The trade is that the type softens slightly at the top
          of the scale, where it is rendered above its rasterised size.
        */
        backfaceVisibility: "hidden",
        ...(still ? {} : { y, scale, z: 0 }),
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

function Plate({
  plate,
  motionProgress,
  pointerX,
  pointerY,
  still,
}: {
  plate: (typeof PLATES)[number];
  motionProgress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  still: boolean;
}) {
  const photo = PHOTOS[plate.photo];
  const drift = plate.depth * DRIFT;
  const progress = motionProgress;

  /*
    The pointer terms are negated: the plates move against the cursor, the way
    the near side of a scene slides the other way when you lean into it. Scroll
    and pointer both move the plate vertically, so they are summed into one
    value rather than fighting over the transform.
  */
  const y = useTransform(
    [progress, pointerY] as [MotionValue<number>, MotionValue<number>],
    ([p, pointer]: number[]) =>
      drift - p * drift * 2 - pointer * plate.depth * SWAY * 0.6,
  );
  const x = useTransform(pointerX, (v) => -v * plate.depth * SWAY);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: plate.left,
        top: plate.top,
        width: plate.width,
        // Nearer plates sit in front, which is also the order the sizes imply.
        zIndex: Math.round(plate.depth * 10),
        ...(still ? {} : { x, y }),
      }}
    >
      <img
        src={photo.src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="w-full rounded-[6px] object-cover"
        style={{ aspectRatio: String(photo.ratio) }}
      />
    </motion.div>
  );
}

export default function Gallery({ bgColor }: { bgColor: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [still, setStill] = useState(true);

  /*
    A spring, to take the jitter off the raw cursor and to give the plates a
    little weight without turning that into drag. Settle time is governed by the
    slower of the spring's two poles, and damping well past critical pulls that
    pole down and stretches the tail out — the plates keep creeping toward the
    cursor long after it has stopped. Damping just above critical keeps the
    approach smooth with no overshoot while holding the tail in.

    Measured on a flick across half the screen: 90% of the travel in 227ms, 99%
    in 411ms, no overshoot. For scale, 40/220/0.3 took 430ms and 849ms — clearly
    laggy — and 700/36/0.5 took 103ms and 178ms, which reads as the plates
    being welded to the cursor.

    Both values run -1 to 1 from the centre of the viewport, and the plates read
    them negated.
  */
  const pointerX = useSpring(0, { stiffness: 320, damping: 40, mass: 0.5 });
  const pointerY = useSpring(0, { stiffness: 320, damping: 40, mass: 0.5 });

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setStill(narrow.matches || reduced.matches);
    decide();
    narrow.addEventListener("change", decide);
    reduced.addEventListener("change", decide);

    const move = (e: MouseEvent) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      narrow.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
      window.removeEventListener("mousemove", move);
    };
  }, [pointerX, pointerY]);

  // Tracked across the section's whole pass through the viewport, so plates are
  // already in motion when the section arrives instead of starting from rest.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
    The scroll the section spans, in pixels — its own height plus a viewport,
    which is what the offset above measures across. The hold needs it in pixels
    to cancel the page scroll, and it is written in vh, so it has to be read
    back off the element.
  */
  const [span, setSpan] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      if (sectionRef.current)
        setSpan(sectionRef.current.offsetHeight + window.innerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /*
    Progress with the hold cut out of it and the remainder stretched back over
    the full range. Everything that travels reads this instead of the raw
    progress, so the whole arrangement freezes for the length of the hold and
    then resumes from exactly where it stopped.
  */
  const holdLength = HOLD[1] - HOLD[0];
  const motionProgress = useTransform(scrollYProgress, (p) => {
    const skipped = p <= HOLD[0] ? p : p >= HOLD[1] ? p - holdLength : HOLD[0];
    return skipped / (1 - holdLength);
  });

  /*
    Freezing the drift is only half of it: the plates also ride the page, so the
    stage is pushed down by however much of the hold has been scrolled through,
    which cancels that out. Past the hold the offset stays put and the stage
    travels with the page again.
  */
  const stageY = useTransform(
    scrollYProgress,
    (p) => Math.min(Math.max(p - HOLD[0], 0), holdLength) * span,
  );

  /*
    The narrow layout drops the scatter entirely. Absolute placement tuned for a
    wide viewport collapses into a pile on a phone, and parallax that depends on
    a pointer has nothing to depend on.

    Six photographs in a two-column grid, not all nine down a column. Two
    abreast gives each one a neighbour to be read against, which is the nearest
    a phone gets to the arrangement on a wide screen, and three rows is as far
    as this is worth scrolling.
  */
  if (still) {
    return (
      <section
        ref={sectionRef}
        data-bg-color={bgColor}
        className="relative px-6 py-24"
      >
        <div className="mx-auto max-w-md">
          {/* Static here: the wordmark's whole behaviour on the wide layout is
              motion, and there is none of that to inherit. */}
          <h2 className="font-display mb-10 text-center text-[13vw] font-medium leading-[0.9] tracking-[-0.04em] text-foreground">
            {WORDMARK}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {PHOTOS.slice(0, 6).map((photo, i) => (
              <img
                key={i}
                src={photo.src}
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="w-full rounded-[6px] object-cover"
                style={{ aspectRatio: String(photo.ratio) }}
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
      ref={sectionRef}
      data-bg-color={bgColor}
      // overflow-clip rather than overflow-hidden: it trims the plates at the
      // edges without making the section a scroll container.
      className="relative overflow-clip"
      style={{ height: SECTION_HEIGHT }}
    >
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: LEAD, height: STAGE_HEIGHT, y: stageY }}
      >
        <Wordmark
          motionProgress={motionProgress}
          progress={scrollYProgress}
          still={still}
        />

        {PLATES.map((plate, i) => (
          <Plate
            key={i}
            plate={plate}
            motionProgress={motionProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            still={still}
          />
        ))}
      </motion.div>
    </section>
  );
}
