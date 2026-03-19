import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function DeepDiveFirst() {
  const [expandedId, setExpandedId] = useState(1);

  const projects = [
    {
      id: 1,
      title: "YT Shopping Collections",
      company: "Google",
      year: "2024",
      role: "Lead Product Designer",
      description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
      impact: "Now used by 500K+ creators • 40% increase in engagement",
      process: "6 months • 3 user research rounds • 150+ prototypes"
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      company: "Personal Project",
      year: "2026",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store."
    },
    {
      id: 3,
      title: "Airbnb WeChat Mini-app",
      company: "Airbnb",
      year: "2018",
      description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faefdc]">
      {/* Sticky nav */}
      <div className="sticky top-0 bg-[#faefdc] bg-opacity-95 backdrop-blur-sm z-50 border-b border-black/5 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-medium">Xin Zhang</h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Product Designer</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Featured/expanded project */}
        {projects.map((project) => (
          <div key={project.id} className={`mb-8 transition-all ${expandedId === project.id ? 'ring-2 ring-foreground/10 bg-white/60 rounded-2xl p-8' : 'cursor-pointer hover:bg-white/40 p-8 rounded-2xl'}`}
            onClick={() => setExpandedId(project.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-display font-medium mb-2">{project.title}</h2>
                <div className="flex gap-4 text-xs uppercase tracking-widest text-muted-foreground font-bold">
                  <span>{project.year}</span>
                  <span>{project.company}</span>
                </div>
              </div>
              {expandedId !== project.id && <ChevronDown className="w-5 h-5 text-muted-foreground mt-2" />}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.description}</p>

            {expandedId === project.id && project.impact && (
              <div className="border-t border-black/5 pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-2">Impact</p>
                    <p className="text-foreground font-medium">{project.impact}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-2">Timeline</p>
                    <p className="text-foreground font-medium">{project.process}</p>
                  </div>
                </div>
                
                {project.role && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mb-2">My Role</p>
                    <p className="text-foreground">{project.role}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* About */}
        <div className="mt-24 pt-12 border-t border-black/10">
          <h3 className="text-2xl font-display font-medium mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I moved to the U.S. in 2014 to study Human-Computer Interaction at the University of Michigan.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Beyond work: traveling (40+ countries), film photography, and painting.
          </p>
        </div>
      </div>
    </div>
  );
}
