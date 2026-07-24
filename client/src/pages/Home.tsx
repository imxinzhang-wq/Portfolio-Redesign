import { Link } from "wouter";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import project1 from "@assets/Collection_Cover.png";
import project2 from "@assets/Darmi_Cover.PNG";
import project3 from "@assets/Airbnb_Cover_1774813459702.jpg";
import project4 from "@assets/tagging_cover_1775594426781.jpeg";

const MOCK_PROJECTS = [
  {
    id: 2,
    title: "Darmi IBS food diary",
    category: "2026 • Personal Project",
    description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
    image: project2,
  },
  {
    id: 1,
    title: "YouTube Shopping Collections",
    category: "2024 • YouTube",
    description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1,
  },
  {
    id: 4,
    title: "YouTube Shopping: Tagging in Description",
    category: "2024 • YouTube",
    description: "How we drove significant GMV growth by aligning monetization tools with creator muscle memory.",
    image: project4,
    hidden: true,
  },
  {
    id: 3,
    title: "Airbnb WeChat Mini-app",
    category: "2018 • Airbnb",
    description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
    image: project3,
  }
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
      setHovering(
        !!(el.closest("a, button, [role='button'], .group"))
      );
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
          transition: "width 0.3s ease, height 0.3s ease, translate 0.3s ease, opacity 0.3s ease",
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
      if (hash && !hash.startsWith('#/')) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Scroll-triggered background color — scroll listener picks the last section
  // whose top edge is above the viewport midpoint, so it works correctly in
  // both scroll directions.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-bg-color]'));

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen relative text-foreground selection:bg-accent selection:text-accent-foreground font-sans cursor-none"
      style={{ backgroundColor: '#f5f0e6', transition: 'background-color 0.6s ease' }}
    >
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
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
    const DARK_COLORS = new Set(['#1a1a1a', '#111111']);
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg-color]'));
      const midpoint = window.innerHeight * 0.5;
      let active = sections[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= midpoint) active = s;
      }
      setIsDark(DARK_COLORS.has(active?.dataset.bgColor ?? ''));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (window.location.hash !== '#/') {
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    }
  };

  const logoColor    = isDark ? 'text-white'      : 'text-foreground';
  const linkColor    = isDark ? 'text-white/60'   : 'text-muted-foreground';
  const linkHover    = isDark ? 'hover:text-white' : 'hover:text-foreground';
  const barColor     = isDark ? 'bg-white'         : 'bg-foreground';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-8 py-6 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto flex items-center justify-between w-full py-5"
      >
        <button
          onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`text-base font-display font-bold tracking-tighter uppercase relative z-20 transition-colors duration-500 ${logoColor}`}
          data-testid="link-home"
        >
          Xin Zhang
        </button>

        <button className="md:hidden relative z-20 p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 transition-all duration-300 ${barColor} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className={`hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${linkColor}`}>
          <button onClick={() => handleNavClick('work')} className={`transition-colors duration-300 ${linkHover}`} data-testid="link-work">WORK</button>
          <button onClick={() => handleNavClick('about')} className={`transition-colors duration-300 ${linkHover}`} data-testid="link-about">ABOUT</button>
          <button onClick={() => handleNavClick('contact')} className={`transition-colors duration-300 ${linkHover}`} data-testid="link-contact">CONTACT</button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-6 flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] md:hidden">
            <button onClick={() => handleNavClick('work')} className="text-sm font-bold uppercase tracking-[0.2em] text-foreground text-left" data-testid="link-work-mobile">WORK</button>
            <button onClick={() => handleNavClick('about')} className="text-sm font-bold uppercase tracking-[0.2em] text-foreground text-left" data-testid="link-about-mobile">ABOUT</button>
            <button onClick={() => handleNavClick('contact')} className="text-sm font-bold uppercase tracking-[0.2em] text-foreground text-left" data-testid="link-contact-mobile">CONTACT</button>
          </div>
        )}
      </motion.nav>
    </div>
  );
}

