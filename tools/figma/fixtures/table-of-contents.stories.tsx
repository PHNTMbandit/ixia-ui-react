import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import { TableOfContents } from '../../../src/components/table-of-contents'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Table Of Contents',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const cva = {
  file: 'src/components/table-of-contents/table-of-contents.types.ts',
  name: 'tableOfContentsItemVariants',
}

export const Item: Story = {
  name: 'Table Of Contents / Item',
  parameters: {
    figma: {
      component: 'Table Of Contents/Item',
      cva: { ...cva, axes: ['depth'] },
      description:
        'One heading link. Set depth to indent nested headings, edit the label, and use the Active state for the section currently in view.',
      group: 'Table Of Contents',
      interactions: [
        { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
        { from: { State: 'Hover' }, to: { State: 'Active' }, trigger: 'ON_CLICK' },
      ],
      interactive: { Hover: 'hover' },
      order: 150,
      properties: { label: '<TableOfContents.Item> children (text)' },
      states: ['Default', 'Hover', 'Active'],
      usage: '<TableOfContents.Item targetId="overview" depth={1}>Overview</TableOfContents.Item>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <TableOfContents>
          <TableOfContents.Item
            data-in-view={combo.State === 'Active'}
            depth={Number(combo.depth) as 1}
            targetId="figma-toc-target"
            {...target(index)}
            {...text('label')}
          >
            Section heading
          </TableOfContents.Item>
        </TableOfContents>
      )}
    />
  ),
}

export const Title: Story = {
  name: 'Table Of Contents / Title',
  parameters: {
    figma: {
      component: 'Table Of Contents/Title',
      description: 'The heading above the list. Edit the label, and toggle or swap the icon.',
      group: 'Table Of Contents',
      order: 151,
      properties: { icon: '<Icon /> before the label', label: 'children (text)' },
      usage:
        '<TableOfContents.Title>\n  <Icon name="list" />\n  On this page\n</TableOfContents.Title>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <TableOfContents.Title {...target(index)} {...text('label')}>
          <Icon name="folder" {...swap('icon')} />
          On this page
        </TableOfContents.Title>
      )}
    />
  ),
}

const item = part('Table Of Contents/Item', { State: 'Default', depth: '1' })

export const List: Story = {
  name: 'Table Of Contents / List',
  parameters: {
    figma: {
      component: 'Table Of Contents/List',
      description:
        'The indented list with its progress rail. Add, remove or reorder Item instances in the items slot.',
      group: 'Table Of Contents',
      order: 152,
      properties: { items: '<TableOfContents.Item> children' },
      slots: {
        items: {
          description: 'Table Of Contents Item instances, in order.',
          only: true,
          preferred: ['Table Of Contents/Item'],
        },
      },
      usage:
        '<TableOfContents.List>\n  <TableOfContents.Item targetId="overview">Overview</TableOfContents.Item>\n</TableOfContents.List>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <TableOfContents>
          <TableOfContents.List {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('items')}>
              {['Overview', 'Details', 'Summary'].map((label) => (
                <TableOfContents.Item
                  key={label}
                  targetId="figma-toc-target"
                  {...item}
                  {...text('label')}
                >
                  {label}
                </TableOfContents.Item>
              ))}
            </div>
          </TableOfContents.List>
        </TableOfContents>
      )}
    />
  ),
}

export const Root: Story = {
  name: 'Table Of Contents',
  parameters: {
    figma: {
      component: 'Table Of Contents',
      description:
        'A table of contents for a long page. Put a Title and a List instance in the content slot.',
      group: 'Table Of Contents',
      order: 153,
      properties: { content: '<TableOfContents.Title> and <TableOfContents.List> children' },
      slots: {
        content: {
          description: 'Table Of Contents Title and List instances.',
          only: true,
          preferred: ['Table Of Contents/Title', 'Table Of Contents/List'],
        },
      },
      usage:
        '<TableOfContents>\n  <TableOfContents.Title>On this page</TableOfContents.Title>\n  <TableOfContents.List>\n    <TableOfContents.Item targetId="overview">Overview</TableOfContents.Item>\n  </TableOfContents.List>\n</TableOfContents>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <TableOfContents {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('content')}>
            <TableOfContents.Title {...part('Table Of Contents/Title', {})} {...text('label')}>
              <Icon name="folder" {...swap('icon')} />
              On this page
            </TableOfContents.Title>
            <TableOfContents.List {...part('Table Of Contents/List', {})}>
              {['Overview', 'Details', 'Summary'].map((label) => (
                <TableOfContents.Item
                  key={label}
                  targetId="figma-toc-target"
                  {...item}
                  {...text('label')}
                >
                  {label}
                </TableOfContents.Item>
              ))}
            </TableOfContents.List>
          </div>
        </TableOfContents>
      )}
    />
  ),
}
