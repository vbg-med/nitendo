import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react"; // ✅ add useState

function isBlockedMesh(object) {
  let obj = object;
  while (obj) {
    const name = obj.name || "";
    if (
      name === "Screen" ||
      name.includes("Body") ||
      name.includes("Material") ||
      name.includes("Joycon")
    ) return true;
    obj = obj.parent;
  }
  return false;
}

export default function Gamepad({ setIsInteracting }) { // ✅ no imageIndex/onButtonPress props
  const { scene } = useGLTF("/withScreen.glb");
  
  // ✅ State lives here — re-renders only Gamepad, not Experience/Bounds
  const [imageIndex, setImageIndex] = useState(0);

  const textures = useTexture([
    "/img1.jpg", "/img2.jpg", "/img3.jpg",
    "/img4.jpg", "/img5.jpg", "/img6.jpg",
    "/img7.jpg", "/img8.jpg", "/img9.jpg",
  ]);

  const screenRef = useRef(null);
  const dragInfo = useRef({ object: null, startPoint: null, startPos: null });
  const traversedRef = useRef(false);
  
  // ✅ Ref so userData.onClick always sees latest value without re-traversal
  const imageIndexRef = useRef(0);

  useEffect(() => {
    textures.forEach((t) => {
      t.flipY = false;
      t.anisotropy = 16;
      t.colorSpace = "srgb";
      t.center.set(0.5, 0.5);
      t.rotation = Math.PI / 2;
      t.needsUpdate = true;
    });
  }, [textures]);

  useEffect(() => {
    if (traversedRef.current) return;
    traversedRef.current = true;

    scene.traverse((obj) => {
      if (!obj.isMesh) return;

      if (obj.name === "Screen") {
        obj.material = obj.material.clone();
        obj.material.color.set("#ffffff");
        obj.material.roughness = 0.1;
        obj.material.metalness = 0;
        screenRef.current = obj;
      }

      if (!obj.userData.initialPosition) {
        obj.userData.initialPosition = obj.position.clone();
      }

      obj.userData.onClick = () => {
        obj.position.z -= 0.02;
        setTimeout(() => {
          if (obj.userData.initialPosition) {
            obj.position.z = obj.userData.initialPosition.z;
          }
        }, 120);

        // ✅ Update both ref and state
        const next = (imageIndexRef.current + 1) % 9;
        imageIndexRef.current = next;
        setImageIndex(next);
      };
    });
  }, [scene]);

  useEffect(() => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material;
    const tex = textures[imageIndex];
    if (tex) {
      mat.map = tex;
      mat.emissiveMap = tex;
      mat.emissiveIntensity = 0.8;
      mat.emissive.set("#ffffff");
      mat.toneMapped = false;
      mat.needsUpdate = true;
    }
  }, [imageIndex, textures]);

  return (
    <group rotation={[Math.PI / 2, 0, 0]} scale={6}>
      <primitive
        object={scene}
        onPointerDown={(e) => {
          e.stopPropagation();
          setIsInteracting(true);

          if (e.object.name.includes("Joycon")) {
            dragInfo.current = {
              object: e.object,
              startPoint: e.point.clone(),
              startPos: e.object.position.clone(),
            };
          }
        }}
        onPointerUp={(e) => {
          e.stopPropagation();

          if (dragInfo.current.object) {
            dragInfo.current.object.position.copy(
              dragInfo.current.object.userData.initialPosition
            );
            dragInfo.current = { object: null, startPoint: null, startPos: null };
          }
        }}
        onClick={(e) => {
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