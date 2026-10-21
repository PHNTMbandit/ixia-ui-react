import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/mabel.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Mabel',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Alternative theme inspired by Ixia 'Mabel': cerise-rose brand with jade accent. Apply with data-brand='mabel' after importing styles/themes/mabel.css. Primitives are shared with the default theme.",
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="mabel" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="mabel" />,
}
