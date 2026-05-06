import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"; // ✅ remove Bounds
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Gamepad from "./Gamepad";

export default function Experience() {
  const controlsRef = useRef();
  const cameraRef = useRef();

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

  const setIsInteracting = (val) => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = !val;
      controlsRef.current.enablePan = !val;
      controlsRef.current.enableZoom = !val;
    }
  };

  return (
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

      {/* Key light - front slightly left */}
      <spotLight
        position={[-5, 5, 10]}
        angle={0.4}
        penumbra={1}
        intensity={0.8}
        castShadow
      />

      {/* Fill light - right side */}
      <spotLight
        position={[5, 3, 8]}
        angle={0.5}
        penumbra={1}
        intensity={0.4}
        castShadow={false}
      />

      {/* Subtle rim light */}
      <pointLight position={[0, -5, 3]} intensity={0.2} color="#4488ff" />
      <Environment preset="city" />

      {/* ✅ Center and scale the model manually */}
      <group position={[1.4, 3.2, 0]} scale={6.2}>
        <Gamepad setIsInteracting={setIsInteracting} />
      </group>

    <ContactShadows
  position={[0, -3, 0]}
  opacity={0.15}
  scale={20}
  blur={3}
  far={4.5}
/>
      <OrbitControls ref={controlsRef} target={[0, 0, 0]} />
    </Canvas>
  );
}
