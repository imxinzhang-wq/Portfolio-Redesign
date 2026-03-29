import './_group.css';

export function VariantD3() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Title - Even smaller than D2 to match the "smaller font size" request, tighter line height */}
        <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-sans font-medium tracking-[-0.03em] mb-16 lg:mb-28 leading-[0.95] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Content Split - Left Column narrower, right column wider */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Meta Information */}
          <div className="md:col-span-3 flex flex-col gap-10">
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
          <div className="md:col-span-9 md:pl-16 lg:pl-24">
            <h4 className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#1a1918]/40 mb-3 font-bold">
              Project Overview
            </h4>
            <p className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem] font-sans font-light leading-[1.35] text-[#1a1918] tracking-[-0.015em] max-w-[36ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
