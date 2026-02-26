import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import photo1 from "@assets/1BBF94CC-BA7C-432C-A0C8-C410E45FE149_4_5005_c_1772054814413.jpeg";
import photo2 from "@assets/6C23377C-15B6-42EA-B1D5-96A84D83C61E_4_5005_c_1772054814414.jpeg";
import photo3 from "@assets/7CC2EAF5-2C07-42BE-8AAB-1027083FD2CF_4_5005_c_1772054814414.jpeg";
import photo4 from "@assets/81C93177-9204-4A44-8C60-4E530DEBAB95_4_5005_c_1772054814415.jpeg";
import photo5 from "@assets/ACA80C8E-CD60-460B-A794-9B92DECF6107_4_5005_c_1772054814415.jpeg";
import photo6 from "@assets/E7311041-CF0E-48D1-85C5-BA16849E0601_4_5005_c_1772054814415.jpeg";
import project2Mockup from "@assets/overview_1772056935126.png";
import project2Bg from "../assets/project-2-bg.png";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "EcoSphere Dashboard",
    category: "Enterprise UX • SaaS",
    description: "Streamlining complex environmental data into actionable insights for global logistics.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
    tags: ["UX Research", "UI Design", "Prototyping"]
  },
  {
    id: 2,
    title: "Health Insights App",
    category: "Healthcare • Mobile",
    description: "A comprehensive health tracking and insights application designed for intuitive pain analysis and dietary tracking.",
    image: project2Mockup,
    bgImage: project2Bg,
    tags: ["Mobile UX", "Health Tech", "Data Vis"]
  },
  {
    id: 3,
    title: "Vault Design System",
    category: "Internal Tooling • Systems",
    description: "Building a scalable component library for a team of 50+ designers and engineers.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    tags: ["Design Systems", "Documentation", "Accessibility"]
  }
];

