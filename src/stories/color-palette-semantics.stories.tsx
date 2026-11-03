import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { expect, fireEvent, waitFor, within } from 'storybook/test'

import '@/styles/themes/hogarth.css'
import '@/styles/themes/mabel.css'
import '@/styles/themes/maculata.css'
import '@/styles/themes/monadelpha.css'
import '@/styles/themes/venus.css'
import '@/styles/themes/viridiflora.css'

import { accordionItemVariants } from '@/components/accordion/accordion.types'
import { Button } from '@/components/button'
import { ContextMenu } from '@/components/context-menu'
import {
  contextMenuItemVariants,
  contextMenuSubmenuTriggerVariants,
} from '@/components/context-menu/context-menu.types'
import { Menu } from '@/components/menu'
import { menuItemVariants, menuSubmenuTriggerVariants } from '@/components/menu/menu.types'
import { navBarItemVariants } from '@/components/nav-bar/nav-bar.types'
import { toggleVariants } from '@/components/toggle/toggle.types'

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
  TEXT_LEVELS = ['on-surface', 'on-surface-variant', 'on-surface-muted'] as const,
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const

const CUSTOM_THEME: CSSProperties & Record<`--${string}`, string> = {
  '--ixia-brand-container-low': 'light-dark(var(--orange-50), var(--neutral-950))',
  '--ixia-brand-container': 'light-dark(var(--orange-200), var(--orange-900))',
  '--ixia-brand-container-high': 'light-dark(var(--orange-300), var(--orange-800))',
  '--ixia-brand-on-container': 'light-dark(var(--orange-950), var(--orange-50))',
  '--color-brand-container-low': 'var(--ixia-brand-container-low)',
  '--color-brand-container': 'var(--ixia-brand-container)',
  '--color-brand-container-high': 'var(--ixia-brand-container-high)',
  '--color-brand-on-container': 'var(--ixia-brand-on-container)',
  '--ixia-border': 'light-dark(var(--neutral-300), var(--neutral-700))',
  '--ixia-neutral-border': 'var(--ixia-border)',
  '--color-border': 'var(--ixia-border)',
  '--color-neutral-border': 'var(--color-border)',
}

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
                    background: `var(--color-${tone}-container)`,
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
          ),
          theme = getComputedStyle(section),
          swatch = canvasElement.ownerDocument.createElement('span')
        expect(secondary.borderTopWidth).toBe('0px')
        expect(secondary.backgroundColor).toBe(resting.backgroundColor)
        expect(hovered.backgroundColor).not.toBe(resting.backgroundColor)
        section.append(swatch)
        try {
          swatch.style.backgroundColor =
            mode === 'light'
              ? 'var(--neutral-200)'
              : 'color-mix(in srgb, var(--neutral-900) 20%, var(--neutral-800))'
          expect(resting.backgroundColor).toBe(getComputedStyle(swatch).backgroundColor)
        } finally {
          swatch.remove()
        }
        for (const tone of TONES) {
          expect(theme.getPropertyValue(`--ixia-${tone}-subtle`).trim()).toBe('')
          expect(theme.getPropertyValue(`--color-${tone}-subtle`).trim()).toBe('')
        }
        for (const state of [resting, hovered]) {
          const contrast = measure({ background: state.backgroundColor, color: state.color })
          expect(Math.abs(contrast.lc)).toBeGreaterThanOrEqual(75)
          expect(contrast.ratio).toBeGreaterThanOrEqual(4.5)
        }
      }
    }
    for (const tone of TONES) {
      expect(accordionItemVariants({ tone })).toContain(
        `[&:not([data-open])]:hover:bg-${tone}-container`,
      )
      expect(navBarItemVariants({ tone })).toContain(`hover:bg-${tone}-container`)
      expect(navBarItemVariants({ tone })).toContain(`data-[active=true]:bg-${tone}-container`)
      expect(toggleVariants({ tone })).toContain(`hover:not-disabled:bg-${tone}-container`)
      for (const item of [menuItemVariants({ tone }), contextMenuItemVariants({ tone })]) {
        expect(item).toContain(`data-highlighted:before:bg-${tone}-container-high`)
      }
      for (const submenu of [
        menuSubmenuTriggerVariants({ tone }),
        contextMenuSubmenuTriggerVariants({ tone }),
      ]) {
        expect(submenu).toContain(`data-highlighted:before:bg-${tone}-container-high`)
        expect(submenu).toContain(`data-popup-open:before:bg-${tone}-container-high`)
        expect(submenu).toContain(
          `data-highlighted:data-popup-open:before:bg-${tone}-container-high`,
        )
      }
    }
  },
}

