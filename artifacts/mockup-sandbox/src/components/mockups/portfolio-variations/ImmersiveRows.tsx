import { ArrowUpRight } from "lucide-react";

export function ImmersiveRows() {
  const projects = [
    {
      id: 1,
      title: "YT Shopping Collections",
      company: "Google",
      year: "2024",
      description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
      role: "Lead Product Designer",
      tags: ["UX Research", "UI Design", "Prototyping"],
      bgColor: "from-red-600/20 to-orange-600/20",
      accentColor: "bg-red-100"
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      company: "Personal Project",
      year: "2026",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
      role: "Founder & Designer",
      tags: ["Mobile UX", "AI/ML", "Health Tech"],
      bgColor: "from-blue-600/20 to-cyan-600/20",
      accentColor: "bg-blue-100"
    },
    {
      id: 3,
      title: "Airbnb WeChat Mini-app",
      company: "Airbnb",
      year: "2018",
      description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
      role: "Senior Product Designer",
      tags: ["Localization", "Mobile", "Data-Driven"],
      bgColor: "from-pink-600/20 to-rose-600/20",
      accentColor: "bg-pink-100"
    }
  ];

  return (
    <div className="bg-[#faefdc] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#faefdc]/95 backdrop-blur-sm border-b border-black/5 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-display font-medium">Xin Zhang</h1>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Product Designer</p>
        </div>
      </div>

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-0">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={project.id} className="grid grid-cols-2 gap-0 min-h-[600px] items-stretch">
              {/* Image side */}
              <div
                className={`${
                  isEven ? "order-1" : "order-2"
                } bg-gradient-to-br ${project.bgColor} relative overflow-hidden`}
              >
                {/* Cropped image placeholder with zoom effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl opacity-20 mb-4">📱</div>
                    <p className="text-gray-600/60 text-sm font-medium">{project.title}</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center group cursor-pointer">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div
                className={`${
                  isEven ? "order-2" : "order-1"
                } bg-white/40 backdrop-blur-sm border-l border-black/5 p-12 flex flex-col justify-center`}
              >
                <div className="space-y-6 max-w-lg">
                  {/* Year/Company */}
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 ${project.accentColor} rounded-full`}>
                      {project.year}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{project.company}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl font-display font-medium leading-tight">{project.title}</h2>

                  {/* Role */}
                  <p className="text-sm uppercase tracking-widest text-muted-foreground/70 font-bold">{project.role}</p>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed font-light">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest px-3 py-1 border border-black/10 rounded-full text-muted-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                      View Case Study <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-black/5 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Let's work together</p>
            <a href="mailto:hello@imxinzhang.com" className="text-2xl font-display hover:opacity-60 transition-opacity">
              hello@imxinzhang.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
