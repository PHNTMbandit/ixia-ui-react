import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Button } from '../../../src/components/button'
import { ContextMenu } from '../../../src/components/context-menu'
import { Icon } from '../../../src/components/icon'
import { Kbd } from '../../../src/components/kbd'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Context Menu' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

function Open({ children }: { children: ReactNode }) {
  return (
    <div style={{ height: 220, width: 280 }}>
      <ContextMenu open>
        <ContextMenu.Trigger render={<Button tone="neutral" variant="outline" />}>
          Project actions
        </ContextMenu.Trigger>
        <ContextMenu.Popup style={{ width: 240 }}>{children}</ContextMenu.Popup>
      </ContextMenu>
    </div>
  )
}

const highlighted = (combo: Combo) =>
  combo.State === 'Highlighted' ? { 'data-highlighted': '' } : {}
const highlight = { states: ['Default', 'Highlighted'] } satisfies Partial<FigmaSpec>

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Trigger',
      group: 'Context Menu',
      order: 370,
      description:
        'The context-menu target. Its native slot contains replaceable content; this fixture uses a named Button for keyboard access.',
      slots: {
        content: { description: 'Context-menu target content.', preferred: ['Button'], max: 1 },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger {...target(0)}>
        <div {...slot('content')}>
          <Button
            tone="neutral"
            variant="outline"
            {...part('Button', { State: 'Default', tone: 'neutral', variant: 'outline' })}
            {...text('label')}
          >
            Project actions
          </Button>
        </div>
      </ContextMenu.Trigger>
    </ContextMenu>
  ),
}

export const Shortcut: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Shortcut',
      group: 'Context Menu',
      order: 371,
      description: 'The trailing shortcut container. A reusable Kbd Group keeps each key editable.',
      slots: { shortcut: { description: 'Shortcut key group.', preferred: ['Kbd/Group'], max: 1 } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <ContextMenu.Shortcut {...target(0)}>
      <div {...slot('shortcut')} style={{ display: 'contents' }}>
        <Keys />
      </div>
    </ContextMenu.Shortcut>
  ),
}

function Keys() {
  return (
    <Kbd.Group {...part('Kbd/Group', {})}>
      <div {...slot('keys')} style={{ display: 'contents' }}>
        <Kbd {...part('Kbd', {})} {...text('label')}>
          Ctrl
        </Kbd>
        <Kbd {...part('Kbd', {})} {...text('label')}>
          C
        </Kbd>
      </div>
    </Kbd.Group>
  )
}

export const Item: Story = {
  parameters: {
    figma: {
      ...highlight,
      component: 'Context Menu/Item',
      group: 'Context Menu',
      order: 372,
      cva: {
        axes: ['tone'],
        file: 'src/components/context-menu/context-menu.types.ts',
        name: 'contextMenuItemVariants',
      },
      description:
        'An action using the shared Menu Item visual, with editable text, optional icon and nested shortcut keys.',
      properties: {
        label: 'children',
        leadingIcon: '<Icon />',
        showShortcut: '<ContextMenu.Shortcut>',
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <div {...target(index)} style={{ width: 220 }}>
            <ContextMenu.Item
              tone={combo.tone as 'neutral'}
              {...highlighted(combo)}
              {...part('Menu/Item', {
                tone: combo.tone || 'neutral',
                State: combo.State || 'Default',
              })}
            >
              <Icon name="copy" aria-hidden="true" {...swap('leadingIcon')} />
              <span {...text('label')}>Copy</span>
              <ContextMenu.Shortcut
                {...part('Context Menu/Shortcut', {})}
                {...show('showShortcut', false)}
              >
                <Keys />
              </ContextMenu.Shortcut>
            </ContextMenu.Item>
          </div>
        </Open>
      )}
    />
  ),
}

export const CheckboxItem: Story = {
  parameters: {
    figma: {
      ...highlight,
      annotate: [
        {
          selector: '[data-figma-part="Menu/Checkbox Item"] > :last-child',
          attrs: { show: 'checked=true' },
        },
      ],
      component: 'Context Menu/Checkbox Item',
      group: 'Context Menu',
      order: 373,
      description:
        'A toggle option sharing the reusable Menu Checkbox Item visual. Checked controls indicator visibility.',
      properties: { checked: 'checked', label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <div {...target(index)} style={{ width: 220 }}>
            <ContextMenu.CheckboxItem
              checked
              {...highlighted(combo)}
              {...part('Menu/Checkbox Item', { State: combo.State || 'Default' })}
            >
              <Icon name="visible" aria-hidden="true" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Show grid</span>
            </ContextMenu.CheckboxItem>
          </div>
        </Open>
      )}
    />
  ),
}

