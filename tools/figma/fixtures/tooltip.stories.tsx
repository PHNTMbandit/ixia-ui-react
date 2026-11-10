import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Kbd } from '../../../src/components/kbd'
import { Tooltip } from '../../../src/components/tooltip'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Tooltip' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Tooltip/Trigger',
      group: 'Tooltip',
      order: 270,
      description:
        'A named native button trigger, reusing Button. The tooltip provides supplemental information, not the accessible name.',
      slots: {
        control: {
          description: 'A single focusable trigger.',
          preferred: ['Button', 'Button/Icon only'],
          max: 1,
        },
      },
      usage:
        '<Tooltip.Trigger><Button aria-label="Save"><Icon name="save" /></Button></Tooltip.Trigger>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Tooltip>
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <div {...slot('control')} style={{ display: 'contents' }}>
          <Tooltip.Trigger
            {...part('Button', { State: 'Default', tone: 'neutral', variant: 'ghost' })}
          >
            <Button tone="neutral" variant="ghost">
              <Icon name="info" aria-hidden="true" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Details</span>
            </Button>
          </Tooltip.Trigger>
        </div>
      </div>
    </Tooltip>
  ),
}

function Content() {
  return (
    <div className="flex items-center gap-2xs" {...slot('content')}>
      <span {...text('label')}>Save changes</span>
      <Kbd.Group {...part('Kbd/Group', {})}>
        <div style={{ display: 'contents' }} {...slot('keys')}>
          <Kbd {...part('Kbd', {})} {...text('label')}>
            Ctrl
          </Kbd>
          <Kbd {...part('Kbd', {})} {...text('label')}>
            S
          </Kbd>
        </div>
      </Kbd.Group>
    </div>
  )
}

export const ContentSet: Story = {
  name: 'Content',
  parameters: {
    figma: {
      component: 'Tooltip/Content',
      group: 'Tooltip',
      order: 271,
      description:
        'Supplemental tooltip text and an optional shortcut. Content is a native slot; Kbd keys remain nested reusable instances.',
      slots: {
        content: {
          description: 'Noninteractive supplemental content.',
          preferred: ['Kbd/Group', 'Icon'],
        },
      },
      usage: '<Tooltip.Content>Save changes</Tooltip.Content>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <div style={{ padding: 64, height: 180 }}>
      <Tooltip open>
        <Tooltip.Trigger>
          <Button>Save</Button>
        </Tooltip.Trigger>
        <Tooltip.Content {...target(0)}>
          <Content />
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const Root: Story = {
  name: 'Tooltip',
  parameters: {
    figma: {
      component: 'Tooltip',
      group: 'Tooltip',
      order: 272,
      axes: { side: ['top', 'right', 'bottom', 'left'] },
      description:
        'The visible open tooltip surface with slotted text and reusable shortcut keys. Side maps to the real placement prop; the provider is supplied internally.',
      slots: {
        content: {
          description: 'Noninteractive supplemental content.',
          preferred: ['Kbd/Group', 'Icon'],
        },
      },
      usage:
        '<Tooltip><Tooltip.Trigger><Button>Save</Button></Tooltip.Trigger><Tooltip.Content side="top">Save changes</Tooltip.Content></Tooltip>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ padding: 100, height: 240, width: 400 }}>
          <Tooltip open>
            <Tooltip.Trigger>
              <Button {...part('Button', { State: 'Default', tone: 'brand', variant: 'fill' })}>
                Save
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content {...target(index)} side={combo.side as 'top'}>
              <Content />
            </Tooltip.Content>
          </Tooltip>
        </div>
      )}
    />
  ),
}
