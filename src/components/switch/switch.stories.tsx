import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './switch'

const SETTINGS = [
  { description: 'Receive push notifications', id: 'notifications', label: 'Enable Notifications' },
  { description: 'Weekly email summary', id: 'emailDigest', label: 'Email Digest' },
  { description: 'Use dark color scheme', id: 'darkMode', label: 'Dark Mode' },
  { description: 'Help us improve with usage data', id: 'analytics', label: 'Analytics' },
]

export default {
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Initial uncontrolled checked state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch interaction',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    id: {
      control: 'text',
      description: 'HTML id attribute for the switch button',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    id: 'switch-playground',
  },
  component: Switch,
  parameters: {
    description: {
      component:
        'The Switch component allows users to toggle between two states, such as on and off. It is commonly used in forms and settings to represent binary options. The Switch can be customized with different states to fit various design needs.',
    },
    subtitle: 'A toggle switch component for binary choices.',
  },
  title: 'Components/Switch',
} satisfies Meta<typeof Switch>

type Story = StoryObj<typeof Switch>

export const Playground: Story = {
  render: (args) => <Switch {...args}>Switch label</Switch>,
}

export const StateUnchecked: Story = {
  render: () => (
    <Switch id="state-unchecked" defaultChecked={false}>
      Unchecked State
    </Switch>
  ),
}

export const StateChecked: Story = {
  render: () => <Switch id="state-checked">Checked State</Switch>,
}

export const BehaviorDisabledUnchecked: Story = {
  render: () => (
    <Switch id="behavior-disabled-unchecked" disabled defaultChecked={false}>
      Disabled Unchecked State
    </Switch>
  ),
}

export const BehaviorDisabledChecked: Story = {
  render: () => (
    <Switch id="behavior-disabled-checked" disabled defaultChecked>
      Disabled Checked State
    </Switch>
  ),
}

export const CompositionSettingsForm: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg rounded-lg border border-surface-3 bg-surface p-md">
      <div>
        <h2 className="mb-xs style-text-strong-2">Notification Settings</h2>
        <p className="style-text-prose--1 text-on-surface-variant">Manage your preferences</p>
      </div>
      <div className="space-y-md">
        {SETTINGS.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between py-xs">
            <div>
              <p className="style-text-default-0">{setting.label}</p>
              <p className="style-text-prose--1 text-on-surface-variant">{setting.description}</p>
            </div>
            <Switch
              id={setting.id}
              aria-label={setting.label}
              defaultChecked={Math.random() > 0.5}
            />
          </div>
        ))}
      </div>
    </div>
  ),
}

export const CompositionFeatureFlags: Story = {
  render: () => (
    <div className="w-[500px] space-y-md">
      <div className="rounded-lg border border-surface-3 bg-surface p-md">
        <h3 className="mb-md style-text-strong-1">Beta Features</h3>
        <div className="space-y-md">
          <div className="flex items-center justify-between border-b border-surface-3 pb-md">
            <div>
              <p className="style-text-default-0">New Dashboard</p>
              <p className="style-text-prose--1 text-on-surface-variant">
                Try the redesigned dashboard
              </p>
            </div>
            <Switch id="feature-dashboard" aria-label="New Dashboard" defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between border-b border-surface-3 pb-md">
            <div>
              <p className="style-text-default-0">Advanced Analytics</p>
              <p className="style-text-prose--1 text-on-surface-variant">
                Access detailed insights
              </p>
            </div>
            <Switch id="feature-analytics" aria-label="Advanced Analytics" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="style-text-default-0">Experimental Mode</p>
              <p className="style-text-prose--1 text-on-surface-variant">
                Enable cutting-edge features
              </p>
            </div>
            <Switch
              id="feature-experimental"
              aria-label="Experimental Mode"
              defaultChecked={false}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const CompositionPrivacyToggles: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg rounded-lg border border-surface-3 bg-surface p-md">
      <div>
        <h2 className="mb-xs style-text-strong-2">Privacy & Security</h2>
        <p className="style-text-prose--1 text-on-surface-variant">
          Control your data sharing preferences
        </p>
      </div>
      <div className="space-y-md">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="style-text-default-0">Public Profile</p>
            <p className="style-text-prose--1 text-on-surface-variant">
              Make your profile visible to others
            </p>
          </div>
          <Switch id="privacy-public" aria-label="Public Profile" defaultChecked={false} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="style-text-default-0">Data Sharing</p>
            <p className="style-text-prose--1 text-on-surface-variant">
              Share anonymized usage data
            </p>
          </div>
          <Switch id="privacy-sharing" aria-label="Data Sharing" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="style-text-default-0">Two-Factor Authentication</p>
            <p className="style-text-prose--1 text-on-surface-variant">
              Add extra security to your account
            </p>
          </div>
          <Switch id="privacy-2fa" aria-label="Two-Factor Authentication" defaultChecked />
        </div>
      </div>
    </div>
  ),
}
