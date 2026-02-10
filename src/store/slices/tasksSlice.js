import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loadTasksFromDB, saveTasksToDB } from '../db'
import { PRIORITY } from '../constants'

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export const loadTasks = createAsyncThunk('tasks/load', async (_, { rejectWithValue }) => {
  try {
    const data = await loadTasksFromDB()
    return data
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const persistTasks = createAsyncThunk(
  'tasks/persist',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { tasks, categories, order } = getState().tasks
      await saveTasksToDB({ tasks, categories, order })
      return payload
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const initialState = {
  tasks: [],
  categories: ['Work', 'Personal', 'Shopping', 'Health'],
  order: [],
  loading: false,
  error: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      const task = {
        id: generateId(),
        title: payload.title.trim(),
        description: payload.description?.trim() || '',
        completed: false,
        priority: payload.priority || PRIORITY.MEDIUM,
        category: payload.category || '',
        tags: payload.tags || [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      state.tasks.push(task)
      state.order.push(task.id)
    },
    updateTask: (state, { payload }) => {
      const i = state.tasks.findIndex((t) => t.id === payload.id)
      if (i !== -1) {
        state.tasks[i] = { ...state.tasks[i], ...payload, updatedAt: Date.now() }
      }
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((t) => t.id !== payload)
      state.order = state.order.filter((id) => id !== payload)
    },
    toggleTask: (state, { payload }) => {
      const t = state.tasks.find((x) => x.id === payload)
      if (t) t.completed = !t.completed
    },
    reorderTasks: (state, { payload }) => {
      state.order = payload
    },
    addCategory: (state, { payload }) => {
      if (payload && !state.categories.includes(payload)) {
        state.categories.push(payload)
      }
    },
    setTasksState: (state, { payload }) => {
      if (payload.tasks) state.tasks = payload.tasks
      if (payload.order) state.order = payload.order
      if (payload.categories) state.categories = payload.categories
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadTasks.fulfilled, (state, { payload }) => {
        state.loading = false
        state.tasks = payload.tasks ?? []
        state.order = payload.order ?? payload.tasks?.map((t) => t.id) ?? []
        state.categories = payload.categories ?? state.categories
      })
      .addCase(loadTasks.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  reorderTasks,
  addCategory,
  setTasksState,
} = tasksSlice.actions
export default tasksSlice.reducer
