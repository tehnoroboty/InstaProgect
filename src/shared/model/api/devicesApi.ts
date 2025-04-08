import { ResponseDevicesType } from '@/src/entities/devices'
import { baseApi } from '@/src/shared/model/api/baseApi'

export const devicesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    devices: builder.query<ResponseDevicesType, void>({
      query: () => 'sessions',
    }),
  }),
})

export const { useDevicesQuery } = devicesApi
