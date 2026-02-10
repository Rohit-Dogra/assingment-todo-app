import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTasksState } from '../store/slices/tasksSlice'
import { persistTasks } from '../store/slices/tasksSlice'
import '../styles/ExportImport.css'

export default function ExportImport() {
  const dispatch = useDispatch()
  const tasks = useSelector((s) => s.tasks)
  const [message, setMessage] = useState('')

  const exportData = () => {
    const data = {
      tasks: tasks.tasks,
      order: tasks.order,
      categories: tasks.categories,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tasks-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Exported!')
    setTimeout(() => setMessage(''), 2000)
  }

  const importData = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = (e) => {
      const file = e.target?.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result)
          if (data.tasks && Array.isArray(data.tasks)) {
            dispatch(setTasksState({
              tasks: data.tasks,
              order: data.order ?? data.tasks.map((t) => t.id),
              categories: data.categories ?? [],
            }))
            dispatch(persistTasks())
            setMessage('Imported!')
          } else setMessage('Invalid file')
        } catch {
          setMessage('Invalid file')
        }
        setTimeout(() => setMessage(''), 2000)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div className="export-import">
      <button type="button" className="btn btn-secondary" onClick={exportData}>
        Export
      </button>
      <button type="button" className="btn btn-secondary" onClick={importData}>
        Import
      </button>
      {message && <span className="export-import-msg" role="status">{message}</span>}
    </div>
  )
}
