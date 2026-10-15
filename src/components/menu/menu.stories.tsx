import {
  CardsIcon,
  ClipboardIcon,
  CommandIcon,
  CopyIcon,
  ListIcon,
  ScissorsIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Button } from '../button'
import { Kbd } from '../kbd'
import { KbdGroup } from '../kbd/kbd-group'
import { Menu } from './index'

const BasicActionMenu = () => (
  <Menu>
    <Menu.Trigger>
      <Button>Open Menu</Button>
    </Menu.Trigger>
    <Menu.Popup align="center">
      <Menu.Item>
        <CopyIcon /> Copy
      </Menu.Item>
      <Menu.Item>
        <ClipboardIcon /> Paste
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item>
        <ScissorsIcon /> Cut
      </Menu.Item>
      <Menu.Item tone="error">
        <TrashIcon /> Delete
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item>
        <CardsIcon /> Select All
      </Menu.Item>
    </Menu.Popup>
  </Menu>
)

export default {
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'The Menu component displays a popup list of actions anchored to a trigger. It supports destructive actions, grouped sections, checkbox and radio items, nested submenus, and keyboard shortcut affordances.',
      },
      subtitle: 'Provides a dropdown menu for navigation or actions.',
    },
  },
  render: () => <BasicActionMenu />,
  subcomponents: {
    MenuCheckboxItem: Menu.CheckboxItem,
    MenuGroup: Menu.Group,
    MenuGroupLabel: Menu.GroupLabel,
    MenuItem: Menu.Item,
    MenuPopup: Menu.Popup,
    MenuRadioItem: Menu.RadioItem,
    MenuSeparator: Menu.Separator,
    MenuShortcut: Menu.Shortcut,
    MenuSubmenu: Menu.Submenu,
    MenuSubmenuTrigger: Menu.SubmenuTrigger,
    MenuTrigger: Menu.Trigger,
  },
  title: 'Components/Menu',
} satisfies Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Baseline action menu showing common menu items, separators, and a destructive action.',
      },
    },
  },
}

export const Default: Story = {
  name: 'Composition / Action Menu',
}

export const CheckboxItems: Story = {
  name: 'Composition / Checkbox Items',
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox items are useful for toggling independent visibility, filter, or preference states.',
      },
    },
  },
  render: (args) => {
    const [showCopy, setShowCopy] = React.useState(false),
      [showPaste, setShowPaste] = React.useState(false),
      [showCut, setShowCut] = React.useState(false),
      [showDelete, setShowDelete] = React.useState(false)

    return (
      <Menu {...args}>
        <Menu.Trigger>
          <Button>Open Menu</Button>
        </Menu.Trigger>
        <Menu.Popup>
          <Menu.CheckboxItem
            checked={showCopy}
            onCheckedChange={() => setShowCopy((prev) => !prev)}
          >
            Option 1
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showPaste}
            onCheckedChange={() => setShowPaste((prev) => !prev)}
          >
            Option 2
          </Menu.CheckboxItem>
          <Menu.CheckboxItem checked={showCut} onCheckedChange={() => setShowCut((prev) => !prev)}>
            Option 3
          </Menu.CheckboxItem>
          <Menu.CheckboxItem
            checked={showDelete}
            onCheckedChange={() => setShowDelete((prev) => !prev)}
          >
            Option 4
          </Menu.CheckboxItem>
        </Menu.Popup>
      </Menu>
    )
  },
}

export const RadioItems: Story = {
  name: 'Composition / Radio Items',
  parameters: {
    docs: {
      description: {
        story: 'Radio items model mutually exclusive settings such as sort order or view mode.',
      },
    },
  },
  render: (args) => {
    const [value, setValue] = React.useState('date')

    return (
      <Menu {...args}>
        <Menu.Trigger>
          <Button>Open Menu</Button>
        </Menu.Trigger>
        <Menu.Popup align="center">
          <Menu.RadioGroup onValueChange={setValue} value={value}>
            <Menu.RadioItem value="date">Date</Menu.RadioItem>
            <Menu.RadioItem value="name">Name</Menu.RadioItem>
            <Menu.RadioItem value="type">Type</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Popup>
      </Menu>
    )
  },
}

export const GroupLabels: Story = {
  name: 'Composition / Grouped Sections',
  parameters: {
    docs: {
      description: {
        story: 'Groups and labels help organize larger menus into clearer semantic sections.',
      },
    },
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Trigger>
        <Button>Open Menu</Button>
      </Menu.Trigger>
      <Menu.Popup>
        <Menu.Group>
          <Menu.GroupLabel>Group 1</Menu.GroupLabel>
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Group 2</Menu.GroupLabel>
          <Menu.Item>Option 3</Menu.Item>
          <Menu.Item>Option 4</Menu.Item>
        </Menu.Group>
      </Menu.Popup>
    </Menu>
  ),
}

export const Submenus: Story = {
  name: 'Composition / Submenus',
  parameters: {
    docs: {
      description: {
        story:
          'Submenus let you progressively reveal secondary actions without overcrowding the first level.',
      },
    },
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Trigger>
        <Button>Open Menu</Button>
      </Menu.Trigger>
      <Menu.Popup>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>
            <ListIcon /> More Options
          </Menu.SubmenuTrigger>
          <Menu.Popup>
            <Menu.Item>Option 2</Menu.Item>
            <Menu.Item>Option 3</Menu.Item>
          </Menu.Popup>
        </Menu.Submenu>
      </Menu.Popup>
    </Menu>
  ),
}

export const Shortcuts: Story = {
  name: 'Composition / Shortcuts',
  parameters: {
    docs: {
      description: {
        story:
          'Shortcut hints communicate keyboard access for frequent actions without changing interaction behavior.',
      },
    },
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Trigger>
        <Button>Open Menu</Button>
      </Menu.Trigger>
      <Menu.Popup>
        <Menu.Item>
          <CopyIcon /> Copy
          <Menu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>C</Kbd>
            </KbdGroup>
          </Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          <ClipboardIcon /> Paste
          <Menu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>V</Kbd>
            </KbdGroup>
          </Menu.Shortcut>
        </Menu.Item>
        <Menu.Item>
          <ScissorsIcon /> Cut
          <Menu.Shortcut>
            <KbdGroup>
              <Kbd>
                <CommandIcon />
              </Kbd>
              <Kbd>X</Kbd>
            </KbdGroup>
          </Menu.Shortcut>
        </Menu.Item>
      </Menu.Popup>
    </Menu>
  ),
}

export const DestructiveAction: Story = {
  name: 'State / Destructive Action',
  parameters: {
    docs: {
      description: {
        story: 'Use the `error` tone for irreversible or high-risk menu actions.',
      },
    },
  },
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button tone="error" variant="soft">
          Open Destructive Menu
        </Button>
      </Menu.Trigger>
      <Menu.Popup>
        <Menu.Item>
          <CopyIcon /> Duplicate Project
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item tone="error">
          <TrashIcon /> Delete Project
        </Menu.Item>
      </Menu.Popup>
    </Menu>
  ),
}
