export default function Topbar({ searchTerm, onSearchChange, onMenuClick, onAddNote }) {
  return (
    <header className="topbar">
      <button className="icon-only-btn hamburger" aria-label="Menu" onClick={onMenuClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>

      <div className="search-wrap">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <input
          type="text"
          placeholder="Search your notes…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="btn primary add-btn" onClick={onAddNote}>
          <span className="plus">+</span> New note
        </button>
      </div>
    </header>
  );
}
