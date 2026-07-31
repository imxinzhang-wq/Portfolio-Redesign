import { Link } from "wouter";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useRef, useEffect, useState } from "react";

import Gallery, { getBeyondCenterScrollTop } from "@/components/Gallery";
import CustomCursor from "@/components/CustomCursor";

import project1 from "@assets/collection.jpg";
import project2 from "@assets/Darmi_home.jpg";
import project3 from "@assets/Airbnb_Cover_1774813459702.jpg";
import project4 from "@assets/tagging_cover_1775594426781.jpeg";
import header1 from "@assets/header1.jpg";
import header2 from "@assets/header2.JPG";
import header3 from "@assets/header3.mp4";
import header3Webm from "@assets/header3.webm";

/*
  Section background colours. These drive the scroll-linked background swap and
  are read back out of the DOM by both the wrapper and the navbar, so they live
  here as the single source of truth rather than as repeated hex literals.
  Mirrors --background and --ink-dark in index.css.
*/
const SECTION_BG = {
  canvas: "#f5f0e6",
  ink: "#1a1a1a",
  // Deeper than `ink`, for the projects section. Not pure #000: against the
  // rounded image frames a true black reads as a hole rather than a surface,
  // and it leaves nowhere to go for anything that needs to sit darker still.
  void: "#0a0a0a",
  mist: "#dde2e9",
  // Closing section — a warm grey, a step down from the canvas so the page
  // settles rather than returning to where it started.
  dust: "#e7e2dd",
} as const;

const MOCK_PROJECTS = [
  {
    id: 2,
    title: "Darmi IBS food diary",
    category: "2026 • Personal Project",
    description:
      "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
    image: project2,
  },
  {
    id: 1,
    title: "YouTube Shopping Collections",
    category: "2024 • YouTube",
    description:
      "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1,
  },
  {
    id: 4,
    title: "YouTube Shopping: Tagging in Description",
    category: "2024 • YouTube",
    description:
      "How we drove significant GMV growth by aligning monetization tools with creator muscle memory.",
    image: project4,
    hidden: true,
  },
  {
    id: 3,
    title: "Airbnb WeChat Mini-app",
    category: "2018 • Airbnb",
    description:
      "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
    image: project3,
  },
];

/*
  An element's position in document coordinates.

  offsetTop, not getBoundingClientRect: the project frames enter on a
  `y: 40 → 0` transform, and a rect measured mid-flight bakes that 40px into
  the answer — which is exactly how a correctly-centred frame can be made to
  look 40px off. Layout offsets ignore transforms, so they describe where the
  element is going to come to rest.
*/
function documentTop(el: HTMLElement) {
  let top = 0;
  for (
    let node: HTMLElement | null = el;
    node;
    node = node.offsetParent as HTMLElement | null
  ) {
    top += node.offsetTop;
  }
  return top;
}

