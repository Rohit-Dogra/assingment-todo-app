import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import uiReducer from './slices/uiSlice'
import historyReducer from './slices/historySlice'
import historyMiddleware from './middleware/historyMiddleware'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    ui: uiReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(historyMiddleware),
})
