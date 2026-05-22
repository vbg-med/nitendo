export function NotFound() {
  return (
    <div className="fixed inset-0 bg-[#050508] z-[9999] flex flex-col items-center justify-center p-6 text-center select-none font-mono overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl">
        {/* 404 Icon */}
        <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-red-500/20 rounded-lg animate-pulse"></div>
          <div className="absolute inset-2 border border-red-500/40 rounded-lg animate-[spin_4s_infinite]"></div>
          <span className="font-['Orbitron'] text-5xl font-bold text-red-500">
            404
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['Orbitron'] text-red-500 text-2xl mb-2 tracking-widest uppercase font-bold">
          SIGNAL LOST
        </h1>
        <p className="text-red-400 text-sm mb-6 tracking-wide">
          PAGE NOT FOUND
        </p>

        {/* Message */}
        <div className="border border-red-500/30 bg-red-950/10 p-6 rounded mb-6 text-left">
          <p className="text-xs text-red-500 font-mono tracking-wider mb-3">
            ERR_404_NOT_FOUND
          </p>
          <p className="text-sm text-red-100/80 mb-4">
            The page you're trying to access doesn't exist in this console. It
            might have been moved, deleted, or the URL might be incorrect.
          </p>

          <details className="mt-4 pt-4 border-t border-red-500/20">
            <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300 mb-2 font-mono">
              Debug Info
            </summary>
            <pre className="text-[10px] text-red-200/60 bg-red-950/20 p-3 rounded overflow-auto max-h-32 font-mono">
              {`URL: ${window.location.pathname}
Status: 404 Not Found
Time: ${new Date().toISOString()}`}
            </pre>
          </details>
        </div>

        {/* Suggestions */}
        <div className="mb-6 text-left">
          <p className="text-xs text-cyan-300 mb-3 font-bold uppercase">
            Possible solutions:
          </p>
          <ul className="text-xs text-cyan-100/70 space-y-2 list-disc list-inside font-mono">
            <li>Check the URL spelling</li>
            <li>Click the button below to return to portfolio</li>
            <li>Use the search function to find content</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-cyan-950 font-mono text-sm font-bold rounded border border-cyan-400/50 transition-all duration-200 uppercase tracking-wide"
          >
            Return to Portfolio
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-transparent hover:bg-cyan-950/30 text-cyan-400 font-mono text-sm font-bold rounded border border-cyan-500/50 transition-all duration-200 uppercase tracking-wide"
          >
            Go Back
          </button>
        </div>

        {/* ASCII Art */}
        <div className="mt-8 text-red-500/30 text-xs font-mono overflow-x-auto whitespace-pre">
          {`
  ╔══════════════════╗
  ║  CONSOLE ERROR   ║
  ║  PAGE NOT FOUND  ║
  ╚══════════════════╝
        `}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
