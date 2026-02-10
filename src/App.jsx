import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadTasks } from './store/slices/tasksSlice'
import { undo, redo } from './store/thunks/historyThunks'
import Layout from './components/Layout'
import './styles/App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault()
          dispatch(e.shiftKey ? redo() : undo())
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [dispatch])

  return (
    <div className="app" role="application" aria-label="Task Tracker">
      <Layout />
    </div>
  )
}

export default App
