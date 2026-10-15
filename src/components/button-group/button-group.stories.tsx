import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import { Input } from '../input/index'
import { ButtonGroup } from './button-group'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  VARIANTS = ['fill', 'outline', 'ghost', 'soft', 'elevated'] as const,
  SIZES = [
    'large',
    'iconLarge',
    'medium',
    'iconMedium',
    'small',
    'iconSmall',
    'extraSmall',
    'iconExtraSmall',
  ] as const

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
      description: 'Controls child button height, padding, and icon sizing.',
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
          'The Button Group component combines related buttons into one cohesive unit. It supports multiple variants, tones, sizes, and orientations to fit different interaction patterns such as segmented controls, toolbars, and compact action groups.',
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
    size: 'iconSmall',
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
    size: 'iconMedium',
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
    size: 'iconLarge',
  },
  name: 'Size / Icon Large',
  render: (args) => (
    <ButtonGroup {...args}>
      <TwoIconButtons />
    </ButtonGroup>
  ),
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
