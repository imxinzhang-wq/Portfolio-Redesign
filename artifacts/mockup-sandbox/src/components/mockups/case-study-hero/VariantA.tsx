import './_group.css';

export function VariantA() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-display font-medium tracking-tighter mb-8 leading-[1.05] text-[#1a1918]">
          YT Shopping Collections
        </h1>
        
        <div className="max-w-4xl mb-12">
          <p className="text-xl md:text-3xl font-light leading-relaxed text-[#1a1918]/80">
            Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.
          </p>
        </div>

        {/* Horizontal Meta Bar */}
        <div className="border-t border-[#1a1918]/10 pt-8 flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50">
              Timeline & Context
            </h4>
            <p className="text-[15px] font-medium text-[#1a1918]">
              2024 • YouTube
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50">
              Disciplines
            </h4>
            <p className="text-[15px] font-medium text-[#1a1918]">
              Design Lead, 3 Designers, 2 Researchers, 2 PMs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
