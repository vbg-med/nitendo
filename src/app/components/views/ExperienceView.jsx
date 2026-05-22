import { motion } from "motion/react";
import { HoloCard } from "../ui/CyberUI";
import { Clock, Building2, MapPin, Award } from "lucide-react";
const TIMELINE = [
  {
    year: "CURRENT",
    role: "LEAD NETRUNNER (SENIOR DEV)",
    corp: "ARASAKA LOGISTICS (META)",
    location: "NIGHT CITY (REMOTE)",
    desc: "Architected the main nervous system for their global delivery drones. Reduced latency by 40% and implemented quantum encryption for user data payloads.",
    tech: ["React", "GraphQL", "Rust", "WebRTC"],
    level: "Lv. 99"
  },
  {
    year: "2074 - 2077",
    role: "FRONTEND OPERATIVE",
    corp: "MILITECH SYSTEMS",
    location: "SECTOR 7",
    desc: "Developed tactical HUD interfaces for field agents. Built reusable component libraries with strict accessibility and performance requirements under heavy fire.",
    tech: ["Vue.js", "TypeScript", "SCSS", "Jest"],
    level: "Lv. 65"
  },
  {
    year: "2071 - 2074",
    role: "JUNIOR CODER",
    corp: "STREET DOC CLINIC",
    location: "UNDERGROUND",
    desc: "Maintained legacy patient database systems. Upgraded their UI from standard terminal green to full color holographic displays.",
    tech: ["JavaScript", "HTML/CSS", "PHP", "MySQL"],
    level: "Lv. 20"
  }
];
export function ExperienceView() {
  return (<div className="h-full flex flex-col gap-6">
    <div className="flex items-center justify-between border-b border-primary/30 pb-4 shrink-0">
      <div>
        <h1 className="text-2xl font-['Orbitron'] text-primary uppercase tracking-widest flex items-center gap-3">
          <Clock size={24} /> Career Logs
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">ACCESSING PREVIOUS DEPLOYMENTS</p>
      </div>
      <div className="text-right text-xs font-mono">
        <div className="text-primary">TOTAL EXP</div>
        <div className="text-white text-lg font-['Orbitron']">6.4 YRS</div>
      </div>
    </div>

    <div className="flex-1 overflow-y-hidden pr-4 custom-scrollbar relative">
      {/* Main Vertical Timeline Line */}
      <div className="absolute left-4 md:left-[15%] top-0 bottom-0 w-1 bg-primary/20">
        <div className="absolute top-0  bottom-0 w-full bg-linear-to-b from-primary via-secondary to-primary/20 opacity-50"></div>
        {/* Animated glow on the line */}
        <motion.div className="absolute -top-0.5  w-0.75 h-32 bg-primary shadow-[0_0_15px_#00f3ff]" animate={{ top: ["0%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
      </div>

      <div className="space-y-12 pb-12 pt-4 relative">
        {TIMELINE.map((item, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.2, type: "spring" }} className="relative flex flex-col md:flex-row gap-6 md:gap-8 group">
          {/* Timeline Node */}
          <div className="absolute left-4 md:left-[15.6%] w-4 h-4 rounded-full bg-black border-2 border-primary transform -translate-x-1.75 md:-translate-x-1.75 mt-1.5 md:mt-0 z-10 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:shadow-[0_0_10px_#00f3ff] "></div>

          {/* Left Side - Year & Level */}
          <div className="ml-16 md:ml-0 md:w-[14.5%] md:text-right  pt-0 pr-1 shrink-0">
            <div className="text-primary font-mono text-[0.8rem] group-hover:text-white transition-colors">{item.year}</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">{item.level}</div>
          </div>

          {/* Right Side - Content Card */}
          <HoloCard className="ml-16 md:ml-0 md:flex-1 hover:border-primary/50 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
              <div>
                <h3 className="text-xl font-['Orbitron'] text-white uppercase group-hover:text-primary transition-colors">
                  {item.role}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1 text-gray-300"><Building2 size={12} /> {item.corp}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/30 p-2 hidden sm:block">
                <Award className="text-primary w-6 h-6" />
              </div>
            </div>

            <p className="text-sm font-mono text-gray-400 mb-4 leading-relaxed">
              {item.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tech.map((t, i) => (<span key={i} className="px-2 py-0.5 bg-black/50 border border-white/10 text-xs font-mono text-gray-300">
                {t}
              </span>))}
            </div>
          </HoloCard>
        </motion.div>))}

        {/* Origin Node */}
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 ">
          <div className="absolute left-4 md:left-[15.6%] w-4 h-4 rounded-full bg-black border-2 border-white/30 transform -translate-x-1.75 md:-translate-x-1.75 "></div>
          <div className="ml-12 md:ml-0 md:w-[12%] md:text-right pt-0 shrink-0">
            <div className="text-white/50 font-mono text-sm">ORIGIN</div>
          </div>
          <div className="ml-12 md:ml-0 md:flex-1 text-xs hover:text-primary hover:font-bold font-mono text-muted-foreground">
            SYSTEM INITIALIZED. FIRST HELLO WORLD EXECUTED.
          </div>
        </div>
      </div>
    </div>
  </div>);
}
