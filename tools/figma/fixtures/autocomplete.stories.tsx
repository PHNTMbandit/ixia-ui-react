import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Autocomplete } from '../../../src/components/autocomplete'
import type { AutocompleteGridContentProps } from '../../../src/components/autocomplete'
import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Autocomplete' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const options = ['Apple', 'Banana', 'Cherry']
const symbols = ['★', '♥', '◆', '●', '▲']
const inputCva = {
  axes: ['variant', 'size'],
  file: 'src/components/input/input.types.tsx',
  name: 'inputVariants',
}
const highlight = { states: ['Default', 'Highlighted'] } satisfies Partial<FigmaSpec>
const highlighted = (combo: Combo) =>
  combo.State === 'Highlighted' ? { 'data-highlighted': '' } : {}

function Open({ children, empty = false }: { children: ReactNode; empty?: boolean }) {
  return (
    <div style={{ width: 280, height: 260 }}>
      <Autocomplete open items={empty ? [] : options}>
        <Autocomplete.InputGroup>
          <Autocomplete.InputGroupInput aria-label="Search fruit" placeholder="Search fruit" />
        </Autocomplete.InputGroup>
        <Autocomplete.Content>{children}</Autocomplete.Content>
      </Autocomplete>
    </div>
  )
}

export const InputGroupInput: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Input Group Input',
      group: 'Autocomplete',
      order: 310,
      cva: { ...inputCva, axes: ['size'] },
      description:
        'The native autocomplete input without its group surface. Text and size remain editable; the surrounding Input Group supplies appearance.',
      properties: { value: 'placeholder or value' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Autocomplete>
          <Autocomplete.InputGroup size={combo.size as 'medium'} style={{ width: 240 }}>
            <Autocomplete.InputGroupInput
              aria-label="Search fruit"
              placeholder="Search fruit"
              {...target(index)}
              {...text('value')}
            />
          </Autocomplete.InputGroup>
        </Autocomplete>
      )}
    />
  ),
}

export const InputGroupAddon: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Input Group Addon',
      group: 'Autocomplete',
      order: 311,
      description:
        'A reusable input adornment with a native content slot and a swappable decorative icon.',
      slots: {
        content: { description: 'Icons or supporting content.', preferred: ['Icon', 'Kbd/Group'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Autocomplete.InputGroupAddon {...target(0)}>
      <div {...slot('content')} style={{ display: 'contents' }}>
        <Icon name="search" aria-hidden="true" {...swap('icon')} />
      </div>
    </Autocomplete.InputGroupAddon>
  ),
}

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Trigger',
      group: 'Autocomplete',
      order: 312,
      description:
        'A named trigger for a popup-only autocomplete, using a reusable Button in its native control slot.',
      slots: {
        control: {
          description: 'One opening control.',
          preferred: ['Button', 'Button/Icon only'],
          max: 1,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Autocomplete>
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <div {...slot('control')} style={{ display: 'contents' }}>
          <Autocomplete.Trigger
            render={<Button tone="neutral" variant="outline" />}
            {...part('Button', { tone: 'neutral', variant: 'outline', State: 'Default' })}
          >
            <Icon name="search" aria-hidden="true" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Choose a symbol</span>
          </Autocomplete.Trigger>
        </div>
      </div>
    </Autocomplete>
  ),
}

export const Item: Story = {
  parameters: {
    figma: {
      ...highlight,
      component: 'Autocomplete/Item',
      group: 'Autocomplete',
      order: 313,
      description:
        'A list suggestion with editable text, optional swappable leading icon and the real highlighted state.',
      properties: { label: 'children', leadingIcon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <Autocomplete.Item value="Apple" {...target(index)} {...highlighted(combo)}>
            <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Apple</span>
          </Autocomplete.Item>
        </Open>
      )}
    />
  ),
}

function gridRef(node: HTMLDivElement | null, index?: number) {
  node?.querySelector('input')?.setAttribute('aria-label', 'Search symbols')
  if (index !== undefined) node?.firstElementChild?.setAttribute('data-figma-target', String(index))
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: 300, height: 260 }}>
      <Autocomplete open grid items={symbols}>
        <Autocomplete.Trigger
          aria-label="Choose symbol"
          render={<Button size="small" tone="neutral" variant="outline" />}
        >
          <Icon name="add" aria-hidden="true" />
        </Autocomplete.Trigger>
        <Autocomplete.GridContent emptyText="No matching symbols" ref={(node) => gridRef(node)}>
          {children}
        </Autocomplete.GridContent>
      </Autocomplete>
    </div>
  )
}

