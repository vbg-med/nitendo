import { useState } from "react";
import { motion } from "motion/react";
import { GlitchText, HoloCard, ProgressBar, StatBox } from "../ui/CyberUI";
import { Terminal, Shield, Zap, Target, Activity } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ExperienceView } from "./ExperienceView";
export function HomeView() {
  const [isFlipped, setIsFlipped] = useState(false);

  const ACTIVITY_LOGS = [{
    act: "Committed payload to main branch",
    time: "2m ago",
    type: "system"
  },
  {
    act: "Defeated boss in MK",
    time: "1h ago",
    type: "personal"
  },
  {
    act: "Deployed contract to production",
    time: "3h ago",
    type: "system"
  },
  {
    act: "Upgraded ocular implants",
    time: "1d ago",
    type: "personal"
  }]

  return (<div className="h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1 pb-4">
    {/* Top Row: Profile Card & Stats Grid */}
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 shrink-0">
      {/* Left Column - Profile Card */}
      <div className="w-full md:w-1/3 flex flex-col">
        <HoloCard className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4 gap-2">
            <div className="flex flex-col ">
              <span className="text-[10px] text-primary font-mono tracking-widest border border-primary/30 px-2 py-0.5 w-fit mb-1 whitespace-nowrap">
                ID:3008-X8
              </span>
              <GlitchText text="JANE DOE" as="h2" className="text-2xl text-white font-bold" />
              <span className="text-xs text-muted-foreground font-mono">SYS_ADMIN // Lvl 24</span>
            </div>
            <div className="w-12 h-12 shrink-0 border-2 border-primary rounded-full flex items-center justify-center relative shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              <span className="font-['Orbitron'] text-lg font-bold text-primary">24</span>
              <svg className="absolute -inset-1 w-13 h-13 animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="40 20 10 20" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Avatar Container with 3D-ish rotation (bulletproof state-driven opacity & rotation) */}
          <motion.div 
            className="w-full aspect-square mb-6 relative group" 
            style={{ perspective: 1000 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            whileHover={{ scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1.5 }}
          >
            <motion.div 
              className="w-full h-full relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 bg-black/50 border border-primary/20 overflow-hidden transition-opacity duration-300"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  opacity: isFlipped ? 0 : 1,
                  pointerEvents: isFlipped ? "none" : "auto"
                }}
              >
                <ImageWithFallback src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover opacity-80 mix-blend-luminosity filter contrast-125 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-primary/20 mix-blend-overlay"></div>
                {/* Scanner line effect */}
                <motion.div className="absolute left-0 right-0 h-1 bg-primary/50 shadow-[0_0_10px_#00f3ff]" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 bg-black border border-primary/50 p-4 flex flex-col justify-center items-center text-center overflow-hidden transition-opacity duration-300"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  opacity: isFlipped ? 1 : 0,
                  pointerEvents: isFlipped ? "auto" : "none"
                }}
              >
                <Shield className="w-12 h-12 text-primary mb-2 opacity-50" />
                <h3 className="font-['Orbitron']  text-primary mb-2">BIOMETRIC DATA</h3>
                <p className="text-xs font-mono text-muted-foreground mb-1">CLASS: NETRUNNER</p>
                <p className="text-xs font-mono text-muted-foreground mb-1">ALIGNMENT: NEUTRAL</p>
                <p className="text-xs font-mono text-muted-foreground mb-4">STATUS: ACTIVE</p>
                <div className="w-full h-12 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/82/Code_128_barcode.svg')] bg-contain bg-center bg-no-repeat opacity-50 filter invert"></div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-auto">
            <div className="flex gap-2 justify-between text-xs font-mono mb-1">
              <span className="text-primary flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> ONLINE</span>
              <span className="text-muted-foreground">NOIR-PUNE</span>
            </div>
            <ProgressBar label="XP TO NEXT LEVEL" percentage={78} color="primary" />
          </div>
        </HoloCard>
      </div>

      {/* Right Column - Stats & Intro */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <div className="glass-panel p-6 border-l-4 border-l-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="flex items-center gap-2 text-primary mb-2 font-mono text-xs">
            <Terminal size={14} />
            <span>sys.log("Welcome")</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-white mb-4 uppercase tracking-wider glow-text-primary">
            Full-Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Operative</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-4 max-w-2xl">
            &gt; INITIALIZING...<br />
            &gt; SPECIALIST IN HIGH-PERFORMANCE REACT ARCHITECTURES &amp; SECURE BACKEND SYSTEMS.<br />
            &gt; DEPLOYING SCALABLE SOLUTIONS WITH MILITARY PRECISION. AVAILABLE FOR FREELANCE CONTRACTS.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatBox label="Missions Completed" value="142" icon={Target} trend="up" />
          <StatBox label="System Uptime" value="99.9%" icon={Activity} />
          <StatBox label="Coffee Consumed" value="9,001" icon={Zap} trend="up" />
          <StatBox label="Threats Neutralized" value="99" icon={Shield} />
        </div>
      </div>
    </div>

    {/* Bottom Row - Full Width Recent Activity Stream */}
    {/* <div className="w-full shrink-0">
      <HoloCard>
        <h3 className="font-['Orbitron'] text-primary mb-4 flex items-center gap-2">
          <Activity size={16} /> RECENT ACTIVITY STREAM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {ACTIVITY_LOGS.map((item, i) => (
            <div key={i} className="flex gap-3 text-sm items-center border-b border-white/5 pb-2 last:border-0 md:last:border-b">
              <div className={`w-1 h-full min-h-5 shrink-0 ${item.type === 'system' ? 'bg-primary' : 'bg-secondary'}`}></div>
              <div className="flex-1 font-mono text-gray-300 truncate">{item.act}</div>
              <div className="text-xs font-mono text-muted-foreground shrink-0">{item.time}</div>
            </div>
          ))}
        </div>
      </HoloCard>
    </div> */}
    <ExperienceView/>
  </div>);
}
