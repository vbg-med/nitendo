import { motion } from "motion/react";
import { Hexagon, Zap, Shield, Target, MapPin, Activity } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HomeProfile() {
  return (
    <div className="w-full h-full flex gap-6">
      {/* Left Column: Player Card */}
      <div className="w-1/3 flex flex-col gap-4 h-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex-1 glass-panel p-1 cyber-border flex flex-col"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 clip-hex pointer-events-none" />
          
          <div className="h-64 w-full relative overflow-hidden mb-4 border-b border-cyan-500/30">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1634910440823-193b061d28a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTE0OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Avatar" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 backdrop-blur text-xs font-tech border border-cyan-500/50 text-cyan-300">
              Lvl 99. DEV
            </div>
          </div>
          
          <div className="px-4 pb-4 flex-1 flex flex-col">
            <h1 className="text-3xl font-orbitron font-bold text-white tracking-widest glow-text-cyan mb-1 uppercase animate-glitch">
              Null_Pointer
            </h1>
            <p className="text-cyan-500 font-tech text-sm mb-4 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Neo-Tokyo // Sector 7
            </p>

            <div className="space-y-4 flex-1">
              {/* XP Bar */}
              <div>
                <div className="flex justify-between text-xs font-tech mb-1">
                  <span className="text-cyan-300">XP PROGRESS</span>
                  <span className="text-cyan-500">8,402 / 10,000</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-cyan-900/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "84%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-cyan-400 glow-cyan relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] animate-[scan_2s_linear_infinite]" />
                  </motion.div>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="bg-cyan-950/30 border border-cyan-500/20 p-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div className="text-xs font-tech">
                    <div className="text-gray-400">STATUS</div>
                    <div className="text-emerald-400 font-bold">ONLINE</div>
                  </div>
                </div>
                <div className="bg-cyan-950/30 border border-cyan-500/20 p-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <div className="text-xs font-tech">
                    <div className="text-gray-400">CLASS</div>
                    <div className="text-purple-400 font-bold">ARCHITECT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Stats & Hologram */}
      <div className="w-2/3 flex flex-col gap-4 h-full">
        {/* Intro Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-32 glass-panel border border-cyan-500/30 flex items-center p-6 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-cyan-500/10">
            <Hexagon className="w-48 h-48" strokeWidth={1} />
          </div>
          <div className="z-10">
            <h2 className="font-orbitron text-xl text-cyan-300 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" /> SYSTEM OVERRIDE INITIATED
            </h2>
            <p className="font-tech text-sm text-cyan-100/70 max-w-lg leading-relaxed">
              Full-stack developer specializing in high-performance React architectures and immersive 3D web experiences. Armed with cutting-edge tech and an eye for neon-lit aesthetics.
            </p>
          </div>
        </motion.div>

        {/* Tactical Stats Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          {[
            { label: "FRONTEND CORES", value: "8", color: "cyan" },
            { label: "BACKEND NODES", value: "12", color: "magenta" },
            { label: "SYSTEM ARCHITECTURE", value: "S-RANK", color: "emerald" },
            { label: "MISSIONS COMPLETED", value: "47", color: "blue" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`glass-panel border border-${stat.color}-500/30 p-4 flex flex-col justify-between group hover:bg-${stat.color}-500/10 transition-colors cursor-default`}
            >
              <div className="text-xs font-tech text-gray-400 tracking-widest">{stat.label}</div>
              <div className={`text-4xl font-orbitron font-bold text-${stat.color}-400 group-hover:glow-text-${stat.color} transition-all`}>
                {stat.value}
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-2 opacity-50 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