const MOCK_VISUALS = [
  {
    id: 1,
    title: "Street Life",
    category: "Photography",
    image: photo1
  },
  {
    id: 2,
    title: "Cherry Blossoms",
    category: "Photography",
    image: photo2
  },
  {
    id: 3,
    title: "Matterhorn",
    category: "Photography",
    image: photo3
  },
  {
    id: 4,
    title: "Dubai Creek",
    category: "Photography",
    image: photo4
  },
  {
    id: 5,
    title: "Spice Market",
    category: "Photography",
    image: photo5
  },
  {
    id: 6,
    title: "City Corner",
    category: "Photography",
    image: photo6
  }
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: mousePos.x * 200,
            y: mousePos.y * 200,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 30 }}
          className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-[#fbd1a2] morphing-blob blur-[80px]" 
        />
        <motion.div 
          animate={{ 
            x: mousePos.x * 160,
            y: mousePos.y * 160,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 25 }}
          className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] bg-[#7ebdc2] morphing-blob blur-[80px]" 
          style={{ animationDelay: '-4s' }} 
        />
        <motion.div 
          animate={{ 
            x: mousePos.x * 240,
            y: mousePos.y * 240,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 20 }}
          className="absolute top-[35%] right-[20%] w-[35%] h-[35%] bg-[#efea5a] morphing-blob blur-[80px]" 
          style={{ animationDelay: '-8s' }} 
        />
        <div id="main-bg-overlay" className="absolute inset-0 bg-white/20 backdrop-blur-[80px] border-t border-white/30 transition-colors duration-700" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <ProjectGrid />
        <VisualsGrid />
        <About />
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl px-10 py-5 transition-all duration-500 rounded-full ${
          isScrolled 
            ? "bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]" 
            : "bg-transparent border border-transparent"
        }`}
      >
        <a href="/" className="text-base font-display font-bold tracking-tighter uppercase" data-testid="link-home">
          Xin Zhang
        </a>
        <div className="flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors" data-testid="link-work">Work</a>
          <a href="#about" className="hover:text-foreground transition-colors" data-testid="link-about">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</a>
        </div>
      </motion.nav>
    </div>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.15] text-balance">
            Xin is a Product Designer at <span className="text-primary/60 transition-colors hover:text-primary cursor-default">YouTube</span>. Previously at <span className="text-primary/60 transition-colors hover:text-primary cursor-default">Airbnb</span>, <span className="text-primary/60 transition-colors hover:text-primary cursor-default">Adobe Research</span> and <span className="text-primary/60 transition-colors hover:text-primary cursor-default">Amazon</span>.
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGrid() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  useEffect(() => {
    const bg = document.getElementById('main-bg-overlay');
    const unsubscribe = bgOpacity.on("change", (latest) => {
      if (bg) bg.style.backdropBlur = `${80 + (1 - latest) * 40}px`;
      if (bg) bg.style.backgroundColor = `rgba(255, 255, 255, ${0.2 + (1 - latest) * 0.6})`;
    });
    return () => unsubscribe();
  }, [bgOpacity]);

  return (
    <section id="work" ref={targetRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Case Studies</h2>
          <div className="h-px w-full bg-black/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 items-start">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const isOffset = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col group md:col-span-1 ${isOffset ? 'md:mt-24' : ''}`}
      data-testid={`card-project-${project.id}`}
    >
      <Link href={`/project/${project.id}`}>
        <div className="cursor-pointer block relative aspect-[4/3] overflow-hidden rounded-[4px] bg-white/40 backdrop-blur-sm border border-white/20 transition-all duration-700 mb-8">
          {project.bgImage && (
            <img 
              src={project.bgImage} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
            />
          )}
          <img 
            src={project.image} 
            alt={project.title}
            className={`absolute inset-0 w-full h-full ${project.bgImage ? 'object-contain p-8' : 'object-cover mix-blend-soft-light opacity-70'} group-hover:opacity-100 transition-all duration-1000 ease-out`}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-xl">
              View Case Study <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
      
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">0{index + 1} / {project.category}</span>
        <h3 className="text-3xl font-display font-medium group-hover:opacity-60 transition-opacity mt-2 mb-4">{project.title}</h3>
        <p className="text-muted-foreground leading-relaxed font-light line-clamp-2 text-lg">
          {project.description}
        </p>
        <div className="flex gap-3 pt-4">
          {project.tags?.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-[8px] uppercase tracking-widest px-2 py-0.5 border border-black/5 rounded-full text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VisualsGrid() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Visual Artifacts</h2>
            <div className="h-px w-24 bg-black/10" />
          </div>
          <a 
            href="/photography" 
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
            data-testid="link-view-all-photography"
          >
            View All <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_VISUALS.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[4px] bg-white/20 border border-white/10"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/20 to-transparent">
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/80 mb-1">{item.category}</p>
                <h4 className="text-white font-medium text-sm">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start center"]
  });

  useEffect(() => {
    const bg = document.getElementById('main-bg-overlay');
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (bg && latest > 0) {
        bg.style.backgroundColor = `rgba(255, 255, 255, ${0.8 - latest * 0.6})`;
        bg.style.backdropBlur = `${120 - latest * 40}px`;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="about" ref={targetRef} className="py-40 px-6">
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
                I’m often traveling — 40+ countries and counting — or shooting film and painting.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold">Fun Fact</h4>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                I hold a Bachelor’s degree in Applied Mathematics and was recognized as a Meritorious Winner in the 2013 Mathematical Contest in Modeling.
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
    <footer id="contact" className="py-20 px-6 border-t border-black/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-2">Let's build the future together</p>
          <a href="mailto:hello@imxinzhang.com" className="text-2xl font-display hover:opacity-50 transition-opacity" data-testid="link-email">
            hello@imxinzhang.com
          </a>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          <a href="#" className="hover:text-foreground">Resume</a>
          <a href="#" className="hover:text-foreground">LinkedIn</a>
          <a href="#" className="hover:text-foreground">Twitter</a>
        </div>
      </div>
    </footer>
  );
}