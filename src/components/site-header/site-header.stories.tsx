import { MoonIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { SiteHeader } from '.'
import { Button } from '../button'
import { Input } from '../input'

export default {
  title: 'Components/Site Header',
  component: SiteHeader,
  parameters: {
    docs: {
      description: {
        component:
          'The SiteHeader component represents the top navigation bar of the application. It can be configured to be sticky or non-sticky.',
      },
    },
    layout: 'fullscreen',
  },

  render: (args) => (
    <div className="h-screen overflow-hidden border border-border bg-surface-background shadow-sm">
      <SiteHeader {...args}>
        <SiteHeader.Group>
          <SiteHeader.Title>Ixia UI</SiteHeader.Title>
        </SiteHeader.Group>
        <SiteHeader.Group position={'center'}>
          <Input placeholder="Search..." variant={'secondary'} className={'w-1/2'} />
        </SiteHeader.Group>
        <SiteHeader.Group position={'end'}>
          <Button aria-label="Toggle dark mode" tone="neutral" variant="ghost">
            <MoonIcon />
          </Button>
          <SiteHeader.Separator />
          <Button variant={'ghost'}>Get started</Button>
        </SiteHeader.Group>
      </SiteHeader>
      <main
        className="flex h-full flex-col items-center justify-center bg-surface-background text-center"
        id="overview"
      >
        <span className="mb-sm rounded-full border border-border px-md py-2xs style-text-default--2 text-on-surface">
          A thoughtful toolkit for React
        </span>
        <h1 className="mb-sm style-text-default-4 font-semibold text-on-surface">
          Build interfaces that feel right.
        </h1>
        <p className="mb-xl style-text-default-0 text-on-surface">
          Flexible, accessible components to help you create polished product experiences with less
          effort.
        </p>
        <SiteHeader.Group>
          <Button>Explore components</Button>
          <Button tone="neutral" variant="outline">
            Read the docs
          </Button>
        </SiteHeader.Group>
      </main>
    </div>
  ),
} as Meta<typeof SiteHeader>

type Story = StoryObj<typeof SiteHeader>

export const Playground: Story = {
  args: {
    sticky: false,
  },
}

export const Sticky: Story = {
  args: {
    sticky: true,
  },
}
