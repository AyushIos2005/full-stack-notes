export function EmptyState({ onAddNote }) {
  return (
    <div className="empty-state">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="24" y="16" width="72" height="90" rx="8" fill="#F1EEFF" stroke="#C9BFF7" strokeWidth="2" />
        <path d="M40 40h40M40 54h40M40 68h26" stroke="#B7A8F0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="86" cy="86" r="18" fill="#7C5CFC" />
        <path d="M86 79v14M79 86h14" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h2>No notes yet</h2>
      <p>Everything you jot down will show up here. Start with your first one.</p>
      <button className="btn primary" onClick={onAddNote}><span className="plus">+</span> New note</button>
    </div>
  );
}

export function NoResultsState() {
  return (
    <div className="empty-state">
      <h2>No matches</h2>
      <p>Nothing matches your search. Try a different keyword.</p>
    </div>
  );
}
