import { createSlice } from '@reduxjs/toolkit'

const MAX = 50

const historySlice = createSlice({
  name: 'history',
  initialState: {
    past: [],
    future: [],
  },
  reducers: {
    push: (state, { payload }) => {
      state.past = state.past.slice(-(MAX - 1))
      state.past.push(payload)
      state.future = []
    },
    undo: (state) => {
      if (state.past.length === 0) return
      state.future.unshift(state.past.pop())
    },
    redo: (state) => {
      if (state.future.length === 0) return
      state.past.push(state.future.shift())
    },
    clearHistory: (state) => {
      state.past = []
      state.future = []
    },
  },
})

export const { push, undo, redo, clearHistory } = historySlice.actions
export default historySlice.reducer
