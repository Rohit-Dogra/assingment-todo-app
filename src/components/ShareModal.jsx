import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PRIORITY_LABELS } from '../store/constants'
import '../styles/Modal.css'

export default function ShareModal({ taskId, onClose }) {
  const task = useSelector((s) => s.tasks.tasks.find((t) => t.id === taskId))
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setTimeout(onClose, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  if (!task) return null

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-content">
        <h2 id="share-modal-title" className="modal-title">
          Share task
        </h2>
        <p className="share-task-preview">
          <strong>{task.title}</strong>
          {task.category && <span className="share-meta"> · {task.category}</span>}
          {task.priority && <span className="share-meta"> · {PRIORITY_LABELS[task.priority]}</span>}
        </p>
        {sent ? (
          <p className="share-success" role="status">
            Share link sent to {email} (mock)
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="share-form">
            <label htmlFor="share-email">Email address</label>
            <input
              id="share-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="modal-input"
            />
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Send share link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
