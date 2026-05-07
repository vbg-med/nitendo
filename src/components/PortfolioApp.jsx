import { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import Sidebar from "./Sidebar";
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

function getPageSections(activePage) {
  const sections = {
    about: ["Introduction", "Background", "Experience", "Education"],
    skills: ["Technical Skills", "Frameworks", "Tools", "Languages"],
    projects: ["Web Applications", "Mobile Apps", "Open Source", "Experiments"],
    contact: ["Get in Touch", "Social Links", "Email", "Location"],
  };
  return sections[activePage] || [];
}

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

  useEffect(() => {
    // Find the screen mesh and get its world position/rotation
    scene.traverse((obj) => {
      if (obj.name === "Screen") {
        // Get local position directly — we're inside the same group
        setScreenPos([
          obj.position.x - 0.22,
          obj.position.y - 0.525, // pull down — tune this value
          obj.position.z, // keep it as is so it wont lift above screen
        ]);
        setScreenRot([obj.rotation.x, obj.rotation.y, obj.rotation.z]);
        console.log("Screen mesh position:", obj.position);
        console.log("Screen mesh rotation:", obj.rotation);
      }
    });
  }, [scene]);

  const sections = getPageSections(activePage);

  // Fallback position while we find the screen
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
        overflow: "hidden",
        pointerEvents: "auto",
        background: "#1a1a2e",
        backfaceVisibility: "hidden",
      }}
      zIndexRange={[1, 10]}
    >
      <div
        className="portfolio-container"
        style={{ height: "100%", overflow: "hidden" }}
      >
        {/* <Sidebar
          sections={sections}
          scrollElRef={scrollElRef}
          showMenu={showMenu}
          onPageChange={onPageChange}
          activePage={activePage}
        /> */}
        <PageContent page={pages[activePage]} />
      </div>
    </Html>
  );
}
