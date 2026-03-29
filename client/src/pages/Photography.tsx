import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Import assets (using same imports as Home for consistency)
const photo1 = "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=2000&auto=format&fit=crop";
const photo2 = "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop";
const photo3 = "https://images.unsplash.com/photo-1542314831-c6a4d140b648?q=80&w=2000&auto=format&fit=crop";
const photo4 = "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop";
const photo5 = "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop";
const photo6 = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop";

const ALL_PHOTOS = [
  { id: 1, title: "Street Life", image: photo1 },
  { id: 2, title: "Cherry Blossoms", image: photo2 },
  { id: 3, title: "Matterhorn", image: photo3 },
  { id: 4, title: "Dubai Creek", image: photo4 },
  { id: 5, title: "Spice Market", image: photo5 },
  { id: 6, title: "City Corner", image: photo6 },
];

export default function Photography() {
  return (
    <div className="bg-background min-h-screen relative text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[5%] w-[50%] h-[50%] bg-[#fbd1a2] morphing-blob opacity-40" />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[100px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-24">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-12 hover:opacity-60 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
        </Link>

        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter mb-6">Visual Archive</h1>
          <p className="text-muted-foreground max-w-lg text-lg font-light">
            A collection of moments captured across 40+ countries. Film photography and visual explorations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group aspect-[3/4] overflow-hidden rounded-[4px] bg-white/20 border border-white/10"
            >
              <img 
                src={photo.image} 
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}