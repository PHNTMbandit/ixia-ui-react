import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { BentoBox } from './index'

export default {
  argTypes: {
    size: {
      control: 'select',
      description: 'Sets the size of the bento box, affecting padding and spacing.',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
  args: {
    size: 'medium',
  },
  component: BentoBox,
  parameters: {
    docs: {
      description: {
        component:
          'The Bento Box component is a versatile container that allows for the organization of content into a structured and visually appealing layout. It provides a clean and modern design, making it suitable for various use cases, such as dashboards, cards, or any scenario where content needs to be presented in a compact and organized manner.',
      },
      subtitle: 'A flexible container that organizes content into a visually appealing layout.',
    },
  },
  render: (args) => (
    <div className="w-[32rem]">
      <BentoBox {...args}>
        <BentoBox.Header>
          <BentoBox.Title>Cloud Storage</BentoBox.Title>
          <BentoBox.Description>
            You have used 42 GB of your 100 GB plan. Upgrade any time to unlock more space and
            longer file retention.
          </BentoBox.Description>
          <BentoBox.Action>
            <Button variant="ghost" tone="neutral">
              Manage
            </Button>
          </BentoBox.Action>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>
            Files sync automatically across every device on your account. Recent uploads appear here
            as soon as they finish processing.
          </p>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
  title: 'Components/Bento Box',
} satisfies Meta<typeof BentoBox>

type Story = StoryObj<typeof BentoBox>

/**
 * The default composition: a header with a title, description, and action, followed by content.
 * Use the controls to experiment with the container props.
 */
export const Playground: Story = {}

/**
 * The bento box is content-agnostic. When you only need to present a block of content you can
 * drop the header entirely and rely on `BentoBoxContent` for spacing and layout.
 */
export const ContentOnly: Story = {
  name: 'Content Only',
  render: (args) => (
    <div className="w-[32rem]">
      <BentoBox {...args}>
        <BentoBox.Content>
          <p>
            “The best way to predict the future is to invent it.” Drop a quote, a callout, or a
            short note in here when a heading would only get in the way.
          </p>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}

/**
 * A common dashboard use case: a compact tile that surfaces a single key metric. The action slot
 * can hold a filter, a menu trigger, or a link to a detailed view.
 */
export const StatCard: Story = {
  name: 'Stat / Metric Card',
  render: (args) => (
    <div className="w-[24rem]">
      <BentoBox {...args}>
        <BentoBox.Header>
          <BentoBox.Title>Monthly Revenue</BentoBox.Title>
          <BentoBox.Description>Compared to last month</BentoBox.Description>
          <BentoBox.Action>
            <Button variant="ghost" tone="neutral" size="small">
              View report
            </Button>
          </BentoBox.Action>
        </BentoBox.Header>
        <BentoBox.Content>
          <div className="flex items-baseline gap-2xs">
            <span className="style-text-strong-3">$48,120</span>
            <span className="style-text-default--1 text-success-default">+12.4%</span>
          </div>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}

/**
 * The content area grows to fill the available space, which makes the bento box a natural host for
 * charts, sparklines, or any data visualization.
 */
export const WithVisualization: Story = {
  name: 'With Visualization',
  render: (args) => (
    <div className="h-[20rem] w-[32rem]">
      <BentoBox {...args}>
        <BentoBox.Header>
          <BentoBox.Title>Active Users</BentoBox.Title>
          <BentoBox.Description>Sessions per day over the last week</BentoBox.Description>
          <BentoBox.Action>
            <Button variant="ghost" tone="neutral" size="small">
              Export
            </Button>
          </BentoBox.Action>
        </BentoBox.Header>
        <BentoBox.Content>
          <div className="flex h-full items-end gap-2xs">
            {[40, 65, 50, 80, 60, 95, 72].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-md bg-brand-default"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}

/**
 * A media-forward card. The rounded media sits inside the content area, pairing an image or
 * gradient with a caption below — ideal for galleries, product tiles, or marketing highlights.
 */
export const MediaCard: Story = {
  name: 'Media Card',
  render: (args) => (
    <div className="w-[28rem]">
      <BentoBox {...args}>
        <BentoBox.Content>
          <div className="aspect-video w-full rounded-2xl bg-linear-to-br from-brand-default to-accent-default" />
        </BentoBox.Content>
        <BentoBox.Header>
          <BentoBox.Title>Mountain Escape</BentoBox.Title>
          <BentoBox.Description>
            Twelve hand-picked alpine cabins with floor-to-ceiling views, available for booking this
            winter season.
          </BentoBox.Description>
          <BentoBox.Action>
            <Button variant="ghost" tone="neutral" size="small">
              Explore
            </Button>
          </BentoBox.Action>
        </BentoBox.Header>
      </BentoBox>
    </div>
  ),
}

/**
 * A feature highlight tile that pairs an icon, a heading, and a call to action. Ideal for landing
 * pages and onboarding flows.
 */
export const FeatureHighlight: Story = {
  name: 'Feature Highlight',
  render: (args) => (
    <div className="w-[28rem]">
      <BentoBox {...args}>
        <BentoBox.Header>
          <div className="flex size-xl items-center justify-center rounded-2xl bg-brand-muted text-brand-on-default">
            <svg
              aria-hidden
              className="size-md"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Title>Lightning-fast deploys</BentoBox.Title>
          <BentoBox.Description>
            Push to your main branch and we build, test, and ship to a global edge network in
            seconds — no config required.
          </BentoBox.Description>
        </BentoBox.Content>
        <BentoBox.Footer>
          <Button variant="soft" tone="brand" size="small" className="self-start">
            Learn more
          </Button>
        </BentoBox.Footer>
      </BentoBox>
    </div>
  ),
}

/**
 * A list-style bento box that groups related actions or navigation items. Each row can be a link,
 * button, or any interactive element.
 */
export const ActionList: Story = {
  name: 'Action List',
  render: (args) => (
    <div className="w-[24rem]">
      <BentoBox {...args}>
        <BentoBox.Header>
          <BentoBox.Title>Quick Actions</BentoBox.Title>
          <BentoBox.Description>Jump straight into common tasks</BentoBox.Description>
        </BentoBox.Header>
        <BentoBox.Content>
          <div className="flex flex-col gap-3xs">
            {['Create a project', 'Invite a teammate', 'View billing', 'Open settings'].map(
              (label) => (
                <Button key={label} variant="soft" tone="neutral" className="w-full justify-start">
                  {label}
                </Button>
              ),
            )}
          </div>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}

/**
 * A uniform, responsive grid of equally sized bento boxes. This is the go-to layout for a
 * collection of cards such as products, settings groups, or reports.
 */
export const UniformGrid: Story = {
  name: 'Uniform Grid',
  render: (args) => {
    const cards = [
      {
        description: 'Track traffic, conversions, and retention with real-time dashboards.',
        title: 'Analytics',
      },
      {
        description: 'Trigger workflows from events without writing a single line of code.',
        title: 'Automations',
      },
      {
        description: 'Connect the tools your team already uses in just a few clicks.',
        title: 'Integrations',
      },
      {
        description: 'Keep everyone in the loop with email, Slack, and in-app alerts.',
        title: 'Notifications',
      },
      {
        description: 'Give each teammate exactly the access they need, and nothing more.',
        title: 'Permissions',
      },
      {
        description: 'Review every change with a complete, exportable activity history.',
        title: 'Audit Log',
      },
    ]

    return (
      <div className="grid w-5xl grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <BentoBox {...args} key={card.title}>
            <BentoBox.Header>
              <BentoBox.Title>{card.title}</BentoBox.Title>
              <BentoBox.Description>{card.description}</BentoBox.Description>
              <BentoBox.Action>
                <Button variant="ghost" tone="neutral" size="small">
                  Open
                </Button>
              </BentoBox.Action>
            </BentoBox.Header>
            <BentoBox.Content>
              <p>Enabled for your workspace</p>
            </BentoBox.Content>
          </BentoBox>
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => (
    <div className="flex flex-col gap-lg">
      <BentoBox {...args} size="small">
        <BentoBox.Header>
          <BentoBox.Title>Small Bento Box</BentoBox.Title>
          <BentoBox.Description>This is a small bento box.</BentoBox.Description>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} size="medium">
        <BentoBox.Header>
          <BentoBox.Title>Medium Bento Box</BentoBox.Title>
          <BentoBox.Description>This is a medium bento box.</BentoBox.Description>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} size="large">
        <BentoBox.Header>
          <BentoBox.Title>Large Bento Box</BentoBox.Title>
          <BentoBox.Description>This is a large bento box.</BentoBox.Description>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}

export const Fill: Story = {
  name: 'Fill',
  render: (args) => (
    <div className="grid h-[min(36rem,80vh)] w-[min(48rem,90vw)] grid-cols-2 grid-rows-2 gap-sm">
      <BentoBox {...args} fill className="row-span-2">
        <img
          src="https://picsum.photos/seed/bento-1/800/500"
          alt="Random scenic picture"
          className="size-full object-cover"
        />
      </BentoBox>
      <BentoBox {...args} fill className="col-start-2 row-start-1">
        <img
          src="https://picsum.photos/seed/bento-2/800/500"
          alt="Random scenic picture"
          className="size-full object-cover"
        />
      </BentoBox>
      <BentoBox {...args} fill className="col-start-2 row-start-2">
        <img
          src="https://picsum.photos/seed/bento-3/800/500"
          alt="Random scenic picture"
          className="size-full object-cover"
        />
      </BentoBox>
    </div>
  ),
}

export const Elevations: Story = {
  name: 'Elevations',
  render: (args) => (
    <div className="flex flex-col gap-lg">
      <BentoBox {...args} elevation="none">
        <BentoBox.Header>
          <BentoBox.Title>None Elevation</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} elevation="low">
        <BentoBox.Header>
          <BentoBox.Title>Low Elevation</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} elevation="medium">
        <BentoBox.Header>
          <BentoBox.Title>Medium Elevation</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} elevation="high">
        <BentoBox.Header>
          <BentoBox.Title>High Elevation</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>

      <BentoBox {...args} elevation="veryHigh">
        <BentoBox.Header>
          <BentoBox.Title>Very High Elevation</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <p>Content goes here.</p>
        </BentoBox.Content>
      </BentoBox>
    </div>
  ),
}
