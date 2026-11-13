import { CaretUpDownIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { z } from 'zod'

import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { Form, useAppForm } from '../form'
import { InputGroupAddon } from '../input-group'
import { Label } from '../label'
import { RadioGroup } from '../radio-group'
import {
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '../select'
import { Field } from './index'

type Orientation = 'horizontal' | 'vertical' | 'responsive'

const PIXEL_TOLERANCE = 1

export default {
  argTypes: {
    orientation: {
      control: 'inline-radio',
      description:
        'Places the label above the control (`vertical`), beside it (`horizontal`), or adapts based on screen size (`responsive`). In horizontal/responsive mode the first child takes a leading column and the remaining parts align in the second column.',
      options: ['vertical', 'horizontal', 'responsive'],
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  args: {
    orientation: 'vertical',
  },
  component: Field,
  parameters: {
    docs: {
      description: {
        component: `\`Field\` lays out **one** form control with its label and supporting text. Render it inside \`form.AppField\`: the render prop's \`field\` object exposes the parts below, already bound to that field's value, validation state and \`id\`.

| Part | Renders | Purpose |
| --- | --- | --- |
| \`field.Label\` | \`<label for={name}>\` | Names the control. Defaults to the field name in title case. \`showRequired\` adds a visual \`*\`. |
| \`field.Input\`, \`field.TextArea\`, \`field.Select\`, \`field.Slider\`, … | The control | Reads and writes the field value. Text controls set \`aria-invalid\` once touched and invalid. |
| \`field.Errors\` | \`<ul>\` | Validation messages. Renders nothing while the field is valid. |
| \`field.Description\` | \`<p>\` | Help text shown under the control. |

**Orientation.** Three options control the layout:

- **\`vertical\`** (default): Stacks label, control, errors, and description vertically. Best for mobile and most forms.
- **\`horizontal\`**: Puts the **first child** in a leading column and everything else in a second column. Useful for dense settings panels. Put \`field.Label\` first for text inputs; put \`field.Checkbox\` first for checkboxes.
- **\`responsive\`**: Stacks vertically on mobile, switches to horizontal on larger screens via container queries.

To align all labels in horizontal mode, set \`--ixia-field-label-width\` on a shared ancestor (e.g., \`form.Set\`). Pick a width that fits your longest label, accounting for translations.

**Grouping.** Use \`form.Group\` to organize multiple related fields within a section. Wrap them together in \`form.Set\` (a \`<fieldset>\`) with \`form.Legend\` (the \`<legend>\`). See **Components/Form**.`,
      },
      subtitle: 'Lays out a single form control with its label, errors and description.',
    },
  },
  title: 'Components/Field',
} satisfies Meta<typeof Field>

type Story = StoryObj<typeof Field>

function EmailField({ orientation }: { orientation?: Orientation | null }) {
  const form = useAppForm({
    defaultValues: { email: '' },
    validators: {
      onChange: z.object({ email: z.email('Enter a valid email address') }),
    },
  })

  return (
    <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
      <form.AppField name="email">
        {(field) => (
          <Field orientation={orientation}>
            <field.Label showRequired />
            <field.Input placeholder="name@example.com" type="email" />
            <field.Errors />
            <field.Description>We only use this for account notifications.</field.Description>
          </Field>
        )}
      </form.AppField>
    </Form>
  )
}

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Switch `orientation` in the controls. Type an invalid address to see where errors appear.',
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: /email/i })

    await step('Clicking the label focuses the control', async () => {
      await userEvent.click(canvas.getByText(/^Email/, { selector: 'label' }))
      await expect(input).toHaveFocus()
    })

    await step('Invalid input shows an error and marks the control invalid', async () => {
      await userEvent.type(input, 'not-an-email')
      await waitFor(async () => {
        await expect(canvas.getByText('Enter a valid email address')).toBeVisible()
        await expect(input).toHaveAttribute('aria-invalid', 'true')
      })
      await userEvent.clear(input)
    })
  },
  render: ({ orientation }) => <EmailField orientation={orientation} />,
}

