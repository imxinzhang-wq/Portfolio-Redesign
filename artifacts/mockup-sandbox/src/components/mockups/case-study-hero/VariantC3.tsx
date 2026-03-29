import './_group.css';

export function VariantC3() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col">
      <div className="max-w-[1100px] mx-auto w-full">
        
        {/* Top: Massive Title */}
        <h1 className="text-[4rem] md:text-[6.5rem] lg:text-[7.5rem] font-display font-medium tracking-[-0.03em] mb-16 leading-[0.95] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Separator matches the reference exactly */}
        <div className="h-px w-full bg-[#1a1918]/10 mb-8" />
        
        {/* Content Split */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Left Column: Context & Team (Stacked) */}
          <div className="w-full md:w-[280px] shrink-0 flex flex-col gap-12">
            <div>
              <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-5 font-semibold">
                Platform & Year
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            <div>
              <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-5 font-semibold">
                Project Team
              </h4>
              <ul className="flex flex-col gap-2">
                <li className="text-[15px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[15px] text-[#1a1918]/60">3 Designers</li>
                <li className="text-[15px] text-[#1a1918]/60">2 Researchers</li>
                <li className="text-[15px] text-[#1a1918]/60">2 PMs</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Summary Text */}
          <div className="w-full">
            <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-5 font-semibold">
              Project Overview
            </h4>
            <p className="text-2xl md:text-[2.25rem] lg:text-[2.5rem] font-sans font-light leading-[1.35] text-[#1a1918] tracking-[-0.01em] max-w-[800px]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
