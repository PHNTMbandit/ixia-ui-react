import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from '../../../src/components/breadcrumb'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Breadcrumb',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const hover = {
  interactions: [{ from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' }],
  interactive: { Hover: 'hover' },
  states: ['Default', 'Hover'],
} satisfies Partial<FigmaSpec>

export const Link: Story = {
  name: 'Breadcrumb / Link',
  parameters: {
    figma: {
      ...hover,
      component: 'Breadcrumb/Link',
      description:
        'A previous level in the trail. Edit the label, and toggle or swap the leading icon.',
      group: 'Breadcrumb',
      order: 110,
      properties: { label: 'children (text)', leadingIcon: '<Icon /> before the label' },
      usage: '<Breadcrumb.Link>\n  <Icon name="folder" />\n  Documentation\n</Breadcrumb.Link>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Breadcrumb.Link {...target(index)} {...text('label')}>
          <Icon name="folder" {...swap('leadingIcon', false)} />
          Documentation
        </Breadcrumb.Link>
      )}
    />
  ),
}

export const Item: Story = {
  name: 'Breadcrumb / Item',
  parameters: {
    figma: {
      component: 'Breadcrumb/Item',
      description:
        'The current page, usually last in the trail. Edit the label, and toggle or swap the leading icon.',
      group: 'Breadcrumb',
      order: 111,
      properties: { label: 'children (text)', leadingIcon: '<Icon /> before the label' },
      usage: '<Breadcrumb.Item aria-current="page">Buttons</Breadcrumb.Item>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Breadcrumb.Item {...target(index)} {...text('label')}>
          <Icon name="folder" {...swap('leadingIcon', false)} />
          Buttons
        </Breadcrumb.Item>
      )}
    />
  ),
}

export const Separator: Story = {
  name: 'Breadcrumb / Separator',
  parameters: {
    figma: {
      component: 'Breadcrumb/Separator',
      description: 'The chevron between two segments. Its icon is fixed in code.',
      group: 'Breadcrumb',
      order: 112,
      usage: '<Breadcrumb.Separator />',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(_combo, index) => <Breadcrumb.Separator {...target(index)} />} />,
}

export const Ellipsis: Story = {
  name: 'Breadcrumb / Ellipsis',
  parameters: {
    figma: {
      ...hover,
      component: 'Breadcrumb/Ellipsis',
      description: 'Stands in for collapsed levels in a long trail.',
      group: 'Breadcrumb',
      order: 113,
      usage: '<Breadcrumb.Ellipsis />',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(_combo, index) => <Breadcrumb.Ellipsis {...target(index)} />} />,
}

// Segments use each part's default variant.
const segment = (name: string) => part(`Breadcrumb/${name}`, {})

export const Trail: Story = {
  name: 'Breadcrumb',
  parameters: {
    figma: {
      component: 'Breadcrumb',
      description:
        'A breadcrumb trail. Add, remove, reorder or replace Link, Separator, Ellipsis and Item instances in the items slot, and end with an Item for the current page.',
      group: 'Breadcrumb',
      order: 114,
      properties: { items: '<Breadcrumb.Link>, .Separator, .Ellipsis and .Item children' },
      slots: {
        items: {
          description: 'Breadcrumb Link, Separator, Ellipsis and Item instances, in order.',
          only: true,
          preferred: [
            'Breadcrumb/Link',
            'Breadcrumb/Separator',
            'Breadcrumb/Ellipsis',
            'Breadcrumb/Item',
          ],
        },
      },
      usage:
        '<Breadcrumb aria-label="Breadcrumb">\n  <Breadcrumb.Link>\n    <Icon name="folder" />\n    Home\n  </Breadcrumb.Link>\n  <Breadcrumb.Separator />\n  <Breadcrumb.Link>Documentation</Breadcrumb.Link>\n  <Breadcrumb.Separator />\n  <Breadcrumb.Item aria-current="page">Buttons</Breadcrumb.Item>\n</Breadcrumb>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Breadcrumb aria-label="Breadcrumb" {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('items')}>
            <Breadcrumb.Link {...segment('Link')} {...text('label')}>
              <Icon name="folder" {...swap('leadingIcon')} />
              Home
            </Breadcrumb.Link>
            <Breadcrumb.Separator {...segment('Separator')} />
            <Breadcrumb.Link {...segment('Link')} {...text('label')}>
              Documentation
            </Breadcrumb.Link>
            <Breadcrumb.Separator {...segment('Separator')} />
            <Breadcrumb.Item {...segment('Item')} {...text('label')}>
              Buttons
            </Breadcrumb.Item>
          </div>
        </Breadcrumb>
      )}
    />
  ),
}
