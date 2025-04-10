import {
  SelectedSubscriptionType,
  SistemPaymentType,
} from '@/src/shared/lib/constants/subscriptions'

export type RequestSubscriptionType = {
  amount: number
  baseUrl: string
  paymentType: SistemPaymentType
  typeSubscription: SelectedSubscriptionType
}
