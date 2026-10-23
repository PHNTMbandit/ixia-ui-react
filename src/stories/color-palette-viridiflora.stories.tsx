import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/viridiflora.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Viridiflora',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "Alternative theme inspired by Ixia viridiflora: jade brand with apricot-coral accent. Apply with data-brand='viridiflora' after importing styles/themes/viridiflora.css. Primitives are shared with the default theme.",
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="viridiflora" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="viridiflora" />,
}
