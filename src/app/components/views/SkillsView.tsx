import { motion } from "motion/react";
import { HoloCard, NeonButton, ProgressBar } from "../ui/CyberUI";
import { Database, Layout, Server, Cpu, Shield, Zap } from "lucide-react";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";
import { useState } from "react";

const radarData = [
  { subject: 'React/UI', A: 95, fullMark: 100 },
  { subject: 'Node.js', A: 85, fullMark: 100 },
  { subject: 'Database', A: 80, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
  { subject: 'Security', A: 75, fullMark: 100 },
  { subject: 'Design', A: 85, fullMark: 100 },
];

const SKILL_CATEGORIES = [
  { id: "front", label: "FRONTEND MODULES", icon: Layout },
  { id: "back", label: "BACKEND MODULES", icon: Server },
  { id: "data", label: "DATA CORES", icon: Database },
];

const SKILLS = {
  front: [
    { name: "React / Next.js", level: 95, status: "EQUIPPED" },
    { name: "Tailwind CSS", level: 90, status: "EQUIPPED" },
    { name: "Three.js / R3F", level: 80, status: "UPGRADING" },
    { name: "Framer Motion", level: 85, status: "EQUIPPED" },
  ],
  back: [
    { name: "Node.js", level: 85, status: "EQUIPPED" },
    { name: "Python / Django", level: 75, status: "STANDBY" },
    { name: "GraphQL", level: 80, status: "EQUIPPED" },
  ],
  data: [
    { name: "PostgreSQL", level: 90, status: "EQUIPPED" },
    { name: "MongoDB", level: 85, status: "EQUIPPED" },
    { name: "Redis", level: 70, status: "STANDBY" },
  ]
};

export function SkillsView() {
  const [activeTab, setActiveTab] = useState("front");

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-primary/30 pb-4">
        <div>
          <h1 className="text-2xl font-['Orbitron'] text-primary uppercase tracking-widest flex items-center gap-3">
            <Cpu size={24} /> Neural Loadout
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">SELECT MODULES FOR DEPLOYMENT</p>
        </div>
        <div className="flex gap-2">
          <div className="text-right mr-4 font-mono text-xs hidden md:block">
            <div className="text-primary">CORE CAPACITY</div>
            <div className="text-white">84 / 100</div>
          </div>
          <div className="w-32 h-8 bg-black border border-primary/20 p-1 flex">
            <div className="h-full bg-primary w-[84%] relative">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4px_100%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full min-h-0 overflow-hidden pb-4">
        {/* Radar Chart Panel */}
        <HoloCard className="w-full md:w-1/3 flex flex-col items-center justify-center relative min-h-[300px]">
          <div className="absolute top-4 left-4 text-xs font-mono text-primary flex items-center gap-2">
            <TargetIcon /> APTITUDE SCAN
          </div>
          <div className="w-full aspect-square max-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(0, 243, 255, 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#00f3ff', fontSize: 10, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#00f3ff"
                  fill="#00f3ff"
                  fillOpacity={0.4}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #00f3ff', fontFamily: 'monospace', fontSize: '12px' }}
                  itemStyle={{ color: '#00f3ff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
          </div>
        </HoloCard>

        {/* Skills Loadout Panel */}
        <div className="w-full md:w-2/3 flex flex-col gap-4 overflow-hidden">
          {/* Tabs */}
          <div className="flex gap-2 shrink-0 overflow-x-auto pb-2 scrollbar-none">
            {SKILL_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-['Orbitron'] text-sm tracking-wider border transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-primary/20 border-primary text-primary shadow-[inset_0_0_10px_rgba(0,243,255,0.2)]" 
                      : "bg-black/50 border-white/10 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Skill List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {SKILLS[activeTab as keyof typeof SKILLS].map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/40 border border-primary/20 p-4 relative group hover:border-primary/60 transition-colors"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                      {activeTab === 'front' ? <Layout size={16}/> : activeTab === 'back' ? <Server size={16}/> : <Database size={16}/>}
                    </div>
                    <div>
                      <h3 className="font-['Orbitron'] text-white text-lg">{skill.name}</h3>
                      <span className={`text-[10px] font-mono px-1 border ${
                        skill.status === 'EQUIPPED' ? 'text-primary border-primary/50' : 
                        skill.status === 'UPGRADING' ? 'text-emerald-400 border-emerald-400/50' : 
                        'text-muted-foreground border-muted-foreground/50'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-['Orbitron'] text-primary/80">Lv.{Math.floor(skill.level / 10)}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <ProgressBar label="MASTERY LEVEL" percentage={skill.level} color={skill.status === 'UPGRADING' ? 'accent' : 'primary'} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
