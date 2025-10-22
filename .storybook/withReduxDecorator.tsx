import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'
import { appSlice } from '@/src/shared/model/slices/appSlice'
import { baseApi } from '@/src/shared/model/api/base/baseApi'

// 2. Настраиваем store для Storybook
const storybookStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

// 3. Создаем декоратор
export const withReduxDecorator = (Story: StoryFn) => {
  return (
    <Provider store={storybookStore}>
      <Story />
    </Provider>
  )
}
