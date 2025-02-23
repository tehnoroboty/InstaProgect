import { authApi } from '@/src/shared/model/api/authApi'
import { baseApi } from '@/src/shared/model/api/baseApi'
import { appReducer, appSlice } from '@/src/shared/model/slices/appSlice'
import { configureStore } from '@reduxjs/toolkit'

export const initializeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
      [appSlice.name]: appReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
  })
}

type StoreType = ReturnType<typeof initializeStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
