import { useState, useEffect, useRef, memo, useCallback, useMemo, type FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useShallow } from 'zustand/react/shallow'
import {
  Plus, Trash2, Edit3, Check, Circle, Timer, ChevronUp, ChevronDown,
  Flag, GripVertical, CheckCircle2, Archive, MoreHorizontal, RotateCcw,
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { useStore, type Task, type TaskPriority } from '../stores/useStore'
import { ScrollArea } from './ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tip } from './ui/tip'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Separator } from './ui/separator'
import { motion, AnimatePresence } from 'motion/react'
import { playUiSound } from '../lib/sounds'

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  estimatedPomodoros: z.number().int().min(1).max(20),
  status: z.enum(['pending', 'active', 'completed', 'archived']),
})
type TaskFormValues = z.infer<typeof taskSchema>

type FilterType = 'all' | 'active' | 'done' | 'archived'

const PRIORITY_STYLES: Record<TaskPriority, { badge: string; dot: string }> = {
  high:   { badge: 'bg-red-500/10 text-red-400 border-red-500/20',       dot: 'bg-red-400' },
  urgent: { badge: 'bg-rose-600/10 text-rose-300 border-rose-600/20',    dot: 'bg-rose-300' },
  medium: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-400' },
  low:    { badge: 'bg-green-500/10 text-green-400 border-green-500/20', dot: 'bg-green-400' },
}

const DND_TYPE = 'TASK'

// ─── Add Task Form ────────────────────────────────────────────────────────────
interface AddTaskFormProps {
  onAdd: (title: string, priority: TaskPriority, estimated: number, description?: string) => void
  onCancel: () => void
  pomodoroDuration: number
}

