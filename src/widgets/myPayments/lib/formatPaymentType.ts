import { SystemPaymentType } from '@/src/entities/subscription/types'

export const formatPaymentType = (type: SystemPaymentType): string => {
  switch (type) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
    default:
      return type
  }
}
