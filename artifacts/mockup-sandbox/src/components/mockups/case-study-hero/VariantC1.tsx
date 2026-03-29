import './_group.css';

export function VariantC1() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top: Massive Title - tighter tracking and leading */}
        <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-display font-medium tracking-[-0.03em] mb-12 leading-[0.95] text-[#1a1918]">
          YT Shopping<br />Collections
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 border-t border-[#1a1918]/15 pt-10">
          
          {/* Col 1: Context */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-3">
                Platform & Year
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                YouTube — 2024
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-3">
                My Role
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                Design Lead
              </p>
            </div>
          </div>

          {/* Col 2: Team */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-3">
              Project Team
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li className="text-[15px] text-[#1a1918]/80">3 Product Designers</li>
              <li className="text-[15px] text-[#1a1918]/80">2 UXR</li>
              <li className="text-[15px] text-[#1a1918]/80">2 Product Managers</li>
            </ul>
          </div>

          {/* Col 3: Summary Text */}
          <div className="md:col-span-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#1a1918]/40 mb-5">
              Project Overview
            </h4>
            <p className="text-2xl md:text-[32px] font-light leading-[1.35] text-[#1a1918] tracking-[-0.01em]">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement across the platform.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
