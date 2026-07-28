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
  With only three photographs to work with, the strip repeats them. The order is
  written out rather than generated: a plain 1-2-3 cycle puts the same photo at
  the same phase of every repeat, which the eye picks up as a loop within a few
  seconds. Varying the interval between a photo's appearances hides the seam,
  and it keeps the portrait frames from landing at an even spacing of their own.
*/
const ORDER = [0, 2, 1, 0, 1, 2, 0, 2, 1, 2, 0, 1];

const FRAMES = ORDER.map((i) => PHOTOS[i]);

/*
  How much page scroll one pixel of travel costs. At 1 the strip tracks the
  wheel exactly, which for ten frames means an uncomfortably long pin; 0.8 keeps
  the motion legible while cutting the section down to a reasonable height.
*/
const PACE = 0.8;

const FRAME_HEIGHT = "55vh";
const GAP_PX = 24;

// Fade applied to both ends of the strip and its perforations, so frames leave
// the screen rather than being clipped by it.
const EDGE_FADE =
  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)";

function Sprockets() {
  /*
    Perforations, at 35mm proportions: a hole roughly twice as wide as the gap
    beside it, on a band shallower than the hole is wide. Drawn with a repeating
    gradient rather than elements because there are a hundred of them and none
    of them mean anything — the whole band is decorative.
  */
  return (
    <div
      aria-hidden
      className="pointer-events-none h-[9px] shrink-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(255,255,255,0.16) 0 13px, transparent 13px 22px)",
        maskImage: EDGE_FADE,
        WebkitMaskImage: EDGE_FADE,
      }}
    />
  );
}

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
        <div className="flex flex-col gap-2">
          <Sprockets />
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
          <Sprockets />
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
      {/*
        A column, so the perforations sit against the frames by layout rather
        than by offsets computed from the frame height — the two stay in step
        when that height changes.
      */}
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-2 overflow-hidden">
        <Sprockets />
        <div
          ref={viewportRef}
          className="relative"
          style={{
            height: FRAME_HEIGHT,
            maskImage: EDGE_FADE,
            WebkitMaskImage: EDGE_FADE,
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x, gap: GAP_PX }}
            className="flex h-full w-max items-center will-change-transform"
          >
            <Frames sizes="(min-width: 768px) 60vw, 90vw" />
          </motion.div>
        </div>
        <Sprockets />
      </div>
    </section>
  );
}
