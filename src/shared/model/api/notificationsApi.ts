import {baseApi} from '@/src/shared/model/api/baseApi'
import {SortDirection} from "@/src/shared/model/api/types";

export type Notifications = {
    id: number,
    message: string,
    isRead: boolean,
    createdAt: string
}
type GetNotificationsResponse = {
    pageSize: number,
    totalCount: number,
    notReadCount: number,
    items: Notifications[]
}

type GetNotificationsArgs = {
    cursor?: number
    sortBy?: string
    isRead?: boolean
    pageSize?: number
    sortDirection?: SortDirection
}

export const notificationsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query<GetNotificationsResponse, GetNotificationsArgs>({
            providesTags: ['NOTIFICATIONS'],
            forceRefetch({currentArg, previousArg}) {
                return currentArg?.cursor !== previousArg?.cursor
            },
            merge: (currentCache, newItems) => {
                newItems.items.map(newitem => {
                    const findIndex = currentCache.items.findIndex(currentItem => currentItem.id === newitem.id)
                    if (findIndex === -1) {
                        currentCache.items.push(newitem)
                    }
                })
            },
            query: ({cursor, pageSize, sortBy, sortDirection, isRead}) => ({
                method: 'GET',
                params: {
                    pageSize,
                    sortBy,
                    sortDirection,
                    isRead
                },
                url: `notifications/${cursor}`,
            }),
            serializeQueryArgs: ({endpointName}) => {
                return endpointName
            },
            transformResponse: (response: GetNotificationsResponse, _meta, _arg) => {
                return response
            },
        }),
        markAsRead: builder.mutation<void, { ids: number[] }>({
            async onQueryStarted({ids}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
                        ids.map(id => {
                            const index = draft.items.findIndex(item => item.id === id)
                            if (index !== -1 && !draft.items[index].isRead) {
                                draft.items[index].isRead = true
                                draft.notReadCount = draft.notReadCount - 1
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
            invalidatesTags: ['NOTIFICATIONS'],
            query: (data) => ({
                body: data,
                method: 'PUT',
                url: `notifications/mark-as-read`,
            })
        }),
        deleteNotification: builder.mutation<void, { id: number }>({
            async onQueryStarted({id}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    notificationsApi.util.updateQueryData('getNotifications', {}, draft => {
                        const index = draft.items.findIndex(item => item.id === id)

                        if (index !== -1) {
                            if (!draft.items[index].isRead) {
                                draft.notReadCount = draft.notReadCount - 1
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
            invalidatesTags: ['NOTIFICATIONS'],
            query: ({id}) => ({
                method: 'DELETE',
                url: `notifications/${id}`,
            })
        })
    })
})


export const {useGetNotificationsQuery, useMarkAsReadMutation, useDeleteNotificationMutation} = notificationsApi
