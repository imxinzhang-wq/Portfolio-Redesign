export function TimelineJourney() {
  const timelineItems = [
    {
      year: "2024",
      company: "Google",
      role: "Product Designer",
      title: "YT Shopping Collections",
      description: "Architected Shopping Collections to replace links with a native curation format",
      color: "from-red-600 to-red-500"
    },
    {
      year: "2020–2023",
      company: "Airbnb",
      role: "Senior Product Designer",
      title: "Airbnb WeChat Mini-app",
      description: "Co-led design and launch of Airbnb's first WeChat Mini-app for China market",
      color: "from-pink-600 to-pink-500"
    },
    {
      year: "2019–2020",
      company: "Adobe Research",
      role: "Design Researcher",
      description: "Explored emerging interaction paradigms and design futures",
      color: "from-blue-600 to-blue-500"
    },
    {
      year: "2018–2019",
      company: "Amazon",
      role: "UX Designer",
      description: "Designed e-commerce experiences for millions of users",
      color: "from-orange-600 to-orange-500"
    },
    {
      year: "2026–Present",
      company: "Personal",
      role: "Creative Technologist",
      title: "Darmi IBS food diary",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on App Store",
      color: "from-purple-600 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faefdc] p-8 text-foreground">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-12 pb-8 border-b border-black/10">
          <h1 className="text-3xl font-display font-medium mb-2">Xin Zhang</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Design Journey</p>
        </nav>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-pink-600 via-blue-600 via-orange-600 to-purple-600" />
          
          {/* Timeline items */}
          <div className="space-y-16">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative pl-24">
                {/* Timeline dot */}
                <div className={`absolute -left-5 top-2 w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {item.year.split('–')[0]}
                </div>
                
                {/* Content */}
                <div className="bg-white/60 rounded-lg p-6 backdrop-blur-sm border border-black/5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-display font-medium">{item.title || item.role}</h3>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{item.year} • {item.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-black/10 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">40+ countries explored • Film photography • Painting</p>
        </div>
      </div>
    </div>
  );
}
