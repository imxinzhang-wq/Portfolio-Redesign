import './_group.css';

export function VariantC() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top: Massive Title */}
        <h1 className="text-[3rem] md:text-[5.5rem] lg:text-[7rem] font-display font-medium tracking-tighter mb-16 leading-[1]">
          YT Shopping<br />Collections
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 border-t border-[#1a1918]/10 pt-12">
          
          {/* Left: Highly Structured Meta Grid */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-4">
                Platform & Year
              </h4>
              <p className="text-xl font-display font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>
            
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-4">
                Project Team
              </h4>
              <ul className="flex flex-col gap-2">
                <li className="text-[15px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[15px] text-[#1a1918]/70">3 Designers</li>
                <li className="text-[15px] text-[#1a1918]/70">2 Researchers</li>
                <li className="text-[15px] text-[#1a1918]/70">2 PMs</li>
              </ul>
            </div>
          </div>

          {/* Right: Large Summary Text */}
          <div className="lg:col-span-8">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-6 lg:mb-8">
              Project Overview
            </h4>
            <p className="text-2xl md:text-4xl font-light leading-snug text-[#1a1918]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
