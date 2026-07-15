import { useRef, useEffect, useState, useMemo, memo } from 'react'
import { useStore } from '../stores/useStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, ReferenceLine,
} from 'recharts'
import { playUiSound } from '../lib/sounds'
import { Tip } from './ui/tip'

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const tooltipStyle = {
  backgroundColor: 'var(--color-card)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.5rem',
  padding: '8px 12px',
  fontSize: '0.8rem',
  color: 'var(--color-foreground)',
}

// ─── Responsive Heatmap ───────────────────────────────────────────────────────
const HeatmapCell = memo(function HeatmapCell({ day, cellSize }: { day: { date: string; sessions: number }; cellSize: number }) {
  const s = day.sessions
  const opacity = s === 0 ? 0 : s <= 2 ? 0.2 : s <= 5 ? 0.45 : s <= 7 ? 0.7 : 1
  return (
    <Tip label={`${day.date}: ${s} session${s !== 1 ? 's' : ''}`}>
      <div
        className="cursor-default rounded-sm transition-all hover:ring-1 hover:ring-primary/60"
        style={{
          width: cellSize,
          height: cellSize,
          backgroundColor: s === 0 ? 'var(--color-secondary)' : `rgba(249,115,22,${opacity})`,
        }}
      />
    </Tip>
  )
})

