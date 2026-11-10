import type { Meta, StoryObj } from '@storybook/react-vite'

import { AlertDialog } from '../../../src/components/alert-dialog'
import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Alert Dialog' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const cancel = { tone: 'neutral', variant: 'outline', State: 'Default' }
const confirm = { tone: 'brand', variant: 'fill', State: 'Default' }

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Trigger',
      group: 'Alert Dialog',
      order: 200,
      description:
        'The opening control, using a reusable Button instance. Replace the control slot with one interactive component.',
      slots: { control: { description: 'The opening button.', preferred: ['Button'], max: 1 } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <div {...slot('control')} style={{ display: 'contents' }}>
          <AlertDialog.Trigger {...part('Button', confirm)}>
            <Button>
              <Icon name="delete" aria-hidden="true" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Delete project</span>
            </Button>
          </AlertDialog.Trigger>
        </div>
      </div>
    </AlertDialog>
  ),
}

export const Close: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Close',
      group: 'Alert Dialog',
      order: 201,
      description:
        'The cancel action, reusing Button with neutral outline defaults. Keep this before destructive confirmation for initial focus.',
      slots: { control: { description: 'The cancel button.', preferred: ['Button'], max: 1 } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <div {...slot('control')} style={{ display: 'contents' }}>
          <AlertDialog.Close {...part('Button', cancel)} {...text('label')}>
            Cancel
          </AlertDialog.Close>
        </div>
      </div>
    </AlertDialog>
  ),
}

export const Confirm: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Confirm',
      group: 'Alert Dialog',
      order: 202,
      cva: {
        axes: ['tone'],
        file: 'src/components/alert-dialog/alert-dialog.types.ts',
        name: 'alertDialogVariants',
      },
      description:
        'The confirming action. Tone matches the surrounding popup and the nested reusable Button.',
      slots: {
        control: { description: 'The confirmation button.', preferred: ['Button'], max: 1 },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <AlertDialog>
          <div {...target(index)} style={{ display: 'inline-flex' }}>
            <div {...slot('control')} style={{ display: 'contents' }}>
              <AlertDialog.Confirm
                tone={combo.tone as 'brand'}
                {...part('Button', { ...confirm, tone: combo.tone || 'brand' })}
                {...text('label')}
              >
                Confirm
              </AlertDialog.Confirm>
            </div>
          </div>
        </AlertDialog>
      )}
    />
  ),
}

export const Title: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Title',
      group: 'Alert Dialog',
      order: 203,
      description: 'The dialog heading and accessible name.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Title {...target(0)} {...text('label')}>
        Delete project?
      </AlertDialog.Title>
    </AlertDialog>
  ),
}

export const Description: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Description',
      group: 'Alert Dialog',
      order: 204,
      description: 'Supporting text programmatically associated with the alert dialog.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Description {...target(0)} {...text('label')} style={{ width: 320 }}>
        This action cannot be undone.
      </AlertDialog.Description>
    </AlertDialog>
  ),
}

