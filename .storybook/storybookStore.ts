import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from '@/src/shared/model/slices/appSlice'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

export const storybookStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
