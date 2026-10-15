import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextArea } from './text-area'

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables editing and interactions.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    maxLength: {
      control: { max: 1000, min: 1, step: 1, type: 'number' },
      description: 'Maximum characters allowed. Shows character counter when set.',
      table: {
        type: { summary: 'number' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty.',
      table: {
        type: { summary: 'string' },
      },
    },
    rows: {
      control: { max: 12, min: 2, step: 1, type: 'number' },
      description: 'Visible number of text rows.',
      table: {
        type: { summary: 'number' },
      },
    },
    variant: {
      control: { type: 'inline-radio' },
      description: 'Visual style for the textarea container.',
      options: ['primary', 'secondary'],
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary' },
      },
    },
  },
  args: {
    cols: 50,
    maxLength: 120,
    placeholder: 'Enter your text here...',
    rows: 4,
    variant: 'primary',
  },
  component: TextArea,
  parameters: {
    description: {
      component:
        'The TextArea component provides a multi-line input field that allows users to enter and edit larger amounts of text. It supports visual variants, max length feedback, and disabled states for form workflows.',
    },
    subtitle: 'A multi-line text input field for user input.',
  },
  title: 'Components/Text Area',
} satisfies Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[500px]">
      <TextArea {...args} />
    </div>
  ),
}

export const StatePrimary: Story = {
  args: {
    maxLength: 120,
    placeholder: 'Write a short note...',
    variant: 'primary',
  },
}

export const StateSecondary: Story = {
  args: {
    maxLength: 180,
    placeholder: 'Describe your request...',
    variant: 'secondary',
  },
}

export const BehaviorDisabled: Story = {
  args: {
    disabled: true,
    maxLength: 120,
    placeholder: 'This field is disabled',
  },
}

export const BehaviorNoCounter: Story = {
  args: {
    maxLength: undefined,
    placeholder: 'No character counter because maxLength is not set',
  },
}

export const CompositionFeedbackForm: Story = {
  render: () => (
    <div className="w-[500px] space-y-md rounded-lg bg-surface p-md shadow-2xs">
      <header className="space-y-xs">
        <h3 className="style-text-strong-1">Product Feedback</h3>
        <p className="style-text-prose--1 text-on-surface-variant">
          Tell us what worked well and what we can improve.
        </p>
      </header>
      <TextArea
        variant="secondary"
        placeholder="Share your experience..."
        maxLength={250}
        rows={6}
      />
    </div>
  ),
}
