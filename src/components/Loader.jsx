import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="fixed inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)] w-screen h-screen z-[1000]">
        <div className="flex flex-col items-center gap-10 w-[300px]">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="flex gap-1.5 z-10">
              <div className="w-[18px] h-[44px] rounded-[9px] bg-[#ff3e3e] shadow-[0_0_20px_rgba(255,62,62,0.4)]"></div>
              <div className="w-[18px] h-[44px] rounded-[9px] bg-[#00bdff] shadow-[0_0_20px_rgba(0,189,255,0.4)]"></div>
            </div>
            <div className="absolute w-full h-full border-2 border-white/10 rounded-full animate-[ring-pulse_2s_infinite_ease-out]"></div>
          </div>
          
          <div className="w-full flex flex-col gap-3">
            <div className="text-[0.7rem] tracking-[4px] text-white/50 font-extrabold text-center uppercase">
              Initializing System
            </div>
            <div className="flex items-center gap-[15px]">
              <div className="flex-1 h-1 bg-white/5 rounded-[2px] relative overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-[#ff3e3e] to-[#00bdff] blur-[8px] opacity-60 transition-[width] duration-400 ease-[cubic-bezier(0.1,0,0.1,1)]" 
                  style={{ width: `${progress}%` }}
                ></div>
                <div 
                  className="h-full bg-white transition-[width] duration-400 ease-[cubic-bezier(0.1,0,0.1,1)] relative z-10" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-[0.8rem] font-mono text-white min-w-[40px]">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-[10px] opacity-40">
            <span className="w-1 h-1 bg-[#00ff88] rounded-full animate-[status-blink_1s_infinite]"></span>
            <span className="text-[0.65rem] tracking-[1px]">Loading Assets...</span>
          </div>
        </div>
      </div>
    </Html>
  );
}
