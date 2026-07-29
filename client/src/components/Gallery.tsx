import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import film01 from "@assets/film-01.jpg";
import film02 from "@assets/film-02.jpg";
import film03 from "@assets/film-03.jpg";
import film04 from "@assets/film-04.jpg";
import film05 from "@assets/film-05.jpg";
import film06 from "@assets/film-06.jpg";
import film07 from "@assets/film-07.jpg";
import film09 from "@assets/film-09.jpg";
import film10 from "@assets/film-10.jpg";

// Every photograph is cropped to 4:3 or 3:4, so a plate's shape is one of two
// and the rows keep a rhythm instead of taking whatever the camera gave.
const LANDSCAPE = 4 / 3;
const PORTRAIT = 3 / 4;

/*
  film-08 is cropped and in the repository but unplaced: the layout runs three
  rows of three, and ten photographs do not divide into that. Swap it into any
  slot below to trade it for the one there.
*/
const PHOTOS = [
  { src: film01, ratio: LANDSCAPE },
  { src: film02, ratio: LANDSCAPE },
  { src: film03, ratio: PORTRAIT },
  { src: film04, ratio: PORTRAIT },
  { src: film05, ratio: LANDSCAPE },
  { src: film06, ratio: PORTRAIT },
  { src: film07, ratio: PORTRAIT },
  { src: film09, ratio: PORTRAIT },
  { src: film10, ratio: PORTRAIT },
];

/*
  Every plate carries one number that stands for how near it is, and that number
  drives its size, how fast it drifts past on scroll, and how far it swings under
  the pointer. Tying all three to a single value is what sells the space: a plate
  that is large, quick and responsive reads as close, and separating any of those
  from the others would read as three unrelated animations sharing a screen.

  The plates sit in three rows of large, medium and small, and the three sizes
  change places from row to row so the column edges never line up. Everything
  stays inside a 6% margin on both sides, and rows are spaced far enough apart
  that the drift cannot close the gap: two plates separate by at most DRIFT
  times the difference in their depths, which is 196px at the widest pairing
  here, against gaps of 500px and up.

  Positions are percentages of the stage, which is four viewports tall — the
  scatter is never all in view, so seeing it takes a few screens, and the
  emptiness between rows is the point rather than a gap to fill.
*/
const PLATES = [
  // Row one: large, small, medium.
  { photo: 0, left: "6%", top: "5%", width: "33.4vw", depth: 0.95 },
  { photo: 6, left: "43.8%", top: "9%", width: "19.4vw", depth: 0.3 },
  { photo: 2, left: "67.6%", top: "6.5%", width: "26.4vw", depth: 0.65 },

  // Row two: medium, large, small.
  { photo: 4, left: "6%", top: "39%", width: "26.4vw", depth: 0.6 },
  { photo: 5, left: "36.8%", top: "37%", width: "33.4vw", depth: 1 },
  { photo: 7, left: "74.6%", top: "41%", width: "19.4vw", depth: 0.25 },

  // Row three: small, medium, large.
  { photo: 8, left: "6%", top: "72%", width: "19.4vw", depth: 0.35 },
  { photo: 1, left: "29.8%", top: "69%", width: "26.4vw", depth: 0.7 },
  { photo: 3, left: "60.6%", top: "70.5%", width: "33.4vw", depth: 0.9 },
];

const STAGE_HEIGHT = "360vh";

/*
  Blank space ahead of the stage, one viewport deep. The copy pins as the
  section arrives and the plates only start at the far side of this gap, so the
  reader gets the copy alone, held still, before the scatter climbs into view.
*/
const LEAD = "100vh";

// Lead plus stage, plus room at the end for the last plates to clear.
const SECTION_HEIGHT = "500vh";

// Pixels a plate at depth 1 drifts across the section's full pass through the
// viewport, and how far it leans toward the pointer. The drift is large on
// purpose: at a smaller figure the near and far plates travel at rates too
// close together to read as depth rather than as drift for its own sake.
const DRIFT = 280;
const SWAY = 30;

