import { RequestSubscriptionType } from '@/src/entities/subscription/types'
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
  }),
})

export const { useCreateSubscriptionMutation } = subscriptionsApi
