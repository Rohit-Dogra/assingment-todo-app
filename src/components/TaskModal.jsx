import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask, addCategory } from '../store/slices/tasksSlice'
import { closeModal } from '../store/slices/uiSlice'
import { PRIORITY, PRIORITY_LABELS } from '../store/constants'
import '../styles/Modal.css'

export default function TaskModal({ editId, onClose }) {
  const dispatch = useDispatch()
  const task = useSelector((s) => s.tasks.tasks.find((t) => t.id === editId))
  const categories = useSelector((s) => s.tasks.categories)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(PRIORITY.MEDIUM)
  const [category, setCategory] = useState('')
  const [tagsStr, setTagsStr] = useState('')

  const isEdit = Boolean(editId)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setPriority(task.priority || PRIORITY.MEDIUM)
      setCategory(task.category || '')
      setTagsStr((task.tags || []).join(', '))
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    const tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean)
    if (isEdit) {
      dispatch(updateTask({
        id: editId,
        title: trimmed,
        description: description.trim(),
        priority,
        category: category.trim(),
        tags,
      }))
    } else {
      if (category.trim() && !categories.includes(category.trim())) {
        dispatch(addCategory(category.trim()))
      }
      dispatch(addTask({
        title: trimmed,
        description: description.trim(),
        priority,
        category: category.trim(),
        tags,
      }))
    }
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-content">
        <h2 id="task-modal-title" className="modal-title">
          {isEdit ? 'Edit task' : 'Add task'}
        </h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label htmlFor="task-title">Title *</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            required
            autoFocus
            className="modal-input"
          />
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            rows={3}
            className="modal-input modal-textarea"
          />
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="modal-input"
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <label htmlFor="task-category">Category</label>
          <input
            id="task-category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            list="categories-list"
            className="modal-input"
          />
          <datalist id="categories-list">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <label htmlFor="task-tags">Tags (comma separated)</label>
          <input
            id="task-tags"
            type="text"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="work, urgent, ..."
            className="modal-input"
          />
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save' : 'Add task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