const smoothScrollTo = (top: number) =>
  window.scrollTo({ top, behavior: "smooth" });

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && !hash.startsWith("#/")) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Scroll-triggered background color — scroll listener picks the last section
  // whose top edge is above the viewport midpoint, so it works correctly in
  // both scroll directions.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-bg-color]"));

    const handleScroll = () => {
      const sections = getSections();
      const midpoint = window.innerHeight * 0.5;
      let active = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= midpoint) active = section;
      }
      const color = active?.dataset.bgColor;
      if (color && wrapper) {
        wrapper.style.backgroundColor = color;
        // Keep html background in sync so the overscroll bounce shows the
        // section's colour rather than the page's default.
        document.documentElement.style.backgroundColor = color;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      /*
        Hand <html> back to the stylesheet on the way out. This override is the
        only thing painting the overscroll area, and leaving it behind meant a
        case study opened showing whichever section colour Home had reached —
        the gallery's blue-grey, most visibly.
      */
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen relative text-foreground selection:bg-accent selection:text-accent-foreground font-sans cursor-none"
      style={{
        backgroundColor: SECTION_BG.canvas,
        transition: "background-color 0.6s ease",
      }}
    >
      <CustomCursor />
      <Navbar />
      {/*
        No z-index here on purpose. z-index would make <main> a stacking
        context, which would cut the Projects wordmark's difference blend off
        from the wrapper's animated background colour and leave it rendering
        flat white. Layering inside main is handled by DOM order.
      */}
      <main className="relative">
        <Hero />
        <ProjectGrid />
        <Gallery bgColor={SECTION_BG.mist} />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
    Scroll a section into view. Everything lands 100px below the viewport top
    except WORK, BEYOND DESIGN and CONTACT, which each need something other
    than their section's top edge to land somewhere worth looking at.

    WORK: on wide screens the projects are a pinned pager, and the pin
    engages exactly at the pager wrapper's top edge — landing there shows the
    first project already composed. On narrow screens the pager does not
    render and the generic rule below is the right one.

    BEYOND DESIGN: the section's top edge is where the pinned track starts,
    before the title has scrolled in at all — the title only enters after
    TEXT_LEAD_VH of scroll, so landing there shows an empty screen. Gallery
    exports the scroll position where the title is actually centred.

    CONTACT: the footer pins its content to its own bottom edge rather than
    its top, so the usual "top minus 100" rule clips the address off the
    bottom of the screen instead of revealing it.
  */
  const scrollToSection = (id: string) => {
    if (id === "contact") {
      // The footer is the last thing on the page and pins its content to its
      // own bottom edge, so "the top of #contact minus 100" — everyone
      // else's rule — lands short of the actual bottom of the document and
      // clips it. The scrollable max is exact regardless of section height.
      smoothScrollTo(document.documentElement.scrollHeight - window.innerHeight);
      return;
    }
    if (id === "beyond") {
      const track = document.getElementById("beyond");
      const top = track && getBeyondCenterScrollTop(track);
      if (top != null) {
        smoothScrollTo(top);
        return;
      }
    }
    if (id === "work") {
      const pin = document.querySelector<HTMLElement>(
        "#work [data-projects-pin]",
      );
      // offsetParent is null when the pager is display:none (narrow screens),
      // where the generic top-minus-100 rule is the right landing anyway.
      if (pin && pin.offsetParent !== null) {
        smoothScrollTo(documentTop(pin));
        return;
      }
    }
    const el = document.getElementById(id);
    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 100);
  };

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (window.location.hash !== "#/") {
      window.location.hash = "#/";
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      {/*
        The bar inverts whatever it crosses instead of being told which
        sections are dark. `difference` against white gives near-black type on
        the cream sections and cream type on the near-black one, and it keeps
        working over the photographs — the old light/dark switch read only the
        section's declared colour, so type could still land on a bright frame.

        The blend sits on this fixed wrapper, not on the <nav> inside it:
        fixed positioning creates a stacking context, which would confine the
        blend to this element's own (transparent) contents and leave the type
        plain white.
      */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-8 py-6 pointer-events-none mix-blend-difference">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex items-center justify-between w-full py-5 text-white"
        >
          <button
            onClick={() => {
              setIsMenuOpen(false);
              smoothScrollTo(0);
            }}
            className="text-xl font-display font-bold tracking-tighter uppercase relative z-20"
            data-testid="link-home"
          >
            Xin Zhang
          </button>

          <button
            className="md:hidden relative z-20 p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>

          {/*
            Not `eyebrow` any more. That utility carries 11px, 0.25em tracking
            and uppercase as one bundle, and all three are now unwanted here —
            keeping the class and overriding each part would leave the next
            reader wondering which of them still applied.

            Full white rather than white/70. There is no hover state at all
            now — the cursor dot growing over interactive elements is the
            affordance, site-wide.

            `uppercase` sits on each button rather than on this row, because
            Tailwind's preflight sets text-transform:none on button and that
            beats inheriting it from a parent. tracking-tighter does inherit,
            so it stays here.
          */}
          <div className="hidden md:flex gap-10 font-display font-normal text-base tracking-tighter text-white">
            <button
              onClick={() => handleNavClick("work")}
              className="uppercase"
              data-testid="link-work"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick("beyond")}
              className="uppercase"
              data-testid="link-beyond"
            >
              Beyond Design
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="uppercase"
              data-testid="link-contact"
            >
              Contact
            </button>
          </div>
        </motion.nav>
      </div>

      {/*
        The mobile menu is a sibling of the blended bar rather than a child of
        it: it is an opaque card, and inverting it along with the type would
        turn it inside out.
      */}
      {isMenuOpen && (
        <div className="fixed top-24 left-0 right-0 z-50 px-8 md:hidden">
          <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <button
              onClick={() => handleNavClick("work")}
              className="text-base font-display font-normal text-foreground text-left"
              data-testid="link-work-mobile"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick("beyond")}
              className="text-base font-display font-normal text-foreground text-left"
              data-testid="link-beyond-mobile"
            >
              Beyond Design
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-base font-display font-normal text-foreground text-left"
              data-testid="link-contact-mobile"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/*
  An image that sits inside the headline as if it were a word. Height is fixed
  in `em` so it tracks the type scale; only the WIDTH animates, 3:4 → 4:3 on
  hover, which is what pushes the words after it along instead of overlapping
  them. Transitioning width (not transform) is the point here — a transform
  would scale the box without reflowing the line.
*/
function InlineHeaderImage({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <span
      tabIndex={0}
      data-cursor-label={label}
      data-cursor-label-size="sm"
      className="relative inline-block h-[1.1em] w-[0.825em] hover:w-[1.4667em] focus:w-[1.4667em] focus:outline-none mx-[0.16em] overflow-hidden rounded-sm md:rounded-[16px] bg-foreground/10 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{ verticalAlign: "-0.257em" }}
      data-testid={`img-inline-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </span>
  );
}

/*
  Same inline-media pattern as InlineHeaderImage but backed by a <video>
  instead of a static <img> — everything else (fixed em height, 3:4 → 4:3
  width reveal, cursor label swap) is identical.

  Playback: plays through once on its own, then holds on the last frame.
  Hovering (or focusing) turns looping on; if it had already finished, it's
  restarted from the top. Leaving turns looping back off WITHOUT cutting the
  clip short — `loop` is only checked when playback reaches the end, so the
  current pass is left to finish and then just doesn't repeat.
*/
function InlineHeaderVideo({
  src,
  webmSrc,
  label,
}: {
  src: string;
  webmSrc: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [looping, setLooping] = useState(false);

  const startLooping = () => {
    setLooping(true);
    const video = videoRef.current;
    if (video?.ended) {
      video.currentTime = 0;
      video.play();
    }
  };

  return (
    <span
      tabIndex={0}
      data-cursor-label={label}
      data-cursor-label-size="sm"
      onMouseEnter={startLooping}
      onMouseLeave={() => setLooping(false)}
      onFocus={startLooping}
      onBlur={() => setLooping(false)}
      className="relative inline-block h-[1.1em] w-[0.825em] hover:w-[1.4667em] focus:w-[1.4667em] focus:outline-none mx-[0.16em] overflow-hidden rounded-sm md:rounded-[16px] bg-foreground/10 transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{ verticalAlign: "-0.257em" }}
      data-testid={`video-inline-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/*
        mp4/h264 first (universal on real browsers) with webm/vp9 as a
        fallback for the odd build that ships without licensed codecs.
      */}
      <video
        ref={videoRef}
        autoPlay
        loop={looping}
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={src} type="video/mp4" />
        <source src={webmSrc} type="video/webm" />
      </video>
    </span>
  );
}

function Hero() {
  return (
    <section
      data-bg-color={SECTION_BG.canvas}
      className="min-h-[115vh] px-6 md:px-12 lg:px-16"
    >
      {/*
        Centring happens inside a viewport-tall box, not against the section.
        The section is deliberately taller than the screen (the extra 15vh is
        what makes the page start scrolling before Projects appears), so
        centring against the section itself put the headline ~100px below the
        centre of the first screen.
      */}
      <div className="h-screen flex items-center justify-start">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight leading-[1.2]">
              I'm Xin
              <InlineHeaderVideo
                src={header3}
                webmSrc={header3Webm}
                label="Hello"
              />
              , a Product
              Designer at
              <InlineHeaderImage
                src={header1}
                alt="The Matterhorn, seen from Zermatt"
                label="Zurich"
              />
              YouTube. Previously a founding designer at
              <InlineHeaderImage
                src={header2}
                alt="The Embarcadero, San Francisco"
                label="San Francisco"
              />
              <span className="whitespace-nowrap">Airbnb China.</span>
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type Project = (typeof MOCK_PROJECTS)[number];

/*
  Per-word roll-in. Each word gets its OWN clipping box, and that box is
  exactly one line tall, so a word sliding up from below is only ever visible
  inside its own line band — nothing bleeds into the line above or below the
  way a single mask around a whole paragraph would allow.

  Splitting on words rather than measured lines keeps this reflow-proof: the
  masks re-wrap with the text, so no re-measuring is needed on resize.
*/
const maskedWord = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
  /*
    Leaving is upward, not a rewind of the entrance: the outgoing copy keeps
    travelling the same direction it came in and exits through the top of its
    own line mask, so a swap reads as one continuous roll rather than a bounce.
    Faster than the entrance so the rail is not empty for long.
  */
  exit: {
    y: "-115%",
    transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] as const },
  },
};

function MaskedText({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  exitDelay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  stagger?: number;
  /* Lead-in before the first word rolls up. */
  delay?: number;
  /* Same, on the way out — lets one block leave after another. */
  exitDelay?: number;
  /*
    Off by default: the copy rail drives hidden/visible from its parent, so the
    words must inherit that state rather than run their own viewport trigger.
    Turn it on for the standalone (mobile) blocks that animate on scroll-in.
  */
  inView?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      {...(inView
        ? {
            initial: "hidden" as const,
            whileInView: "visible" as const,
            viewport: { once: false, margin: "-11% 0px -11% 0px" },
          }
        : {})}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
        // Same word order on the way out, tighter.
        exit: {
          transition: {
            staggerChildren: stagger * 0.6,
            delayChildren: exitDelay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/*
            The mask carries a little bottom padding pulled back out with a
            negative margin: descenders (g, y, p) stay visible without the box
            growing into the next line's band.
          */}
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={maskedWord} className="inline-block">
              {word}
            </motion.span>
          </span>
          {/* real space text node — lets the line still wrap between words */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

// The year is its own column, so it is split off the category label; the
// company half ("Personal Project", "Airbnb") is deliberately dropped.
const yearOf = (project: Project) => project.category.split("•")[0].trim();

/*
  The copy for one project: year in its own column, then title and description.
  Used both by the pinned desktop rail (state driven from the parent) and by the
  per-image blocks on mobile, where there is no room for a rail.
*/
function ProjectCopy({
  project,
  inView = false,
}: {
  project: Project;
  inView?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-4 eyebrow font-display text-foreground/50 tabular-nums">
        <MaskedText text={yearOf(project)} inView={inView} />
      </p>

      <h3 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-display font-medium tracking-tighter leading-[1.1] text-foreground">
        <MaskedText text={project.title} stagger={0.002} inView={inView} />
      </h3>

      {/*
        The description trails the title on both halves of a swap: it waits
        for the title to clear before leaving, and waits again for the new
        title to land before rolling up. The beat is what makes the two read
        as a sequence rather than one block changing at once.
      */}
      <p className="mt-6 md:mt-8 text-base text-foreground/70 font-normal leading-[1.7]">
        <MaskedText
          text={project.description}
          stagger={0.001}
          delay={0.1}
          exitDelay={0.01}
          inView={inView}
        />
      </p>
    </div>
  );
}

/*
  The narrow-screen card: copy above its image, scrolled naturally. Wide
  screens use the pinned pager instead, so this never renders there.
*/
function ProjectFrame({ project }: { project: Project }) {
  const frameRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax: track the frame from the moment it enters the
  // viewport (progress 0) to the moment it leaves (progress 1).
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  // The image is 130% of the frame's height, so there's 30% of vertical slack
  // hidden by overflow. Panning ±8% of the image height (≈10.4% of the frame)
  // stays well inside the ±15% the centring leaves on each edge, so the frame
  // is always fully covered — no gaps creep in at the extremes of the scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["-11%", "11%"]);

  return (
    <Link
      href={`/project/${project.id}`}
      className="group block cursor-none"
      data-cursor-label="View"
    >
      <div className="mb-8">
        <ProjectCopy project={project} inView />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          ref={frameRef}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-white/5"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ top: "-15%", y }}
            className="absolute left-0 w-full h-[130%] object-cover"
          />
        </div>
      </motion.div>
    </Link>
  );
}

/*
  How much scroll advances one project while the section is pinned. This is
  the flick dial: the whole of "one page" is this many vh of ordinary
  scrolling, so smaller means a lighter flick carries you to the next project.
  It is also the only sense in which paging exists — the scroll itself is
  never touched.
*/
const PROJECT_PAGE_VH = 65;

function ProjectGrid() {
  const visibleProjects = MOCK_PROJECTS.filter((p) => !p.hidden);
  const [activeIndex, setActiveIndex] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  /*
    Which project the pager is showing. The pinned wrapper is
    PROJECT_PAGE_VH per project plus one screen for the sticky child, so with
    this offset pair the progress runs 0→1 across exactly the paged distance;
    each project owns an equal slice of it. Scroll position is read, never
    written — all the "snapping" lives in the transition below, which animates
    the slide column whenever the slice changes. There is no half-scrolled
    state to stop in, because between two indices nothing is interpolated.
  */
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(
      Math.min(
        visibleProjects.length - 1,
        Math.max(0, Math.floor(v * visibleProjects.length)),
      ),
    );
  });

  const activeProject = visibleProjects[activeIndex] ?? visibleProjects[0];

  return (
    /*
      The section deliberately paints NO background of its own. The scrolling
      colour change lives on the page wrapper, and a background here would show
      as a hard edge sliding up the screen instead of a crossfade.
    */
    <section
      id="work"
      data-bg-color={SECTION_BG.void}
      className="relative"
      /*
        The section is dark, so its text has to invert. Overriding --foreground
        for the subtree flips every text-foreground, /70 and /50 in one place
        — the copy rail, the mobile blocks and the heading all read it — rather
        than hardcoding a light colour at each of them and leaving the opacity
        steps to be re-derived by hand.
      */
      style={{ ["--foreground" as string]: "40 43% 93%" }}
    >
      {/*
        Narrow screens: the projects flow and scroll naturally, each with its
        copy above it. The 35vh of tail is the projects half of the handover
        into the gallery — see the note on the gallery's own narrow-screen
        lead-in for why the gap is split across the two sections.
      */}
      <div className="md:hidden max-w-[1800px] mx-auto px-6 pt-24 pb-[35vh]">
        <div className="flex flex-col gap-24">
          {visibleProjects.map((project) => (
            <ProjectFrame key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/*
        Wide screens: a pinned pager. The wrapper supplies PROJECT_PAGE_VH of
        scroll per project; the sticky child holds one composed screen — rail
        left, image right, centred by layout — and scroll only decides which
        project it is showing. The scroll itself stays native throughout:
        after a wheel-hijacking attempt froze the trackpad and two
        snap-after-the-fact attempts read as jumps, the one approach left is
        the one the Beyond Design gallery already proves out — pin the
        section and let scroll drive the content, never the other way round.
      */}
      <div
        ref={pinRef}
        data-projects-pin
        className="hidden md:block relative"
        style={{
          height: `${visibleProjects.length * PROJECT_PAGE_VH + 100}vh`,
        }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="w-full max-w-[1800px] mx-auto px-10">
            {/*
              The rail is capped at the width of the copy itself and
              everything left over goes to the image column.
            */}
            <div className="grid md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-x-12 items-center">
              {/*
                mode="wait" so the outgoing copy clears the top of its masks
                before the incoming copy rolls up from the bottom — the two
                never overlap mid-swap. Keying on the id restarts the stagger.
              */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ProjectCopy project={activeProject} />
                </motion.div>
              </AnimatePresence>

              {/*
                The pager viewport. All slides live in one column translated
                by whole slide-heights; the transition is the entire feel of
                a page turn, and it can never rest between two projects —
                the column is only ever sent to a whole index.
              */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[32px] bg-white/5">
                <motion.div
                  className="absolute inset-0"
                  animate={{ y: `${-activeIndex * 100}%` }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : { duration: 0.7, ease: [0.32, 0.72, 0, 1] }
                  }
                >
                  {visibleProjects.map((project, i) => (
                    <Link
                      key={project.id}
                      href={`/project/${project.id}`}
                      className="absolute inset-x-0 h-full block cursor-none"
                      style={{ top: `${i * 100}%` }}
                      data-cursor-label="View"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  The closing section, standing in for what used to be two — an About block
  and a small contact strip. It keeps id="contact" because the nav still
  points here.

  A screen tall, with the address sitting low rather than centred: the empty
  upper half is the point, and it is what makes the address land as the last
  thing on the page instead of one more row of content.
*/
function Footer() {
  return (
    <footer
      id="contact"
      data-bg-color={SECTION_BG.dust}
      className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-10"
    >
      <div className="mb-[25vh]">
        <p className="text-base text-foreground mb-4">Say hello</p>
        <a
          href="mailto:about.dala@gmail.com"
          className="block font-display font-medium tracking-tight leading-[1.05] text-foreground text-[clamp(2rem,7vw,7rem)]"
          data-testid="link-email"
        >
          about.dala@gmail.com
        </a>
      </div>

      {/*
        Three columns rather than justify-between, so LINKEDIN sits on the
        page's centre line. Spaced apart it would only look centred if the
        year and the byline happened to be the same width, which they are not.
      */}
      <div className="grid grid-cols-3 items-center font-display font-normal text-sm tracking-tighter text-foreground">
        <span className="tabular-nums">{new Date().getFullYear()}</span>
        <a
          href="https://www.linkedin.com/in/imxinzhang/"
          target="_blank"
          rel="noopener noreferrer"
          className="justify-self-center font-bold tracking-wide"
        >
          LINKEDIN
        </a>
        <span className="justify-self-end">by XIN ZHANG</span>
      </div>
    </footer>
  );
}
