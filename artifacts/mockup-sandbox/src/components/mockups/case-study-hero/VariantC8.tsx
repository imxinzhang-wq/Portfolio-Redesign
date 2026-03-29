import './_group.css';

export function VariantC8() {
  return (
    <div className="min-h-screen bg-[#f3efe4] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1100px] mx-auto w-full">
        
        {/* Title matches the reference's massive, tight sans-serif look */}
        <h1 className="text-[4rem] md:text-[7rem] lg:text-[8.5rem] font-sans font-medium tracking-[-0.05em] mb-12 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Hairline Divider */}
        <div className="h-px w-full bg-[#1a1918]/10 mb-10" />
        
        {/* Grid matching the exact alignment of the reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Meta Information */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-10">
            <div>
              <h4 className="text-[9px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/40 mb-3 font-semibold">
                Platform & Year
              </h4>
              <p className="text-[14px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            <div>
              <h4 className="text-[9px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/40 mb-3 font-semibold">
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
          <div className="md:col-span-8 lg:col-span-9 lg:pl-8">
            <h4 className="text-[9px] font-sans uppercase tracking-[0.15em] text-[#1a1918]/40 mb-3 font-semibold">
              Project Overview
            </h4>
            {/* The summary text is very large and light, matching the reference */}
            <p className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.5rem] font-sans font-light leading-[1.3] text-[#1a1918] tracking-[-0.01em] max-w-[34ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
