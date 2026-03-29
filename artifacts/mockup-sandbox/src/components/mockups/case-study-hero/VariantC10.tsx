import './_group.css';

export function VariantC10() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Title */}
        <h1 className="text-[4.5rem] md:text-[7.5rem] lg:text-[9rem] font-display font-medium tracking-[-0.04em] mb-12 lg:mb-16 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Divider */}
        <div className="h-px w-full bg-[#1a1918]/15 mb-10 lg:mb-12" />
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Left Column: Meta Information */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-10">
            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/45 mb-3 font-semibold">
                Platform & Year
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/45 mb-3 font-semibold">
                Project Team
              </h4>
              <ul className="flex flex-col gap-1">
                <li className="text-[15px] font-medium text-[#1a1918]">Design Lead</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">3 Designers</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">2 Researchers</li>
                <li className="text-[15px] font-light text-[#1a1918]/70">2 PMs</li>
              </ul>
            </div>
          </div>

          {/* Spacer Column for breathing room */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Right Column: Overview Text */}
          <div className="md:col-span-8 lg:col-span-8">
            <h4 className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1918]/45 mb-3 font-semibold">
              Project Overview
            </h4>
            <p className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.6rem] font-sans font-light leading-[1.35] text-[#1a1918] tracking-[-0.015em] max-w-[36ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
