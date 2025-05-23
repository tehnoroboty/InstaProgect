import { plural } from '@/src/shared/lib/plural'

export const timeElapsedSince = (date: string) => {
  const now: Date = new Date()
  const pastDate: Date = new Date(date)
  const diffMs = +now - +pastDate // разница в миллисекундах

  const seconds = Math.floor(diffMs / 1000)

  if (seconds < 60) {
    return `${seconds} ${plural(seconds, {
      one: 'second',
      other: 'seconds',
    })} ago`
  }
  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes} ${plural(minutes, {
      one: 'minute',
      other: 'minutes',
    })} ago`
  }
  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} ${plural(hours, {
      one: 'hour',
      other: 'hours',
    })} ago`
  }
  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} ${plural(days, {
      one: 'day',
      other: 'days',
    })} ago`
  }
  const weeks = Math.floor(days / 7)

  return `${weeks} ${plural(weeks, {
    one: 'week',
    other: 'weeks',
  })} ago`
}
