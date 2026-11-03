import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import '@/styles/themes/hogarth.css'
import '@/styles/themes/mabel.css'
import '@/styles/themes/maculata.css'
import '@/styles/themes/monadelpha.css'
import '@/styles/themes/venus.css'
import '@/styles/themes/viridiflora.css'

import { Button } from '@/components/button'

import { measure } from './color-palette.contrast'
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

const BRANDS = ['maculata', 'mabel', 'viridiflora', 'hogarth', 'venus', 'monadelpha'] as const,
  MODES = ['light', 'dark'] as const,
  TEXT_LEVELS = ['on-surface', 'on-surface-variant', 'on-surface-muted'] as const

export const Tokens: Story = {
  render: () => <SemanticTokensView brand="maculata" />,
}

export const AccessibilityMatrix: Story = {
  parameters: matrixParameters,
  render: () => <AccessibilityMatrixView brand="maculata" />,
}

export const InteractionStates: Story = {
  render: () => (
    <div className="grid gap-md lg:grid-cols-2">
      {BRANDS.flatMap((brand) =>
        MODES.map((mode) => (
          <section
            key={`${brand}-${mode}`}
            data-brand={brand}
            data-theme={mode}
            className="flex flex-col gap-md rounded-xl bg-surface p-md text-on-surface"
          >
            <h2 className="style-text-strong-1 capitalize">
              {brand} / {mode}
            </h2>
            <div className="flex flex-wrap gap-xs">
              <Button tone="neutral" variant="secondary">
                Neutral secondary
              </Button>
              <Button tone="neutral" variant="outline">
                Neutral outline
              </Button>
              <Button tone="neutral" variant="ghost">
                Neutral ghost
              </Button>
              <Button tone="brand" variant="ghost">
                Brand ghost
              </Button>
              <Button tone="accent" variant="ghost">
                Accent ghost
              </Button>
            </div>
            <div className="flex flex-wrap gap-xs">
              {(['neutral', 'brand', 'accent'] as const).map((tone) => (
                <span
                  key={tone}
                  data-testid={`${brand}-${mode}-${tone}-hover`}
                  className="rounded-full px-md py-xs style-text-strong-0"
                  style={{
                    background: `var(--color-${tone}-subtle)`,
                    color: `var(--color-${tone}-on-container)`,
                  }}
                >
                  {tone} hover
                </span>
              ))}
              <span
                data-testid={`${brand}-${mode}-neutral-secondary-hover`}
                className="rounded-full bg-neutral-container-high px-md py-xs style-text-strong-0 text-neutral-on-container"
              >
                secondary hover
              </span>
            </div>
            {(['surface', 'surface-2', 'surface-3'] as const).map((surface) => (
              <div
                key={surface}
                className="flex flex-col gap-2xs rounded-lg p-sm"
                style={{ background: `var(--color-${surface})` }}
              >
                {TEXT_LEVELS.map((level) => (
                  <p
                    key={level}
                    data-testid={`${brand}-${mode}-${surface}-${level}`}
                    className="style-text-default-0"
                    style={{
                      background: `var(--color-${surface})`,
                      color: `var(--color-${level})`,
                    }}
                  >
                    {level}: The quick brown fox jumps over the lazy dog.
                  </p>
                ))}
              </div>
            ))}
          </section>
        )),
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const brand of BRANDS) {
      for (const mode of MODES) {
        for (const surface of ['surface', 'surface-2', 'surface-3']) {
          const contrasts = TEXT_LEVELS.map((level) => {
            const style = getComputedStyle(
              canvas.getByTestId(`${brand}-${mode}-${surface}-${level}`),
            )
            const contrast = measure({ background: style.backgroundColor, color: style.color })
            expect(contrast.ratio).toBeGreaterThanOrEqual(4.5)
            return Math.abs(contrast.lc)
          })
          expect(contrasts[0] - contrasts[1]).toBeGreaterThanOrEqual(11.5)
          expect(contrasts[1] - contrasts[2]).toBeGreaterThanOrEqual(11.5)
          const hover = getComputedStyle(canvas.getByTestId(`${brand}-${mode}-neutral-hover`)),
            background = getComputedStyle(
              canvas.getByTestId(`${brand}-${mode}-${surface}-on-surface`),
            )
          if (surface === 'surface') {
            expect(
              measure({ background: background.backgroundColor, color: hover.backgroundColor })
                .ratio,
            ).toBeGreaterThanOrEqual(1.15)
          }
        }
        for (const tone of ['neutral', 'brand', 'accent']) {
          const style = getComputedStyle(canvas.getByTestId(`${brand}-${mode}-${tone}-hover`))
          expect(
            measure({ background: style.backgroundColor, color: style.color }).ratio,
          ).toBeGreaterThanOrEqual(4.5)
          if (mode === 'light') {
            const surface = getComputedStyle(
              canvas.getByTestId(`${brand}-${mode}-surface-on-surface`),
            )
            expect(
              measure({ background: surface.backgroundColor, color: style.backgroundColor }).ratio,
            ).toBeGreaterThanOrEqual(1.07)
          }
        }
        const resting = getComputedStyle(canvas.getByTestId(`${brand}-${mode}-neutral-hover`)),
          hovered = getComputedStyle(
            canvas.getByTestId(`${brand}-${mode}-neutral-secondary-hover`),
          ),
          section = canvas.getByTestId(`${brand}-${mode}-neutral-hover`).closest('section')
        expect(section).not.toBeNull()
        if (!section) {
          throw new Error(`Missing ${brand}/${mode} theme section`)
        }
        const secondary = getComputedStyle(
          within(section).getByRole('button', { name: 'Neutral secondary' }),
        )
        expect(secondary.borderTopWidth).toBe('0px')
        expect(secondary.backgroundColor).toBe(resting.backgroundColor)
        expect(hovered.backgroundColor).not.toBe(resting.backgroundColor)
        for (const state of [resting, hovered]) {
          const contrast = measure({ background: state.backgroundColor, color: state.color })
          expect(Math.abs(contrast.lc)).toBeGreaterThanOrEqual(75)
          expect(contrast.ratio).toBeGreaterThanOrEqual(4.5)
        }
      }
    }
  },
}
