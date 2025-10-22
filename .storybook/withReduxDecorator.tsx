import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'
import { appSlice } from '@/src/shared/model/slices/appSlice'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

const storybookStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export const withReduxDecorator = (Story: StoryFn) => {
  return (
    <Provider store={storybookStore}>
      <Story />
    </Provider>
  )
}
