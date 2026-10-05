import { SelectedSubscriptionType } from '@/src/entities/subscription/types'

export const formatSubscriptionType = (type: SelectedSubscriptionType): string => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
    default:
      return type
  }
}
