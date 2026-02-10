import { createSelector } from '@reduxjs/toolkit'
import { FILTER_STATUS } from './constants'

export const selectTasks = (state) => state.tasks.tasks
export const selectOrder = (state) => state.tasks.order
export const selectCategories = (state) => state.tasks.categories
export const selectFilter = (state) => state.ui.filter
export const selectSearchQuery = (state) => state.ui.searchQuery
export const selectHistoryPast = (state) => state.history.past
export const selectHistoryFuture = (state) => state.history.future

export const selectOrderedTasks = createSelector(
  [selectTasks, selectOrder],
  (tasks, order) => {
    const byId = Object.fromEntries(tasks.map((t) => [t.id, t]))
    return order.map((id) => byId[id]).filter(Boolean)
  }
)

export const selectFilteredAndSearchTasks = createSelector(
  [selectOrderedTasks, selectFilter, selectSearchQuery],
  (ordered, filter, query) => {
    let list = ordered
    if (filter === FILTER_STATUS.ACTIVE) list = list.filter((t) => !t.completed)
    if (filter === FILTER_STATUS.COMPLETED) list = list.filter((t) => t.completed)
    const q = (query || '').trim().toLowerCase()
    if (q) {
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q)) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
      )
    }
    return list
  }
)

export const selectTaskStats = createSelector([selectTasks], (tasks) => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const active = total - completed
  const byPriority = tasks.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1
    return acc
  }, {})
  const byCategory = tasks.reduce((acc, t) => {
    const c = t.category || 'Uncategorized'
    acc[c] = (acc[c] || 0) + 1
    return acc
  }, {})
  return { total, completed, active, byPriority, byCategory }
})
