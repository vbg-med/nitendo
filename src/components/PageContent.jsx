import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageContent({ page, scrollElRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Fade out current content slightly, then fade in new content
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [page]);

  return (
    <div 
      ref={(el) => {
        containerRef.current = el;
        if (scrollElRef) scrollElRef.current = el;
      }} 
      className="page-content overflow-hidden flex-1 overflow-y-auto p-[30px] w-full h-full"
    >
      {page}
    </div>
  );
}