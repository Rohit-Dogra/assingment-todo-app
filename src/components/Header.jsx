import { useDispatch } from 'react-redux'
import { undo, redo } from '../store/thunks/historyThunks'
import { useSelector } from 'react-redux'
import '../styles/Header.css'

export default function Header({ onMenuClick, onSidebarToggle, sidebarOpen }) {
  const dispatch = useDispatch()
  const canUndo = useSelector((s) => s.history.past.length) > 0
  const canRedo = useSelector((s) => s.history.future.length) > 0

  return (
    <header className="header" role="banner">
      <button
        type="button"
        className="icon-btn menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <div className="header-brand">
        <span className="logo" aria-hidden="true">◇</span>
        <h1 className="title">Task Tracker</h1>
      </div>
      <div className="header-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={onSidebarToggle}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => dispatch(undo())}
          disabled={!canUndo}
          aria-label="Undo"
          title="Undo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" />
          </svg>
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => dispatch(redo())}
          disabled={!canRedo}
          aria-label="Redo"
          title="Redo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10H11a5 5 0 00-5 5v2M21 10l-4-4M21 10l-4 4" />
          </svg>
        </button>
      </div>
    </header>
  )
}
