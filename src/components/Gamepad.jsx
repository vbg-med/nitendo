import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
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

export default function Gamepad({
  setIsInteracting,
  onButtonPress,
  joystickScrollRef,
  scrollElRef,
  isLoading,
}) {
  const { scene } = useGLTF("/withScreen.glb");

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
        obj.position.z -= 0.02;
        setTimeout(() => {
          if (obj.userData.initialPosition) {
            obj.position.z = obj.userData.initialPosition.z;
          }
        }, 120);

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
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(dragInfo.current.object.rotation, {
              x: dragInfo.current.object.userData.initialRotation.x,
              y: dragInfo.current.object.userData.initialRotation.y,
              z: dragInfo.current.object.userData.initialRotation.z,
              duration: 0.3,
              ease: "power2.out",
            });

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
    </group>
  );
}
