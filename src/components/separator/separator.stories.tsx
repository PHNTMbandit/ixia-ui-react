import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'

const ORIENTATIONS = ['horizontal', 'vertical'] as const,
  STYLES = ['rounded', 'square'] as const,
  VARIANTS = ['default', 'strong'] as const,
  WEIGHTS = ['thinnest', 'thin', 'medium', 'thick'] as const,
  PreviewFrame = ({
    orientation,
    children,
  }: {
    orientation?: (typeof ORIENTATIONS)[number]
    children: React.ReactNode
  }) => (
    <div
      className="flex items-center justify-center"
      style={{
        height: orientation === 'vertical' ? '250px' : 'auto',
        width: orientation === 'vertical' ? 'auto' : '500px',
      }}
    >
      {children}
    </div>
  )

export default {
  argTypes: {
    orientation: {
      control: { type: 'select' },
      description: 'Direction of the dividing line.',
      options: ORIENTATIONS,
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    style: {
      control: { type: 'select' },
      description: 'Corner treatment of the separator line.',
      options: STYLES,
      table: {
        defaultValue: { summary: 'rounded' },
      },
    },
    variant: {
      control: { type: 'select' },
      description: 'Visual emphasis token for separator color.',
      options: VARIANTS,
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    weight: {
      control: { type: 'select' },
      description: 'Thickness of the separator line.',
      options: WEIGHTS,
      table: {
        defaultValue: { summary: 'thinnest' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    style: 'rounded',
    variant: 'default',
    weight: 'thinnest',
  },
  component: Separator,
  parameters: {
    docs: {
      description: {
        component:
          'Separator visually partitions related content while preserving layout rhythm. It supports horizontal and vertical orientation, multiple thickness weights, and style/variant options for subtle or stronger emphasis. Common use cases include menus, sidebars, toolbars, and card sections.',
      },
      subtitle: 'A flexible divider line for separating content, sections, and surfaces.',
    },
  },
  render: (args) => (
    <PreviewFrame orientation={args.orientation}>
      <Separator {...args} />
    </PreviewFrame>
  ),
  title: 'Components/Separator',
} satisfies Meta<typeof Separator>

type Story = StoryObj<typeof Separator>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use controls to experiment with orientation, weight, style, and variant.',
      },
    },
  },
}

export const Default: Story = {
  name: 'Variant / Default',
}

export const Strong: Story = {
  args: {
    variant: 'strong',
  },
  name: 'Variant / Strong',
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
}

export const Thinnest: Story = {
  args: {
    weight: 'thinnest',
  },
  name: 'Weight / Thinnest',
}

export const Thin: Story = {
  args: {
    weight: 'thin',
  },
  name: 'Weight / Thin',
}

export const Medium: Story = {
  args: {
    weight: 'medium',
  },
  name: 'Weight / Medium',
}

export const Thick: Story = {
  args: {
    weight: 'thick',
  },
  name: 'Weight / Thick',
}

export const BetweenContent: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    weight: 'thin',
  },
  name: 'Composition / Between Content',
  parameters: {
    docs: {
      description: {
        story: 'Typical section divider use in cards, forms, and settings pages.',
      },
    },
  },
  render: (args) => (
    <div className="w-[500px] space-y-sm rounded-xl bg-surface p-md">
      <div>
        <p className="style-text-strong--1 text-on-surface">Profile Settings</p>
        <p className="style-text-default--1 text-on-surface-variant">Manage account preferences.</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="style-text-strong--1 text-on-surface">Notifications</p>
        <p className="style-text-default--1 text-on-surface-variant">
          Control alert channels and frequency.
        </p>
      </div>
    </div>
  ),
}

export const VerticalMenuDivider: Story = {
  args: {
    orientation: 'vertical',
    style: 'square',
    variant: 'strong',
    weight: 'thin',
  },
  name: 'Composition / Vertical Menu Divider',
  parameters: {
    docs: {
      description: {
        story: 'Vertical separators are useful for compact horizontal nav and toolbar grouping.',
      },
    },
  },
  render: (args) => (
    <div className="flex h-[64px] items-center rounded-xl bg-surface p-sm">
      <button className="px-sm style-text-default--1 text-on-surface">Overview</button>
      <Separator {...args} />
      <button className="px-sm style-text-default--1 text-on-surface">Usage</button>
      <Separator {...args} />
      <button className="px-sm style-text-default--1 text-on-surface">Billing</button>
    </div>
  ),
}

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    style: 'rounded',
    variant: 'default',
    weight: 'thin',
  },
  name: 'Composition / With Label',
  parameters: {
    docs: {
      description: {
        story:
          'Separators can also include centered labels for additional context within sections.',
      },
    },
  },
  render: (args) => (
    <div className="w-[500px] space-y-sm bg-surface p-md">
      <Separator {...args} weight={'thinnest'} labelClassName="bg-surface">
        Section Label
      </Separator>
      <Separator {...args} labelClassName="bg-surface">
        Section Label
      </Separator>
      <Separator {...args} weight={'medium'} labelClassName="bg-surface">
        Section Label
      </Separator>
      <Separator {...args} weight={'thick'} labelClassName="bg-surface">
        Section Label
      </Separator>
    </div>
  ),
}
