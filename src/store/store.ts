import { appReducer, appSlice } from '@/src/store/Slices/appSlice'
import { baseApi } from '@/src/store/services/baseApi'
import { configureStore } from '@reduxjs/toolkit'

export const initializeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
      [appSlice.name]: appReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
  })
}

type StoreType = ReturnType<typeof initializeStore>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
