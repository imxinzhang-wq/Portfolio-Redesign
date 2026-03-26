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

export default function VariantB() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 flex items-center justify-between border-b border-black/10 pb-8">
          <h2 className="text-sm uppercase tracking-[0.2em] font-medium">Selected Work</h2>
          <span className="text-sm font-mono text-muted-foreground">2018 - 2026</span>
        </div>
        
        <div className="flex flex-col gap-40">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id} className="group cursor-pointer relative">
              <div className="absolute -left-12 top-0 text-[12rem] font-display font-bold leading-none text-black/5 -z-10 group-hover:text-black/10 transition-colors select-none hidden md:block">
                0{i + 1}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8">
                  <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-black/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover filter md:grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-4 md:pt-12">
                  <div className="sticky top-24">
                    <div className="border-t border-black/10 pt-6 mb-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.category}</p>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-6">
                      {project.title}
                    </h3>
                    <p className="text-base text-muted-foreground font-light leading-relaxed mb-10">
                      {project.description}
                    </p>
                    <button className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
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
