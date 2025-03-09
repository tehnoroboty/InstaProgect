/**
 * Counts the time since post/comment was created
 * @param {string} isoDate - Creation time in ISO date format
 * @returns {string} - Time since creation in minutes, hours, days, months, years
 */

export function timeSince(isoDate: string): string {
  const creationDate = new Date(isoDate)
  const now = new Date()

  if (isNaN(creationDate.getTime())) {
    return 'Invalid date'
  }

  const diffMs = now.getTime() - creationDate.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHours = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)

  if (diffYears >= 1) {
    return creationDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  if (diffMonths > 0) {
    return `${diffMonths} mo ago`
  }
  if (diffDays > 0) {
    return `${diffDays} d ago`
  }
  if (diffHours > 0) {
    return `${diffHours} h ago`
  }
  if (diffMin > 0) {
    return `${diffMin} min ago`
  }

  return 'just now'
}
