export default function ConfirmModal({ open, busy, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal confirm-modal" role="dialog" aria-modal="true">
        <h2>Delete forever?</h2>
        <p>This can't be undone.</p>
        <div className="modal-footer">
          <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn danger" disabled={busy} onClick={onConfirm}>
            Delete forever
          </button>
        </div>
      </div>
    </div>
  );
}
