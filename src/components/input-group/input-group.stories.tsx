import {
  CheckIcon,
  CircleNotchIcon,
  MagnifyingGlassIcon,
  TagIcon,
  XIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Kbd } from '../kbd'
import { InputGroup } from './index'

export default {
  argTypes: {
    'aria-invalid': {
      control: 'boolean',
      description: 'Marks the group as invalid to trigger error state styling.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      description: 'Applies the same surface variant styles as the base Input component.',
      options: ['primary', 'secondary'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    variant: 'primary',
  },
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Input Group combines one editable input with optional addons (icons, text labels, shortcuts, spinners, and buttons) into a single cohesive control. It supports the same variants as Input (`primary`, `secondary`) and responds to invalid state using `aria-invalid`.',
      },
      subtitle: 'A composed input container with leading/trailing addons and shared state styling.',
    },
  },
  subcomponents: {
    InputGroupAddon: InputGroup.Addon,
    InputGroupInput: InputGroup.Input,
  },
  title: 'Components/Input Group',
} satisfies Meta<typeof InputGroup>

type Story = StoryObj<typeof InputGroup>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Use controls to toggle variants and invalid state. This template demonstrates icon addons on both sides.',
      },
    },
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>
        <MagnifyingGlassIcon weight="bold" />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Search projects" />
      <InputGroup.Addon>
        <CheckIcon weight="bold" />
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  name: 'Variant / Primary',
  parameters: {
    docs: {
      description: {
        story: 'Default elevated style for standard forms and filters.',
      },
    },
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>
        <TagIcon weight="bold" />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Campaign name" />
    </InputGroup>
  ),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  name: 'Variant / Secondary',
  parameters: {
    docs: {
      description: {
        story: 'Subtle surface style for dense layouts or nested containers.',
      },
    },
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>
        <MagnifyingGlassIcon weight="bold" />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Search by keyword" />
    </InputGroup>
  ),
}

export const IconAddons: Story = {
  name: 'Addon / Icon',
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>
        <MagnifyingGlassIcon weight="bold" />
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Search users" />
      <InputGroup.Addon size="large">
        <CheckIcon weight="bold" />
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const TextAddons: Story = {
  name: 'Addon / Text',
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>$</InputGroup.Addon>
      <InputGroup.Input placeholder="0.00" type="number" />
      <InputGroup.Addon size="small">AUD</InputGroup.Addon>
    </InputGroup>
  ),
}

export const ButtonAddon: Story = {
  name: 'Addon / Button',
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input placeholder="Invite by email" type="email" />
      <InputGroup.Addon>
        <Button size="small" tone="neutral" variant="outline">
          Send
        </Button>
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const KeyboardHint: Story = {
  name: 'Addon / Keyboard Hint',
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input placeholder="Search across workspace" />
      <InputGroup.Addon>
        <Kbd>⌘ K</Kbd>
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const LoadingState: Story = {
  name: 'State / Loading',
  parameters: {
    docs: {
      description: {
        story: 'Shows asynchronous save feedback using a trailing spinner addon.',
      },
    },
  },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input placeholder="Saving changes..." value="Project Atlas" />
      <InputGroup.Addon>
        Saving
        <CircleNotchIcon className="size-sm animate-spin" weight="bold" />
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const InvalidState: Story = {
  name: 'State / Invalid',
  parameters: {
    docs: {
      description: {
        story: 'Apply `aria-invalid` on the wrapper to style both input and addons consistently.',
      },
    },
  },
  render: (args) => (
    <InputGroup {...args} aria-invalid>
      <InputGroup.Input defaultValue="invalid@email" placeholder="Enter email" type="email" />
      <InputGroup.Addon>
        <XIcon weight="bold" />
      </InputGroup.Addon>
    </InputGroup>
  ),
}

export const SearchBar: Story = {
  name: 'Composition / Search Bar',
  parameters: {
    docs: {
      description: {
        story: 'A complete search bar pattern combining icon and keyboard shortcut addons.',
      },
    },
  },
  render: (args) => (
    <div className="w-[480px]">
      <InputGroup {...args} variant="secondary">
        <InputGroup.Addon>
          <MagnifyingGlassIcon weight="bold" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search projects, files, and users" />
        <InputGroup.Addon>
          <Kbd>⌘ F</Kbd>
        </InputGroup.Addon>
      </InputGroup>
    </div>
  ),
}

export const CurrencyInput: Story = {
  name: 'Composition / Currency Input',
  parameters: {
    docs: {
      description: {
        story: 'A common financial input pattern with prefix/suffix text addons.',
      },
    },
  },
  render: (args) => (
    <div className="w-[320px]">
      <InputGroup {...args}>
        <InputGroup.Addon>$</InputGroup.Addon>
        <InputGroup.Input
          defaultValue="1250"
          inputMode="decimal"
          type="number"
          placeholder="0.00"
        />
        <InputGroup.Addon>AUD</InputGroup.Addon>
      </InputGroup>
    </div>
  ),
}

export const MultiInput: Story = {
  name: 'Composition / Multi-Input',
  parameters: {
    docs: {
      description: {
        story: 'Stack multiple input groups together for complex forms.',
      },
    },
  },
  render: (args) => (
    <div className="w-[480px]">
      <InputGroup {...args} variant="secondary">
        <InputGroup.Addon>
          <TagIcon weight="bold" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Campaign name" />
        <InputGroup.Separator orientation="vertical" />
        <InputGroup.Addon>
          <TagIcon weight="bold" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Campaign name" />
      </InputGroup>
    </div>
  ),
}

export const Color: Story = {
  name: 'Composition / Color Input',
  parameters: {
    docs: {
      description: {
        story: 'A color input pattern with a leading icon addon.',
      },
    },
  },
  render: (args) => (
    <div className="w-[480px]">
      <InputGroup {...args}>
        <InputGroup.Input type="color" />
      </InputGroup>
    </div>
  ),
}