function AddTaskForm({ onAdd, onCancel, pomodoroDuration }: AddTaskFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<TaskFormValues>({
    defaultValues: { title: '', description: '', priority: 'medium', estimatedPomodoros: 2, status: 'pending' },
  })
  const estimated = watch('estimatedPomodoros')
  const priority = watch('priority')
  const calculatedMins = estimated * pomodoroDuration

  const onSubmit = (data: TaskFormValues) => {
    const result = taskSchema.safeParse(data)
    if (!result.success) return
    onAdd(result.data.title, result.data.priority, result.data.estimatedPomodoros, result.data.description)
    reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-primary/25 bg-card p-4 space-y-3 shadow-sm"
      >
        <div>
          <Input
            autoFocus
            placeholder="What are you working on?"
            className={`border-0 bg-secondary px-3 py-2 ${errors.title ? 'ring-1 ring-destructive' : ''}`}
            {...register('title')}
          />
          {errors.title && <p className="mt-1 text-destructive" style={{ fontSize: '0.7rem' }}>{errors.title.message}</p>}
        </div>
        <Input
          placeholder="Description (optional)"
          className="border-0 bg-secondary px-3 py-2"
          {...register('description')}
        />
        <div className="flex items-center gap-2.5 flex-wrap">
          <Select value={priority} onValueChange={v => setValue('priority', v as TaskPriority)}>
            <SelectTrigger className="h-8 w-32 border-0 bg-secondary" style={{ fontSize: '0.8rem' }}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" />Urgent</span></SelectItem>
              <SelectItem value="high"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" />High</span></SelectItem>
              <SelectItem value="medium"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Medium</span></SelectItem>
              <SelectItem value="low"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" />Low</span></SelectItem>
            </SelectContent>
          </Select>

          {/* Pomodoro picker with calculated time */}
          <div className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1.5">
            <button type="button" aria-label="Decrease pomodoros" onClick={() => setValue('estimatedPomodoros', Math.max(1, estimated - 1))} className="text-muted-foreground hover:text-foreground">
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <span className="w-5 text-center tabular-nums text-foreground" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{estimated}</span>
            <button type="button" aria-label="Increase pomodoros" onClick={() => setValue('estimatedPomodoros', Math.min(20, estimated + 1))} className="text-muted-foreground hover:text-foreground">
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <span className="ml-1 text-muted-foreground" style={{ fontSize: '0.75rem' }}>= {calculatedMins}min</span>
          </div>

          <div className="ml-auto flex gap-1.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => { playUiSound('reset'); onCancel() }} className="h-8 px-3">Cancel</Button>
            <Button type="submit" size="sm" className="h-8 px-4">Add</Button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

// ─── Edit Task Sheet ──────────────────────────────────────────────────────────
function EditTaskSheet({ task, onClose }: { task: Task; onClose: () => void }) {
  const updateTask = useStore(s => s.updateTask)
  const settings = useStore(s => s.settings)
  const { register, handleSubmit, watch, setValue, formState: { isDirty } } = useForm<TaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description ?? '',
      notes: task.notes ?? '',
      priority: task.priority,
      estimatedPomodoros: task.estimatedPomodoros,
      status: task.status,
    },
  })
  const estimated = watch('estimatedPomodoros')
  const calculatedMins = estimated * settings.pomodoroDuration

  const onSubmit = (data: TaskFormValues) => {
    updateTask(task.id, {
      title: data.title,
      description: data.description,
      notes: data.notes,
      priority: data.priority,
      estimatedPomodoros: data.estimatedPomodoros,
      status: data.status,
    })
    onClose()
  }

  return (
    <Sheet open onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="flex flex-col gap-0 p-0 w-full sm:max-w-md" side="right" style={{ height: '100dvh' }}>
        <SheetHeader className="shrink-0 border-b border-border px-5 pt-5 pb-4">
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription className="sr-only">Update the task's details, estimate, category, and tags.</SheetDescription>
          {isDirty && (
            <p className="text-muted-foreground flex items-center gap-1.5 mt-1" style={{ fontSize: '0.75rem' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
              Unsaved changes
            </p>
          )}
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
          <ScrollArea className="flex-1">
            <div className="px-5 py-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Title</label>
                <Input {...register('title')} className="bg-secondary border-0" />
              </div>
              <div className="space-y-1.5">
                <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Description</label>
                <Textarea {...register('description')} placeholder="Add details about this task…" className="bg-secondary border-0 min-h-[80px]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Notes</label>
                <Textarea {...register('notes')} placeholder="Notes, links, or reminders…" className="bg-secondary border-0 min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Priority</label>
                  <Select value={watch('priority')} onValueChange={v => setValue('priority', v as TaskPriority, { shouldDirty: true })}>
                    <SelectTrigger className="border-0 bg-secondary"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" />Urgent</span></SelectItem>
                      <SelectItem value="high"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500" />High</span></SelectItem>
                      <SelectItem value="medium"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Medium</span></SelectItem>
                      <SelectItem value="low"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500" />Low</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Status</label>
                  <Select value={watch('status')} onValueChange={v => setValue('status', v as Task['status'], { shouldDirty: true })}>
                    <SelectTrigger className="border-0 bg-secondary"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                  Estimated Pomodoros
                  <span className="ml-2 text-muted-foreground" style={{ fontWeight: 400, fontSize: '0.75rem' }}>
                    = {calculatedMins} min
                  </span>
                </label>
                <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-2 w-fit">
                  <button type="button" aria-label="Decrease pomodoros" onClick={() => setValue('estimatedPomodoros', Math.max(1, estimated - 1), { shouldDirty: true })} className="text-muted-foreground hover:text-foreground px-1">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center tabular-nums text-foreground" style={{ fontWeight: 600 }}>{estimated}</span>
                  <button type="button" aria-label="Increase pomodoros" onClick={() => setValue('estimatedPomodoros', Math.min(20, estimated + 1), { shouldDirty: true })} className="text-muted-foreground hover:text-foreground px-1">
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <span className="ml-1 text-muted-foreground" style={{ fontSize: '0.75rem' }}>pomos</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Sticky footer */}
          <div className="shrink-0 border-t border-border px-5 py-4 flex gap-2.5">
            <Button type="submit" className="flex-1" disabled={!isDirty}>
              {isDirty ? 'Save Changes' : 'No changes'}
            </Button>
            <Button type="button" variant="outline" className="w-24" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

// ─── Draggable Task Item ───────────────────────────────────────────────────────
interface TaskItemProps {
  task: Task
  index: number
  isActive: boolean
  isDraggable: boolean
  onSetActive: (id: string) => void
  onToggleComplete: (task: Task) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  onArchive: (id: string) => void
  onRestore: (id: string) => void
  onMove: (fromId: string, overId: string) => void
}

interface DragItem { id: string; index: number }

function TaskItemImpl({
  task, index, isActive, isDraggable,
  onSetActive, onToggleComplete, onDelete, onEdit, onArchive, onRestore, onMove,
}: TaskItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isCompleted = task.status === 'completed'
  const isArchived = task.status === 'archived'
  const styles = PRIORITY_STYLES[task.priority]

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DND_TYPE,
    item: () => ({ id: task.id, index } as DragItem),
    canDrag: () => isDraggable,
    end: () => {
      // Persist final ordering to the server on drop. The drag guard on the
      // row prevents click-through completion during the drag itself.
      useStore.getState().commitReorder()
    },
    collect: m => ({ isDragging: m.isDragging() }),
  }), [task.id, index, isDraggable])

  // Hide the default HTML5 drag ghost — the source stays visible (faded),
  // preventing the "disappear/reappear" flash while dragging.
  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [dragPreview])

  const [, drop] = useDrop<DragItem>(() => ({
    accept: DND_TYPE,
    hover: (item, monitor) => {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const rect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (rect.bottom - rect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
      const hoverClientY = clientOffset.y - rect.top
      // Classic react-dnd sortable gate: only commit a reorder once the
      // pointer clearly crosses the midpoint of the hovered row in the
      // direction of travel. Without this, the hover callback fires reorders
      // on every pixel of motion — the source of the flicker/jitter.
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      onMove(item.id, task.id)
      // Persist the new index on the drag item so subsequent hover events
      // compute direction against the up-to-date position (not the origin).
      item.index = hoverIndex
    },
  }), [task.id, index, onMove])

  drop(ref)

  const handleClick = useCallback(() => {
    if (isDragging) return
    if (!isCompleted && !isArchived) onSetActive(task.id)
  }, [isDragging, isCompleted, isArchived, onSetActive, task.id])

  return (
    <motion.div
      ref={ref}
      layout={!isDragging}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: isDragging ? 0.35 : 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      whileHover={!isCompleted && !isArchived && !isDragging ? { y: -2 } : undefined}
      whileTap={!isCompleted && !isArchived ? { scale: 0.99 } : undefined}
      className={`group relative rounded-xl border transition-colors ${
        isCompleted || isArchived ? 'border-border bg-card opacity-55' :
        isActive ? 'border-primary/30 bg-primary/5 shadow-[0_0_0_1px_rgba(249,115,22,0.12)]' :
        'border-border bg-card hover:border-primary/30 hover:bg-secondary/40 hover:shadow-md cursor-pointer'
      }`}
      onClick={handleClick}
    >
      {isActive && !isCompleted && (
        <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-primary" />
      )}

      <div className="flex items-start gap-2.5 p-3 pl-3.5">
        {/* Drag handle */}
        {!isCompleted && !isArchived && (
          <div
            ref={node => { if (node) drag(node) }}
            className="mt-0.5 shrink-0 cursor-grab active:cursor-grabbing text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity touch-none"
            onClick={e => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4" />
          </div>
        )}

        {/* Checkbox */}
        <button
          aria-label={isCompleted || isArchived ? 'Task completed' : 'Mark task as complete'}
          className="mt-0.5 shrink-0 transition-colors"
          onClick={e => {
            e.stopPropagation()
            if (isDragging) return
            onToggleComplete(task)
          }}
        >
          {isCompleted || isArchived
            ? <CheckCircle2 className="h-4 w-4 text-primary" />
            : <Circle className={`h-4 w-4 ${isActive ? 'text-primary/60' : 'text-muted-foreground'} hover:text-primary transition-colors`} />
          }
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`leading-snug ${isCompleted || isArchived ? 'line-through text-muted-foreground' : 'text-foreground'}`} style={{ fontSize: '0.875rem' }}>
            {task.title}
          </p>
          {task.description && !isCompleted && !isArchived && (
            <p className="mt-0.5 text-muted-foreground line-clamp-1" style={{ fontSize: '0.75rem' }}>
              {task.description}
            </p>
          )}
          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={`px-1.5 py-0 text-xs border ${styles.badge}`}>
              <Flag className="mr-1 h-2.5 w-2.5" />{task.priority}
            </Badge>
            <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: '0.7rem' }}>
              <Timer className="h-3 w-3" /> {task.completedPomodoros}/{task.estimatedPomodoros}
            </span>
            {isActive && !isCompleted && (
              <Badge className="bg-primary/15 text-primary border-primary/20 px-1.5 py-0 text-xs border">Active</Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Task actions"
              className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded"
              onClick={e => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {isArchived ? (
              <>
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onRestore(task.id) }}>
                  <RotateCcw className="mr-2 h-3.5 w-3.5" />Restore task
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete(task.id) }} className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />Delete permanently
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onEdit(task) }}>
                  <Edit3 className="mr-2 h-3.5 w-3.5" />Edit task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onToggleComplete(task) }}>
                  <Check className="mr-2 h-3.5 w-3.5" />
                  {isCompleted ? 'Mark pending' : 'Mark complete'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onArchive(task.id) }}>
                  <Archive className="mr-2 h-3.5 w-3.5" />Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={e => { e.stopPropagation(); onDelete(task.id) }} className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-3.5 w-3.5" />Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

