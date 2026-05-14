import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Radio, Terminal, Send, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { HoloCard, NeonButton } from "../ui/CyberUI";

export function ContactView() {
  const [terminalText, setTerminalText] = useState("");
  const fullText = "ESTABLISHING SECURE CONNECTION...\nHANDSHAKE PROTOCOL INITIATED...\nUPLINK ESTABLISHED. READY FOR TRANSMISSION.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-primary/30 pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-['Orbitron'] text-primary uppercase tracking-widest flex items-center gap-3">
            <Radio size={24} /> Communications
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">OPEN SECURE CHANNEL</p>
        </div>
        <div className="flex gap-2 items-center text-xs font-mono">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></div>
          <span className="text-emerald-400 hidden sm:inline">CHANNEL OPEN</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-4">
        {/* Left Side - Network Terminal */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <HoloCard className="flex-1 bg-black/80">
            <div className="flex items-center gap-2 text-primary border-b border-primary/20 pb-2 mb-4 font-mono text-xs">
              <Terminal size={14} /> SYS_TERMINAL v9.0
            </div>
            <div className="font-mono text-xs text-emerald-400 whitespace-pre-wrap mb-4">
              {terminalText}
              <span className="animate-pulse inline-block w-2 h-3 bg-emerald-400 ml-1"></span>
            </div>
            
            <div className="mt-auto pt-4 border-t border-primary/20 space-y-3">
              <div className="text-xs font-mono text-muted-foreground mb-2">KNOWN ALIASES // NETWORK LINKS</div>
              
              <a href="#" className="flex items-center justify-between p-2 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group">
                <div className="flex items-center gap-3 font-mono text-sm text-gray-300 group-hover:text-primary">
                  <Github size={16} /> GITHUB_REPO
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 font-['Orbitron']">&gt; ACCESS</span>
              </a>
              
              <a href="#" className="flex items-center justify-between p-2 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group">
                <div className="flex items-center gap-3 font-mono text-sm text-gray-300 group-hover:text-blue-500">
                  <Linkedin size={16} /> LINKEDIN_PROFILE
                </div>
                <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 font-['Orbitron']">&gt; ACCESS</span>
              </a>
              
              <a href="#" className="flex items-center justify-between p-2 border border-white/10 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all group">
                <div className="flex items-center gap-3 font-mono text-sm text-gray-300 group-hover:text-sky-400">
                  <Twitter size={16} /> TWITTER_FEED
                </div>
                <span className="text-xs text-sky-400 opacity-0 group-hover:opacity-100 font-['Orbitron']">&gt; ACCESS</span>
              </a>
            </div>
          </HoloCard>
        </div>

        {/* Right Side - Message Form */}
        <HoloCard className="w-full md:w-2/3 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="mb-6">
            <h2 className="text-xl font-['Orbitron'] text-white uppercase mb-2">Compose Transmission</h2>
            <p className="text-xs font-mono text-muted-foreground">ENCRYPTED P2P MESSAGING PROTOCOL. ALL DATA IS SECURED VIA QUANTUM KEY DISTRIBUTION.</p>
          </div>
          
          <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-primary uppercase">Sender ID / Name</label>
                <input 
                  type="text" 
                  className="bg-black/50 border border-white/20 p-2 font-mono text-sm text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all"
                  placeholder="ENTER ALIAS..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-primary uppercase">Return Address / Email</label>
                <input 
                  type="email" 
                  className="bg-black/50 border border-white/20 p-2 font-mono text-sm text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all"
                  placeholder="ENTER SECURE EMAIL..."
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[10px] font-mono text-primary uppercase flex justify-between">
                <span>Transmission Payload / Message</span>
                <span className="text-muted-foreground">MAX 2048 BYTES</span>
              </label>
              <textarea 
                className="bg-black/50 border border-white/20 p-3 font-mono text-sm text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all resize-none flex-1 min-h-[150px]"
                placeholder="INPUT DATA STREAM HERE..."
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
              <div className="text-[10px] font-mono text-muted-foreground flex flex-col">
                <span>STATUS: AWAITING INPUT</span>
                <span>ENCRYPTION: AES-256</span>
              </div>
              <NeonButton className="flex items-center gap-2">
                <Send size={16} /> TRANSMIT
              </NeonButton>
            </div>
          </form>
        </HoloCard>
      </div>
    </div>
  );
}
