export function EditorialLayout3() {
  const MOCK_PROJECTS = [
    {
      id: 1,
      title: "YT Shopping Collections",
      category: "2024 • YouTube",
      description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      category: "2026 • Personal Project",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Airbnb WeChat Mini-app",
      category: "2018 • Airbnb",
      description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    }
  ];

  return (
    <div className="bg-[#faefdc] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">Case Studies</h2>
          <div className="h-px w-full bg-black/5" />
        </div>

        <div className="space-y-20">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id} className="border-b border-black/5 pb-20 last:border-0">
              <div className="grid grid-cols-4 gap-8 items-start">
                {/* Left: Number + Category */}
                <div className="col-span-1">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground/60 block mb-2">0{i + 1}</span>
                  <span className="text-xs uppercase tracking-[0.2em] font-light text-muted-foreground/40">{project.category}</span>
                </div>

                {/* Center: Title + Description */}
                <div className="col-span-2 space-y-4">
                  <h3 className="text-3xl font-display font-medium leading-tight">{project.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Right: Image - portrait square */}
                <div className="col-span-1 aspect-square overflow-hidden rounded-[4px] bg-[#FAF7F2] border border-black/[0.03]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
