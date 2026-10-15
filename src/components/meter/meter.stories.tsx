import { SpinnerGapIcon, XIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Meter } from './index'

const ORIENTATIONS = ['vertical', 'horizontal'] as const,
  SIZES = ['small', 'medium', 'large'] as const,
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const

export default {
  argTypes: {
    max: {
      control: { type: 'number' },
      description: 'Upper bound used when calculating value percentage.',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Lower bound used when calculating value percentage.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    orientation: {
      control: { type: 'select' },
      description: 'Layout direction of meter content and track.',
      options: ORIENTATIONS,
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Visual thickness of the meter track.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    tone: {
      control: { type: 'select' },
      description: 'Semantic color of the meter indicator.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    value: {
      control: { max: 100, min: 0, step: 1, type: 'number' },
      description: 'Current progress value displayed by the meter.',
      table: {
        defaultValue: { summary: '25' },
      },
    },
  },
  args: {
    max: 100,
    min: 0,
    orientation: 'vertical',
    size: 'medium',
    tone: 'brand',
    value: 25,
  },
  component: Meter,
  parameters: {
    docs: {
      description: {
        component:
          'The Meter component visualizes bounded values such as upload progress, quota usage, battery levels, and background task completion. It supports vertical and horizontal layouts, three track sizes (`small`, `medium`, `large`), and semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`). Compose it with `MeterHeader`, `MeterLabel`, and `MeterValue` to build informative status UIs.',
      },
      subtitle: 'A flexible progress indicator for completion, capacity, and health-style values.',
    },
  },
  render: (args) => (
    <Meter className="w-[500px]" {...args}>
      <Meter.Header>
        <Meter.Label>Progress</Meter.Label>
      </Meter.Header>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      <Meter.Footer>
        <Meter.Subtitle>Uploading file...</Meter.Subtitle>
        <Meter.Value />
      </Meter.Footer>
    </Meter>
  ),
  subcomponents: {
    MeterFooter: Meter.Footer,
    MeterHeader: Meter.Header,
    MeterIndicator: Meter.Indicator,
    MeterLabel: Meter.Label,
    MeterSubtitle: Meter.Subtitle,
    MeterTrack: Meter.Track,
    MeterValue: Meter.Value,
  },
  title: 'Components/Meter',
} satisfies Meta<typeof Meter>

type Story = StoryObj<typeof Meter>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for exploring value, direction, size, and tone combinations.',
      },
    },
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  name: 'Orientation / Vertical',
  parameters: {
    docs: {
      description: {
        story: 'Default vertical composition with title, value, and full-width track.',
      },
    },
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  name: 'Orientation / Horizontal',
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal layout optimized for compact toolbars, inline task rows, and list items.',
      },
    },
  },
  render: (args) => (
    <div className="flex w-[500px] items-center gap-xs">
      <Meter className="flex-1" {...args}>
        <Meter.Label>
          Progress
          <SpinnerGapIcon className="animate-spin" />
        </Meter.Label>
        <Meter.Subtitle>Uploading file...</Meter.Subtitle>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
        <Meter.Value />
      </Meter>
      <Button aria-label="Cancel upload" size={'iconSmall'} tone="error" variant="ghost">
        <XIcon weight="bold" />
      </Button>
    </div>
  ),
}

export const Downloading: Story = {
  name: 'Composition / Downloading',
  parameters: {
    docs: {
      description: {
        story: 'Practical asynchronous workflow with progress, status label, and cancel action.',
      },
    },
  },
  render: (args) => (
    <div className="flex w-[500px] flex-col gap-xs">
      <Meter {...args}>
        <Meter.Header>
          <Meter.Label>
            <SpinnerGapIcon className="animate-spin" />
            Downloading File...
          </Meter.Label>
        </Meter.Header>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
        <Meter.Footer>
          <Meter.Subtitle>Estimated time remaining: 2 minutes</Meter.Subtitle>
          <Meter.Value />
        </Meter.Footer>
      </Meter>
      <Button tone="error" className={'w-full'} size={'small'}>
        <XIcon weight="bold" /> Cancel
      </Button>
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'Composition / All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Comparison view of all track sizes for choosing visual weight by context.',
      },
    },
  },
  render: () => (
    <div className="flex w-[500px] flex-col gap-md">
      {SIZES.map((size) => (
        <Meter key={size} orientation="vertical" size={size} tone="brand" value={56}>
          <Meter.Header>
            <Meter.Label className="capitalize">{size}</Meter.Label>
          </Meter.Header>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
          <Meter.Footer>
            <Meter.Value />
          </Meter.Footer>
        </Meter>
      ))}
    </div>
  ),
}

export const AllTones: Story = {
  name: 'Composition / All Tones',
  parameters: {
    docs: {
      description: {
        story: 'Reference set showing each semantic tone for status-driven progress UI.',
      },
    },
  },
  render: () => (
    <div className="flex w-[500px] flex-col gap-sm">
      {TONES.map((tone) => (
        <Meter key={tone} orientation="vertical" size="medium" tone={tone} value={62}>
          <Meter.Header>
            <Meter.Label className="capitalize">{tone}</Meter.Label>
          </Meter.Header>
          <Meter.Track>
            <Meter.Indicator />
          </Meter.Track>
          <Meter.Footer>
            <Meter.Subtitle>Status: {tone}</Meter.Subtitle>
            <Meter.Value />
          </Meter.Footer>
        </Meter>
      ))}
    </div>
  ),
}
