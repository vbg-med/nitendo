import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log to external service (optional)
    if (window.logErrorToService) {
      window.logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          className="fixed inset-0 bg-[#050508] z-[9999] flex flex-col items-center justify-center p-6 text-center select-none font-mono overflow-hidden"
          role="alert"
          aria-live="assertive"
          aria-label="System error dialog"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-20 pointer-events-none z-0"></div>

          <div className="relative z-10 max-w-2xl">
            {/* Error Icon */}
            <div
              className="w-24 h-24 mx-auto mb-8 flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-pulse"></div>
              <svg
                className="w-12 h-12 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* Error Message */}
            <h1
              className="font-['Orbitron'] text-red-500 text-2xl mb-4 tracking-widest uppercase font-bold"
              id="error-title"
            >
              SYSTEM ERROR
            </h1>

            <section
              className="border border-red-500/30 bg-red-950/10 p-6 rounded mb-6 text-left"
              aria-labelledby="error-title"
              aria-describedby="error-description"
            >
              <p className="text-xs text-red-500 font-mono tracking-wider mb-2">
                ERROR_CODE: RENDER_FAILURE
              </p>
              <p
                className="text-sm text-red-100/80 font-mono mb-4"
                id="error-description"
              >
                The 3D rendering engine encountered an unexpected error. This
                might be due to:
              </p>
              <ul className="text-xs text-red-100/60 font-mono space-y-1 mb-4 list-disc list-inside">
                <li>WebGL not supported by your browser</li>
                <li>Insufficient GPU memory or resources</li>
                <li>Browser hardware acceleration disabled</li>
                <li>An unexpected application error</li>
              </ul>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 pt-4 border-t border-red-500/20">
                  <summary
                    className="text-xs text-red-400 cursor-pointer hover:text-red-300 mb-2"
                    aria-label="Toggle debug information"
                  >
                    Debug Info (Development Only)
                  </summary>
                  <pre className="text-[10px] text-red-200/60 bg-red-950/20 p-3 rounded overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {"\n\n"}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </section>

            {/* Action Buttons */}
            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-cyan-950 font-mono text-sm font-bold rounded border border-cyan-400/50 transition-all duration-200 uppercase tracking-wide"
                aria-label="Restart the system"
              >
                Restart System
              </button>
              <button
                onClick={() =>
                  (window.location.href =
                    "https://github.com/yourusername/nitendo/issues")
                }
                className="px-6 py-3 bg-transparent hover:bg-cyan-950/30 text-cyan-400 font-mono text-sm font-bold rounded border border-cyan-500/50 transition-all duration-200 uppercase tracking-wide"
                aria-label="Report issue on GitHub"
              >
                Report Issue
              </button>
            </nav>

            {/* Recovery Steps */}
            <section
              className="mt-8 text-left text-xs text-cyan-200/70 font-mono space-y-2"
              aria-label="Troubleshooting steps"
            >
              <h2 className="font-bold text-cyan-300">Troubleshooting Steps:</h2>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Ensure your browser is up to date</li>
                <li>Disable browser extensions (ad-blockers, etc.)</li>
                <li>Clear browser cache and cookies</li>
                <li>Try a different browser</li>
                <li>Check your GPU drivers are current</li>
              </ol>
            </section>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
