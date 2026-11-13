import { CaretUpDownIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'
import { z } from 'zod'

import { AlertTitle } from '../alert/alert-title'
import { Field } from '../field'
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
import { SliderGroup } from '../slider-group'
import { useAppForm } from './form-context'
import { Form } from './index'

const PIXEL_TOLERANCE = 1

export default {
  parameters: {
    docs: {
      description: {
        component: `\`Form\` renders a native \`<form>\` wired to TanStack Form state. Use \`useAppForm\` to manage values, validation, and submission.

## Form Structure

The recommended structure mirrors semantic HTML and accessibility best practices:

\`\`\`tsx
<Form>
  <form.AppForm>
    <form.Errors />
    
    <Field.Set>
      <Field.Legend>Section title</Field.Legend>
      <form.AppField name="fieldName">
        {(field) => (
          <Field orientation="vertical">
            <field.Label />
            <field.Input />
            <field.Description>Helper text</field.Description>
            <field.Errors />
          </Field>
        )}
      </form.AppField>
    </Field.Set>
    
    <form.Actions>
      <form.Reset />
      <form.Submit />
    </form.Actions>
  </form.AppForm>
</Form>
\`\`\`

## Component Reference

| Component | Renders | Purpose |
| --- | --- | --- |
| **\`Form\`** | \`<form>\` | Container. Stacks children with consistent gap. |
| **\`form.AppForm\`** | Context provider | Makes form state available to children. |
| **\`form.Errors\`** | Alert | Summarizes all form-level and field errors. Optional. |
| **\`Field.Set\`** | \`<fieldset>\` | Groups related fields (e.g., address, account info). Semantic grouping for assistive tech. |
| **\`Field.Legend\`** | \`<legend>\` | **Must be first child** of \`Field.Set\`. Screen readers announce it when focus enters the group. |
| **\`form.AppField\`** | (none) | Binds a single form value by name to a field. Passes \`field\` object to render prop. |
| **\`Field\`** | \`<div>\` (role="group") | Container for **one** field. Manages layout, spacing, and state. Supports \`orientation\` prop. |
| **\`field.Label\`** | \`<label>\` | Labels the input. Connects to input via \`htmlFor\`. |
| **\`field.Input\`** | \`<input>\` | Text input. Auto-connects to field state. |
| **\`field.Description\`** | \`<p>\` | Helper text below the input. |
| **\`field.Errors\`** | \`<div>\` | Displays field-level validation errors. |
| **\`form.Actions\`** | \`<div>\` | Horizontal container for action buttons (Submit, Reset). |
| **\`form.Submit\`** | \`<button type="submit">\` | Disables itself while submitting. |
| **\`form.Reset\`** | \`<button type="reset">\` | Restores form to \`defaultValues\`. |

## Field Orientation

Use the \`orientation\` prop on \`Field\` to control label placement:

- **\`"vertical"\`** (default): Label above control. Best for mobile and most forms.
- **\`"horizontal"\`**: Label and control side-by-side. Good for dense settings panels.
- **\`"responsive"\`**: Vertical on mobile, horizontal on desktop (uses container queries).

For horizontal fields, align all labels by setting \`--ixia-field-label-width\` on a shared ancestor (e.g., \`Field.Set\`):

\`\`\`tsx
<Field.Set style={{ '--ixia-field-label-width': '7rem' }}>
  <Field orientation="horizontal">…</Field>
  <Field orientation="horizontal">…</Field>
</Field.Set>
\`\`\``,
      },
      subtitle: 'A native form wired to TanStack Form for state, validation, and submission.',
    },
  },
  title: 'Components/Form',
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof Form>

export const Basic: Story = {
  name: 'Composition / Basic',
  parameters: {
    docs: {
      description: {
        story:
          'The minimal form structure: `Form` wraps `form.AppForm`, which wraps `form.AppField` components bound to form state. One `Field` per field value. Short forms do not need `Field.Set` or `form.Errors`.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'Email' })).toBeVisible()
    await expect(canvas.getByLabelText('Password')).toBeVisible()
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { email: '', password: '' },
      onSubmit: ({ value }) => {
        alert(`Signed in as ${value.email}`)
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.AppField name="email">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="email" type="email" />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="current-password" type="password" />
              </Field>
            )}
          </form.AppField>
          <form.Submit>Sign in</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const Sections: Story = {
  name: 'Composition / Sections',
  parameters: {
    docs: {
      description: {
        story:
          'Use `Field.Set` to group related fields. Each set is a semantic `<fieldset>`, and `Field.Legend` is the `<legend>` that screen readers announce when focus enters. Add `form.Errors` to summarize all validation errors, and use `form.Actions` for actions (Submit/Reset buttons).',
      },
    },
  },
  play: async ({ canvas }) => {
    const personal = canvas.getByRole('group', { name: 'Personal information' }),
      account = canvas.getByRole('group', { name: 'Account information' })

    await expect(within(personal).getByRole('textbox', { name: /first name/i })).toBeVisible()
    await expect(within(account).getByLabelText(/^Password/)).toBeVisible()
  },
  render: () => {
    const schema = z
        .object({
          confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
          firstName: z.string().min(2, 'First name must be at least 2 characters'),
          lastName: z.string().min(2, 'Last name must be at least 2 characters'),
          password: z.string().min(6, 'Password must be at least 6 characters'),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
          if (confirmPassword !== password) {
            ctx.addIssue({
              code: 'custom',
              message: 'Passwords do not match',
              path: ['confirmPassword'],
            })
          }
        }),
      form = useAppForm({
        defaultValues: {
          confirmPassword: '',
          firstName: '',
          lastName: '',
          password: '',
        },
        onSubmit: async () => {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 2000)
          })
        },
        validators: {
          onSubmit: schema,
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors>Please correct the errors below.</form.Errors>
          <Field.Set>
            <Field.Legend>Personal information</Field.Legend>
            <form.AppField name="firstName">
              {(field) => (
                <Field>
                  <field.Label showRequired />
                  <field.Input autoComplete="given-name" />
                  <field.Errors />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="lastName">
              {(field) => (
                <Field>
                  <field.Label showRequired />
                  <field.Input autoComplete="family-name" />
                  <field.Errors />
                </Field>
              )}
            </form.AppField>
          </Field.Set>
          <Field.Set>
            <Field.Legend>Account information</Field.Legend>
            <form.AppField name="password">
              {(field) => (
                <Field>
                  <field.Label showRequired />
                  <field.Input autoComplete="new-password" type="password" />
                  <field.Errors />
                  <field.Description>Use at least 6 characters.</field.Description>
                </Field>
              )}
            </form.AppField>
            <form.AppField
              name="confirmPassword"
              validators={{
                onChange: ({ value, fieldApi }) => {
                  const password = fieldApi.form.getFieldValue('password')
                  if (value && value !== password) {
                    return new Error('Passwords do not match')
                  }
                },
                onChangeListenTo: ['password'],
              }}
            >
              {(field) => (
                <Field>
                  <field.Label showRequired />
                  <field.Input autoComplete="new-password" type="password" />
                  <field.Errors />
                </Field>
              )}
            </form.AppField>
          </Field.Set>
          <form.Actions>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Create account</form.Submit>
          </form.Actions>
        </form.AppForm>
      </Form>
    )
  },
}

export const HorizontalLayout: Story = {
  name: 'Layout / Horizontal Fields',
  parameters: {
    docs: {
      description: {
        story:
          'Set `orientation="horizontal"` on `Field` to place labels beside inputs. This is useful for dense settings panels. Set `--ixia-field-label-width` on the parent `Field.Set` to align all controls vertically. Choose a width that fits your longest label.',
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    const inputs = canvas.getAllByRole('textbox'),
      [firstLeft] = inputs.map((input) => input.getBoundingClientRect().left)

    for (const input of inputs) {
      await expect(
        Math.abs(input.getBoundingClientRect().left - (firstLeft ?? 0)),
      ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
    }

    await userEvent.click(canvas.getByRole('button', { name: 'Save' }))
    const error = await canvas.findByText('Display name must be at least 2 characters')
    await expect(
      Math.abs(error.getBoundingClientRect().left - (firstLeft ?? 0)),
    ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
  },
  render: () => {
    const form = useAppForm({
      defaultValues: { displayName: '', email: '', jobTitle: '' },
      validators: {
        onSubmit: z.object({
          displayName: z.string().min(2, 'Display name must be at least 2 characters'),
          email: z.string(),
          jobTitle: z.string(),
        }),
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[480px]">
        <form.AppForm>
          <Field.Set style={{ '--ixia-field-label-width': '7rem' } as React.CSSProperties}>
            <Field.Legend>Profile</Field.Legend>
            <form.AppField name="displayName">
              {(field) => (
                <Field orientation="horizontal">
                  <field.Label variant="secondary" />
                  <field.Input />
                  <field.Errors />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="jobTitle">
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
                  <field.Description>Visible to your team only.</field.Description>
                </Field>
              )}
            </form.AppField>
          </Field.Set>
          <form.Actions>
            <form.Submit>Save</form.Submit>
          </form.Actions>
        </form.AppForm>
      </Form>
    )
  },
}

export const CustomErrors: Story = {
  name: 'Validation / On Change',
  parameters: {
    docs: {
      description: {
        story:
          'Validate as the user types with `validators.onChange`. Errors appear under each field and in the `form.Errors` summary; `children` becomes the summary title.',
      },
    },
  },
  play: async ({ userEvent, canvas }) => {
    await userEvent.type(canvas.getByRole('textbox', { name: 'Username' }), 'a')

    await waitFor(async () => {
      await expect(
        canvas.getByText('Username too short', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
      await expect(
        canvas.getByText('Invalid email', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
    })
  },
  render: () => {
    const form = useAppForm({
      defaultValues: {
        email: '',
        username: '',
      },
      validators: {
        onChange: ({ value }) => ({
          fields: {
            email: value.email.includes('@') ? undefined : 'Invalid email',
            username: value.username.length < 3 ? 'Username too short' : undefined,
          },
        }),
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors>Form errors</form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input type="email" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const SubmitError: Story = {
  name: 'Validation / On Submit',
  parameters: {
    docs: {
      description: {
        story:
          'Validate when the user submits with `validators.onSubmit`, and run async checks with `validators.onSubmitAsync`. Put an `AlertTitle` inside `form.Errors` for a custom heading.',
      },
    },
  },
  play: async ({ userEvent, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))

    await waitFor(async () => {
      await expect(
        canvas.getByText('Username must be at least 2 characters', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
      await expect(
        canvas.getByText('Password must be at least 6 characters', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
    })
  },
  render: () => {
    const schema = z.object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        username: z.string().min(2, 'Username must be at least 2 characters'),
      }),
      form = useAppForm({
        defaultValues: {
          password: '',
          username: '',
        },
        validators: {
          onSubmit: schema,
          onSubmitAsync: async () => {
            await new Promise<void>((resolve) => {
              setTimeout(resolve, 1000)
            })

            return 'Invalid username or password'
          },
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="username" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="current-password" type="password" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.Actions>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Submit</form.Submit>
          </form.Actions>
        </form.AppForm>
      </Form>
    )
  },
}

export const SubmitHandlerError: Story = {
  name: 'Validation / Server Error',
  parameters: {
    docs: {
      description: {
        story:
          'When the server rejects valid input, call `formApi.setErrorMap` from `onSubmit` to show a form-level error in the `form.Errors` summary.',
      },
    },
  },
  play: async ({ userEvent, canvas }) => {
    const submit = canvas.getByRole('button', { name: 'Submit' })

    await userEvent.click(submit)

    await waitFor(async () => {
      await expect(
        canvas.getByText('Username must be at least 2 characters', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
      await expect(
        canvas.getByText('Password must be at least 6 characters', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
    })

    await userEvent.type(canvas.getByRole('textbox', { name: 'Username' }), 'demo')
    await userEvent.type(canvas.getByLabelText('Password'), 'password')
    await expect(submit).toBeEnabled()
    await userEvent.click(submit)

    await waitFor(async () => {
      await expect(
        canvas.getByText('Invalid username or password', {
          selector: '[data-slot="alert-description"] li',
        }),
      ).toBeVisible()
    })
  },
  render: () => {
    const schema = z.object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        username: z.string().min(2, 'Username must be at least 2 characters'),
      }),
      form = useAppForm({
        defaultValues: {
          password: '',
          username: '',
        },
        onSubmit: async ({ formApi }) => {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 500)
          })

          const error = 'Invalid username or password'
          formApi.setErrorMap({
            onSubmit: {
              fields: {},
              form: error,
            },
          })

          return error
        },
        validators: {
          onSubmit: schema,
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="username" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="current-password" type="password" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const FooterOrientation: Story = {
  name: 'Layout / Footer',
  parameters: {
    docs: {
      description: {
        story:
          '`form.Actions` lays actions out in a row by default. Use `orientation="vertical"` to stack them in narrow containers such as popovers.',
      },
    },
  },
  render: () => {
    const form = useAppForm({ defaultValues: { search: '' } })

    return (
      <div className="flex gap-xl">
        {(['horizontal', 'vertical'] as const).map((orientation) => (
          <Form
            aria-label={`${orientation} footer example`}
            className="w-[240px]"
            key={orientation}
            onSubmit={(event) => event.preventDefault()}
          >
            <form.AppForm>
              <form.Actions orientation={orientation}>
                <form.Reset tone="neutral" variant="outline">
                  Reset
                </form.Reset>
                <form.Submit>Apply</form.Submit>
              </form.Actions>
            </form.AppForm>
          </Form>
        ))}
      </div>
    )
  },
}

export const WorkspaceConfiguration: Story = {
  name: 'Examples / Workspace Settings',
  parameters: {
    docs: {
      description: {
        story:
          'A complete form combining sections, several control types, an error summary and footer actions. See **Components/Field** for how each control is labelled.',
      },
    },
  },
  render: () => {
    const regions = [
        { label: 'North America', value: 'north-america' },
        { label: 'Europe', value: 'europe' },
        { label: 'Asia Pacific', value: 'asia-pacific' },
      ],
      form = useAppForm({
        defaultValues: {
          description: '',
          emailUpdates: true,
          mapOpacity: 75,
          region: 'north-america',
          visibility: 'private',
          workspaceName: '',
        },
        onSubmit: ({ value }) => {
          alert(
            `Saved workspace: ${value.workspaceName}\nDescription: ${value.description}\nRegion: ${value.region}\nVisibility: ${value.visibility}\nMap opacity: ${value.mapOpacity}\nEmail updates: ${value.emailUpdates}`,
          )
        },
        validators: {
          onSubmit: z.object({
            description: z.string(),
            emailUpdates: z.boolean(),
            mapOpacity: z.number(),
            region: z.string(),
            visibility: z.string(),
            workspaceName: z.string().min(2, 'Enter at least 2 characters'),
          }),
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[600px]">
        <form.AppForm>
          <form.Errors>Please correct the errors in the form before submitting.</form.Errors>
          <Field.Set>
            <Field.Legend>Workspace details</Field.Legend>
            <form.AppField name="workspaceName">
              {(field) => (
                <Field>
                  <field.Label showRequired />
                  <field.Input placeholder="e.g. City Operations" />
                  <field.Errors />
                  <field.Description>Choose a name your team will recognize.</field.Description>
                </Field>
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <Field>
                  <field.Label />
                  <field.TextArea placeholder="What is this workspace used for?" rows={3} />
                  <field.Description>Add context for other workspace members.</field.Description>
                </Field>
              )}
            </form.AppField>
            <form.AppField name="region">
              {(field) => (
                <Field>
                  <field.Label />
                  <field.Select items={regions}>
                    <SelectTrigger id={field.name}>
                      <SelectValue />
                      <SelectIcon>
                        <CaretUpDownIcon weight="bold" />
                      </SelectIcon>
                    </SelectTrigger>
                    <SelectPopup alignItemWithTrigger={false} sideOffset={8}>
                      <SelectList>
                        <SelectGroup>
                          {regions.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectList>
                    </SelectPopup>
                  </field.Select>
                  <field.Description>Sets the default region for workspace data.</field.Description>
                </Field>
              )}
            </form.AppField>
          </Field.Set>
          <Field.Set>
            <Field.Legend>Access and preferences</Field.Legend>
            <form.AppField name="visibility">
              {(field) => (
                <Field>
                  <field.Label id="workspace-visibility-label">Workspace visibility</field.Label>
                  <field.RadioGroup aria-labelledby="workspace-visibility-label">
                    <RadioGroup.Radio value="private">Private</RadioGroup.Radio>
                    <RadioGroup.Radio value="organization">Organization</RadioGroup.Radio>
                  </field.RadioGroup>
                  <field.Description>Choose who can discover this workspace.</field.Description>
                </Field>
              )}
            </form.AppField>
            <form.AppField name="emailUpdates">
              {(field) => (
                <Field orientation="horizontal">
                  <field.Checkbox />
                  <field.Label>Send me workspace updates by email</field.Label>
                  <field.Description>
                    Receive important changes and activity summaries.
                  </field.Description>
                </Field>
              )}
            </form.AppField>
            <form.AppField name="mapOpacity">
              {(field) => (
                <Field>
                  <field.Label />
                  <SliderGroup
                    onValueChange={(value) => field.handleChange(value[0] ?? field.state.value)}
                    value={field.state.value}
                  >
                    <SliderGroup.Slider
                      aria-label="Map opacity"
                      max={100}
                      min={0}
                      showTooltip={false}
                    />
                    <SliderGroup.Input aria-label="Map opacity percentage" size="small" />
                  </SliderGroup>
                  <field.Description>Set the default map overlay opacity.</field.Description>
                </Field>
              )}
            </form.AppField>
          </Field.Set>
          <form.Actions>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Save workspace</form.Submit>
          </form.Actions>
        </form.AppForm>
      </Form>
    )
  },
}
