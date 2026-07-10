import { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import NotesGrid from "./components/NotesGrid.jsx";
import NoteModal from "./components/NoteModal.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import Toast from "./components/Toast.jsx";
import {
  DEFAULT_API_BASE,
  fetchNotes,
  createNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
} from "./api.js";
// fetchNotes is already imported above and used both by loadNotes() and
// directly inside handleNoteSubmit to diff in the newly created note.

function readLocalJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export default function App() {
  const [apiBase, setApiBase] = useState(
    () => localStorage.getItem("notesApiBase") || DEFAULT_API_BASE
  );
  const [notes, setNotes] = useState([]);
  const [colors, setColors] = useState(() => readLocalJSON("notesColors", {}));
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [toast, setToast] = useState({ message: "", isError: false, visible: false });
  const toastTimer = useRef(null);

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  const showToast = useCallback((message, isError = false) => {
    clearTimeout(toastTimer.current);
    setToast({ message, isError, visible: true });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3000);
  }, []);

  const saveColors = useCallback((next) => {
    setColors(next);
    localStorage.setItem("notesColors", JSON.stringify(next));
  }, []);

  const loadNotes = useCallback(async (base) => {
    setLoading(true);
    setConnectionError("");
    try {
      const list = await fetchNotes(base);
      setNotes(list);
    } catch (err) {
      setConnectionError(`Can't reach your notes server — ${err.message}. Check the connection settings.`);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes(apiBase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Note modal ----------

  function openNoteModal(note = null) {
    setEditingNote(note);
    setNoteModalOpen(true);
  }

  function closeNoteModal() {
    setNoteModalOpen(false);
    setEditingNote(null);
  }

  async function handleNoteSubmit({ title, content, color }) {
    setSaving(true);
    try {
      if (editingNote) {
        await updateNoteRequest(apiBase, editingNote.id, title, content);
        const next = { ...colors };
        if (color === "default") delete next[editingNote.id];
        else next[editingNote.id] = color;
        saveColors(next);
        await loadNotes(apiBase);
        showToast("Note updated.");
      } else {
        const before = new Set(notes.map((n) => n.id));
        await createNoteRequest(apiBase, title, content);
        // The backend doesn't hand back the new note's id, so re-fetch
        // the list from the server and diff to find it.
        const list = await fetchNotes(apiBase);
        setNotes(list);
        if (color !== "default") {
          const created = list.find((n) => !before.has(n.id));
          if (created) saveColors({ ...colors, [created.id]: color });
        }
        showToast("Note saved.");
      }
      closeNoteModal();
    } catch (err) {
      showToast(`Couldn't save: ${err.message}`, true);
    } finally {
      setSaving(false);
    }
  }

  // ---------- Delete ----------

  function openDeleteConfirm(id) {
    setDeletingId(id);
  }

  function closeDeleteConfirm() {
    setDeletingId(null);
  }

  async function confirmDelete() {
    const id = deletingId;
    closeDeleteConfirm();
    if (!id) return;
    setDeleteBusy(true);
    try {
      await deleteNoteRequest(apiBase, id);
      setNotes((prev) => prev.filter((n) => n.id != id));
      const next = { ...colors };
      delete next[id];
      saveColors(next);
      showToast("Note deleted.");
    } catch (err) {
      if (/not found/i.test(err.message)) {
        setNotes((prev) => prev.filter((n) => n.id != id));
        const next = { ...colors };
        delete next[id];
        saveColors(next);
        showToast("Note was already deleted.");
      } else {
        showToast(`Couldn't delete: ${err.message}`, true);
      }
    } finally {
      setDeleteBusy(false);
    }
  }

  // ---------- Settings ----------

  function handleSaveSettings(value) {
    setApiBase(value);
    localStorage.setItem("notesApiBase", value);
    setSettingsOpen(false);
    loadNotes(value);
  }

  // ---------- Sidebar / menu ----------

  function handleMenuClick() {
    if (isMobile()) {
      setSidebarMobileOpen((v) => !v);
    } else {
      setSidebarCollapsed((v) => !v);
    }
  }

  function closeMobileSidebar() {
    setSidebarMobileOpen(false);
  }

  // ---------- Keyboard: Escape closes topmost overlay ----------

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== "Escape") return;
      if (noteModalOpen) closeNoteModal();
      else if (deletingId) closeDeleteConfirm();
      else if (settingsOpen) setSettingsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [noteModalOpen, deletingId, settingsOpen]);

  return (
    <>
      <div className="app-shell">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={sidebarMobileOpen}
          onOverlayClick={closeMobileSidebar}
          onSettingsClick={() => setSettingsOpen(true)}
        />

        <div className="main-area">
          <Topbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onMenuClick={handleMenuClick}
            onAddNote={() => openNoteModal()}
          />

          {connectionError && <div className="connection-banner">{connectionError}</div>}

          <main className="page">
            <div className="page-header">
              <h1>Notes</h1>
            </div>

            <NotesGrid
              loading={loading}
              notes={notes}
              searchTerm={searchTerm}
              colors={colors}
              onAddNote={() => openNoteModal()}
              onEdit={openNoteModal}
              onDelete={openDeleteConfirm}
            />
          </main>
        </div>
      </div>

      <button className="fab" aria-label="New note" onClick={() => openNoteModal()}>+</button>

      <NoteModal
        open={noteModalOpen}
        note={editingNote}
        initialColor={editingNote ? colors[editingNote.id] || "default" : "default"}
        saving={saving}
        onClose={closeNoteModal}
        onSubmit={handleNoteSubmit}
      />

      <ConfirmModal
        open={!!deletingId}
        busy={deleteBusy}
        onCancel={closeDeleteConfirm}
        onConfirm={confirmDelete}
      />

      <SettingsModal
        open={settingsOpen}
        apiBase={apiBase}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
      />

      <Toast message={toast.message} isError={toast.isError} visible={toast.visible} />
    </>
  );
}
