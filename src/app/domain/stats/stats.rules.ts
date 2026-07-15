import type { DailyStats, SessionHistoryItem } from './stats.types'

export function todayIso(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}

/** Consecutive days ending today/yesterday with ≥1 session. */
export function computeStreak(history: DailyStats[], todaySessionsDelta: number): number {
  const map = new Map(history.map((d) => [d.date, d.sessions]))
  const today = new Date()
  const todayStr = todayIso(today)
  const effectiveToday = (map.get(todayStr) ?? 0) + todaySessionsDelta
  let streak = 0
  const cursor = new Date(today)
  if (effectiveToday > 0) {
    streak = 1
    cursor.setDate(cursor.getDate() - 1)
  } else {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (true) {
    const key = todayIso(cursor)
    if ((map.get(key) ?? 0) > 0) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else break
  }
  return streak
}

export function appendDailyPomodoro(history: DailyStats[], minutes: number): DailyStats[] {
  const day = todayIso()
  const idx = history.findIndex((d) => d.date === day)
  if (idx >= 0) {
    const next = [...history]
    next[idx] = {
      ...next[idx],
      sessions: next[idx].sessions + 1,
      focusMinutes: next[idx].focusMinutes + minutes,
    }
    return next
  }
  return [...history, { date: day, sessions: 1, focusMinutes: minutes }]
}

export function pushHistory(
  history: SessionHistoryItem[],
  item: SessionHistoryItem,
  max = 200,
): SessionHistoryItem[] {
  return [item, ...history].slice(0, max)
}

/** Sum all sessions across daily history entries. */
export function computeTotalSessions(history: DailyStats[]): number {
  return history.reduce((sum, d) => sum + d.sessions, 0)
}
