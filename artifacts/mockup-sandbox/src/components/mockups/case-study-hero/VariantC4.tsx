import './_group.css';

export function VariantC4() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Top: Massive Title */}
        <h1 className="text-[4rem] md:text-[7rem] lg:text-[8.5rem] font-display font-medium tracking-[-0.04em] mb-12 lg:mb-16 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Left Column Strategy: Two columns split context/team */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 border-t border-[#1a1918]/15 pt-10">
          
          {/* Left Block (Context) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
              Platform & Year
            </h4>
            <p className="text-[15px] font-medium text-[#1a1918]">
              YouTube — 2024
            </p>
          </div>

          {/* Middle Block (Team) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
              Project Team
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li className="text-[15px] font-medium text-[#1a1918]">Design Lead</li>
              <li className="text-[15px] font-light text-[#1a1918]/70">3 Designers</li>
              <li className="text-[15px] font-light text-[#1a1918]/70">2 Researchers</li>
              <li className="text-[15px] font-light text-[#1a1918]/70">2 PMs</li>
            </ul>
          </div>

          {/* Right Block (Summary) */}
          <div className="lg:col-span-8 lg:pl-12">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
              Project Overview
            </h4>
            <p className="text-2xl md:text-[2.5rem] lg:text-[2.75rem] font-sans font-light leading-[1.3] text-[#1a1918] tracking-[-0.02em]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
