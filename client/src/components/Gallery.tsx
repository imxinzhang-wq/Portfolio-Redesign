import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import film01 from "@assets/film-01.jpg";
import film02 from "@assets/film-02.jpg";
import film03 from "@assets/film-03.jpg";

const PHOTOS = [
  { src: film01, ratio: 2063 / 1400 },
  { src: film02, ratio: 2063 / 1400 },
  { src: film03, ratio: 950 / 1400 },
];

/*
  Every plate carries one number that stands for how near it is, and that number
  drives its size, how fast it drifts past on scroll, and how far it swings under
  the pointer. Tying all three to a single value is what sells the space: a plate
  that is large, quick and responsive reads as close, and separating any of those
  from the others would read as three unrelated animations sharing a screen.

  Positions are percentages of a stage one viewport tall, not of the section, so
  the whole arrangement is on screen at once when the section passes the middle
  — the section's extra height is scroll room for the drift, not more canvas to
  spread across. Plates are allowed to run off the top and bottom edges: a
  scatter that fits neatly inside its frame looks composed rather than glimpsed.
*/
const PLATES = [
  { photo: 2, left: "3%", top: "8%", width: "22vw", depth: 0.85 },
  { photo: 0, left: "30%", top: "-6%", width: "16vw", depth: 0.4 },
  { photo: 1, left: "58%", top: "2%", width: "19vw", depth: 0.6 },
  { photo: 2, left: "80%", top: "14%", width: "17vw", depth: 0.35 },
  { photo: 1, left: "17%", top: "56%", width: "15vw", depth: 0.5 },
  { photo: 0, left: "68%", top: "50%", width: "21vw", depth: 0.9 },
  { photo: 0, left: "-4%", top: "78%", width: "19vw", depth: 0.75 },
  { photo: 2, left: "33%", top: "68%", width: "24vw", depth: 1 },
  { photo: 1, left: "62%", top: "76%", width: "18vw", depth: 0.65 },
];

// Pixels a plate at depth 1 drifts across the section's full pass through the
// viewport, and how far it leans toward the pointer.
const DRIFT = 140;
const SWAY = 26;

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
        className="w-full rounded-3xl object-cover shadow-2xl shadow-black/30"
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
              className="w-full rounded-3xl object-cover"
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
      className="relative h-[180vh] overflow-hidden"
    >
      {/* The stage the plates are arranged on: one viewport tall, centred in the
          section, so the composition reads whole as it goes by. */}
      <div className="absolute inset-x-0 top-1/2 h-screen -translate-y-1/2">
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

        {/* The copy is the still point the plates drift past, so it holds the
            middle of the stage and does not move at all. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[5] -translate-y-1/2 px-6">
          <div className="mx-auto max-w-sm text-center">
            <h2 className="font-display text-4xl font-medium tracking-tight text-white">
              Project name
            </h2>
            <p className="mt-5 text-base leading-[1.7] text-white/60">
              Description Description Description Description Description
              Description Description Description
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
