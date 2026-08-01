import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect, useState } from "react";

import CustomCursor from "@/components/CustomCursor";
import CaseMedia from "@/components/CaseMedia";

/*
  The same phone-in-hand shot the Darmi card on the home page uses, rather
  than a separate cover: the case study opens on the image the visitor just
  clicked, so the transition lands on something they recognise.

  It is a 4:3 photograph in a 2:1 frame, and the crop is left to object-cover
  on purpose. Centring takes the band the phone already sits in — the trim
  comes off the trees above and the grass below — so there is nothing for an
  object-position to improve on here.
*/
import project2Cover from "@assets/Darmi_home-2640x1971.webp";
import project1Cover from "@assets/Collection_Cover.jpg"; 
import project3Cover from "@assets/Airbnb_Cover_1774813459702.jpg";
import collectionCreateGif from "@assets/Collection-create_1774547429730.mp4";
import collectionGif from "@assets/Collection_1774547429731.mp4";
import creationJpg from "@assets/creation_1774547429731.jpg";
import airbnbSol1 from "@assets/s-blob-v1-IMAGE-DuANVKTdceA_1774776952323.mp4";
import airbnbVoteClip from "@assets/Vote.mp4";
import airbnbBefore from "@assets/Before_1774777767520.png";
import airbnbSearch from "@assets/Search_1774780857668.png";
import airbnbPdp from "@assets/PDP_1774780857668.png";
import airbnbGroup from "@assets/group_1774781372500.png";
import airbnbVote from "@assets/Vote_1774781565815.png";
import collectionExploration from "@assets/Exploration_1774795909258.png";

import darmiProcess1 from "@assets/competiitor_1774794598190.png";
import darmiProcess2 from "@assets/PRD_1774794598191.jpg";
import darmiProcess3 from "@assets/Proto_1774794598191.jpg";
import darmiProcess4 from "@assets/UI-2_1774794598190.png";
import darmiHome from "@assets/1_1783502380043.png";
import darmiAdd from "@assets/2_1783502380046.png";
import darmiInsights from "@assets/3_1783502380047.png";
import directionImage1 from "@assets/direction-1_1775590476908.mp4";
import directionImage2 from "@assets/direction-2_1775590476909.mp4";
import taggingSolution1 from "@assets/s-blob-v1-IMAGE-1zvtK2jYAdI_1775589728784.mp4";
import taggingSolution2 from "@assets/s-blob-v1-IMAGE-7igf2FntVFI_1775589728784.mp4";
import problemImage1 from "@assets/problem-1_1775593076054.jpg";
import problemImage2 from "@assets/problem-2_1775593076055.png";
import taggingCover from "@assets/tagging_cover_1775594426781.jpeg";

const PROJECT_ORDER = ["2", "1", "4", "3"];

