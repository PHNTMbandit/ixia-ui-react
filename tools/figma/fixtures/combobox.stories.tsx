import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Combobox } from '../../../src/components/combobox'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Combobox' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const options = ['Apple', 'Banana', 'Cherry']
const inputCva = {
  axes: ['variant', 'size'],
  file: 'src/components/input/input.types.tsx',
  name: 'inputVariants',
}
const highlighted = (combo: Combo) =>
  combo.State === 'Highlighted' ? { 'data-highlighted': '' } : {}

function Open({
  children,
  empty = false,
  selected = false,
}: {
  children: ReactNode
  empty?: boolean
  selected?: boolean
}) {
  return (
    <div style={{ height: 300, width: 300 }}>
      <Combobox open items={empty ? [] : options} defaultValue={selected ? 'Apple' : undefined}>
        <Combobox.Input aria-label="Choose fruit" placeholder="Choose fruit" />
        <Combobox.Popup>{children}</Combobox.Popup>
      </Combobox>
    </div>
  )
}

export const Value: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Value',
      group: 'Combobox',
      order: 340,
      states: ['Placeholder', 'Selected'],
      description:
        'The selected-value text or placeholder. Value is a formatter without its own element; this asset uses its supported render function to expose editable text.',
      defaults: { State: 'Placeholder' },
      properties: { value: 'children render function or placeholder' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Combobox defaultValue={combo.State === 'Selected' ? 'Apple' : undefined}>
          <Combobox.Value>
            {(value: string | undefined) => (
              <span
                {...target(index)}
                {...text('value')}
                className={value ? undefined : 'opacity-70'}
              >
                {value || 'Choose fruit'}
              </span>
            )}
          </Combobox.Value>
        </Combobox>
      )}
    />
  ),
}

export const Chip: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Chip',
      group: 'Combobox',
      order: 341,
      annotate: [
        {
          selector: '[data-combobox-chip] > button',
          attrs: {
            part: 'Button/Icon only',
            variant: '{"tone":"error","variant":"ghost","size":"extraSmall","State":"Default"}',
            show: 'showRemove=true',
          },
        },
        { selector: '[data-combobox-chip] > button svg', attrs: { swap: 'icon' } },
      ],
      description:
        'A selected-value chip with editable text, optional leading icon and a reusable remove Button. The existing React ChipRemove handler is preserved unchanged.',
      properties: { label: 'children', leadingIcon: '<Icon />', showRemove: 'built-in ChipRemove' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Combobox multiple defaultValue={['Apple']}>
      <Combobox.Chips>
        <Combobox.Chip aria-label="Apple" data-combobox-chip="" {...target(0)}>
          <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
          <span {...text('label')}>Apple</span>
        </Combobox.Chip>
      </Combobox.Chips>
      <Combobox.Input aria-label="Choose fruit" />
    </Combobox>
  ),
}

export const Item: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Item',
      group: 'Combobox',
      order: 342,
      states: ['Default', 'Highlighted', 'Selected'],
      annotate: [
        {
          selector: '[data-figma-target] > :last-child > svg',
          attrs: { swap: 'indicatorIcon', show: 'showIndicatorIcon=true' },
        },
      ],
      description:
        'An option with editable text, optional leading icon, and the actual highlighted and selected colors.',
      properties: { label: 'children', leadingIcon: '<Icon />', selected: '<Combobox value>' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open selected={combo.State === 'Selected'}>
          <Combobox.List>
            <Combobox.Item value="Apple" {...target(index)} {...highlighted(combo)}>
              <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Apple</span>
            </Combobox.Item>
          </Combobox.List>
        </Open>
      )}
    />
  ),
}

export const GroupLabel: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Group Label',
      group: 'Combobox',
      order: 343,
      description: 'A sticky heading naming a group of options.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Combobox.List>
        <Combobox.Group>
          <Combobox.GroupLabel {...target(0)} {...text('label')}>
            Fruit
          </Combobox.GroupLabel>
        </Combobox.Group>
      </Combobox.List>
    </Open>
  ),
}

export const Empty: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Empty',
      group: 'Combobox',
      order: 344,
      description: 'The visible no-results feedback, rendered with an actually empty collection.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open empty>
      <Combobox.Empty {...target(0)} {...text('label')}>
        No matching fruit
      </Combobox.Empty>
      <Combobox.List />
    </Open>
  ),
}

