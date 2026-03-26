import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function MinimalistSingular() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "YT Shopping Collections",
      company: "Google",
      year: "2024",
      description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
      color: "bg-red-50"
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      company: "Personal Project",
      year: "2026",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on the App Store.",
      color: "bg-blue-50"
    },
    {
      id: 3,
      title: "Airbnb WeChat Mini-app",
      company: "Airbnb",
      year: "2018",
      description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
      color: "bg-pink-50"
    }
  ];

  const current = projects[currentIndex];
  const next = () => setCurrentIndex((currentIndex + 1) % projects.length);
  const prev = () => setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);

  return (
    <div className={`min-h-screen flex flex-col ${current.color} transition-colors duration-1000`}>
      {/* Header */}
      <div className="p-6 border-b border-black/20">
        <h1 className="text-base font-display font-medium">Xin Zhang</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-12 py-20 text-center">
        <div className="max-w-2xl space-y-12">
          {/* Count */}
          <div className="text-xs uppercase tracking-widest text-black/40 font-bold">
            Project {currentIndex + 1} of {projects.length}
          </div>

          {/* Title & Company */}
          <div className="space-y-4">
            <h2 className="text-5xl font-display font-medium leading-tight">{current.title}</h2>
            <p className="text-lg text-black/60">
              {current.company} • {current.year}
            </p>
          </div>

          {/* Description */}
          <div className="max-w-xl mx-auto">
            <p className="text-xl text-black/70 leading-relaxed font-light">
              {current.description}
            </p>
          </div>

          {/* Image placeholder */}
          <div className="w-full aspect-video bg-white border border-black/20 rounded-sm" />
        </div>
      </div>

      {/* Navigation */}
      <div className="px-12 py-8 border-t border-black/20 flex items-center justify-between">
        <button
          onClick={prev}
          className="p-3 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? "bg-black w-8" : "bg-black/30"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer */}
      <div className="px-12 py-6 text-center text-xs uppercase tracking-widest text-black/40">
        <p>Learn more at xin.design</p>
      </div>
    </div>
  );
}
