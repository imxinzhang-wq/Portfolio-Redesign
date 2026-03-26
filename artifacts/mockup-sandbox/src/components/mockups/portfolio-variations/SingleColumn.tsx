import { ArrowUpRight } from "lucide-react";

export function SingleColumn() {
  const projects = [
    {
      id: 1,
      title: "YT Shopping Collections",
      company: "Google",
      year: "2024",
      description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
      tags: ["Product Design", "Creator Tools", "Growth"]
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      company: "Personal Project",
      year: "2026",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
      tags: ["AI/ML", "Health Tech", "App Development"]
    },
    {
      id: 3,
      title: "Airbnb WeChat Mini-app",
      company: "Airbnb",
      year: "2018",
      description: "Co-led the design and launch of Airbnb's first WeChat Mini-app, acquiring 2M users in first month and surpassing mobile web bookings.",
      tags: ["Localization", "Mobile", "Growth"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faefdc] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#faefdc] z-50 pb-8 mb-12">
          <h1 className="text-4xl font-display font-medium mb-2">Xin Zhang</h1>
          <p className="text-muted-foreground">Product Designer at Google. Previously: Airbnb, Adobe Research, Amazon.</p>
        </div>

        {/* Section header */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-3">Case Studies</h2>
          <div className="h-px w-full bg-black/5" />
        </div>

        {/* Projects - single column */}
        <div className="space-y-24">
          {projects.map((project, i) => (
            <div key={project.id} className="group">
              {/* Project image placeholder */}
              <div className="mb-8 aspect-video overflow-hidden rounded-[4px] bg-white/60 backdrop-blur-md border border-black/5">
                <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">→</div>
              </div>

              {/* Project info */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
                  0{i + 1} / {project.company}
                </span>
                
                <h3 className="text-4xl font-display font-medium leading-tight group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] uppercase tracking-widest px-3 py-1.5 border border-black/5 rounded-full text-muted-foreground hover:bg-white/60 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View case study CTA */}
                <div className="pt-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
                  >
                    View Case Study <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Divider */}
              {i < projects.length - 1 && (
                <div className="my-24 h-px bg-black/5" />
              )}
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="mt-32 pt-16 border-t border-black/10">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">About</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I moved to the U.S. in 2014 to study Human-Computer Interaction at the University of Michigan. Since then, my work has taken me from California to Switzerland.
            </p>
            <div className="grid grid-cols-1 gap-8 pt-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3">Outside of work</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I'm often traveling — 40+ countries and counting — or shooting film and painting.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-3">Fun Fact</h4>
                <p className="text-muted-foreground leading-relaxed">
                  I hold a Bachelor's degree in Applied Mathematics and was recognized as a Meritorious Winner in the 2013 Mathematical Contest in Modeling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-black/5">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-2">
                Let's build the future together
              </p>
              <a href="mailto:hello@imxinzhang.com" className="text-2xl font-display hover:opacity-60 transition-opacity">
                hello@imxinzhang.com
              </a>
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
              <a href="#" className="hover:text-foreground">Resume</a>
              <a href="#" className="hover:text-foreground">LinkedIn</a>
              <a href="#" className="hover:text-foreground">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
