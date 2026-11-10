import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd } from '../../../src/components/kbd'
import { Matrix, part, slot, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Kbd',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Key: Story = {
  name: 'Kbd',
  parameters: {
    figma: {
      component: 'Kbd',
      description: 'One keycap. Edit the key label; group keys with Kbd Group.',
      group: 'Kbd',
      order: 100,
      properties: { label: 'children (text)' },
      usage: '<Kbd>Ctrl</Kbd>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Kbd {...target(index)} {...text('label')}>
          Ctrl
        </Kbd>
      )}
    />
  ),
}

const keys = ['Ctrl', 'Shift', 'P']

export const Group: Story = {
  name: 'Kbd / Group',
  parameters: {
    figma: {
      component: 'Kbd/Group',
      description:
        'A key combination. Add, remove or reorder Kbd instances in the keys slot and edit each label.',
      group: 'Kbd',
      order: 101,
      properties: { keys: '<Kbd> children' },
      slots: { keys: { description: 'Kbd instances.', only: true, preferred: ['Kbd'] } },
      usage: '<Kbd.Group>\n  <Kbd>Ctrl</Kbd>\n  <Kbd>Shift</Kbd>\n  <Kbd>P</Kbd>\n</Kbd.Group>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Kbd.Group {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('keys')}>
            {keys.map((key) => (
              <Kbd key={key} {...part('Kbd', {})} {...text('label')}>
                {key}
              </Kbd>
            ))}
          </div>
        </Kbd.Group>
      )}
    />
  ),
}
