import { useState } from "react";
import { X } from "lucide-react";

export function IndexGallery() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const projects = [
    { id: 1, title: "YT Shopping Collections", company: "Google", year: "2024", category: "product" },
    { id: 2, title: "Darmi IBS food diary", company: "Personal", year: "2026", category: "personal" },
    { id: 3, title: "Airbnb WeChat Mini-app", company: "Airbnb", year: "2018", category: "mobile" },
    { id: 4, title: "Adobe Research Projects", company: "Adobe", year: "2020", category: "research" },
    { id: 5, title: "Amazon e-commerce", company: "Amazon", year: "2019", category: "product" },
    { id: 6, title: "Photography Collection", company: "Personal", year: "ongoing", category: "visual" },
  ];

  const filters = [
    { label: "All Work", value: "all" },
    { label: "Product Design", value: "product" },
    { label: "Mobile", value: "mobile" },
    { label: "Research", value: "research" },
    { label: "Personal", value: "personal" },
    { label: "Visual", value: "visual" },
  ];

  const filtered = selectedFilter === "all" ? projects : projects.filter(p => p.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#faefdc] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-display font-medium mb-4">Xin Zhang</h1>
          <p className="text-muted-foreground text-lg">Product Designer at Google • Previously: Airbnb, Adobe, Amazon</p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                selectedFilter === filter.value
                  ? "bg-foreground text-background"
                  : "bg-white/60 border border-black/10 text-foreground hover:bg-white/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-4xl opacity-20">→</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-medium text-lg mb-2 group-hover:opacity-70 transition-opacity">{project.title}</h3>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{project.company}</span>
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          Showing {filtered.length} of {projects.length} projects
        </div>
      </div>
    </div>
  );
}
