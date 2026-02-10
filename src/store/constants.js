export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
}

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High',
  [PRIORITY.URGENT]: 'Urgent',
}

export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: '#22c55e',
  [PRIORITY.MEDIUM]: '#eab308',
  [PRIORITY.HIGH]: '#f97316',
  [PRIORITY.URGENT]: '#ef4444',
}

export const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const STORAGE_KEY = 'task_tracker_db'
export const TASKS_STORE = 'tasks'
