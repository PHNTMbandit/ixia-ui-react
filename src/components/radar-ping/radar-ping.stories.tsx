import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { RadarPing } from './radar-ping'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  SIZES = ['small', 'medium', 'large'] as const

export default {
  argTypes: {
    children: {
      control: 'text',
      description: 'Optional count or label rendered inside the dot (e.g. notification count).',
    },
    hidePing: {
      control: 'boolean',
      description: 'Suppresses the pulsing animation, showing only the static dot.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Controls the badge dot, text size, and offset from its anchor element.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    tone: {
      control: { type: 'select' },
      description: 'Semantic color applied to the dot and its pulsing animation.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
  },
  args: {
    hidePing: false,
    size: 'medium',
    tone: 'brand',
  },
  component: RadarPing,
  parameters: {
    docs: {
      description: {
        component:
          'The RadarPing renders an absolutely-positioned pulsing dot anchored to the top-right corner of its relative container. It is well-suited for notification badges, unread indicators, and live-status signals. Use `tone` to communicate semantic intent, `size` to align with the parent element, `hidePing` to suppress the animation, and `children` to display a numeric count inside the dot.',
      },
      subtitle: 'An animated dot badge for drawing attention to notifications and new content.',
    },
  },
  render: (args) => (
    <div className="relative inline-flex">
      <Button tone="neutral" variant="elevated">
        Notifications
      </Button>
      <RadarPing {...args} />
    </div>
  ),
  title: 'Components/Radar Ping',
} satisfies Meta<typeof RadarPing>

type Story = StoryObj<typeof RadarPing>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for tone, size, hidePing, and optional count label.',
      },
    },
  },
}

export const Brand: Story = {
  args: { tone: 'brand' },
  name: 'Tone / Brand',
}

export const Accent: Story = {
  args: { tone: 'accent' },
  name: 'Tone / Accent',
}

export const Neutral: Story = {
  args: { tone: 'neutral' },
  name: 'Tone / Neutral',
}

// Biome-ignore lint/suspicious/noShadowRestrictedNames: story name
export const Error: Story = {
  args: { tone: 'error' },
  name: 'Tone / Error',
}

export const Info: Story = {
  args: { tone: 'info' },
  name: 'Tone / Info',
}

export const Success: Story = {
  args: { tone: 'success' },
  name: 'Tone / Success',
}

export const Warning: Story = {
  args: { tone: 'warning' },
  name: 'Tone / Warning',
}

export const AllTones: Story = {
  name: 'Composition / All Tones',
  parameters: {
    docs: {
      description: {
        story: 'All semantic tones shown together for quick visual comparison.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-lg">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-col items-center gap-xs">
          <div className="relative inline-flex">
            <Button size="small" tone="neutral" variant="elevated">
              Activity
            </Button>
            <RadarPing tone={tone} />
          </div>
          <span className="style-text-default--1 text-on-surface-variant capitalize">{tone}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'Composition / All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All sizes side-by-side with matching button scale for alignment reference.',
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-lg">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-xs">
          <div className="relative inline-flex">
            <Button size={size} tone="neutral" variant="elevated">
              Updates
            </Button>
            <RadarPing size={size} tone="brand" />
          </div>
          <span className="style-text-default--1 text-on-surface-variant capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const WithCount: Story = {
  name: 'Composition / With Count',
  parameters: {
    docs: {
      description: {
        story: 'Numeric count inside the dot, shown across all sizes for layout reference.',
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-lg">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-xs">
          <div className="relative inline-flex">
            <Button size={size} tone="neutral" variant="elevated">
              Notifications
            </Button>
            <RadarPing size={size} tone="error">
              {size === 'small' ? '5' : size === 'medium' ? '12' : '99'}
            </RadarPing>
          </div>
          <span className="style-text-default--1 text-on-surface-variant capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const StaticDot: Story = {
  args: {
    hidePing: true,
  },
  name: 'State / Static Dot',
  parameters: {
    docs: {
      description: {
        story: 'Set `hidePing` to suppress the animation for low-priority or read states.',
      },
    },
  },
}
