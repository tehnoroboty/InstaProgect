import {
  RequestSubscriptionType,
  ResponseCurrentPaymentsType,
  ResponseMyPaymentsType,
} from '@/src/entities/subscription/types'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createSubscription: builder.mutation<{ url: string }, RequestSubscriptionType>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: 'subscriptions',
        }
      },
    }),
    currentPayments: builder.query<ResponseCurrentPaymentsType, void>({
      providesTags: ['PAYMENTS'],
      query: () => 'subscriptions/current-payment-subscriptions',
    }),
    myPayments: builder.query<ResponseMyPaymentsType, void>({
      query: () => 'subscriptions/my-payments',
    }),
    canceledAutoRenewal: builder.mutation<void, void>({
      invalidatesTags: ['PAYMENTS'],
      query: () => {
        return {
          method: 'POST',
          url: '/subscriptions/canceled-auto-renewal',
        }
      },
    }),
  }),
})

export const { useCreateSubscriptionMutation, useCurrentPaymentsQuery, useMyPaymentsQuery ,useCanceledAutoRenewalMutation} =
  subscriptionsApi
