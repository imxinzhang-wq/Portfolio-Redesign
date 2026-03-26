import './_group.css';
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import project1 from "../../../assets/Collection_Cover.png";
import project2 from "../../../assets/Darmi_Cover.PNG";
import project3 from "../../../assets/Airbnb_Cover.gif";

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

export default function VariantB() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 flex items-center justify-between border-b border-black/10 pb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] font-medium">Selected Work</h2>
          <span className="text-sm font-mono text-muted-foreground">2018 - 2026</span>
        </div>
        
        <div className="flex flex-col gap-6">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id} className="group cursor-pointer relative">
              <div className="absolute -left-12 top-0 text-[6rem] font-display font-bold leading-none text-black/5 -z-10 group-hover:text-black/10 transition-colors select-none hidden md:block">
                0{i + 1}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-8">
                  <div className="aspect-[24/7] overflow-hidden bg-black/5 rounded-[8px]">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter md:grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-4">
                  <div className="sticky top-24 pt-2">
                    <div className="mb-2">
                      <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">{project.category}</p>
                    </div>
                    <h3 className="text-xl font-display font-medium tracking-tight mb-2 group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <button className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
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
