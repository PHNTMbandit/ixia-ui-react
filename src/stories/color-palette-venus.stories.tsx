import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/venus.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Venus',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Alternative theme inspired by Ixia 'Venus': orchid-magenta brand with a leaf-emerald accent. Apply with data-brand='venus' after importing styles/themes/venus.css.",
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="venus" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="venus" />,
}
