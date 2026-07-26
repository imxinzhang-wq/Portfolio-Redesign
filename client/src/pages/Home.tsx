import { Link } from "wouter";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import project1 from "@assets/Collection_Cover.png";
import project2 from "@assets/Darmi_Cover.PNG";
import project3 from "@assets/Airbnb_Cover_1774813459702.jpg";
import project4 from "@assets/tagging_cover_1775594426781.jpeg";

/*
  Section background colours. These drive the scroll-linked background swap and
  are read back out of the DOM by both the wrapper and the navbar, so they live
  here as the single source of truth rather than as repeated hex literals.
  Mirrors --background and --ink-dark in index.css.
*/
const SECTION_BG = {
  canvas: "#f5f0e6",
  ink: "#1a1a1a",
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

function CustomCursor() {
  const mouseX = useSpring(-100, { stiffness: 200, damping: 28, mass: 0.5 });
  const mouseY = useSpring(-100, { stiffness: 200, damping: 28, mass: 0.5 });
  const dotX = useSpring(-100, { stiffness: 500, damping: 35, mass: 0.2 });
  const dotY = useSpring(-100, { stiffness: 500, damping: 35, mass: 0.2 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], .group"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-foreground/30 mix-blend-multiply"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          x: mouseX,
          y: mouseY,
          translateX: hovering ? "-28px" : "-18px",
          translateY: hovering ? "-28px" : "-18px",
          opacity: visible ? 1 : 0,
          transition:
            "width 0.3s ease, height 0.3s ease, translate 0.3s ease, opacity 0.3s ease",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-foreground mix-blend-multiply"
        style={{
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 0.7 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}

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
        // Keep html background in sync so macOS overscroll bounce shows the
        // correct colour instead of the browser default white.
        document.documentElement.style.backgroundColor = color;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
        <About />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const DARK_COLORS = new Set<string>([SECTION_BG.ink]);
    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-bg-color]"),
      );
      const midpoint = window.innerHeight * 0.5;
      let active = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= midpoint) active = s;
      }
      setIsDark(DARK_COLORS.has(active?.dataset.bgColor ?? ""));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (window.location.hash !== "#/") {
      window.location.hash = "#/";
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el)
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth",
        });
    }
  };

  const logoColor = isDark ? "text-white" : "text-foreground";
  const linkColor = isDark ? "text-white/60" : "text-muted-foreground";
  const linkHover = isDark ? "hover:text-white" : "hover:text-foreground";
  const barColor = isDark ? "bg-white" : "bg-foreground";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-8 py-6 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto flex items-center justify-between w-full py-5"
      >
        <button
          onClick={() => {
            setIsMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`text-base font-display font-bold tracking-tighter uppercase relative z-20 transition-colors duration-500 ${logoColor}`}
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
              className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>

        <div
          className={`hidden md:flex gap-10 eyebrow font-display font-bold transition-colors duration-500 ${linkColor}`}
        >
          <button
            onClick={() => handleNavClick("work")}
            className={`transition-colors duration-300 ${linkHover}`}
            data-testid="link-work"
          >
            WORK
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={`transition-colors duration-300 ${linkHover}`}
            data-testid="link-about"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className={`transition-colors duration-300 ${linkHover}`}
            data-testid="link-contact"
          >
            CONTACT
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] md:hidden">
            <button
              onClick={() => handleNavClick("work")}
              className="text-sm font-display font-bold uppercase tracking-[0.25em] text-foreground text-left"
              data-testid="link-work-mobile"
            >
              WORK
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-sm font-display font-bold uppercase tracking-[0.25em] text-foreground text-left"
              data-testid="link-about-mobile"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-sm font-display font-bold uppercase tracking-[0.25em] text-foreground text-left"
              data-testid="link-contact-mobile"
            >
              CONTACT
            </button>
          </div>
        )}
      </motion.nav>
    </div>
  );
}