export const Status: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Status',
      group: 'Combobox',
      order: 345,
      description:
        'A visible live status message with editable text and an optional swappable icon.',
      properties: { label: 'children', icon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Combobox.Status {...target(0)}>
        <Icon name="info" aria-hidden="true" {...swap('icon', false)} />
        <span {...text('label')}>3 results available</span>
      </Combobox.Status>
      <Combobox.List />
    </Open>
  ),
}

function ChipsContent() {
  return (
    <div {...slot('chips')} style={{ display: 'contents' }}>
      <Combobox.Value>
        {(values: string[]) =>
          values.map((label) => (
            <Combobox.Chip key={label} aria-label={label} {...part('Combobox/Chip', {})}>
              <span {...text('label')}>{label}</span>
            </Combobox.Chip>
          ))
        }
      </Combobox.Value>
    </div>
  )
}

export const Chips: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Chips',
      group: 'Combobox',
      order: 346,
      description:
        'The wrapping selected-value container. Add, remove or reorder real Chip instances in its native slot.',
      slots: {
        chips: { description: 'Selected-value chips.', preferred: ['Combobox/Chip'], only: true },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Combobox multiple defaultValue={['Apple', 'Banana']}>
      <Combobox.Chips {...target(0)} style={{ width: 280 }}>
        <ChipsContent />
      </Combobox.Chips>
      <Combobox.Input aria-label="Choose fruit" />
    </Combobox>
  ),
}

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Trigger',
      group: 'Combobox',
      order: 347,
      states: ['Default', 'Hover', 'Open'],
      interactive: { Hover: 'hover' },
      annotate: [
        {
          selector: '[data-combobox-trigger] > span:first-child',
          attrs: { part: 'Combobox/Value', variant: '{"State":"Placeholder"}', text: 'value' },
        },
        {
          selector: '[data-combobox-trigger] svg',
          attrs: { swap: 'indicatorIcon', show: 'showIndicatorIcon=true' },
        },
      ],
      description:
        'A select-like trigger with a reusable placeholder Value and swappable caret. Open uses the actual popup-open outline.',
      properties: { value: 'placeholder or selected value', indicatorIcon: 'built-in icon' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Combobox open={combo.State === 'Open'} items={options}>
          <Combobox.Trigger
            data-combobox-trigger=""
            {...target(index)}
            placeholder="Choose fruit"
          />
          <Combobox.Popup>
            <Combobox.List>
              <Combobox.Item value="Apple">Apple</Combobox.Item>
            </Combobox.List>
          </Combobox.Popup>
        </Combobox>
      )}
    />
  ),
}

const inputButtons: FigmaSpec['annotate'] = [
  {
    selector: '[data-combobox-input] button[aria-label="Clear selection"]',
    attrs: {
      part: 'Button/Icon only',
      variant: '{"tone":"error","variant":"ghost","size":"extraSmall","State":"Default"}',
      show: 'showClear=true',
    },
  },
  {
    selector: '[data-combobox-input] button[aria-label="Open popup"]',
    attrs: {
      part: 'Button/Icon only',
      variant: '{"tone":"brand","variant":"ghost","size":"extraSmall","State":"Default"}',
    },
  },
  { selector: '[data-combobox-input] button svg', attrs: { swap: 'icon' } },
]

function markInput(
  input: HTMLInputElement | null,
  index: number,
  isPart = false,
  variant: Combo = {},
) {
  const group = input?.parentElement?.parentElement
  if (!group) return
  group.setAttribute('data-combobox-input', '')
  if (isPart) {
    group.setAttribute('data-figma-part', 'Combobox/Input')
    group.setAttribute('data-figma-variant', JSON.stringify(variant))
  } else {
    group.setAttribute('data-figma-target', String(index))
  }
}

