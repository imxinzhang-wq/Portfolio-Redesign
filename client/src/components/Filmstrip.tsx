import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import film01 from "@assets/film-01.jpg";
import film02 from "@assets/film-02.jpg";
import film03 from "@assets/film-03.jpg";
import film04 from "@assets/film-04.jpg";
import film05 from "@assets/film-05.jpg";
import film06 from "@assets/film-06.jpg";
import film07 from "@assets/film-07.jpg";
import film08 from "@assets/film-08.jpg";
import film09 from "@assets/film-09.jpg";
import film10 from "@assets/film-10.jpg";

/*
  The strip runs left as the page scrolls down. Frames share one height and take
  whatever width their aspect ratio asks for, so the top and bottom edges stay
  flush across a mix of landscape and portrait shots — the way a contact sheet
  reads. The ratios below are declared rather than measured so the track has its
  full width on the first frame; waiting for the images to load would let the
  measured scroll distance jump under the reader.

  Verticals are grouped in pairs on purpose. Alternating them one by one makes
  the row read as noise.
*/
const FRAMES = [
  { src: film01, ratio: 3 / 2 },
  { src: film02, ratio: 3 / 2 },
  { src: film03, ratio: 2 / 3 },
  { src: film04, ratio: 3 / 2 },
  { src: film05, ratio: 2 / 3 },
  { src: film06, ratio: 2 / 3 },
  { src: film07, ratio: 3 / 2 },
  { src: film08, ratio: 3 / 2 },
  { src: film09, ratio: 2 / 3 },
  { src: film10, ratio: 3 / 2 },
];

/*
  How much page scroll one pixel of travel costs. At 1 the strip tracks the
  wheel exactly, which for ten frames means an uncomfortably long pin; 0.8 keeps
  the motion legible while cutting the section down to a reasonable height.
*/
const PACE = 0.8;

const FRAME_HEIGHT = "55vh";
const GAP_PX = 24;

function Sprockets({ className }: { className: string }) {
  /*
    Purely decorative, and sized in the same units as the gap so the perforation
    rhythm holds at any viewport width.
  */
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-6 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, transparent 0 14px, rgba(255,255,255,0.14) 14px 30px)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    />
  );
}

function Frames({ sizes }: { sizes: string }) {
  return (
    <>
      {FRAMES.map((frame, i) => (
        <img
          key={frame.src}
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
        <div className="relative">
          <Sprockets className="top-0" />
          <div
            ref={viewportRef}
            className="flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-6 py-8"
            style={{ height: `calc(${FRAME_HEIGHT} + 4rem)` }}
          >
            <div
              ref={trackRef}
              className="flex h-full items-center gap-6 [&>img]:snap-center"
              style={{ gap: GAP_PX }}
            >
              <Frames sizes="80vw" />
            </div>
          </div>
          <Sprockets className="bottom-0" />
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
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={viewportRef}
          className="relative flex h-full items-center"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <motion.div
            ref={trackRef}
            style={{ x, height: FRAME_HEIGHT, gap: GAP_PX }}
            className="flex shrink-0 items-center will-change-transform"
          >
            <Frames sizes="(min-width: 768px) 60vw, 90vw" />
          </motion.div>
        </div>

        {/* Perforation runs the height of the pinned frame, not the track, so it
            reads as the projector gate rather than as part of the strip. */}
        <Sprockets className="top-[calc(50%-55vh/2-2.25rem)]" />
        <Sprockets className="top-[calc(50%+55vh/2+0.75rem)]" />
      </div>
    </section>
  );
}
