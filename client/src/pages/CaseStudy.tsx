import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect } from "react";

// Import user uploaded image
import darmiImg1 from "@assets/image_1774537420038.png";
// If you want to use the actual Darmi cover from Home, you can import it:
import project2Cover from "@assets/Darmi_Cover.PNG"; 
import project1Cover from "@assets/Collection_Cover.png"; 
import collectionCreateGif from "@assets/Collection-create_1774547429730.gif";
import collectionGif from "@assets/Collection_1774547429731.gif";
import creationJpg from "@assets/creation_1774547429731.jpg";

const PROJECTS_DATA: Record<string, any> = {
  "1": {
    title: "YT Shopping Collections",
    category: "2024 • YouTube",
    description: "Architected Shopping Collections to replace links with a native curation format, driving creator branding and engagement.",
    image: project1Cover,
    tags: ["Design Lead", "3 Designers", "2 Researchers", "2 PMs"],
    content: [
      {
        type: "text",
        heading: "The Challenge: Beyond Video-Centric Shopping",
        body: "While YouTube Shopping successfully allowed creators to tag products within specific videos, the experience was fundamentally restricted. We identified three core friction points.",
      },
      {
        type: "list",
        items: [
          "Product recommendations are tied to the Video: Our current product tools are fundamentally video-centric, designed for items prominently featured. It fails to address the creator need for a way to share curation beyond the video itself.",
          "We're Sending Users Off-Platform: Creators use third-party platforms and links to curate collections. This creates a disjointed and untrustworthy journey for viewers. We lose both engagement and revenue to competitors.",
          "Creators Lack Tools to Build Their Brand: In today's social commerce landscape, success is about more than just revenue. Creators need dedicated tools to express their unique style and personality."
        ]
      },
      {
        type: "statement",
        heading: "The Strategic Vision",
        text: "A new format for Creators to curate and share their product recommendations while showcasing their unique perspectives and building their brands.",
      },
      {
        type: "image",
        url: project1Cover,
        caption: "Exploring native curation formats.",
      },
      {
        type: "list",
        heading: "Design Pillars",
        items: [
          "Low-Effort Creation: Automated 'ready-made' collections based on previous tags and community interests.",
          "Compelling Formats: Introducing color sampling and adaptable layouts to ensure collections felt like a 'shopping destination.'",
          "Amplified Reach: Designing contextual entry points across Search, Shorts, Watch pages, Channel stores and beyond YouTube.",
          "The Feedback Loop: Building an analytics suite so creators could track performance and optimize their curation."
        ]
      },
      {
        type: "gallery",
        images: [
          creationJpg,
          collectionCreateGif,
          collectionGif
        ]
      },
      {
        type: "list",
        heading: "Challenges and how I led through them",
        items: [
          "Leading through unclear ownership: The project lacked clear ownership between Viewer and Creator teams. I stepped up to lead the workstream and aligned both sides on shared goals.",
          "Driving cross-geo, cross-actor alignment: Viewer, Creator, and Affiliate teams across three regions had different priorities. I led a global sprint to align direction and establish a common product vision.",
          "Turning vision into actionable delivery: I partnered with PM and Eng to define phased milestones and shape a realistic roadmap."
        ]
      },
      {
        type: "metrics",
        heading: "Impact & Recognition",
        metrics: [
          {
            value: "83%",
            label: "Pilot Creators",
            description: "found the Collections feature highly useful for curation."
          },
          {
            value: "12%",
            label: "New Adopters",
            description: "were 'new-to-shopping' creators who had never used tagging."
          },
          {
            value: "Press",
            label: "INDUSTRY RECOGNITION",
            description: "Featured in TechCrunch, Business Insider, and other major publications."
          }
        ]
      },
      {
        type: "links",
        heading: "Project Links",
        links: [
          {
            title: "Read the TechCrunch Coverage",
            url: "https://techcrunch.com/2024/04/09/youtube-launches-new-shopping-features-to-help-creators-market-products-and-grow-their-earnings/",
          },
          {
            title: "Watch Official YouTube Launch Video",
            url: "https://youtu.be/fPglZDXS5gM",
          }
        ]
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
    tags: ["Senior Design Lead", "2 Designers", "1 Researcher", "2 PMs"],
    content: [
      {
        type: "text",
        heading: "The Context: The 'Foreign Flow' Friction",
        body: "In 2018, Airbnb China faced a significant hurdle: despite high brand awareness, conversion rates for users coming from WeChat were low. The 'global-first' mobile web (MoWeb) experience was failing the local market.",
      },
      {
        type: "list",
        items: [
          "UX Inefficiency: The MoWeb experience was a desktop port—lengthy, slow, and non-optimized for mobile-first Chinese users.",
          "Friction in Trust: Registration, verification, and payment methods did not align with local industry standards (e.g., lack of WeChat Pay integration).",
          "Technical Dependency: Any MoWeb change required global approval, slowing down the China team’s ability to iterate."
        ]
      },
      {
        type: "split",
        heading: "The Opportunity: A Native Ecosystem",
        body: "We identified the WeChat Mini-app as the strategic solution. This allowed us to build a 'China-first' experience that leveraged 1 billion monthly active users while bypassing the friction of app downloads and global web dependencies.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=2670&auto=format&fit=crop",
        imageCaption: "Mapping the native ecosystem.",
        imageFirst: false,
      },
      {
        type: "gallery",
        images: [
          creationJpg,
          collectionCreateGif,
          collectionGif
        ]
      },
      {
        type: "text",
        heading: "The Solution: Designing for Local Social Contexts",
        body: "I led the design of an MVP that focused on the unique social behaviors of Chinese travelers. This meant designing for speed and connection."
      },
      {
        type: "list",
        items: [
          "Lightweight Onboarding: Built-in WeChat verification and one-click payment to eliminate registration drop-off.",
          "Social Coordination: Recognizing that group travel is dominant in China, we designed a 'Voting' feature, allowing users to share listings directly into WeChat groups for collective decision-making.",
          "Performance-First UI: A streamlined interface designed for speed, moving away from heavy imagery to a more functional, 'get-it-booked' layout."
        ]
      },
      {
        type: "gallery",
        images: [
          creationJpg,
          collectionCreateGif,
          collectionGif
        ]
      },
      {
        type: "list",
        heading: "Outcomes & Strategic Pivot",
        items: [
          "Rapid Acquisition: Reached 2 million users within the first month of launch.",
          "Channel Dominance: Mini-app booking volume quickly surpassed the traditional MoWeb channel.",
          "Strategic Insight: The demographic data from WeChat allowed us to pivot our marketing and design focus from Millennials to the emerging Gen Z traveler."
        ]
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
    <div className="bg-[#f5f0e6] min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
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
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 pt-12">
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
            className="w-full aspect-[2/1] overflow-hidden"
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
                <div className="max-w-4xl space-y-6">
                  {section.heading && (
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-6 md:mb-8 leading-[1.15] text-balance">
                      {section.heading}
                    </h3>
                  )}
                  <p className="text-base md:text-lg text-foreground/70 font-light leading-[1.7] md:leading-[1.8] text-pretty max-w-3xl">
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

              {section.type === "gallery" && (
                <div className="w-full my-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.images.map((img: string, i: number) => (
                      <div key={i} className="w-full aspect-[360/780] overflow-hidden rounded-[40px] border-2 border-[#d4cfc4] bg-[#ebe5da] p-2 flex flex-col justify-start">
                        <img
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          className="w-full h-full object-cover object-top rounded-[32px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === "split" && (
                <div className={`flex flex-col ${section.imageFirst ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}>
                  <div className="w-full md:w-1/2 space-y-6 pt-4">
                    {section.heading && (
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.15] text-balance">
                        {section.heading}
                      </h3>
                    )}
                    <p className="text-base md:text-lg text-foreground/70 font-light leading-[1.7] md:leading-[1.8] text-pretty">
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-8 md:mb-12 leading-[1.15] text-balance">
                      {section.heading}
                    </h3>
                  )}
                  <ul className="space-y-4">
                    {section.items.map((item: string, i: number) => {
                      const idx = item.indexOf(':');
                      const hasColon = idx > 0 && idx < 60;

                      if (hasColon) {
                        const prefix = item.substring(0, idx);
                        const suffix = item.substring(idx + 1).trim();

                        return (
                          <li key={i} className="flex flex-col md:flex-row md:gap-8 gap-4 items-start border-t border-border/10 pt-4">
                            <div className="flex items-start gap-4 md:w-1/3 shrink-0">
                              <span className="text-[10px] font-mono text-muted-foreground opacity-50 mt-2">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xl md:text-2xl font-display font-medium tracking-tight text-foreground">
                                {prefix}
                              </span>
                            </div>
                            <div className="md:w-2/3 pt-1 md:pt-0">
                              <span className="text-base md:text-lg lg:text-xl font-light text-foreground/70 leading-[1.9] block">
                                {suffix}
                              </span>
                            </div>
                          </li>
                        );
                      }

                      // Normal layout without splitting
                      return (
                        <li key={i} className="flex items-start gap-6 border-t border-border/10 pt-4">
                          <span className="text-[10px] font-mono text-muted-foreground mt-2 opacity-50">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-base md:text-lg lg:text-xl font-light text-foreground/70 leading-[1.9] max-w-2xl">
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {section.type === "metrics" && (
                <div className="w-full py-12 md:py-20">
                  {section.heading && (
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-12 md:mb-16 leading-[1.15] text-balance">
                      {section.heading}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {section.metrics.map((metric: any, i: number) => (
                      <div key={i} className="flex flex-col border-t border-border/10 pt-8 overflow-hidden">
                        <motion.div
                          initial={{ y: 40, opacity: 0, rotateX: 45 }}
                          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ 
                            duration: 0.8, 
                            delay: i * 0.15,
                            ease: [0.21, 0.47, 0.32, 0.98] 
                          }}
                        >
                          <span className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tighter text-foreground mb-4 block origin-bottom">
                            {metric.value}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                        >
                          <span className="text-sm font-mono uppercase tracking-widest text-foreground/90 mb-4 font-medium block">
                            {metric.label}
                          </span>
                          <p className="text-base text-foreground/60 font-light leading-relaxed">
                            {metric.description}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === "quote" && (
                <div className="max-w-5xl mx-auto text-center space-y-10 py-16 md:py-24">
                  <p className="text-4xl md:text-6xl font-display font-medium leading-[1.1] tracking-tight text-foreground/90">
                    "{section.text}"
                  </p>
                  {section.author && (
                    <p className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-[0.3em]">
                      — {section.author}
                    </p>
                  )}
                </div>
              )}

              {section.type === "statement" && (
                <div className="max-w-4xl py-10 md:py-16">
                  {section.heading && (
                    <h3 className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6 md:mb-8">
                      {section.heading}
                    </h3>
                  )}
                  <p className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.2] tracking-tight text-foreground text-balance">
                    {section.text}
                  </p>
                </div>
              )}

              {section.type === "links" && (
                <div className="w-full py-8 border-t border-border/10 mt-12">
                  {section.heading && (
                    <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                      {section.heading}
                    </h3>
                  )}
                  <div className="flex flex-col gap-4">
                    {section.links.map((link: any, i: number) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors border border-border/5"
                      >
                        <span className="text-xl font-display font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                          {link.title}
                        </span>
                        <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Footer Navigation */}
        <section className="mt-40 py-24 px-6 md:px-12 max-w-7xl mx-auto">
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
