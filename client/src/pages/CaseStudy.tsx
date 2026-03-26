import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect } from "react";

// Import user uploaded image
import darmiImg1 from "@assets/image_1774537420038.png";
// If you want to use the actual Darmi cover from Home, you can import it:
import project2Cover from "@assets/Darmi_Cover.PNG"; 
import project1Cover from "@assets/Collection_Cover.png"; 

const PROJECTS_DATA: Record<string, any> = {
  "1": {
    title: "YT Shopping Collections",
    category: "2024 • YouTube",
    description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1Cover,
    tags: ["Product Design", "UX Strategy", "Prototyping"],
    content: [
      {
        type: "text",
        heading: "The Challenge",
        body: "Today, creators use descriptions to share products that are not in the video but may be relevant to their audience. This helps scale their shoppy recommendations. However, descriptions provide a subpar viewer experience and are difficult for Creators to maintain and curate.",
      }
    ],
  },
  "2": {
    title: "Darmi IBS food diary",
    category: "2026 • Personal Project",
    description: "An exploration of Vibe Coding and end-to-end AI product workflows—now live on the App Store.",
    image: project2Cover,
    tags: ["Mobile UX", "Vibe Coding", "AI Workflows"],
    content: [
      {
        type: "text",
        heading: "Context & Origin",
        body: "In Summer 2026, I experimented with vibe coding to solve a personal challenge: managing Irritable Bowel Syndrome (IBS). Existing tracking apps didn't fit my specific workflow of logging food, emotions, and symptoms. I treated this as both a technical experiment and a product challenge—using modern AI tools to build a custom, functional app from scratch.",
      },
      {
        type: "split",
        heading: "A New Way to Build",
        body: "Instead of traditional design tools, I used natural language to generate the UI and logic directly. This allowed for rapid iteration and testing on-device. The primary design focus was on input speed: reducing the friction of logging multiple entries per day so it wouldn't feel like a chore.",
        imageUrl: darmiImg1,
        imageCaption: "Streamlined daily log interface.",
        imageFirst: false,
      },
      {
        type: "list",
        heading: "Core Features & Interactions",
        items: [
          "One-tap logging for common meals and recurring symptoms",
          "AI-powered insights connecting food intake to flare-ups over time",
          "Minimalist, native iOS feel with smooth haptic micro-interactions",
          "Dark mode optimized for late-night symptom entries",
          "Exportable data reports formatted for medical consultations"
        ]
      },
      {
        type: "image",
        url: darmiImg1,
        caption: "Detailed view of the tracking calendar and entry log.",
      },
      {
        type: "quote",
        text: "The goal wasn't just to build an app, but to explore how AI can collapse the distance between a personal problem and a deployed solution.",
        author: "Project Reflection"
      },
      {
        type: "split",
        heading: "The Iteration Loop",
        body: "Because I was building the app for myself, the feedback loop was instantaneous. I would use the app during lunch, find a UX friction point, and prompt the AI to fix it by dinnertime. This completely redefined my relationship with product development.",
        imageUrl: project2Cover,
        imageCaption: "Final app aesthetics.",
        imageFirst: true,
      }
    ],
  },
  "3": {
    title: "Airbnb WeChat Mini-App",
    category: "2018 • Airbnb",
    description: "Co-led the design and launch of Airbnb's first WeChat Mini-app and shaping its future vision through data-driven sprints",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
    tags: ["China Market", "Localization", "Growth"],
    content: [
      {
        type: "text",
        heading: "Overview",
        body: "In 2018, Airbnb faced a challenge in China: while brand awareness was high, the conversion rate on the mobile web was low because it didn't align with the WeChat-centric lifestyle of Chinese users.",
      },
      {
        type: "split",
        heading: "Friction in Flow",
        body: "The global Airbnb signup/payment flow (email-based) was incompatible with Chinese users' preference for phone-number login and WeChat Pay. The mobile web experience felt like a desktop port and lacked the smoothness of native Chinese apps.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
        imageCaption: "Existing vs proposed flow.",
        imageFirst: true,
      }
    ],
  },
};

