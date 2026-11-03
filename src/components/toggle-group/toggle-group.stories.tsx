import { HeartIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { measure } from '@/stories/color-palette.contrast'

import { Toggle } from '../toggle/toggle'
import { ToggleGroup } from './toggle-group'

export default {
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple toggles at once.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      description: 'Size of the toggle group and its toggles.',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      description: 'Visual style of the toggle group.',
      options: ['default', 'ghost'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    multiple: false,
    size: 'medium',
    variant: 'default',
  },
  component: ToggleGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Toggle Group organizes related toggles into one control. It supports single selection by default and multiple selections when enabled.',
      },
      subtitle: 'A group of toggle buttons for single or multiple selections.',
    },
  },
  render: (args) => (
    <div className="w-[500px]">
      <ToggleGroup {...args}>
        <Toggle>
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Option 1
            </>
          )}
        </Toggle>
        <Toggle>
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Option 2
            </>
          )}
        </Toggle>
      </ToggleGroup>
    </div>
  ),
  title: 'Components/Toggle Group',
} satisfies Meta<typeof ToggleGroup>

type Story = StoryObj<typeof ToggleGroup>

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  MODES = ['light', 'dark'] as const

export const Playground: Story = {}

export const InteractionTokens: Story = {
  render: () => (
    <div className="space-y-md">
      {MODES.map((mode) => (
        <section
          key={mode}
          data-testid={`interaction-${mode}`}
          data-theme={mode}
          className="space-y-sm rounded-xl bg-surface p-md"
        >
          <ToggleGroup data-testid="filled">
            {TONES.map((tone) => (
              <Toggle key={tone} tone={tone}>
                Filled {tone}
              </Toggle>
            ))}
            <Toggle tone="neutral" className="hover:not-disabled:bg-info-default">
              Custom hover
            </Toggle>
          </ToggleGroup>
          <ToggleGroup data-testid="ghost" variant="ghost">
            {TONES.map((tone) => (
              <Toggle key={tone} tone={tone}>
                Ghost {tone}
              </Toggle>
            ))}
          </ToggleGroup>
          <ToggleGroup data-testid="unstyled" variant={null}>
            <Toggle tone="neutral">Unstyled neutral</Toggle>
          </ToggleGroup>
          <Toggle tone="neutral">Standalone neutral</Toggle>
          <span data-testid="neutral-highlight" className="hidden bg-neutral-container-high" />
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const mode of MODES) {
      const section = within(canvas.getByTestId(`interaction-${mode}`)),
        filled = section.getByTestId('filled'),
        ghost = section.getByTestId('ghost')
      for (const tone of TONES) {
        const filledToggle = within(filled).getByRole('button', { name: `Filled ${tone}` }),
          ghostToggle = within(ghost).getByRole('button', { name: `Ghost ${tone}` })
        await expect(filledToggle).toHaveClass(`hover:not-disabled:bg-${tone}-container-high`)
        await expect(filledToggle).not.toHaveClass(`hover:not-disabled:bg-${tone}-container`)
        await expect(ghostToggle).toHaveClass(`hover:not-disabled:bg-${tone}-container`)
        await expect(ghostToggle).not.toHaveClass(`hover:not-disabled:bg-${tone}-container-high`)
      }
      await expect(section.getByRole('button', { name: 'Standalone neutral' })).toHaveClass(
        'hover:not-disabled:bg-neutral-container',
      )
      await expect(section.getByRole('button', { name: 'Unstyled neutral' })).toHaveClass(
        'hover:not-disabled:bg-neutral-container',
      )
      const custom = within(filled).getByRole('button', { name: 'Custom hover' })
      await expect(custom).toHaveClass('hover:not-disabled:bg-info-default')
      await expect(custom).not.toHaveClass('hover:not-disabled:bg-neutral-container-high')

      const background = getComputedStyle(filled).backgroundColor,
        highlight = getComputedStyle(section.getByTestId('neutral-highlight')).backgroundColor
      await expect(measure({ background, color: highlight }).ratio).toBeGreaterThanOrEqual(1.15)
    }
  },
}

export const BehaviorSingleSelection: Story = {
  args: {
    multiple: false,
  },
}

export const BehaviorMultipleSelection: Story = {
  args: {
    multiple: true,
  },
}

export const CompositionFormattingToolbar: Story = {
  render: () => (
    <div className="w-[500px] space-y-sm rounded-lg border border-surface-3 bg-surface p-md">
      <p className="style-text-default--1 text-on-surface-variant">Formatting options</p>
      <ToggleGroup multiple>
        <Toggle size="small" tone="brand">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Bold
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="accent">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Italic
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="neutral">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Underline
            </>
          )}
        </Toggle>
      </ToggleGroup>
    </div>
  ),
}

export const CompositionAutoSizing: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Small size (Toggles inherit from group)
        </p>
        <ToggleGroup size="small" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Medium size (default)</p>
        <ToggleGroup size="medium" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Large size</p>
        <ToggleGroup size="large" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  ),
}

export const GhostVariant: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Small size (Toggles inherit from group)
        </p>
        <ToggleGroup size="small" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Medium size (default)</p>
        <ToggleGroup size="medium" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Large size</p>
        <ToggleGroup size="large" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  ),
}
