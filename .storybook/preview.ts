import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '@/styles/output.css'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      attributeName: 'data-theme',
      defaultTheme: 'dark',
      themes: { dark: 'dark', light: 'light' },
    }),
  ],
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'centered',
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