export const GridItem: Story = {
  parameters: {
    figma: {
      ...highlight,
      component: 'Autocomplete/Grid Item',
      group: 'Autocomplete',
      order: 314,
      description:
        'A compact grid suggestion, in a real Row and grid-mode root. The visible symbol is editable.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Grid>
          <Autocomplete.Row>
            <Autocomplete.GridItem
              value="★"
              aria-label="Star"
              {...target(index)}
              {...highlighted(combo)}
            >
              <span {...text('label')}>★</span>
            </Autocomplete.GridItem>
          </Autocomplete.Row>
        </Grid>
      )}
    />
  ),
}

export const GroupLabel: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Group Label',
      group: 'Autocomplete',
      order: 315,
      description: 'A sticky label naming a group of suggestions.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Autocomplete.Group>
        <Autocomplete.GroupLabel {...target(0)} {...text('label')}>
          Fruit
        </Autocomplete.GroupLabel>
      </Autocomplete.Group>
    </Open>
  ),
}

export const Empty: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Empty',
      group: 'Autocomplete',
      order: 316,
      description: 'The visible no-results message, rendered with an actually empty collection.',
      properties: { label: 'children', icon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open empty>
      <Autocomplete.Empty {...target(0)}>
        <Icon name="search" aria-hidden="true" {...swap('icon', false)} />
        <span {...text('label')}>No matches found</span>
      </Autocomplete.Empty>
    </Open>
  ),
}

export const Status: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Status',
      group: 'Autocomplete',
      order: 317,
      description:
        'A live status message for loading or result counts, with editable text and an optional icon.',
      properties: { label: 'children', icon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Autocomplete.Status {...target(0)}>
        <Icon name="info" aria-hidden="true" {...swap('icon', false)} />
        <span {...text('label')}>3 results available</span>
      </Autocomplete.Status>
    </Open>
  ),
}

function InputParts({ size = 'medium' }: { size?: string }) {
  return (
    <div {...slot('content')} style={{ display: 'contents' }}>
      <Autocomplete.InputGroupInput
        aria-label="Search fruit"
        placeholder="Search fruit"
        {...part('Autocomplete/Input Group Input', { size })}
        {...text('value')}
      />
      <Autocomplete.InputGroupAddon {...part('Autocomplete/Input Group Addon', {})}>
        <div {...slot('content')} style={{ display: 'contents' }}>
          <Icon name="search" aria-hidden="true" {...swap('icon')} />
        </div>
      </Autocomplete.InputGroupAddon>
    </div>
  )
}

export const InputGroup: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Input Group',
      group: 'Autocomplete',
      order: 318,
      cva: inputCva,
      states: ['Default', 'Hover', 'Focus', 'Invalid', 'Disabled'],
      interactive: { Hover: 'hover', Focus: 'focus' },
      description:
        'The input surface with actual input variants and size, composed from reusable Input and Addon parts in a native slot.',
      slots: {
        content: {
          description: 'Input and adornments.',
          preferred: ['Autocomplete/Input Group Input', 'Autocomplete/Input Group Addon'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Autocomplete disabled={combo.State === 'Disabled'}>
          <Autocomplete.InputGroup
            {...target(index)}
            tabIndex={-1}
            size={combo.size as 'medium'}
            variant={combo.variant as 'primary'}
            aria-invalid={combo.State === 'Invalid' || undefined}
            data-disabled={combo.State === 'Disabled' || undefined}
            style={{ width: 280 }}
          >
            <InputParts size={combo.size || 'medium'} />
          </Autocomplete.InputGroup>
        </Autocomplete>
      )}
    />
  ),
}

