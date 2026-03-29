import React from "react";

const steps = [
  {
    title: "Research & synthesis",
    description: "Used language models to summarize discussions from Reddit and App Store reviews, helping identify common pain points and gaps in existing solutions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    colSpan: "md:col-span-8",
    aspect: "aspect-[16/9]"
  },
  {
    title: "Scoping & structure",
    description: "Generated an initial PRD and information architecture to define scope and core flows. These were refined manually to ensure the product remained focused and buildable.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2000&auto=format&fit=crop",
    colSpan: "md:col-span-4",
    aspect: "aspect-[3/4]"
  },
  {
    title: "Design & iteration",
    description: "Skipped traditional high-fidelity prototyping. Used quick sketches and AI-generated UI as a starting point, then manually adjusted layout, spacing, and visual details.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop",
    colSpan: "md:col-span-5",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Development",
    description: "Used AI tools for scaffolding and debugging. A large portion of the application was generated and iterated quickly, while more complex issues required manual intervention and fixes.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    colSpan: "md:col-span-7",
    aspect: "aspect-[3/2]"
  }
];

export default function VariantB() {
  return (
    <div className="w-full bg-[#f5f0e6] p-8 md:p-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <h3 className="text-3xl md:text-5xl font-display font-medium mb-6 text-[#1a1918]">AI-Assisted Workflow</h3>
          <p className="text-lg text-[#1a1918]/60 font-light">AI was used as a supporting layer throughout the product lifecycle. Here is a glimpse into the process artifacts.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className={`${step.colSpan} flex flex-col group`}>
              <div className={`w-full ${step.aspect} rounded-[24px] overflow-hidden bg-[#ebe5da] mb-6 relative`}>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#1a1918] text-[#f5f0e6] flex items-center justify-center text-[10px] font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="text-xl font-display font-medium text-[#1a1918]">
                    {step.title}
                  </h4>
                </div>
                <p className="text-sm md:text-base text-[#1a1918]/70 font-light leading-[1.6]">
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