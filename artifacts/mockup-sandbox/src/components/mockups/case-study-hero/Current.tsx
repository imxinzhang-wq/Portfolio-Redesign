import './_group.css';

export function Current() {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-display font-medium tracking-tighter mb-8 leading-[1.05] text-[#1a1918]">
          YT Shopping Collections
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 pt-12">
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1918]/70">
              Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.
            </p>
          </div>
          <div className="md:col-span-4 space-y-8">
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-3">
                Timeline & Context
              </h4>
              <p className="text-[15px] font-medium text-[#1a1918]">
                2024 • YouTube
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#1a1918]/50 mb-3">
                Disciplines
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {["Design Lead", "3 Designers", "2 Researchers", "2 PMs"].map((tag, i, arr) => (
                  <span
                    key={tag}
                    className="text-[15px] font-light text-[#1a1918]/80"
                  >
                    {tag}{i < arr.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
