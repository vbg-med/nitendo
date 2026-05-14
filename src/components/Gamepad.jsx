import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { SCREEN_NAME, JOYCON_NAMES } from "../utils/constants"; // ✅ fix #1

function isBlockedMesh(object) {
  let obj = object;
  while (obj) {
    const name = obj.name || "";
    if (
      name === SCREEN_NAME ||
      name.includes("Body") ||
      name.includes("Material") ||
      name.includes("Joycon")
    )
      return true;
    obj = obj.parent;
  }
  return false;
}

function BatteryLED() {
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isCharging, setIsCharging] = useState(false);
  const matRef = useRef();
  const { progress } = useProgress();

  useEffect(() => {
    let battery = null;
    const updateBatteryInfo = () => {
      if (battery) {
        setBatteryLevel(battery.level);
        setIsCharging(battery.charging);
      }
    };
    if ('getBattery' in navigator) {
      navigator.getBattery().then((b) => {
        battery = b;
        updateBatteryInfo();
        battery.addEventListener('chargingchange', updateBatteryInfo);
        battery.addEventListener('levelchange', updateBatteryInfo);
      }).catch(err => console.log('Battery API not supported', err));
    }
  }, []);

  useFrame((state) => {
    if (!matRef.current) return;
    
    let color = "#00ff88"; // normal/full
    if (isCharging) {
      color = "#00f3ff"; // cyan charging
    } else if (batteryLevel < 0.2) {
      color = "#ff0000"; // red critical
    } else if (batteryLevel < 0.5) {
      color = "#ffaa00"; // orange medium
    }

    let intensity = 2;
    if (progress < 100) {
      // Booting up: fast diagnostic blink
      color = "#ffffff";
      intensity = (Math.sin(state.clock.elapsedTime * 30) + 1) * 3;
    } else if (!isCharging && batteryLevel < 0.2) {
      // Fast blink if dying
      intensity = (Math.sin(state.clock.elapsedTime * 15) + 1) * 2;
    }

    matRef.current.color.set(color);
    matRef.current.emissive.set(color);
    matRef.current.emissiveIntensity = intensity;
  });

  return (
    <mesh position={[0.2, -0.47, 0.02]}>
      <sphereGeometry args={[0.008, 16, 16]} />
      <meshStandardMaterial ref={matRef} toneMapped={false} />
    </mesh>
  );
}

