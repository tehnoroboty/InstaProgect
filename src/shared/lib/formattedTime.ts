export const formattedTime = (time: string) =>
  new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })
