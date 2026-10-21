import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/maculata.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Core/Semantics',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Semantic tokens for the default Maculata system, shown in light and dark modes. The matrix reports live APCA and WCAG contrast.',
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const Tokens: Story = {
  render: () => <SemanticTokensView brand="maculata" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="maculata" />,
}
