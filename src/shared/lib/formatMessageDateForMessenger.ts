export const formatMessageDateForMessenger = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const startOfWeek = new Date(now)

  startOfWeek.setDate(now.getDate() - now.getDay() + 1)
  startOfWeek.setHours(0, 0, 0, 0)

  if (date >= startOfWeek) {
    return date.toLocaleDateString([], { weekday: 'short' })
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
  }

  return date.getFullYear().toString()
}
