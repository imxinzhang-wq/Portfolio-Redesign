import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight, Mail, Linkedin, FileText } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "EcoSphere Dashboard",
    category: "Enterprise UX • SaaS",
    description: "Streamlining complex environmental data into actionable insights for global logistics.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "NexPay Mobile",
    category: "Fintech • iOS/Android",
    description: "Redesigning the checkout experience for the next generation of digital-native users.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Vault Design System",
    category: "Internal Tooling • Systems",
    description: "Building a scalable component library for a team of 50+ designers and engineers.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[70%] h-[70%] bg-[#f8f1e9] morphing-blob" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-[#edf2fb] morphing-blob" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[25%] right-[5%] w-[45%] h-[45%] bg-[#f1f3f5] morphing-blob" style={{ animationDelay: '-12s' }} />
        <div className="absolute inset-0 bg-organic-gradient" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <ProjectGrid />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'glass-card px-6 py-3 rounded-full' : ''}`}>
          <a href="/" className="text-xl font-display font-bold tracking-tighter" data-testid="link-home">
            XIN ZHANG
          </a>
          <div className="flex gap-8 items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors" data-testid="link-work">Work</a>
            <a href="#about" className="hover:text-foreground transition-colors" data-testid="link-about">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div style={{ y, opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/80">
              Senior Product Designer @ Tech
            </span>
          </motion.div>
          
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-display font-medium tracking-tighter leading-[0.85] mb-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block"
            >
              Elevating
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block text-muted-foreground/30 italic"
            >
              Interactions.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed mb-12"
          >
            I specialize in crafting intuitive design systems and high-impact digital products that bridge the gap between users and technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a 
              href="#work" 
              className="inline-flex items-center gap-2 group text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Explore Case Studies
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGrid() {
  return (
    <section id="work" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4">Case Studies</h2>
            <p className="text-4xl font-display font-medium">Selected Works</p>
          </div>
          <span className="text-[10px] font-bold text-muted-foreground/40 hidden md:block">2024 — 2026</span>
        </div>
        <div className="space-y-48">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  return (
    <motion.div
      ref={container}
      style={{ scale, opacity }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
      data-testid={`project-item-${project.id}`}
    >
      <div className="w-full md:w-3/5 group cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] glass-card group-hover:shadow-2xl transition-all duration-700">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8 right-8 flex justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-white/90 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-2/5 space-y-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-3 block">Project 0{index + 1}</span>
          <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed text-lg font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {["Research", "Strategy", "System"].map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-widest px-4 py-1.5 bg-white/50 border border-black/5 rounded-full text-muted-foreground/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="py-40 px-6 bg-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div className="space-y-12">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground">The Approach</h2>
          <p className="text-4xl md:text-5xl font-display leading-[1.15] font-medium tracking-tight">
            I believe design is most effective when it is <span className="text-muted-foreground/40 italic">invisible</span> yet profoundly impactful.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16 pt-4">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Holistic Systems</h4>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              I don't just design screens; I design ecosystems. My work focuses on creating scalable frameworks that ensure consistency and speed across entire product suites.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">User Centricity</h4>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Every pixel is backed by purpose. I leverage qualitative research and quantitative data to make informed decisions that resonate with real human needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-60 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-medium tracking-tighter leading-none">
          Ready to build the <br />next big thing?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:hello@imxinzhang.com" className="flex items-center gap-3 glass-card px-8 py-4 rounded-full hover:scale-105 transition-transform group">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-bold uppercase tracking-widest">Email Me</span>
          </a>
          <a href="#" className="flex items-center gap-3 glass-card px-8 py-4 rounded-full hover:scale-105 transition-transform group">
            <Linkedin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-bold uppercase tracking-widest">LinkedIn</span>
          </a>
          <a href="#" className="flex items-center gap-3 glass-card px-8 py-4 rounded-full hover:scale-105 transition-transform group">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-bold uppercase tracking-widest">Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-black/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
        <p>© {new Date().getFullYear()} XIN ZHANG — PORTFOLIO</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
          <a href="#" className="hover:text-foreground transition-colors">Read.cv</a>
        </div>
      </div>
    </footer>
  );
}