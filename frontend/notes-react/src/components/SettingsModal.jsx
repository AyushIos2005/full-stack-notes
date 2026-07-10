import { useEffect, useState } from "react";
import { DEFAULT_API_BASE } from "../api.js";

export default function SettingsModal({ open, apiBase, onClose, onSave }) {
  const [value, setValue] = useState(apiBase);

  useEffect(() => {
    if (open) setValue(apiBase);
  }, [open, apiBase]);

  if (!open) return null;

  function handleSave() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSave(trimmed);
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="icon-only-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <label className="field-label" htmlFor="apiUrlInput">Backend server address</label>
        <input
          type="password"
          id="apiUrlInput"
          className="title-field"
          placeholder="http://localhost:3000/api/notes"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="field-hint">This is where your notes are stored. Only change this if you know your backend's address.</p>
        <div className="modal-footer" style={{ justifyContent: "space-between" }}>
          <button type="button" className="btn ghost" onClick={() => setValue(DEFAULT_API_BASE)}>
            Reset to default
          </button>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="button" className="btn primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
