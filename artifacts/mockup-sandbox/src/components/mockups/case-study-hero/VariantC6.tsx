import './_group.css';

export function VariantC6() {
  return (
    <div className="min-h-screen bg-[#f3efe6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1300px] mx-auto w-full">
        
        {/* Massive Title */}
        <h1 className="text-[4rem] md:text-[7.5rem] lg:text-[9.5rem] font-sans font-medium tracking-[-0.05em] mb-12 lg:mb-16 leading-[0.85] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Hairline Divider */}
        <div className="h-px w-full bg-[#1a1918]/15 mb-8" />
        
        {/* Content Split: 4-col offset structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Meta Information */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-10">
            
            {/* Meta Block 1 */}
            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
                Platform & Year
              </h4>
              <p className="text-[16px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            {/* Meta Block 2 */}
            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
                Project Team
              </h4>
              <ul className="flex flex-col gap-1.5">
                <li className="text-[16px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[16px] font-light text-[#1a1918]/70">3 Designers</li>
                <li className="text-[16px] font-light text-[#1a1918]/70">2 Researchers</li>
                <li className="text-[16px] font-light text-[#1a1918]/70">2 PMs</li>
              </ul>
            </div>
            
          </div>

          {/* Right Column: Overview Text - offset to start at col 5 on large screens */}
          <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/50 mb-4 font-semibold">
              Project Overview
            </h4>
            <p className="text-[1.8rem] md:text-[2.4rem] lg:text-[2.8rem] font-sans font-light leading-[1.3] text-[#1a1918] tracking-[-0.01em] max-w-[34ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
