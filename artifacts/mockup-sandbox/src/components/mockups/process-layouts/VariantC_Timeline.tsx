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

export default function VariantC() {
  return (
    <div className="w-full bg-[#f5f0e6] p-8 md:p-16 font-sans">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-display font-medium mb-16 text-[#1a1918]">AI-Assisted Workflow</h3>
        
        <div className="relative border-l border-[#1a1918]/10 pl-8 md:pl-12 ml-4 md:ml-6 space-y-24">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-[10px] h-[10px] rounded-full bg-[#f5f0e6] border-[2px] border-[#1a1918] group-hover:scale-150 transition-transform duration-300 z-10" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 md:sticky md:top-32">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-2 block font-bold">
                    Phase 0{idx + 1}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-display font-medium mb-4 text-[#1a1918]">
                    {step.title}
                  </h4>
                  <p className="text-base text-[#1a1918]/70 font-light leading-[1.8]">
                    {step.description}
                  </p>
                </div>
                
                <div className="md:col-span-7">
                  {/* Container with a defined aspect ratio to handle varied image sizes */}
                  <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#ebe5da] shadow-sm border border-[#1a1918]/5">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}