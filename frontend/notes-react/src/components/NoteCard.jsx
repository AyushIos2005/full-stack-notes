import { COLOR_HEX, formatDate } from "../utils.js";

export default function NoteCard({ note, color, onEdit, onDelete }) {
  return (
    <article
      className="note-card"
      style={{ "--card-color": COLOR_HEX[color] || "#FFFFFF" }}
      tabIndex={0}
      onClick={() => onEdit(note)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEdit(note);
      }}
    >
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-footer">
        <span className="note-date">{formatDate(note.updatedAt || note.createdAt)}</span>
        <span className="note-actions">
          <button
            className="edit-btn"
            title="Edit"
            aria-label="Edit note"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            ✎
          </button>
          <button
            className="delete-btn"
            title="Delete"
            aria-label="Delete note"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            🗑
          </button>
        </span>
      </div>
    </article>
  );
}
