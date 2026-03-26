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

export default function VariantC1() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] font-sans py-24 px-6 md:px-12 selection:bg-[#1A1A1A] selection:text-[#FAF9F6]">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col gap-32">
          {MOCK_PROJECTS.map((project, i) => (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              key={project.id} 
              className="group cursor-pointer flex flex-col"
            >
              {/* Text Content */}
              <div className="flex flex-col gap-10 mb-16">
                <h3 className="text-5xl md:text-6xl lg:text-[5rem] font-display font-medium tracking-tighter leading-[0.95] group-hover:text-[#1A1A1A]/70 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                  <div className="md:col-span-4 flex flex-col gap-6">
                    <span className="text-[11px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  
                  <div className="md:col-span-8">
                    <p className="text-[17px] md:text-[19px] text-[#1A1A1A]/60 font-light leading-[1.6] max-w-xl">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-[#1A1A1A]/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02] filter saturate-[0.95] group-hover:saturate-100"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
