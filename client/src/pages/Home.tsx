import { Link } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
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

  // Scroll-triggered background color via IntersectionObserver
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-bg-color]')
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const color = (entry.target as HTMLElement).dataset.bgColor;
            if (color && wrapper) wrapper.style.backgroundColor = color;
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans cursor-none"
      style={{ backgroundColor: '#e8e4dc', transition: 'background-color 0.6s ease' }}
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl px-6 md:px-10 py-5 transition-all duration-500 rounded-2xl md:rounded-full ${
          isScrolled || isMenuOpen
            ? "bg-white/90 md:bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <button
          onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-base font-display font-bold tracking-tighter uppercase relative z-20"
          data-testid="link-home"
        >
          Xin Zhang
        </button>

        <button className="md:hidden relative z-20 p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <button onClick={() => handleNavClick('work')} className="hover:text-foreground transition-colors" data-testid="link-work">WORK</button>
          <button onClick={() => handleNavClick('about')} className="hover:text-foreground transition-colors" data-testid="link-about">ABOUT</button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-foreground transition-colors" data-testid="link-contact">CONTACT</button>
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
    <section data-bg-color="#e8e4dc" className="min-h-screen flex items-center justify-center px-6 pt-20">
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // rootMargin creates a thin band at the viewport centre; whichever image
    // enters that band becomes the active project in the sticky left panel.
    const imageEls = section.querySelectorAll<HTMLElement>('[data-project-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.projectId);
            setActiveId(id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    imageEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" data-bg-color="#e0e0e0" ref={sectionRef}>

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
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Desktop: sticky left text + scrolling right images ── */}
      <div className="hidden md:flex max-w-[1400px] mx-auto">

        {/* Left sticky panel — 42% wide, text overlaps image edge */}
        <div className="w-[42%] shrink-0 relative z-10">
          <div className="sticky top-[38vh] pl-12 pr-4">
            <Link href={`/project/${activeProject.id}`} className="block group">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-5">
                  {activeProject.category}
                </p>
                <h3 className="text-[2.6rem] lg:text-[3.2rem] font-display font-medium tracking-tighter leading-[1.1] mb-6 group-hover:opacity-70 transition-opacity duration-300">
                  {activeProject.title}
                </h3>
                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xs">
                  {activeProject.description}
                </p>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Right scrolling images — pulled left 7% so text overlaps the image edge */}
        <div className="flex-1 flex flex-col gap-16 py-[28vh] pr-12 -ml-[7%]">
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
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function About() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"],
  });
  // scrollYProgress retained for future use; suppress unused-variable lint
  void scrollYProgress;

  return (
    <section id="about" data-bg-color="#1a1a1a" ref={targetRef} className="py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-16"
        >
          <div className="space-y-12">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">About Me</h2>
            <div className="text-3xl md:text-5xl font-display leading-[1.3] font-medium tracking-tight space-y-10">
              <p>
                I moved to the U.S. in 2014 to study Human-Computer Interaction at the University of Michigan. Since then, my work has taken me from California to Switzerland.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold">Outside of work</h4>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                I'm a global explorer (40+ countries), film photographer, and painter.{" "}
                <a href="https://xhslink.com/m/gXhYLsbMVt" target="_blank" rel="noopener noreferrer" className="underline decoration-current underline-offset-4 hover:opacity-70 transition-opacity" data-testid="link-creator-story">As a creator,</a>{" "}
                I'm passionate about visual storytelling through video and editing—an obsession that shapes how I see the creator journey.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold">Fun Fact</h4>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
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
    <footer id="contact" data-bg-color="#111111" className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-2">Say hello</p>
          <a href="mailto:about.dala@gmail.com" className="text-2xl font-display hover:opacity-50 transition-opacity" data-testid="link-email">
            about.dala@gmail.com
          </a>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          <a href="https://www.linkedin.com/in/imxinzhang/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
