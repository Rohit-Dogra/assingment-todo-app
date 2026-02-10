import { createSlice } from '@reduxjs/toolkit'
import { FILTER_STATUS } from '../constants'

const initialState = {
  filter: FILTER_STATUS.ALL,
  searchQuery: '',
  sidebarOpen: true,
  modal: null,
  shareModalTaskId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload
    },
    setSidebarOpen: (state, { payload }) => {
      state.sidebarOpen = payload !== undefined ? payload : !state.sidebarOpen
    },
    openModal: (state, { payload }) => {
      if (typeof payload === 'string') {
        state.modal = payload
      } else if (payload && typeof payload === 'object') {
        state.modal = payload.type
        state.shareModalTaskId = payload.taskId ?? null
      }
    },
    closeModal: (state) => {
      state.modal = null
      state.shareModalTaskId = null
    },
    setShareModalTaskId: (state, { payload }) => {
      state.shareModalTaskId = payload
    },
  },
})

export const {
  setFilter,
  setSearchQuery,
  setSidebarOpen,
  openModal,
  closeModal,
  setShareModalTaskId,
} = uiSlice.actions
export default uiSlice.reducer
