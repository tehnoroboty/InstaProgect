import { MyPaymentType, TableData } from '@/src/entities/subscription/types'
import { parseISOAndFormat } from '@/src/shared/hooks/parseIsoAndFormat'
import { formatPaymentType } from '@/src/widgets/myPayments/lib/formatPaymentType'
import { formatSubscriptionType } from '@/src/widgets/myPayments/lib/formatSubscriptionType'

export const transformData = (serverData: MyPaymentType[]): TableData[] => {
  const sorted = [...serverData].sort(
    (a, b) => new Date(a.dateOfPayment).getTime() - new Date(b.dateOfPayment).getTime()
  )

  let lastEndDate: Date | null = null

  return sorted.map(item => {
    const paymentDate = new Date(item.dateOfPayment)

    const startDate = lastEndDate && paymentDate < lastEndDate ? new Date(lastEndDate) : paymentDate

    const endDate = new Date(startDate)

    switch (item.subscriptionType) {
      case 'DAY':
        endDate.setDate(endDate.getDate() + 1)
        break
      case 'WEEKLY':
        endDate.setDate(endDate.getDate() + 7)
        break
      case 'MONTHLY':
        endDate.setMonth(endDate.getMonth() + 1)
        break
      default:
        break
    }

    lastEndDate = new Date(endDate)

    return {
      dateOfPayment: parseISOAndFormat(startDate.toISOString()),
      endDate: parseISOAndFormat(endDate.toISOString()),
      paymentType: formatPaymentType(item.paymentType),
      price: item.price.toString(),
      subscription: formatSubscriptionType(item.subscriptionType),
    }
  })
}
