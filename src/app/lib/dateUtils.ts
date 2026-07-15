export function isToday(iso: string) {
  return new Date(iso).toDateString() === new Date().toDateString()
}

export function isYesterday(iso: string) {
  const d = new Date(iso)
  const y = new Date()
  y.setDate(y.getDate() - 1)
  return d.toDateString() === y.toDateString()
}
