import { useEffect, useRef, useState } from "react";
import { COLOR_DOTS } from "../utils.js";

export default function NoteModal({ open, note, initialColor, saving, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("default");
  const titleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setColor(note ? initialColor || "default" : "default");
    // focus title field once the modal is shown
    setTimeout(() => titleRef.current?.focus(), 0);
  }, [open, note, initialColor]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) return;
    onSubmit({ title: trimmedTitle, content: trimmedContent, color });
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="modal-header">
          <h2 id="modalTitle">{note ? "Edit note" : "New note"}</h2>
          <button className="icon-only-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="title-field"
            placeholder="Title"
            maxLength={120}
            required
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="content-field"
            placeholder="Take a note…"
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="color-picker">
            <span className="color-picker-label">Color</span>
            {COLOR_DOTS.map((dot) => (
              <button
                key={dot.name}
                type="button"
                className={`color-dot${color === dot.name ? " selected" : ""}`}
                style={{ "--dot": dot.swatch }}
                onClick={() => setColor(dot.name)}
              />
            ))}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="reminderInput">🔔 Reminder</label>
            <div className="reminder-row">
              <input type="datetime-local" id="reminderInput" />
              <button type="button" className="btn ghost small">Clear</button>
            </div>
          </div>

          <div className="field-group">
            <span className="field-label">🏷️ Labels</span>
            <div className="label-chip-row">
              <span className="muted-text">No labels yet — create one from the sidebar.</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={saving}>
              {note ? "Save changes" : "Save note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
