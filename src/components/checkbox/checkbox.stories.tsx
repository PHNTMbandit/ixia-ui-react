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
  render: (args) => (
    <Checkbox {...args} id="checkbox">
      Checkbox Label
    </Checkbox>
  ),
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
    const checkbox = canvas.getByRole('checkbox'),
      initialSize = checkbox.getBoundingClientRect()

    await step('Checkbox should be unchecked initially', async () => {
      await expect(checkbox).not.toBeChecked()
      await expect(initialSize.width).toBeGreaterThan(0)
      await expect(initialSize.height).toBeGreaterThan(0)
    })

    await step('User can check the checkbox', async () => {
      const checkbox = canvas.getByRole('checkbox')
      await userEvent.click(checkbox)
      await waitFor(async () => {
        await expect(checkbox).toBeChecked()
      })
      await expect(checkbox.getBoundingClientRect().width).toBeCloseTo(initialSize.width)
      await expect(checkbox.getBoundingClientRect().height).toBeCloseTo(initialSize.height)
    })

    await step('User can uncheck the checkbox', async () => {
      const checkbox = canvas.getByRole('checkbox')
      await userEvent.click(checkbox)
      await waitFor(async () => {
        await expect(checkbox).not.toBeChecked()
      })
      await expect(checkbox.getBoundingClientRect().width).toBeCloseTo(initialSize.width)
      await expect(checkbox.getBoundingClientRect().height).toBeCloseTo(initialSize.height)
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

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
  },
  name: 'Variant / Outline',
  parameters: {
    docs: {
      description: {
        story: 'Outline variant with a border to indicate the checkbox boundary.',
      },
    },
  },
}

export const Checked: Story = {
  args: {
    checked: true,
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
      <Checkbox id="comparison-unchecked">Email notifications</Checkbox>
      <Checkbox checked id="comparison-checked">
        Security alerts
      </Checkbox>
      <Checkbox id="comparison-indeterminate" indeterminate>
        Select all projects
      </Checkbox>
      <Checkbox disabled id="comparison-disabled">
        Managed by administrator
      </Checkbox>
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
        <Checkbox id="variant-elevated-unchecked" variant="elevated">
          Unchecked
        </Checkbox>
        <Checkbox checked id="variant-elevated-checked" variant="elevated">
          Checked
        </Checkbox>
        <Checkbox id="variant-elevated-indeterminate" indeterminate variant="elevated">
          Indeterminate
        </Checkbox>
      </div>
      <div className="flex flex-col gap-sm">
        <p className="style-text-default--1 text-on-surface-variant">In Surface</p>
        <Checkbox id="variant-insurface-unchecked" variant="inSurface">
          Unchecked
        </Checkbox>
        <Checkbox checked id="variant-insurface-checked" variant="inSurface">
          Checked
        </Checkbox>
        <Checkbox id="variant-insurface-indeterminate" indeterminate variant="inSurface">
          Indeterminate
        </Checkbox>
      </div>
    </div>
  ),
}
