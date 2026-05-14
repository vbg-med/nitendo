# Futuristic Motion Design System

This document outlines the animation and motion behavior specifications for the Nintendo 3D interactive portfolio. The goal is to create a highly premium, cinematic experience that feels physical yet zero-gravity.

## Core Principles
*   **Magnetic:** Interactive elements subtly pull toward the cursor or joystick input, creating a physical connection between the user and the interface.
*   **Inertial & Weightless:** Objects feel like they are floating in space but possess mass. They take time to accelerate and drift smoothly to a halt.
*   **Cinematic:** Transitions are sweeping, deliberate, and layered. We use subtle blurs and slow opacity fades.
*   **Smooth at Low Speed:** Focus on sub-pixel rendering. Slow movements should never jitter or snap.

## Anti-Patterns (What to Avoid)
*   **Snappy UI:** No instant state changes or `0.1s` / `0.2s` basic CSS transitions.
*   **Arcade-like Animations:** Avoid bouncy springs (high stiffness, low damping). The interface should feel serious and sci-fi, not playful.
*   **Fast Transitions:** Avoid sudden cuts between pages or views.
*   **Hard Opacity:** Avoid animating from `0` directly to `1`. Peak opacity for ambient elements should sit around `0.8` or `0.9` to maintain a soft, holographic feel.

---

## 1. Physics Profiles (Framer Motion)

Instead of traditional CSS easings (`ease-out`), we rely almost entirely on Spring physics with low stiffness and moderate-to-high damping to achieve the "inertial" and "weightless" feel.

### A. Cinematic Reveal (Page Loads & Large Elements)
Used for bringing main layout elements into view.
```javascript
export const cinematicReveal = {
  type: "spring",
  stiffness: 40,   // Low stiffness for slow acceleration (weight)
  damping: 20,     // High damping to smoothly settle without bouncing
  mass: 2          // Higher mass increases the feeling of inertia
};
```

### B. Magnetic Interaction (Buttons & Joycon Targets)
Used when hovering over or selecting an element.
```javascript
export const magneticSpring = {
  type: "spring",
  stiffness: 120,
  damping: 25,
  mass: 1.5
};
```

### C. Ambient Float (Idle State)
Continuous, keyframed motion for background elements to keep the UI alive.
```javascript
export const ambientFloat = {
  y: [0, -8, 0],
  transition: {
    duration: 8,
    ease: "easeInOut", // Smooth sine-wave like motion
    repeat: Infinity,
  }
};
```

---

## 2. Interface Implementations

### Layered Movement (Parallax)
UI elements must move at slightly different rates when scrolling or tilting the camera. This creates the illusion of depth (Z-axis separation) even in 2D overlays.

```jsx
import { motion, useScroll, useTransform } from "motion/react";

export function LayeredBackground() {
  const { scrollYProgress } = useScroll();
  
  // Background moves slowly, foreground moves faster in reverse
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <>
      <motion.div style={{ y: backgroundY }} className="absolute z-0 opacity-30" />
      <motion.div style={{ y: foregroundY }} className="relative z-10" />
    </>
  );
}
```

### Delayed Reveals & Soft Fades
Combine `Y` transforms with opacity and CSS `filter: blur()`. Stagger children to create a cascading reveal effect.

```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Creates the delayed cascading effect
      delayChildren: 0.3     // Wait for camera to settle before revealing UI
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)", scale: 0.98 },
  visible: { 
    opacity: 0.85, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: cinematicReveal 
  }
};
```

### Reactive Interface Lighting
When hovering or focusing on an element via Joycon, the glow should slowly ramp up and fade out.

```jsx
<motion.button 
  whileHover={{ 
    boxShadow: "0px 0px 40px rgba(120, 200, 255, 0.3)",
    backgroundColor: "rgba(30, 40, 50, 0.7)",
    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)"
  }}
  transition={{ duration: 0.6, ease: "easeOut" }} // Slow, deliberate lighting changes
  className="border border-white/5 rounded-xl transition-colors"
>
  Access Memory
</motion.button>
```

---

## 3. 3D & Camera Motion (React Three Fiber / GSAP)

### Subtle Camera Drift
The 3D camera should never be perfectly still. It should have a continuous drift, reacting to pointer or Joycon input with heavy inertia.

```javascript
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

function CameraRig() {
  useFrame((state, delta) => {
    // 1. Inertial tracking for camera based on input
    // High damping (0.8) creates the heavy, cinematic feel
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 0.8, state.pointer.y * 0.8, 8],
      0.8, 
      delta
    );
    
    // 2. Continuous zero-G drift
    state.camera.position.y += Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    state.camera.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.01;
  });
  return null;
}
```

### Analog-Style Scrolling
Scroll behavior should mimic a heavy physical dial. It takes a moment to spin up and slowly drifts to a halt (momentum scrolling).

*   **Implementation:** Using `@react-three/drei`'s `<ScrollControls>`
*   **Configuration:** Lower damping values create more inertia.
```jsx
import { ScrollControls } from "@react-three/drei";

// damping={0.05} makes the scroll very heavy and smooth
// Max damping is 1. We want it close to 0.
<ScrollControls pages={4} damping={0.05} distance={1.5}>
  <Your3DContent />
</ScrollControls>
```
