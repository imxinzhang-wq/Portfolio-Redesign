import './_group.css';

export function VariantC9() {
  return (
    <div className="min-h-screen bg-[#f3efe4] pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Title with slight variation: mixing display and sans for a tailored feel while keeping the tight lockup */}
        <h1 className="text-[4rem] md:text-[7rem] lg:text-[9rem] font-display font-medium tracking-[-0.04em] mb-14 leading-[0.88] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        {/* Hairline Divider */}
        <div className="h-px w-full bg-[#1a1918]/10 mb-12" />
        
        {/* 4-column structure for an even more editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          
          {/* Col 1: Context */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4">
              Platform & Year
            </h4>
            <p className="text-[14px] font-medium text-[#1a1918]">
              YouTube — 2024
            </p>
          </div>

          {/* Col 2: Team */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4">
              Project Team
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li className="text-[14px] font-medium text-[#1a1918]">Design Lead</li>
              <li className="text-[14px] text-[#1a1918]/60">3 Designers</li>
              <li className="text-[14px] text-[#1a1918]/60">2 Researchers</li>
              <li className="text-[14px] text-[#1a1918]/60">2 PMs</li>
            </ul>
          </div>

          {/* Col 3: Overview Text (Span 8) */}
          <div className="md:col-span-6 lg:col-span-8 lg:pl-16">
            <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-4">
              Project Overview
            </h4>
            <p className="text-[1.5rem] md:text-[2rem] lg:text-[2.6rem] font-sans font-light leading-[1.3] text-[#1a1918] tracking-[-0.01em] max-w-[32ch]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
