import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { StoryFn } from '@storybook/react'
import { commentsAnswersApi } from '@/src/shared/model/api/commentsAnswersApi'

// 2. Настраиваем store для Storybook
const storybookStore = configureStore({
  reducer: {
    [commentsAnswersApi.reducerPath]: commentsAnswersApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commentsAnswersApi.middleware),
})

// 3. Создаем декоратор
export const withReduxDecorator = (Story: StoryFn) => {
  return (
    <Provider store={storybookStore}>
      <Story />
    </Provider>
  )
}
