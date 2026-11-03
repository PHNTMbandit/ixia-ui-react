import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'
import { Dialog } from '@/components/dialog'
import { Icon } from '@/components/icon'

import { part, show, slot, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Dialog',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const close = { size: 'extraSmall', State: 'Default', tone: 'error', variant: 'ghost' }

export const DialogSet: Story = {
  name: 'Dialog',
  parameters: {
    figma: {
      annotate: [
        // Dialog.Close renders an icon-only Button; expose its icon so the instance keeps it.
        { attrs: { swap: 'icon' }, selector: '[data-figma-part="Button/Icon only"] svg' },
      ],
      component: 'Dialog',
      description:
        'A modal dialog surface. Edit the title and description, swap the icon, put any layers in the content slot and buttons in the actions slot.',
      group: 'Dialog',
      order: 70,
      properties: {
        actions: '<Dialog.Footer> children',
        content: '<Dialog.Content> children',
        description: '<Dialog.Description>',
        icon: '<Dialog.Icon> children',
        showClose: '<Dialog.Close />',
        title: '<Dialog.Title>',
      },
      slots: {
        actions: { description: 'Footer buttons, right aligned.', preferred: ['Button'] },
        content: { description: 'Body content of the dialog.' },
      },
      usage:
        '<Dialog>\n  <Dialog.Trigger><Button>Open</Button></Dialog.Trigger>\n  <Dialog.Popup>\n    <Dialog.Header>\n      <Dialog.Title>Delete project?</Dialog.Title>\n      <Dialog.Description>This cannot be undone.</Dialog.Description>\n    </Dialog.Header>\n    <Dialog.Content>…</Dialog.Content>\n    <Dialog.Footer>…</Dialog.Footer>\n    <Dialog.Close />\n  </Dialog.Popup>\n</Dialog>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Dialog defaultOpen modal={false}>
      <Dialog.Popup {...target(0)} style={{ width: 480 }}>
        <Dialog.Header>
          <Dialog.Icon {...show('showIcon', false)}>
            <Icon name="info" data-figma-swap="icon" />
          </Dialog.Icon>
          <Dialog.Title {...text('title')}>Dialog title</Dialog.Title>
          <Dialog.Description {...show('showDescription')} {...text('description')}>
            A short description of the task.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Content {...slot('content')}>
          <p className="style-text-prose-0 text-on-surface-variant">
            Dialog content. Replace it with any layers.
          </p>
        </Dialog.Content>
        <Dialog.Footer {...slot('actions')}>
          <Button
            tone="neutral"
            variant="ghost"
            {...text('label')}
            {...part('Button', { State: 'Default', tone: 'neutral', variant: 'ghost' })}
          >
            Cancel
          </Button>
          <Button
            tone="brand"
            variant="fill"
            {...text('label')}
            {...part('Button', { State: 'Default', tone: 'brand', variant: 'fill' })}
          >
            Confirm
          </Button>
        </Dialog.Footer>
        <Dialog.Close {...show('showClose')} {...part('Button/Icon only', close)} />
      </Dialog.Popup>
    </Dialog>
  ),
}