export const RadioItem: Story = {
  parameters: {
    figma: {
      ...highlight,
      annotate: [
        {
          selector: '[data-figma-part="Menu/Radio Item"] > :last-child',
          attrs: { show: 'checked=true' },
        },
      ],
      component: 'Context Menu/Radio Item',
      group: 'Context Menu',
      order: 374,
      description:
        'A single-choice option sharing the reusable Menu Radio Item visual. It is rendered inside the real RadioGroup.',
      properties: { checked: '<ContextMenu.RadioGroup value>', label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <ContextMenu.RadioGroup value="comfortable">
            <div {...target(index)} style={{ width: 220 }}>
              <ContextMenu.RadioItem
                value="comfortable"
                {...highlighted(combo)}
                {...part('Menu/Radio Item', { State: combo.State || 'Default' })}
              >
                <span {...text('label')}>Comfortable</span>
              </ContextMenu.RadioItem>
            </div>
          </ContextMenu.RadioGroup>
        </Open>
      )}
    />
  ),
}

export const GroupLabel: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Group Label',
      group: 'Context Menu',
      order: 375,
      description:
        'A heading sharing the reusable Menu Group Label visual, associated with its real group.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <ContextMenu.Group>
        <div {...target(0)} style={{ width: 220 }}>
          <ContextMenu.GroupLabel {...part('Menu/Group Label', {})} {...text('label')}>
            Workspace
          </ContextMenu.GroupLabel>
        </div>
      </ContextMenu.Group>
    </Open>
  ),
}

export const Separator: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Separator',
      group: 'Context Menu',
      order: 376,
      description: 'A divider using the shared Menu Separator asset and its spacing.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <div {...target(0)} style={{ width: 220 }}>
        <div
          {...part('Menu/Separator', {})}
          style={{ padding: 'var(--spacing-3xs) var(--spacing-2xs)' }}
        >
          <ContextMenu.Separator style={{ margin: 0 }} />
        </div>
      </div>
    </Open>
  ),
}

export const SubmenuTrigger: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Submenu Trigger',
      group: 'Context Menu',
      order: 377,
      cva: {
        axes: ['tone'],
        file: 'src/components/context-menu/context-menu.types.ts',
        name: 'contextMenuSubmenuTriggerVariants',
      },
      states: ['Default', 'Highlighted', 'Open'],
      annotate: [
        {
          selector: '[data-figma-target] > svg:last-child',
          attrs: { swap: 'indicatorIcon', show: 'showIndicatorIcon=true' },
        },
      ],
      description:
        'A submenu disclosure with the actual tone, highlight and open styles, editable text and swappable icons.',
      properties: { label: 'children', leadingIcon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open>
          <ContextMenu.Submenu open={combo.State === 'Open'}>
            <ContextMenu.SubmenuTrigger
              {...target(index)}
              {...highlighted(combo)}
              tone={combo.tone as 'neutral'}
            >
              <Icon name="layers" aria-hidden="true" {...swap('leadingIcon', false)} />
              <span {...text('label')}>Arrange</span>
            </ContextMenu.SubmenuTrigger>
            <ContextMenu.Popup>
              <ContextMenu.Item>Bring to front</ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Submenu>
        </Open>
      )}
    />
  ),
}

function Actions() {
  return (
    <div {...slot('items')} style={{ display: 'contents' }}>
      <ContextMenu.Item {...part('Context Menu/Item', { tone: 'neutral', State: 'Default' })}>
        <Icon name="copy" aria-hidden="true" {...swap('leadingIcon')} />
        <span {...text('label')}>Copy</span>
        <ContextMenu.Shortcut {...part('Context Menu/Shortcut', {})}>
          <Keys />
        </ContextMenu.Shortcut>
      </ContextMenu.Item>
      <ContextMenu.CheckboxItem
        checked
        {...part('Context Menu/Checkbox Item', { State: 'Default' })}
      >
        <span {...text('label')}>Show grid</span>
      </ContextMenu.CheckboxItem>
    </div>
  )
}

