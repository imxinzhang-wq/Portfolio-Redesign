import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Aura Finance",
    category: "AI Integration",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Nova OS",
    category: "Interface Concept",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Lumina",
    category: "Organic Brand",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#f3e9dc] morphing-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#e9ecef] morphing-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-[#f8f9fa] morphing-blob" style={{ animationDelay: '-10s' }} />
        <div className="absolute inset-0 bg-organic-gradient" />
      </div>

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
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-8"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-display font-semibold tracking-tight uppercase" data-testid="link-home">
          Xin Zhang
        </a>
        <div className="flex gap-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors" data-testid="link-work">Works</a>
          <a href="#about" className="hover:text-foreground transition-colors" data-testid="link-about">Profile</a>
          <a href="#contact" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</a>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-display font-medium tracking-tighter leading-[0.85] mb-12">
            Synthetic<br />Poetics.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Exploring the delicate intersection of human intuition and algorithmic precision through organic digital interfaces.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGrid() {
  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500"
      data-testid={`card-project-${project.id}`}
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
      />
      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">0{index + 1}</span>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-display font-medium mb-1">{project.title}</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{project.category}</p>
        </div>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-display leading-tight mb-16 text-balance font-medium"
        >
          Crafting digital artifacts that feel like they've grown, not just been assembled.
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-12 text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground">
          <span>Visionary Design</span>
          <span>Adaptive Systems</span>
          <span>Emotional UI</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-black/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-2">Available for collaboration</p>
          <a href="mailto:hello@imxinzhang.com" className="text-2xl font-display hover:opacity-50 transition-opacity" data-testid="link-email">
            hello@imxinzhang.com
          </a>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          <a href="#" className="hover:text-foreground">Twitter</a>
          <a href="#" className="hover:text-foreground">LinkedIn</a>
          <a href="#" className="hover:text-foreground">Save as PDF</a>
        </div>
      </div>
    </footer>
  );
}