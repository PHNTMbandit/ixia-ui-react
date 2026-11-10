import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import type { IconName } from '../../../src/components/icon'
import { defaultIcons } from '../../../src/components/icon/default-icons'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Icon',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Icons: Story = {
  parameters: {
    figma: {
      component: 'Icon',
      description:
        'Icons from the ixia UI icon registry. Every icon slot in the library is an instance swap restricted to these components.',
      group: 'Icon',
      icons: true,
      order: 0,
      usage: '<Icon name="add" />',
    } satisfies FigmaSpec,
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 32 }}>
      {(Object.keys(defaultIcons) as IconName[]).map((name) => (
        <Icon key={name} name={name} data-figma-icon-def={name} width={24} height={24} />
      ))}
    </div>
  ),
}