export default function Gamepad({
  setIsInteracting,
  onButtonPress,
  joystickScrollRef,
  scrollElRef,
  isLoading,
}) {
  const { scene } = useGLTF("/withScreen.glb");
  const { camera } = useThree();

  const dragInfo = useRef({ object: null, startPoint: null, startPos: null });
  const traversedRef = useRef(false);

  // ✅ fix #3 — stable ref for callback, no stale closure
  const onButtonPressRef = useRef(onButtonPress);
  useEffect(() => {
    onButtonPressRef.current = onButtonPress;
  }, [onButtonPress]);

  // ✅ fix #2 — useFrame lives here in R3F context, writes to DOM ref
  useFrame(() => {
    if (scrollElRef?.current) {
      const el = scrollElRef.current;

      if (el) {
        const maxScroll = el.scrollHeight - el.clientHeight;

        joystickScrollRef.current = Math.max(
          0,
          Math.min(maxScroll, joystickScrollRef.current),
        );

        el.scrollTop = joystickScrollRef.current;
      }
    }
  });

  useEffect(() => {
    if (traversedRef.current) return;
    traversedRef.current = true;

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      if (!obj.userData.initialPosition) {
        obj.userData.initialPosition = obj.position.clone();
      }

      if (!obj.userData.initialRotation) {
        obj.userData.initialRotation = obj.rotation.clone();
      }

      if (!obj.userData.initialEmissive) {
        obj.userData.initialEmissive = obj.material.emissive?.clone() || { r: 0, g: 0, b: 0 };
      }

      obj.userData.onHover = (hovering) => {
        if (hovering && !isBlockedMesh(obj)) {
          if (obj.material.emissive) {
            // Subtle highlight instead of bright white overlay
            // obj.material.emissiveIntensity = 2;
            document.body.style.cursor = "pointer";
          }
        } else {
          if (obj.material.emissive) {
            obj.material.emissive.copy(obj.userData.initialEmissive);
            document.body.style.cursor = "auto";
          }
        }
      };

      obj.userData.onClick = () => {
        if (isLoading) return;
        
        // Physical, weighty button press using GSAP
        gsap.to(obj.position, {
          z: obj.userData.initialPosition.z - 0.02,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

        const name = obj.name;
        console.log("Button clicked:", name);

        if (name === "ButtonA") onButtonPressRef.current?.("projects");
        else if (name === "ButtonB") onButtonPressRef.current?.("contact");
        else if (name === "ButtonX") onButtonPressRef.current?.("skills");
        else if (name === "ButtonY") onButtonPressRef.current?.("about");
        else if (name.includes("Plus")) onButtonPressRef.current?.("menu");
      };
    });
  }, [scene]); // ✅ fix #3 — no onButtonPress in deps

  return (
    <group rotation={[Math.PI / 2, 0, 0]} scale={6}>
      <primitive
        object={scene}
        onPointerDown={(e) => {
          if (isLoading) return;
          e.stopPropagation();
          setIsInteracting(true);

          if (JOYCON_NAMES.includes(e.object.name)) {
            dragInfo.current = {
              object: e.object,
              startPoint: e.point.clone(),
              startPos: e.object.position.clone(),
            };
          }
        }}
        onPointerUp={(e) => {
          if (isLoading) return;
          e.stopPropagation();
          if (dragInfo.current.object) {
            // Animate back to initial position and rotation
            gsap.to(dragInfo.current.object.position, {
              x: dragInfo.current.object.userData.initialPosition.x,
              y: dragInfo.current.object.userData.initialPosition.y,
              z: dragInfo.current.object.userData.initialPosition.z,
              duration: 0.8, // Slower, heavier release
              ease: "power3.out", 
            });
            gsap.to(dragInfo.current.object.rotation, {
              x: dragInfo.current.object.userData.initialRotation.x,
              y: dragInfo.current.object.userData.initialRotation.y,
              z: dragInfo.current.object.userData.initialRotation.z,
              duration: 0.8,
              ease: "power3.out",
            });

            // Phase 4: Camera impact when heavy joycon snaps back into place
            if (JOYCON_NAMES.includes(dragInfo.current.object.name)) {
              gsap.to(camera.position, {
                y: camera.position.y - 0.05,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                delay: 0.75, // triggers right as the joycon lands
                ease: "power2.out"
              });
            }

            dragInfo.current = {
              object: null,
              startPoint: null,
              startPos: null,
            };
          }
        }}
        onPointerMove={(e) => {
          if (isLoading) return;
          e.stopPropagation();

          const dragged = dragInfo.current.object;

          if (!dragged) return;

          // ✅ both joycons supported
          if (JOYCON_NAMES.includes(dragged.name)) {
            // movement delta
            const deltaY = e.point.y - dragInfo.current.startPoint.y;

            // Apply realistic tilt (rotation)
            // Clamp rotation to avoid over-tilting
            const tiltAmount = Math.max(-0.4, Math.min(0.4, deltaY * 1.5));
            dragged.rotation.x = dragged.userData.initialRotation.x + tiltAmount;

            // ✅ invert scroll direction
            const scrollAmount = -deltaY * 300;

            // current scroll
            const currentScroll = scrollElRef.current?.scrollTop || 0;

            // apply incremental scroll
            joystickScrollRef.current = currentScroll + scrollAmount;

            // Phase 4: Signal Glitch when straining the hardware
            if (Math.abs(scrollAmount) > 8 && scrollElRef.current) {
              scrollElRef.current.classList.add("hardware-glitch");
              clearTimeout(scrollElRef.current.glitchTimeout);
              scrollElRef.current.glitchTimeout = setTimeout(() => {
                scrollElRef.current?.classList.remove("hardware-glitch");
              }, 150);
            }
          }
        }}
        onPointerOver={(e) => {
          if (isLoading) return;
          e.stopPropagation();
          e.object.userData.onHover?.(true);
        }}
        onPointerOut={(e) => {
          if (isLoading) return;
          e.stopPropagation();
          e.object.userData.onHover?.(false);
        }}
        onClick={(e) => {
          if (isLoading) return;
          e.stopPropagation();
          if (isBlockedMesh(e.object)) {
            setIsInteracting(false);
            return;
          }
          e.object.userData.onClick?.();
          setTimeout(() => setIsInteracting(false), 150);
        }}
      />
      <BatteryLED />
    </group>
  );
}
