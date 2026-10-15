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
          <form.FormErrors>Form Errors</form.FormErrors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Username" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Email" type="email" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>
          <form.FormSubmit>Submit</form.FormSubmit>
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
          <form.FormErrors />
          <form.FormSet>
            <form.FormSetHeading>Personal Information</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="firstName">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldLabel showRequired />
                    <field.FieldInput required placeholder="First Name" />
                    <field.FieldErrors />
                    <field.FieldDescription>Please enter your first name.</field.FieldDescription>
                  </field.FieldSet>
                )}
              </form.AppField>
              <form.AppField name="lastName">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldLabel showRequired />
                    <field.FieldInput placeholder="Last Name" />
                    <field.FieldErrors />
                    <field.FieldDescription>Please enter your last name.</field.FieldDescription>
                  </field.FieldSet>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormSet>
            <form.FormSetHeading>Account Information</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="password">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldLabel />
                    <field.FieldInput placeholder="Password" type="password" />
                    <field.FieldErrors />
                    <field.FieldDescription>
                      Your password must be at least 6 characters.
                    </field.FieldDescription>
                  </field.FieldSet>
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
                  <field.FieldSet>
                    <field.FieldLabel />
                    <field.FieldInput placeholder="Confirm Password" type="password" />
                    <field.FieldErrors />
                    <field.FieldDescription>Please confirm your password.</field.FieldDescription>
                  </field.FieldSet>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormFooter>
            <form.FormReset tone="error" variant="ghost">
              Reset
            </form.FormReset>
            <form.FormSubmit>Submit</form.FormSubmit>
          </form.FormFooter>
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
                <field.FieldLabel>Notification preferences</field.FieldLabel>
                <CheckboxGroup onValueChange={field.handleChange} value={field.state.value}>
                  <Checkbox id="form-comments" label="Comments" value="comments" />
                  <Checkbox id="form-mentions" label="Mentions" value="mentions" />
                  <Checkbox id="form-announcements" label="Announcements" value="announcements" />
                </CheckboxGroup>
                <field.FieldErrors />
                <field.FieldDescription>
                  Select the updates you want to receive.
                </field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.FormSubmit>Save preferences</form.FormSubmit>
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
          <form.FormErrors />
          <form.FormSet>
            <form.FormSetHeading>Personal Information</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="firstName">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldRow>
                      <field.FieldLabel variant="secondary" />
                      <field.FieldInput placeholder="First Name" />
                    </field.FieldRow>
                    <field.FieldErrors />
                  </field.FieldSet>
                )}
              </form.AppField>
              <form.AppField name="lastName">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldRow>
                      <field.FieldLabel variant="secondary" />
                      <field.FieldInput placeholder="Last Name" />
                    </field.FieldRow>
                    <field.FieldErrors />
                  </field.FieldSet>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormSet>
            <form.FormSetHeading>Account Information</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="password">
                {(field) => (
                  <field.FieldSet>
                    <field.FieldRow>
                      <field.FieldLabel variant="secondary" />
                      <field.FieldInput placeholder="Password" type="password" />
                    </field.FieldRow>
                    <field.FieldErrors />
                  </field.FieldSet>
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
                  <field.FieldSet>
                    <field.FieldRow>
                      <field.FieldLabel variant="secondary" />
                      <field.FieldInput placeholder="Confirm Password" type="password" />
                    </field.FieldRow>
                    <field.FieldErrors />
                  </field.FieldSet>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormFooter>
            <form.FormReset tone="error" variant="ghost">
              Reset
            </form.FormReset>
            <form.FormSubmit>Submit</form.FormSubmit>
          </form.FormFooter>
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
          <form.FormErrors />
          <form.AppField name="firstName">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInputGroup>
                  <InputGroupAddon>
                    <UserIcon weight="bold" />
                  </InputGroupAddon>
                  <field.FieldInputGroupInput placeholder="First Name" />
                </field.FieldInputGroup>
                <field.FieldErrors />
                <field.FieldDescription>Please enter your first name.</field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInputGroup>
                  <InputGroupAddon>
                    <UserIcon weight="bold" />
                  </InputGroupAddon>
                  <field.FieldInputGroupInput placeholder="Last Name" />
                </field.FieldInputGroup>
                <field.FieldErrors />
                <field.FieldDescription>Please enter your last name.</field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInputGroup>
                  <InputGroupAddon>
                    <PasswordIcon weight="bold" />
                  </InputGroupAddon>
                  <field.FieldInputGroupInput placeholder="Password" type="password" />
                </field.FieldInputGroup>
                <field.FieldErrors />
                <field.FieldDescription>
                  Your password must be at least 6 characters.
                </field.FieldDescription>
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
                <field.FieldLabel />
                <field.FieldInputGroup>
                  <InputGroupAddon>
                    <PasswordIcon weight="bold" />
                  </InputGroupAddon>
                  <field.FieldInputGroupInput placeholder="Confirm Password" type="password" />
                </field.FieldInputGroup>
                <field.FieldErrors />
                <field.FieldDescription>Please confirm your password.</field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.FormReset tone="error" variant="ghost">
            Reset
          </form.FormReset>
          <form.FormSubmit>Submit</form.FormSubmit>
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
                <field.FieldLabel />
                <field.FieldSlider min={0} max={100} />
                <field.FieldErrors />
                <field.FieldDescription>Adjust the volume level.</field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.FormReset tone="error" variant="ghost">
            Reset
          </form.FormReset>
          <form.FormSubmit>Submit</form.FormSubmit>
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
                <field.FieldLabel />
                <field.FieldSelect items={items}>
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
                </field.FieldSelect>
                <field.FieldErrors />
                <field.FieldDescription>Select your country.</field.FieldDescription>
              </Field>
            )}
          </form.AppField>
          <form.FormReset tone="error" variant="ghost">
            Reset
          </form.FormReset>
          <form.FormSubmit>Submit</form.FormSubmit>
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
          <form.FormErrors>
            Please correct the errors in the form before submitting.
          </form.FormErrors>
          <form.FormSet>
            <form.FormSetHeading>Workspace details</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="workspaceName">
                {(field) => (
                  <Field>
                    <field.FieldLabel showRequired />
                    <field.FieldInput placeholder="e.g. City Operations" />
                    <field.FieldErrors />
                    <field.FieldDescription>
                      Choose a name your team will recognize.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <Field>
                    <field.FieldLabel />
                    <field.FieldTextArea placeholder="What is this workspace used for?" rows={3} />
                    <field.FieldDescription>
                      Add context for other workspace members.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="region">
                {(field) => (
                  <Field>
                    <field.FieldLabel />
                    <field.FieldSelect items={regions}>
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
                    </field.FieldSelect>
                    <field.FieldDescription>
                      Sets the default region for workspace data.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormSet>
            <form.FormSetHeading>Access and preferences</form.FormSetHeading>
            <form.FormSetContent>
              <form.AppField name="visibility">
                {(field) => (
                  <Field>
                    <field.FieldLabel>Workspace visibility</field.FieldLabel>
                    <field.FieldRadioGroup aria-label="Workspace visibility">
                      <RadioGroup.Radio value="private">Private</RadioGroup.Radio>
                      <RadioGroup.Radio value="organization">Organization</RadioGroup.Radio>
                    </field.FieldRadioGroup>
                    <field.FieldDescription>
                      Choose who can discover this workspace.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="emailUpdates">
                {(field) => (
                  <Field>
                    <field.FieldCheckbox label="Send me workspace updates by email" />
                    <field.FieldDescription>
                      Receive important changes and activity summaries.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
              <form.AppField name="mapOpacity">
                {(field) => (
                  <Field>
                    <field.FieldLabel />
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
                    <field.FieldDescription>
                      Set the default map overlay opacity.
                    </field.FieldDescription>
                  </Field>
                )}
              </form.AppField>
            </form.FormSetContent>
          </form.FormSet>
          <form.FormFooter>
            <form.FormReset tone="error" variant="ghost">
              Reset
            </form.FormReset>
            <form.FormSubmit>Save workspace</form.FormSubmit>
          </form.FormFooter>
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
          <form.FormErrors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.FormErrors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Username" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>

          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Password" type="password" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>
          <form.FormReset tone="error" variant="ghost">
            Reset
          </form.FormReset>
          <form.FormSubmit>Submit</form.FormSubmit>
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
          <form.FormErrors>
            <AlertTitle>There were some problems with your submission</AlertTitle>
          </form.FormErrors>
          <form.AppField name="username">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Username" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <Field>
                <field.FieldLabel />
                <field.FieldInput placeholder="Password" type="password" />
                <field.FieldErrors />
              </Field>
            )}
          </form.AppField>
          <form.FormSubmit>Submit</form.FormSubmit>
        </form.AppForm>
      </Form>
    )
  },
}
