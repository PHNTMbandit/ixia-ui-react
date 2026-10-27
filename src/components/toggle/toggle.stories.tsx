import { HeartIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { ToggleGroup } from '../toggle-group/toggle-group'
import { Toggle } from './toggle'

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the toggle interaction.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      description:
        'Size of the toggle. A single SVG child automatically receives square, padding-free styling.',
      options: ['small', 'medium', 'large'],
    },
    tone: {
      control: { type: 'select' },
      description: 'The tone of the toggle, which determines its color scheme.',
      options: ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'],
      table: {
        defaultValue: { summary: 'brand' },
        type: { summary: 'brand | accent | neutral | error | info | success | warning' },
      },
    },
  },
  args: {
    size: 'medium',
    tone: 'brand',
  },
  component: Toggle,
  parameters: {
    description: {
      component:
        'The Toggle component allows users to switch between two states, such as on and off. Its three sizes (`large`, `medium`, `small`) work for both text and icon-only content, including render functions. A single SVG child automatically becomes square and padding-free. Icon-only toggles must have an accessible label.',
    },
    subtitle: 'A component for toggling between two states.',
  },
  render: (args) => (
    <div className="flex w-[500px] items-center">
      <Toggle {...args}>
        {({ pressed }) => (
          <>
            {pressed ? <HeartIcon weight="fill" /> : <HeartIcon weight="bold" />}
            {pressed ? 'Liked' : 'Like'}
          </>
        )}
      </Toggle>
    </div>
  ),
  title: 'Components/Toggle',
} satisfies Meta<typeof Toggle>

type Story = StoryObj<typeof Toggle>

export const AutomaticIconSizing: Story = {
  render: () => (
    <div className="flex flex-col gap-sm">
      {(['large', 'medium', 'small'] as const).map((size) => (
        <ToggleGroup key={size} size={size} multiple data-testid={size}>
          <Toggle value="static" aria-label="Static icon">
            <HeartIcon />
          </Toggle>
          <Toggle value="dynamic" aria-label="Dynamic icon">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle value="label">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
                Like
              </>
            )}
          </Toggle>
        </ToggleGroup>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [index, size] of ['large', 'medium', 'small'].entries()) {
      const row = canvas.getByTestId(size),
        controls = within(row),
        staticIcon = controls.getByRole('button', { name: 'Static icon' }),
        dynamicIcon = controls.getByRole('button', { name: 'Dynamic icon' }),
        labeled = controls.getByRole('button', { name: 'Like' }),
        reference = document.createElement('div')

      reference.style.width = `var(--spacing-${['2xl', 'xl', 'lg'][index]})`
      reference.style.height = `var(--spacing-${['lg', 'md', 'sm'][index]})`
      row.after(reference)

      try {
        for (const toggle of [staticIcon, dynamicIcon]) {
          const bounds = toggle.getBoundingClientRect()

          await expect(bounds.width).toBeCloseTo(reference.getBoundingClientRect().width, 1)
          await expect(bounds.height).toBeCloseTo(bounds.width, 1)
          await expect(getComputedStyle(toggle).paddingLeft).toBe('0px')
          await expect(getComputedStyle(toggle).paddingRight).toBe('0px')
          await expect(toggle.querySelector('svg')!.getBoundingClientRect().width).toBeCloseTo(
            reference.getBoundingClientRect().height,
            1,
          )
        }
        await expect(Number.parseFloat(getComputedStyle(labeled).paddingLeft)).toBeGreaterThan(0)
        await expect(Number.parseFloat(getComputedStyle(labeled).lineHeight)).toBeCloseTo(
          Number.parseFloat(getComputedStyle(labeled).fontSize),
          1,
        )
        await expect(labeled.getBoundingClientRect().height).toBeCloseTo(
          staticIcon.getBoundingClientRect().height,
          1,
        )
        await userEvent.click(dynamicIcon)
        await expect(dynamicIcon).toHaveAttribute('aria-pressed', 'true')
        await expect(dynamicIcon.getBoundingClientRect().width).toBeCloseTo(
          staticIcon.getBoundingClientRect().width,
          1,
        )
      } finally {
        reference.remove()
      }
    }
  },
}

export const Playground: Story = {}

export const ToneAccent: Story = {
  args: {
    tone: 'accent',
  },
}

export const ToneNeutral: Story = {
  args: {
    tone: 'neutral',
  },
}

export const ToneError: Story = {
  args: {
    tone: 'error',
  },
}

export const ToneInfo: Story = {
  args: {
    tone: 'info',
  },
}

export const ToneSuccess: Story = {
  args: {
    tone: 'success',
  },
}

export const ToneWarning: Story = {
  args: {
    tone: 'warning',
  },
}

export const BehaviorDisabled: Story = {
  args: {
    disabled: true,
  },
}

export const SizeSmall: Story = {
  args: {
    size: 'small',
  },
}

export const SizeMedium: Story = {
  args: {
    size: 'medium',
  },
}

export const SizeLarge: Story = {
  args: {
    size: 'large',
  },
}

export const IconSmall: Story = {
  args: {
    size: 'small',
  },
  render: (args) => (
    <div className="flex w-[500px] items-center">
      <Toggle {...args} aria-label="Like">
        {({ pressed }) => (pressed ? <HeartIcon weight="fill" /> : <HeartIcon weight="bold" />)}
      </Toggle>
    </div>
  ),
}

export const IconMedium: Story = {
  args: {
    size: 'medium',
  },
  render: (args) => (
    <div className="flex w-[500px] items-center">
      <Toggle {...args} aria-label="Like">
        {({ pressed }) => (pressed ? <HeartIcon weight="fill" /> : <HeartIcon weight="bold" />)}
      </Toggle>
    </div>
  ),
}

export const IconLarge: Story = {
  args: {
    size: 'large',
  },
  render: (args) => (
    <div className="flex w-[500px] items-center">
      <Toggle {...args} aria-label="Like">
        {({ pressed }) => (pressed ? <HeartIcon weight="fill" /> : <HeartIcon weight="bold" />)}
      </Toggle>
    </div>
  ),
}

export const CompositionReactionToolbar: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border border-surface-3 bg-surface p-md">
      <div className="flex items-center gap-xs">
        <Toggle size="small" tone="brand">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Like
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="accent">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Favorite
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="neutral">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Save
            </>
          )}
        </Toggle>
      </div>
    </div>
  ),
}

export const CompositionInheritedSize: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Toggles inherit size from ToggleGroup (small)
        </p>
        <ToggleGroup size="small" multiple>
          <Toggle tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
                Like
              </>
            )}
          </Toggle>
          <Toggle tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
                Favorite
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Explicit size prop overrides inherited size
        </p>
        <ToggleGroup size="small" multiple>
          <Toggle size="large" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
                Like
              </>
            )}
          </Toggle>
          <Toggle tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
                Favorite
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  ),
}
