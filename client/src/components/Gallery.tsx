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
const LARGE = { width: "min(30vw, 48vh)", depth: 1 };
const MEDIUM = { width: "min(23vw, 37vh)", depth: 0.5 };
const SMALL = { width: "min(16vw, 26vh)", depth: 0.12 };

/*
  The gaps inside a group are uneven on purpose — 13vw then 6vw in the first,
  5 then 3 in the second, 4 then 5 in the third. Even gaps read as a row that
  has been spaced out; uneven ones read as three things that happen to be near
  each other. Each group still ends where it did, so the empty space keeps
  falling somewhere different from group to group.
*/
const PLATES = [
  // 03, 04, 06 — full measure, 6% to 94%.
  { photo: 0, left: "6%", top: "3%", ...LARGE },
  { photo: 1, left: "49%", top: "14%", ...SMALL },
  { photo: 2, left: "71%", top: "7%", ...MEDIUM },

  // 09, 07, 10 — stopping at 83% to leave the right open.
  { photo: 4, left: "6%", top: "40%", ...MEDIUM },
  { photo: 3, left: "34%", top: "42%", ...LARGE },
  { photo: 5, left: "67%", top: "36%", ...SMALL },

  /*
    13, 15, 14 — kept together at the end, starting at 16% to open the left.
    The large one sits at 74% rather than 70%: it follows directly below the
    large plate in the group above, and four points of the stage is the
    difference between the two reading as separate and as one tall column.
  */
  { photo: 6, left: "16%", top: "68%", ...SMALL },
  { photo: 8, left: "36%", top: "76%", ...MEDIUM },
  { photo: 7, left: "64%", top: "74%", ...LARGE },
];

const STAGE_HEIGHT = "260vh";

/*
  Blank space ahead of the stage. The copy pins as the section arrives and the
  plates only start at the far side of this gap, so the reader gets the copy
  alone, held still, before the scatter climbs into view. Half a viewport is
  enough because the drift pushes the plates a further DRIFT down at the start
  of the section, deepening the gap on its own.
*/
const LEAD = "50vh";

/*
  Lead plus stage plus enough tail for the last plates to clear, and no more.
  Anything beyond that is dead screen: the plates scroll with the page, so a
  longer section does not slow them down, it only adds black after the stage has
  gone by.
*/
const SECTION_HEIGHT = "320vh";

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
    A spring, so the plates settle into their offset rather than snapping to it,
    but a stiff and heavily damped one — it takes the edge off the cursor
    without the plates trailing behind it on a rubber band. Both values run -1
    to 1 from the centre of the viewport, and the plates read them negated.
  */
  const pointerX = useSpring(0, { stiffness: 220, damping: 40, mass: 0.3 });
  const pointerY = useSpring(0, { stiffness: 220, damping: 40, mass: 0.3 });

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
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white">
              Project name
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-white/60">
              Description Description Description Description Description
              Description Description Description
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3">
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
