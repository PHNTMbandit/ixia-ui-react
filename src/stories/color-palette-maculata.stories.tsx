import type { Meta, StoryObj } from '@storybook/react-vite'

import '@/styles/themes/maculata.css'

import {
  AccessibilityMatrixView,
  matrixParameters,
  SemanticTokensView,
} from './color-palette.shared'

export default {
  title: 'Color Palette/Themes/Maculata',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Default Ixia theme: apricot-coral brand (Ixia maculata) with jade accent. Full rationale: docs/colour-palette.md.',
      },
    },
  },
} satisfies Meta

type Story = StoryObj

export const SemanticTokens: Story = {
  render: () => <SemanticTokensView brand="maculata" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="maculata" />,
}
