import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { Accordion } from '../../../src/components/accordion'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Accordion',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const titles = ['Shipping details', 'Billing address', 'Order notes']

// Accordion draws its separators with divide-y between items. In Figma each item carries an
// optional top separator instead, so items can be reordered inside the items slot.
function Item({
  combo,
  separator = false,
  style,
  title = 'Accordion title',
  ...annotations
}: {
  combo: Combo
  separator?: boolean
  style?: CSSProperties
  title?: string
} & Record<`data-${string}`, string>) {
  return (
    <Accordion.Item
      {...annotations}
      size={combo.size as 'medium'}
      style={style}
      tone={combo.tone as 'brand'}
      value={title}
    >
      <div className="h-px bg-border" {...show('showSeparator', separator)} />
      <Accordion.Header>
        <Accordion.HeaderContent>
          <Accordion.Icon {...show('showIcon', false)}>
            <Icon name="info" data-figma-swap="icon" />
          </Accordion.Icon>
          <Accordion.Title {...text('title')}>{title}</Accordion.Title>
          <Accordion.Subtitle {...show('showSubtitle', false)} {...text('subtitle')}>
            Supporting text
          </Accordion.Subtitle>
        </Accordion.HeaderContent>
        <Accordion.ExpandIcon {...show('showExpandIcon')}>
          <Icon name="chevronDown" data-figma-swap="expandIcon" />
        </Accordion.ExpandIcon>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="flex flex-col gap-xs" {...slot('content')}>
          <p className="style-text-prose-0 text-on-surface-variant">
            Panel content. Replace it with any layers.
          </p>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export const AccordionItem: Story = {
  name: 'Accordion / Item',
  parameters: {
    figma: {
      component: 'Accordion/Item',
      cva: {
        axes: ['tone', 'size'],
        file: 'src/components/accordion/accordion.types.ts',
        name: 'accordionItemVariants',
      },
      description:
        'One collapsible section. Edit the title and subtitle, swap the leading and expand icons, and drop any layers into the content slot. Click a Hover item to preview the Open state.',
      group: 'Accordion',
      interactions: [
        { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
        { from: { State: 'Hover' }, to: { State: 'Open' }, trigger: 'ON_CLICK' },
        { from: { State: 'Open' }, to: { State: 'Default' }, trigger: 'ON_CLICK' },
      ],
      interactive: { Hover: 'hover' },
      order: 20,
      properties: {
        content: '<Accordion.Panel> children',
        expandIcon: '<Accordion.ExpandIcon> children',
        icon: '<Accordion.Icon> children',
        showSeparator: '<Accordion withSeparator> (between items)',
        subtitle: '<Accordion.Subtitle>',
        title: '<Accordion.Title>',
      },
      slots: {
        content: { description: 'Panel content shown when the item is open.' },
      },
      states: ['Default', 'Hover', 'Open'],
      usage:
        '<Accordion.Item value="shipping" tone="brand" size="medium">\n  <Accordion.Header>\n    <Accordion.HeaderContent>\n      <Accordion.Title>Shipping details</Accordion.Title>\n    </Accordion.HeaderContent>\n    <Accordion.ExpandIcon />\n  </Accordion.Header>\n  <Accordion.Panel>…</Accordion.Panel>\n</Accordion.Item>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Accordion
          defaultValue={combo.State === 'Open' ? ['Accordion title'] : []}
          style={{ width: 400 }}
          variant="ghost"
          withSeparator={false}
        >
          <Item combo={combo} style={{ width: 400 }} {...target(index)} />
        </Accordion>
      )}
    />
  ),
}

export const AccordionSet: Story = {
  name: 'Accordion',
  parameters: {
    figma: {
      component: 'Accordion',
      cva: {
        axes: ['variant'],
        file: 'src/components/accordion/accordion.types.ts',
        name: 'accordionVariants',
      },
      description:
        'A vertical stack of Accordion items. Add, remove or reorder Accordion/Item instances in the items slot; turn on showSeparator on every item except the first to match withSeparator.',
      group: 'Accordion',
      order: 21,
      properties: { items: '<Accordion.Item> children' },
      slots: {
        items: {
          description: 'Accordion/Item instances.',
          only: true,
          preferred: ['Accordion/Item'],
        },
      },
      usage:
        '<Accordion variant="surface">\n  <Accordion.Item value="a">…</Accordion.Item>\n  <Accordion.Item value="b">…</Accordion.Item>\n</Accordion>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Accordion
          {...target(index)}
          style={{ width: 400 }}
          variant={combo.variant as 'surface'}
          withSeparator={false}
        >
          <div className="flex flex-col" {...slot('items')}>
            {titles.map((title, item) => (
              <Item
                combo={{ size: 'medium', tone: 'brand' }}
                key={title}
                separator={item > 0}
                title={title}
                {...part('Accordion/Item', { size: 'medium', State: 'Default', tone: 'brand' })}
              />
            ))}
          </div>
        </Accordion>
      )}
    />
  ),
}
