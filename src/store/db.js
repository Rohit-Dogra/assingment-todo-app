import { openDB } from 'idb'
import { STORAGE_KEY, TASKS_STORE } from './constants'

let dbPromise = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(STORAGE_KEY, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(TASKS_STORE)) {
          db.createObjectStore(TASKS_STORE, { keyPath: 'id' })
        }
      },
    })
  }
  return dbPromise
}

export async function loadTasksFromDB() {
  const db = await getDB()
  return db.get(TASKS_STORE, 'tasks') ?? { tasks: [], categories: [], order: [] }
}

export async function saveTasksToDB(data) {
  const db = await getDB()
  await db.put(TASKS_STORE, { ...data, id: 'tasks' })
}