function Hero() {
  return (
    <section data-bg-color="#f5f0e6" className="min-h-[115vh] flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.15] text-balance">
            I'm Xin, a Product Designer at{" "}
            <span className="text-primary/60 transition-colors hover:text-primary cursor-default">YouTube</span>.{" "}
            Previously a founding designer at{" "}
            <span className="text-primary/60 transition-colors hover:text-primary cursor-default">Airbnb China</span>.
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGrid() {
  const visibleProjects = MOCK_PROJECTS.filter(p => !p.hidden);
  const [activeId, setActiveId] = useState<number>(visibleProjects[0]?.id ?? 0);
  const activeProject = visibleProjects.find(p => p.id === activeId) ?? visibleProjects[0];
  const sectionRef = useRef<HTMLElement>(null);

  // panelVisible: true only while at least one project image sits in the
  // viewport centre band — keeps the left text in sync with the right images
  // on both entry and exit.
  const [panelVisible, setPanelVisible] = useState(false);
  const intersectingIds = useRef(new Set<number>());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // rootMargin creates a thin band at the viewport centre; whichever image
    // enters that band becomes the active project in the sticky left panel.
    const imageEls = section.querySelectorAll<HTMLElement>('[data-project-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number((entry.target as HTMLElement).dataset.projectId);
          if (entry.isIntersecting) {
            intersectingIds.current.add(id);
            setActiveId(id);
            setPanelVisible(true);
          } else {
            intersectingIds.current.delete(id);
            if (intersectingIds.current.size === 0) setPanelVisible(false);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    imageEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" data-bg-color="#f5f0e6" ref={sectionRef}>

      {/* ── Mobile: simple stacked layout ── */}
      <div className="md:hidden px-6 py-20 flex flex-col gap-20">
        {visibleProjects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`} className="block group">
            <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-3">
              {project.category}
            </p>
            <h3 className="text-[2rem] font-display font-medium tracking-tighter mb-4 group-hover:opacity-70 transition-opacity">
              {project.title}
            </h3>
            <p className="text-base text-muted-foreground font-light leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-black/5">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Desktop: sticky left text + scrolling right images ── */}
      {/*
        DOM order: right column FIRST (paints behind), left panel SECOND (paints on top).
        CSS flex `order` reverses the visual order so left panel appears on the left.
        This means the left panel needs no z-index — DOM order handles layering.
        No z-index on the left panel div or its sticky child → no stacking contexts →
        mix-blend-mode on the h3 composites against the ROOT backdrop, which includes
        the image visible through the transparent left panel at the overlap zone.
      */}
      <div className="hidden md:flex max-w-[1400px] mx-auto">

        {/* Right scrolling images — FIRST in DOM (painted behind), visual order 2 */}
        <div className="flex-1 flex flex-col gap-[55vh] py-[60vh] pr-12 -ml-[7%] order-2">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className="group cursor-pointer"
            >
              <Link
                href={`/project/${project.id}`}
                className="block w-full aspect-[16/10] overflow-hidden rounded-xl bg-black/5"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Left sticky panel — SECOND in DOM (paints on top), visual order 1, no z-index */}
        <div className="w-[42%] shrink-0 relative order-1">
          {/* No z-index on sticky → no stacking context → h3 blend reaches root backdrop */}
          <div className="sticky top-[38vh] pl-12 pr-4">
            <AnimatePresence mode="wait">
              {panelVisible && <motion.div
                key={activeId}
                variants={{
                  initial: {},
                  animate: { transition: { staggerChildren: 0.1 } },
                  exit:    { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link href={`/project/${activeProject.id}`} className="block group">
                  <div className="overflow-hidden mb-5">
                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                        exit:    { opacity: 0, y: -40, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
                      }}
                      className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.3em]"
                    >
                      {activeProject.category}
                    </motion.p>
                  </div>
                  {/*
                    Title: whitespace-nowrap so it extends past the left panel boundary
                    into the image zone. mix-blend-mode:difference + color:white gives:
                      - on beige bg (#f5f0e6): |255-245,255-240,255-230| ≈ near-black ✓
                      - on image pixels:       |255-r,255-g,255-b| = inverted colours ✓
                    Opacity-only animation (no y/transform) so Framer Motion doesn't
                    leave a transform:translateY(0) that would create a stacking context
                    and break the blend mode at rest.
                  */}
                  <div className="mb-8">
                    <motion.h3
                      variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                        exit:    { opacity: 0,  transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
                      }}
                      className="text-[2.6rem] lg:text-[3.2rem] font-display font-medium tracking-tighter leading-[1.1] whitespace-nowrap"
                      style={{ color: "white", mixBlendMode: "difference" }}
                    >
                      {activeProject.title}
                    </motion.h3>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 40 },
                        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                        exit:    { opacity: 0, y: -40, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
                      }}
                      className="text-lg text-muted-foreground font-light leading-relaxed max-w-xs"
                    >
                      {activeProject.description}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" data-bg-color="#1a1a1a" className="py-60 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-16"
        >
          <div className="space-y-12">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-white/50">About Me</h2>
            <div className="text-3xl md:text-5xl font-display leading-[1.3] font-medium tracking-tight space-y-10 text-white">
              <p>
                I moved to the U.S. in 2014 to study Human-Computer Interaction at the University of Michigan. Since then, my work has taken me from California to Switzerland.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-white">Outside of work</h4>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                I'm a global explorer (40+ countries), film photographer, and painter.{" "}
                <a href="https://xhslink.com/m/gXhYLsbMVt" target="_blank" rel="noopener noreferrer" className="underline decoration-current underline-offset-4 hover:opacity-70 transition-opacity" data-testid="link-creator-story">As a creator,</a>{" "}
                I'm passionate about visual storytelling through video and editing—an obsession that shapes how I see the creator journey.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-white">Fun Fact</h4>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                I hold a Bachelor's degree in Applied Mathematics and was recognized as a Meritorious Winner in the 2013 Mathematical Contest in Modeling.
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
    <footer id="contact" data-bg-color="#111111" className="py-40 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 mb-2">Say hello</p>
          <a href="mailto:about.dala@gmail.com" className="text-2xl font-display text-white hover:opacity-50 transition-opacity" data-testid="link-email">
            about.dala@gmail.com
          </a>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-white/50">
          <a href="https://www.linkedin.com/in/imxinzhang/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
