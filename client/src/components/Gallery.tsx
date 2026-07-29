import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
*/
/*
  Three sizes, and each one is a fixed width and a fixed depth. Since depth is
  what sets the drift, two plates of the same size always travel at the same
  rate — the groups differ in their widths through their gaps and starting
  offsets, never by resizing a plate, so nothing quietly breaks that.
*/
const LARGE = { width: "30vw", depth: 1 };
const MEDIUM = { width: "23vw", depth: 0.6 };
const SMALL = { width: "16vw", depth: 0.2 };

const PLATES = [
  // 03, 04, 06 — full measure, 6% to 94%, wide gaps.
  { photo: 0, left: "6%", top: "3%", ...LARGE },
  { photo: 1, left: "45.5%", top: "14%", ...SMALL },
  { photo: 2, left: "71%", top: "7%", ...MEDIUM },

  // 07, 09, 10 — tight gaps, stopping at 78% to open up the right.
  { photo: 3, left: "6%", top: "33%", ...MEDIUM },
  { photo: 4, left: "30.5%", top: "42%", ...LARGE },
  { photo: 5, left: "62%", top: "36%", ...SMALL },

  // 13, 14, 15 — kept together at the end, starting at 20% to open the left.
  { photo: 6, left: "20%", top: "68%", ...SMALL },
  { photo: 7, left: "38.5%", top: "76%", ...MEDIUM },
  { photo: 8, left: "64%", top: "70%", ...LARGE },
];

const STAGE_HEIGHT = "260vh";

/*
  Blank space ahead of the stage, one viewport deep. The copy pins as the
  section arrives and the plates only start at the far side of this gap, so the
  reader gets the copy alone, held still, before the scatter climbs into view.
*/
const LEAD = "100vh";

/*
  Lead plus stage plus enough tail for the last plates to clear, and no more.
  Anything beyond that is dead screen: the plates scroll with the page, so a
  longer section does not slow them down, it only adds black after the stage has
  gone by.
*/
const SECTION_HEIGHT = "360vh";

/*
  Pixels a plate at depth 1 drifts across the section's full pass through the
  viewport, and how far it leans toward the pointer. Depths run 0.15 to 1, so
  the widest pairing separates by 0.85 x DRIFT, or a little over 390px. Against
  the lengthened section that works out at much the same rate per pixel scrolled
  as before, with close to twice the separation.
*/
const DRIFT = 460;
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
