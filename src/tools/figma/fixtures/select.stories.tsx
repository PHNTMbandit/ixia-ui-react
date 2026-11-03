import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '@/components/icon'
import { Select } from '@/components/select'

import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Select',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Trigger: Story = {
  name: 'Select',
  parameters: {
    figma: {
      component: 'Select',
      cva: {
        axes: ['variant', 'size'],
        file: 'src/components/select/select.types.ts',
        name: 'selectVariants',
      },
      description:
        'The closed select field. Edit the value text, toggle or swap the leading icon and the trailing caret. Pair it with Select/Popup to show the open list.',
      group: 'Select',
      interactions: [{ from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' }],
      interactive: { Hover: 'hover' },
      order: 60,
      properties: {
        leadingIcon: '<Icon /> inside <Select.Value>',
        trailingIcon: '<Select.Icon> children',
        value: '<Select.Value placeholder="…"> or the selected label',
      },
      states: ['Default', 'Hover', 'Invalid'],
      usage:
        '<Select items={items}>\n  <Select.Trigger variant="primary" size="medium">\n    <Select.Value placeholder="Choose a fruit" />\n    <Select.Icon><Icon name="chevronsUpDown" /></Select.Icon>\n  </Select.Trigger>\n  <Select.Popup>…</Select.Popup>\n</Select>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Select>
          <Select.Trigger
            {...target(index)}
            aria-invalid={combo.State === 'Invalid' || undefined}
            size={combo.size as 'medium'}
            style={{ width: 240 }}
            variant={combo.variant as 'primary'}
          >
            <Select.Value>
              <Icon name="search" {...swap('leadingIcon', false)} />
              {/* A bare text node would make the trigger match its icon-only style. */}
              <span {...text('value')}>Choose an option</span>
            </Select.Value>
            <Select.Icon {...show('showTrailingIcon')}>
              <Icon name="chevronsUpDown" data-figma-swap="trailingIcon" />
            </Select.Icon>
          </Select.Trigger>
        </Select>
      )}
    />
  ),
}

function ItemContent({ label }: { label: string }) {
  return (
    <>
      <Select.Title {...text('label')}>
        <Icon name="folder" {...swap('leadingIcon', false)} />
        {label}
      </Select.Title>
      <Select.Description {...show('showDescription', false)} {...text('description')}>
        Supporting text
      </Select.Description>
    </>
  )
}

const itemState = (combo: Combo) =>
  combo.State === 'Highlighted' ? { 'data-highlighted': '' } : {}

export const Item: Story = {
  name: 'Select / Item',
  parameters: {
    figma: {
      // The check mark is rendered by Select.Item itself.
      annotate: [
        { attrs: { swap: 'indicatorIcon' }, selector: '[data-figma-target] > :last-child > svg' },
      ],
      component: 'Select/Item',
      description:
        'One option in a Select popup. Edit the label and description, and toggle or swap the leading icon.',
      group: 'Select',
      interactions: [
        { from: { State: 'Default' }, to: { State: 'Highlighted' }, trigger: 'ON_HOVER' },
      ],
      order: 61,
      properties: {
        description: '<Select.Description>',
        label: '<Select.Title>',
        leadingIcon: '<Icon /> inside <Select.Title>',
      },
      states: ['Default', 'Highlighted', 'Selected'],
      usage: '<Select.Item value="apple">\n  <Select.Title>Apple</Select.Title>\n</Select.Item>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ height: 160, width: 280 }}>
          <Select defaultValue={combo.State === 'Selected' ? 'option' : null} modal={false} open>
            <Select.Trigger style={{ width: 240 }}>
              <Select.Value placeholder="Choose" />
            </Select.Trigger>
            <Select.Popup alignItemWithTrigger={false}>
              <Select.List>
                <Select.Item
                  value="option"
                  style={{ width: 228 }}
                  {...target(index)}
                  {...itemState(combo)}
                >
                  <ItemContent label="Option" />
                </Select.Item>
              </Select.List>
            </Select.Popup>
          </Select>
        </div>
      )}
    />
  ),
}

const options = ['Apple', 'Banana', 'Cherry']

export const Popup: Story = {
  name: 'Select / Popup',
  parameters: {
    figma: {
      annotate: [
        {
          attrs: { target: '0' },
          selector: '[data-figma-popup] > [role=listbox], [data-figma-popup] > .bg-surface-2',
        },
      ],
      component: 'Select/Popup',
      description:
        'The open list of a Select. Add, remove or reorder Select/Item instances in the items slot.',
      group: 'Select',
      order: 62,
      properties: { items: '<Select.Item> children of <Select.List>' },
      slots: {
        items: { description: 'Select/Item instances.', only: true, preferred: ['Select/Item'] },
      },
      usage:
        '<Select.Popup>\n  <Select.List>\n    <Select.Item value="apple"><Select.Title>Apple</Select.Title></Select.Item>\n  </Select.List>\n</Select.Popup>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <div style={{ height: 300, padding: 32, width: 320 }}>
      <Select defaultValue="Apple" modal={false} open>
        <Select.Trigger style={{ width: 240 }}>
          <Select.Value />
        </Select.Trigger>
        <Select.Popup alignItemWithTrigger={false} data-figma-popup="">
          <Select.List {...slot('items')}>
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                {...part('Select/Item', {
                  State: option === 'Apple' ? 'Selected' : 'Default',
                })}
              >
                <ItemContent label={option} />
              </Select.Item>
            ))}
          </Select.List>
        </Select.Popup>
      </Select>
    </div>
  ),
}
