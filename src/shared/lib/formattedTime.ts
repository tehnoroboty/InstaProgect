export const formattedTime = (time: string) => {
  const messageDate = new Date(time)
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)

  yesterday.setDate(today.getDate() - 1)

  const messageDay = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  )

  const timePart = messageDate.toLocaleTimeString([], {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })

  if (messageDay.getTime() === today.getTime()) {
    return timePart
  }

  if (messageDay.getTime() === yesterday.getTime()) {
    return `Yesterday ${timePart}`
  }

  const datePart = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(messageDate)

  return `${datePart}, ${timePart}`
}