export const Input: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Input',
      group: 'Combobox',
      order: 348,
      cva: inputCva,
      axes: { multiple: ['false', 'true'] },
      annotate: inputButtons,
      description:
        'The full input surface with actual size and appearance variants, reusable clear/open buttons, and a native selected-chips slot for multiple mode.',
      slots: {
        selections: { description: 'Selected-value chips.', preferred: ['Combobox/Chips'], max: 1 },
      },
      properties: { value: 'placeholder or input value', multiple: '<Combobox multiple>' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ width: 300 }}>
          <Combobox
            multiple={combo.multiple === 'true'}
            defaultValue={combo.multiple === 'true' ? ['Apple', 'Banana'] : undefined}
          >
            <Combobox.Input
              aria-label="Choose fruit"
              placeholder="Choose fruit"
              size={combo.size as 'medium'}
              variant={combo.variant as 'primary'}
              {...text('value')}
              ref={(input) => markInput(input, index)}
            >
              {combo.multiple === 'true' && (
                <div {...slot('selections')} style={{ display: 'contents' }}>
                  <Combobox.Chips {...part('Combobox/Chips', {})}>
                    <ChipsContent />
                  </Combobox.Chips>
                </div>
              )}
            </Combobox.Input>
          </Combobox>
        </div>
      )}
    />
  ),
}

export const InlineInput: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Inline Input',
      group: 'Combobox',
      order: 349,
      states: ['Default', 'Hover', 'Focus', 'Disabled'],
      interactive: { Hover: 'hover', Focus: 'focus' },
      description:
        'The actual inline Input branch used inside popups. Its fixed sizing and surface differ from the normal Input variants.',
      properties: { value: 'placeholder or input value', inline: 'true' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Combobox disabled={combo.State === 'Disabled'}>
          <Combobox.Input
            inline
            aria-label="Search fruit"
            placeholder="Search fruit"
            {...target(index)}
            {...text('value')}
            style={{ width: 240 }}
          />
        </Combobox>
      )}
    />
  ),
}

function Options() {
  return (
    <div {...slot('items')} style={{ display: 'contents' }}>
      {options.map((label) => (
        <Combobox.Item key={label} value={label} {...part('Combobox/Item', { State: 'Default' })}>
          <span {...text('label')}>{label}</span>
        </Combobox.Item>
      ))}
    </div>
  )
}

