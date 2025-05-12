import { plural } from '@/src/shared/lib/plural'

export const timeElapsedSince = (date: string) => {
  const now: Date = new Date()
  const pastDate: Date = new Date(date)
  const diffMs = +now - +pastDate // разница в миллисекундах

  const seconds = Math.floor(diffMs / 1000)

  if (seconds < 60) {
    return `${seconds} ${plural(seconds, {
      few: 'секунд',
      many: 'секунд',
      one: 'секунда',
    })} назад`
  }
  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes} ${plural(minutes, {
      few: 'минуты',
      many: 'минут',
      one: 'минута',
    })} назад`
  }
  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} ${plural(hours, {
      few: 'час',
      many: 'часов',
      one: 'час',
    })} назад`
  }
  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} ${plural(days, {
      few: 'дня',
      many: 'дней',
      one: 'день',
    })} назад`
  }
  const weeks = Math.floor(days / 7)

  return `${weeks} ${plural(weeks, {
    few: 'недели',
    many: 'недель',
    one: 'неделя',
  })} назад`
}
