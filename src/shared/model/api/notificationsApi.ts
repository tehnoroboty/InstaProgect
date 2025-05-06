import { baseApi } from '@/src/shared/model/api/baseApi'
import { SortDirection } from '@/src/shared/model/api/types'

export type Notifications = {
  createdAt: string
  id: number
  isRead: boolean
  message: string
}
type GetNotificationsResponse = {
  items: Notifications[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

type GetNotificationsArgs = {
  cursor?: number
  isRead?: boolean
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotification: builder.mutation<void, { id: number }>({
      invalidatesTags: ['NOTIFICATIONS'],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
            const index = draft.items.findIndex(item => item.id === id)

            if (index !== -1) {
              if (!draft.items[index].isRead) {
                draft.notReadCount = draft.notReadCount > 0 ? draft.notReadCount - 1 : 0
              }
              draft.items.splice(index, 1)
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: ({ id }) => ({
        method: 'DELETE',
        url: `notifications/${id}`,
      }),
    }),
    getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArgs>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor
      },
      merge: (currentCache, newItems) => {
        newItems.items.map(newItem => {
          const findIndex = currentCache.items.findIndex(
            currentItem => currentItem.id === newItem.id
          )

          if (findIndex === -1) {
            currentCache.items.push(newItem)
          }
        })
      },
      providesTags: ['NOTIFICATIONS'],
      query: ({ cursor, isRead, pageSize, sortBy, sortDirection }) => ({
        method: 'GET',
        params: {
          isRead,
          pageSize,
          sortBy,
          sortDirection,
        },
        url: `notifications/${cursor}`,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      transformResponse: (response: GetNotificationsResponse, _meta, _arg) => {
        return response
      },
    }),
    markAsRead: builder.mutation<void, { ids: number[] }>({
      invalidatesTags: ['NOTIFICATIONS'],
      async onQueryStarted({ ids }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
            ids.map(id => {
              const index = draft.items.findIndex(item => item.id === id)

              if (index !== -1 && !draft.items[index].isRead) {
                draft.items[index].isRead = true
                draft.notReadCount = draft.notReadCount > 0 ? draft.notReadCount - 1 : 0
              }
            })
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: data => ({
        body: data,
        method: 'PUT',
        url: `notifications/mark-as-read`,
      }),
    }),
  }),
})

export const { useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAsReadMutation } =
  notificationsApi
