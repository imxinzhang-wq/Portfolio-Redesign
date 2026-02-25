import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Layout } from "lucide-react";
import { useRoute, Link } from "wouter";
import { useEffect } from "react";

const PROJECT_DETAILS: Record<string, any> = {
  "1": {
    title: "EcoSphere Dashboard",
    category: "Enterprise UX • SaaS",
    description: "EcoSphere is a comprehensive environmental data platform designed for global logistics companies to monitor and offset their carbon footprint in real-time.",
    challenge: "Logistics companies struggled to visualize fragmented carbon emission data across multi-modal transport chains, leading to inefficient offsetting strategies.",
    solution: "We designed a centralized dashboard that aggregates IoT data from vessels, trucks, and planes, providing a unified view with predictive analytics for future emissions.",
    impact: "Reduced manual reporting time by 70% and improved carbon offset accuracy by 25% for our initial beta partners.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
    color: "#fbd1a2"
  },
  "2": {
    title: "NexPay Mobile",
    category: "Fintech • iOS/Android",
    description: "NexPay is a next-generation mobile wallet focused on seamless cross-border payments and micro-investments for digital nomads.",
    challenge: "The existing payment apps were cluttered and intimidating for non-financial users, especially when dealing with multiple currencies.",
    solution: "A 'flow-state' checkout experience that uses biometric authentication and intelligent currency routing to minimize friction.",
    impact: "Achieved a 4.8 star rating on the App Store within the first 3 months and processed over $10M in cross-border transactions.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    color: "#7ebdc2"
  },
  "3": {
    title: "Vault Design System",
    category: "Internal Tooling • Systems",
    description: "Vault is a living design system created to unify the user experience across 12 distinct product lines at a major tech firm.",
    challenge: "Design debt and inconsistent UI patterns were slowing down development cycles and confusing end-users.",
    solution: "A token-based architecture with multi-platform support (Web, iOS, Android) and comprehensive documentation integrated into the developer workflow.",
    impact: "Decreased UI-related development time by 40% and improved design-to-engineering handoff efficiency significantly.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    color: "#efea5a"
  }
};

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const project = params?.id ? PROJECT_DETAILS[params.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div className="p-20 text-center">Project not found</div>;

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#2a2a2a] font-sans selection:bg-black selection:text-white">
      {/* Background Blobs (matching Home) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] morphing-blob opacity-30" 
          style={{ backgroundColor: project.color, filter: 'blur(100px)' }} 
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
      </div>

      <header className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{project.category}</span>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tighter mb-12">{project.title}</h1>
          
          <div className="aspect-video w-full rounded-[3rem] overflow-hidden mb-24 shadow-2xl border border-white/20">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Role</h4>
                <p className="text-lg">Lead Product Designer</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Timeline</h4>
                <p className="text-lg">6 Months (2025)</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">Deliverables</h4>
                <ul className="text-lg space-y-2">
                  <li>UX Strategy</li>
                  <li>UI Framework</li>
                  <li>Interactive Prototype</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-24">
              <section>
                <h2 className="text-3xl font-display font-medium mb-8">Overview</h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">{project.description}</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-10 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-white/20">
                  <ShieldCheck className="w-8 h-8 mb-6 text-primary" />
                  <h3 className="text-xl font-bold mb-4">The Challenge</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{project.challenge}</p>
                </div>
                <div className="p-10 rounded-[2rem] bg-white/50 backdrop-blur-sm border border-white/20">
                  <Zap className="w-8 h-8 mb-6 text-primary" />
                  <h3 className="text-xl font-bold mb-4">The Solution</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <section className="p-12 rounded-[3rem] bg-black text-white relative overflow-hidden">
                <div className="relative z-10">
                  <Layout className="w-8 h-8 mb-6 opacity-50" />
                  <h2 className="text-3xl font-display font-medium mb-8">The Impact</h2>
                  <p className="text-2xl md:text-4xl font-display leading-tight">{project.impact}</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
              </section>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-20 px-6 border-t border-black/5 text-center">
        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-8">Next Project</p>
        <Link href={`/project/${params?.id === "3" ? "1" : Number(params?.id) + 1}`}>
          <h3 className="text-4xl md:text-6xl font-display font-medium hover:opacity-50 transition-opacity cursor-pointer">
            Explore More <ExternalLink className="inline w-8 h-8 md:w-12 md:h-12 ml-4" />
          </h3>
        </Link>
      </footer>
    </div>
  );
}