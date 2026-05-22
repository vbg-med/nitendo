import { useEffect, useState } from "react";
import Experience from "./components/Experience";
import ErrorBoundary from "./components/ErrorBoundary";
import FallbackUI from "./components/FallbackUI";
import "./styles/portfolio.css";

function OrientationBlocker() {
  return (
    <div className="fixed inset-0 bg-[#050508] z-[9999] flex flex-col items-center justify-center p-6 text-center select-none font-mono overflow-hidden">
      {/* Cybernetic grid and scanline backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20 pointer-events-none z-0"></div>

      <div className="relative w-28 h-28 mb-8 flex items-center justify-center z-10">
        {/* Pulsing neon rings */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse"></div>

        {/* Device Rotation Animated Icon */}
        <svg
          className="w-14 h-14 text-cyan-400 animate-[spin_4s_infinite_ease-in-out]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="2"
            transform="rotate(0 12 12)"
          />
          <path d="M12 18h.01" />
          <path
            d="M19 12a7 7 0 0 1-7 7m-5-7a7 7 0 0 1 7-7"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      <h2 className="font-['Orbitron'] text-cyan-400 text-lg md:text-xl mb-3 tracking-widest uppercase font-bold z-10 glow-text-primary">
        SYSTEM UPLINK PENDING
      </h2>

      <div className="border border-cyan-500/30 bg-cyan-950/10 px-4 py-3 rounded mb-6 max-w-xs z-10">
        <span className="text-[10px] text-cyan-500 font-mono tracking-wider block mb-1">
          ERR_ORIENTATION_MISMATCH
        </span>
        <p className="text-xs text-cyan-100/80 uppercase font-mono tracking-wide leading-relaxed">
          Rotate your device to Landscape (sideways) to connect to console
          interface.
        </p>
      </div>

      <div className="text-[8px] text-cyan-600/40 uppercase font-mono tracking-widest mt-6 animate-pulse z-10">
        Awaiting Hardware Gyro Rotation...
      </div>
    </div>
  );
}

function App() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }

    // Check orientation
    const checkOrientation = () => {
      setIsPortrait(
        window.innerWidth < window.innerHeight && window.innerWidth < 768,
      );
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <ErrorBoundary>
      <main className="app-container">
        {!webglSupported ? (
          <FallbackUI />
        ) : isPortrait ? (
          <OrientationBlocker />
        ) : (
          <Experience />
        )}
      </main>
    </ErrorBoundary>
  );
}

export default App;
