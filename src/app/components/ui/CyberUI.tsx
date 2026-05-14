import React from 'react';
import { motion } from 'motion/react';

export const GlitchText = ({ text, className = "", as: Component = "h1" }: { text: string, className?: string, as?: any }) => {
  return (
    <Component className={`relative inline-block font-['Orbitron'] ${className}`} data-text={text}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-[-2px] -z-10 text-secondary opacity-70 animate-[pulse_2s_infinite]">{text}</span>
      <span className="absolute top-0 left-[2px] -z-10 text-primary opacity-70 animate-[pulse_3s_infinite]">{text}</span>
    </Component>
  );
};

export const NeonButton = ({ children, onClick, className = "", variant = "primary" }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: "primary" | "secondary" }) => {
  const color = variant === "primary" ? "text-primary border-primary hover:bg-primary/10" : "text-secondary border-secondary hover:bg-secondary/10";
  const shadow = variant === "primary" ? "hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]" : "hover:shadow-[0_0_15px_rgba(255,0,60,0.4)]";
  
  return (
    <button 
      onClick={onClick}
      className={`relative px-6 py-2 border clip-edges transition-all duration-300 font-['Orbitron'] font-bold tracking-widest text-sm uppercase ${color} ${shadow} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"></div>
      <div className={`absolute -bottom-1 -right-1 w-2 h-2 ${variant === "primary" ? "bg-primary" : "bg-secondary"}`}></div>
    </button>
  );
};

export const HoloCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative glass-panel p-1 group ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-px bg-primary"></div>
      <div className="absolute top-0 left-0 w-px h-4 bg-primary"></div>
      <div className="absolute bottom-0 right-0 w-4 h-px bg-primary"></div>
      <div className="absolute bottom-0 right-0 w-px h-4 bg-primary"></div>
      
      <div className="bg-black/40 h-full p-4 md:p-6 relative overflow-hidden">
        {/* Subtle animated grid background for card */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ProgressBar = ({ label, percentage, color = "primary" }: { label: string, percentage: number, color?: "primary" | "secondary" | "accent" }) => {
  const bgColors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-emerald-400"
  };
  const textColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-emerald-400"
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs font-['Orbitron'] mb-1">
        <span className="text-muted-foreground uppercase">{label}</span>
        <span className={textColors[color]}>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-black/60 border border-white/10 relative overflow-hidden clip-edges">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${bgColors[color]} relative`}
        >
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 skew-x-[-45deg]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export const StatBox = ({ label, value, icon: Icon, trend }: { label: string, value: string | number, icon: any, trend?: "up" | "down" }) => {
  return (
    <div className="border border-primary/20 bg-primary/5 p-3 flex items-center gap-3 relative overflow-hidden group">
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity scale-150">
        <Icon size={64} className="text-primary" />
      </div>
      <div className="bg-black/50 p-2 border border-primary/30 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{label}</div>
        <div className="text-lg font-['Orbitron'] text-white flex items-center gap-2">
          {value}
          {trend === "up" && <span className="text-emerald-400 text-xs">▲</span>}
          {trend === "down" && <span className="text-secondary text-xs">▼</span>}
        </div>
      </div>
    </div>
  );
};
