import React from "react";

const steps = [
  {
    title: "Research & synthesis",
    description: "Used language models to summarize discussions from Reddit and App Store reviews, helping identify common pain points and gaps in existing solutions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Scoping & structure",
    description: "Generated an initial PRD and information architecture to define scope and core flows. These were refined manually to ensure the product remained focused and buildable.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Design & iteration",
    description: "Skipped traditional high-fidelity prototyping. Used quick sketches and AI-generated UI as a starting point, then manually adjusted layout, spacing, and visual details.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    title: "Development",
    description: "Used AI tools for scaffolding and debugging. A large portion of the application was generated and iterated quickly, while more complex issues required manual intervention and fixes.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function VariantA() {
  return (
    <div className="w-full bg-[#f5f0e6] p-8 md:p-16 font-sans">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-display font-medium mb-12 text-[#1a1918]">AI-Assisted Workflow</h3>
        
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 items-stretch group">
              <div className={`w-full md:w-1/2 rounded-[24px] overflow-hidden bg-[#ebe5da] ${idx % 2 !== 0 ? 'md:order-last' : ''}`}>
                {/* aspect-[4/3] enforces a consistent ratio and crops irregular images gracefully */}
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center py-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4 font-bold">
                  Step 0{idx + 1}
                </span>
                <h4 className="text-2xl md:text-3xl font-display font-medium mb-4 text-[#1a1918]">
                  {step.title}
                </h4>
                <p className="text-base md:text-lg text-[#1a1918]/70 font-light leading-[1.8]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}