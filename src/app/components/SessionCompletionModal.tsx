import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'
import { useStore } from '../stores/useStore'
import { motion } from 'motion/react'
import { CheckCircle2, Coffee, Play, Trophy } from 'lucide-react'

export function SessionCompletionModal() {
  const { completionModal, setCompletionModal, setMode, setIsRunning, settings, updateTask } = useStore()

  const isOpen = completionModal?.show ?? false
  const taskCompleted = completionModal?.taskCompleted ?? false

  const handleStartBreak = () => {
    setMode(completionModal!.nextMode)
    setIsRunning(true)
    setCompletionModal(null)
  }

  const handleContinue = () => {
    setMode('pomodoro')
    setIsRunning(true)
    setCompletionModal(null)
  }

  const handleClose = () => setCompletionModal(null)

  const handleMarkDone = () => {
    if (completionModal?.taskId) {
      updateTask(completionModal.taskId, { status: 'completed', completedAt: new Date().toISOString() })
    }
    setCompletionModal(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-sm border-border bg-card p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          {taskCompleted ? 'Task complete!' : 'Great work!'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {taskCompleted ? 'You hit your estimated sessions' : 'Focus session complete'}
        </DialogDescription>
        <div className="relative">
          {/* Header */}
          <div className={`${taskCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-primary/8 border-primary/15'} border-b px-6 py-5 text-center`}>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`inline-flex h-14 w-14 items-center justify-center rounded-full mb-3 ${taskCompleted ? 'bg-emerald-500/20' : 'bg-primary/15'}`}
            >
              {taskCompleted
                ? <Trophy className="h-7 w-7 text-emerald-500" />
                : <CheckCircle2 className="h-7 w-7 text-primary" />}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-foreground" style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                {taskCompleted ? 'Task complete!' : 'Great work!'}
              </h2>
              <p className="mt-0.5 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                {taskCompleted ? 'You hit your estimated sessions' : 'Focus session complete'}
              </p>
            </motion.div>
          </div>

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-6 py-5 space-y-4"
          >
            {completionModal?.taskTitle && (
              <div className="rounded-lg border border-border bg-secondary/50 px-4 py-3">
                <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Task</p>
                <p className="mt-0.5 text-foreground truncate" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  {completionModal.taskTitle}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-center">
                <p className="text-foreground tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 600, fontSize: '1.25rem' }}>
                  {completionModal?.duration ?? 25}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>minutes</p>
              </div>
              <div className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-center">
                <p className="text-foreground tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 600, fontSize: '1.25rem' }}>
                  {completionModal?.nextMode === 'longBreak' ? settings.longBreakDuration : settings.shortBreakDuration}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>min break</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {taskCompleted && (
                <Button onClick={handleMarkDone} className="w-full gap-2 bg-emerald-500 text-white hover:bg-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark task as done
                </Button>
              )}
              <Button
                onClick={handleStartBreak}
                variant={taskCompleted ? 'outline' : 'default'}
                className="w-full gap-2"
              >
                <Coffee className="h-4 w-4" />
                Start {completionModal?.nextMode === 'longBreak' ? 'Long' : 'Short'} Break
              </Button>
              <Button variant="outline" onClick={handleContinue} className="w-full gap-2">
                <Play className="h-4 w-4" />
                Keep Focusing
              </Button>
              <Button variant="ghost" onClick={handleClose} className="w-full text-muted-foreground">
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
