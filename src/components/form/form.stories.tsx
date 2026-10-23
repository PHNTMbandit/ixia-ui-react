import { CaretUpDownIcon, PasswordIcon, UserIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { z } from 'zod'

import { AlertTitle } from '../alert/alert-title'
import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { Field } from '../field'
import { InputGroupAddon } from '../input-group'
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

export default {
  parameters: {
    docs: {
      description: {
        component:
          'The Form component is a container that manages the state and behavior of form fields. It provides context to its child components, allowing them to access and update form data seamlessly. The Form component handles validation, submission, and other form-related functionalities, making it easier to build complex forms with consistent behavior.',
      },
      subtitle: 'Provides context and state management for form fields.',
    },
  },
  title: 'Components/Form',
} satisfies Meta<typeof Form>

type Story = StoryObj<typeof Form>

export const CustomErrors: Story = {
  play: async ({ userEvent, canvas }) => {
    await userEvent.type(canvas.getByPlaceholderText('Username'), 'a')

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
        username: '',
        email: '',
      },
      validators: {
        onChange: ({ value }) => ({
          fields: {
            username: value.username.length < 3 ? 'Username too short' : undefined,
            email: !value.email.includes('@') ? 'Invalid email' : undefined,
          },
        }),
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors>Form Errors</form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Username" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Email" type="email" />
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

export const FieldInput: Story = {
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
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        },
        validators: {
          onSubmit: schema,
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors />
          <form.Set>
            <form.SetHeading>Personal Information</form.SetHeading>
            <form.SetContent>
              <form.AppField name="firstName">
                {(field) => (
                  <field.Set>
                    <field.Label showRequired />
                    <field.Input required placeholder="First Name" />
                    <field.Errors />
                    <field.Description>Please enter your first name.</field.Description>
                  </field.Set>
                )}
              </form.AppField>
              <form.AppField name="lastName">
                {(field) => (
                  <field.Set>
                    <field.Label showRequired />
                    <field.Input placeholder="Last Name" />
                    <field.Errors />
                    <field.Description>Please enter your last name.</field.Description>
                  </field.Set>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Set>
            <form.SetHeading>Account Information</form.SetHeading>
            <form.SetContent>
              <form.AppField name="password">
                {(field) => (
                  <field.Set>
                    <field.Label />
                    <field.Input placeholder="Password" type="password" />
                    <field.Errors />
                    <field.Description>
                      Your password must be at least 6 characters.
                    </field.Description>
                  </field.Set>
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
                  <field.Set>
                    <field.Label />
                    <field.Input placeholder="Confirm Password" type="password" />
                    <field.Errors />
                    <field.Description>Please confirm your password.</field.Description>
                  </field.Set>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Footer>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Submit</form.Submit>
          </form.Footer>
        </form.AppForm>
      </Form>
    )
  },
}

export const FieldCheckboxGroup: Story = {
  render: () => {
    const form = useAppForm({
      defaultValues: {
        notifications: [] as string[],
      },
      onSubmit: ({ value }) => {
        alert(`Selected notifications: ${value.notifications.join(', ') || 'none'}`)
      },
    })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.AppField name="notifications">
            {(field) => (
              <Field>
                <field.Label>Notification preferences</field.Label>
                <CheckboxGroup onValueChange={field.handleChange} value={field.state.value}>
                  <Checkbox id="form-comments" value="comments">
                    Comments
                  </Checkbox>
                  <Checkbox id="form-mentions" value="mentions">
                    Mentions
                  </Checkbox>
                  <Checkbox id="form-announcements" value="announcements">
                    Announcements
                  </Checkbox>
                </CheckboxGroup>
                <field.Errors />
                <field.Description>Select the updates you want to receive.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.Submit>Save preferences</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const Compact: Story = {
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
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        },
        validators: {
          onSubmit: schema,
        },
      })

    return (
      <Form action={() => form.handleSubmit()} className="w-[400px]">
        <form.AppForm>
          <form.Errors />
          <form.Set>
            <form.SetHeading>Personal Information</form.SetHeading>
            <form.SetContent>
              <form.AppField name="firstName">
                {(field) => (
                  <field.Set>
                    <field.Row>
                      <field.Label variant="secondary" />
                      <field.Input placeholder="First Name" />
                    </field.Row>
                    <field.Errors />
                  </field.Set>
                )}
              </form.AppField>
              <form.AppField name="lastName">
                {(field) => (
                  <field.Set>
                    <field.Row>
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Last Name" />
                    </field.Row>
                    <field.Errors />
                  </field.Set>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Set>
            <form.SetHeading>Account Information</form.SetHeading>
            <form.SetContent>
              <form.AppField name="password">
                {(field) => (
                  <field.Set>
                    <field.Row>
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Password" type="password" />
                    </field.Row>
                    <field.Errors />
                  </field.Set>
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
                  <field.Set>
                    <field.Row>
                      <field.Label variant="secondary" />
                      <field.Input placeholder="Confirm Password" type="password" />
                    </field.Row>
                    <field.Errors />
                  </field.Set>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Footer>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Submit</form.Submit>
          </form.Footer>
        </form.AppForm>
      </Form>
    )
  },
}

export const FieldInputGroup: Story = {
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
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        },
        validators: {
          onSubmit: schema,
        },
      })

    return (
      <Form action={() => form.handleSubmit()}>
        <form.AppForm>
          <form.Errors />
          <form.AppField name="firstName">
            {(field) => (
              <Field>
                <field.Label />
                <field.InputGroup>
                  <InputGroupAddon>
                    <UserIcon weight="bold" />
                  </InputGroupAddon>
                  <field.InputGroupInput placeholder="First Name" />
                </field.InputGroup>
                <field.Errors />
                <field.Description>Please enter your first name.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => (
              <Field>
                <field.Label />
                <field.InputGroup>
                  <InputGroupAddon>
                    <UserIcon weight="bold" />
                  </InputGroupAddon>
                  <field.InputGroupInput placeholder="Last Name" />
                </field.InputGroup>
                <field.Errors />
                <field.Description>Please enter your last name.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.InputGroup>
                  <InputGroupAddon>
                    <PasswordIcon weight="bold" />
                  </InputGroupAddon>
                  <field.InputGroupInput placeholder="Password" type="password" />
                </field.InputGroup>
                <field.Errors />
                <field.Description>Your password must be at least 6 characters.</field.Description>
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
                <field.Label />
                <field.InputGroup>
                  <InputGroupAddon>
                    <PasswordIcon weight="bold" />
                  </InputGroupAddon>
                  <field.InputGroupInput placeholder="Confirm Password" type="password" />
                </field.InputGroup>
                <field.Errors />
                <field.Description>Please confirm your password.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.Reset tone="error" variant="ghost">
            Reset
          </form.Reset>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const FieldSlider: Story = {
  render: () => {
    const form = useAppForm({
      defaultValues: {
        volume: 50,
      },
    })

    return (
      <Form action={() => form.handleSubmit()}>
        <form.AppForm>
          <form.AppField name="volume">
            {(field) => (
              <Field>
                <field.Label />
                <field.Slider min={0} max={100} />
                <field.Errors />
                <field.Description>Adjust the volume level.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.Reset tone="error" variant="ghost">
            Reset
          </form.Reset>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const FieldSelect: Story = {
  render: () => {
    const form = useAppForm({
        defaultValues: {
          country: 'ca',
        },
        onSubmit: async (values) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 2000)
          })
          alert(`You selected: ${values.value.country}`)
        },
      }),
      items = [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
      ]

    return (
      <Form action={() => form.handleSubmit()}>
        <form.AppForm>
          <form.AppField name="country">
            {(field) => (
              <Field>
                <field.Label />
                <field.Select items={items}>
                  <SelectTrigger aria-label={field.name}>
                    <SelectValue />
                    <SelectIcon>
                      <CaretUpDownIcon weight="bold" />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPopup alignItemWithTrigger={false} sideOffset={8}>
                    <SelectList>
                      <SelectGroup>
                        {items.map(({ label, value }) => (
                          <SelectItem key={label} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectList>
                  </SelectPopup>
                </field.Select>
                <field.Errors />
                <field.Description>Select your country.</field.Description>
              </Field>
            )}
          </form.AppField>
          <form.Reset tone="error" variant="ghost">
            Reset
          </form.Reset>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const WorkspaceConfiguration: Story = {
  render: () => {
    const regions = [
      { label: 'North America', value: 'north-america' },
      { label: 'Europe', value: 'europe' },
      { label: 'Asia Pacific', value: 'asia-pacific' },
    ]
    const form = useAppForm({
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
          `Saved workspace: ${value.workspaceName} \n Description: ${value.description} \n Region: ${value.region} \n Visibility: ${value.visibility} \n Map Opacity: ${value.mapOpacity} \n Email Updates: ${value.emailUpdates} \n Send me email updates: ${value.emailUpdates}`,
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
          <form.Set>
            <form.SetHeading>Workspace details</form.SetHeading>
            <form.SetContent>
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
                      <SelectTrigger aria-label="Region">
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
                    <field.Description>
                      Sets the default region for workspace data.
                    </field.Description>
                  </Field>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Set>
            <form.SetHeading>Access and preferences</form.SetHeading>
            <form.SetContent>
              <form.AppField name="visibility">
                {(field) => (
                  <Field>
                    <field.Label>Workspace visibility</field.Label>
                    <field.RadioGroup aria-label="Workspace visibility">
                      <RadioGroup.Radio value="private">Private</RadioGroup.Radio>
                      <RadioGroup.Radio value="organization">Organization</RadioGroup.Radio>
                    </field.RadioGroup>
                    <field.Description>Choose who can discover this workspace.</field.Description>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="emailUpdates">
                {(field) => (
                  <Field>
                    <field.Checkbox>Send me workspace updates by email</field.Checkbox>
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
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value[0] ?? field.state.value)}
                    >
                      <SliderGroup.Slider
                        aria-label="Map opacity"
                        min={0}
                        max={100}
                        showTooltip={false}
                      />
                      <SliderGroup.Input aria-label="Map opacity percentage" size="small" />
                    </SliderGroup>
                    <field.Description>Set the default map overlay opacity.</field.Description>
                  </Field>
                )}
              </form.AppField>
            </form.SetContent>
          </form.Set>
          <form.Footer>
            <form.Reset tone="error" variant="ghost">
              Reset
            </form.Reset>
            <form.Submit>Save workspace</form.Submit>
          </form.Footer>
        </form.AppForm>
      </Form>
    )
  },
}

export const SubmitError: Story = {
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
      username: z.string().min(2, 'Username must be at least 2 characters'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    })

    const form = useAppForm({
      defaultValues: {
        username: '',
        password: '',
      },
      validators: {
        onSubmit: schema,
        onSubmitAsync: async () => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve()
            }, 1000)
          })

          return 'Invalid username or password'
        },
      },
    })

    return (
      <Form action={() => form.handleSubmit()}>
        <form.AppForm>
          <form.Errors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Username" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>

          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Password" type="password" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.Reset tone="error" variant="ghost">
            Reset
          </form.Reset>
          <form.Submit>Submit</form.Submit>
        </form.AppForm>
      </Form>
    )
  },
}

export const SubmitHandlerError: Story = {
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

    await userEvent.type(canvas.getByPlaceholderText('Username'), 'demo')
    await userEvent.type(canvas.getByPlaceholderText('Password'), 'password')
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
      username: z.string().min(2, 'Username must be at least 2 characters'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
    })

    const form = useAppForm({
      defaultValues: {
        username: '',
        password: '',
      },
      validators: {
        onSubmit: schema,
      },
      onSubmit: async ({ formApi }) => {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 500)
        })

        const error = 'Invalid username or password'
        formApi.setErrorMap({
          onSubmit: {
            form: error,
            fields: {},
          },
        })

        return error
      },
    })

    return (
      <Form action={() => form.handleSubmit()}>
        <form.AppForm>
          <form.Errors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.Errors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Username" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input placeholder="Password" type="password" />
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
