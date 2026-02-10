import { persistTasks } from '../slices/tasksSlice'

const skipActions = [
  'tasks/load/fulfilled', 'tasks/load/pending', 'tasks/load/rejected',
  'tasks/persist/fulfilled', 'tasks/persist/pending', 'tasks/persist/rejected',
  'history/undo', 'history/redo', 'history/push',
  'ui/setFilter', 'ui/setSearchQuery',
]

const historyMiddleware = (store) => (next) => (action) => {
  const isSkip = skipActions.some((s) => action.type?.startsWith(s))
  const isTaskAction = action.type?.startsWith('tasks/') && !action.type?.includes('load') && !action.type?.includes('persist')
  if (isTaskAction && !isSkip) {
    const state = store.getState()
    store.dispatch({ type: 'history/push', payload: { tasks: JSON.parse(JSON.stringify(state.tasks)) } })
  }
  const result = next(action)
  if (isTaskAction && !isSkip) {
    store.dispatch(persistTasks())
  }
  return result
}

export default historyMiddleware
