import {
  CardsIcon,
  ClipboardIcon,
  CommandIcon,
  CopyIcon,
  ScissorsIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd } from '../kbd'
import { KbdGroup } from '../kbd/kbd-group'
import { ContextMenu } from './index'

const TriggerSurface = ({ label = 'Right Click Me' }: { label?: string }) => (
  <ContextMenu.Trigger>
    <div className="flex h-3xl w-[320px] items-center justify-center rounded-xl border border-border bg-surface-2 text-on-surface shadow-2xs">
      {label}
    </div>
  </ContextMenu.Trigger>
)

export default {
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component:
          'The Context Menu component exposes contextual actions tied to a specific surface or selection. It supports standard items, destructive actions, grouped sections, checkbox and radio controls, shortcuts, and nested submenus.',
      },
      subtitle: 'A secondary-action menu revealed by right-click or equivalent context gesture.',
    },
  },
  render: (args) => (
    <ContextMenu {...args}>
      <TriggerSurface />
      <ContextMenu.Popup>
        <ContextMenu.Item>
          <CopyIcon weight="bold" /> Copy
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ClipboardIcon weight="bold" /> Paste
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>
          <ScissorsIcon weight="bold" /> Cut
        </ContextMenu.Item>
        <ContextMenu.Submenu>
          <ContextMenu.SubmenuTrigger>More Actions</ContextMenu.SubmenuTrigger>
          <ContextMenu.Popup>
            <ContextMenu.Item>Select Duplicates</ContextMenu.Item>
            <ContextMenu.Item tone="error">Delete Selection</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Submenu>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
  subcomponents: {
    ContextMenuCheckboxItem: ContextMenu.CheckboxItem,
    ContextMenuGroup: ContextMenu.Group,
    ContextMenuGroupLabel: ContextMenu.GroupLabel,
    ContextMenuItem: ContextMenu.Item,
    ContextMenuPopup: ContextMenu.Popup,
    ContextMenuRadioItem: ContextMenu.RadioItem,
    ContextMenuSeparator: ContextMenu.Separator,
    ContextMenuShortcut: ContextMenu.Shortcut,
    ContextMenuSubmenu: ContextMenu.Submenu,
    ContextMenuSubmenuTrigger: ContextMenu.SubmenuTrigger,
    ContextMenuTrigger: ContextMenu.Trigger,
  },
  title: 'Components/Context Menu',
} satisfies Meta<typeof ContextMenu>

type Story = StoryObj<typeof ContextMenu>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Right-click the preview surface to open the base context menu and inspect its composition.',
      },
    },
  },
}

export const Default: Story = {
  name: 'Composition / Action Surface',
}

export const Icons: Story = {
  name: 'Composition / Icons',
  parameters: {
    docs: {
      description: {
        story: 'Icons provide quick visual recognition for common contextual actions.',
      },
    },
  },
  render: (args) => (
    <ContextMenu {...args}>
      <TriggerSurface />
      <ContextMenu.Popup>
        <ContextMenu.Item>
          <CopyIcon weight="bold" /> Copy
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ClipboardIcon weight="bold" /> Paste
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ScissorsIcon weight="bold" /> Cut
        </ContextMenu.Item>
        <ContextMenu.Item>
          <CardsIcon weight="bold" /> Select All
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item tone="error">
          <TrashIcon weight="bold" /> Delete
        </ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}

export const Shortcuts: Story = {
  name: 'Composition / Shortcuts',
  parameters: {
    docs: {
      description: {
        story:
          'Shortcut hints are especially useful in context menus because actions are often duplicated elsewhere in the interface.',
      },
    },
  },
  render: (args) => (
    <ContextMenu {...args}>
      <TriggerSurface />
      <ContextMenu.Popup>
        <ContextMenu.Item>
          <CopyIcon weight="bold" /> Copy
          <ContextMenu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>C</Kbd>
            </KbdGroup>
          </ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ClipboardIcon weight="bold" /> Paste
          <ContextMenu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>V</Kbd>
            </KbdGroup>
          </ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ScissorsIcon weight="bold" /> Cut
          <ContextMenu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>X</Kbd>
            </KbdGroup>
          </ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          <CardsIcon weight="bold" /> Select All
          <ContextMenu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>A</Kbd>
            </KbdGroup>
          </ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item tone="error">
          <TrashIcon weight="bold" /> Delete
          <ContextMenu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>⌫</Kbd>
            </KbdGroup>
          </ContextMenu.Shortcut>
        </ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}

export const Groups: Story = {
  name: 'Composition / Groups',
  parameters: {
    docs: {
      description: {
        story: 'Group labels divide contextual actions into logical sections for easier scanning.',
      },
    },
  },
  render: (args) => (
    <ContextMenu {...args}>
      <TriggerSurface />
      <ContextMenu.Popup>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Group 1</ContextMenu.GroupLabel>
          <ContextMenu.Item>Option 1</ContextMenu.Item>
          <ContextMenu.Item>Option 2</ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Group 2</ContextMenu.GroupLabel>
          <ContextMenu.Item>Option 3</ContextMenu.Item>
          <ContextMenu.Item>Option 4</ContextMenu.Item>
        </ContextMenu.Group>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}

export const RadioAndCheckboxItems: Story = {
  name: 'Composition / Radio and Checkbox Items',
  parameters: {
    docs: {
      description: {
        story:
          'Context menus can embed lightweight toggle and choice controls for surface-specific settings.',
      },
    },
  },
  render: (args) => (
    <ContextMenu {...args}>
      <TriggerSurface />
      <ContextMenu.Popup>
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Checkbox Group</ContextMenu.GroupLabel>
          <ContextMenu.CheckboxItem>Checkbox Item</ContextMenu.CheckboxItem>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Radio Group</ContextMenu.GroupLabel>
          <ContextMenu.RadioGroup>
            <ContextMenu.RadioItem value="option1">Radio Option 1</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="option2">Radio Option 2</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Group>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}

export const Submenu: Story = {
  name: 'Composition / Submenu',
  parameters: {
    docs: {
      description: {
        story:
          'Submenus keep less common contextual actions available without crowding the first level.',
      },
    },
  },
  render: () => (
    <ContextMenu>
      <TriggerSurface label="Right Click for Nested Actions" />
      <ContextMenu.Popup>
        <ContextMenu.Item>Rename</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
        <ContextMenu.Submenu>
          <ContextMenu.SubmenuTrigger>Share</ContextMenu.SubmenuTrigger>
          <ContextMenu.Popup>
            <ContextMenu.Item>Email Link</ContextMenu.Item>
            <ContextMenu.Item>Copy Public URL</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Submenu>
      </ContextMenu.Popup>
    </ContextMenu>
  ),
}
