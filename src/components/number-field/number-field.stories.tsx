import type { Meta, StoryObj } from '@storybook/react-vite'

import { NumberField } from './index'

const SIZES = ['small', 'medium', 'large'] as const

export default {
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      description:
        'Manual invalid override. The field also auto-invalidates when value is out of min/max bounds.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    defaultValue: {
      control: { type: 'number' },
      description: 'Initial value used for uncontrolled usage.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables manual input, scrubbing, and stepper controls.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'Optional label displayed in the scrub area above the input group.',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed numeric value.',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed numeric value.',
    },
    size: {
      control: { type: 'select' },
      description: 'Controls the input and stepper height scale.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Step size applied when pressing increment/decrement controls.',
    },
  },
  args: {
    'aria-invalid': false,
    defaultValue: 50,
    disabled: false,
    size: 'medium',
  },
  component: NumberField,
  parameters: {
    docs: {
      description: {
        component:
          'The Number Field component supports typed input, increment/decrement controls, and scrub-area dragging for fast numeric adjustments. Use `min`, `max`, and `step` to constrain value behavior and `format` for localized display (such as currency). The field automatically enters an invalid visual state when the current value is below `min` or above `max`, with optional manual override via `aria-invalid`.',
      },
      subtitle: 'A numeric input with stepper buttons, keyboard support, and drag scrubbing.',
    },
  },
  render: (args) => <NumberField {...args} id="number-field" className={'w-[200px]'} />,
  title: 'Components/Number Field',
} satisfies Meta<typeof NumberField>

type Story = StoryObj<typeof NumberField>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for testing min/max/step, size, disabled, and invalid states.',
      },
    },
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  name: 'State / Primary',
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  name: 'State / Secondary',
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  name: 'State / Ghost',
}

export const WithLabel: Story = {
  args: {
    defaultValue: 10,
    label: 'Quantity',
  },
  name: 'State / With Label',
}

export const Disabled: Story = {
  args: {
    defaultValue: 10,
    disabled: true,
    label: 'Quantity',
  },
  name: 'State / Disabled',
}

export const Sizes: Story = {
  args: {
    defaultValue: 50,
  },
  name: 'Appearance / Sizes',
  render: (args) => (
    <div className="flex flex-col items-start gap-md">
      <NumberField {...args} size="small" id="number-field-small" className={'w-[300px]'} />
      <NumberField {...args} size="medium" id="number-field-medium" className={'w-[300px]'} />
      <NumberField {...args} size="large" id="number-field-large" className={'w-[300px]'} />
    </div>
  ),
}

export const WithMinMax: Story = {
  args: {
    defaultValue: 5,
    label: 'Quantity',
    max: 10,
    min: 0,
  },
  name: 'Behavior / Min and Max',
}

export const WithStep: Story = {
  args: {
    defaultValue: 0,
    label: 'Quantity',
    step: 5,
  },
  name: 'Behavior / Step',
}

export const WithFormatting: Story = {
  args: {
    defaultValue: 1000,
    format: { currency: 'USD', style: 'currency' },
    label: 'Price',
    step: 100,
  },
  name: 'Behavior / Formatting',
}

export const Invalid: Story = {
  args: {
    defaultValue: -5,
    label: 'Quantity',
    max: 10,
    min: 0,
  },
  name: 'State / Invalid',
  parameters: {
    docs: {
      description: {
        story:
          'Invalid styling matches Input and is automatically applied when value is outside the provided min/max range.',
      },
    },
  },
}

export const DisableKeyboard: Story = {
  args: {
    defaultValue: 5,
    disableInput: true,
    label: 'Quantity',
  },
  name: 'Behavior / Disable Keyboard',
  parameters: {
    docs: {
      description: {
        story:
          'Disables keyboard input, but still allows scrubbing and stepper controls. Useful for cases where you want to restrict input to only certain values.',
      },
    },
  },
}

export const Suffix: Story = {
  args: {
    defaultValue: 60,
    label: 'Duration',
    step: 30,
  },
  name: 'Appearance / Suffix',
  render: (args) => (
    <NumberField {...args} id="number-field-suffix" className={'w-[300px]'}>
      rem
    </NumberField>
  ),
}
