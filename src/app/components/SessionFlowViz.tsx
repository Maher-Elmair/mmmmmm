import { useStore } from '../stores/useStore'
import { Coffee, Activity } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function SessionFlowViz() {
  const { sessionCount, mode, isRunning } = useStore()

  const cyclePosition = sessionCount % 4
  const currentPomodoro = cyclePosition + (mode === 'pomodoro' ? 1 : 0)

  const steps = [
    { id: 1, label: '1', type: 'pomodoro' as const },
    { id: 2, label: '2', type: 'pomodoro' as const },
    { id: 3, label: '3', type: 'pomodoro' as const },
    { id: 4, label: '4', type: 'pomodoro' as const },
    { id: 5, label: 'Break', type: 'break' as const },
  ]

  const completedRatio = cyclePosition / 4

  return (
    <TooltipProvider>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <p className="text-foreground" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
              Session Flow
            </p>
          </div>
          <span className="text-muted-foreground tabular-nums" style={{ fontSize: '0.7rem', fontWeight: 500 }}>
            {cyclePosition}/4 cycle
          </span>
        </div>

        <div className="relative">
          {/* Background track */}
          <div className="absolute left-3.5 right-3.5 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-secondary" />
          {/* Progress fill */}
          <div
            className="absolute left-3.5 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-500"
            style={{ width: `calc((100% - 1.75rem) * ${completedRatio})` }}
          />

          <div className="relative flex items-center justify-between">
            {steps.map((step) => {
              const isBreak = step.type === 'break'
              const isCompleted = !isBreak && step.id <= cyclePosition
              const isActive = !isBreak
                ? mode === 'pomodoro' && step.id === currentPomodoro
                : mode !== 'pomodoro'

              return (
                <Tooltip key={step.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'border-primary bg-primary text-white shadow-[0_0_0_3px_rgba(249,115,22,0.12)]'
                          : isActive
                            ? `border-primary bg-background text-primary ${isRunning ? 'shadow-[0_0_14px_rgba(249,115,22,0.45)]' : ''}`
                            : 'border-border bg-card text-muted-foreground/60'
                      }`}
                      style={{ fontSize: '0.7rem', fontWeight: 700 }}
                    >
                      {isBreak ? <Coffee className="h-3 w-3" /> : step.label}
                      {isActive && isRunning && (
                        <span className="absolute -inset-1 rounded-full border border-primary/40 animate-ping" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span style={{ fontSize: '0.75rem' }}>
                      {isBreak ? 'Long Break' : `Pomodoro ${step.id}`}
                      {isCompleted && ' · Done'}
                      {isActive && ' · Active'}
                    </span>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
