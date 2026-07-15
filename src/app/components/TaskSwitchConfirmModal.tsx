import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { useStore } from '../stores/useStore'
import { isInactiveStatus } from '../domain/tasks/task.rules'

/**
 * Shown when the user picks a different task while a pomodoro session is
 * already in progress on another task. Prevents accidental loss of session
 * context — the user must explicitly decide what to do with the running timer.
 */
export function TaskSwitchConfirmModal() {
  const pendingTaskSwitch = useStore((s) => s.pendingTaskSwitch)
  const setPendingTaskSwitch = useStore((s) => s.setPendingTaskSwitch)
  const tasks = useStore((s) => s.tasks)
  const activeTaskId = useStore((s) => s.activeTaskId)
  const isRunning = useStore((s) => s.isRunning)
  const setIsRunning = useStore((s) => s.setIsRunning)
  const resetTimer = useStore((s) => s.resetTimer)

  const open = !!pendingTaskSwitch
  const currentTask = tasks.find((t) => t.id === activeTaskId)
  const nextTask = tasks.find((t) => t.id === pendingTaskSwitch)

  const clear = () => setPendingTaskSwitch(null)

  const switchTo = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task || isInactiveStatus(task.status)) return
    useStore.setState({ activeTaskId: id, pendingTaskSwitch: null })
  }

  const handleSwitchKeepTimer = () => {
    if (!pendingTaskSwitch) return
    switchTo(pendingTaskSwitch)
  }

  const handleStopAndSwitch = () => {
    if (!pendingTaskSwitch) return
    if (isRunning) setIsRunning(false)
    resetTimer()
    switchTo(pendingTaskSwitch)
  }

  return (
    <AlertDialog open={open} onOpenChange={(o) => { if (!o) clear() }}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>A focus session is already in progress</AlertDialogTitle>
          <AlertDialogDescription>
            You're currently focusing on{' '}
            <span className="text-foreground font-medium">"{currentTask?.title ?? 'a task'}"</span>.
            Switching to{' '}
            <span className="text-foreground font-medium">"{nextTask?.title ?? 'another task'}"</span>{' '}
            now would reassign this session. How would you like to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleStopAndSwitch}>Stop timer &amp; switch task</Button>
          <Button variant="outline" onClick={handleSwitchKeepTimer}>
            Keep timer running on new task
          </Button>
          <Button variant="ghost" onClick={clear}>Keep current task</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