export const CustomTheme: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A scoped theme customizes the three container levels and keeps the neutral outline matched to the standard border.',
      },
    },
  },
  render: () => (
    <div className="grid gap-md lg:grid-cols-2">
      {MODES.map((mode) => (
        <section
          key={mode}
          data-testid={`custom-${mode}`}
          data-brand="custom"
          data-theme={mode}
          style={CUSTOM_THEME}
          className="flex flex-col gap-sm rounded-xl bg-surface p-md text-on-surface"
        >
          <h2 className="style-text-strong-1 capitalize">Custom theme / {mode}</h2>
          <div className="flex flex-wrap gap-xs">
            <span
              data-testid={`${mode}-container-low`}
              className="rounded-lg bg-brand-container-low p-sm text-brand-on-container"
            >
              Quiet container
            </span>
            <span
              data-testid={`${mode}-container`}
              className="rounded-lg bg-brand-container p-sm text-brand-on-container"
            >
              Container surface
            </span>
            <span
              data-testid={`${mode}-container-high`}
              className="rounded-lg bg-brand-container-high p-sm text-brand-on-container"
            >
              Stronger highlight
            </span>
            <span data-testid={`${mode}-border`} className="rounded-lg border border-border p-sm">
              Standard border
            </span>
            <Button data-testid={`${mode}-outline`} tone="neutral" variant="outline">
              Neutral outline
            </Button>
          </div>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      resolvedContainers: string[] = []
    for (const mode of MODES) {
      const section = canvas.getByTestId(`custom-${mode}`),
        low = getComputedStyle(canvas.getByTestId(`${mode}-container-low`)),
        container = getComputedStyle(canvas.getByTestId(`${mode}-container`)),
        high = getComputedStyle(canvas.getByTestId(`${mode}-container-high`)),
        border = getComputedStyle(canvas.getByTestId(`${mode}-border`)),
        outline = getComputedStyle(canvas.getByTestId(`${mode}-outline`)),
        swatch = canvasElement.ownerDocument.createElement('span')
      section.append(swatch)
      try {
        const primitives =
          mode === 'light'
            ? ['orange-50', 'orange-200', 'orange-300']
            : ['neutral-950', 'orange-900', 'orange-800']
        const states = [low, container, high]
        for (const [index, state] of states.entries()) {
          swatch.style.backgroundColor = `var(--${primitives[index]})`
          expect(state.backgroundColor).toBe(getComputedStyle(swatch).backgroundColor)
          swatch.style.color = mode === 'light' ? 'var(--orange-950)' : 'var(--orange-50)'
          expect(state.color).toBe(getComputedStyle(swatch).color)
        }
        expect(new Set(states.map((state) => state.backgroundColor)).size).toBe(3)
        swatch.style.borderColor = mode === 'light' ? 'var(--neutral-300)' : 'var(--neutral-700)'
        expect(border.borderTopColor).toBe(getComputedStyle(swatch).borderTopColor)
        expect(outline.borderTopColor).toBe(border.borderTopColor)
        resolvedContainers.push(container.backgroundColor)
      } finally {
        swatch.remove()
      }
    }
    expect(resolvedContainers[0]).not.toBe(resolvedContainers[1])
  },
}

export const MenuHighlights: Story = {
  render: () => (
    <div className="grid gap-md lg:grid-cols-2">
      {MODES.map((mode) => (
        <section
          key={mode}
          data-theme={mode}
          className="flex flex-col gap-sm rounded-xl bg-surface p-md text-on-surface"
        >
          <h2 className="style-text-strong-1 capitalize">{mode} menu highlights</h2>
          <Menu>
            <Menu.Trigger>
              <Button>{mode} menu</Button>
            </Menu.Trigger>
            <Menu.Popup>
              <div data-theme={mode} className="bg-surface-2">
                {TONES.map((tone) => (
                  <Menu.Item key={tone} tone={tone}>
                    {mode} menu {tone}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Popup>
          </Menu>
          <ContextMenu>
            <ContextMenu.Trigger>
              <button type="button" className="rounded-lg border border-border p-sm">
                {mode} context surface
              </button>
            </ContextMenu.Trigger>
            <ContextMenu.Popup>
              <div data-theme={mode} className="bg-surface-2">
                {TONES.map((tone) => (
                  <ContextMenu.Item key={tone} tone={tone}>
                    {mode} context {tone}
                  </ContextMenu.Item>
                ))}
              </div>
            </ContextMenu.Popup>
          </ContextMenu>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement),
      page = within(canvasElement.ownerDocument.body),
      checkHighlight = async (item: HTMLElement, tone: (typeof TONES)[number]) => {
        await userEvent.hover(item)
        await waitFor(() => expect(item).toHaveAttribute('data-highlighted'))
        const scope = item.closest('[data-theme]')
        if (!scope) {
          throw new Error(`Missing theme scope for ${tone} menu item`)
        }
        const swatch = canvasElement.ownerDocument.createElement('span')
        scope.append(swatch)
        try {
          swatch.style.backgroundColor = `var(--color-${tone}-container-high)`
          const high = getComputedStyle(swatch).backgroundColor
          swatch.style.backgroundColor = `var(--color-${tone}-container)`
          await expect(high).not.toBe(getComputedStyle(swatch).backgroundColor)
          await waitFor(() => expect(getComputedStyle(item, '::before').backgroundColor).toBe(high))
          swatch.style.color = `var(--color-${tone}-on-container)`
          await waitFor(() =>
            expect(getComputedStyle(item).color).toBe(getComputedStyle(swatch).color),
          )
        } finally {
          swatch.remove()
        }
      }

    for (const mode of MODES) {
      await userEvent.click(canvas.getByRole('button', { name: `${mode} menu` }))
      for (const tone of TONES) {
        await checkHighlight(
          await page.findByRole('menuitem', { name: `${mode} menu ${tone}` }),
          tone,
        )
      }
      await userEvent.keyboard('{Escape}')

      fireEvent.contextMenu(canvas.getByRole('button', { name: `${mode} context surface` }), {
        button: 2,
        clientX: 100,
        clientY: 100,
      })
      for (const tone of TONES) {
        await checkHighlight(
          await page.findByRole('menuitem', { name: `${mode} context ${tone}` }),
          tone,
        )
      }
      await userEvent.keyboard('{Escape}')
    }
  },
}
