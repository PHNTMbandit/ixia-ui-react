import { BellIcon, ChartBarIcon, UserIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Avatar, AvatarImage } from '../avatar'
import { Button } from '../button'
import { Popover, popoverHandle } from './index'

export default {
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'The Popover component provides a way to display additional information or actions in a floating container that appears on user interaction, such as clicking or hovering over an element. It is useful for showing tooltips, menus, or other contextual content without cluttering the main interface.',
      },
      subtitle: 'A component for displaying contextual overlays.',
    },
  },
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button type="button" className="style-text-default-0 hover:cursor-pointer hover:underline">
          Click me
        </button>
      </Popover.Trigger>
      <Popover.Panel side="top">
        <Popover.Header>
          <Popover.Title>Popover Title</Popover.Title>
          <Popover.Description>
            Popover content goes here. Popover content goes here. Popover content goes here.{' '}
          </Popover.Description>
        </Popover.Header>
        <Popover.Content>
          <Button size="medium" className={'w-full'}>
            Action
          </Button>
        </Popover.Content>
      </Popover.Panel>
    </Popover>
  ),
  subcomponents: {
    PopoverDescription: Popover.Description,
    PopoverPanel: Popover.Panel,
    PopoverTitle: Popover.Title,
    PopoverTrigger: Popover.Trigger,
  },
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>

type Story = StoryObj<typeof Popover>

export const Default: Story = {}
export const Animated: Story = {
  render: (args) => (
    <div className="flex gap-2xs">
      <Popover.Trigger handle={popoverHandle} payload={NotificationsPanel}>
        <Button aria-label="Notifications" size="iconMedium" variant="ghost" tone="neutral">
          <BellIcon weight="bold" />
        </Button>
      </Popover.Trigger>
      <Popover.Trigger handle={popoverHandle} payload={ProfilePanel} nativeButton={false}>
        <Button aria-label="Profile" size="iconMedium" variant="ghost" tone="neutral">
          <UserIcon weight="bold" />
        </Button>
      </Popover.Trigger>
      <Popover.Trigger handle={popoverHandle} payload={ActivityPanel} nativeButton={false}>
        <Button aria-label="Activity" size="iconMedium" variant="ghost" tone="neutral">
          <ChartBarIcon weight="bold" />
        </Button>
      </Popover.Trigger>
      <Popover handle={popoverHandle} {...args}>
        {({ payload }) => {
          const Payload = payload as React.ComponentType | undefined
          return <Popover.Panel side="top">{Payload !== undefined && <Payload />}</Popover.Panel>
        }}
      </Popover>
    </div>
  ),
}

export const Elevations: Story = {
  render: (args) => (
    <div className="flex items-center gap-sm">
      <Popover {...args}>
        <Popover.Trigger>
          <button
            type="button"
            className="style-text-default-0 hover:cursor-pointer hover:underline"
          >
            Low
          </button>
        </Popover.Trigger>
        <Popover.Panel side="top" elevation="low">
          <Popover.Header>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              Popover content goes here. Popover content goes here. Popover content goes here.{' '}
            </Popover.Description>
          </Popover.Header>
          <Popover.Content>
            <Button size="medium" className="w-full">
              Action
            </Button>
          </Popover.Content>
        </Popover.Panel>
      </Popover>
      <Popover {...args}>
        <Popover.Trigger>
          <button
            type="button"
            className="style-text-default-0 hover:cursor-pointer hover:underline"
          >
            Medium
          </button>
        </Popover.Trigger>
        <Popover.Panel side="top" elevation="medium">
          <Popover.Header>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              Popover content goes here. Popover content goes here. Popover content goes here.{' '}
            </Popover.Description>
          </Popover.Header>
          <Popover.Content>
            <Button size="medium" className="w-full">
              Action
            </Button>
          </Popover.Content>
        </Popover.Panel>
      </Popover>
      <Popover {...args}>
        <Popover.Trigger>
          <button
            type="button"
            className="style-text-default-0 hover:cursor-pointer hover:underline"
          >
            High
          </button>
        </Popover.Trigger>
        <Popover.Panel side="top" elevation="high">
          <Popover.Header>
            <Popover.Title>Popover Title</Popover.Title>
            <Popover.Description>
              Popover content goes here. Popover content goes here. Popover content goes here.{' '}
            </Popover.Description>
          </Popover.Header>
          <Popover.Content>
            <Button size="medium" className="w-full">
              Action
            </Button>
          </Popover.Content>
        </Popover.Panel>
      </Popover>
    </div>
  ),
}

function NotificationsPanel() {
  return (
    <>
      <Popover.Title>Notifications</Popover.Title>
      <Popover.Description>You are all caught up. Good job!</Popover.Description>
    </>
  )
}

function ProfilePanel() {
  return (
    <div className="-mx-2xs grid grid-cols-[auto_auto] gap-x-xs">
      <Popover.Title>Jason Eventon</Popover.Title>
      <Avatar>
        <AvatarImage
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          width="48"
          height="48"
          className="size-full object-cover"
        />
      </Avatar>
      <span className="col-start-2 col-end-3 row-start-2 row-end-3 text-sm">Pro plan</span>
      <div className="col-start-1 col-end-3 row-start-3 row-end-4 mt-2xs flex flex-col gap-2xs border-t pt-3xs text-sm">
        <a href="#" className="no-underline hover:underline">
          Profile settings
        </a>
        <a href="#" className="no-underline hover:underline">
          Log out
        </a>
      </div>
    </div>
  )
}

function ActivityPanel() {
  return (
    <>
      <Popover.Title className="m-0 text-base font-medium">Activity</Popover.Title>
      <Popover.Description className="m-0 text-base">
        Nothing interesting happened recently.
      </Popover.Description>
    </>
  )
}