export const IconSet: Story = {
  name: 'Icon',
  parameters: {
    figma: {
      component: 'Alert Dialog/Icon',
      group: 'Alert Dialog',
      order: 205,
      description: 'A decorative icon in the header. Swap its Icon instance or hide it.',
      properties: { icon: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog.Icon {...target(0)}>
      <Icon name="warning" aria-hidden="true" {...swap('icon')} />
    </AlertDialog.Icon>
  ),
}

function Heading() {
  return (
    <div style={{ display: 'contents' }} {...slot('heading')}>
      <AlertDialog.Icon {...part('Alert Dialog/Icon', {})} {...show('showIcon')}>
        <Icon name="warning" aria-hidden="true" {...swap('icon')} />
      </AlertDialog.Icon>
      <AlertDialog.Title {...part('Alert Dialog/Title', {})} {...text('label')}>
        Delete project?
      </AlertDialog.Title>
      <AlertDialog.Description
        {...part('Alert Dialog/Description', {})}
        {...show('showDescription')}
        {...text('label')}
      >
        This action cannot be undone.
      </AlertDialog.Description>
    </div>
  )
}

export const Header: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Header',
      group: 'Alert Dialog',
      order: 206,
      description:
        'A grid of reusable Icon, Title and Description parts. Its native slot follows the real header composition.',
      slots: {
        heading: {
          description: 'Header parts.',
          preferred: ['Alert Dialog/Icon', 'Alert Dialog/Title', 'Alert Dialog/Description'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Header {...target(0)} style={{ width: 360 }}>
        <Heading />
      </AlertDialog.Header>
    </AlertDialog>
  ),
}

function Actions({ tone = 'brand' }: { tone?: string }) {
  return (
    <div style={{ display: 'contents' }} {...slot('actions')}>
      <AlertDialog.Close {...part('Alert Dialog/Close', {})}>
        <span {...text('label')}>Cancel</span>
      </AlertDialog.Close>
      <AlertDialog.Confirm tone={tone as 'brand'} {...part('Alert Dialog/Confirm', { tone })}>
        <span {...text('label')}>Confirm</span>
      </AlertDialog.Confirm>
    </div>
  )
}

export const Footer: Story = {
  parameters: {
    figma: {
      component: 'Alert Dialog/Footer',
      group: 'Alert Dialog',
      order: 207,
      description:
        'Right-aligned actions. Add, remove or reorder Close, Confirm or Button instances in the native slot.',
      slots: {
        actions: {
          description: 'Dialog actions.',
          preferred: ['Alert Dialog/Close', 'Alert Dialog/Confirm', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Footer {...target(0)} style={{ width: 360 }}>
        <Actions />
      </AlertDialog.Footer>
    </AlertDialog>
  ),
}

function Surface({ combo, index }: { combo: Combo; index: number }) {
  return (
    <AlertDialog open>
      <AlertDialog.Trigger>
        <Button>Delete project</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Popup
        {...target(index)}
        tone={combo.tone as 'brand'}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          transform: 'none',
          width: 420,
          minWidth: 0,
        }}
      >
        <div style={{ display: 'contents' }} {...slot('parts')}>
          <AlertDialog.Header {...part('Alert Dialog/Header', {})}>
            <Heading />
          </AlertDialog.Header>
          <div {...slot('content')}>
            <p className="style-text-prose-0" {...text('body')}>
              All project files will be permanently removed.
            </p>
          </div>
          <AlertDialog.Footer {...part('Alert Dialog/Footer', {})}>
            <Actions tone={combo.tone || 'brand'} />
          </AlertDialog.Footer>
        </div>
      </AlertDialog.Popup>
    </AlertDialog>
  )
}

const popup = {
  cva: {
    axes: ['tone'],
    file: 'src/components/alert-dialog/alert-dialog.types.ts',
    name: 'alertDialogVariants',
  },
  group: 'Alert Dialog',
  slots: {
    parts: {
      description: 'Header and Footer instances with optional body content.',
      preferred: ['Alert Dialog/Header', 'Alert Dialog/Footer'],
    },
    content: { description: 'Optional content between heading and actions.' },
  },
  usage:
    '<AlertDialog><AlertDialog.Trigger><Button>Delete</Button></AlertDialog.Trigger><AlertDialog.Popup tone="error"><AlertDialog.Header><AlertDialog.Title>Delete project?</AlertDialog.Title><AlertDialog.Description>This cannot be undone.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Close>Cancel</AlertDialog.Close><AlertDialog.Confirm>Delete</AlertDialog.Confirm></AlertDialog.Footer></AlertDialog.Popup></AlertDialog>',
} satisfies Partial<FigmaSpec>

export const Popup: Story = {
  parameters: {
    figma: {
      ...popup,
      component: 'Alert Dialog/Popup',
      order: 208,
      description:
        'The modal alert surface with real Header and Footer instances, content slots, and the actual tone variants.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(combo, index) => <Surface combo={combo} index={index} />} />,
}

export const Root: Story = {
  name: 'Alert Dialog',
  parameters: {
    figma: {
      ...popup,
      component: 'Alert Dialog',
      order: 209,
      description:
        'The open AlertDialog composition. Root supplies modal behavior; its visible surface is composed from reusable header, icon, text and action parts.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(combo, index) => <Surface combo={combo} index={index} />} />,
}
