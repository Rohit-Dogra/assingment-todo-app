import { useDispatch } from 'react-redux'
import { toggleTask, updateTask, deleteTask } from '../store/slices/tasksSlice'
import { openModal } from '../store/slices/uiSlice'
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../store/constants'
import '../styles/TaskItem.css'

export default function TaskItem({ task, dragHandleProps }) {
  const dispatch = useDispatch()
  const priorityColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium

  const handleToggle = () => dispatch(toggleTask(task.id))
  const handleEdit = () => dispatch(openModal({ type: 'edit', taskId: task.id }))
  const handleDelete = () => dispatch(deleteTask(task.id))
  const handleShare = () => dispatch(openModal({ type: 'share', taskId: task.id }))

  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''}`}
      data-priority={task.priority}
      style={{ '--priority-color': priorityColor }}
    >
      <span
        className="task-drag-handle"
        {...dragHandleProps}
        aria-label="Drag to reorder"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="9" cy="6" r="1.5" />
          <circle cx="15" cy="6" r="1.5" />
          <circle cx="9" cy="12" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="9" cy="18" r="1.5" />
          <circle cx="15" cy="18" r="1.5" />
        </svg>
      </span>
      <button
        type="button"
        className="task-checkbox"
        onClick={handleToggle}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        aria-pressed={task.completed}
      >
        {task.completed && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12l5 5L20 7" />
          </svg>
        )}
      </button>
      <div className="task-body">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-priority-badge" style={{ background: `${priorityColor}22`, color: priorityColor }}>
            {PRIORITY_LABELS[task.priority] || task.priority}
          </span>
          {task.category && (
            <span className="task-category">{task.category}</span>
          )}
          {task.tags?.length > 0 && (
            <span className="task-tags">
              {task.tags.map((tag) => (
                <span key={tag} className="task-tag">{tag}</span>
              ))}
            </span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button type="button" className="task-action-btn" onClick={handleShare} aria-label="Share task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
          </svg>
        </button>
        <button type="button" className="task-action-btn" onClick={handleEdit} aria-label="Edit task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button type="button" className="task-action-btn danger" onClick={handleDelete} aria-label="Delete task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </li>
  )
}
