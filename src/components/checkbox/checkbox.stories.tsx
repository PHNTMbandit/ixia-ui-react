import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { Field } from '../field'
import { Form, useAppForm } from '../form'
import { Label } from '../label'
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
  render: (args) => <Checkbox {...args} id="checkbox"></Checkbox>,
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
  render: (args) => {
    const form = useAppForm({ defaultValues: { playground: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="playground">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox {...args} />
              <field.Label>Playground checkbox</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Default: Story = {
  name: 'State / Unchecked',
  parameters: {
    docs: {
      description: {
        story:
          'Put `field.Checkbox` **first** in a horizontal `Field`, then `field.Label`. The checkbox takes the leading column, and the label shares the second column.\n\n```tsx\n<Field orientation="horizontal">\n  <field.Checkbox />\n  <field.Label>Email notifications</field.Label>\n</Field>\n```',
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Email notifications' }),
      label = canvas.getByText('Email notifications', { selector: 'label' })

    await step('Checkbox leads; label is in the next column', async () => {
      const checkboxBox = checkbox.getBoundingClientRect(),
        labelBox = label.getBoundingClientRect()

      await expect(checkboxBox.right).toBeLessThanOrEqual(labelBox.left)
    })

    await step('Clicking the label toggles the checkbox', async () => {
      await userEvent.click(label)
      await waitFor(async () => {
        await expect(checkbox).toBeChecked()
      })
    })
  },
  render: () => {
    const form = useAppForm({ defaultValues: { notifications: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="notifications">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox />
              <field.Label>Email notifications</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const ElevatedVariant: Story = {
  name: 'Variant / Elevated',
  parameters: {
    docs: {
      description: {
        story: 'Default variant with subtle elevation using a soft shadow.',
      },
    },
  },
  render: () => {
    const form = useAppForm({ defaultValues: { elevated: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="elevated">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox variant="elevated" />
              <field.Label>Elevated variant</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const InSurfaceVariant: Story = {
  name: 'Variant / In Surface',
  parameters: {
    docs: {
      description: {
        story: 'Flat variant intended for use inside already elevated or dense surfaces.',
      },
    },
  },
  render: () => {
    const form = useAppForm({ defaultValues: { inSurface: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="inSurface">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox variant="inSurface" />
              <field.Label>In Surface variant</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const OutlineVariant: Story = {
  name: 'Variant / Outline',
  parameters: {
    docs: {
      description: {
        story: 'Outline variant with a border to indicate the checkbox boundary.',
      },
    },
  },
  render: () => {
    const form = useAppForm({ defaultValues: { outline: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="outline">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox variant="outline" />
              <field.Label>Outline variant</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Checked: Story = {
  name: 'State / Checked',
  parameters: {
    docs: {
      description: {
        story: 'Controlled checked state for persisted settings or selected options.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox', { name: 'Security alerts' })).toBeChecked()
  },
  render: () => {
    const form = useAppForm({ defaultValues: { alerts: true } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="alerts">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox />
              <field.Label>Security alerts</field.Label>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Indeterminate: Story = {
  name: 'State / Indeterminate',
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state communicates that only part of a nested selection is active.',
      },
    },
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Select all projects' })
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  },
  render: () => (
    <div className="flex items-center gap-xs">
      <Checkbox id="indeterminate-demo" indeterminate />
      <Label htmlFor="indeterminate-demo">Select all projects</Label>
    </div>
  ),
}

export const Disabled: Story = {
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox and label communicate that the option is unavailable.',
      },
    },
  },
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Managed by administrator' })
    await expect(checkbox).toHaveAttribute('aria-disabled', 'true')
  },
  render: () => (
    <div className="flex items-center gap-xs">
      <Checkbox disabled id="disabled-demo" />
      <Label htmlFor="disabled-demo">Managed by administrator</Label>
    </div>
  ),
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
      <div className="flex items-center gap-xs">
        <Checkbox id="comparison-unchecked" />
        <Label htmlFor="comparison-unchecked">Email notifications</Label>
      </div>
      <div className="flex items-center gap-xs">
        <Checkbox checked id="comparison-checked" />
        <Label htmlFor="comparison-checked">Security alerts</Label>
      </div>
      <div className="flex items-center gap-xs">
        <Checkbox id="comparison-indeterminate" indeterminate />
        <Label htmlFor="comparison-indeterminate">Select all projects</Label>
      </div>
      <div className="flex items-center gap-xs">
        <Checkbox disabled id="comparison-disabled" />
        <Label htmlFor="comparison-disabled">Managed by administrator</Label>
      </div>
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
        <div className="flex items-center gap-xs">
          <Checkbox id="variant-elevated-unchecked" variant="elevated" />
          <Label htmlFor="variant-elevated-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center gap-xs">
          <Checkbox checked id="variant-elevated-checked" variant="elevated" />
          <Label htmlFor="variant-elevated-checked">Checked</Label>
        </div>
        <div className="flex items-center gap-xs">
          <Checkbox id="variant-elevated-indeterminate" indeterminate variant="elevated" />
          <Label htmlFor="variant-elevated-indeterminate">Indeterminate</Label>
        </div>
      </div>
      <div className="flex flex-col gap-sm">
        <p className="style-text-default--1 text-on-surface-variant">In Surface</p>
        <div className="flex items-center gap-xs">
          <Checkbox id="variant-insurface-unchecked" variant="inSurface" />
          <Label htmlFor="variant-insurface-unchecked">Unchecked</Label>
        </div>
        <div className="flex items-center gap-xs">
          <Checkbox checked id="variant-insurface-checked" variant="inSurface" />
          <Label htmlFor="variant-insurface-checked">Checked</Label>
        </div>
        <div className="flex items-center gap-xs">
          <Checkbox id="variant-insurface-indeterminate" indeterminate variant="inSurface" />
          <Label htmlFor="variant-insurface-indeterminate">Indeterminate</Label>
        </div>
      </div>
    </div>
  ),
}