const TaskItem = memo(TaskItemImpl)


export function TaskManager() {
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState<FilterType>('active')
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Narrow selectors — TaskManager must NOT re-render on timer ticks or
  // notification changes. Only subscribes to data it actually renders.
  const tasks = useStore((s) => s.tasks)
  const activeTaskId = useStore((s) => s.activeTaskId)
  const pomodoroDuration = useStore((s) => s.settings.pomodoroDuration)
  const { addTask, updateTask, deleteTask, requestSetActiveTask, moveTask, archiveTask } = useStore(
    useShallow((s) => ({
      addTask: s.addTask,
      updateTask: s.updateTask,
      deleteTask: s.deleteTask,
      requestSetActiveTask: s.requestSetActiveTask,
      moveTask: s.moveTask,
      archiveTask: s.archiveTask,
    })),
  )

  useEffect(() => {
    const handler = () => setShowAdd(true)
    document.addEventListener('open-add-task', handler)
    return () => document.removeEventListener('open-add-task', handler)
  }, [])

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(t => t.status !== 'completed' && t.status !== 'archived').length,
    done: tasks.filter(t => t.status === 'completed').length,
    archived: tasks.filter(t => t.status === 'archived').length,
  }), [tasks])

  const filteredTasks = useMemo(() => {
    const t0 = typeof performance !== 'undefined' ? performance.now() : 0
    let result: Task[]
    if (filter === 'active') {
      const list = tasks.filter(t => t.status !== 'completed' && t.status !== 'archived')
      // Active task floats to top; inner order preserved.
      result = [
        ...list.filter(t => t.id === activeTaskId),
        ...list.filter(t => t.id !== activeTaskId),
      ]
    } else if (filter === 'done') {
      result = tasks.filter(t => t.status === 'completed')
    } else if (filter === 'archived') {
      result = tasks.filter(t => t.status === 'archived')
    } else {
      // All: Focus task → Active (pending/active) → Done → Archived.
      // Inner order within each group preserved from `tasks` (user order).
      const focus: Task[] = []
      const active: Task[] = []
      const done: Task[] = []
      const archived: Task[] = []
      for (const t of tasks) {
        if (t.id === activeTaskId && t.status !== 'completed' && t.status !== 'archived') {
          focus.push(t)
        } else if (t.status === 'completed') {
          done.push(t)
        } else if (t.status === 'archived') {
          archived.push(t)
        } else {
          active.push(t)
        }
      }
      result = [...focus, ...active, ...done, ...archived]
    }
    if (typeof performance !== 'undefined' && process.env.NODE_ENV === 'development') {
      const dt = performance.now() - t0
      if (dt > 4) console.debug(`[perf] TaskManager sort (${filter}) ${dt.toFixed(2)}ms, n=${tasks.length}`)
    }
    return result
  }, [tasks, filter, activeTaskId])

  // Stable callbacks so memoized TaskItem doesn't re-render when unrelated
  // tasks change.
  const handleToggleComplete = useCallback((task: Task) => {
    updateTask(task.id, {
      status: task.status === 'completed' ? 'pending' : 'completed',
      completedAt: task.status !== 'completed' ? new Date().toISOString() : undefined,
    })
  }, [updateTask])

  const handleRestore = useCallback((id: string) => {
    updateTask(id, { status: 'pending', archivedAt: undefined })
  }, [updateTask])

  const handleEdit = useCallback((task: Task) => setEditingTask(task), [])

  // Reordering is only allowed inside the pure "Active" filter, where every
  // row shares a single group. In "All" the list is grouped (Focus / Active /
  // Done / Archived), so dragging across groups would silently break the
  // grouping — disable drag there to keep the sort deterministic.
  const canReorder = filter === 'active'

  // Perf monitor: count renders in dev to surface accidental re-renders when
  // unrelated state changes (timer ticks, notifications).
  const renderCountRef = useRef(0)
  renderCountRef.current += 1
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[perf] TaskManager render #${renderCountRef.current} (filter=${filter}, n=${filteredTasks.length})`)
    }
  })


  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Tasks</h3>
        <div className="flex gap-1">
          {(['all', 'active', 'done', 'archived'] as FilterType[]).map(f => (
            <motion.button
              key={f}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.94 }}
              onHoverStart={() => playUiSound('hover')}
              onClick={() => { setFilter(f); playUiSound('tabSwitch') }}
              className={`flex items-center gap-1 rounded px-2 py-1 capitalize transition-colors ${filter === f ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              style={{ fontSize: '0.7rem' }}
            >
              {f}
              <span className={`rounded-full px-1 ${filter === f ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}
                style={{ fontSize: '0.6rem' }}>
                {counts[f]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add task */}
      <AnimatePresence>
        {showAdd ? (
          <AddTaskForm
            pomodoroDuration={pomodoroDuration}
            onAdd={(title, priority, estimated, description) => {
              addTask({ title, priority, estimatedPomodoros: estimated, description })
              setShowAdd(false)
            }}
            onCancel={() => setShowAdd(false)}
          />
        ) : (
          <Tip label="New task" hotkey="N">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.985 }}
              onHoverStart={() => playUiSound('hover')}
              onClick={() => setShowAdd(true)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2.5 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors text-left"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span style={{ fontSize: '0.875rem' }}>Add task</span>
              <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>N</kbd>
            </motion.button>
          </Tip>
        )}
      </AnimatePresence>

      {/* Task list */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-1.5 pr-2" style={{ padding: '0.25rem 0' }}>
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 py-8 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  {filter === 'archived' ? <Archive className="h-5 w-5 text-muted-foreground" /> : <CheckCircle2 className="h-5 w-5 text-muted-foreground" />}
                </div>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
                  {filter === 'archived' ? 'No archived tasks' : filter === 'done' ? 'No completed tasks yet' : 'No tasks — add one above'}
                </p>
                {(filter === 'active' || filter === 'all') && (
                  <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Create your first task to start focusing</p>
                )}
              </motion.div>
            ) : (
              filteredTasks.map((task, idx) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={idx}
                  isActive={task.id === activeTaskId}
                  isDraggable={canReorder}
                  onSetActive={requestSetActiveTask}
                  onToggleComplete={handleToggleComplete}
                  onDelete={deleteTask}
                  onEdit={handleEdit}
                  onArchive={archiveTask}
                  onRestore={handleRestore}
                  onMove={moveTask}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-border/60 pt-2.5">
        <p className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>
          <span className="text-foreground" style={{ fontWeight: 600 }}>{counts.active}</span> active
          <span className="mx-1.5 opacity-50">·</span>
          <span className="text-foreground" style={{ fontWeight: 600 }}>{counts.done}</span> done
          <span className="mx-1.5 opacity-50">·</span>
          <span className="text-foreground" style={{ fontWeight: 600 }}>{counts.archived}</span> archived
        </p>
      </div>

      {/* Edit sheet */}
      {editingTask && (
        <EditTaskSheet task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  )
}
