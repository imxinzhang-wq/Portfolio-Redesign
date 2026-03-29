import './_group.css';

export function VariantC2() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top: Massive Title - tighter tracking and leading */}
        <h1 className="text-[4rem] md:text-[6.5rem] lg:text-[8.5rem] font-display font-medium tracking-[-0.04em] mb-12 lg:mb-20 leading-[0.9] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 border-t border-[#1a1918]/15 pt-8">
          
          {/* Col 1: Context */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-4">
              Platform & Year
            </h4>
            <p className="text-[14px] font-medium text-[#1a1918]">
              YouTube — 2024
            </p>
          </div>

          {/* Col 2: Team */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-4">
              Project Team
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="text-[14px] font-medium text-[#1a1918]">Design Lead</li>
              <li className="text-[14px] text-[#1a1918]/70">3 Designers</li>
              <li className="text-[14px] text-[#1a1918]/70">2 Researchers</li>
              <li className="text-[14px] text-[#1a1918]/70">2 PMs</li>
            </ul>
          </div>

          {/* Col 3: Summary Text */}
          <div className="md:col-span-8 md:pl-12 lg:pl-24">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-4">
              Project Overview
            </h4>
            <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.3] text-[#1a1918] tracking-tight">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
