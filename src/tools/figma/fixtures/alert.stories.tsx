import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert } from '@/components/alert'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'

import { Matrix, part, show, slot, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Alert',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AlertSet: Story = {
  name: 'Alert',
  parameters: {
    figma: {
      component: 'Alert',
      cva: { axes: ['tone'], file: 'src/components/alert/alert.types.ts', name: 'alertVariants' },
      description:
        'Inline status messages. Pick a tone, edit the title and description, swap the icon and turn on the actions slot to add buttons.',
      group: 'Alert',
      order: 30,
      properties: {
        actions: '<Alert.Action> children',
        description: '<Alert.Description>',
        icon: '<Alert.Icon> children',
        title: '<Alert.Title>',
      },
      slots: {
        actions: {
          description: 'Buttons for the alert.',
          preferred: ['Button', 'Button/Icon only'],
        },
      },
      usage:
        '<Alert tone="brand">\n  <Alert.Icon><Icon name="info" /></Alert.Icon>\n  <Alert.Title>Heads up</Alert.Title>\n  <Alert.Description>Something needs your attention.</Alert.Description>\n</Alert>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Alert {...target(index)} style={{ width: 480 }} tone={combo.tone as 'brand'}>
          <Alert.Icon {...show('showIcon')}>
            <Icon name="info" data-figma-swap="icon" />
          </Alert.Icon>
          <Alert.Title {...text('title')}>Alert title</Alert.Title>
          <Alert.Description {...show('showDescription')} {...text('description')}>
            A short description of what happened and what to do next.
          </Alert.Description>
          <Alert.Action {...show('showActions', false)}>
            <div className="flex items-center gap-2xs" {...slot('actions')}>
              <Button
                size="small"
                tone={combo.tone as 'brand'}
                variant="secondary"
                {...text('label')}
                {...part('Button', {
                  size: 'small',
                  State: 'Default',
                  tone: combo.tone,
                  variant: 'secondary',
                })}
              >
                Action
              </Button>
            </div>
          </Alert.Action>
        </Alert>
      )}
    />
  ),
}
