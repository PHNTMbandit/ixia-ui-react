import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/hogarth.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Hogarth',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Alternative theme inspired by Ixia 'Hogarth': cream-gold brand with a carmine-eye rose accent. Light mode uses yellow-800 so filled buttons stay text-safe. Apply with data-brand='hogarth' after importing styles/themes/hogarth.css.",
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="hogarth" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="hogarth" />,
}
