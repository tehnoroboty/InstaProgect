export type RequestSubscriptionType = {
  amount: number
  baseUrl: string
  paymentType: SystemPaymentType
  typeSubscription: SelectedSubscriptionType
}

export type SystemPaymentType = 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE'
export type SelectedSubscriptionType = 'DAY' | 'MONTHLY' | 'WEEKLY'

export type MyPaymentType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: SystemPaymentType
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