export const Group: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Group',
      group: 'Context Menu',
      order: 378,
      description:
        'A semantic menu group containing reusable Group Label and action instances, with a native variable-count slot.',
      slots: {
        items: {
          description: 'Group label and menu options.',
          preferred: [
            'Context Menu/Group Label',
            'Context Menu/Item',
            'Context Menu/Checkbox Item',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <ContextMenu.Group {...target(0)}>
        <div {...slot('items')} style={{ display: 'contents' }}>
          <ContextMenu.GroupLabel {...part('Context Menu/Group Label', {})} {...text('label')}>
            Workspace
          </ContextMenu.GroupLabel>
          <ContextMenu.Item {...part('Context Menu/Item', { tone: 'neutral', State: 'Default' })}>
            <span {...text('label')}>Copy</span>
          </ContextMenu.Item>
        </div>
      </ContextMenu.Group>
    </Open>
  ),
}

export const RadioGroup: Story = {
  parameters: {
    figma: {
      component: 'Context Menu/Radio Group',
      group: 'Context Menu',
      order: 379,
      description:
        'A semantic group of reusable Radio Item instances. Add or remove choices in the native slot.',
      slots: {
        items: {
          description: 'Mutually exclusive choices.',
          preferred: ['Context Menu/Radio Item'],
          only: true,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Open>
      <ContextMenu.RadioGroup value="Comfortable" aria-label="Density" {...target(0)}>
        <div {...slot('items')} style={{ display: 'contents' }}>
          {['Comfortable', 'Compact'].map((label) => (
            <ContextMenu.RadioItem
              key={label}
              value={label}
              {...part('Context Menu/Radio Item', { State: 'Default' })}
            >
              <span {...text('label')}>{label}</span>
            </ContextMenu.RadioItem>
          ))}
        </div>
      </ContextMenu.RadioGroup>
    </Open>
  ),
}

function PopupContent() {
  return (
    <div {...slot('items')} style={{ display: 'contents' }}>
      <ContextMenu.Group {...part('Context Menu/Group', {})}>
        <div {...slot('items')} style={{ display: 'contents' }}>
          <ContextMenu.GroupLabel {...part('Context Menu/Group Label', {})} {...text('label')}>
            Workspace
          </ContextMenu.GroupLabel>
          <Actions />
        </div>
      </ContextMenu.Group>
      <div
        {...part('Context Menu/Separator', {})}
        style={{ padding: 'var(--spacing-3xs) var(--spacing-2xs)' }}
      >
        <ContextMenu.Separator style={{ margin: 0 }} />
      </div>
      <ContextMenu.Submenu>
        <ContextMenu.SubmenuTrigger
          {...part('Context Menu/Submenu Trigger', { tone: 'neutral', State: 'Default' })}
        >
          <Icon name="layers" aria-hidden="true" {...swap('leadingIcon')} />
          <span {...text('label')}>Arrange</span>
        </ContextMenu.SubmenuTrigger>
        <ContextMenu.Popup>
          <ContextMenu.Item>Bring to front</ContextMenu.Item>
        </ContextMenu.Popup>
      </ContextMenu.Submenu>
      <ContextMenu.Item
        tone="error"
        {...part('Context Menu/Item', { tone: 'error', State: 'Default' })}
      >
        <span {...text('label')}>Delete</span>
      </ContextMenu.Item>
    </div>
  )
}

const popup = {
  group: 'Context Menu',
  slots: {
    items: {
      description: 'Context-menu groups and options.',
      preferred: [
        'Context Menu/Group',
        'Context Menu/Radio Group',
        'Context Menu/Item',
        'Context Menu/Checkbox Item',
        'Context Menu/Radio Item',
        'Context Menu/Submenu Trigger',
        'Context Menu/Group Label',
        'Context Menu/Separator',
      ],
    },
  },
  usage:
    '<ContextMenu><ContextMenu.Trigger>…</ContextMenu.Trigger><ContextMenu.Popup><ContextMenu.Item>Copy</ContextMenu.Item><ContextMenu.Separator /><ContextMenu.Item tone="error">Delete</ContextMenu.Item></ContextMenu.Popup></ContextMenu>',
} satisfies Partial<FigmaSpec>

export const Popup: Story = {
  parameters: {
    figma: {
      ...popup,
      component: 'Context Menu/Popup',
      order: 380,
      description:
        'The open context-menu surface with real reusable parts and a native variable-count items slot.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <ContextMenu open>
      <ContextMenu.Trigger render={<button type="button" />}>Project actions</ContextMenu.Trigger>
      <ContextMenu.Popup {...target(0)} style={{ width: 240 }}>
        <PopupContent />
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}

export const Root: Story = {
  name: 'Context Menu',
  parameters: {
    figma: {
      ...popup,
      component: 'Context Menu',
      order: 381,
      description:
        'The open ContextMenu composition. Root and Submenu are behavior-only; the visible popup contains reusable groups, actions, separators and submenu triggers.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <ContextMenu open>
      <ContextMenu.Trigger render={<button type="button" />}>Project actions</ContextMenu.Trigger>
      <ContextMenu.Popup {...target(0)} style={{ width: 240 }}>
        <PopupContent />
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}
