import './_group.css';

export function VariantD2() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Title - Slightly smaller than D1, tighter bottom margin to compensate for removed divider */}
        <h1 className="text-[4rem] md:text-[7rem] lg:text-[8.5rem] font-sans font-medium tracking-[-0.04em] mb-16 lg:mb-24 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Divider removed as requested */}
        
        {/* Content Split - Precise alignment matching the reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Meta Information (Stacked vertically) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-10">
            <div>
              <h4 className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#1a1918]/40 mb-3 font-bold">
                Platform & Year
              </h4>
              <p className="text-[14px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            <div>
              <h4 className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#1a1918]/40 mb-3 font-bold">
                Project Team
              </h4>
              <ul className="flex flex-col gap-1.5">
                <li className="text-[14px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[14px] font-light text-[#1a1918]/60">3 Designers</li>
                <li className="text-[14px] font-light text-[#1a1918]/60">2 Researchers</li>
                <li className="text-[14px] font-light text-[#1a1918]/60">2 PMs</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Overview Text */}
          <div className="md:col-span-8 lg:col-span-9 lg:pl-12">
            <h4 className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#1a1918]/40 mb-3 font-bold">
              Project Overview
            </h4>
            <p className="text-[1.8rem] md:text-[2.4rem] lg:text-[2.75rem] font-sans font-light leading-[1.3] text-[#1a1918] tracking-[-0.015em] max-w-[34ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
