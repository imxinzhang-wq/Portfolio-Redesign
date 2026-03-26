import './_group.css';
import { motion } from "framer-motion";

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

export default function VariantC() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-32">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-medium tracking-tighter transition-colors duration-300 group-hover:text-black/70">
                    {project.title}
                  </h3>
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase">{project.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3 lg:col-start-1">
                  <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>
                <div className="lg:col-span-8 lg:col-start-5">
                  <div className="aspect-[21/9] overflow-hidden bg-black/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover origin-center transform transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
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
