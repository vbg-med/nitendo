import {  useEffect } from "react";

export function KeyboardShortcutsModal({ isOpen, setIsOpen }) {



  const handleESC = (e) => {
    if ((e.key === "Escape" && isOpen) || (e.shiftKey && e.key === "?")) {
      setIsOpen(false);
    }
  };

  useEffect(()=>{
    window.addEventListener("keydown", handleESC);
    return () => {
      window.removeEventListener("keydown", handleESC);
    };
  }, [isOpen]);

  useEffect(() => {
    // Make showKeyboardHelp available globally for keyboard handler
    window.showKeyboardHelp = () => setIsOpen(true);

    // Listen for ? key
    const handleKeyPress = (e) => {
      if (e.key === "?" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      delete window.showKeyboardHelp;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      aria-label="Keyboard shortcuts help dialog"
    >
      <div
        className="bg-[#050508] border border-cyan-500/30 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="sticky top-0 bg-[#050508] border-b border-cyan-500/20 p-6 flex items-center justify-between">
          <h2
            id="shortcuts-title"
            className="font-['Orbitron'] text-cyan-400 text-xl tracking-widest uppercase font-bold"
          >
            ⌨️ Keyboard Shortcuts
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-cyan-400 hover:text-cyan-300 text-2xl leading-none p-2"
            aria-label="Close shortcuts dialog"
          >
            ✕
          </button>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Navigation */}
          <section aria-labelledby="nav-shortcuts">
            <h3
              id="nav-shortcuts"
              className="text-cyan-300 font-mono text-sm font-bold mb-3 uppercase"
            >
              Navigation
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  1
                </kbd>
                <span className="text-cyan-100/80">Go to About page</span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  2
                </kbd>
                <span className="text-cyan-100/80">Go to Skills page</span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  3
                </kbd>
                <span className="text-cyan-100/80">Go to Projects page</span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  4
                </kbd>
                <span className="text-cyan-100/80">Go to Contact page</span>
              </div>
            </div>
          </section>

          {/* Camera Controls */}
          <section aria-labelledby="camera-shortcuts">
            <h3
              id="camera-shortcuts"
              className="text-cyan-300 font-mono text-sm font-bold mb-3 uppercase"
            >
              Camera Controls
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    W
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    A
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    S
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    D
                  </kbd>
                </div>
                <span className="text-cyan-100/80">Move camera around</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    ↑
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    ↓
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    ←
                  </kbd>
                  <kbd className="px-2 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs">
                    →
                  </kbd>
                </div>
                <span className="text-cyan-100/80">
                  Alternative camera controls
                </span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  Mouse Drag
                </kbd>
                <span className="text-cyan-100/80">Rotate view with mouse</span>
              </div>
            </div>
          </section>

          {/* Menu & Search */}
          <section aria-labelledby="quick-actions">
            <h3
              id="quick-actions"
              className="text-cyan-300 font-mono text-sm font-bold mb-3 uppercase"
            >
              Quick Actions
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-4">
                
              </div>
              <div className="flex items-start gap-4">
               
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  Esc
                </kbd>
                <span className="text-cyan-100/80">Close modals and menus</span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  ?
                </kbd>
                <span className="text-cyan-100/80">Show this help menu</span>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section aria-labelledby="a11y-shortcuts">
            <h3
              id="a11y-shortcuts"
              className="text-cyan-300 font-mono text-sm font-bold mb-3 uppercase"
            >
              ♿ Accessibility
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  Tab
                </kbd>
                <span className="text-cyan-100/80">Navigate UI elements</span>
              </div>
              <div className="flex items-start gap-4">
                <kbd className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/50 rounded font-mono text-xs whitespace-nowrap">
                  Enter
                </kbd>
                <span className="text-cyan-100/80">
                  Activate focused element
                </span>
              </div>
            </div>
          </section>

          {/* Tips */}
          <article
            className="mt-6 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded text-xs text-cyan-200/70"
            aria-label="Helpful tip about keyboard shortcuts"
          >
            <p className="font-bold mb-2">💡 Tip:</p>
            <p>
              Not all keyboard shortcuts may be available on all pages. Some
              features are context-specific.
            </p>
          </article>
        </div>

        {/* Footer */}
        <footer className="sticky bottom-0 bg-[#050508] border-t border-cyan-500/20 p-4 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-cyan-950 font-mono text-sm font-bold rounded border border-cyan-400/50 transition-all"
            aria-label="Close shortcuts dialog with Escape key"
          >
            Close (Esc)
          </button>
        </footer>
      </div>
    </div>
  );
}

export default KeyboardShortcutsModal;