const PROJECTS_DATA: Record<string, any> = {
  "1": {
    title: "YouTube Shopping Collections",
    category: "2024 • YouTube",
    description: "Led the vision for Shopping Collections, shifting YouTube Shopping from a video-centric tagging feature into a scalable curation ecosystem for viewers and creators.",
    image: project1Cover,
    tagsTitle: "Project Team",
    tags: ["3 Designers", "2 Researchers", "2 PMs"],
    content: [
      {
        type: "text",
        heading: "The Challenge: Beyond Video-Centric Shopping",
        body: "While YouTube Shopping successfully allowed creators to tag products within specific videos, the experience was fundamentally restricted. We identified three core friction points.",
      },
      {
        type: "list",
        items: [
          "Product recommendations are tied to the video: Our current product tools are fundamentally video-centric, designed for items prominently featured. It fails to address the creator need for a way to share curation beyond the video itself.",
          "We're sending users off-platform: Creators use third-party platforms and links to curate collections. This creates a disjointed and untrustworthy journey for viewers. We lose both engagement and revenue to competitors.",
          "Creators lack tools to build their brand: In today's social commerce landscape, success is about more than just revenue. Creators need dedicated tools to express their unique style and personality."
        ]
      },
      {
        type: "statement",
        heading: "The Strategic Vision",
        text: "A new format for Creators to curate and share their product recommendations while showcasing their unique perspectives and building their brands.",
      },
      {
        type: "image",
        url: collectionExploration,
        caption: "Early explorations during our design sprint",
        fullWidth: true
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
        fixedHeight: true,
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
    description: "Built and launched an IBS tracking app from 0→1 using an AI-assisted workflow, exploring how far a solo designer can go with modern AI tools.",
    image: project2Cover,
    tagsTitle: "Tools",
    tags: ["Gemini", "ChatGPT", "Lovable", "Replit"],
    content: [
      {
        type: "text",
        heading: "Overview",
        body: "I built and launched an IBS tracking app from 0→1 using an AI-assisted workflow. The goal was to explore how far a single designer could go from idea to launch by leveraging AI across research, design, and development. Instead of building a hypothetical concept, I focused on a real problem—managing my own Irritable Bowel Syndrome (IBS)—to ensure the product was grounded in actual use.",
      },
      {
        type: "statement",
        heading: "The Problem",
        text: "IBS users need to identify patterns and triggers across food, lifestyle, and symptoms, but these relationships are often delayed and influenced by multiple factors.",
      },    
      {
        type: "text",
        heading: "AI-Assisted Workflow",
        body: "This project prioritized speed and iteration over extensive upfront design, focusing on getting a functional version into users’ hands early, iterating based on usage and feedback, and using AI to reduce the cost of execution.",
      },
      {
        type: "process-zigzag",
        steps: [
          {
            title: "Research & synthesis",
            description: "Used language models to summarize discussions from Reddit and App Store reviews, helping identify common pain points and gaps in existing solutions.",
            image: darmiProcess1
          },
          {
            title: "Scoping & structure",
            description: "Generated an initial PRD and information architecture to define scope and core flows. These were refined manually to ensure the product remained focused and buildable.",
            image: darmiProcess2
          },
          {
            title: "Design & iteration",
            description: "Skipped traditional high-fidelity prototyping. Used quick sketches and AI-generated UI as a starting point, then manually adjusted layout, spacing, and visual details.",
            image: darmiProcess3
          },
          {
            title: "Development",
            description: "Used AI tools for scaffolding and debugging. A large portion of the application was generated and iterated quickly, while more complex issues required manual intervention and fixes.",
            image: darmiProcess4
          }
        ]
      },
      {
        type: "gallery",
        images: [darmiHome, darmiAdd, darmiInsights]
      },
      {
        type: "metrics",
        heading: "Outcome",
        metrics: [
          { value: "0→1", label: "Launched", description: "Fully functional app deployed" },
          { value: "2K+", label: "Downloads", description: "In the first month of release" },
          { value: "4.9", label: "Rating", description: "Positive early feedback on usability" }
        ]
      },
      {
        type: "text",
        heading: "Reflection",
        body: "This project demonstrated that AI can significantly reduce the time required to move from idea to shipped product, especially for solo-led work. At the same time, it reinforced that AI is most effective when paired with human judgment. AI is useful for generating a baseline and accelerating iteration, but human input is still required for scope control, refinement, and final quality."
      },
      {
        type: "links",
        heading: "Live App",
        links: [
          {
            title: "Download Darmi on the App Store",
            url: "https://apps.apple.com/us/app/darmi-food-symptoms-tracker/id6759197247"
          }
        ]
      }
    ],
  },
  "4": {
    title: "Tagging in Description",
    category: "2024 • YouTube",
    description: "How we drove significant GMV growth by aligning product tagging tools with creator muscle memory.",
    image: taggingCover,
    tagsTitle: "Project Team",
    tags: ["1 Designer", "1 Researcher", "1 Product Manager"],
    content: [
      {
        type: "text",
        heading: "Overview",
        body: "I led the design strategy for Tagging in Description, a workflow-integrated solution that transformed how YouTube creators tag products. By moving the entry point directly into the description box and implementing automated link parsing, we shifted the experience from a high-friction manual task to an intuitive part of the creation process. The final solution now drives 7% of daily GMV.",
      },
      {
        type: "concept-pair",
        heading: "The Problem: Workflow Disconnect",
        borderless: true,
        concepts: [
          {
            eyebrow: "Problem 1",
            title: "Forced Search vs. Direct Links",
            image: problemImage1,
            body: "While creators naturally use direct product links, our tool forced them to manually search for items they already had links for. 42% of creators cited high perceived effort as the reason they didn't tag.",
            imageClassName: "rounded-[16px]"
          },
          {
            eyebrow: "Problem 2",
            title: "Out of Sight, Out of Mind",
            image: problemImage2,
            body: "The tagging tool was buried outside the primary metadata workflow. 48% of creators reported simply forgetting the tool existed because it wasn't visible while they were writing their video descriptions."
          }
        ]
      },
      {
        type: "statement",
        heading: "Strategic Approach",
        text: "The objective was to align tagging with the creator's natural muscle memory: writing descriptions.",
      },
      {
        type: "concept-pair",
        heading: "Design Iterations",
        concepts: [
          {
            eyebrow: "Direction 1",
            title: "Product Chips",
            image: directionImage1,
            upside: "Favored for its modern aesthetic and the ability to verify link trust directly within the editor.",
            constraint: "Research showed potential viewer confusion. More importantly, it was technically unfeasible due to severe engineering constraints within the legacy Studio environment."
          },
          {
            eyebrow: "Direction 2",
            title: "Product Thumbnails",
            image: directionImage2,
            upside: "The preferred model for visual confirmation. Surfacing product images and counts provided immediate proof that link parsing was successful.",
            gap: "The initial feedback loop felt delayed, as status updates weren't obvious until the user manually interacted with the toolbar."
          }
        ],
        conclusion: "While Direction 1 was visually compelling, technical blockers and viewer-side ambiguity led me to prioritize Direction 2. I moved forward with a hybrid approach—leveraging the clear visual feedback of thumbnails while refining the real-time synchronization for a feasible launch."
      },
      {
        type: "list",
        heading: "Solution",
        items: [
          "Entry Point in the Workflow: Moved the tagging entry point directly into the description box to align with the creator's natural workflow, making the feature more intuitive and visible.",
          "Link parsing: Instead of forcing creators to learn our process, we parse links in the description and tag relevant products automatically, while still allowing creators to remove tags or opt out.",
          "Integrated Search Panel: Embedded a lightweight search panel directly into the description box. This removed a disruptive step, addressed the high perceived effort, and made tagging an intuitive part of the creation process to drive adoption."
        ]
      },
      {
        type: "image-row",
        fullWidth: true,
        images: [taggingSolution2, taggingSolution1]
      },
      {
        type: "quote",
        text: "I like it. It's something that lives more obviously in this page because usually I would then have to go to the right hand side scroll down. There's a pop-up. It seems a bit arduous compared to this which is just the icon that's there in the description box……It seems very easy. It's all happening within the same page. Like there's no pop-ups and things like that. So I kind of like how clean it is.",
        author: "User Research Participant"
      },
      {
        type: "list",
        heading: "Leadership & Execution",
        items: [
          "Bridging the PM Gap: I stepped in to lead product direction and milestones during the Product Manager's leave, working directly with engineering to ensure feasible delivery.",
          "Negotiating High-Traffic UI: I convinced the YouTube Studio team to allow a new entry point in the description box, one of the most mature and high-traffic areas of the platform, by showing how the pattern could scale to other features like auto-chapters and location tags.",
          "Navigating Constraints: I led the team through severe UI and engineering constraints by iterating on a mini-search panel that could exist within the established Studio architecture without requiring a full redesign."
        ]
      },
      {
        type: "metrics",
        heading: "Impact & Looking Forward",
        metrics: [
          {
            value: "7%",
            label: "Daily GMV",
            description: "The toolbar, excluding the manual picker, now drives a significant share of daily GMV."
          },
          {
            value: "Positive",
            label: "Creator Validation",
            description: "Creators described the feature as much more convenient and discoverable than previous tagging areas."
          },
          {
            value: "Scalable",
            label: "Future Pattern",
            description: "The integrated entry point created a blueprint for future AI-driven features such as automated timestamps and text styling."
          }
        ]
      }
    ],
  },
  "3": {
    title: "Airbnb WeChat Mini-App",
    category: "2018 • Airbnb",
    description: "Launched Airbnb's first WeChat Mini-app, streamlining the booking journey for the Chinese market.",
    image: project3Cover,
    tagsTitle: "Project Team",
    tags: ["2 Designers", "1 Researcher", "2 PMs"],
    content: [
      {
        type: "text",
        heading: "Background",
        body: "While users frequently discussed and initiated hotel bookings within WeChat, Airbnb’s conversion rates and click-through rates for app downloads from the platform remained low. We identified that our existing mobile web (MoWeb) experience was failing to meet the expectations of the local market.",
      },
      {
        type: "list",
        heading: "The Challenges: The \"Foreign Flow\"",
        items: [
          "Foreign Flow: Our process—from registration and verification to payment—differed from local industry standards, leading to confusion and unfamiliarity among Chinese guests.",
          "Inefficient Consumption: MoWeb was not a priority for the global team; it remained consistent with the desktop experience without optimization, resulting in lengthy and inefficient information delivery.",
          "Global Dependency: While the mobile app was forked for China, any changes to MoWeb still carried global dependencies, creating the risk of impacting global products and slowing local iteration."
        ]
      },
      {
        type: "image",
        url: airbnbBefore,
        caption: "The original MoWeb experience"
      },
      {
        type: "text",
        heading: "The Opportunity",
        body: "In 2018, the introduction of WeChat Mini-apps provided a strategic opening to address these channel issues and unlock new business growth:",
      },
      {
        type: "list",
        items: [
          "Huge Acquisition Potential: Leveraging WeChat’s one billion monthly active users allowed us to acquire users at a significantly lower cost.",
          "Fast and Lightweight: Mini-apps offered built-in verification, native payment methods, and superior performance compared to MoWeb, providing a seamless portal for focused tasks.",
          "China-First Features: We gained the freedom to explore localized experiences—such as Social Voting for group travel—and develop features specific to this unique ecosystem."
        ]
      },
      {
        type: "gallery",
        images: [airbnbSol1, airbnbSearch, airbnbPdp]
      },
      {
        type: "text",
        heading: "The Solution: A Native Ecosystem",
        body: "We designed a localized entry point that prioritized speed and social context:",
      },
      {
        type: "list",
        items: [
          "Streamlined Onboarding: Integrated native WeChat verification and payment to eliminate the \"foreign flow\" friction.",
          "Social Decision Making: Introduced a Voting feature within WeChat groups, allowing users to invite friends to help select listings directly within the chat interface.",
          "Optimized Information Architecture: Replaced the lengthy MoWeb layout with a high-performance, mobile-native interface designed for the specific needs of the WeChat user."
        ]
      },
      {
        type: "gallery",
        images: [airbnbVoteClip, airbnbGroup, airbnbVote]
      },
      {
        type: "metrics",
        heading: "Impact",
        metrics: [
          {
            value: "2M+",
            label: "Users Acquired",
            description: "Within the first month of launch, we reached two million users."
          },
          {
            value: "Shift",
            label: "Channel Dominance",
            description: "Bookings made via the Mini-app quickly surpassed those made through MoWeb."
          },
          {
            value: "Gen Z",
            label: "Strategic Pivot",
            description: "Demographic data provided by WeChat led to a critical shift in our focus, moving from Millennials to Gen Z."
          }
        ]
      }
    ],
  },
};

export default function CaseStudy() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id;
  const project = projectId ? PROJECTS_DATA[projectId] : null;

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Calculate next project
  const projectIds = PROJECT_ORDER.filter((id) => PROJECTS_DATA[id]);
  const currentIndex = projectIds.indexOf(projectId || "");
  const nextIndex = (currentIndex + 1) % projectIds.length;
  const nextProjectId = projectIds[nextIndex];
  const nextProject = PROJECTS_DATA[nextProjectId];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAuthenticated(false);
    setPassword("");
    setError("");
  }, [projectId]);

  if (!project) return <div>Project not found</div>;

  if ((projectId === "1" || projectId === "4") && !isAuthenticated) {
    return (
      <div className="bg-background min-h-screen flex flex-col relative overflow-hidden font-sans cursor-none">
        <CustomCursor />
        <main className="relative z-10 flex-1 flex flex-col">
          <nav className="px-6 md:px-12 py-12 max-w-7xl mx-auto w-full">
            <Link href="/">
              <a className="inline-flex items-center gap-2 eyebrow font-display cursor-none">
                <ArrowLeft className="w-4 h-4" /> Home
              </a>
            </Link>
          </nav>
          
          <div className="flex-1 flex items-center justify-center px-6 pb-32">
            <div className="max-w-md w-full space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight">Protected Project</h1>
                <p className="text-muted-foreground font-normal">This case study requires a password to view.</p>
              </div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (password === "helloworld") {
                    setIsAuthenticated(true);
                    setError("");
                  } else {
                    setError("Incorrect password");
                  }
                }}
                className="space-y-4 relative z-50 pointer-events-auto"
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-card/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-foreground/5 transition-all text-center font-display"
                />
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/80 transition-colors"
                >
                  Unlock
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative overflow-hidden text-foreground selection:bg-accent selection:text-accent-foreground font-sans cursor-none">
      <CustomCursor />
      <main className="relative z-10 pb-12">
        {/* Navigation */}
        <nav className="px-6 md:px-12 py-12 max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="inline-flex items-center gap-2 eyebrow font-display cursor-none">
              <ArrowLeft className="w-4 h-4" /> Home
            </a>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-12 pb-24 max-w-7xl mx-auto w-full">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tighter mb-12 lg:mb-24 leading-[0.9] text-foreground">
                {project.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
                <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-10">
                  <div>
                    <p className="eyebrow text-foreground/40 mb-3 font-bold">
                      Platform &amp; Year
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow text-foreground/40 mb-3 font-bold">
                      {project.tagsTitle || "Project Team"}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {project.tags.map((tag: string) => (
                        <li
                          key={tag}
                          className="text-sm font-medium text-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:col-span-8 lg:col-span-9 lg:pl-12">
                  <p className="eyebrow text-foreground/40 mb-3 font-bold">
                    Project Overview
                  </p>
                  <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.35] text-foreground max-w-[38ch] font-normal">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 md:px-12 mb-32 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full aspect-[2/1] overflow-hidden rounded-[32px]"
          >
            <CaseMedia
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              {section.type === "text" && (
                <div className="max-w-4xl space-y-6">
                  {section.heading && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-6 md:mb-8 leading-[1.15] text-balance">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-base md:text-lg text-foreground/70 font-normal leading-[1.7] md:leading-[1.8] text-pretty max-w-3xl">
                    {section.body}
                  </p>
                </div>
              )}

              {section.type === "image" && (
                <div className="w-full space-y-4 my-8">
                  <div className="w-full overflow-hidden">
                    <CaseMedia
                      src={section.url}
                      alt={section.caption}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {section.caption && (
                    <p className="eyebrow font-display text-muted-foreground">
                      {section.caption}
                    </p>
                  )}
                </div>
              )}

              {section.type === "concept-pair" && (
                <div className="w-full my-12">
                  {section.heading && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-8 md:mb-12 leading-[1.15] text-balance">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-10 md:space-y-14">
                    {section.concepts.map((concept: any, i: number) => (
                      <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
                        <div className="lg:col-span-5 space-y-4 pt-1">
                          <div>
                            <p className="eyebrow font-display text-muted-foreground mb-2">
                              {concept.eyebrow}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-foreground">
                              {concept.title}
                            </h3>
                          </div>
                          <div className="space-y-3 text-base leading-[1.7] md:leading-[1.8] text-foreground/70 font-normal max-w-[34rem]">
                            {concept.body ? (
                              <p>{concept.body}</p>
                            ) : (
                              <>
                                {concept.upside && (
                                  <p>
                                    <span className="font-medium text-foreground">The Upside: </span>
                                    {concept.upside}
                                  </p>
                                )}
                                {concept.constraint && (
                                  <p>
                                    <span className="font-medium text-foreground">The Constraint: </span>
                                    {concept.constraint}
                                  </p>
                                )}
                                {concept.gap && (
                                  <p>
                                    <span className="font-medium text-foreground">The Gap: </span>
                                    {concept.gap}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className={`lg:col-span-7 w-full overflow-hidden ${section.borderless ? '' : 'rounded-[40px] border-2 border-line bg-surface p-2'}`}>
                          <CaseMedia
                            src={concept.image}
                            alt={concept.title}
                            className={`w-full h-auto object-cover ${section.borderless ? '' : 'rounded-[32px]'} ${concept.imageClassName || ''}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {section.conclusion && (
                    <div className="mt-10 max-w-4xl">
                      <p className="text-base md:text-lg text-foreground/70 font-normal leading-[1.7] md:leading-[1.8] text-pretty">
                        {section.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {section.type === "image-row" && (
                <div className={`my-12 ${section.fullWidth ? 'relative left-1/2 -translate-x-1/2 w-[min(100vw-3rem,80rem)] md:w-[min(100vw-6rem,80rem)]' : 'w-full'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                    {section.images.map((img: string, i: number) => (
                      <div key={i} className="w-full overflow-hidden rounded-[40px] border-2 border-line bg-surface p-2">
                        <CaseMedia
                          src={img}
                          alt={`Solution image ${i + 1}`}
                          className="w-full h-auto rounded-[32px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === "gallery" && (
                <div className="w-full my-12">
                  <div className="flex flex-col md:flex-row justify-center gap-6 items-start">
                    {section.images.map((img: string, i: number) => (
                      <div key={i} className={`w-full md:w-[calc((100%-3rem)/3)] shrink-0 overflow-hidden rounded-[40px] border-2 border-line bg-surface p-2 flex flex-col justify-start ${section.fixedHeight ? 'aspect-[360/780]' : ''}`}>
                        <CaseMedia
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          className={`w-full ${section.fixedHeight ? 'h-full object-cover' : 'h-auto'} rounded-[32px]`}
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
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4 md:mb-6 leading-[1.15] text-balance">
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-base md:text-lg text-foreground/70 font-normal leading-[1.7] md:leading-[1.8] text-pretty max-w-3xl">
                      {section.body}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="overflow-hidden w-full">
                      <CaseMedia
                        src={section.imageUrl}
                        alt={section.imageCaption}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {section.imageCaption && (
                      <p className="eyebrow font-display text-muted-foreground mt-4">
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {section.type === "list" && (
                <div className="w-full">
                  {section.heading && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-8 md:mb-12 leading-[1.15] text-balance">
                      {section.heading}
                    </h2>
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
                              <span className="eyebrow font-display text-muted-foreground/50 mt-2">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight text-foreground">
                                {prefix}
                              </h3>
                            </div>
                            <div className="md:w-2/3 pt-1 md:pt-0">
                              <span className="text-base md:text-lg lg:text-xl font-normal text-foreground/70 leading-[1.7] md:leading-[1.8] block">
                                {suffix}
                              </span>
                            </div>
                          </li>
                        );
                      }

                      // Normal layout without splitting
                      return (
                        <li key={i} className="flex items-start gap-6 border-t border-border/10 pt-4">
                          <span className="eyebrow font-display text-muted-foreground/50 mt-2">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-base md:text-lg lg:text-xl font-normal text-foreground/70 leading-[1.7] md:leading-[1.8] max-w-2xl">
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-12 md:mb-16 leading-[1.15] text-balance">
                      {section.heading}
                    </h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {section.metrics.map((metric: any, i: number) => (
                      <div key={i} className="flex flex-col border-t border-border/10 pt-8 overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
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
                          <span className="eyebrow font-display text-foreground mb-4 font-medium block">
                            {metric.label}
                          </span>
                          <p className="text-base text-foreground/70 font-normal leading-[1.7]">
                            {metric.description}
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === "quote" && (
                <div className="max-w-4xl py-10 md:py-16">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[1.25] tracking-tight text-foreground text-balance">
                    "{section.text}"
                  </p>
                  {section.author && (
                    <p className="eyebrow font-display text-muted-foreground mt-6 md:mt-8">
                      — {section.author}
                    </p>
                  )}
                </div>
              )}

              {section.type === "process-zigzag" && (
                <div className="w-full py-12 md:py-20">
                  <div className="space-y-12 md:space-y-24">
                    {section.steps.map((step: any, idx: number) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                        <div className="w-full md:w-[35%] flex flex-col justify-center py-6">
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-6 text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-base md:text-lg text-foreground/70 font-normal leading-[1.7] md:leading-[1.8] max-w-lg">
                            {step.description}
                          </p>
                        </div>
                        <div className="w-full md:w-[65%] rounded-[24px] overflow-hidden bg-surface">
                          <div className="w-full aspect-[4/3] relative overflow-hidden">
                            <CaseMedia 
                              src={step.image} 
                              alt={step.title} 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === "statement" && (
                <div className="max-w-4xl py-10 md:py-16">
                  {section.heading && (
                    <p className="eyebrow font-display text-muted-foreground mb-6 md:mb-8">
                      {section.heading}
                    </p>
                  )}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.2] tracking-tight text-foreground text-balance">
                    {section.text}
                  </h2>
                </div>
              )}

              {section.type === "links" && (
                <div className="w-full pt-8 pb-32 border-t border-border/10 mt-12 mb-16">
                  {section.heading && (
                    <h2 className="eyebrow font-display text-muted-foreground mb-6">
                      {section.heading}
                    </h2>
                  )}
                  <div className="flex flex-col gap-4">
                    {section.links.map((link: any, i: number) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 rounded-2xl bg-card/60 hover:bg-card transition-colors border border-border/50 cursor-none"
                      >
                        <span className="text-xl font-display font-medium text-foreground/70 group-hover:text-foreground transition-colors">
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
        <section className="mt-8 pt-4 pb-8 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {nextProject && (
              <Link href={`/project/${nextProjectId}`}>
                <a className="group flex flex-col space-y-2 cursor-none">
                  <span className="eyebrow font-display text-muted-foreground">
                    Up Next
                  </span>
                  <span className="text-3xl font-display font-medium">
                    {nextProject.title}
                  </span>
                </a>
              </Link>
            )}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="eyebrow font-display font-bold flex items-center gap-2"
            >
              Back to Top <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
