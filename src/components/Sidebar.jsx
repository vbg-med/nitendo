export default function Sidebar({ sections, scrollElRef, showMenu, onPageChange, activePage }) {

  if (showMenu) {
    return (
      <div className="sidebar menu-mode">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <div className="menu-items">
          {["about", "skills", "projects", "contact"].map((page) => (
            <button
              key={page}
              className={`menu-item ${activePage === page ? "active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      {/* ✅ fix #2 — ref attached here, Gamepad's useFrame writes scrollTop directly */}
      <div ref={scrollElRef} className="sidebar-content">
        {sections.map((section, index) => (
          <div key={index} className="sidebar-section">
            <h3>{section}</h3>
            <div className="section-content">
              <p>Content for {section} section...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}