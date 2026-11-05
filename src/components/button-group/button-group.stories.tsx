import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { userEvent as browserUserEvent } from 'vitest/browser'

import { Button } from '../button/button'
import { Input } from '../input/index'
import { ButtonGroup } from './button-group'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  VARIANTS = ['fill', 'secondary', 'outline', 'ghost', 'soft', 'elevated'] as const,
  SIZES = ['large', 'medium', 'small', 'extraSmall'] as const,
  disabledActivation = fn()

type Tone = (typeof TONES)[number]

const TONE_DESCRIPTIONS: Record<Tone, string> = {
    accent: 'Highlighted grouped action set for promoted or secondary emphasis.',
    brand: 'Default tone for primary grouped actions and segmented controls.',
    error: 'Destructive grouped actions such as bulk delete or revoke flows.',
    info: 'Informational action cluster for filters, views, or utilities.',
    neutral: 'General-purpose grouping with minimal semantic emphasis.',
    success: 'Positive grouped actions such as save or confirm options.',
    warning: 'Attention-grabbing grouped actions where choices need more care.',
  },
  ThreeButtons = () => (
    <>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </>
  ),
  TwoIconButtons = () => (
    <>
      <Button aria-label="Increase">
        <PlusIcon weight="bold" />
      </Button>
      <Button aria-label="Decrease">
        <MinusIcon weight="bold" />
      </Button>
    </>
  ),
  VariantShowcase = ({ variant = 'fill' }: { variant?: (typeof VARIANTS)[number] }) => (
    <div className="flex flex-col gap-sm">
      {TONES.map((tone) => (
        <ButtonGroup key={tone} tone={tone} variant={variant}>
          <ThreeButtons />
        </ButtonGroup>
      ))}
    </div>
  )

export default {
  argTypes: {
    orientation: {
      control: 'radio',
      description: 'Lays out the group horizontally or vertically.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: 'radio',
      description:
        'Controls child button height, padding, and icon sizing. Icon-only children automatically become square with no padding.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    tone: {
      control: 'select',
      description: 'Applies a semantic tone across the entire group.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    variant: {
      control: 'radio',
      description: 'Controls the shared visual style of the grouped buttons.',
      options: VARIANTS,
      table: {
        defaultValue: { summary: 'fill' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'medium',
    tone: 'brand',
    variant: 'fill',
  },
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The Button Group component combines related buttons into one cohesive unit. Button children inherit size, tone, and variant unless explicitly overridden. Native buttons and links rendered with Button render receive the same styling; use nativeButton={false} for links. Disabled links use aria-disabled styling and cannot activate. Icon-only buttons automatically become square and padding-free. It supports multiple variants, tones, and orientations.',
      },
      subtitle: 'Groups related actions into a single connected control.',
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <ThreeButtons />
    </ButtonGroup>
  ),
  title: 'Components/Button Group',
} satisfies Meta<typeof ButtonGroup>

type Story = StoryObj<typeof ButtonGroup>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use controls to explore different tones, variants, sizes, and orientations.',
      },
    },
  },
}

export const Brand: Story = {
  args: {
    tone: 'brand',
  },
  name: 'Tone / Brand',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.brand,
      },
    },
  },
}

export const Accent: Story = {
  args: {
    tone: 'accent',
  },
  name: 'Tone / Accent',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.accent,
      },
    },
  },
}

export const Neutral: Story = {
  args: {
    tone: 'neutral',
  },
  name: 'Tone / Neutral',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.neutral,
      },
    },
  },
}

export const Error: Story = {
  args: {
    tone: 'error',
  },
  name: 'Tone / Error',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.error,
      },
    },
  },
}

export const Info: Story = {
  args: {
    tone: 'info',
  },
  name: 'Tone / Info',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.info,
      },
    },
  },
}

export const Success: Story = {
  args: {
    tone: 'success',
  },
  name: 'Tone / Success',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.success,
      },
    },
  },
}

