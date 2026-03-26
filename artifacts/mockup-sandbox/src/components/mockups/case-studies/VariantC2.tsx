import './_group.css';
import { motion } from "framer-motion";

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
    <div className="bg-[#FAF9F6] min-h-screen text-[#111] font-sans py-24 px-6 md:px-12 selection:bg-[#111] selection:text-[#FAF9F6]">
      <div className="max-w-[1200px] mx-auto">
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
              {/* Stacked Details */}
              <div className="flex flex-col max-w-3xl mb-12">
                <h3 className="text-[3rem] md:text-6xl lg:text-[5.5rem] font-display font-medium tracking-tight leading-[0.95] mb-8 group-hover:text-[#111]/70 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-6 mb-8">
                  <span className="text-[11px] font-mono text-[#111]/50 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-[16px] md:text-[18px] text-[#111]/60 font-light leading-[1.6]">
                  {project.description}
                </p>
              </div>

              {/* Panoramic Image */}
              <div className="w-full aspect-[16/7] md:aspect-[24/10] overflow-hidden bg-[#111]/5 relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
