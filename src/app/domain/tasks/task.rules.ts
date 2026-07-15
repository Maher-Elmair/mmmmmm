import type { Task, TaskStatus } from './task.types'

export function isSelectable(task: Task | undefined): task is Task {
  return !!task && task.status !== 'completed' && task.status !== 'archived'
}

export function isInactiveStatus(status: TaskStatus | undefined): boolean {
  return status === 'completed' || status === 'archived'
}

export function incrementPomodoro(task: Task, nowIso: string): Task {
  return { ...task, completedPomodoros: task.completedPomodoros + 1, updatedAt: nowIso }
}

export function shouldAutoComplete(task: Task | undefined, nextCompletedPomodoros: number): boolean {
  return !!task && nextCompletedPomodoros >= task.estimatedPomodoros && task.status !== 'completed'
}

export function reorderActive(tasks: Task[], fromIndex: number, toIndex: number): Task[] {
  const active = tasks.filter((t) => t.status !== 'archived' && t.status !== 'completed')
  const others = tasks.filter((t) => t.status === 'archived' || t.status === 'completed')
  const next = [...active]
  const [moved] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, moved)
  return [...next, ...others]
}
