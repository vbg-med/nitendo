import React, { useEffect, useState } from "react";

function FallbackUI() {
  return (
    <main
      className="fixed inset-0 bg-[#050508] z-[9999] flex flex-col items-center justify-center p-6 text-center select-none font-mono overflow-y-auto"
      role="alert"
      aria-live="assertive"
      aria-label="WebGL not supported fallback interface"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-3xl">
        {/* Icon */}
        <div
          className="w-28 h-28 mx-auto mb-8 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full border-2 border-yellow-500/20 animate-pulse"></div>
          <svg
            className="w-14 h-14 text-yellow-500 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M12 2L2 7V12C2 16.5 7 21 12 21S22 16.5 22 12V7L12 2Z" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <circle cx="12" cy="20" r="1" />
          </svg>
        </div>

        {/* Title */}
        <h1
          className="font-['Orbitron'] text-yellow-500 text-2xl mb-4 tracking-widest uppercase font-bold"
          id="fallback-title"
        >
          WEBGL NOT SUPPORTED
        </h1>

        {/* Message */}
        <section
          className="border border-yellow-500/30 bg-yellow-950/10 p-6 rounded mb-6 text-left"
          aria-labelledby="fallback-title"
          aria-describedby="fallback-description"
        >
          <p className="text-xs text-yellow-500 font-mono tracking-wider mb-3">
            ⚠️ NOTICE: 3D_MODE_UNAVAILABLE
          </p>
          <p
            className="text-sm text-yellow-100/80 mb-4"
            id="fallback-description"
          >
            Your browser or device doesn't support WebGL, which is required for
            the full 3D interactive experience. However, you can still access
            your portfolio content in our 2D fallback interface.
          </p>

          <article className="bg-yellow-950/20 border border-yellow-500/20 p-4 rounded mb-4">
            <h2 className="text-xs text-yellow-200 mb-3 font-bold">
              Possible solutions:
            </h2>
            <ul
              className="text-xs text-yellow-100/70 space-y-2 list-disc list-inside"
              aria-label="Steps to enable WebGL support"
            >
              <li>Update your browser to the latest version</li>
              <li>Enable hardware acceleration in browser settings</li>
              <li>Update your GPU drivers</li>
              <li>Use a modern browser: Chrome, Firefox, Safari, or Edge</li>
              <li>Try incognito/private mode (disable extensions)</li>
            </ul>
          </article>

          {/* 2D Portfolio Links */}
          <nav className="mt-6">
            <h2 className="text-xs text-yellow-300 mb-3 font-bold uppercase">
              Access your portfolio:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "About", emoji: "👤" },
                { title: "Skills", emoji: "💡" },
                { title: "Projects", emoji: "🚀" },
                { title: "Contact", emoji: "📧" },
              ].map((item) => (
                <button
                  key={item.title}
                  className="px-4 py-3 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 border border-yellow-500/50 rounded font-mono text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  aria-label={`Navigate to ${item.title} section`}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </section>

        {/* Technical Info */}
        <details className="mt-6 mb-4">
          <summary
            className="text-xs text-yellow-300/70 cursor-pointer hover:text-yellow-300 font-mono mb-3"
            aria-label="Show technical details"
          >
            Technical Details
          </summary>
          <section
            className="bg-yellow-950/20 p-4 rounded text-left text-xs text-yellow-100/60 font-mono space-y-2"
            aria-label="Technical information about your device"
          >
            <p>
              <strong>Browser:</strong> {getBrowserInfo()}
            </p>
            <p>
              <strong>WebGL Support:</strong>{" "}
              {hasWebGL()
                ? "Available (Failed to Initialize)"
                : "Not Available"}
            </p>
            <p>
              <strong>GPU:</strong> {getGPUInfo()}
            </p>
            <p>
              <strong>Recommended:</strong> Chrome/Firefox on desktop with
              dedicated GPU
            </p>
          </section>
        </details>

        {/* Action Buttons */}
        <nav className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-cyan-950 font-mono text-sm font-bold rounded border border-cyan-400/50 transition-all uppercase tracking-wide"
            aria-label="Retry loading 3D portfolio"
          >
            Retry
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("2D Portfolio mode - feature coming soon!");
            }}
            className="px-6 py-3 bg-transparent hover:bg-cyan-950/30 text-cyan-400 font-mono text-sm font-bold rounded border border-cyan-500/50 transition-all uppercase tracking-wide text-center"
            aria-label="Continue viewing portfolio in 2D mode"
          >
            Continue in 2D Mode
          </a>
        </nav>
      </div>
    </main>
  );
}

// Helper functions
function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

function getBrowserInfo() {
  const ua = navigator.userAgent;
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Safari") > -1) return "Safari";
  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("Edge") > -1) return "Edge";
  return "Unknown";
}

function getGPUInfo() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {
    return "Unknown";
  }
  return "Unknown";
}

export default FallbackUI;
