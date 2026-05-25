import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const BOOT_SEQUENCE = [
  `BIOS Date ${new Date().toLocaleString()} Ver 1.0.4`,
  "CPU: Neuromorphic Quantum Core @ 4.2 THz",
  "Memory Test: 4096000K OK",
  "Detecting Primary Master... OK",
  "Detecting Primary Slave... NONE",
  "Mounting root filesystem...",
  "Loading kernel modules...",
  "[ OK ] Started hardware abstraction layer.",
  "[ OK ] Activated neural interface.",
  "Decrypting secure payload...",
  "Establishing uplink to orbital relay...",
  "Loading physical assets...",
];

export default function Loader() {
  const { progress, item, loaded, total } = useProgress();
  const [lines, setLines] = useState([]);
  const [bootPhase, setBootPhase] = useState("bios"); // bios -> flash -> done

  // Synthesize a power thump sound using Web Audio API
  const playPowerThump = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio not supported or auto-played blocked",e);
    }
  };

  // Print BIOS lines one by one
  useEffect(() => {
    if (bootPhase !== "bios") return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [bootPhase]);

  // Transition to flash once assets are loaded AND lines have finished printing
  useEffect(() => {
    if (
      progress === 100 &&
      lines.length >= BOOT_SEQUENCE.length &&
      bootPhase === "bios"
    ) {
      setTimeout(() => {
        setBootPhase("flash");
        playPowerThump();
        setTimeout(() => setBootPhase("done"), 500); // 500ms flash duration
      }, 500); // Short pause before flash
    }
  }, [progress, lines.length, bootPhase]);

  if (bootPhase === "done") return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none">
      <AnimatePresence>
        {bootPhase === "bios" && (
          <motion.div
            className="absolute inset-0 bg-black text-[#00ff88] font-mono text-sm sm:text-base p-8 flex flex-col justify-end pb-12"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* Scanlines / CRT Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-size-[100%_4px,3px_100%] opacity-50" />

            <div className="relative z-10 flex flex-col gap-1 drop-shadow-[0_0_5px_rgba(0,255,136,0.8)]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {line}
                </motion.div>
              ))}

              {/* Asset loading logs tied to real progress */}
              {lines.length >= 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#00f3ff]"
                >
                  {`> Asset DL: ${loaded}/${total} [${Math.round(progress)}%]`}
                </motion.div>
              )}
              {lines.length >= 8 && item && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#00f3ff]/70 truncate max-w-xl"
                >
                  {`> Fetching: ${item}`}
                </motion.div>
              )}

              <div className="w-3 h-5 bg-[#00ff88] animate-pulse mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bootPhase === "flash" && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
