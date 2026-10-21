import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/monadelpha.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Monadelpha',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Alternative theme inspired by Ixia monadelpha: blue-violet brand with a turquoise-eye teal accent. Apply with data-brand='monadelpha' after importing styles/themes/monadelpha.css.",
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="monadelpha" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="monadelpha" />,
}
