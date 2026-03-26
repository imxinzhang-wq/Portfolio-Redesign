export function EditorialLayout2() {
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

        <div className="space-y-32">
          {MOCK_PROJECTS.map((project, i) => (
            <div key={project.id}>
              {/* Image full width - landscape */}
              <div className="aspect-[21/9] overflow-hidden rounded-[4px] bg-[#FAF7F2] border border-black/[0.03] mb-8">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Text below */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">0{i + 1} / {project.category}</span>
                  <h3 className="text-4xl font-display font-medium">{project.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed font-light max-w-2xl">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-end">
                  <a href="#" className="text-xs font-bold uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity inline-flex items-center gap-2">
                    View case study →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
