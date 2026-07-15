export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'pending' | 'active' | 'completed' | 'archived'

export interface Task {
  id: string
  title: string
  description?: string
  notes?: string
  priority: TaskPriority
  status: TaskStatus
  estimatedPomodoros: number
  completedPomodoros: number
  createdAt: string
  updatedAt?: string
  completedAt?: string
  archivedAt?: string
}