const ActivityHeatmap = memo(function ActivityHeatmap() {
  const dailyHistory = useStore(s => s.dailyHistory)
  const todaySessions = useStore(s => s.todaySessions)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState(13)

  // Calculate cell size based on container width
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      // 53 weeks + ~28px for day labels
      const available = width - 28
      const size = Math.max(7, Math.min(15, Math.floor(available / 53) - 1))
      setCellSize(size)
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const { weeks, monthLabels, total } = useMemo(() => {
    const historyMap = new Map(dailyHistory.map(d => [d.date, d.sessions]))
    if (todaySessions > 0) historyMap.set(todayStr, (historyMap.get(todayStr) ?? 0) + todaySessions)

    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 364)
    const dow = startDate.getDay()
    startDate.setDate(startDate.getDate() - (dow === 0 ? 6 : dow - 1))

    const weeks: { date: string; sessions: number }[][] = []
    let week: { date: string; sessions: number }[] = []
    for (let i = 0; i < 371; i++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + i)
      const dateStr = d.toISOString().split('T')[0]
      week.push({ date: dateStr, sessions: historyMap.get(dateStr) ?? 0 })
      if (week.length === 7) { weeks.push(week); week = [] }
    }

    const monthLabels: { label: string; col: number }[] = []
    weeks.forEach((w, i) => {
      const d = new Date(w[0].date)
      if (d.getDate() <= 7) monthLabels.push({ label: MONTH_LABELS[d.getMonth()], col: i })
    })

    const total = Array.from(historyMap.values()).reduce((s, v) => s + v, 0)
    return { weeks, monthLabels, total }
  }, [dailyHistory, todaySessions, todayStr])
  const gap = Math.max(1, Math.floor(cellSize * 0.15))

  return (
    <div ref={containerRef} className="w-full max-w-full space-y-3 overflow-x-auto">

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>
          {total} sessions in the past year
        </span>
        <div className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: '0.7rem' }}>
          <span>Less</span>
          {[0, 2, 5, 7, 9].map(v => (
            <div
              key={v}
              style={{
                width: 10, height: 10,
                borderRadius: 2,
                backgroundColor: v === 0 ? 'var(--color-secondary)' : `rgba(249,115,22,${v === 2 ? 0.2 : v === 5 ? 0.45 : v === 7 ? 0.7 : 1})`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="w-full">
        {/* Month labels */}
        <div className="flex" style={{ paddingLeft: 24 }}>
          {weeks.map((_, i) => {
            const lbl = monthLabels.find(m => m.col === i)
            return (
              <div
                key={`ml-${i}`}
                style={{ width: cellSize + gap, flexShrink: 0, fontSize: '0.6rem', color: 'var(--color-muted-foreground)' }}
              >
                {lbl?.label ?? ''}
              </div>
            )
          })}
        </div>

        <div className="flex" style={{ gap }}>
          {/* Day labels */}
          <div className="flex flex-col" style={{ gap, width: 20 }}>
            {DAY_LABELS.map((d, i) => (
              <div
                key={`dl-${d}`}
                style={{ height: cellSize, fontSize: '0.6rem', color: 'var(--color-muted-foreground)', lineHeight: `${cellSize}px` }}
              >
                {i % 2 === 1 ? d[0] : ''}
              </div>
            ))}
          </div>

          {/* Cells */}
          {weeks.map((wk, wi) => (
            <div key={`wk-${wi}`} className="flex flex-col" style={{ gap }}>
              {wk.map((day, di) => (
                <HeatmapCell key={`${wi}-${di}`} day={day} cellSize={cellSize} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

// ─── Focus History ─────────────────────────────────────────────────────────────
function FocusHistory() {
  const dailyHistory = useStore(s => s.dailyHistory)
  const todaySessions = useStore(s => s.todaySessions)
  const settings = useStore(s => s.settings)
  const now = new Date()

  const { historyData, avg } = useMemo(() => {
    const historyData = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now)
      d.setDate(d.getDate() - (13 - i))
      const dateStr = d.toISOString().split('T')[0]
      const isToday = i === 13
      const entry = dailyHistory.find(h => h.date === dateStr)
      const sessions = (entry?.sessions ?? 0) + (isToday ? todaySessions : 0)
      return {
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        sessions,
        hours: parseFloat((sessions * settings.pomodoroDuration / 60).toFixed(1)),
      }
    })
    const avg = historyData.reduce((s, d) => s + d.sessions, 0) / historyData.length
    return { historyData, avg }
  }, [dailyHistory, todaySessions, settings.pomodoroDuration])

  return (
    <div>
      <p className="mb-3 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
        14-day focus history · avg {avg.toFixed(1)} sessions/day
      </p>
     <ResponsiveContainer width="100%" height={120}>
        <LineChart data={historyData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} interval={1} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} sessions`, 'Focus']} />
          <ReferenceLine y={avg} stroke="var(--color-muted-foreground)" strokeDasharray="3 3" />
          <Line
            type="monotone" dataKey="sessions"
            stroke="var(--color-primary)" strokeWidth={2}
            dot={{ fill: 'var(--color-primary)', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function AnalyticsPanel() {
  const dailyHistory = useStore(s => s.dailyHistory)
  const todaySessions = useStore(s => s.todaySessions)
  const settings = useStore(s => s.settings)
  const now = new Date()

  const weekData = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const isToday = i === 6
    const entry = dailyHistory.find(h => h.date === dateStr)
    const sessions = (entry?.sessions ?? 0) + (isToday ? todaySessions : 0)
    return { day: DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1], sessions, goal: settings.dailyGoal }
  }), [dailyHistory, todaySessions, settings.dailyGoal])

  const monthlyData = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const weekEnd = new Date(now)
    weekEnd.setDate(weekEnd.getDate() - (11 - i) * 7)
    const weekStart = new Date(weekEnd)
    weekStart.setDate(weekStart.getDate() - 6)
    const sessions = dailyHistory
      .filter(d => d.date >= weekStart.toISOString().split('T')[0] && d.date <= weekEnd.toISOString().split('T')[0])
      .reduce((s, d) => s + d.sessions, 0)
    return {
      week: `W${i + 1}`,
      sessions,
      hours: parseFloat((sessions * settings.pomodoroDuration / 60).toFixed(1)),
    }
  }), [dailyHistory, settings.pomodoroDuration])

  return (
    <div className="space-y-2">
      <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Analytics</h3>
      <Tabs defaultValue="weekly" onValueChange={() => playUiSound('tabSwitch')}>
        <TabsList className="bg-secondary h-8">
          {['weekly', 'monthly', 'heatmap', 'history'].map(v => (
            <TabsTrigger key={v} value={v} className="h-6 px-3 capitalize" style={{ fontSize: '0.75rem' }}>
              {v}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="weekly" className="pt-4">
         <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weekData} barSize={24} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                formatter={(v: number, name: string) => [v, name === 'goal' ? 'Daily goal' : 'Sessions']} />
              <Bar dataKey="goal" fill="var(--color-secondary)" radius={[3, 3, 0, 0]} name="goal" />
              <Bar dataKey="sessions" fill="var(--color-primary)" radius={[3, 3, 0, 0]} name="sessions" />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-1 text-muted-foreground" style={{ fontSize: '0.7rem' }}>Gray = daily goal · Orange = actual sessions</p>
        </TabsContent>

        <TabsContent value="monthly" className="pt-4">
         <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}h`, 'Focus hours']} />
              <Area type="monotone" dataKey="hours" stroke="var(--color-primary)" strokeWidth={2} fill="url(#ag)" />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="heatmap" className="pt-4">
          <ActivityHeatmap />
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <FocusHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
