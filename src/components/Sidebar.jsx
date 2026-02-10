import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setSearchQuery, openModal } from '../store/slices/uiSlice'
import { FILTER_STATUS } from '../store/constants'
import '../styles/Sidebar.css'

const filters = [
  { value: FILTER_STATUS.ALL, label: 'All tasks' },
  { value: FILTER_STATUS.ACTIVE, label: 'Active' },
  { value: FILTER_STATUS.COMPLETED, label: 'Completed' },
]

export default function Sidebar({ onNavigate }) {
  const dispatch = useDispatch()
  const filter = useSelector((s) => s.ui.filter)
  const searchQuery = useSelector((s) => s.ui.searchQuery)

  return (
    <nav className="sidebar" aria-label="Filters and search">
      <div className="sidebar-section">
        <label htmlFor="search-tasks" className="sidebar-label">
          Search
        </label>
        <input
          id="search-tasks"
          type="search"
          className="sidebar-search"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          aria-label="Search tasks"
          autoComplete="off"
        />
      </div>
      <div className="sidebar-section">
        <span className="sidebar-label" id="filter-label">
          Filter by status
        </span>
        <div className="filter-group" role="group" aria-labelledby="filter-label">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`filter-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => {
                dispatch(setFilter(f.value))
                onNavigate?.()
              }}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="sidebar-section">
        <a
          href="#main"
          className="sidebar-link"
          onClick={(e) => {
            e.preventDefault()
            onNavigate?.()
          }}
        >
          Task list
        </a>
        <a
          href="#dashboard"
          className="sidebar-link"
          onClick={(e) => {
            e.preventDefault()
            window.location.hash = 'dashboard'
            onNavigate?.()
          }}
        >
          Dashboard
        </a>
      </div>
      <div className="sidebar-section sidebar-actions">
        <button
          type="button"
          className="btn btn-primary add-task-btn"
          onClick={() => {
            dispatch(openModal('add'))
            onNavigate?.()
          }}
        >
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>
    </nav>
  )
}
