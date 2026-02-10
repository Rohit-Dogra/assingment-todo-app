import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskList from './TaskList'
import Dashboard from './Dashboard'
import TaskModal from './TaskModal'
import ShareModal from './ShareModal'
import ExportImport from './ExportImport'
import { closeModal } from '../store/slices/uiSlice'
import '../styles/MainContent.css'

export default function MainContent() {
  const dispatch = useDispatch()
  const [view, setView] = useState('list')
  const modalState = useSelector((s) => s.ui.modal)
  const shareTaskId = useSelector((s) => s.ui.shareModalTaskId)

  useEffect(() => {
    const onHash = () => setView(window.location.hash === '#dashboard' ? 'dashboard' : 'list')
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="main-content">
      {view === 'dashboard' ? (
        <Dashboard />
      ) : (
        <>
          <div className="main-toolbar">
            <ExportImport />
          </div>
          <TaskList />
        </>
      )}
      {modalState === 'add' && (
        <TaskModal onClose={() => dispatch(closeModal())} />
      )}
      {modalState === 'edit' && (
        <TaskModal editId={shareTaskId} onClose={() => dispatch(closeModal())} />
      )}
      {modalState === 'share' && (
        <ShareModal taskId={shareTaskId} onClose={() => dispatch(closeModal())} />
      )}
    </div>
  )
}

