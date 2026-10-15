import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Tooltip } from './index'

export default {
  component: Tooltip,
  parameters: {
    description: {
      component:
        'Tooltip provides contextual hints without adding permanent UI clutter. These stories show placement, offset configuration, and common composition patterns.',
    },
    subtitle: 'Tooltips display informative text when users hover over, focus, or tap an element.',
  },
  subcomponents: { TooltipContent: Tooltip.Content, TooltipTrigger: Tooltip.Trigger },
  title: 'Components/Tooltip',
} satisfies Meta<typeof Tooltip>

type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  render: (args) => (
    <div className="flex w-[500px] items-center justify-center py-xl">
      <Tooltip {...args}>
        <Tooltip.Trigger className="hover:cursor-pointer hover:underline">
          <Button>Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip</Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const PositionTop: Story = {
  render: (args) => (
    <div className="flex w-[500px] items-center justify-center py-xl">
      <Tooltip {...args}>
        <Tooltip.Trigger className="hover:cursor-pointer hover:underline">
          <Button>Top tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top">Shown above trigger</Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const PositionRight: Story = {
  render: (args) => (
    <div className="flex w-[500px] items-center justify-center py-xl">
      <Tooltip {...args}>
        <Tooltip.Trigger className="hover:cursor-pointer hover:underline">
          <Button>Right tooltip</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Shown on the right</Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const BehaviorWithOffset: Story = {
  render: (args) => (
    <div className="flex w-[500px] items-center justify-center py-xl">
      <Tooltip {...args}>
        <Tooltip.Trigger className="hover:cursor-pointer hover:underline">
          <Button>Tooltip with offsets</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom" sideOffset={12} alignOffset={8}>
          Increased side and align offsets
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const CompositionIconButtonHelp: Story = {
  render: (args) => (
    <div className="w-[500px] rounded-lg border border-surface-3 bg-surface p-md">
      <div className="flex items-center justify-between">
        <span className="style-text-default-0">API Key</span>
        <Tooltip {...args}>
          <Tooltip.Trigger>
            <Button size="iconSmall" tone="neutral" variant="soft" aria-label="What is this?">
              ?
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="left">Used to authenticate your requests.</Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  ),
}
