// Matches the actual backend routes:
//   POST   {BASE}/notes          -> { message }               (no note returned)
//   GET    {BASE}/notes          -> { message, notes: [...] }
//   PATCH  {BASE}/update/:id     -> { message }  (description only, no note returned)
//   DELETE {BASE}/relief/:id     -> { message }

export const DEFAULT_API_BASE = "http://localhost:3000";

export function mapNote(raw) {
  return {
    id: raw._id ?? raw.id,
    title: raw.title ?? "Untitled",
    content: raw.description ?? "",
    createdAt: raw.createdAt ?? null,
    updatedAt: raw.updatedAt ?? raw.createdAt ?? null,
  };
}

async function request(base, path, options = {}) {
  const url = `${base.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Something went wrong (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch (_) {}
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchNotes(apiBase) {
  const json = await request(apiBase, "/notes", { method: "GET" });
  const list = json?.notes ?? [];
  return (Array.isArray(list) ? list : []).map(mapNote);
}

// The backend doesn't return the created note, so callers should
// re-fetch the list afterward to get its generated _id.
export async function createNoteRequest(apiBase, title, content) {
  await request(apiBase, "/notes", {
    method: "POST",
    body: JSON.stringify({ title, description: content }),
  });
}

// NOTE: the backend's PATCH /update/:id only persists `description`,
// not `title` — a title edit will not be saved until that route is
// updated server-side. It also returns no note, so callers should
// re-fetch the list afterward.
export async function updateNoteRequest(apiBase, id, title, content) {
  await request(apiBase, `/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, description: content }),
  });
}

export async function deleteNoteRequest(apiBase, id) {
  await request(apiBase, `/relief/${id}`, { method: "DELETE" });
}