function Hero() {
  return (
    <section data-bg-color={SECTION_BG.canvas} className="min-h-[115vh] px-6">
      {/*
        Centring happens inside a viewport-tall box, not against the section.
        The section is deliberately taller than the screen (the extra 15vh is
        what makes the page start scrolling before Projects appears), so
        centring against the section itself put the headline ~100px below the
        centre of the first screen.
      */}
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.15] text-balance">
            I'm Xin, a Product Designer at{" "}
            <span className="text-primary/60 transition-colors hover:text-primary cursor-default">
              YouTube
            </span>
            . Previously a founding designer at{" "}
            <span className="text-primary/60 transition-colors hover:text-primary cursor-default">
              Airbnb China
            </span>
            .
          </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type Project = (typeof MOCK_PROJECTS)[number];

function ProjectCard({
  project,
  alignRight,
}: {
  project: Project;
  alignRight: boolean;
}) {
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
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full md:w-[46%] ${alignRight ? "md:ml-auto md:text-right md:-mt-[12vh]" : ""}`}
    >
      <Link href={`/project/${project.id}`} className="block group">
        <div
          ref={frameRef}
          className="relative w-full aspect-[5/4] overflow-hidden rounded-[32px] bg-white/5 mb-10"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ top: "-15%", y }}
            className="absolute left-0 w-full h-[130%] object-cover"
          />
        </div>
        <p className="eyebrow font-mono text-white/50 mb-3">{project.category}</p>
        <h3 className="text-3xl font-display font-medium tracking-tighter text-white mb-4">
          {project.title}
        </h3>
        <p
          className={`text-base text-white/70 font-normal leading-[1.7] max-w-md ${alignRight ? "md:ml-auto" : ""}`}
        >
          {project.description}
        </p>
      </Link>
    </motion.div>
  );
}

function ProjectGrid() {
  const visibleProjects = MOCK_PROJECTS.filter((p) => !p.hidden);

  return (
    <section id="work" data-bg-color={SECTION_BG.ink} className="relative">
      {/*
        Layering, and why the DOM order matters:

        The cards come FIRST so the sticky "Projects" wordmark below them paints
        ON TOP. That is what makes its difference blend invert against whatever
        it overlaps — white over an image inverts the pixels, white over the
        dark canvas resolves to light grey (|255-26| = 229).

        The blend lives on the sticky element itself, not on the <h2> inside it:
        `position: sticky` establishes a stacking context, so a blend on a
        descendant would only ever composite against that container's own
        (transparent) backdrop and render plain white. Blending the sticky box
        as a group reaches the page background and the images behind it.

        The section deliberately paints NO background of its own. The scrolling
        colour change lives on the page wrapper, and a background here would
        show as a hard edge sliding up the screen instead of a crossfade. For
        the wrapper's colour to count as backdrop it has to be in the same
        stacking context, which is why <main> carries no z-index.
      */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-[28vh] flex flex-col gap-24 md:gap-[24vh]">
        <h2 className="text-4xl font-display font-medium tracking-tighter text-white md:hidden">
          Projects
        </h2>

        {visibleProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} alignRight={i % 2 === 1} />
        ))}
      </div>

      {/*
        Sticky wordmark — absolutely positioned so it takes no layout space and
        the cards scroll straight through it. pointer-events-none keeps the
        cards clickable underneath.
      */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div
          className="sticky top-0 h-screen flex items-center justify-center"
          style={{ color: "white", mixBlendMode: "difference" }}
        >
          <h2 className="text-6xl lg:text-7xl font-display font-medium tracking-tighter">
            Projects
          </h2>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      data-bg-color={SECTION_BG.canvas}
      className="pt-60 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-16"
        >
          <div className="space-y-12">
            <h2 className="eyebrow font-bold text-foreground/40">About Me</h2>
            <div className="text-3xl md:text-5xl font-display leading-[1.3] font-medium tracking-tight space-y-10 text-foreground">
              <p>
                I moved to the U.S. in 2014 to study Human-Computer Interaction
                at the University of Michigan. Since then, my work has taken me
                from California to Switzerland.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-4">
              <h3 className="eyebrow font-bold text-foreground/40">
                Outside of work
              </h3>
              <p className="text-foreground/70 leading-[1.7] text-lg font-normal">
                I'm a global explorer (40+ countries), film photographer, and
                painter.{" "}
                <a
                  href="https://xhslink.com/m/gXhYLsbMVt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-current underline-offset-4 hover:opacity-70 transition-opacity"
                  data-testid="link-creator-story"
                >
                  As a creator,
                </a>{" "}
                I'm passionate about visual storytelling through video and
                editing—an obsession that shapes how I see the creator journey.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="eyebrow font-bold text-foreground/40">Fun Fact</h3>
              <p className="text-foreground/70 leading-[1.7] text-lg font-normal">
                I hold a Bachelor's degree in Applied Mathematics and was
                recognized as a Meritorious Winner in the 2013 Mathematical
                Contest in Modeling.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      data-bg-color={SECTION_BG.canvas}
      className="py-16 px-6 relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="eyebrow font-bold text-foreground/40 mb-2">Say hello</p>
          <a
            href="mailto:about.dala@gmail.com"
            className="text-2xl font-display text-foreground hover:opacity-50 transition-opacity"
            data-testid="link-email"
          >
            about.dala@gmail.com
          </a>
        </div>
        <div className="flex gap-8 eyebrow font-bold text-foreground/40">
          <a
            href="https://www.linkedin.com/in/imxinzhang/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