function Plate({
  plate,
  progress,
  pointerX,
  pointerY,
  still,
}: {
  plate: (typeof PLATES)[number];
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  still: boolean;
}) {
  const photo = PHOTOS[plate.photo];
  const drift = plate.depth * DRIFT;

  // Scroll and pointer both move the plate vertically, so they are summed into
  // one value rather than fighting over the transform.
  const y = useTransform(
    [progress, pointerY] as [MotionValue<number>, MotionValue<number>],
    ([p, pointer]: number[]) =>
      drift - p * drift * 2 + pointer * plate.depth * SWAY * 0.6,
  );
  const x = useTransform(pointerX, (v) => v * plate.depth * SWAY);

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
        className="w-full rounded-[6px] object-cover shadow-xl shadow-black/25"
        style={{ aspectRatio: String(photo.ratio) }}
      />
    </motion.div>
  );
}

export default function Gallery({ bgColor }: { bgColor: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [still, setStill] = useState(true);

  /*
    A spring rather than the raw pointer position: the plates should settle
    toward the cursor, not snap to it. Both values run -1 to 1 from the centre
    of the viewport.
  */
  const pointerX = useSpring(0, { stiffness: 60, damping: 20, mass: 0.6 });
  const pointerY = useSpring(0, { stiffness: 60, damping: 20, mass: 0.6 });

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
    The copy fades up as the section arrives and lets go once the last plates
    are through, so it does not sit over the start of the section that follows.
    Both edges are inside the range where it is pinned, so it never appears to
    slide away.
  */
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.82, 0.93],
    [0, 1, 1, 0],
  );

  /*
    The narrow layout drops the scatter entirely. Absolute placement tuned for a
    wide viewport collapses into a pile on a phone, and parallax that depends on
    a pointer has nothing to depend on.

    It also shows each photograph once rather than walking the plates. Repeats
    are there to fill a scatter; stacked in a column they are just the same
    picture again.
  */
  if (still) {
    return (
      <section
        ref={sectionRef}
        data-bg-color={bgColor}
        className="relative px-6 py-24"
      >
        <div className="mx-auto max-w-md space-y-10">
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white">
              Project name
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-white/60">
              Description Description Description Description Description
              Description Description Description
            </p>
          </div>
          {PHOTOS.map((photo, i) => (
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
      /*
        overflow-clip, not overflow-hidden. Both trim the plates at the edges,
        but hidden makes this a scroll container, and a scroll container is
        exactly what stops the copy below from sticking to the viewport.
      */
      className="relative overflow-clip"
      style={{ height: SECTION_HEIGHT }}
    >
      {/*
        The copy pins itself for the length of the section: it arrives with the
        section, settles in the middle of the screen, and holds there while the
        plates climb past it. Above the plates so it stays readable whatever
        drifts behind.
      */}
      <motion.div
        style={{ opacity: copyOpacity }}
        className="pointer-events-none sticky top-0 z-20 flex h-screen items-center justify-center px-6"
      >
        {/* The shadow is invisible against the background and only does any
            work when a bright plate happens to be passing behind the copy. */}
        <div className="max-w-sm text-center [text-shadow:0_2px_28px_rgba(0,0,0,0.9)]">
          <h2 className="font-display text-4xl font-medium tracking-tight text-white">
            Project name
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-white/70">
            Description Description Description Description Description
            Description Description Description
          </p>
        </div>
      </motion.div>

      {/* The stage begins a full viewport in, so the first screen of the
          section is the copy on its own. */}
      <div
        className="absolute inset-x-0"
        style={{ top: LEAD, height: STAGE_HEIGHT }}
      >
        {PLATES.map((plate, i) => (
          <Plate
            key={i}
            plate={plate}
            progress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            still={still}
          />
        ))}
      </div>
    </section>
  );
}