export const Anatomy: Story = {
  name: 'Composition / Anatomy',
  parameters: {
    docs: {
      description: {
        story:
          'All four parts in their recommended order: label, control, errors, description. Errors sit directly under the control so they are read and seen next to the value that caused them.',
      },
    },
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { username: 'a' },
      validators: {
        onMount: z.object({ username: z.string().min(3, 'Use at least 3 characters') }),
        onChange: z.object({ username: z.string().min(3, 'Use at least 3 characters') }),
      },
    })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="username">
          {(field) => (
            <Field>
              <field.Label showRequired />
              <field.Input />
              <field.Errors />
              <field.Description>Shown on your public profile.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  name: 'Orientation / Vertical',
  parameters: {
    docs: {
      description: {
        story:
          'The default. Use it for most forms, narrow containers and any field whose label might wrap or be translated into a longer string.',
      },
    },
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText(/^Email/, { selector: 'label' }).getBoundingClientRect(),
      input = canvas.getByRole('textbox', { name: /email/i }).getBoundingClientRect()

    await expect(label.bottom).toBeLessThanOrEqual(input.top + PIXEL_TOLERANCE)
    await expect(Math.abs(label.left - input.left)).toBeLessThanOrEqual(PIXEL_TOLERANCE)
  },
  render: ({ orientation }) => <EmailField orientation={orientation} />,
}

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  name: 'Orientation / Horizontal',
  parameters: {
    docs: {
      description: {
        story:
          'The label sits beside the control. Errors and the description move to the control column instead of wrapping under the label. Use it for dense settings panels or short labels in wide containers.',
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    const label = canvas.getByText(/^Email/, { selector: 'label' }),
      input = canvas.getByRole('textbox', { name: /email/i })

    await step('Label and control share a row', async () => {
      const labelBox = label.getBoundingClientRect(),
        inputBox = input.getBoundingClientRect()

      await expect(labelBox.right).toBeLessThanOrEqual(inputBox.left)
      await expect(labelBox.top).toBeGreaterThanOrEqual(inputBox.top - PIXEL_TOLERANCE)
      await expect(labelBox.bottom).toBeLessThanOrEqual(inputBox.bottom + PIXEL_TOLERANCE)
    })

    await step('Errors and description align with the control', async () => {
      await userEvent.type(input, 'x')
      const error = await canvas.findByText('Enter a valid email address'),
        description = canvas.getByText('We only use this for account notifications.'),
        inputBox = input.getBoundingClientRect()

      await expect(
        Math.abs(error.getBoundingClientRect().left - inputBox.left),
      ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
      await expect(error.getBoundingClientRect().top).toBeGreaterThanOrEqual(inputBox.bottom)
      await expect(
        Math.abs(description.getBoundingClientRect().left - inputBox.left),
      ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
      await userEvent.clear(input)
    })
  },
  render: ({ orientation }) => <EmailField orientation={orientation} />,
}

export const AlignedLabels: Story = {
  name: 'Orientation / Aligned Labels',
  parameters: {
    docs: {
      description: {
        story:
          'Each horizontal field sizes its label column to fit its own label, so controls start at different offsets. Set `--ixia-field-label-width` on a shared ancestor (here the `form.Set`) to give every field the same label column. Pick a width that fits the longest label, and remember translations may be longer.\n\n```tsx\n<form.Set style={{ \'--ixia-field-label-width\': \'7rem\' }}>\n  <form.AppField name="firstName">\n    {(field) => (\n      <Field orientation="horizontal">…</Field>\n    )}\n  </form.AppField>\n</form.Set>\n```',
      },
    },
  },
  play: async ({ canvas }) => {
    const [first, ...rest] = canvas
      .getAllByRole('textbox')
      .map((input) => input.getBoundingClientRect().left)

    for (const left of rest) {
      await expect(Math.abs(left - (first ?? 0))).toBeLessThanOrEqual(PIXEL_TOLERANCE)
    }
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { email: '', firstName: '', lastName: '' },
    })

    return (
      <Form className="w-[480px]" onSubmit={(event) => event.preventDefault()}>
        <form.Set style={{ '--ixia-field-label-width': '7rem' } as React.CSSProperties}>
          <form.Legend>Contact</form.Legend>
          <form.Group>
            <form.AppField name="firstName">
              {(field) => (
                <Field orientation="horizontal">
                  <field.Label variant="secondary" />
                  <field.Input />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="lastName">
              {(field) => (
                <Field orientation="horizontal">
                  <field.Label variant="secondary" />
                  <field.Input />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="email">
              {(field) => (
                <Field orientation="horizontal">
                  <field.Label variant="secondary" />
                  <field.Input type="email" />
                  <field.Description>Used for sign-in and receipts.</field.Description>
                </Field>
              )}
            </form.AppField>
          </form.Group>
        </form.Set>
      </Form>
    )
  },
}

export const TextArea: Story = {
  name: 'Control / Text Area',
  parameters: {
    docs: {
      description: {
        story:
          '`field.TextArea` behaves like `field.Input`, so `field.Label` names it automatically.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'Bio' })).toBeVisible()
  },
  render: ({ orientation }) => {
    const form = useAppForm({ defaultValues: { bio: '' } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="bio">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label />
              <field.TextArea placeholder="A few words about you" rows={3} />
              <field.Description>Up to 160 characters.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const InputGroup: Story = {
  name: 'Control / Input Group',
  parameters: {
    docs: {
      description: {
        story:
          'Wrap `field.InputGroupInput` in `field.InputGroup` to add icons or buttons. The label targets the inner input.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'Work Email' })).toBeVisible()
  },
  render: ({ orientation }) => {
    const form = useAppForm({ defaultValues: { workEmail: '' } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="workEmail">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label />
              <field.InputGroup>
                <InputGroupAddon>
                  <EnvelopeSimpleIcon aria-hidden weight="bold" />
                </InputGroupAddon>
                <field.InputGroupInput placeholder="name@company.com" type="email" />
              </field.InputGroup>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Select: Story = {
  name: 'Control / Select',
  parameters: {
    docs: {
      description: {
        story:
          '`field.Select` manages the value; you compose the trigger and popup. Give the trigger `id={field.name}` so `field.Label` names it.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('combobox', { name: 'Country' })).toBeVisible()
  },
  render: ({ orientation }) => {
    const items = [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
      ],
      form = useAppForm({ defaultValues: { country: 'ca' } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="country">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label />
              <field.Select items={items}>
                <SelectTrigger id={field.name}>
                  <SelectValue />
                  <SelectIcon>
                    <CaretUpDownIcon weight="bold" />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPopup alignItemWithTrigger={false} sideOffset={8}>
                  <SelectList>
                    <SelectGroup>
                      {items.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectList>
                </SelectPopup>
              </field.Select>
              <field.Description>Used for tax and currency.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const Slider: Story = {
  name: 'Control / Slider',
  parameters: {
    docs: {
      description: {
        story:
          'A slider thumb is not a labellable element, so pass the same text to `aria-label` as well as showing `field.Label`.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('slider', { name: 'Volume' })).toBeInTheDocument()
  },
  render: ({ orientation }) => {
    const form = useAppForm({ defaultValues: { volume: 50 } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="volume">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label />
              <field.Slider aria-label="Volume" max={100} min={0} />
              <field.Description>Adjust the notification volume.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const RadioGroupControl: Story = {
  name: 'Control / Radio Group',
  parameters: {
    docs: {
      description: {
        story:
          'A group has no single control for `<label for>` to target. Give `field.Label` an `id` and point the group at it with `aria-labelledby`.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('radiogroup', { name: 'Visibility' })).toBeVisible()
  },
  render: ({ orientation }) => {
    const form = useAppForm({ defaultValues: { visibility: 'private' } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="visibility">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label id="visibility-label" />
              <field.RadioGroup aria-labelledby="visibility-label">
                <Label>
                  <RadioGroup.Radio value="private" />
                  Private
                </Label>
                <Label>
                  <RadioGroup.Radio value="team" />
                  Team
                </Label>
                <Label>
                  <RadioGroup.Radio value="public" />
                  Public
                </Label>
              </field.RadioGroup>
              <field.Description>Choose who can find this project.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const CheckboxGroupControl: Story = {
  name: 'Control / Checkbox Group',
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select values have no dedicated field part. Bind `CheckboxGroup` to `field.state.value` and `field.handleChange`, label the group with `aria-labelledby` like a radio group, and wrap each `Checkbox` in a `Label`.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Notifications' })).toBeVisible()
    await expect(canvas.getByRole('checkbox', { name: 'Mentions' })).toBeChecked()
  },
  render: ({ orientation }) => {
    const form = useAppForm({ defaultValues: { notifications: ['mentions'] as string[] } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="notifications">
          {(field) => (
            <Field orientation={orientation}>
              <field.Label id="notifications-label" />
              <CheckboxGroup
                aria-labelledby="notifications-label"
                onValueChange={field.handleChange}
                value={field.state.value}
              >
                <Label size="small">
                  <Checkbox value="comments" />
                  Comments
                </Label>
                <Label size="small">
                  <Checkbox value="mentions" />
                  Mentions
                </Label>
                <Label size="small">
                  <Checkbox value="announcements" />
                  Announcements
                </Label>
              </CheckboxGroup>
              <field.Description>Select the updates you want to receive.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const CheckboxControl: Story = {
  name: 'Control / Checkbox',
  parameters: {
    docs: {
      description: {
        story:
          'Put `field.Checkbox` **first** in a horizontal `Field`, then `field.Label`. The checkbox takes the leading column, and the label and description share the second column so the description lines up with the label text.\n\n```tsx\n<Field orientation="horizontal">\n  <field.Checkbox />\n  <field.Label>Email me product updates</field.Label>\n  <field.Description>About one email a month.</field.Description>\n</Field>\n```',
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Email me product updates' }),
      label = canvas.getByText('Email me product updates', { selector: 'label' }),
      description = canvas.getByText('About one email a month.')

    await step('Checkbox leads; label and description share the next column', async () => {
      const checkboxBox = checkbox.getBoundingClientRect(),
        labelBox = label.getBoundingClientRect()

      await expect(checkboxBox.right).toBeLessThanOrEqual(labelBox.left)
      await expect(
        Math.abs(description.getBoundingClientRect().left - labelBox.left),
      ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
    })

    await step('Clicking the label toggles the checkbox', async () => {
      await userEvent.click(label)
      await waitFor(async () => {
        await expect(checkbox).toBeChecked()
      })
    })
  },
  render: () => {
    const form = useAppForm({ defaultValues: { updates: false } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="updates">
          {(field) => (
            <Field orientation="horizontal">
              <field.Checkbox />
              <field.Label>Email me product updates</field.Label>
              <field.Description>About one email a month.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const SwitchControl: Story = {
  name: 'Control / Switch',
  parameters: {
    docs: {
      description: {
        story:
          '`field.Switch` renders its own label from `children`, so leave out `field.Label`; adding one would label the control twice.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('switch', { name: 'Two-factor authentication' })).toBeChecked()
  },
  render: () => {
    const form = useAppForm({ defaultValues: { twoFactor: true } })

    return (
      <Form className="w-[420px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppField name="twoFactor">
          {(field) => (
            <Field>
              <field.Switch>Two-factor authentication</field.Switch>
              <field.Description>Require a code from your phone when signing in.</field.Description>
            </Field>
          )}
        </form.AppField>
      </Form>
    )
  },
}

export const ResponsiveOrientation: Story = {
  name: 'Orientation / Responsive',
  parameters: {
    docs: {
      description: {
        story:
          'Set `orientation="responsive"` to stack fields vertically on mobile and place labels beside inputs on larger screens. Useful for settings panels and forms that adapt to viewport width. Resize your browser to see the change.',
      },
    },
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { displayName: '', email: '', jobTitle: '' },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-full max-w-[480px]">
        <form.AppForm>
          <Field.Set style={{ '--ixia-field-label-width': '7rem' } as React.CSSProperties}>
            <Field.Legend>Profile</Field.Legend>
            <Field.Group>
              <form.AppField name="displayName">
                {(field) => (
                  <Field orientation="responsive">
                    <field.Label variant="secondary" />
                    <field.Input placeholder="Your name" />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="jobTitle">
                {(field) => (
                  <Field orientation="responsive">
                    <field.Label variant="secondary" />
                    <field.Input placeholder="Job title" />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <Field orientation="responsive">
                    <field.Label variant="secondary" />
                    <field.Input type="email" placeholder="name@example.com" />
                    <field.Description>Visible to your team only.</field.Description>
                  </Field>
                )}
              </form.AppField>
            </Field.Group>
          </Field.Set>
        </form.AppForm>
      </Form>
    )
  },
}

export const LabelAlignment: Story = {
  name: 'Layout / Label Alignment',
  parameters: {
    docs: {
      description: {
        story:
          'In horizontal mode, each field sizes its label column independently, so controls start at different offsets. Use the `--ixia-field-label-width` CSS variable on a shared ancestor like `Field.Set` to give all fields the same label width. This ensures all controls line up vertically. Choose a width that fits your longest label, accounting for translations.',
      },
    },
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { displayName: '', email: '', jobTitle: '' },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[480px] space-y-lg">
        <div>
          <h3 className="mb-md text-sm font-semibold">Without Label Alignment</h3>
          <form.AppForm>
            <Field.Set className="border-outline-variant rounded-md border p-md">
              <Field.Legend className="mb-md">Profile (misaligned)</Field.Legend>
              <Field.Group>
                <form.AppField name="displayName">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Your name" />
                    </Field>
                  )}
                </form.AppField>
                <form.AppField name="jobTitle">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Job title" />
                    </Field>
                  )}
                </form.AppField>
                <form.AppField name="email">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input type="email" placeholder="name@example.com" />
                    </Field>
                  )}
                </form.AppField>
              </Field.Group>
            </Field.Set>
          </form.AppForm>
        </div>

        <div>
          <h3 className="mb-md text-sm font-semibold">
            With Label Alignment (--ixia-field-label-width: 7rem)
          </h3>
          <form.AppForm>
            <Field.Set
              className="border-success-variant rounded-md border p-md"
              style={{ '--ixia-field-label-width': '7rem' } as React.CSSProperties}
            >
              <Field.Legend className="mb-md">Profile (aligned)</Field.Legend>
              <Field.Group>
                <form.AppField name="displayName">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Your name" />
                    </Field>
                  )}
                </form.AppField>
                <form.AppField name="jobTitle">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Job title" />
                    </Field>
                  )}
                </form.AppField>
                <form.AppField name="email">
                  {(field) => (
                    <Field orientation="horizontal">
                      <field.Label variant="secondary" />
                      <field.Input type="email" placeholder="name@example.com" />
                    </Field>
                  )}
                </form.AppField>
              </Field.Group>
            </Field.Set>
          </form.AppForm>
        </div>
      </Form>
    )
  },
}

export const NestedFieldGroups: Story = {
  name: 'Composition / Nested Groups',
  parameters: {
    docs: {
      description: {
        story:
          'Use multiple `Field.Group` components within a `Field.Set` to organize fields into visual subsections. Each group has consistent spacing (`mt-md gap-md`), making the form structure clear without additional wrapper styling. This pattern works well for multi-step forms or settings panels with logical sections.',
      },
    },
  },
  render: () => {
    const form = useAppForm({
      defaultValues: {
        companyName: '',
        industry: '',
        employees: '',
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[480px]">
        <form.AppForm>
          <Field.Set style={{ '--ixia-field-label-width': '8rem' } as React.CSSProperties}>
            <Field.Legend>Company Registration</Field.Legend>

            <Field.Group>
              <form.AppField name="companyName">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" showRequired />
                    <field.Input placeholder="Acme Corp" />
                    <field.Errors />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="industry">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" />
                    <field.Input placeholder="e.g., Technology" />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="employees">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" />
                    <field.Input type="number" placeholder="1-100" />
                  </Field>
                )}
              </form.AppField>
            </Field.Group>

            <Field.Group>
              <form.AppField name="street">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" showRequired />
                    <field.Input placeholder="123 Main St" />
                    <field.Errors />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="city">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" showRequired />
                    <field.Input placeholder="New York" />
                    <field.Errors />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="state">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" />
                    <field.Input placeholder="NY" />
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="zip">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Label variant="secondary" />
                    <field.Input placeholder="10001" />
                  </Field>
                )}
              </form.AppField>
            </Field.Group>
          </Field.Set>

          <form.Actions>
            <form.Reset tone="error" variant="ghost">
              Clear
            </form.Reset>
            <form.Submit>Register</form.Submit>
          </form.Actions>
        </form.AppForm>
      </Form>
    )
  },
}

export const CheckboxFieldLayout: Story = {
  name: 'Pattern / Checkbox Field',
  parameters: {
    docs: {
      description: {
        story:
          'For checkboxes in horizontal fields, place `field.Checkbox` **first** so it lands in column 1 (the label column). The native label text then flows naturally to the right. This pattern avoids the need for a separate label component and keeps the checkbox visually associated with its text.',
      },
    },
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { marketing: false, terms: false, updates: false },
    })

    return (
      <Form className="w-[480px]" onSubmit={(event) => event.preventDefault()}>
        <form.AppForm>
          <Field.Set>
            <Field.Legend>Preferences</Field.Legend>
            <Field.Group>
              <form.AppField name="marketing">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Checkbox />
                    <field.Label>Marketing emails</field.Label>
                    <field.Description>Hear about new features and offers.</field.Description>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="updates">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Checkbox />
                    <field.Label>Product updates</field.Label>
                    <field.Description>About one email a month.</field.Description>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="terms">
                {(field) => (
                  <Field orientation="horizontal">
                    <field.Checkbox />
                    <field.Label>I agree to the terms</field.Label>
                    <field.Errors />
                  </Field>
                )}
              </form.AppField>
            </Field.Group>
          </Field.Set>
        </form.AppForm>
      </Form>
    )
  },
}
