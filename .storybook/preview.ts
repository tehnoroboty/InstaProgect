import type { Decorator, Preview } from '@storybook/react'
import '@/src/shared/styles/index.scss'

import '@fontsource-variable/inter'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import { withReduxDecorator } from '@/.storybook/withReduxDecorator'

export const decorators: Decorator[] = [withReduxDecorator]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: 'dark',
    },
  },
}

export default preview
