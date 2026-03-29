import './_group.css';

export function VariantC7() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Massive Title - Matching the reference's tight leading and tracking */}
        <h1 className="text-[4rem] md:text-[7.5rem] lg:text-[9rem] font-sans font-medium tracking-tight mb-14 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Crisp Hairline Divider */}
        <div className="h-px w-full bg-[#1a1918]/10 mb-12" />
        
        {/* Content Split: 3-column / 8-column ratio with an offset */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16">
          
          {/* Left Column: Meta Information (Stacked) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-12">
            
            {/* Meta Block 1 */}
            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4 font-semibold">
                Platform & Year
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            {/* Meta Block 2 */}
            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4 font-semibold">
                Project Team
              </h4>
              <ul className="flex flex-col gap-1.5">
                <li className="text-[15px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">3 Designers</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">2 Researchers</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">2 PMs</li>
              </ul>
            </div>
            
          </div>

          {/* Right Column: Overview Text */}
          <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4 font-semibold">
              Project Overview
            </h4>
            <p className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-sans font-light leading-[1.35] text-[#1a1918] tracking-[-0.01em] max-w-[32ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
