# Task Tracker

A modern Task Tracker built with **React**, **Redux Toolkit**, and **IndexedDB** for persistence.

## Features

- **CRUD tasks** – Create, read, update, delete.
- **Toggle completion** – Mark tasks complete/incomplete
- **Filter** – All, Active, Completed
- **Search** – By title, description, category, tags
- **Categories & tags** – Organize tasks
- **Priority levels** – Low, Medium, High, Urgent (with color coding)
- **Drag-and-drop** – Reorder tasks (@dnd-kit)
- **Undo/Redo** – History (Ctrl+Z / Cmd+Z, Ctrl+Shift+Z / Cmd+Shift+Z)
- **Export/Import** – JSON backup
- **Dashboard** – Completion stats, by priority, by category (Recharts)
- **Share (mock)** – Share task via email mock
- **Accessibility** – Skip link, focus visible, ARIA, keyboard nav
- **Responsive** – Mobile-first layout

## Tech stack

- React 18 (functional components,hooks)
- Redux Toolkit + Redux Thunk
- IndexedDB (via `idb`) for persistence
- Vite, CSS variables, Outfit + JetBrains Mono fonts

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

- `src/store/` – Redux store, slices (tasks, ui, history), selectors, thunks, IndexedDB helpers
- `src/components/` – Layout, Header, Sidebar, TaskList, TaskItem, TaskModal, ShareModal, Dashboard, ExportImport
- `src/styles/` – Component CSS with CSS variables
