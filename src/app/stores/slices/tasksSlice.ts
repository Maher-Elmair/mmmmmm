import type { StateCreator } from 'zustand'
import type { Task } from '../../domain/tasks/task.types'
import { isInactiveStatus, reorderActive } from '../../domain/tasks/task.rules'
import { playUiSound } from '../../lib/sounds'
import { enqueueTaskOp } from '../../lib/cloud/sync'
import { newUuid } from '../../lib/cloud/tasksSync'
import type { RootState } from '../rootStore'

export interface TasksSlice {
  tasks: Task[]
  activeTaskId: string | null
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedPomodoros' | 'status'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  archiveTask: (id: string) => void
  setActiveTask: (id: string | null) => void
  requestSetActiveTask: (id: string) => void
  reorderTasks: (fromIndex: number, toIndex: number) => void
  moveTask: (fromId: string, overId: string) => void
  commitReorder: () => void
}

export const createTasksSlice: StateCreator<RootState, [], [], TasksSlice> = (set, get) => ({
  tasks: [],
  activeTaskId: null,

  addTask: (taskData) => {
    const now = new Date().toISOString()
    const task: Task = {
      ...taskData,
      id: newUuid(),
      createdAt: now,
      updatedAt: now,
      completedPomodoros: 0,
      status: 'pending',
    }
    set({ tasks: [...get().tasks, task] })
    playUiSound('taskAdd')
    const position = get().tasks.length - 1
    enqueueTaskOp('create', task.id, { ...task, position })
  },

  updateTask: (id, updates) => {
    const before = get().tasks.find((t) => t.id === id)
    const now = new Date().toISOString()
    const merged: Partial<Task> = { ...updates, updatedAt: now }
    set((state) => {
      const tasks = state.tasks.map((t) => (t.id === id ? { ...t, ...merged } : t))
      const becameInactive = state.activeTaskId === id && isInactiveStatus(updates.status)
      return { tasks, activeTaskId: becameInactive ? null : state.activeTaskId }
    })
    if (before && before.status !== 'completed' && updates.status === 'completed') {
      playUiSound('taskDone')
    }
    enqueueTaskOp('update', id, merged)
  },

  deleteTask: (id) => {
    playUiSound('taskDelete')
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
      activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
    }))
    enqueueTaskOp('delete', id, {})
  },

  archiveTask: (id) => {
    playUiSound('taskArchive')
    const now = new Date().toISOString()
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: 'archived' as const, archivedAt: now, updatedAt: now } : t,
      ),
      activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
    }))
    enqueueTaskOp('update', id, { status: 'archived', updatedAt: now })
  },

  setActiveTask: (id) => {
    const prev = get().activeTaskId
    if (id) {
      const target = get().tasks.find((t) => t.id === id)
      if (!target || isInactiveStatus(target.status)) return
    }
    set({ activeTaskId: id, pendingTaskSwitch: null })
    if (id && id !== prev) playUiSound('click')
  },

  // Guarded task-selection: if a pomodoro session is in progress on a different
  // task, defer the switch and surface a confirmation modal instead of silently
  // reassigning the running session.
  requestSetActiveTask: (id) => {
    const state = get()
    if (id === state.activeTaskId) return
    const target = state.tasks.find((t) => t.id === id)
    if (!target || isInactiveStatus(target.status)) return
    const sessionLockedToTask =
      state.mode === 'pomodoro' &&
      state.sessionInProgress &&
      !!state.activeTaskId &&
      state.activeTaskId !== id
    if (sessionLockedToTask) {
      set({ pendingTaskSwitch: id })
      return
    }
    set({ activeTaskId: id, pendingTaskSwitch: null })
    playUiSound('click')
  },

  reorderTasks: (fromIndex, toIndex) =>
    set((state) => ({ tasks: reorderActive(state.tasks, fromIndex, toIndex) })),

  moveTask: (fromId, overId) => {
    if (fromId === overId) return
    set((state) => {
      const from = state.tasks.findIndex((t) => t.id === fromId)
      const over = state.tasks.findIndex((t) => t.id === overId)
      if (from === -1 || over === -1) return {}
      const next = state.tasks.slice()
      const [moved] = next.splice(from, 1)
      next.splice(over, 0, moved)
      return { tasks: next }
    })
  },

  // Persist the new ordering to the server: enqueue a position update for
  // every active task so the row order matches the local array on every
  // signed-in device via realtime.
  commitReorder: () => {
    const state = get()
    const nowIso = new Date().toISOString()
    state.tasks.forEach((t, idx) => {
      if (t.status === 'completed' || t.status === 'archived') return
      enqueueTaskOp('update', t.id, { position: idx, updatedAt: nowIso })
    })
  },
})
