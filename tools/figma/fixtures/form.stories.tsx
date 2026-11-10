import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { useId } from 'react'

import { Form, useAppForm } from '../../../src/components/form'
import { Input } from '../../../src/components/input'
import { Label } from '../../../src/components/label'
import { Matrix, part, show, slot, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Form' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Form' }
const buttonCva = {
  file: 'src/components/button/button.types.ts',
  name: 'buttonVariants',
  axes: ['size', 'tone', 'variant'],
}
const button = (combo: Combo, reset = false) => ({
  size: combo.size ?? 'medium',
  tone: combo.tone ?? (reset ? 'neutral' : 'brand'),
  variant: combo.variant ?? (reset ? 'outline' : 'fill'),
  State: combo.State ?? 'Default',
})

function Context({ children, invalid = false }: { children: ReactNode; invalid?: boolean }) {
  const form = useAppForm({
    defaultValues: { email: '' },
    validators: { onMount: () => (invalid ? 'Enter a valid email address.' : undefined) },
  })
  return <form.AppForm>{children}</form.AppForm>
}
function Email() {
  const id = useId()
  return (
    <Label htmlFor={id} size="small" className="flex-col items-start">
      <span {...text('label')}>Email address</span>
      <Input
        id={id}
        type="email"
        autoComplete="email"
        placeholder="alex@example.com"
        {...part('Input', { size: 'medium', variant: 'primary', State: 'Default' })}
        {...text('value')}
      />
    </Label>
  )
}

export const SetHeading: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Set Heading',
      order: 450,
      cva: {
        file: 'src/components/form/form.types.ts',
        name: 'formSetHeadingVariants',
        axes: ['size'],
      },
      description: 'Form section heading text.',
      properties: { heading: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Form.SetHeading {...target(index)} size={combo.size as 'medium'} {...text('heading')}>
          Account details
        </Form.SetHeading>
      )}
    />
  ),
}
export const Submit: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Submit',
      order: 451,
      cva: buttonCva,
      states: ['Default', 'Disabled'],
      description:
        'Form-aware submit control backed by Button; the real AppForm provider controls submission availability.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Form aria-label="Submit preview" onSubmit={(event) => event.preventDefault()}>
            <div {...target(index)} className="flex" style={{ width: 240 }}>
              <Form.Submit
                {...part('Button', button(combo))}
                {...text('label')}
                size={combo.size as 'medium'}
                tone={combo.tone as 'brand'}
                variant={combo.variant as 'fill'}
                disabled={combo.State === 'Disabled'}
              >
                Save changes
              </Form.Submit>
            </div>
          </Form>
        </Context>
      )}
    />
  ),
}
export const Reset: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Reset',
      order: 452,
      cva: buttonCva,
      defaults: { tone: 'neutral', variant: 'outline' },
      states: ['Default', 'Disabled'],
      description: 'Form-aware reset control backed by Button.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Form aria-label="Reset preview">
            <div {...target(index)} className="flex" style={{ width: 240 }}>
              <Form.Reset
                {...part('Button', button(combo, true))}
                {...text('label')}
                size={combo.size as 'medium'}
                tone={combo.tone as 'neutral'}
                variant={combo.variant as 'outline'}
                disabled={combo.State === 'Disabled'}
              >
                Reset
              </Form.Reset>
            </div>
          </Form>
        </Context>
      )}
    />
  ),
}
export const Errors: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Errors',
      order: 453,
      description:
        'Visible error summary generated from real Form validation. It renders nothing when there are no errors.',
      annotate: [{ selector: '[data-figma-target] li', attrs: { text: 'message' } }],
      properties: { title: 'children', message: 'form and field validation errors' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context invalid>
          <Form.Errors {...target(index)} style={{ width: 360 }}>
            <span {...text('title')}>Review your information</span>
          </Form.Errors>
        </Context>
      )}
    />
  ),
}
export const SetContent: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Set Content',
      order: 454,
      description: 'Vertical collection of labelled fields.',
      slots: {
        fields: {
          description: 'Fields or custom form controls.',
          preferred: ['Field', 'Input', 'Input Group'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Form.SetContent {...target(index)} style={{ width: 360 }}>
          <div style={{ display: 'contents' }} {...slot('fields')}>
            <Email />
          </div>
        </Form.SetContent>
      )}
    />
  ),
}
export const Set: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Set',
      order: 455,
      description: 'Section with reusable heading and field collection.',
      slots: {
        sections: {
          description: 'Heading and controls.',
          preferred: ['Form/Set Heading', 'Form/Set Content'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Form.Set {...target(index)} style={{ width: 360 }}>
          <div style={{ display: 'contents' }} {...slot('sections')}>
            <Form.SetHeading {...part('Form/Set Heading', { size: 'medium' })} {...text('heading')}>
              Account details
            </Form.SetHeading>
            <Form.SetContent {...part('Form/Set Content', {})}>
              <div style={{ display: 'contents' }} {...slot('fields')}>
                <Email />
              </div>
            </Form.SetContent>
          </div>
        </Form.Set>
      )}
    />
  ),
}

