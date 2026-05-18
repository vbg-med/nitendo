import { Outlet, useLocation, useNavigate } from "react-router";
import { User, Cpu, Briefcase, Clock, Radio, Battery, Wifi, Gamepad2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
const NAV_ITEMS = [
    { path: "/", icon: User, label: "PROFILE" },
    { path: "/skills", icon: Cpu, label: "LOADOUT" },
    { path: "/projects", icon: Briefcase, label: "ARCHIVE" },
    { path: "/experience", icon: Clock, label: "LOGS" },
    { path: "/contact", icon: Radio, label: "COMMS" },
];
export function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (<div className="w-full h-full flex flex-col scanlines text-foreground bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0a0f] via-[#050508] to-black relative">
      {/* Top System Bar */}
      <div className="h-10 border-b border-primary/20 flex justify-between items-center px-4 glass-panel shrink-0 z-10">
        <div className="flex items-center gap-3 text-primary text-sm font-bold tracking-widest font-['Orbitron']">
          <Gamepad2 className="w-5 h-5 animate-pulse"/>
          <span>OS v2.4.7 // ONLINE</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="text-secondary animate-pulse px-1">●</span>
            LINK ACTIVE
          </div>
          <div className="w-px h-4 bg-border"></div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-primary"/>
            <Battery className="w-4 h-4 text-emerald-400"/>
            <span className="text-primary font-['Orbitron']">
              {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Nav */}
        <nav className="w-20 md:w-24 shrink-0 border-r border-primary/20 glass-panel flex flex-col items-center py-6 gap-6 z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (<button key={item.path} onClick={() => navigate(item.path)} className={`relative group w-14 h-14 flex items-center justify-center transition-all duration-300 clip-edges ${isActive ? "bg-primary/20 text-primary neon-border" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`} title={item.label}>
                <Icon className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : ""}`}/>
                {isActive && (<motion.div layoutId="activeTab" className="absolute inset-0 border-2 border-primary clip-edges" transition={{ type: "spring", stiffness: 300, damping: 30 }}/>)}
                {/* Tooltip equivalent for gaming HUD */}
                <span className="absolute left-full ml-4 px-2 py-1 bg-black/90 border border-primary text-primary text-[10px] font-['Orbitron'] tracking-widest whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </span>
              </button>);
        })}
          
          <div className="mt-auto">
            <button className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors">
              <Settings className="w-5 h-5"/>
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          {/* Overlay to darken background image and add mesh */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="relative h-full w-full overflow-y-auto overflow-x-hidden p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={location.pathname} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }} className="h-full">
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Bottom decorative bar */}
      <div className="h-6 border-t border-primary/20 bg-black/80 flex items-center px-4 shrink-0 z-10 text-[10px] font-mono text-primary/50 justify-between">
        <div className="flex gap-4">
          <span>SYS_MEM: 32TB OK</span>
          <span>GPU_TEMP: 42C</span>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-primary/50 animate-pulse"></div>
          <span>REC</span>
        </div>
      </div>
    </div>);
}
