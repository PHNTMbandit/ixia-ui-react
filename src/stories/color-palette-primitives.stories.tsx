import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { measure } from './color-palette.contrast'
import { ACHROMATIC_STEPS, PrimitivesView } from './color-palette.shared'

export default {
  title: 'Color Palette/Core/Primitives',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shared primitive scales used by every Ixia theme. Chromatic families use an OKLCH-designed 50–950 shared lightness ladder. Separate warm white and black scales run from 50 (lightest) to 950 (darkest) for accessible text, surfaces and containers without runtime colour mixing. Semantic neutral roles are unchanged. Full rationale: docs/colour-palette.md.',
      },
    },
  },
} satisfies Meta

export const Primitives: StoryObj = {
  render: () => <PrimitivesView />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      theme = getComputedStyle(canvasElement)
    for (const family of ['white', 'black']) {
      let previousRatio = Infinity
      for (const step of ACHROMATIC_STEPS) {
        const name = `${family}-${step}`,
          value = theme.getPropertyValue(`--${name}`).trim(),
          swatch = getComputedStyle(canvas.getByTestId(`primitive-${name}`)),
          contrast = measure({ background: swatch.backgroundColor, color: 'rgb(0 0 0)' })
        expect(value).toMatch(/^#[\da-f]{6}$/i)
        expect(contrast.ratio).toBeGreaterThan(1)
        expect(contrast.ratio).toBeLessThan(previousRatio)
        previousRatio = contrast.ratio
      }
    }
    for (const step of [
      '25',
      '50',
      '100',
      '200',
      '300',
      '350',
      '375',
      '400',
      '500',
      '550',
      '600',
      '700',
      '775',
      '800',
      '810',
      '825',
      '850',
      '900',
      '950',
    ]) {
      expect(theme.getPropertyValue(`--neutral-${step}`).trim()).toBe('')
    }
  },
}