function Actions() {
  return (
    <>
      <div className="flex w-full" {...part('Form/Reset', button({}, true))}>
        <Form.Reset {...part('Button', button({}, true))} {...text('label')}>
          Reset
        </Form.Reset>
      </div>
      <div className="flex w-full" {...part('Form/Submit', button({}))}>
        <Form.Submit {...part('Button', button({}))} {...text('label')}>
          Save changes
        </Form.Submit>
      </div>
    </>
  )
}

export const Footer: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Form/Footer',
      order: 456,
      axes: { orientation: ['horizontal', 'vertical'] },
      description: 'Form action row or column.',
      slots: {
        actions: {
          description: 'Submit, reset or custom controls.',
          preferred: ['Form/Submit', 'Form/Reset', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Form.Footer
            {...target(index)}
            orientation={combo.orientation as 'horizontal'}
            style={{ width: 360 }}
          >
            <div style={{ display: 'contents' }} {...slot('actions')}>
              <Actions />
            </div>
          </Form.Footer>
        </Context>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Form',
  parameters: {
    figma: {
      ...base,
      component: 'Form',
      order: 457,
      states: ['Default', 'Invalid'],
      description:
        'Native form with composable sections, validation summary and footer. AppForm and hooks supply behavior, not additional assets.',
      slots: {
        sections: {
          description: 'Ordered form sections.',
          preferred: ['Form/Set', 'Form/Errors', 'Form/Footer'],
        },
      },
      usage:
        '<form.AppForm><Form onSubmit={handleSubmit}><Form.Set>…</Form.Set><Form.Errors>Review your information</Form.Errors><Form.Footer><Form.Reset>Reset</Form.Reset><Form.Submit>Save changes</Form.Submit></Form.Footer></Form></form.AppForm>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context invalid={combo.State === 'Invalid'}>
          <Form
            {...target(index)}
            aria-label="Account details"
            style={{ width: 360 }}
            onSubmit={(event) => event.preventDefault()}
          >
            <div style={{ display: 'contents' }} {...slot('sections')}>
              <Form.Set {...part('Form/Set', {})}>
                <div style={{ display: 'contents' }} {...slot('sections')}>
                  <Form.SetHeading
                    {...part('Form/Set Heading', { size: 'medium' })}
                    {...text('heading')}
                  >
                    Account details
                  </Form.SetHeading>
                  <Form.SetContent {...part('Form/Set Content', {})}>
                    <div style={{ display: 'contents' }} {...slot('fields')}>
                      <Email />
                    </div>
                  </Form.SetContent>
                </div>
              </Form.Set>
              {combo.State === 'Invalid' && (
                <Form.Errors {...part('Form/Errors', {})} {...show('showErrors')}>
                  <span {...text('title')}>Review your information</span>
                </Form.Errors>
              )}
              <Form.Footer {...part('Form/Footer', { orientation: 'horizontal' })}>
                <div style={{ display: 'contents' }} {...slot('actions')}>
                  <Actions />
                </div>
              </Form.Footer>
            </div>
          </Form>
        </Context>
      )}
    />
  ),
}
