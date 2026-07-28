import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import film01 from "@assets/film-01.jpg";
import film02 from "@assets/film-02.jpg";
import film03 from "@assets/film-03.jpg";

/*
  The strip runs left as the page scrolls down. Frames share one height and take
  whatever width their aspect ratio asks for, so the top and bottom edges stay
  flush across a mix of landscape and portrait shots — the way a contact sheet
  reads. The ratios are declared rather than measured so the track has its full
  width on the first frame; waiting for the images to load would let the
  measured scroll distance jump under the reader.
*/
const PHOTOS = [
  { src: film01, ratio: 2063 / 1400 },
  { src: film02, ratio: 2063 / 1400 },
  { src: film03, ratio: 950 / 1400 },
];

/*
  Three photographs across seven frames. Roughly three frames are on screen at
  once, so no photograph may repeat inside a window of three — seeing the same
  shot twice in one glance is far more obvious than any rhythm spread over the
  length of the strip. At this count that constraint has exactly one solution,
  the plain cycle below, and its regularity is the price of never showing a
  duplicate. More photographs would buy back the freedom to vary the interval.

  It also lands the portrait frames at 2 and 5, which breaks up the landscapes
  evenly.
*/
const ORDER = [0, 1, 2, 0, 1, 2, 0];

const FRAMES = ORDER.map((i) => PHOTOS[i]);

/*
  How much page scroll one pixel of travel costs. At 1 the strip tracks the
  wheel exactly; above that it lags behind, which is what gives the transport
  its unhurried feel — at the cost of a taller section.
*/
const PACE = 1.4;

const FRAME_HEIGHT = "55vh";
const GAP_PX = 24;

function Frames({ sizes }: { sizes: string }) {
  return (
    <>
      {FRAMES.map((frame, i) => (
        <img
          // Index, not src: the same photograph appears at several positions.
          key={i}
          src={frame.src}
          alt=""
          aria-hidden
          loading={i < 3 ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          className="h-full w-auto shrink-0 object-cover"
          style={{ aspectRatio: String(frame.ratio) }}
        />
      ))}
    </>
  );
}

export default function Filmstrip({ bgColor }: { bgColor: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /*
    `pinned` starts false so the server-shaped first paint is the plain
    scrollable row. Turning it on only after the measurement lands means the
    section never renders at a height that assumes travel it hasn't confirmed.
  */
  const [pinned, setPinned] = useState(false);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    const coarse = window.matchMedia("(max-width: 767px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;

      // Pinning hijacks the scroll for the length of the section, which is a bad
      // trade on a phone and an unwanted one for readers who asked for less
      // motion. Both fall back to a row they can swipe at their own pace.
      if (coarse.matches || still.matches || !track || !viewport) {
        setPinned(false);
        setTravel(0);
        return;
      }

      setTravel(Math.max(0, track.scrollWidth - viewport.clientWidth));
      setPinned(true);
    };

    measure();

    // The track's width changes with the viewport (frames are sized in vh), so
    // observing it catches breakpoint changes and zoom alike.
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    coarse.addEventListener("change", measure);
    still.addEventListener("change", measure);

    return () => {
      observer.disconnect();
      coarse.removeEventListener("change", measure);
      still.removeEventListener("change", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Linear on purpose: a film transport runs at a constant rate, and easing the
  // ends would read as the strip slipping.
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  if (!pinned) {
    return (
      <section
        ref={sectionRef}
        data-bg-color={bgColor}
        className="relative py-24 md:py-32"
      >
        <div
          ref={viewportRef}
          className="snap-x snap-mandatory overflow-x-auto"
          style={{ height: FRAME_HEIGHT }}
        >
          <div
            ref={trackRef}
            className="flex h-full items-center px-6 [&>img]:snap-center"
            style={{ gap: GAP_PX }}
          >
            <Frames sizes="80vw" />
          </div>
        </div>
      </section>
    );
  }

  return (
    /*
      Height is the pin (one viewport) plus the scroll the travel costs. The
      section paints no background of its own — the page wrapper owns the colour
      swap, and a background here would slide up the screen as a hard edge.
    */
    <section
      ref={sectionRef}
      data-bg-color={bgColor}
      className="relative"
      style={{ height: `calc(100vh + ${travel * PACE}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div ref={viewportRef} className="relative" style={{ height: FRAME_HEIGHT }}>
          <motion.div
            ref={trackRef}
            style={{ x, gap: GAP_PX }}
            className="flex h-full w-max items-center will-change-transform"
          >
            <Frames sizes="(min-width: 768px) 60vw, 90vw" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