export const Warning: Story = {
  args: {
    tone: 'warning',
  },
  name: 'Tone / Warning',
  parameters: {
    docs: {
      description: {
        story: TONE_DESCRIPTIONS.warning,
      },
    },
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  name: 'Orientation / Horizontal',
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  name: 'Orientation / Vertical',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
}

export const Fill: Story = {
  args: {
    variant: 'fill',
  },
  name: 'Variant / Fill',
  render: () => <VariantShowcase variant="fill" />,
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
  name: 'Variant / Secondary',
  render: () => <VariantShowcase variant="secondary" />,
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  name: 'Variant / Outline',
  render: () => <VariantShowcase variant="outline" />,
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  name: 'Variant / Ghost',
  render: () => <VariantShowcase variant="ghost" />,
}

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
  name: 'Variant / Soft',
  render: () => <VariantShowcase variant="soft" />,
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  name: 'Variant / Elevated',
  render: () => <VariantShowcase variant="elevated" />,
}

export const InputWithButton: Story = {
  name: 'Composition / Input with Button',
  parameters: {
    docs: {
      description: {
        story: 'Useful for search fields, numeric steppers, and compact composed controls.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Input placeholder="Search..." />
      <Button aria-label="Add" tone="neutral">
        <PlusIcon weight="bold" />
      </Button>
    </ButtonGroup>
  ),
}

export const MixedTextIcon: Story = {
  name: 'Composition / Mixed Text and Icon',
  parameters: {
    docs: {
      description: {
        story:
          'Button groups can mix text and icon buttons when the actions remain closely related.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button aria-label="Add">
        <PlusIcon weight="bold" />
      </Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  ),
}

export const Small: Story = {
  args: {
    size: 'small',
  },
  name: 'Size / Small',
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  name: 'Size / Medium',
}

export const Large: Story = {
  args: {
    size: 'large',
  },
  name: 'Size / Large',
}

export const IconSmall: Story = {
  args: {
    size: 'small',
  },
  name: 'Size / Icon Small',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
}

export const IconMedium: Story = {
  args: {
    size: 'medium',
  },
  name: 'Size / Icon Medium',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
}

export const IconLarge: Story = {
  args: {
    size: 'large',
  },
  name: 'Size / Icon Large',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
}

export const SizeParity: Story = {
  name: 'Size / Button Parity',
  parameters: {
    docs: {
      description: {
        story:
          'Grouped buttons match standalone button heights, padding, typography, and direct-child SVG sizes at every size and orientation.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-md">
      {SIZES.flatMap((size) =>
        [false, true].map((iconOnly) => (
          <div
            key={`${size}-${iconOnly}`}
            data-testid={`${size}-${iconOnly}`}
            className="flex items-start gap-md"
          >
            <Button size={size} aria-label="Standalone Action">
              <PlusIcon />
              {!iconOnly && 'Action'}
            </Button>
            {(['horizontal', 'vertical'] as const).map((orientation) => (
              <ButtonGroup key={orientation} size={size} orientation={orientation}>
                <Button aria-label={`${orientation} Action`}>
                  <PlusIcon />
                  {!iconOnly && 'Action'}
                </Button>
                <Button aria-label={`${orientation} opposite Action`} data-testid="opposite">
                  <PlusIcon />
                  {iconOnly && 'Action'}
                </Button>
              </ButtonGroup>
            ))}
          </div>
        )),
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const size of SIZES) {
      for (const iconOnly of [false, true]) {
        const row = canvas.getByTestId(`${size}-${iconOnly}`),
          standalone = row.querySelector('button')!,
          reference = getComputedStyle(standalone),
          referenceIcon = getComputedStyle(standalone.querySelector('svg')!)

        for (const grouped of row.querySelectorAll('button:not([data-testid="opposite"])')) {
          if (grouped === standalone) continue
          const actual = getComputedStyle(grouped),
            icon = getComputedStyle(grouped.querySelector('svg')!)

          for (const property of [
            'height',
            'paddingLeft',
            'paddingRight',
            'fontSize',
            'lineHeight',
          ] as const) {
            await expect(actual[property], `${size}: ${property}`).toBe(reference[property])
          }
          await expect(icon.width, `${size}: SVG width`).toBe(referenceIcon.width)
          await expect(icon.height, `${size}: SVG height`).toBe(referenceIcon.height)
          if (iconOnly) {
            await expect(actual.width, `${size}: icon button width`).toBe(reference.width)
          } else {
            await expect(actual.gap, `${size}: gap`).toBe(reference.gap)
          }
        }
      }
    }
  },
}

export const IconExtraSmall: Story = {
  args: {
    size: 'extraSmall',
  },
  name: 'Size / Icon Extra Small',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
}

export const LinkButtons: Story = {
  args: {
    size: 'large',
    tone: 'neutral',
    variant: 'secondary',
  },
  name: 'Composition / Links and Disabled Actions',
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Native action</Button>
      <Button nativeButton={false} render={<a href="#details" />}>
        Details
      </Button>
      <Button
        disabled
        nativeButton={false}
        onClick={disabledActivation}
        render={<a href="#unavailable" />}
      >
        Unavailable link
      </Button>
      <Button disabled onClick={disabledActivation}>
        Unavailable action
      </Button>
    </ButtonGroup>
  ),
  play: async ({ canvas }) => {
    const native = canvas.getByRole('button', { name: 'Native action' }),
      link = canvas.getByRole('button', { name: 'Details' }),
      disabledLink = canvas.getByRole('button', { name: 'Unavailable link' }),
      disabledNative = canvas.getByRole('button', { name: 'Unavailable action' })

    disabledActivation.mockClear()
    await expect(link.tagName).toBe('A')
    for (const control of [native, link]) {
      await expect(control).toHaveAttribute('data-slot', 'button')
      await expect(control).toHaveAttribute('data-size', 'large')
      await expect(control).toHaveClass('bg-neutral-container')
      await expect(getComputedStyle(control).borderRadius).toBe('0px')
    }
    await expect(getComputedStyle(link).height).toBe(getComputedStyle(native).height)
    await expect(getComputedStyle(link).color).toBe(getComputedStyle(native).color)

    for (const control of [disabledLink, disabledNative]) {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      control.dispatchEvent(event)
      if (control === disabledLink) {
        await expect(event.defaultPrevented).toBe(true)
      }
      await expect(disabledActivation).not.toHaveBeenCalled()
      await waitFor(() => {
        expect(getComputedStyle(control).opacity).toBe('0.5')
        expect(getComputedStyle(control).pointerEvents).toBe('none')
      })
    }

    disabledLink.focus()
    await userEvent.keyboard('{Enter} ')
    await expect(disabledActivation).not.toHaveBeenCalled()
    await expect(disabledLink).toHaveAttribute('aria-disabled', 'true')
    await expect(disabledNative).toBeDisabled()
  },
}

export const ChildOverrides: Story = {
  args: {
    size: 'large',
    tone: 'neutral',
    variant: 'secondary',
  },
  name: 'Composition / Child Overrides',
  render: (args) => (
    <div className="flex items-start gap-md">
      <ButtonGroup {...args}>
        <Button>Inherited</Button>
        <Button
          nativeButton={false}
          render={<a href="#custom" />}
          size="small"
          tone="accent"
          variant="ghost"
        >
          Override
        </Button>
      </ButtonGroup>
      <Button size="small" tone="accent" variant="ghost">
        Reference
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    const inherited = canvas.getByRole('button', { name: 'Inherited' }),
      override = canvas.getByRole('button', { name: 'Override' }),
      reference = canvas.getByRole('button', { name: 'Reference' }),
      actual = getComputedStyle(override),
      expected = getComputedStyle(reference),
      initialBackground = actual.backgroundColor

    await expect(inherited).toHaveAttribute('data-size', 'large')
    await expect(override).toHaveAttribute('data-size', 'small')
    for (const property of ['height', 'fontSize', 'color', 'backgroundColor'] as const) {
      await expect(actual[property], property).toBe(expected[property])
    }
    await browserUserEvent.hover(override)
    await waitFor(() => {
      expect(getComputedStyle(override).backgroundColor).not.toBe(initialBackground)
    })
  },
}

export const ExtraSmall: Story = {
  args: {
    size: 'extraSmall',
  },
  name: 'Size / Extra Small',
}

export const SegmentedControl: Story = {
  name: 'Composition / Segmented Control',
  parameters: {
    docs: {
      description: {
        story: 'A common usage pattern for mutually exclusive view or mode controls.',
      },
    },
  },
  render: () => (
    <ButtonGroup tone="neutral" variant="soft">
      <Button>Overview</Button>
      <Button>Details</Button>
      <Button>History</Button>
    </ButtonGroup>
  ),
}
