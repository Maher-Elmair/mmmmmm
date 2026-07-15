import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from './ui/alert-dialog'
import { useStore } from '../stores/useStore'

export function NoTaskWarningModal() {
  const noTaskWarning = useStore(s => s.noTaskWarning)
  const setNoTaskWarning = useStore(s => s.setNoTaskWarning)
  const setIsRunning = useStore(s => s.setIsRunning)

  const handlePickTask = () => {
    setNoTaskWarning(false)
    // Defer so the dialog can close before we scroll/focus.
    requestAnimationFrame(() => {
      const el = document.getElementById('tasks-section')
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('tasks-section-highlight')
      window.setTimeout(() => el.classList.remove('tasks-section-highlight'), 2200)
      // Try to focus the first interactive element inside (e.g. "Add task" button or input).
      window.setTimeout(() => {
        const focusable = el.querySelector<HTMLElement>(
          'input, button, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.focus({ preventScroll: true })
      }, 350)
    })
  }

  return (
    <AlertDialog open={noTaskWarning} onOpenChange={setNoTaskWarning}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Start without a task?</AlertDialogTitle>
          <AlertDialogDescription>
            You haven't selected an active task. Pick one from your list to track progress, or start a free focus session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handlePickTask}>Pick a task</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setNoTaskWarning(false)
              useStore.setState({ sessionInProgress: true })
              setIsRunning(true)
            }}
          >
            Start anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
