import type { Meta, StoryObj } from '@storybook/react-vite'

import { Collapsible } from './index'

export default {
  component: Collapsible,
  parameters: {
    docs: {
      description: {
        component:
          'The Collapsible component is used to create collapsible sections of content. It typically consists of a trigger that can be clicked to expand or collapse the content.',
      },
      subtitle: 'Collapsibles are used to hide and show content.',
    },
  },
  render: (args) => (
    <Collapsible {...args} className={'w-[200px]'}>
      <Collapsible.Trigger>Toggle Content</Collapsible.Trigger>
      <Collapsible.Panel>
        <div>alien-bean-pasta</div>
        <div>wild-irish-burrito</div>
        <div>horse-battery-staple</div>
      </Collapsible.Panel>
    </Collapsible>
  ),
  subcomponents: {
    CollapsiblePanel: Collapsible.Panel,
    CollapsibleTrigger: Collapsible.Trigger,
  },
  title: 'Components/Collapsible',
} satisfies Meta<typeof Collapsible>

type Story = StoryObj<typeof Collapsible>

export const Playground: Story = {}

export const Ghost: Story = {
  name: 'Tone / Ghost',
  render: (args) => (
    <Collapsible {...args}>
      <Collapsible.Trigger variant="ghost">Toggle Content</Collapsible.Trigger>
      <Collapsible.Panel>
        <div>alien-bean-pasta</div>
        <div>wild-irish-burrito</div>
        <div>horse-battery-staple</div>
      </Collapsible.Panel>
    </Collapsible>
  ),
}

export const Elevated: Story = {
  name: 'Tone / Elevated',
  render: (args) => (
    <Collapsible {...args}>
      <Collapsible.Trigger variant="elevated">Toggle Content</Collapsible.Trigger>
      <Collapsible.Panel>
        <div>alien-bean-pasta</div>
        <div>wild-irish-burrito</div>
        <div>horse-battery-staple</div>
      </Collapsible.Panel>
    </Collapsible>
  ),
}

export const Outline: Story = {
  name: 'Tone / Outlined',
  render: (args) => (
    <Collapsible {...args}>
      <Collapsible.Trigger variant="outline">Toggle Content</Collapsible.Trigger>
      <Collapsible.Panel>
        <div>alien-bean-pasta</div>
        <div>wild-irish-burrito</div>
        <div>horse-battery-staple</div>
      </Collapsible.Panel>
    </Collapsible>
  ),
}
