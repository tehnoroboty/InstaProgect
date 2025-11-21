import { ResponseDevicesType } from '@/src/entities/devices/types'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

export const devicesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deviceLogOut: builder.mutation<void, number>({
      invalidatesTags: ['SESSIONS'],
      query: deviceId => {
        return {
          method: 'DELETE',
          params: {
            deviceId: deviceId,
          },
          url: `sessions/${deviceId}`,
        }
      },
    }),
    devices: builder.query<ResponseDevicesType, void>({
      providesTags: ['SESSIONS'],
      query: () => 'sessions',
    }),
    terminateAllSessions: builder.mutation<void, void>({
      invalidatesTags: ['SESSIONS'],
      query: () => {
        return {
          method: 'DELETE',
          url: 'sessions/terminate-all',
        }
      },
    }),
  }),
})

export const { useDeviceLogOutMutation, useDevicesQuery, useTerminateAllSessionsMutation } =
  devicesApi
