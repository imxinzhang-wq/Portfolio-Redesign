import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

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
    title: "NexPay Mobile",
    category: "Fintech • iOS/Android",
    description: "Redesigning the checkout experience for the next generation of digital-native users.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    tags: ["Mobile UX", "Interaction Design", "User Testing"]
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
    title: "Alpine Silence",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Abstract Flow",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Urban Geometry",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Dusk in Zürich",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[50%] h-[50%] bg-[#fbd1a2] morphing-blob" />
        <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] bg-[#7ebdc2] morphing-blob" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[40%] right-[15%] w-[35%] h-[35%] bg-[#efea5a] morphing-blob" style={{ animationDelay: '-8s' }} />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[80px] border-t border-white/30" />
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
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Case Studies</h2>
          <div className="h-px w-full bg-black/5" />
        </div>
        <div className="space-y-32">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualsGrid() {
  return (
    <section className="py-32 px-6 bg-white/10 backdrop-blur-sm border-y border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Visual Artifacts</h2>
          <div className="h-px w-full bg-black/5" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_VISUALS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-white/20 border border-white/10"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-1">{item.category}</p>
                <h4 className="text-white font-medium text-sm">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: any, index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
      data-testid={`row-project-${project.id}`}
    >
      <div className="w-full md:w-3/5">
        <div className="group relative aspect-video overflow-hidden rounded-[2.5rem] bg-white/40 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-700">
          <img 
            src={project.image} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-xl">
              View Case Study <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-2/5">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 mb-4 block">0{index + 1} / {project.category}</span>
        <h3 className="text-4xl md:text-5xl font-display font-medium mb-6">{project.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
          {project.description}
        </p>
        <div className="flex gap-4">
          {project.tags?.map((tag: string) => (
            <span key={tag} className="text-[9px] uppercase tracking-widest px-3 py-1 border border-black/5 rounded-full text-muted-foreground">
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
    <section id="about" className="py-40 px-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/5">
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