import type { Meta, StoryObj } from '@storybook/react-vite'

import { PrimitivesView } from './color-palette.shared'

export default {
  title: 'Color Palette/Core/Primitives',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shared primitive scales used by every Ixia theme. OKLCH-designed, Tailwind-style 50–950 scales on a shared lightness ladder, so the same step has near-identical APCA contrast in every family. Full rationale: docs/colour-palette.md.',
      },
    },
  },
} satisfies Meta

export const Primitives: StoryObj = {
  render: () => <PrimitivesView />,
}