export default function CaseStudy() {
  const [match, params] = useRoute("/project/:id");
  const project = params?.id ? PROJECTS_DATA[params.id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match, params]);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Background Elements matching Home */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[40%] h-[40%] bg-[#fbd1a2] morphing-blob" />
        <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] bg-[#7ebdc2] morphing-blob" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[40%] right-[15%] w-[35%] h-[35%] bg-[#efea5a] morphing-blob" style={{ animationDelay: '-8s' }} />
        <div id="main-bg-overlay" className="absolute inset-0 bg-white/20 backdrop-blur-[80px] border-t border-white/30 transition-colors duration-700" />
      </div>

      <main className="relative z-10 pb-32">
        {/* Navigation */}
        <nav className="px-6 md:px-12 py-12 max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest hover:opacity-60 transition-opacity">
              <ArrowLeft className="w-4 h-4" /> Index
            </a>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-12 pb-24 max-w-7xl mx-auto">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-display font-medium tracking-tighter mb-8 leading-[1.05]">
                {project.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 pt-12 border-t border-black/10">
                <div className="md:col-span-8">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="md:col-span-4 space-y-8">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                      Timeline & Context
                    </h4>
                    <p className="text-[15px] font-medium">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                      Disciplines
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {project.tags.map((tag: string, index: number) => (
                        <span
                          key={tag}
                          className="text-[15px] font-light text-foreground/80"
                        >
                          {tag}{index < project.tags.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 md:px-12 mb-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full aspect-[16/9] overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="px-6 md:px-12 max-w-5xl mx-auto space-y-32">
          {project.content.map((section: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              {section.type === "text" && (
                <div className="max-w-3xl space-y-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-4">
                    Chapter 0{idx + 1}
                  </div>
                  {section.heading && (
                    <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
                      {section.heading}
                    </h3>
                  )}
                  <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                    {section.body}
                  </p>
                </div>
              )}

              {section.type === "image" && (
                <div className="w-full space-y-4 my-8">
                  <div className="w-full overflow-hidden">
                    <img
                      src={section.url}
                      alt={section.caption}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {section.caption && (
                    <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
                      {section.caption}
                    </p>
                  )}
                </div>
              )}

              {section.type === "split" && (
                <div className={`flex flex-col ${section.imageFirst ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}>
                  <div className="w-full md:w-1/2 space-y-6">
                    {section.heading && (
                      <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
                        {section.heading}
                      </h3>
                    )}
                    <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="overflow-hidden w-full">
                      <img
                        src={section.imageUrl}
                        alt={section.imageCaption}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {section.imageCaption && (
                      <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest mt-4">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {section.type === "list" && (
                <div className="w-full">
                  {section.heading && (
                    <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-8 pb-4 border-b border-black/10">
                      {section.heading}
                    </h3>
                  )}
                  <ul className="space-y-6">
                    {section.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-6">
                        <span className="text-[10px] font-mono text-muted-foreground mt-1.5 opacity-50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg md:text-xl font-light text-foreground leading-relaxed max-w-2xl">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.type === "quote" && (
                <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
                  <p className="text-2xl md:text-4xl font-display font-medium leading-tight tracking-tight text-foreground/90">
                    "{section.text}"
                  </p>
                  {section.author && (
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                      — {section.author}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Footer Navigation */}
        <section className="mt-40 border-t border-black/10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <Link href="/">
              <a className="group flex flex-col space-y-2">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                  Up Next
                </span>
                <span className="text-3xl font-display font-medium group-hover:text-black/60 transition-colors">
                  Airbnb WeChat Mini-App
                </span>
              </a>
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[11px] font-mono font-bold uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2"
            >
              Back to Top <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
