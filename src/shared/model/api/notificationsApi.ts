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
    }),
})

export const {useGetNotificationsQuery} = notificationsApi
