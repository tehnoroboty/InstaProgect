import { authApi } from '@/src/store/services/authApi'
import { configureStore } from '@reduxjs/toolkit'

export const initializeStore = () => {
  return configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
    },
  })
}

type StoreType = ReturnType<typeof initializeStore>
export type RootState = StoreType['getState']
export type AppDispatch = StoreType['dispatch']
