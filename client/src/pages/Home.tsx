import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Aura Finance",
    category: "Digital Product",
    year: "2025",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Nova OS",
    category: "System Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Lumina",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Echo Space",
    category: "Web Experience",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Home() {
  const containerRef = useRef(null);
  
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground font-sans bg-noise" ref={containerRef}>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
    >
      <div className="container mx-auto px-6 py-6 md:py-8 flex justify-between items-center">
        <a href="/" className="text-xl font-display font-medium tracking-tight" data-testid="link-home">
          Xin Zhang
        </a>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#work" className="hover:opacity-60 transition-opacity" data-testid="link-work">Work</a>
          <a href="#about" className="hover:opacity-60 transition-opacity" data-testid="link-about">Profile</a>
          <a href="#contact" className="hover:opacity-60 transition-opacity" data-testid="link-contact">Contact</a>
        </nav>
        <button className="md:hidden text-sm uppercase tracking-wider" data-testid="button-menu">Menu</button>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-end pb-24 md:pb-32 pt-40 px-6 container mx-auto">
      <motion.div style={{ y: y1, opacity }} className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-sm uppercase tracking-widest font-medium">
            Digital Product Designer based in the physical world, crafting concise and forward-thinking interfaces.
          </p>
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.h1 
            className="text-[12vw] leading-[0.9] font-display font-medium tracking-tighter"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Digital<br />Experience.
          </motion.h1>
        </div>
      </motion.div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="py-24 md:py-32 px-6 container mx-auto">
      <div className="flex justify-between items-end mb-16 md:mb-24">
        <h2 className="text-3xl md:text-5xl font-display tracking-tight font-medium">Selected Works</h2>
        <span className="text-muted-foreground text-sm uppercase tracking-widest hidden md:block">2024 — 2026</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 md:gap-y-32">
        {MOCK_PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  // Stagger grid slightly to break perfect symmetry
  const isOffset = index % 2 !== 0;
  
  return (
    <motion.a 
      href={`#project-${project.id}`}
      className={`group block cursor-pointer ${isOffset ? 'md:mt-32' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`link-project-${project.id}`}
    >
      <div className="overflow-hidden bg-muted aspect-[4/5] md:aspect-[3/4] mb-6 relative">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white text-black rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-display font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">{project.category}</p>
        </div>
        <span className="text-sm font-medium">{project.year}</span>
      </div>
    </motion.a>
  );
}

function About() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 container mx-auto border-t border-border/40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Profile</h2>
        </div>
        <div className="md:col-span-8">
          <motion.h3 
            className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.1] font-medium tracking-tight mb-12 text-balance"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            I focus on creating digital experiences that balance strict utility with subtle emotion, stripping away the unnecessary to reveal the essential.
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-20">
            <div>
              <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Expertise</h4>
              <ul className="space-y-4 font-medium text-lg">
                <li>Product Design</li>
                <li>Design Systems</li>
                <li>Interaction Design</li>
                <li>Creative Direction</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">Experience</h4>
              <ul className="space-y-4 text-lg">
                <li className="flex justify-between border-b border-border/40 pb-4">
                  <span className="font-medium">Senior Designer</span>
                  <span className="text-muted-foreground">Present</span>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-4">
                  <span className="font-medium">Design Lead</span>
                  <span className="text-muted-foreground">2022 - 2024</span>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-4">
                  <span className="font-medium">Product Designer</span>
                  <span className="text-muted-foreground">2019 - 2022</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-32 pb-12 px-6">
      <div className="container mx-auto">
        <div className="mb-24 md:mb-40">
          <p className="text-sm uppercase tracking-widest text-primary-foreground/50 mb-8">Got an idea?</p>
          <motion.a 
            href="mailto:hello@imxinzhang.com"
            className="group inline-flex items-center gap-4 text-4xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter hover:text-white/80 transition-colors"
            whileHover={{ x: 20 }}
            data-testid="link-email"
          >
            Let's connect
            <ArrowRight className="w-10 h-10 md:w-20 md:h-20 group-hover:rotate-[-45deg] transition-transform duration-500" />
          </motion.a>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-primary-foreground/50 border-t border-primary-foreground/10 pt-8">
          <p>© {new Date().getFullYear()} Xin Zhang. All rights reserved.</p>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-foreground transition-colors" data-testid="link-social-twitter">Twitter</a>
            <a href="#" className="hover:text-primary-foreground transition-colors" data-testid="link-social-linkedin">LinkedIn</a>
            <a href="#" className="hover:text-primary-foreground transition-colors" data-testid="link-social-dribbble">Dribbble</a>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-primary-foreground transition-colors uppercase tracking-wider text-xs flex items-center gap-2"
          >
            Back to top
            <ArrowUpRight className="w-4 h-4 rotate-[-45deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
}