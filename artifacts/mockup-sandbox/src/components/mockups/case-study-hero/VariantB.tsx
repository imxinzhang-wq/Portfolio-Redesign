import './_group.css';

export function VariantB() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column: Title and Summary */}
        <div className="lg:col-span-8 flex flex-col justify-between min-h-[40vh]">
          <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-display font-medium tracking-tighter leading-[1.05] text-[#1a1918]">
            YT Shopping Collections
          </h1>
          
          <div className="mt-12 lg:mt-auto">
            <p className="text-xl md:text-3xl font-light leading-relaxed text-[#1a1918]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.
            </p>
          </div>
        </div>

        {/* Right Column: Meta Info as Sticky Aside */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <div className="bg-[#ebe5da] p-8 rounded-[32px] border border-[#d4cfc4]">
            <div className="space-y-8">
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/60 mb-3">
                  Timeline & Context
                </h4>
                <p className="text-[15px] font-medium text-[#1a1918]">
                  2024 • YouTube
                </p>
              </div>
              
              <div className="h-px w-full bg-[#1a1918]/10" />
              
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/60 mb-3">
                  Disciplines
                </h4>
                <ul className="space-y-2">
                  {["Design Lead", "3 Designers", "2 Researchers", "2 PMs"].map(tag => (
                    <li key={tag} className="text-[15px] text-[#1a1918] flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#1a1918]/30" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
