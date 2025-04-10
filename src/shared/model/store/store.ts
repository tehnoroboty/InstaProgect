import { type TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'

import { baseApi } from '@/src/shared/model/api/baseApi'
import { appReducer, appSlice } from '@/src/shared/model/slices/appSlice'
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

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<StoreType>()
