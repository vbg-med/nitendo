import { useEffect, useCallback } from "react";

/**
 * Hook for keyboard navigation support
 * Provides WASD/Arrow keys for camera movement and number keys for page switching
 */
export function useKeyboardNavigation(onPageChange, onCameraMove) {
  const handleKeyDown = useCallback(
    (event) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || document.activeElement?.isContentEditable) {
      return;
    }
      const { key, code } = event;

      // Page navigation with number keys (1-4)
      if (key >= "1" && key <= "4") {
        event.preventDefault();
        const pages = ["about", "skills", "projects", "contact"];
        const pageIndex = parseInt(key) - 1;
        if (onPageChange) {
          onPageChange(pages[pageIndex]);
        }
      }

      // Camera movement with WASD and Arrow keys
      if (
        [
          "w",
          "W",
          "ArrowUp",
          "a",
          "A",
          "ArrowLeft",
          "s",
          "S",
          "ArrowDown",
          "d",
          "D",
          "ArrowRight",
        ].includes(key)
      ) {
        event.preventDefault();
        if (onCameraMove) {
          const direction = {
            forward: ["w", "W", "ArrowUp"].includes(key),
            backward: ["s", "S", "ArrowDown"].includes(key),
            left: ["a", "A", "ArrowLeft"].includes(key),
            right: ["d", "D", "ArrowRight"].includes(key),
          };
          onCameraMove(direction);
        }
      }

      // Menu toggle with + key or M
      if (key === "+" || key === "m" || key === "M") {
        event.preventDefault();
        if (window.toggleMenu) {
          window.toggleMenu();
        }
      }

      // Show help with ? key
      if (key === "?") {
        event.preventDefault();
        if (window.showKeyboardHelp) {
          window.showKeyboardHelp();
        }
      }

      // Focus search with / key (common shortcut)
      if (key === "/") {
        event.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder*="Search"]',
        );
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape key for closing modals
      if (key === "Escape") {
        event.preventDefault();
        if (window.closeModals) {
          window.closeModals();
        }
      }
    },
    [onPageChange, onCameraMove],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

export default useKeyboardNavigation;
