# Notes — React version

A React (Vite) port of the original vanilla HTML/CSS/JS notes app. Same look,
same backend contract, same feature set.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Backend

Wired to match this Express + Mongoose backend's actual routes:

```
POST   {BASE}/notes         -> { message }                (note NOT returned)
GET    {BASE}/notes         -> { message, notes: [...] }
PATCH  {BASE}/update/:id    -> { message }  (only saves `description`, note NOT returned)
DELETE {BASE}/relief/:id    -> { message }
```

Because create/update don't hand back the saved note, `src/api.js` /
`src/App.jsx` re-fetch the full list from `GET /notes` right after a
create or update to pick up the server-generated `_id` and current data.

**Known backend limitation:** `PATCH /update/:id` only reads
`req.body.description`, so editing a note's *title* in the UI won't
persist — only the content will save. To fix this, update the route to
also apply the title:

```js
app.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  await noteModel.findOneAndUpdate(
    { _id: id },
    { title, description }
  );
  res.status(200).json({ message: "Okay Update" });
});
```

**CORS:** this backend has no CORS middleware. Since the Vite dev server
(default `http://localhost:5173`) and the API run on different ports,
add to the backend:

```bash
npm install cors
```
```js
const cors = require("cors");
app.use(cors());
```

Set your backend address from the app's sidebar → **Settings** (e.g.
`http://localhost:3000` — no `/notes` suffix, since the routes are inconsistent
path-wise). It's stored in `localStorage` (`notesApiBase`).

## Project structure

```
src/
  api.js              // fetch wrapper + response (un)wrapping, matches original script.js
  utils.js            // color palette + date formatting helpers
  App.jsx             // top-level state: notes, colors, modals, search, settings
  index.css           // original style.css, unchanged
  components/
    Sidebar.jsx
    Topbar.jsx
    NotesGrid.jsx
    NoteCard.jsx
    NoteModal.jsx      // add/edit note
    ConfirmModal.jsx   // "delete forever" confirmation
    SettingsModal.jsx  // backend address
    Toast.jsx
    EmptyState.jsx
    Skeleton.jsx
```

## What's carried over 1:1

- Notes list, search/filter, create/edit/delete, per-note color picker
  (colors are stored client-side in `localStorage`, exactly as before).
- Loading skeleton, empty state, no-results state, connection-error banner.
- Settings modal for the backend URL, with the same `localStorage` key.
- Responsive sidebar: collapses on desktop, slides in as an overlay on mobile
  (same `matchMedia("(max-width: 768px)")` breakpoint).

## What's still just UI (as in the original)

The original `script.js` never wired these up — the markup existed but had no
event listeners — so this port leaves them the same way rather than inventing
new behavior:

- **Reminders / Labels / Archive / Trash** sidebar views (only "Notes" is
  live).
- The reminder date field and label chips inside the note editor.
- The "Help & feedback" panel.

If you'd like any of these made functional, that's a good next step — just ask.
