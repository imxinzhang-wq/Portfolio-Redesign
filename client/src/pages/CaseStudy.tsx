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
          "Video-Centric Limitations: Product discovery was tied to a single video's lifecycle, failing to support creators who wanted to curate long-term recommendations.",
          "Off-Platform Leakage: Creators were forced to use third-party tools (e.g., LTK, Amazon Storefronts) to build shoppable lists, leading to a disjointed user journey and lost revenue.",
          "Brand Identity Gap: Creators lacked a native way to express their unique aesthetic and 'vibe' through product curation."
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
          "Amplified Reach: Designing contextual entry points across Search, Shorts, Watch pages, and Channel stores.",
          "The Feedback Loop: Building an analytics suite so creators could track performance and optimize their curation."
        ]
      },
      {
        type: "gallery",
        images: [
          collectionCreateGif,
          creationJpg,
          collectionGif
        ]
      },
      {
        type: "text",
        heading: "Leadership & Cross-Functional Alignment",
        body: "As the lead, I navigated significant organizational complexity to bring this vision to life. I stepped in to lead the workstream when ownership between the Viewer and Creator teams was unclear, aligning both sides on a unified set of KPIs. I facilitated a global design sprint to align the priorities of Viewer, Creator, and Affiliate teams across three different geographic regions, and partnered with PMs and Engineering to translate a broad vision into actionable, phased milestones for a successful April 2024 pilot."
      },
      {
        type: "list",
        heading: "Impact & Recognition",
        items: [
          "83% of creators in the pilot found the Collections feature highly useful.",
          "12% of users were 'new-to-shopping' creators who had never used tagging before.",
          "Positive Press: Featured in TechCrunch and Business Insider as a significant evolution of YouTube’s social commerce strategy."
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

              {section.type === "gallery" && (
                <div className="w-full my-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.images.map((img: string, i: number) => (
                      <div key={i} className="w-full overflow-hidden rounded-3xl border-[0.5px] border-white/50 bg-white/5 p-2">
                        <img
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          className="w-full h-auto object-cover rounded-[20px]"
                        />
                      </div>
                    ))}
                  </div>
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
                    <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight mb-8">
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

              {section.type === "statement" && (
                <div className="max-w-4xl py-8">
                  {section.heading && (
                    <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">
                      {section.heading}
                    </h3>
                  )}
                  <p className="text-3xl md:text-5xl font-display font-medium leading-tight tracking-tight text-foreground">
                    {section.text}
                  </p>
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
