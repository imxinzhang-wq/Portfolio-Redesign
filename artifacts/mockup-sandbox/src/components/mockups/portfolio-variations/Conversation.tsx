import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Conversation() {
  const [openProjects, setOpenProjects] = useState<number[]>([1]);

  const toggleProject = (id: number) => {
    setOpenProjects(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const projects = [
    {
      id: 1,
      title: "YT Shopping Collections",
      company: "Google",
      year: "2024",
      description: "Architected Shopping Collections to replace links with a native curation format.",
      challenge: "Creators needed a way to organize and showcase curated content without relying on external links.",
      solution: "Built a native in-app curation format that unlocked new creator monetization paths.",
      questions: [
        "What made this project unique?",
        "How did you validate this with creators?",
        "What surprised you during research?"
      ]
    },
    {
      id: 2,
      title: "Darmi IBS food diary",
      company: "Personal Project",
      year: "2026",
      description: "An exploration of Vibe Coding and end-to-end AI workflows—now live on App Store.",
      challenge: "Most food diary apps feel clinical and guilt-inducing.",
      solution: "Created an app that uses AI to understand dietary patterns in a supportive, conversational way.",
      questions: [
        "What's Vibe Coding?",
        "How does AI personalize the experience?",
        "What's next for Darmi?"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faefdc] p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-display font-medium mb-3">Xin Zhang</h1>
          <p className="text-muted-foreground">Product Designer at Google. Let's talk about the work.</p>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project) => {
            const isOpen = openProjects.includes(project.id);
            
            return (
              <div
                key={project.id}
                className={`border rounded-xl transition-all ${
                  isOpen
                    ? 'border-black/10 bg-white/60 backdrop-blur-sm'
                    : 'border-black/5 hover:border-black/10 bg-transparent'
                }`}
              >
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full px-6 py-6 flex items-start justify-between hover:opacity-70 transition-opacity text-left"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-display font-medium mb-2">{project.title}</h2>
                    <div className="flex gap-4 text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">
                      <span>{project.year}</span>
                      <span>{project.company}</span>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 space-y-6 border-t border-black/5">
                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      <div className="bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-lg p-4">
                        <div className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-2">
                          The Challenge
                        </div>
                        <p className="text-sm text-foreground/80">{project.challenge}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-lg p-4">
                        <div className="text-xs uppercase tracking-widest font-bold text-foreground/70 mb-2">
                          Our Solution
                        </div>
                        <p className="text-sm text-foreground/80">{project.solution}</p>
                      </div>
                    </div>

                    {/* Questions */}
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Common Questions
                      </div>
                      <div className="space-y-3">
                        {project.questions.map((q, i) => (
                          <div key={i} className="flex gap-3 text-sm cursor-pointer hover:opacity-70 transition-opacity">
                            <span className="text-muted-foreground/50 font-medium">Q:</span>
                            <span className="text-muted-foreground hover:text-foreground">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-black/10 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">
            Want to dive deeper?
          </p>
          <a href="#" className="inline-block px-6 py-3 bg-foreground text-background rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
            Let's talk
          </a>
        </div>
      </div>
    </div>
  );
}
