import { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import PageContent from "./PageContent";
import AboutPage from "../pages/AboutPage";
import SkillsPage from "../pages/SkillsPage";
import ProjectsPage from "../pages/ProjectsPage";
import ContactPage from "../pages/ContactPage";

const pages = {
  about: <AboutPage />,
  skills: <SkillsPage />,
  projects: <ProjectsPage />,
  contact: <ContactPage />,
};

export default function PortfolioApp({
  joystickScrollRef,
  activePage,
  showMenu,
  onPageChange,
  scrollElRef,
}) {
  const { scene } = useGLTF("/withScreen.glb");
  const [screenPos, setScreenPos] = useState(null);
  const [screenRot, setScreenRot] = useState(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Find the screen mesh and get its world position/rotation
    scene.traverse((obj) => {
      if (obj.name === "Screen") {
        setScreenPos([
          obj.position.x - 0.22,
          obj.position.y - 0.525,
          obj.position.z,
        ]);
        setScreenRot([obj.rotation.x, obj.rotation.y, obj.rotation.z]);
      }
    });
  }, [scene]);

  const position = screenPos || [0, 0, 0.01];
  const rotation = screenRot || [0, 0, 0];

  return (
    <Html
      transform
      occlude="raycast"
      position={position}
      rotation={rotation}
      scale={0.078}
      style={{
        width: "640px",
        height: "400px",
        pointerEvents: "auto",
        background: "transparent",
        backfaceVisibility: "hidden",
        overflow: "hidden",
        borderRadius: "12px",
      }}
      zIndexRange={[1, 10]}
    >
      <div className="flex  h-full bg-[#141414]/95 text-white font-sans rounded-lg overflow-hidden relative">
        <PageContent 
          page={pages[activePage]} 
          scrollElRef={scrollElRef} 
        />
        
        <div className={`absolute right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 pointer-events-none opacity-50 transition-opacity duration-300 z-[100] ${!showScrollHint ? "opacity-0" : ""}`}>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-[#00ff88]"></div>
          <div className="w-0.5 h-10 bg-[#00ff88]/30"></div>
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#00ff88]"></div>
          <div className="text-[1rem] color-[#00ff88] [writing-mode:vertical-rl] uppercase tracking-[2px]">Joycon Scroll</div>
        </div>
      </div>
    </Html>
  );
}
