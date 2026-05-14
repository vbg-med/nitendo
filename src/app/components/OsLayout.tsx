import { Outlet, useLocation, useNavigate } from "react-router";
import { User, Cpu, Briefcase, Clock, Radio, Battery, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, Wifi, Gamepad2, Settings, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";

const navItems = [
  { path: "/", icon: User, label: "PROFILE" },
  { path: "/skills", icon: Cpu, label: "LOADOUT" },
  { path: "/projects", icon: Briefcase, label: "MISSIONS" },
  { path: "/experience", icon: Clock, label: "TIMELINE" },
  { path: "/contact", icon: Radio, label: "COMMS" },
];

export function OsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }));
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let battery: any = null;

    const updateBatteryInfo = () => {
      if (battery) {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);
      }
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        battery = b;
        updateBatteryInfo();
        battery.addEventListener('chargingchange', updateBatteryInfo);
        battery.addEventListener('levelchange', updateBatteryInfo);
      }).catch((err: any) => console.log('Battery API not supported or blocked', err));
    }

    return () => {
      if (battery) {
        battery.removeEventListener('chargingchange', updateBatteryInfo);
        battery.removeEventListener('levelchange', updateBatteryInfo);
      }
    };
  }, []);

  const renderBatteryIcon = () => {
    if (isCharging) return <BatteryCharging className="w-4 h-4 text-emerald-400" />;
    if (batteryLevel === null) return <Battery className="w-4 h-4" />;
    if (batteryLevel > 90) return <BatteryFull className="w-4 h-4" />;
    if (batteryLevel > 50) return <BatteryMedium className="w-4 h-4" />;
    if (batteryLevel > 20) return <BatteryLow className="w-4 h-4 text-yellow-500" />;
    return <BatteryWarning className="w-4 h-4 text-red-500 animate-pulse" />;
  };

  return (
    <div className="w-full h-full relative flex text-cyan-400 select-none">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />
      <div className="absolute inset-0 scanlines pointer-events-none z-0" />
      <div className="scan-line-anim" />

      {/* Side System UI - Hidden as per user request (navigation is via Gamepad) */}
      <div className="hidden w-24 border-r border-cyan-500/30 flex-col items-center py-6 bg-black/40 backdrop-blur-md z-10 relative">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 glow-cyan flex items-center justify-center bg-cyan-950/50">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={clsx(
                  "relative group w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-all duration-300 clip-angled",
                  isActive 
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 glow-cyan" 
                    : "text-cyan-600 hover:text-cyan-400 hover:bg-cyan-500/10"
                )}
              >
                <Icon className={clsx("w-6 h-6 mb-1", isActive ? "glow-text-cyan" : "")} />
                <span className="text-[9px] font-bold tracking-widest font-tech">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-1 top-2 bottom-2 w-1 bg-cyan-400 glow-cyan"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button className="text-cyan-600 hover:text-cyan-400 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Status Bar */}
        <header className="h-12 border-b border-cyan-500/20 flex items-center justify-between px-6 bg-gradient-to-r from-black/60 to-transparent">
          <div className="flex items-center gap-4 text-sm font-tech">
            <span className="text-cyan-500 animate-pulse">● LIVE</span>
            <span className="text-cyan-700">|</span>
            <span className="tracking-widest opacity-80">SYS.OS.v7.4.2</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-tech">
            <div className="flex items-center gap-2">
              <span className="glow-text-cyan">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-500">
              <Wifi className="w-4 h-4" />
              {renderBatteryIcon()}
              <span>{batteryLevel !== null ? `${batteryLevel}%` : "100%"}</span>
            </div>
            
            {/* Help Menu Container */}
            <div className="relative group">
              <button className="flex items-center justify-center w-7 h-7 rounded-full border border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors glow-cyan">
                <HelpCircle className="w-4 h-4" />
              </button>
              
              {/* Dropdown Box */}
              <div className="absolute right-0 top-full mt-3 w-64 bg-black/95 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,243,255,0.2)] backdrop-blur-xl rounded-lg p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-[100]">
                <div className="absolute -top-2 right-2 w-4 h-4 bg-black border-l border-t border-cyan-500/50 rotate-45"></div>
                <h4 className="font-tech text-cyan-400 border-b border-cyan-500/30 pb-2 mb-3 tracking-widest text-[10px] uppercase flex items-center gap-2">
                  <Gamepad2 className="w-3 h-3" /> System Controls
                </h4>
                <div className="flex flex-col gap-2.5 text-xs font-mono text-cyan-100/80">
                  <div className="flex justify-between items-center group/item hover:text-cyan-300 transition-colors">
                    <span className="bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">🕹️ L/R Stick</span>
                    <span className="text-cyan-500 text-[10px] uppercase">Scroll UI</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:text-cyan-300 transition-colors">
                    <span className="bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">🅰️ Button A</span>
                    <span className="text-cyan-500 text-[10px] uppercase">Missions</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:text-cyan-300 transition-colors">
                    <span className="bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">🅱️ Button B</span>
                    <span className="text-cyan-500 text-[10px] uppercase">Comms</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:text-cyan-300 transition-colors">
                    <span className="bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">ⓧ Button X</span>
                    <span className="text-cyan-500 text-[10px] uppercase">Loadout</span>
                  </div>
                  <div className="flex justify-between items-center group/item hover:text-cyan-300 transition-colors">
                    <span className="bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">Ⓨ Button Y</span>
                    <span className="text-cyan-500 text-[10px] uppercase">Profile</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </header>

        {/* Viewport for Pages */}
        <main id="os-main-content" className="flex-1 relative overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* UI Framing Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 z-20 pointer-events-none" />
    </div>
  );
}
