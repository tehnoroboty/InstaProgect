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

        }),
        markAsRead: builder.mutation<void, { ids: number[] }>({
            invalidatesTags: ['NOTIFICATIONS'],
            query: (data) => ({
                body: data,
                method: 'PUT',
                url: `notifications/mark-as-read`,
            })
        }),
        deleteNotification: builder.mutation<void, { id: number }>({
            invalidatesTags: ['NOTIFICATIONS'],
            query: ({id}) => ({
                method: 'DELETE',
                url: `notifications/${id}`,
            })
        })
    })
})


export const {useGetNotificationsQuery, useMarkAsReadMutation,useDeleteNotificationMutation} = notificationsApi
