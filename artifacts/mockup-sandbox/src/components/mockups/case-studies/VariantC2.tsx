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
    category: "2024 • YOUTUBE",
    description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1,
  },
  {
    id: 2,
    title: "Darmi IBS food diary",
    category: "2026 • PERSONAL PROJECT",
    description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
    image: project2,
  },
  {
    id: 3,
    title: "Airbnb WeChat Mini-app",
    category: "2018 • AIRBNB",
    description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
    image: project3,
  }
];

export default function VariantC2() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans py-24 px-6 md:px-12 selection:bg-[#1A1A1A] selection:text-[#FAF9F6]">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-32 flex justify-center">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#1A1A1A]/50">
            INDEX OF WORKS
          </h2>
        </header>
        
        <div className="flex flex-col border-t border-[#1A1A1A]/10">
          {MOCK_PROJECTS.map((project, i) => (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              key={project.id} 
              className="group cursor-pointer border-b border-[#1A1A1A]/10 pt-20 pb-24 flex flex-col"
            >
              {/* Title */}
              <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-sans font-medium tracking-tighter leading-[1.0] mb-16 group-hover:text-[#1A1A1A]/70 transition-colors duration-300">
                {project.title}
              </h3>
              
              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-20 items-start">
                {/* Meta Column */}
                <div className="md:col-span-4 flex flex-col gap-8">
                  <span className="text-[11px] font-sans text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-medium">
                    {project.category}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] group-hover:text-[#1A1A1A]/50 transition-colors w-fit">
                    VIEW PROJECT <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                
                {/* Description Column */}
                <div className="md:col-span-6 md:col-start-6">
                  <p className="text-[17px] md:text-[20px] text-[#1A1A1A]/60 font-light leading-[1.6]">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[#1A1A1A]/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
