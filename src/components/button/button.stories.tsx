import { ArrowRightIcon, DownloadSimpleIcon, PlusIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './button'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  VARIANTS = ['fill', 'outline', 'ghost', 'soft', 'elevated', 'link'] as const,
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
type Variant = (typeof VARIANTS)[number]
type Size = (typeof SIZES)[number]

const TONE_LABELS: Record<Tone, string> = {
    accent: 'Explore feature',
    brand: 'Create project',
    error: 'Delete item',
    info: 'Learn more',
    neutral: 'View details',
    success: 'Save changes',
    warning: 'Review action',
  },
  TONE_DESCRIPTIONS: Record<Tone, string> = {
    accent: 'Secondary highlighted action for promoted or supporting workflows.',
    brand: 'Primary brand action used for the most important action on the page.',
    error: 'Destructive action such as delete, remove, or revoke.',
    info: 'Informational action leading to more context or guidance.',
    neutral: 'General-purpose action with lower semantic weight.',
    success: 'Positive completion action such as save, confirm, or apply.',
    warning: 'High-attention action where the user should pause before proceeding.',
  },
  ButtonPreview = ({
    tone = 'brand',
    variant = 'fill',
    size = 'medium',
  }: {
    tone?: Tone
    variant?: Variant
    size?: Size
  }) => {
    const iconOnly = size.startsWith('icon')

    return (
      <Button
        aria-label={iconOnly ? TONE_LABELS[tone] : undefined}
        size={size}
        tone={tone}
        variant={variant}
      >
        <PlusIcon weight="bold" />
        {iconOnly ? null : TONE_LABELS[tone]}
      </Button>
    )
  },
  VariantShowcase = ({ variant = 'fill' }: { variant?: Variant }) => (
    <div className="flex flex-wrap gap-sm">
      {TONES.map((tone) => (
        <ButtonPreview key={tone} tone={tone} variant={variant} />
      ))}
    </div>
  ),
  TextSizesPreview = () => (
    <div className="flex flex-wrap items-center gap-sm">
      <ButtonPreview size="large" />
      <ButtonPreview size="medium" />
      <ButtonPreview size="small" />
      <ButtonPreview size="extraSmall" />
    </div>
  ),
  IconSizesPreview = () => (
    <div className="flex flex-wrap items-center gap-sm">
      <ButtonPreview size="iconLarge" />
      <ButtonPreview size="iconMedium" />
      <ButtonPreview size="iconSmall" />
      <ButtonPreview size="iconExtraSmall" />
    </div>
  )

export default {
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label. Ignored for icon-only sizes in the default preview.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and applies disabled styling.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'radio',
      description: 'Controls the button height, padding, and icon size.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    tone: {
      control: 'select',
      description: 'Applies the semantic color tone for the action.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    variant: {
      control: 'radio',
      description: 'Controls the visual treatment of the button.',
      options: VARIANTS,
      table: {
        defaultValue: { summary: 'fill' },
      },
    },
  },
  args: {
    children: 'Create project',
    disabled: false,
    size: 'medium',
    tone: 'brand',
    variant: 'fill',
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The Button component is the primary action trigger across the interface. It supports six visual variants (`fill`, `outline`, `ghost`, `soft`, `elevated`, `link`), seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`), and paired text or icon-only sizes for a broad range of use cases.',
      },
      subtitle: 'Displays a button or a component that looks like a button.',
    },
  },
  render: (args) => (
    <Button {...args}>
      <PlusIcon weight="bold" />
      {args.children}
    </Button>
  ),
  title: 'Components/Button',
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to explore tone, variant, size, and disabled combinations.',
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

// Biome-ignore lint/suspicious/noShadowRestrictedNames: This is a story name
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

export const Fill: Story = {
  args: {
    variant: 'fill',
  },
  name: 'Variant / Fill',
  parameters: {
    docs: {
      description: {
        story: 'Default high-emphasis button for primary calls to action.',
      },
    },
  },
  render: () => <VariantShowcase variant="fill" />,
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  name: 'Variant / Outline',
  parameters: {
    docs: {
      description: {
        story: 'Bordered button for secondary actions that still need strong affordance.',
      },
    },
  },
  render: () => <VariantShowcase variant="outline" />,
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  name: 'Variant / Ghost',
  parameters: {
    docs: {
      description: {
        story: 'Low-emphasis action for toolbars, inline actions, and dense surfaces.',
      },
    },
  },
  render: () => <VariantShowcase variant="ghost" />,
}

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
  name: 'Variant / Soft',
  parameters: {
    docs: {
      description: {
        story:
          'Container-style button with softer contrast than fill and more presence than ghost.',
      },
    },
  },
  render: () => <VariantShowcase variant="soft" />,
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  name: 'Variant / Elevated',
  parameters: {
    docs: {
      description: {
        story: 'Surface-raised button for floating actions or layered interfaces.',
      },
    },
  },
  render: () => <VariantShowcase variant="elevated" />,
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
  name: 'Variant / Link',
  parameters: {
    docs: {
      description: {
        story: 'Text-style button for inline actions, links, and navigation.',
      },
    },
  },
  render: () => <VariantShowcase variant="link" />,
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
    <Button {...args} aria-label="Add item">
      <PlusIcon weight="bold" />
    </Button>
  ),
}

export const IconMedium: Story = {
  args: {
    size: 'iconMedium',
  },
  name: 'Size / Icon Medium',
  render: (args) => (
    <Button {...args} aria-label="Add item">
      <PlusIcon weight="bold" />
    </Button>
  ),
}

export const IconLarge: Story = {
  args: {
    size: 'iconLarge',
  },
  name: 'Size / Icon Large',
  render: (args) => (
    <Button {...args} aria-label="Add item">
      <PlusIcon weight="bold" />
    </Button>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    tone: 'neutral',
    variant: 'outline',
  },
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons preserve layout while clearly communicating unavailable actions.',
      },
    },
  },
}

export const TextSizes: Story = {
  name: 'Composition / Text Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Text button sizes shown together to compare spacing and hierarchy.',
      },
    },
  },
  render: () => <TextSizesPreview />,
}

export const IconSizes: Story = {
  name: 'Composition / Icon Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Icon-only sizes for compact toolbars, utility actions, and icon grids.',
      },
    },
  },
  render: () => <IconSizesPreview />,
}

export const ActionRow: Story = {
  name: 'Composition / Action Row',
  parameters: {
    docs: {
      description: {
        story: 'A typical set of related actions using different emphasis levels in one row.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-sm">
      <Button tone="brand" variant="fill">
        <PlusIcon weight="bold" />
        New project
      </Button>
      <Button tone="neutral" variant="outline">
        <DownloadSimpleIcon weight="bold" />
        Export
      </Button>
      <Button tone="neutral" variant="ghost">
        Learn more
        <ArrowRightIcon weight="bold" />
      </Button>
    </div>
  ),
}
