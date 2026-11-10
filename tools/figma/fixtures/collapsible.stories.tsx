import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Collapsible } from '../../../src/components/collapsible'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Collapsible' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const disclosure = {
  axes: { open: ['false', 'true'] },
  defaults: { open: 'true' },
} satisfies Partial<FigmaSpec>

export const Trigger: Story = {
  parameters: {
    figma: {
      ...disclosure,
      annotate: [
        {
          selector: '[data-figma-target] > svg:last-child',
          attrs: { swap: 'indicatorIcon', show: 'showIndicatorIcon=true' },
        },
      ],
      component: 'Collapsible/Trigger',
      group: 'Collapsible',
      order: 280,
      description:
        'The disclosure button, with an editable label and swappable leading icon and caret. Open rotates the caret.',
      states: ['Default', 'Hover', 'Disabled'],
      interactive: { Hover: 'hover' },
      properties: { label: 'children', open: '<Collapsible open>', leadingIcon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Collapsible
          open={combo.open === 'true'}
          disabled={combo.State === 'Disabled'}
          style={{ width: 280 }}
        >
          <Collapsible.Trigger {...target(index)} disabled={combo.State === 'Disabled'}>
            <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Project files</span>
          </Collapsible.Trigger>
          <Collapsible.Panel>Project files</Collapsible.Panel>
        </Collapsible>
      )}
    />
  ),
}

function Entries() {
  return (
    <div style={{ display: 'contents' }} {...slot('content')}>
      {['Overview', 'Settings'].map((label) => (
        <Button
          key={label}
          tone="neutral"
          variant="ghost"
          {...part('Button', { tone: 'neutral', variant: 'ghost', State: 'Default' })}
          {...text('label')}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

export const Panel: Story = {
  parameters: {
    figma: {
      component: 'Collapsible/Panel',
      group: 'Collapsible',
      order: 281,
      description:
        'The indented disclosure content. Add or reorder any content in its native slot.',
      slots: { content: { description: 'Expanded content.', preferred: ['Button'] } },
      usage: '<Collapsible.Panel>…</Collapsible.Panel>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Collapsible open style={{ width: 280 }}>
      <Collapsible.Trigger>Project files</Collapsible.Trigger>
      <Collapsible.Panel {...target(0)}>
        <Entries />
      </Collapsible.Panel>
    </Collapsible>
  ),
}

export const Root: Story = {
  name: 'Collapsible',
  parameters: {
    figma: {
      ...disclosure,
      component: 'Collapsible',
      group: 'Collapsible',
      order: 282,
      description:
        'A disclosure composed from Trigger and Panel instances. Replace either part or edit the Panel content slot.',
      slots: {
        parts: {
          description: 'Trigger followed by an optional Panel.',
          preferred: ['Collapsible/Trigger', 'Collapsible/Panel'],
        },
      },
      usage:
        '<Collapsible><Collapsible.Trigger>Project files</Collapsible.Trigger><Collapsible.Panel>…</Collapsible.Panel></Collapsible>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Collapsible open={combo.open === 'true'} {...target(index)} style={{ width: 280 }}>
          <div style={{ display: 'contents' }} {...slot('parts')}>
            <Collapsible.Trigger
              {...part('Collapsible/Trigger', { open: combo.open || 'true', State: 'Default' })}
            >
              <span {...text('label')}>Project files</span>
            </Collapsible.Trigger>
            <Collapsible.Panel {...part('Collapsible/Panel', {})}>
              <Entries />
            </Collapsible.Panel>
          </div>
        </Collapsible>
      )}
    />
  ),
}
