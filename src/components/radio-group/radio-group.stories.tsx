import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './index'

const OPTIONS = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
] as const

export default {
  argTypes: {
    defaultValue: {
      control: { type: 'select' },
      description: 'Initial selected value when the component is uncontrolled.',
      options: OPTIONS.map((option) => option.value),
      table: {
        defaultValue: { summary: 'option1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio options in the group.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Shared field name used for form submission.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the group as required in form contexts.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    defaultValue: 'option1',
    disabled: false,
    required: false,
  },
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The Radio Group component lets users choose one value from a list of options. Use `RadioGroup` as the state container and compose each option with `Radio`. This pattern works well for forms, filters, and settings where exactly one choice is required. Radio items support visual variants (`elevated` and `inSurface`) for different surface contexts.',
      },
      subtitle: 'A single-select option set composed from Radio items.',
    },
  },
  render: (args) => (
    <RadioGroup {...args}>
      {OPTIONS.map((option) => (
        <RadioGroup.Radio key={option.value} value={option.value}>
          {option.label}
        </RadioGroup.Radio>
      ))}
    </RadioGroup>
  ),
  subcomponents: { Radio: RadioGroup.Radio },
  title: 'Components/Radio Group',
} satisfies Meta<typeof RadioGroup>

type Story = StoryObj<typeof RadioGroup>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use controls to test default selection and group-level form behavior.',
      },
    },
  },
}

export const Default: Story = {
  name: 'State / Default',
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  name: 'State / Disabled',
}

export const Required: Story = {
  args: {
    name: 'shippingSpeed',
    required: true,
  },
  name: 'State / Required',
}

export const ElevatedVariant: Story = {
  name: 'Variant / Elevated',
  parameters: {
    docs: {
      description: {
        story: 'Default elevated style intended for standard neutral surfaces.',
      },
    },
  },
  render: (args) => (
    <RadioGroup {...args}>
      {OPTIONS.map((option) => (
        <RadioGroup.Radio key={option.value} value={option.value} variant="elevated">
          {option.label}
        </RadioGroup.Radio>
      ))}
    </RadioGroup>
  ),
}

export const InSurfaceVariant: Story = {
  name: 'Variant / In Surface',
  parameters: {
    docs: {
      description: {
        story: 'In-surface style better blends with already elevated containers and cards.',
      },
    },
  },
  render: (args) => (
    <div className="rounded-xl bg-surface p-sm">
      <RadioGroup {...args}>
        {OPTIONS.map((option) => (
          <RadioGroup.Radio key={option.value} value={option.value} variant="inSurface">
            {option.label}
          </RadioGroup.Radio>
        ))}
      </RadioGroup>
    </div>
  ),
}

export const PaymentMethodExample: Story = {
  args: {
    defaultValue: 'card',
  },
  name: 'Composition / Payment Method',
  parameters: {
    docs: {
      description: {
        story: 'A realistic form example for selecting a single checkout payment method.',
      },
    },
  },
  render: (args) => (
    <RadioGroup {...args} className="w-full max-w-sm">
      <RadioGroup.Radio value="card">Credit Card</RadioGroup.Radio>
      <RadioGroup.Radio value="bank">Bank Transfer</RadioGroup.Radio>
      <RadioGroup.Radio value="wallet">Digital Wallet</RadioGroup.Radio>
    </RadioGroup>
  ),
}
