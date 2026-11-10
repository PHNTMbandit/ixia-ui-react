import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import type { IconName } from '../../../src/components/icon'
import { Kbd } from '../../../src/components/kbd'
import { Menu } from '../../../src/components/menu'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Menu',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Parts only render inside an open menu; each one gets its own trigger so popups do not overlap.
function Open({ children, height = 120 }: { children: ReactNode; height?: number }) {
  return (
    <div style={{ height, width: 260 }}>
      <Menu modal={false} open>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Popup data-figma-popup="">{children}</Menu.Popup>
      </Menu>
    </div>
  )
}

const highlight = {
    interactions: [
      { from: { State: 'Default' }, to: { State: 'Highlighted' }, trigger: 'ON_HOVER' },
    ],
    states: ['Default', 'Highlighted'],
  } satisfies Partial<FigmaSpec>,
  itemState = (combo: Combo) => (combo.State === 'Highlighted' ? { 'data-highlighted': '' } : {}),
  width = { width: 200 }

function Shortcut({ keys, visible }: { keys: string[]; visible: boolean }) {
  return (
    <Menu.Shortcut {...show('showShortcut', visible)}>
      <Kbd.Group {...part('Kbd/Group', {})}>
        <div style={{ display: 'contents' }} {...slot('keys')}>
          {keys.map((key) => (
            <Kbd key={key} {...part('Kbd', {})} {...text('label')}>
              {key}
            </Kbd>
          ))}
        </div>
      </Kbd.Group>
    </Menu.Shortcut>
  )
}

export const Item: Story = {
  name: 'Menu / Item',
  parameters: {
    figma: {
      ...highlight,
      component: 'Menu/Item',
      cva: { axes: ['tone'], file: 'src/components/menu/menu.types.ts', name: 'menuItemVariants' },
      description:
        'One action in a Menu popup. Edit the label, toggle or swap the leading icon, and show a shortcut whose Kbd keys are editable from the item.',
      group: 'Menu',
      order: 120,
      properties: {
        label: 'children (text)',
        leadingIcon: '<Icon /> before the label',
        shortcut: '<Menu.Shortcut> with a <Kbd.Group>',
      },
      usage:
        '<Menu.Item tone="neutral">\n  <Icon name="copy" />\n  Copy\n  <Menu.Shortcut>\n    <Kbd.Group><Kbd>Ctrl</Kbd><Kbd>C</Kbd></Kbd.Group>\n  </Menu.Shortcut>\n</Menu.Item>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <Menu.Item
            {...target(index)}
            {...itemState(combo)}
            style={width}
            tone={combo.tone as 'neutral'}
          >
            <Icon name="copy" {...swap('leadingIcon')} />
            <span {...text('label')}>Copy</span>
            <Shortcut keys={['Ctrl', 'C']} visible={false} />
          </Menu.Item>
        </Open>
      )}
    />
  ),
}

// Base UI only mounts the indicator while checked; the Checked boolean toggles its layer instead.
const indicator = [
  { attrs: { show: 'checked=true' }, selector: '[data-figma-target] > :last-child' },
]

export const CheckboxItem: Story = {
  name: 'Menu / Checkbox Item',
  parameters: {
    figma: {
      ...highlight,
      annotate: indicator,
      component: 'Menu/Checkbox Item',
      description:
        'An option that turns on or off. Edit the label, toggle the leading icon, and set Checked.',
      group: 'Menu',
      order: 121,
      properties: {
        checked: 'checked / defaultChecked',
        label: 'children (text)',
        leadingIcon: '<Icon /> before the label',
      },
      usage:
        '<Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>\n  Show grid\n</Menu.CheckboxItem>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <Menu.CheckboxItem checked {...target(index)} {...itemState(combo)} style={width}>
            <Icon name="visible" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Show grid</span>
          </Menu.CheckboxItem>
        </Open>
      )}
    />
  ),
}

export const RadioItem: Story = {
  name: 'Menu / Radio Item',
  parameters: {
    figma: {
      ...highlight,
      annotate: indicator,
      component: 'Menu/Radio Item',
      description:
        'One choice in a Menu.RadioGroup. Edit the label and set Checked on the selected choice.',
      group: 'Menu',
      order: 122,
      properties: { checked: 'the RadioGroup value', label: 'children (text)' },
      usage:
        '<Menu.RadioGroup value={density} onValueChange={setDensity}>\n  <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>\n</Menu.RadioGroup>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <Menu.RadioGroup value="comfortable">
            <Menu.RadioItem
              value="comfortable"
              {...target(index)}
              {...itemState(combo)}
              style={width}
            >
              <span {...text('label')}>Comfortable</span>
            </Menu.RadioItem>
          </Menu.RadioGroup>
        </Open>
      )}
    />
  ),
}

