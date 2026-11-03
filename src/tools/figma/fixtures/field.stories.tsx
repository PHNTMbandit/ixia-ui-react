import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from '@/components/field'
import { fieldContext } from '@/components/form/form-contexts'
import { Input } from '@/components/input'

import { Matrix, part, show, slot, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Field',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Field parts read their state from a TanStack Form field; a static stand-in is enough to render.
const fieldState = (invalid: boolean) =>
  ({
    name: 'email',
    state: {
      meta: {
        errors: invalid ? [{ message: 'Enter a valid email address.' }] : [],
        isTouched: invalid,
        isValid: !invalid,
      },
      value: '',
    },
  }) as unknown as Parameters<typeof fieldContext.Provider>[0]['value']

export const FieldSet: Story = {
  name: 'Field',
  parameters: {
    figma: {
      annotate: [
        { attrs: { show: 'showRequired=false' }, selector: '[data-figma-target] > div > span' },
        { attrs: { text: 'error' }, selector: '[data-figma-target] li' },
      ],
      axes: { State: ['Default', 'Invalid'] },
      component: 'Field',
      cva: {
        axes: ['size'],
        file: 'src/components/field/field.types.ts',
        name: 'fieldLabelVariants',
      },
      description:
        'A labelled form control. Edit the label, description and error, toggle the required mark, and put an Input, Select or any control in the control slot.',
      group: 'Field',
      order: 90,
      properties: {
        control: '<Field.Input />, <Field.Select> or another control',
        description: '<Field.Description>',
        error: '<Field.Errors> (validation messages)',
        label: '<Field.Label>',
        showRequired: '<Field.Label showRequired>',
      },
      slots: {
        control: {
          description: 'The form control.',
          preferred: ['Input', 'Select'],
        },
      },
      usage:
        '<form.AppField name="email">\n  {(field) => (\n    <Field>\n      <Field.Label showRequired />\n      <Field.Input placeholder="name@example.com" />\n      <Field.Description>We never share it.</Field.Description>\n      <Field.Errors />\n    </Field>\n  )}\n</form.AppField>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo: Combo, index) => {
        const invalid = combo.State === 'Invalid'
        return (
          <fieldContext.Provider value={fieldState(invalid)}>
            <Field {...target(index)} style={{ width: 320 }}>
              <Field.Label
                showRequired
                size={combo.size as 'medium'}
                {...show('showLabel')}
                {...text('label')}
              >
                Email
              </Field.Label>
              <div className="flex flex-col" {...slot('control')}>
                <Input
                  aria-invalid={invalid || undefined}
                  placeholder="name@example.com"
                  size={combo.size as 'medium'}
                  {...text('value')}
                  {...part('Input', {
                    size: combo.size,
                    State: invalid ? 'Invalid' : 'Default',
                    variant: 'primary',
                  })}
                />
              </div>
              <Field.Description {...show('showDescription')} {...text('description')}>
                We will never share your email.
              </Field.Description>
              {invalid && <Field.Errors />}
            </Field>
          </fieldContext.Provider>
        )
      }}
    />
  ),
}
