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

export type MyPaymentType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: SistemPaymentType
  price: number
  subscriptionId: string
  subscriptionType: SelectedSubscriptionType
  userId: number
}
export type ResponseMyPaymentsType = MyPaymentType[]
export type CurrentPaymentType = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}
export type ResponseCurrentPaymentsType = { data: CurrentPaymentType[]; hasAutoRenewal: boolean }
