import './_group.css';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import project1 from "@/assets/Collection_Cover.png";
import project2 from "@/assets/Darmi_Cover.PNG";
import project3 from "@/assets/Airbnb_Cover.gif";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "YT Shopping Collections",
    category: "2024 • YouTube",
    description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1,
  },
  {
    id: 2,
    title: "Darmi IBS food diary",
    category: "2026 • Personal Project",
    description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
    image: project2,
  },
  {
    id: 3,
    title: "Airbnb WeChat Mini-app",
    category: "2018 • Airbnb",
    description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
    image: project3,
  }
];

export default function VariantA() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-32">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Case Studies</h2>
          <div className="h-px w-full bg-black/5" />
        </div>
        
        <div className="flex flex-col gap-32">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className={`md:col-span-7 ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`md:col-span-5 ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono tracking-widest text-muted-foreground mb-6">0{i + 1} / {project.category.split(' • ')[1] || project.category}</span>
                    <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6 group-hover:text-black/60 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-widest">
                      Explore Project <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
