import { Provider } from 'react-redux'
import { StoryFn } from '@storybook/react'
import { storybookStore } from '@/.storybook/storybookStore'

export const withReduxDecorator = (Story: StoryFn) => {
  return (
    <Provider store={storybookStore}>
      <Story />
    </Provider>
  )
}
