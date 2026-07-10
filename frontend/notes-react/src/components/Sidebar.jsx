export default function Sidebar({ collapsed, mobileOpen, onOverlayClick, onSettingsClick }) {
  const classNames = ["sidebar"];
  if (collapsed) classNames.push("collapsed");
  if (mobileOpen) classNames.push("show");

  return (
    <>
      <div
        className={`sidebar-overlay${mobileOpen ? " show" : ""}`}
        onClick={onOverlayClick}
      />

      <aside className={classNames.join(" ")}>
        <div className="sidebar-brand">
          <span className="brand-mark">✎</span>
          <span className="brand-name">Notes</span>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-item active" data-view="notes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.4.3.6.8.6 1.3V16h6v-.9c0-.5.2-1 .6-1.3A6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>Notes</span>
          </button>
          <button className="sidebar-item" data-view="reminders">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <span>Reminders</span>
          </button>
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-section-header">
          <span>Labels</span>
          <button className="link-btn">Edit</button>
        </div>
        <nav className="sidebar-nav" />
        <button className="sidebar-item subtle">
          <span className="plus">+</span><span>Create new label</span>
        </button>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          <button className="sidebar-item" data-view="archive">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" /><path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" stroke="currentColor" strokeWidth="1.8" /><path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <span>Archive</span>
          </button>
          <button className="sidebar-item" data-view="trash">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0v12a2 2 0 002 2h6a2 2 0 002-2V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <span>Trash</span>
          </button>
          <button className="sidebar-item" onClick={onSettingsClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.8" /><path d="M19.4 13a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H10a1.65 1.65 0 001-1.51V4a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V10a1.65 1.65 0 001.51 1H20a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8" /></svg>
            <span>Settings</span>
          </button>
          <button className="sidebar-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" /><path d="M9.5 9a2.5 2.5 0 114 2c-.6.5-1.5 1-1.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="17" r="0.9" fill="currentColor" /></svg>
            <span>Help &amp; feedback</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
