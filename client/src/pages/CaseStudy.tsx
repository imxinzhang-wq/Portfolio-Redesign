import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect } from "react";

const PROJECTS_DATA: Record<string, any> = {
  "1": {
    title: "EcoSphere Dashboard",
    category: "Enterprise UX • SaaS",
    description: "Streamlining complex environmental data into actionable insights for global logistics.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
    tags: ["UX Research", "UI Design", "Prototyping"],
    content: [
      {
        type: "text",
        heading: "The Challenge",
        body: "Modern logistics companies face a tidal wave of environmental data. The challenge was to create a dashboard that doesn't just display numbers, but tells a story of impact and opportunity."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        caption: "Early explorations of data visualization patterns."
      },
      {
        type: "text",
        heading: "Solution",
        body: "We implemented a modular widget system that allows logistics managers to customize their view based on regional priorities. By using a 'progressive disclosure' pattern, we kept the interface clean while ensuring deep data was always a click away."
      }
    ]
  },
  "2": {
    title: "NexPay Mobile",
    category: "Fintech • iOS/Android",
    description: "Redesigning the checkout experience for the next generation of digital-native users.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    tags: ["Mobile UX", "Interaction Design", "User Testing"],
    content: [
      {
        type: "text",
        heading: "Context",
        body: "Gen-Z users expect payment flows to be as fluid as their social feeds. Static forms and multi-step redirects were causing significant drop-offs in the legacy app."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
        caption: "The new streamlined checkout flow."
      }
    ]
  },
  "3": {
    title: "Vault Design System",
    category: "Internal Tooling • Systems",
    description: "Building a scalable component library for a team of 50+ designers and engineers.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    tags: ["Design Systems", "Documentation", "Accessibility"],
    content: [
      {
        type: "text",
        heading: "Foundations",
        body: "Consistency at scale requires more than just a library; it requires a shared language. We built Vault from the ground up, starting with semantic tokens that bridge the gap between Figma and React."
      }
    ]
  }
};

export default function CaseStudy() {
  const [match, params] = useRoute("/project/:id");
  const project = params?.id ? PROJECTS_DATA[params.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-background min-h-screen relative text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] right-[5%] w-[50%] h-[50%] bg-[#7ebdc2] morphing-blob opacity-30" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[100px]" />
      </div>

      <main className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-12">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </a>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-12 pb-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6 block">
                {project.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter mb-12">
                {project.title}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5 pt-12">
                <div className="md:col-span-2">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Role</h4>
                    <p className="text-sm text-muted-foreground font-light">Lead Product Designer</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2">Duration</h4>
                    <p className="text-sm text-muted-foreground font-light">6 Months</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-[9px] uppercase tracking-widest px-2 py-1 border border-black/5 rounded-full text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="aspect-[21/9] overflow-hidden rounded-[4px] bg-white/20 border border-white/10"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="container mx-auto px-6 pb-40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              {/* Left Column: Sticky Summary/Heading */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-32 space-y-8">
                  <h3 className="text-3xl font-display font-medium tracking-tight">Project Overview & Insights</h3>
                  <p className="text-muted-foreground font-light leading-relaxed italic border-l-2 border-black/5 pl-6">
                    A deep dive into the design process, from initial research to the final high-fidelity prototype.
                  </p>
                </div>
              </div>

              {/* Right Column: Scrolling Content */}
              <div className="lg:col-span-8 space-y-32">
                {project.content.map((section: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                  >
                    {section.type === "text" ? (
                      <div className="max-w-2xl">
                        <h3 className="text-2xl font-display font-medium mb-6">{section.heading}</h3>
                        <p className="text-lg text-muted-foreground font-light leading-relaxed">
                          {section.body}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="aspect-video overflow-hidden rounded-[4px] bg-white/20 border border-white/10 shadow-sm">
                          <img src={section.url} alt={section.caption} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                        </div>
                        <p className="text-xs text-muted-foreground font-light uppercase tracking-widest italic pl-1">
                          — {section.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="border-t border-black/5 py-24 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
             <Link href="/">
              <a className="text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                Next Project
              </a>
            </Link>
            <Link href="/">
              <a className="text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2">
                Back to Top <ArrowUpRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}