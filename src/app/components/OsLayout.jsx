import { Outlet, useLocation, useNavigate, useOutlet } from "react-router";
import { User, Cpu, Briefcase, Clock, Radio, Battery, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, Wifi, Gamepad2, Settings, HelpCircle, Terminal } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
const navItems = [
    { path: "/", icon: User, label: "PROFILE" },
    { path: "/skills", icon: Cpu, label: "LOADOUT" },
    { path: "/projects", icon: Briefcase, label: "MISSIONS" },
    { path: "/experience", icon: Clock, label: "TIMELINE" },
    { path: "/contact", icon: Radio, label: "COMMS" },
];
function FrozenRoute({ children }) {
    const context = useRef(children);
    return context.current;
}

export function OsLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const outlet = useOutlet();
    const [time, setTime] = useState(new Date().toLocaleTimeString("en-US", { hour12: false }));
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [isCharging, setIsCharging] = useState(false);
    
    // Neural diagnostic terminal overlay states
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [terminalLogs, setTerminalLogs] = useState([
        "SYS.OS [v24.8.18] - CORE DIAGNOSTICS ACTIVE",
        "TYPE /help TO RETRIEVE AVAILABLE DEPLOYMENT COMMANDS.",
        ""
    ]);
    const [isHacking, setIsHacking] = useState(false);
    const inputRef = useRef(null);
    const terminalBottomRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (terminalOpen) {
            terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [terminalLogs, terminalOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setTerminalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [terminalOpen]);

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = inputVal.trim().toLowerCase();
        if (!cmd) return;

        // Echo command to log
        const newLogs = [...terminalLogs, `guest@netrunner:~# ${inputVal}`];

        if (cmd === "/clear" || cmd === "clear") {
            setTerminalLogs([]);
            setInputVal("");
            return;
        }

        if (cmd === "/exit" || cmd === "exit") {
            setTerminalOpen(false);
            setInputVal("");
            return;
        }

        if (cmd === "/help" || cmd === "help") {
            setTerminalLogs([
                ...newLogs,
                "AVAILABLE DEPLOYMENT COMMANDS:",
                "  /scan  - EXECUTE FULL NEURAL & HARDWARE DIAGNOSTIC",
                "  /hack  - INITIATE INTEL DECRYPTION GLITCH ROUTINE",
                "  /clear - FLUSH CORE STORAGE LOGS",
                "  /exit  - SHUTDOWN TERMINAL OVERLAY",
                ""
            ]);
        } else if (cmd === "/scan" || cmd === "scan") {
            setTerminalLogs([
                ...newLogs,
                "INITIALIZING DIAGNOSTIC SCAN...",
                "▶ CONNECTING TO SECURE GATEWAY... OK",
                "▶ READING LATENCY VECTOR... 12ms (OPTIMAL)",
                "▶ COGNITIVE INTEGRITY DEPLOYED... 100% OPERATIONAL",
                "▶ STATS UPLINK... ONLINE & SECURE",
                ""
            ]);
        } else if (cmd === "/hack" || cmd === "hack") {
            setIsHacking(true);
            setTerminalLogs([
                ...newLogs,
                "OVERCLOCKING COGNITIVE ENGINE CORE...",
                "BYPASSING QUANTUM FIREWALL SECTOR_77..."
            ]);
            setTimeout(() => {
                setIsHacking(false);
                setTerminalLogs(prev => [
                    ...prev,
                    "================================================",
                    "               DECRYPTION COMPLETE              ",
                    "================================================",
                    "▶ SYSTEM KEY RETRIEVED: [ NE0-N1TE-77 ]",
                    "▶ DEPLOYMENT STATUS: ACTIVE INTRUSION CONVERGED",
                    ""
                ]);
            }, 3500);
        } else {
            setTerminalLogs([
                ...newLogs,
                `SYS_ERR: PROTOCOL '${inputVal}' NOT RECOGNIZED.`,
                "TYPE /help TO VIEW AVAILABLE COMMANDS.",
                ""
            ]);
        }

        setInputVal("");
    };
    useEffect(() => {
        let battery = null;
        const updateBatteryInfo = () => {
            if (battery) {
                setBatteryLevel(Math.round(battery.level * 100));
                setIsCharging(battery.charging);
            }
        };
        if ('getBattery' in navigator) {
            navigator.getBattery().then((b) => {
                battery = b;
                updateBatteryInfo();
                battery.addEventListener('chargingchange', updateBatteryInfo);
                battery.addEventListener('levelchange', updateBatteryInfo);
            }).catch((err) => console.log('Battery API not supported or blocked', err));
        }
        return () => {
            if (battery) {
                battery.removeEventListener('chargingchange', updateBatteryInfo);
                battery.removeEventListener('levelchange', updateBatteryInfo);
            }
        };
    }, []);
    const renderBatteryIcon = () => {
        if (isCharging)
            return <BatteryCharging className="w-4 h-4 text-emerald-400"/>;
        if (batteryLevel === null)
            return <Battery className="w-4 h-4"/>;
        if (batteryLevel > 90)
            return <BatteryFull className="w-4 h-4"/>;
        if (batteryLevel > 50)
            return <BatteryMedium className="w-4 h-4"/>;
        if (batteryLevel > 20)
            return <BatteryLow className="w-4 h-4 text-yellow-500"/>;
        return <BatteryWarning className="w-4 h-4 text-red-500 animate-pulse"/>;
    };
    return (<div className="w-full h-full relative flex text-cyan-400 select-none">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0"/>
      <div className="absolute inset-0 scanlines pointer-events-none z-0"/>
      <div className="scan-line-anim"/>

      {/* Side System UI - Hidden as per user request (navigation is via Gamepad) */}
      <div className="hidden w-24 border-r border-cyan-500/30 flex-col items-center py-6 bg-black/40 backdrop-blur-md z-10 relative">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 glow-cyan flex items-center justify-center bg-cyan-950/50">
            <Gamepad2 className="w-6 h-6 text-cyan-400"/>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (<button key={item.path} onClick={() => navigate(item.path)} className={clsx("relative group w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-all duration-300 clip-angled", isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 glow-cyan"
                    : "text-cyan-600 hover:text-cyan-400 hover:bg-cyan-500/10")}>
                <Icon className={clsx("w-6 h-6 mb-1", isActive ? "glow-text-cyan" : "")}/>
                <span className="text-[9px] font-bold tracking-widest font-tech">{item.label}</span>
                {isActive && (<motion.div layoutId="activeIndicator" className="absolute -left-1 top-2 bottom-2 w-1 bg-cyan-400 glow-cyan"/>)}
              </button>);
        })}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button className="text-cyan-600 hover:text-cyan-400 transition-colors">
            <Settings className="w-6 h-6"/>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Status Bar */}
        <header className="h-12 border-b border-cyan-500/20 flex items-center justify-between px-6 bg-gradient-to-r from-black/60 to-transparent">
          <div 
            className="flex items-center gap-2 text-sm font-tech cursor-pointer hover:text-cyan-300 transition-colors group/term"
            onClick={() => {
                setTerminalOpen(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }}
          >
            <span className="text-cyan-500 animate-pulse">● LIVE</span>
            <span className="text-cyan-700">|</span>
            <span className="tracking-widest opacity-80 group-hover/term:glow-text-cyan">SYS.OS.v24.8.18</span>
            <span className="text-[10px] text-cyan-600/70 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono group-hover/term:border-cyan-400 group-hover/term:text-cyan-300 ml-1">
              SYS_LOG
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-tech">
            <div className="flex items-center gap-2">
              <span className="glow-text-cyan">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-500">
              <Wifi className="w-4 h-4"/>
              {renderBatteryIcon()}
              <span>{batteryLevel !== null ? `${batteryLevel}%` : "100%"}</span>
            </div>
            
            {/* Help Menu Container */}
            <div className="relative group">
              <button className="flex items-center justify-center w-7 h-7 rounded-full border border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors glow-cyan">
                <HelpCircle className="w-4 h-4"/>
              </button>
              
              {/* Dropdown Box */}
              <div className="absolute right-0 top-full mt-3 w-64 bg-black/95 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,243,255,0.2)] backdrop-blur-xl rounded-lg p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-[100]">
                <div className="absolute -top-2 right-2 w-4 h-4 bg-black border-l border-t border-cyan-500/50 rotate-45"></div>
                <h4 className="font-tech text-cyan-400 border-b border-cyan-500/30 pb-2 mb-3 tracking-widest text-[10px] uppercase flex items-center gap-2">
                  <Gamepad2 className="w-3 h-3"/> System Controls
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
            <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.98, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.02, y: -20, filter: "blur(8px)" }} transition={{
            type: "spring",
            stiffness: 40,
            damping: 20,
            mass: 2
        }} className="w-full min-h-full">
              <FrozenRoute>
                {outlet}
              </FrozenRoute>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Neural Diagnostic Terminal Drawer */}
        <AnimatePresence>
          {terminalOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="absolute inset-x-6 top-14 bottom-6 bg-black/95 border border-cyan-500/50 rounded shadow-[0_0_30px_rgba(0,243,255,0.25)] backdrop-blur-xl flex flex-col overflow-hidden z-[200] font-mono"
            >
              {/* Terminal Title Bar */}
              <div className="h-10 border-b border-cyan-500/30 px-4 flex items-center justify-between bg-cyan-950/20 select-none">
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <Terminal size={14} className="animate-pulse" />
                  <span className="font-['Orbitron'] tracking-wider text-[10px]">SYS_DIAGNOSTICS@NETRUNNER:~</span>
                </div>
                <button 
                  onClick={() => setTerminalOpen(false)}
                  className="text-[9px] text-cyan-500 hover:text-cyan-300 font-mono uppercase border border-cyan-500/20 hover:border-cyan-400/50 px-2 py-0.5 rounded bg-cyan-950/40 cursor-pointer active:scale-95 transition-all"
                >
                  [CLOSE_OS // ESC]
                </button>
              </div>

              {/* Terminal Logs View */}
              <div className="flex-1 p-4 text-[11px] text-cyan-200 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 select-text relative">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed">
                    {log}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
                
                {/* Overlaid intrusion screensaver */}
                {isHacking && (
                  <div className="absolute inset-0 bg-[#020202] z-50 flex flex-col items-center justify-center font-mono text-emerald-400 p-8 select-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40"></div>
                    <div className="w-16 h-16 mb-6 relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping"></div>
                      <svg className="w-12 h-12 text-emerald-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeDasharray="30 10 10 10"/>
                      </svg>
                    </div>
                    <h3 className="font-['Orbitron'] text-sm md:text-base tracking-widest text-emerald-300 mb-2 animate-pulse uppercase">
                      DECRYPTING SECTOR_77
                    </h3>
                    <div className="text-[9px] uppercase tracking-wider text-emerald-600 mb-4 animate-[pulse_1s_infinite]">
                      INTRUSION PAYLOAD INJECTED // FIREWALL BYPASS_OK
                    </div>
                    <div className="w-48 h-1.5 bg-emerald-950/50 border border-emerald-500/30 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "linear" }}
                      />
                    </div>
                    <div className="text-[8px] text-emerald-500/50 max-w-sm mt-8 text-center flex flex-col gap-1 select-none">
                      <div>[SYS_INIT: PAYLOAD DEPLOYED 0x8F91B]</div>
                      <div>[BYPASSING MATRIX CORES... SUCCESS]</div>
                      <div>[EXTRACTING HIGH-VALUE METADATA...]</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Form Footer */}
              <form onSubmit={handleCommand} className="h-10 border-t border-cyan-500/30 px-4 flex items-center bg-cyan-950/10">
                <span className="text-cyan-400 font-mono text-[11px] mr-2 shrink-0 select-none">
                  guest@netrunner:~#
                </span>
                <input 
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type /help to view available protocols..."
                  className="flex-1 bg-transparent text-cyan-100 font-mono text-[11px] outline-none border-none placeholder-cyan-700/60"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UI Framing Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 z-20 pointer-events-none"/>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 z-20 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 z-20 pointer-events-none"/>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 z-20 pointer-events-none"/>
    </div>);
}
