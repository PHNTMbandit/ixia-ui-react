import { CodeIcon, EyeIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs } from './index'

export default {
  argTypes: {
    fill: {
      control: 'boolean',
      description: 'Whether tabs should fill available width.',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'inline-radio' },
      description: 'Size of the tabs and indicator.',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },
    tone: {
      control: { type: 'inline-radio' },
      description: 'Color tone of the tabs.',
      options: ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'],
      table: {
        defaultValue: { summary: 'brand' },
        type: { summary: 'brand | accent | neutral | error | info | success | warning' },
      },
    },
    variant: {
      control: { type: 'inline-radio' },
      description: 'Visual style of the tabs list.',
      options: ['default', 'ghost', 'underline'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | ghost | underline' },
      },
    },
  },
  args: {
    fill: true,
    size: 'medium',
    variant: 'default',
  },
  component: Tabs,
  parameters: {
    description: {
      component:
        'The Tabs component allows users to navigate between different sections of content within the same context. Each tab corresponds to a panel that displays related information when selected.',
    },
    subtitle: 'A component for organizing content into separate views',
  },
  subcomponents: {
    TabsIndicator: Tabs.Indicator,
    TabsList: Tabs.List,
    TabsPanel: Tabs.Panel,
    TabsTab: Tabs.Tab,
  },
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

const BasicTemplate = (args: Story['args']) => (
  <div className="w-[500px]">
    <Tabs defaultValue="overview" {...args}>
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="details">Details</Tabs.Tab>
        <Tabs.Tab value="activity">Activity</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="overview" className="rounded-md border border-surface-3 bg-surface p-md">
        <p className="style-text-prose-0 text-on-surface">Overview content for this workspace.</p>
      </Tabs.Panel>
      <Tabs.Panel value="details" className="rounded-md border border-surface-3 bg-surface p-md">
        <p className="style-text-prose-0 text-on-surface">Detailed metadata and settings.</p>
      </Tabs.Panel>
      <Tabs.Panel value="activity" className="rounded-md border border-surface-3 bg-surface p-md">
        <p className="style-text-prose-0 text-on-surface">Recent activity appears here.</p>
      </Tabs.Panel>
    </Tabs>
  </div>
)

export const Playground: Story = {
  render: (args) => BasicTemplate(args),
}

export const VariantDefault: Story = {
  args: {
    fill: true,
    variant: 'default',
  },
  render: (args) => BasicTemplate(args),
}

export const VariantUnderline: Story = {
  args: {
    fill: true,
    variant: 'underline',
  },
  render: (args) => BasicTemplate(args),
}

export const VariantGhost: Story = {
  args: {
    fill: true,
    variant: 'ghost',
  },
  render: (args) => BasicTemplate(args),
}

export const BehaviorFitContent: Story = {
  args: {
    fill: false,
    variant: 'default',
  },
  render: (args) => BasicTemplate(args),
}

export const CompositionPreviewCode: Story = {
  args: {
    fill: false,
    variant: 'default',
  },
  render: (args) => (
    <div className="w-[500px]">
      <Tabs defaultValue="preview" {...args}>
        <Tabs.List>
          <Tabs.Tab value="preview">
            <EyeIcon weight="bold" />
            Preview
          </Tabs.Tab>
          <Tabs.Tab value="code">
            <CodeIcon weight="bold" />
            Code
          </Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel value="preview" className="rounded-md border border-surface-3 bg-surface p-md">
          <p className="style-text-prose-0">Live component preview area.</p>
        </Tabs.Panel>
        <Tabs.Panel value="code" className="rounded-md border border-surface-3 bg-surface p-md">
          <pre className="overflow-x-auto style-text-default--1 text-on-surface-muted">
            {`<Tabs defaultValue="preview">
  <TabsList>
    <TabsTab value="preview">Preview</TabsTab>
    <TabsTab value="code">Code</TabsTab>
    <TabsIndicator />
  </TabsList>
</Tabs>`}
          </pre>
        </Tabs.Panel>
      </Tabs>
    </div>
  ),
}

export const CompositionSettingsPage: Story = {
  args: {
    fill: false,
    variant: 'underline',
  },
  render: (args) => (
    <div className="w-[500px] space-y-md rounded-lg border border-surface-3 bg-surface p-md">
      <header>
        <h3 className="style-text-strong-2">Workspace Settings</h3>
        <p className="style-text-prose--1 text-on-surface-variant">
          Manage access, billing, and notifications.
        </p>
      </header>
      <Tabs defaultValue="general" {...args}>
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Panel
          value="general"
          className="rounded-md border border-surface-3 bg-surface-2 p-md"
        >
          <p className="style-text-prose-0">Workspace name, URL and locale preferences.</p>
        </Tabs.Panel>
        <Tabs.Panel
          value="members"
          className="rounded-md border border-surface-3 bg-surface-2 p-md"
        >
          <p className="style-text-prose-0">Invite and manage team member permissions.</p>
        </Tabs.Panel>
        <Tabs.Panel
          value="billing"
          className="rounded-md border border-surface-3 bg-surface-2 p-md"
        >
          <p className="style-text-prose-0">Plans, invoices and payment methods.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  ),
}