function Options() {
  return (
    <div {...slot('items')} style={{ display: 'contents' }}>
      {options.map((label) => (
        <Autocomplete.Item
          key={label}
          value={label}
          {...part('Autocomplete/Item', { State: 'Default' })}
        >
          <span {...text('label')}>{label}</span>
        </Autocomplete.Item>
      ))}
    </div>
  )
}

export const Group: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Group',
      group: 'Autocomplete',
      order: 319,
      description:
        'A group composed from its reusable label and a variable-count native items slot.',
      slots: {
        content: {
          description: 'Group label and suggestions.',
          preferred: ['Autocomplete/Group Label', 'Autocomplete/Item'],
        },
        items: { description: 'Suggestions.', preferred: ['Autocomplete/Item'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <Autocomplete.Group {...target(0)}>
        <div {...slot('content')} style={{ display: 'contents' }}>
          <Autocomplete.GroupLabel {...part('Autocomplete/Group Label', {})} {...text('label')}>
            Fruit
          </Autocomplete.GroupLabel>
          <Options />
        </div>
      </Autocomplete.Group>
    </Open>
  ),
}

function Cells() {
  return (
    <>
      {symbols.map((symbol, index) => (
        <Autocomplete.GridItem
          key={symbol}
          value={symbol}
          aria-label={['Star', 'Heart', 'Diamond', 'Circle', 'Triangle'][index]}
          {...part('Autocomplete/Grid Item', { State: 'Default' })}
        >
          <span {...text('label')}>{symbol}</span>
        </Autocomplete.GridItem>
      ))}
    </>
  )
}

export const Row: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Row',
      group: 'Autocomplete',
      order: 320,
      description:
        'A real five-column suggestion row. Its native slot accepts reusable Grid Item instances.',
      slots: {
        items: {
          description: 'Grid cells, up to five per row.',
          preferred: ['Autocomplete/Grid Item'],
          only: true,
          max: 5,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Grid>
      <div {...target(0)}>
        <Autocomplete.Row {...slot('items')}>
          <Cells />
        </Autocomplete.Row>
      </div>
    </Grid>
  ),
}

function ResultGroup() {
  return (
    <Autocomplete.Group {...part('Autocomplete/Group', {})}>
      <div {...slot('content')} style={{ display: 'contents' }}>
        <Autocomplete.GroupLabel {...part('Autocomplete/Group Label', {})} {...text('label')}>
          Fruit
        </Autocomplete.GroupLabel>
        <Options />
      </div>
    </Autocomplete.Group>
  )
}

function Results({ state }: { state?: string }) {
  return (
    <div {...slot('items')} style={{ display: 'contents' }}>
      {state === 'Empty' ? (
        <Autocomplete.Empty {...part('Autocomplete/Empty', {})}>
          <span {...text('label')}>No matches found</span>
        </Autocomplete.Empty>
      ) : state === 'Loading' ? (
        <Autocomplete.Status {...part('Autocomplete/Status', {})}>
          <span {...text('label')}>Searching…</span>
        </Autocomplete.Status>
      ) : (
        <ResultGroup />
      )}
    </div>
  )
}

export const Content: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Content',
      group: 'Autocomplete',
      order: 321,
      states: ['Default', 'Empty', 'Loading'],
      description:
        'The list popup, containing reusable groups, items, empty or status messages. Add or reorder results in the native slot.',
      slots: {
        items: {
          description: 'Suggestions or feedback.',
          preferred: [
            'Autocomplete/Group',
            'Autocomplete/Item',
            'Autocomplete/Empty',
            'Autocomplete/Status',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ width: 300, height: 280 }}>
          <Autocomplete open items={combo.State === 'Default' || !combo.State ? options : []}>
            <Autocomplete.InputGroup>
              <InputParts />
            </Autocomplete.InputGroup>
            <Autocomplete.Content
              ref={(node) => {
                node?.firstElementChild?.setAttribute('data-figma-target', String(index))
              }}
            >
              <Results state={combo.State} />
            </Autocomplete.Content>
          </Autocomplete>
        </div>
      )}
    />
  ),
}

