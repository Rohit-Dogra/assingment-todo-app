import { undo as historyUndo, redo as historyRedo } from '../slices/historySlice'
import { setTasksState, persistTasks } from '../slices/tasksSlice'

export const undo = () => (dispatch, getState) => {
  const { past } = getState().history
  if (past.length === 0) return
  const snapshot = past[past.length - 1]
  dispatch(setTasksState(snapshot.tasks))
  dispatch(historyUndo())
  dispatch(persistTasks())
}

export const redo = () => (dispatch, getState) => {
  const { future } = getState().history
  if (future.length === 0) return
  const snapshot = future[0]
  dispatch(setTasksState(snapshot.tasks))
  dispatch(historyRedo())
  dispatch(persistTasks())
}
