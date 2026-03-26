import { ArrowUpRight } from "lucide-react";

export function BoldModular() {
  const projects = [
    {
      id: 1,
      title: "YT Shopping",
      company: "Google",
      year: "2024",
      color: "from-red-600 to-red-500",
      textColor: "text-white",
      bgColor: "bg-red-600"
    },
    {
      id: 2,
      title: "Darmi",
      company: "Personal",
      year: "2026",
      color: "from-blue-600 to-blue-500",
      textColor: "text-white",
      bgColor: "bg-blue-600"
    },
    {
      id: 3,
      title: "Airbnb WeChat",
      company: "Airbnb",
      year: "2018",
      color: "from-pink-600 to-pink-500",
      textColor: "text-white",
      bgColor: "bg-pink-600"
    }
  ];

  const visuals = [
    { id: 1, title: "Street Life", color: "bg-yellow-400" },
    { id: 2, title: "Blossoms", color: "bg-purple-500" },
    { id: 3, title: "Mountains", color: "bg-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="mb-20">
        <h1 className="text-5xl font-display font-bold text-white tracking-tighter mb-2">
          Xin Zhang
        </h1>
        <div className="flex gap-4 text-xs uppercase tracking-widest text-white/70 font-bold">
          <span>Product Designer</span>
          <span>Google</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mb-24">
        <h2 className="text-sm uppercase tracking-widest font-bold text-white/50 mb-8">Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href="#"
              className={`group bg-gradient-to-br ${project.color} rounded-lg p-8 cursor-pointer hover:scale-105 transition-transform`}
            >
              <div className="aspect-video bg-black/20 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white/30 text-4xl font-bold">{project.year}</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-2xl font-display font-bold ${project.textColor} mb-2`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm ${project.textColor}/80 uppercase tracking-widest font-bold`}>
                    {project.company}
                  </p>
                </div>
                <ArrowUpRight className={`w-6 h-6 ${project.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Visuals */}
      <div className="mb-24">
        <h2 className="text-sm uppercase tracking-widest font-bold text-white/50 mb-8">Photography</h2>
        <div className="grid grid-cols-3 gap-4">
          {visuals.map((visual) => (
            <div key={visual.id} className={`aspect-square ${visual.color} rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center`}>
              <span className="text-white font-bold text-sm text-center px-4">{visual.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="border-t border-white/10 pt-12">
        <h2 className="text-2xl font-display font-bold text-white mb-4">About</h2>
        <div className="max-w-2xl">
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            Product Designer at Google. Previously: Airbnb, Adobe, Amazon.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Travel, film photography, painting. HCI degree. Math contest winner.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <a href="mailto:hello@imxinzhang.com" className="text-white font-display text-xl hover:opacity-70 transition-opacity">
          hello@imxinzhang.com
        </a>
        <div className="flex gap-6 text-xs uppercase tracking-widest font-bold text-white/50">
          <a href="#" className="hover:text-white transition-colors">Resume</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </div>
  );
}
