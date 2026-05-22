import {  useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { RouterProvider } from "react-router";
import { router } from "../app/routes";
import "../styles/futuristic/index.css";

export default function PortfolioApp({
  activePage,
  scrollElRef,
  setIsInteracting,
}) {
  const { scene } = useGLTF("/withScreen.glb");
  const [screenPos, setScreenPos] = useState(null);
  const [screenRot, setScreenRot] = useState(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 10000);
    
    // Connect scrollElRef to the OsLayout scrollable container
    const interval = setInterval(() => {
      const el = document.getElementById("os-main-content");
      if (el && scrollElRef) {
        scrollElRef.current = el;
      }
    }, 500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Sync activePage prop with router navigation
  useEffect(() => {
    if (activePage === "about") router.navigate("/");
    else if (activePage === "skills") router.navigate("/skills");
    else if (activePage === "projects") router.navigate("/projects");
    else if (activePage === "contact") router.navigate("/contact");
  }, [activePage]);

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
            aria-label="Portfolio Content"

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
      <div 
        className="flex h-full bg-[#141414]/95 text-white font-sans rounded-lg overflow-hidden relative" 
        ref={scrollElRef}
        onMouseEnter={() => setIsInteracting?.(true)}
        onMouseLeave={() => setIsInteracting?.(false)}
        onWheel={(e) => {
          // Stop scroll event from reaching canvas (prevents annoying 3D camera zooming)
          e.stopPropagation();
        }}
      >
        <RouterProvider router={router} />
        
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
