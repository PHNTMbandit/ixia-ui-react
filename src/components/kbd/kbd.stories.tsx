import { CommandIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { Kbd } from './index'

export default {
  argTypes: {
    children: {
      control: 'text',
      description: 'Shortcut label shown inside the keycap.',
      table: {
        defaultValue: { summary: 'Ctrl + K' },
      },
    },
  },
  args: {
    children: 'Ctrl + K',
  },
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component:
          'The Kbd component highlights keyboard keys or shortcut combinations in compact keycap styling. Use it alongside buttons, inputs, command palettes, and instructional content. Compose multiple keys with `KbdGroup` for modifier and sequence combinations.',
      },
      subtitle: 'A visual keycap for displaying keyboard shortcuts and key hints.',
    },
  },
  render: (args) => <Kbd {...args} />,
  subcomponents: { KbdGroup: Kbd.Group },
  title: 'Components/Kbd',
} satisfies Meta<typeof Kbd>

type Story = StoryObj<typeof Kbd>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for trying key labels and observing spacing inside the keycap.',
      },
    },
  },
}

export const Text: Story = {
  args: {
    children: 'Ctrl + K',
  },
  name: 'Content / Text',
  parameters: {
    docs: {
      description: {
        story: 'Standard textual shortcut presentation for command hints and docs.',
      },
    },
  },
}

export const Icon: Story = {
  args: {
    children: undefined,
  },
  name: 'Content / Icon',
  parameters: {
    docs: {
      description: {
        story: 'Icon-only keycap variant useful for command key or platform-specific symbols.',
      },
    },
  },
  render: (args) => (
    <Kbd {...args}>
      <CommandIcon />
    </Kbd>
  ),
}

export const ShortcutGroup: Story = {
  name: 'Composition / Shortcut Group',
  parameters: {
    docs: {
      description: {
        story: 'Combine multiple keycaps with `KbdGroup` for modifier-based shortcuts.',
      },
    },
  },
  render: (args) => (
    <Kbd.Group>
      <Kbd {...args}>Ctrl</Kbd>
      <Kbd {...args}>Shift</Kbd>
      <Kbd {...args}>P</Kbd>
    </Kbd.Group>
  ),
}

export const WithButton: Story = {
  args: {
    children: 'Enter',
  },
  name: 'Composition / Button',
  parameters: {
    docs: {
      description: {
        story: 'Attach a key hint to action buttons for quick discoverability.',
      },
    },
  },
  render: (args) => (
    <Button>
      Generate
      <Kbd {...args}>
        <p>Enter</p>
      </Kbd>
    </Button>
  ),
}

export const WithInput: Story = {
  args: {
    children: 'Ctrl + F',
  },
  name: 'Composition / Input',
  parameters: {
    docs: {
      description: {
        story: 'Embed keyboard hints inside input add-ons for searchable interfaces.',
      },
    },
  },
  render: (args) => (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Kbd {...args}>
          <p>Ctrl + F</p>
        </Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
}