export const GridContent: Story = {
  parameters: {
    figma: {
      component: 'Autocomplete/Grid Content',
      group: 'Autocomplete',
      order: 322,
      cva: { ...inputCva, axes: ['variant'] },
      states: ['Default', 'Empty'],
      annotate: [
        {
          selector: '[data-grid-content] input',
          attrs: {
            part: 'Autocomplete/Input Group Input',
            variant: '{"size":"medium"}',
            text: 'value',
          },
        },
        { selector: '[data-grid-content] input:only-child', style: { width: '220px' } },
        { selector: '[data-grid-content] [role=grid]', attrs: { slot: 'rows' } },
      ],
      description:
        'The searchable grid popup. Its built-in search input supports the shared surface variants; the native rows slot contains reusable Row and Grid Item instances.',
      slots: { rows: { description: 'Suggestion rows.', preferred: ['Autocomplete/Row'] } },
      properties: { value: 'placeholder', emptyText: 'emptyText' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ width: 300, height: 280 }}>
          <Autocomplete open grid items={combo.State === 'Empty' ? [] : symbols}>
            <Autocomplete.Trigger
              aria-label="Choose symbol"
              render={<Button size="small" tone="neutral" variant="outline" />}
            >
              <Icon name="add" aria-hidden="true" />
            </Autocomplete.Trigger>
            <Autocomplete.GridContent
              data-grid-content=""
              emptyText="No matching symbols"
              placeholder="Search symbols"
              ref={(node) => gridRef(node, index)}
              variant={combo.variant as AutocompleteGridContentProps['variant']}
            >
              {combo.State !== 'Empty' && (
                <Autocomplete.Row {...part('Autocomplete/Row', {})} {...slot('items')}>
                  <Cells />
                </Autocomplete.Row>
              )}
            </Autocomplete.GridContent>
          </Autocomplete>
        </div>
      )}
    />
  ),
}

export const Root: Story = {
  name: 'Autocomplete',
  parameters: {
    figma: {
      component: 'Autocomplete',
      group: 'Autocomplete',
      order: 323,
      cva: inputCva,
      description:
        'The closed autocomplete field composed from a reusable Input Group, Input and Addon. Pair it with Content or Grid Content for the open suggestions.',
      slots: {
        field: {
          description: 'Autocomplete input group.',
          preferred: ['Autocomplete/Input Group'],
          max: 1,
        },
      },
      usage:
        '<Autocomplete items={items}><Autocomplete.InputGroup><Autocomplete.InputGroupInput aria-label="Search" /><Autocomplete.InputGroupAddon><Icon name="search" /></Autocomplete.InputGroupAddon></Autocomplete.InputGroup><Autocomplete.Content><Autocomplete.Collection>{item => <Autocomplete.Item value={item}>{item}</Autocomplete.Item>}</Autocomplete.Collection></Autocomplete.Content></Autocomplete>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Autocomplete>
          <div {...target(index)} style={{ width: 280 }}>
            <div {...slot('field')}>
              <Autocomplete.InputGroup
                size={combo.size as 'medium'}
                variant={combo.variant as 'primary'}
                {...part('Autocomplete/Input Group', {
                  size: combo.size || 'medium',
                  variant: combo.variant || 'primary',
                  State: 'Default',
                })}
              >
                <InputParts size={combo.size || 'medium'} />
              </Autocomplete.InputGroup>
            </div>
          </div>
        </Autocomplete>
      )}
    />
  ),
}
