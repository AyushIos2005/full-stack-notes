import Skeleton from "./Skeleton.jsx";
import { EmptyState, NoResultsState } from "./EmptyState.jsx";
import NoteCard from "./NoteCard.jsx";

export default function NotesGrid({ loading, notes, searchTerm, colors, onAddNote, onEdit, onDelete }) {
  if (loading) return <Skeleton />;

  if (notes.length === 0) {
    return <EmptyState onAddNote={onAddNote} />;
  }

  const term = searchTerm.trim().toLowerCase();
  const visible = (term
    ? notes.filter(
        (n) => n.title.toLowerCase().includes(term) || n.content.toLowerCase().includes(term)
      )
    : notes
  )
    .slice()
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0));

  if (visible.length === 0) {
    return <NoResultsState />;
  }

  return (
    <div className="notes-grid">
      {visible.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          color={colors[note.id] || "default"}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
