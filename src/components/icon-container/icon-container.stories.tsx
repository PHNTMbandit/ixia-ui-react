import {
  CheckCircleIcon,
  GearIcon,
  InfoIcon,
  ShieldCheckIcon,
  SparkleIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { IconContainer } from './icon-container'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  SIZES = ['small', 'medium', 'large'] as const,
  SHAPES = ['rounded', 'square'] as const,
  TONE_ICONS = {
    accent: SparkleIcon,
    brand: ShieldCheckIcon,
    error: XCircleIcon,
    info: InfoIcon,
    neutral: GearIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
  },
  STATUS_EXAMPLES = [
    {
      description: 'Your account is protected with two-step verification.',
      title: 'Account protected',
      tone: 'brand',
    },
    {
      description: 'Explore the latest additions to your workspace.',
      title: 'Something new',
      tone: 'accent',
    },
    {
      description: 'Manage the preferences for your workspace.',
      title: 'Workspace settings',
      tone: 'neutral',
    },
    {
      description: 'Check your connection and try again.',
      title: 'Upload failed',
      tone: 'error',
    },
    {
      description: 'Changes can take a few minutes to appear.',
      title: 'Good to know',
      tone: 'info',
    },
    {
      description: 'Your latest changes are ready to use.',
      title: 'Changes saved',
      tone: 'success',
    },
    {
      description: 'Save your work before leaving this page.',
      title: 'Unsaved changes',
      tone: 'warning',
    },
  ] as const

export default {
  title: 'Components/Icon Container',
  component: IconContainer,
  args: {
    shape: 'rounded',
    size: 'medium',
    tone: 'brand',
  },
  argTypes: {
    children: {
      control: false,
      description:
        'An icon rendered as a direct child. Direct SVG children inherit the tone and receive the matching icon size.',
    },
    tone: {
      control: 'select',
      description: 'Semantic background and foreground color pair.',
      options: TONES,
      table: { defaultValue: { summary: 'brand' } },
    },
    shape: {
      control: 'select',
      description: 'Circular (rounded) or sharp-cornered (square) background.',
      options: SHAPES,
      table: { defaultValue: { summary: 'rounded' } },
    },
    size: {
      control: 'select',
      description: 'Scales both the background and its direct SVG child using spacing tokens.',
      options: SIZES,
      table: { defaultValue: { summary: 'medium' } },
    },
  },
  parameters: {
    docs: {
      subtitle: 'A toned background for status, feature, and supporting icons.',
      description: {
        component: [
          'IconContainer pairs an icon with a semantic background and foreground tone. Use it beside alert text, in empty states, or at the start of a feature card. It is a non-interactive div, not an icon button or a full alert.',
          '',
          'Pass the icon as a direct child so the size styles reach its SVG. Sizes use the same outer spacing tokens as Avatar: small uses xl, medium uses 2xl, and large uses 3xl. Their icons use lg, xl, and 2xl respectively.',
          '',
          'When adjacent text already explains the icon, mark the container aria-hidden. For a standalone meaningful icon, give the container role="img" and an aria-label, and hide the SVG itself. Do not rely on color alone to communicate status.',
          '',
          '```tsx',
          '<IconContainer tone="success" size="medium" aria-hidden="true">',
          '  <CheckCircleIcon weight="bold" />',
          '</IconContainer>',
          '```',
        ].join('\n'),
      },
    },
  },
  render: (args) => (
    <IconContainer {...args} role="img" aria-label="Account protected">
      <ShieldCheckIcon aria-hidden="true" weight="bold" />
    </IconContainer>
  ),
} satisfies Meta<typeof IconContainer>

type Story = StoryObj<typeof IconContainer>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the controls to explore the tone, shape, and size with an account-security icon.',
      },
    },
  },
}

export const AllTones: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All seven tones with distinct, meaningful icons. Brand uses a shield, accent a sparkle, neutral a gear, error a cross, info an information symbol, success a check, and warning a triangle.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap items-start gap-md">
      {TONES.map((tone) => {
        const Icon = TONE_ICONS[tone]

        return (
          <div className="flex flex-col items-center gap-xs" key={tone}>
            <IconContainer {...args} tone={tone} aria-hidden="true">
              <Icon weight="bold" />
            </IconContainer>
            <span className="style-text-default--1 capitalize">{tone}</span>
          </div>
        )
      })}
    </div>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Small for compact rows, medium for alerts and supporting content, and large for prominent empty states or feature callouts. Both the container and the SVG scale together.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-md">
      {SIZES.map((size) => (
        <div className="flex flex-col items-center gap-xs" key={size} data-testid={`size-${size}`}>
          <IconContainer {...args} size={size} aria-hidden="true">
            <InfoIcon weight="bold" />
          </IconContainer>
          <span className="style-text-default--1 capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    let previousContainerSize = 0,
      previousIconSize = 0

    for (const size of SIZES) {
      const example = canvas.getByTestId(`size-${size}`),
        icon = example.querySelector('svg')!,
        container = icon.parentElement!,
        containerSize = container.getBoundingClientRect(),
        iconSize = icon.getBoundingClientRect()

      await expect(containerSize.width).toBeGreaterThan(previousContainerSize)
      await expect(containerSize.height).toBeCloseTo(containerSize.width, 1)
      await expect(iconSize.width).toBeGreaterThan(previousIconSize)
      await expect(iconSize.width).toBeLessThan(containerSize.width)
      previousContainerSize = containerSize.width
      previousIconSize = iconSize.width
    }
  },
}

export const Shapes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Rounded produces a circle; square keeps sharp corners. The shape does not change the container or icon dimensions.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-md">
      {SHAPES.map((shape) => (
        <div className="flex flex-col items-center gap-xs" key={shape}>
          <IconContainer {...args} shape={shape} aria-hidden="true">
            <GearIcon weight="bold" />
          </IconContainer>
          <span className="style-text-default--1 capitalize">{shape}</span>
        </div>
      ))}
    </div>
  ),
}

export const StatusMessages: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pair decorative icons with visible headings and descriptions. The text and symbol communicate status without depending on color. These are static callouts, not live announcements; add appropriate alert or status semantics at the message level when needed.',
      },
    },
  },
  render: (args) => (
    <div className="flex max-w-[36rem] flex-col gap-md">
      {STATUS_EXAMPLES.map(({ description, title, tone }) => {
        const Icon = TONE_ICONS[tone]

        return (
          <div className="flex items-start gap-sm" key={tone}>
            <IconContainer {...args} tone={tone} aria-hidden="true">
              <Icon weight="bold" />
            </IconContainer>
            <div className="flex min-w-0 flex-col gap-3xs">
              <h3 className="style-text-strong-0">{title}</h3>
              <p className="style-text-default--1 text-on-surface-variant">{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  ),
}

export const StandaloneIcon: Story = {
  args: { tone: 'success' },
  parameters: {
    docs: {
      description: {
        story:
          'Without adjacent text, expose one accessible image with a meaningful label on the container. Hide the inner SVG to avoid announcing it twice.',
      },
    },
  },
  render: (args) => (
    <IconContainer {...args} role="img" aria-label="Changes saved">
      <CheckCircleIcon aria-hidden="true" weight="bold" />
    </IconContainer>
  ),
  play: async ({ canvasElement }) => {
    const images = within(canvasElement).getAllByRole('img')

    await expect(images).toHaveLength(1)
    await expect(images[0]).toHaveAccessibleName('Changes saved')
  },
}
