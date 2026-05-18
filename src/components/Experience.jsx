import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useProgress } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Gamepad from "./Gamepad";
import PortfolioApp from "./PortfolioApp";
import Loader from "./Loader";

function FloatingRig({ children }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Ambient float (Weightless)
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
    // Subtle rotation drift
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.005;
    // Inertial magnetic pull towards pointer
    const targetRotY = state.pointer.x * 0.05;
    const targetRotX = -state.pointer.y * 0.05;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02;
  });
  return <group ref={groupRef}>{children}</group>;
}

export default function Experience() {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const joystickScrollRef = useRef(0);
  const scrollElRef = useRef(null); // ✅ DOM ref for sidebar scroll container

  const [portfolioState, setPortfolioState] = useState({
    activePage: "about",
    showMenu: false,
  });

  const { progress } = useProgress();
  const isLoading = progress < 100;

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const tl = gsap.timeline();
    tl.from(cameraRef.current.position, {
      x: 0,
      y: 0,
      z: 10,
      duration: 2,
      ease: "power2.inOut",
    }).from(
      controlsRef.current.target,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "<",
    );
  }, []);

  const handleButtonPress = (button) => {
    if (button === "menu") {
      setPortfolioState((prev) => ({ ...prev, showMenu: !prev.showMenu }));
    } else {
      setPortfolioState({ activePage: button, showMenu: false });
    }
  };

  const setIsInteracting = (val) => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = !val;
      controlsRef.current.enablePan = !val;
      controlsRef.current.enableZoom = !val;
    }
  };

  return (
    <>
    <Canvas
      shadows
      dpr={window.devicePixelRatio || 2}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ fov: 60, position: [0, 0, 8] }}
      style={{ width: "100vw", height: "100vh" }}
      onCreated={({ camera }) => {
        cameraRef.current = camera;
      }}
    >
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[-5, 5, 10]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      <spotLight
        position={[5, 3, 8]}
        angle={0.5}
        penumbra={1}
        intensity={0.4}
        castShadow={false}
      />
      <pointLight position={[0, -5, 3]} intensity={0.2} color="#4488ff" />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <FloatingRig>
          <group position={[1.4, 3.2, 1]} scale={6.2}>
            <Gamepad
              setIsInteracting={setIsInteracting}
              onButtonPress={handleButtonPress}
              joystickScrollRef={joystickScrollRef}
              scrollElRef={scrollElRef}
              isLoading={isLoading}
            />
            <PortfolioApp
              joystickScrollRef={joystickScrollRef}
              activePage={portfolioState.activePage}
              showMenu={portfolioState.showMenu}
              onPageChange={(page) =>
                setPortfolioState({ activePage: page, showMenu: false })
              }
              scrollElRef={scrollElRef}
              setIsInteracting={setIsInteracting}
            />
          </group>
        </FloatingRig>
      </Suspense>

      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.15}
        scale={20}
        blur={3}
        far={4.5}
      />
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} />
    </Canvas>
    <Loader />
    </>
  );
}