export const SubmenuTrigger: Story = {
  name: 'Menu / Submenu Trigger',
  parameters: {
    figma: {
      ...highlight,
      component: 'Menu/Submenu Trigger',
      cva: {
        axes: ['tone'],
        file: 'src/components/menu/menu.types.ts',
        name: 'menuSubmenuTriggerVariants',
      },
      description:
        'Opens a nested menu. Edit the label and toggle or swap the leading icon; the chevron is fixed in code.',
      group: 'Menu',
      order: 123,
      properties: { label: 'children (text)', leadingIcon: '<Icon /> before the label' },
      usage:
        '<Menu.Submenu>\n  <Menu.SubmenuTrigger>Arrange</Menu.SubmenuTrigger>\n  <Menu.Popup>…</Menu.Popup>\n</Menu.Submenu>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <Menu.Submenu>
            <Menu.SubmenuTrigger
              {...target(index)}
              {...itemState(combo)}
              style={width}
              tone={combo.tone as 'neutral'}
            >
              <Icon name="layers" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Arrange</span>
            </Menu.SubmenuTrigger>
          </Menu.Submenu>
        </Open>
      )}
    />
  ),
}

export const GroupLabel: Story = {
  name: 'Menu / Group Label',
  parameters: {
    figma: {
      component: 'Menu/Group Label',
      description: 'A heading for the items after it. In code it sits inside a Menu.Group.',
      group: 'Menu',
      order: 124,
      properties: { label: 'children (text)' },
      usage:
        '<Menu.Group>\n  <Menu.GroupLabel>Workspace</Menu.GroupLabel>\n  <Menu.Item>…</Menu.Item>\n</Menu.Group>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Open>
          <Menu.Group>
            <Menu.GroupLabel {...target(index)} {...text('label')} style={width}>
              Workspace
            </Menu.GroupLabel>
          </Menu.Group>
        </Open>
      )}
    />
  ),
}

// Menu.Separator's margins are captured as padding on a wrapper, so the part fills a slot
// without an extra offset frame around it.
const separatorBox = { padding: 'var(--spacing-3xs) var(--spacing-2xs)' }

export const Separator: Story = {
  name: 'Menu / Separator',
  parameters: {
    figma: {
      component: 'Menu/Separator',
      description: 'A divider between groups of items.',
      group: 'Menu',
      order: 125,
      usage: '<Menu.Separator />',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Open>
          <div {...target(index)} style={{ ...separatorBox, ...width }}>
            <Menu.Separator style={{ margin: 0 }} />
          </div>
        </Open>
      )}
    />
  ),
}

const action = (label: string, icon: IconName, keys?: string[], tone = 'neutral') => (
  <Menu.Item {...part('Menu/Item', { State: 'Default', tone })} tone={tone as 'neutral'}>
    <Icon name={icon} {...swap('leadingIcon')} />
    <span {...text('label')}>{label}</span>
    <Shortcut keys={keys || ['Ctrl', 'C']} visible={Boolean(keys)} />
  </Menu.Item>
)

export const Popup: Story = {
  name: 'Menu / Popup',
  parameters: {
    figma: {
      // A fixed width (its 12rem minimum) lets designers resize the popup while items fill each row.
      annotate: [
        {
          attrs: { target: '0' },
          selector: '[data-figma-popup] > [role="menu"]',
          style: { width: '12rem' },
        },
      ],
      component: 'Menu/Popup',
      description:
        'The open menu. Add, remove, reorder or replace Menu parts in the items slot; wrap group labels and radio items in their groups in code.',
      group: 'Menu',
      order: 126,
      properties: { items: '<Menu.Popup> children' },
      slots: {
        items: {
          description:
            'Menu Item, Checkbox Item, Radio Item, Submenu Trigger, Group Label and Separator instances.',
          preferred: [
            'Menu/Item',
            'Menu/Checkbox Item',
            'Menu/Radio Item',
            'Menu/Submenu Trigger',
            'Menu/Group Label',
            'Menu/Separator',
          ],
        },
      },
      usage:
        '<Menu>\n  <Menu.Trigger><Button>Open</Button></Menu.Trigger>\n  <Menu.Popup>\n    <Menu.Item>Copy</Menu.Item>\n    <Menu.Separator />\n    <Menu.Item tone="error">Delete</Menu.Item>\n  </Menu.Popup>\n</Menu>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open height={360}>
      <div style={{ display: 'contents' }} {...slot('items')}>
        {action('Copy', 'copy', ['Ctrl', 'C'])}
        {action('Download', 'download', ['Ctrl', 'S'])}
        <div {...part('Menu/Separator', {})} style={separatorBox}>
          <Menu.Separator style={{ margin: 0 }} />
        </div>
        <Menu.CheckboxItem checked {...part('Menu/Checkbox Item', { State: 'Default' })}>
          <span {...text('label')}>Show grid</span>
        </Menu.CheckboxItem>
        <Menu.Submenu>
          <Menu.SubmenuTrigger {...part('Menu/Submenu Trigger', { State: 'Default' })}>
            <Icon name="layers" {...swap('leadingIcon')} />
            <span {...text('label')}>Arrange</span>
          </Menu.SubmenuTrigger>
        </Menu.Submenu>
        <div {...part('Menu/Separator', {})} style={separatorBox}>
          <Menu.Separator style={{ margin: 0 }} />
        </div>
        {action('Delete', 'delete', undefined, 'error')}
      </div>
    </Open>
  ),
}