export const Group: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Group',
      group: 'Combobox',
      order: 350,
      description:
        'A semantic option group composed from a reusable label and a variable-count items slot.',
      slots: {
        content: {
          description: 'Group label and options.',
          preferred: ['Combobox/Group Label', 'Combobox/Item'],
        },
        items: { description: 'Group options.', preferred: ['Combobox/Item'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Combobox.List>
        <Combobox.Group {...target(0)}>
          <div {...slot('content')} style={{ display: 'contents' }}>
            <Combobox.GroupLabel {...part('Combobox/Group Label', {})} {...text('label')}>
              Fruit
            </Combobox.GroupLabel>
            <Options />
          </div>
        </Combobox.Group>
      </Combobox.List>
    </Open>
  ),
}

export const List: Story = {
  parameters: {
    figma: {
      component: 'Combobox/List',
      group: 'Combobox',
      order: 351,
      description:
        'A scrollable list with real reusable Item instances in a native variable-count slot.',
      slots: {
        items: {
          description: 'Options and groups.',
          preferred: ['Combobox/Item', 'Combobox/Group'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Combobox.List {...target(0)}>
        <Options />
      </Combobox.List>
    </Open>
  ),
}

export const VirtualizedList: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Virtualized List',
      group: 'Combobox',
      order: 352,
      annotate: [
        {
          selector: '[data-virtual-list] > div',
          attrs: { slot: 'items' },
          style: { display: 'flex', flexDirection: 'column', height: 'auto' },
        },
        {
          selector: '[data-virtual-list] > div > [role=option]',
          attrs: { part: 'Combobox/Item', variant: '{"State":"Default"}' },
          style: { position: 'relative', transform: 'none', top: 'auto', left: 'auto' },
        },
      ],
      description:
        'The real virtualized option viewport with reusable Item instances. Capture normalizes its absolute-positioned rows to equivalent auto-layout rows; runtime virtualization is unchanged.',
      slots: {
        items: {
          description: 'Visible options; virtualized from data in code.',
          preferred: ['Combobox/Item'],
          only: true,
        },
      },
      usage:
        '<Combobox items={items} virtualized open><Combobox.Input aria-label="Search" /><Combobox.Popup><Combobox.VirtualizedList open>{item => item.label}</Combobox.VirtualizedList></Combobox.Popup></Combobox>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Combobox open virtualized items={options}>
      <div style={{ width: 300 }}>
        <Combobox.Input aria-label="Choose fruit" />
      </div>
      <Combobox.Popup>
        <Combobox.List>
          <Combobox.VirtualizedList<string> open data-virtual-list="" {...target(0)}>
            {(label) => <span {...text('label')}>{label}</span>}
          </Combobox.VirtualizedList>
        </Combobox.List>
      </Combobox.Popup>
    </Combobox>
  ),
}

function Results({ state }: { state?: string }) {
  return (
    <div {...slot('content')} style={{ display: 'contents' }}>
      {state === 'Empty' && (
        <Combobox.Empty {...part('Combobox/Empty', {})} {...text('label')}>
          No matching fruit
        </Combobox.Empty>
      )}
      {state === 'Loading' && (
        <Combobox.Status {...part('Combobox/Status', {})}>
          <span {...text('label')}>Searching…</span>
        </Combobox.Status>
      )}
      <Combobox.List {...part('Combobox/List', {})}>
        {(state === 'Default' || !state) && <Options />}
      </Combobox.List>
    </div>
  )
}

export const Popup: Story = {
  parameters: {
    figma: {
      component: 'Combobox/Popup',
      group: 'Combobox',
      order: 353,
      states: ['Default', 'Empty', 'Loading'],
      description:
        'The open popup surface with a reusable List and optional Empty or Status feedback. Content is a native slot for composing search and results.',
      slots: {
        content: {
          description: 'Popup content.',
          preferred: [
            'Combobox/Inline Input',
            'Combobox/List',
            'Combobox/Virtualized List',
            'Combobox/Empty',
            'Combobox/Status',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ width: 300, height: 300 }}>
          <Combobox open items={combo.State === 'Default' || !combo.State ? options : []}>
            <Combobox.Input aria-label="Choose fruit" placeholder="Choose fruit" />
            <Combobox.Popup
              ref={(node) => {
                node?.firstElementChild?.setAttribute('data-figma-target', String(index))
              }}
            >
              <Results state={combo.State} />
            </Combobox.Popup>
          </Combobox>
        </div>
      )}
    />
  ),
}

export const Root: Story = {
  name: 'Combobox',
  parameters: {
    figma: {
      component: 'Combobox',
      group: 'Combobox',
      order: 354,
      cva: inputCva,
      axes: { multiple: ['false', 'true'] },
      annotate: inputButtons,
      description:
        'A closed editable combobox composed from a reusable Input and optional Chips. Pair with Popup for open options; Root and Collection only supply behavior.',
      slots: {
        field: { description: 'Editable combobox field.', preferred: ['Combobox/Input'], max: 1 },
      },
      usage:
        '<Combobox items={items} multiple><Combobox.Input aria-label="Choose fruit"><Combobox.Chips><Combobox.Value>{values => values.map(value => <Combobox.Chip key={value}>{value}</Combobox.Chip>)}</Combobox.Value></Combobox.Chips></Combobox.Input><Combobox.Popup><Combobox.List>…</Combobox.List></Combobox.Popup></Combobox>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Combobox
          multiple={combo.multiple === 'true'}
          defaultValue={combo.multiple === 'true' ? ['Apple', 'Banana'] : undefined}
        >
          <div {...target(index)} style={{ width: 300 }}>
            <div {...slot('field')}>
              <Combobox.Input
                aria-label="Choose fruit"
                placeholder="Choose fruit"
                size={combo.size as 'medium'}
                variant={combo.variant as 'primary'}
                {...text('value')}
                ref={(input) =>
                  markInput(input, index, true, {
                    size: combo.size || 'medium',
                    variant: combo.variant || 'primary',
                    multiple: combo.multiple || 'false',
                  })
                }
              >
                {combo.multiple === 'true' && (
                  <div {...slot('selections')} style={{ display: 'contents' }}>
                    <Combobox.Chips {...part('Combobox/Chips', {})}>
                      <ChipsContent />
                    </Combobox.Chips>
                  </div>
                )}
              </Combobox.Input>
            </div>
          </div>
        </Combobox>
      )}
    />
  ),
}
