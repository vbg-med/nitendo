import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Crosshair, AlertTriangle, ShieldCheck, ExternalLink, Github } from "lucide-react";
import { NeonButton } from "../ui/CyberUI";
import { ImageWithFallback } from "../figma/ImageWithFallback";
const MISSIONS = [
    {
        id: "m1",
        title: "PROJECT NEBULA",
        client: "CORPO-X",
        difficulty: "EXTREME",
        status: "COMPLETED",
        desc: "A highly classified e-commerce platform built for a mega-corporation. Features real-time inventory tracking and AI-driven recommendations.",
        tech: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        color: "primary"
    },
    {
        id: "m2",
        title: "SYNTH-WAVE OS",
        client: "REBELLION",
        difficulty: "HARD",
        status: "IN_PROGRESS",
        desc: "A web-based operating system interface for remote server management. Fully responsive with window management and terminal access.",
        tech: ["React", "Zustand", "Framer Motion", "WebSockets"],
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
        color: "secondary"
    },
    {
        id: "m3",
        title: "DATA HEIST",
        client: "UNKNOWN",
        difficulty: "NORMAL",
        status: "COMPLETED",
        desc: "A data visualization dashboard scraping public records to identify anomalies in market trends. High performance canvas rendering.",
        tech: ["Vue.js", "D3.js", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        color: "accent"
    }
];
export function ProjectsView() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextMission = () => setCurrentIndex((prev) => (prev + 1) % MISSIONS.length);
    const prevMission = () => setCurrentIndex((prev) => (prev === 0 ? MISSIONS.length - 1 : prev - 1));
    const current = MISSIONS[currentIndex];
    const diffColors = {
        "NORMAL": "text-emerald-400 border-emerald-400",
        "HARD": "text-yellow-400 border-yellow-400",
        "EXTREME": "text-secondary border-secondary",
    };
    return (<div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-primary/30 pb-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-['Orbitron'] text-primary uppercase tracking-widest flex items-center gap-3">
            <Crosshair size={24}/> Mission Archive
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">SELECT TARGET DOSSIER</p>
        </div>
        <div className="flex gap-2">
          <NeonButton onClick={prevMission} className="!px-3"><ChevronLeft size={16}/></NeonButton>
          <NeonButton onClick={nextMission} className="!px-3"><ChevronRight size={16}/></NeonButton>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center min-h-0">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} transition={{ duration: 0.4 }} className="w-full max-w-4xl h-full flex flex-col md:flex-row glass-panel border border-primary/30 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group">
            {/* Holographic scanning overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <motion.div className="w-full h-8 bg-gradient-to-b from-transparent via-primary/10 to-transparent" animate={{ top: ["-10%", "110%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} style={{ position: "absolute" }}/>
            </div>

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-full border-r border-primary/20">
              <ImageWithFallback src={current.image} alt={current.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-125 group-hover:opacity-80 transition-opacity"/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-black/80 border border-primary text-primary px-2 py-1 text-[10px] font-mono flex items-center gap-2">
                  <ShieldCheck size={12}/> {current.status}
                </span>
                <span className={`bg-black/80 border px-2 py-1 text-[10px] font-mono flex items-center gap-2 w-fit ${diffColors[current.difficulty]}`}>
                  <AlertTriangle size={12}/> THREAT: {current.difficulty}
                </span>
              </div>
              
              <div className="absolute bottom-4 left-4 z-10 font-mono text-xs text-primary/70">
                [IMG_REF: {current.id.toUpperCase()}_SYS]
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative bg-black/60 z-10">
              <div className="text-[10px] text-muted-foreground font-mono mb-2">CLIENT: {current.client}</div>
              <h2 className="text-3xl font-['Orbitron'] font-bold text-white mb-4 glow-text-primary uppercase">
                {current.title}
              </h2>
              
              <div className="h-px w-full bg-gradient-to-r from-primary to-transparent mb-6"></div>
              
              <p className="text-sm font-mono text-gray-300 leading-relaxed mb-6 flex-1">
                {current.desc}
              </p>
              
              <div className="mb-8">
                <div className="text-[10px] text-primary font-mono mb-3 uppercase">Tech Stack Deployed:</div>
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t, i) => (<span key={i} className="px-2 py-1 border border-white/20 bg-white/5 text-xs font-mono text-white hover:border-primary hover:text-primary transition-colors cursor-default">
                      {t}
                    </span>))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-auto pt-4 border-t border-primary/20">
                <NeonButton className="flex-1 flex items-center justify-center gap-2">
                  <ExternalLink size={16}/> INITIALIZE
                </NeonButton>
                <NeonButton variant="secondary" className="flex items-center justify-center gap-2 !px-4">
                  <Github size={16}/> SOURCE
                </NeonButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
          {MISSIONS.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-12 h-1 transition-all duration-300 ${idx === currentIndex ? "bg-primary shadow-[0_0_10px_#00f3ff]" : "bg-white/20 hover:bg-white/40"}`}/>))}
        </div>
      </div>
    </div>);
}
