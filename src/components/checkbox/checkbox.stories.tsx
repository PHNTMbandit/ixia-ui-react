import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Checkbox } from './index'

export default {
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state for the checkbox root.',
    },

    disabled: {
      control: 'boolean',
      description: 'Disables interaction and associated label click behavior.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },

    indeterminate: {
      control: 'boolean',
      description: 'Displays the indeterminate indicator for partial selection states.',
    },

    label: {
      control: 'text',
      description: 'Optional label associated through the checkbox id.',
    },

    variant: {
      control: 'select',
      description: 'Visual variant of the checkbox.',
      options: ['elevated', 'inSurface'],
      table: {
        defaultValue: { summary: 'elevated' },
      },
    },
  },
  args: {
    disabled: false,
    label: 'Accept Terms and Conditions',
    variant: 'elevated',
  },
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'The Checkbox component supports binary and partial selection states for forms, filters, and settings. It pairs a styled checkbox control with an optional external label, supports disabled and indeterminate states, and provides two visual variants: `elevated` (default) and `inSurface`.',
      },
      subtitle: 'A checkbox component for selecting options.',
    },
  },
  render: (args) => <Checkbox {...args} id="checkbox" />,
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use controls to explore checked, indeterminate, disabled, and label combinations.',
      },
    },
  },
  play: async ({ userEvent, canvas, step }) => {
    await step('Checkbox should be unchecked initially', async () => {
      const checkbox = canvas.getByRole('checkbox')
      await expect(checkbox).not.toBeChecked()
    })

    await step('User can check the checkbox', async () => {
      const checkbox = canvas.getByRole('checkbox')
      await userEvent.click(checkbox)
      await waitFor(async () => {
        await expect(checkbox).toBeChecked()
      })
    })

    await step('User can uncheck the checkbox', async () => {
      const checkbox = canvas.getByRole('checkbox')
      await userEvent.click(checkbox)
      await waitFor(async () => {
        await expect(checkbox).not.toBeChecked()
      })
    })
  },
}

export const Default: Story = {
  name: 'State / Unchecked',
  parameters: {
    docs: {
      description: {
        story: 'Unchecked checkbox with an associated label.',
      },
    },
  },
}

export const ElevatedVariant: Story = {
  args: {
    label: 'Elevated checkbox',
    variant: 'elevated',
  },
  name: 'Variant / Elevated',
  parameters: {
    docs: {
      description: {
        story: 'Default variant with subtle elevation using a soft shadow.',
      },
    },
  },
}

export const InSurfaceVariant: Story = {
  args: {
    label: 'In surface checkbox',
    variant: 'inSurface',
  },
  name: 'Variant / In Surface',
  parameters: {
    docs: {
      description: {
        story: 'Flat variant intended for use inside already elevated or dense surfaces.',
      },
    },
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Receive product updates',
  },
  name: 'State / Checked',
  parameters: {
    docs: {
      description: {
        story: 'Controlled checked state for persisted settings or selected options.',
      },
    },
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Select all team members',
  },
  name: 'State / Indeterminate',
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state communicates that only part of a nested selection is active.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Billing access restricted by admin',
  },
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox and label communicate that the option is unavailable.',
      },
    },
  },
}

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle standalone checkbox',
    label: undefined,
  },
  name: 'Composition / Without Label',
  parameters: {
    docs: {
      description: {
        story: 'For icon-only or compact layouts, provide an accessible name with `aria-label`.',
      },
    },
  },
}

export const Comparison: Story = {
  name: 'Composition / States Comparison',
  parameters: {
    docs: {
      description: {
        story: 'The most common checkbox states shown together for quick comparison.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      <Checkbox id="comparison-unchecked" label="Email notifications" />
      <Checkbox checked id="comparison-checked" label="Security alerts" />
      <Checkbox id="comparison-indeterminate" indeterminate label="Select all projects" />
      <Checkbox disabled id="comparison-disabled" label="Managed by administrator" />
    </div>
  ),
}

export const VariantComparison: Story = {
  name: 'Composition / Variant Comparison',
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of `elevated` and `inSurface` variants across common states.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-md">
      <div className="flex flex-col gap-sm">
        <p className="style-text-default--1 text-on-surface-variant">Elevated</p>
        <Checkbox id="variant-elevated-unchecked" label="Unchecked" variant="elevated" />
        <Checkbox checked id="variant-elevated-checked" label="Checked" variant="elevated" />
        <Checkbox
          id="variant-elevated-indeterminate"
          indeterminate
          label="Indeterminate"
          variant="elevated"
        />
      </div>
      <div className="flex flex-col gap-sm">
        <p className="style-text-default--1 text-on-surface-variant">In Surface</p>
        <Checkbox id="variant-insurface-unchecked" label="Unchecked" variant="inSurface" />
        <Checkbox checked id="variant-insurface-checked" label="Checked" variant="inSurface" />
        <Checkbox
          id="variant-insurface-indeterminate"
          indeterminate
          label="Indeterminate"
          variant="inSurface"
        />
      </div>
    </div>
  ),
}
