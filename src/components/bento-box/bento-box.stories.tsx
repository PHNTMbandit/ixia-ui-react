import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Button } from '../button'
import { IconContainer } from '../icon-container'
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
          <BentoBox.HeaderAside>
            <Button variant="ghost" tone="neutral">
              Manage
            </Button>
          </BentoBox.HeaderAside>
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
          <BentoBox.HeaderAside>
            <Button variant="ghost" tone="neutral" size="small">
              View report
            </Button>
          </BentoBox.HeaderAside>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Value>$48,120</BentoBox.Value>
          <BentoBox.Description>+12.4%</BentoBox.Description>
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
      <BentoBox {...args} className="h-full">
        <BentoBox.Header>
          <BentoBox.Title>Active Users</BentoBox.Title>
          <BentoBox.Description>Sessions per day over the last week</BentoBox.Description>
          <BentoBox.HeaderAside>
            <Button variant="ghost" tone="neutral" size="small">
              Export
            </Button>
          </BentoBox.HeaderAside>
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
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector<HTMLElement>('[data-size]'),
      container = box?.parentElement

    if (!box || !container) {
      throw new Error('The visualization needs a tile inside its fixed-height container.')
    }

    await expect(box.getBoundingClientRect().height).toBeCloseTo(
      container.getBoundingClientRect().height,
      0,
    )
  },
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
          <BentoBox.HeaderAside>
            <Button variant="ghost" tone="neutral" size="small">
              Explore
            </Button>
          </BentoBox.HeaderAside>
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
          <IconContainer size={'small'}>
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
          </IconContainer>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Title>Lightning-fast deploys</BentoBox.Title>
          <BentoBox.Description>
            Push to your main branch and we build, test, and ship to a global edge network in
            seconds — no config required.
          </BentoBox.Description>
        </BentoBox.Content>
        <BentoBox.Footer>
          <Button variant="secondary" tone="brand" size="small" className="self-start">
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
                <Button
                  key={label}
                  variant="secondary"
                  tone="neutral"
                  className="w-full justify-start"
                >
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
      <BentoBox.Grid className="w-[min(72rem,90vw)] items-stretch" data-testid="uniform-grid">
        {cards.map((card) => (
          <BentoBox {...args} key={card.title}>
            <BentoBox.Header>
              <BentoBox.Title>{card.title}</BentoBox.Title>
              <BentoBox.Description>{card.description}</BentoBox.Description>
              <BentoBox.HeaderAside>
                <Button variant="ghost" tone="neutral" size="small">
                  Open
                </Button>
              </BentoBox.HeaderAside>
            </BentoBox.Header>
            <BentoBox.Content>
              <p>Enabled for your workspace</p>
            </BentoBox.Content>
          </BentoBox>
        ))}
      </BentoBox.Grid>
    )
  },
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByTestId('uniform-grid'),
      boxes = Array.from(grid.querySelectorAll<HTMLElement>(':scope > [data-size]'))

    if (boxes.length < 3) {
      throw new Error('The uniform grid needs at least three tiles.')
    }

    const originalWidth = grid.style.width,
      originalMinHeight = boxes[0].style.minHeight

    try {
      grid.style.width = '54rem'
      boxes[0].style.minHeight = `${boxes[0].getBoundingClientRect().height + 32}px`
      const firstBounds = boxes[0].getBoundingClientRect()

      for (const box of boxes.slice(1, 3)) {
        await expect(box.getBoundingClientRect().top).toBeCloseTo(firstBounds.top, 0)
        await expect(box.getBoundingClientRect().height).toBeCloseTo(firstBounds.height, 0)
      }
    } finally {
      grid.style.width = originalWidth
      boxes[0].style.minHeight = originalMinHeight
    }
  },
}

export const DashboardGrid: Story = {
  name: 'Responsive Bento Grid',
  render: (args) => (
    <BentoBox.Grid className="max-w-[42rem]" data-testid="bento-grid">
      <BentoBox {...args} span="full" data-testid="wide-tile">
        <BentoBox.Header>
          <BentoBox.Title>Weekly activity</BentoBox.Title>
          <BentoBox.Description>A snapshot of your progress</BentoBox.Description>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Value>248</BentoBox.Value>
        </BentoBox.Content>
      </BentoBox>
      <BentoBox {...args} data-testid="focus-tile">
        <BentoBox.Header>
          <BentoBox.Title>Focus time</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Value>12h 30m</BentoBox.Value>
        </BentoBox.Content>
      </BentoBox>
      <BentoBox {...args} data-testid="tasks-tile">
        <BentoBox.Header>
          <BentoBox.Title>Completed tasks</BentoBox.Title>
        </BentoBox.Header>
        <BentoBox.Content>
          <BentoBox.Value>32</BentoBox.Value>
        </BentoBox.Content>
      </BentoBox>
    </BentoBox.Grid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement),
      grid = canvas.getByTestId('bento-grid'),
      wide = canvas.getByTestId('wide-tile'),
      focus = canvas.getByTestId('focus-tile'),
      tasks = canvas.getByTestId('tasks-tile'),
      originalWidth = grid.style.width

    grid.style.width = '12rem'
    await expect(focus.getBoundingClientRect().right).toBeLessThanOrEqual(
      grid.getBoundingClientRect().right + 1,
    )
    await expect(tasks.getBoundingClientRect().top).toBeGreaterThan(
      focus.getBoundingClientRect().top,
    )

    grid.style.width = '42rem'
    await expect(wide.getBoundingClientRect().width).toBeCloseTo(
      grid.getBoundingClientRect().width,
      0,
    )
    await expect(focus.getBoundingClientRect().top).toBeCloseTo(
      tasks.getBoundingClientRect().top,
      0,
    )
    await expect(wide.hasAttribute('span')).toBe(false)
    grid.style.width = originalWidth
  },
}

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => (
    <BentoBox.Grid className="max-w-[54rem]" data-testid="sizes-grid">
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
    </BentoBox.Grid>
  ),
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByTestId('sizes-grid'),
      boxes = Array.from(grid.querySelectorAll<HTMLElement>(':scope > [data-size]')),
      originalWidth = grid.style.width

    await expect(boxes).toHaveLength(3)

    try {
      grid.style.width = '54rem'
      const wideHeights = boxes.map((box) => box.getBoundingClientRect().height),
        columnWidth = boxes[0].getBoundingClientRect().width

      await expect(wideHeights[0]).toBeLessThan(wideHeights[1])
      await expect(wideHeights[1]).toBeLessThan(wideHeights[2])

      grid.style.width = `${columnWidth}px`
      for (const [index, box] of boxes.entries()) {
        await expect(box.getBoundingClientRect().height).toBeCloseTo(wideHeights[index], 0)
        await expect(box.getBoundingClientRect().right).toBeLessThanOrEqual(
          grid.getBoundingClientRect().right + 1,
        )
      }
    } finally {
      grid.style.width = originalWidth
    }
  },
}

export const Fill: Story = {
  name: 'Fill',
  render: (args) => (
    <div className="grid h-[min(36rem,80vh)] w-[min(48rem,90vw)] grid-cols-2 grid-rows-2 gap-sm">
      <BentoBox {...args} fill className="row-span-2">
        <BentoBox.Image
          src="https://picsum.photos/seed/bento-1/800/500"
          alt="Random scenic picture"
        />
        <BentoBox.Overlay>
          <BentoBox.Header>
            <BentoBox.Title>Explore the outdoors</BentoBox.Title>
            <BentoBox.Description>Find inspiration for your next escape.</BentoBox.Description>
          </BentoBox.Header>
        </BentoBox.Overlay>
      </BentoBox>
      <BentoBox {...args} fill className="col-start-2 row-start-1">
        <BentoBox.Image
          src="https://picsum.photos/seed/bento-2/800/500"
          alt="Random scenic picture"
        />
        <BentoBox.Overlay>
          <BentoBox.Header>
            <BentoBox.Title>A different perspective</BentoBox.Title>
          </BentoBox.Header>
        </BentoBox.Overlay>
      </BentoBox>
      <BentoBox {...args} fill className="col-start-2 row-start-2">
        <BentoBox.Image
          src="https://picsum.photos/seed/bento-3/800/500"
          alt="Random scenic picture"
        />
      </BentoBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const overlays = canvasElement.querySelectorAll<HTMLElement>('[data-slot=bento-box-overlay]'),
      overlay = overlays[0],
      box = overlay?.parentElement,
      image = box?.querySelector('img')

    if (!overlay || !box || !image) {
      throw new Error('The filled Bento Box needs an image and overlay.')
    }

    const title = within(overlay).getByText('Explore the outdoors'),
      description = within(overlay).getByText('Find inspiration for your next escape.')

    await expect(overlays).toHaveLength(2)
    await expect(getComputedStyle(box).display).toBe('grid')
    await expect(getComputedStyle(image).objectFit).toBe('cover')
    await expect(overlay.getBoundingClientRect().bottom).toBeCloseTo(
      box.getBoundingClientRect().bottom,
      0,
    )
    await expect(getComputedStyle(description).color).toBe(getComputedStyle(title).color)

    const overlayStyle = getComputedStyle(overlay),
      boxStyle = getComputedStyle(box),
      originalLeftRadius = box.style.borderBottomLeftRadius,
      originalRightRadius = box.style.borderBottomRightRadius

    try {
      await expect(overlayStyle.borderBottomLeftRadius).toBe(boxStyle.borderBottomLeftRadius)
      await expect(overlayStyle.borderBottomRightRadius).toBe(boxStyle.borderBottomRightRadius)
      await expect(overlayStyle.borderTopLeftRadius).toBe('0px')
      await expect(overlayStyle.borderTopRightRadius).toBe('0px')

      box.style.borderBottomLeftRadius = '13px'
      box.style.borderBottomRightRadius = '29px'
      await expect(overlayStyle.borderBottomLeftRadius).toBe(boxStyle.borderBottomLeftRadius)
      await expect(overlayStyle.borderBottomRightRadius).toBe(boxStyle.borderBottomRightRadius)
    } finally {
      box.style.borderBottomLeftRadius = originalLeftRadius
      box.style.borderBottomRightRadius = originalRightRadius
    }
  },
}

export const CompactFill: Story = {
  name: 'Fill / Compact overlay',
  render: (args) => (
    <div className="w-[20rem]">
      <BentoBox {...args} fill data-testid="compact-image-tile">
        <BentoBox.Image
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Cpath fill='%23789c91' d='M0 0h16v9H0z'/%3E%3C/svg%3E"
          alt=""
        />
        <BentoBox.Overlay>
          <BentoBox.Header>
            <BentoBox.Title>Explore the outdoors</BentoBox.Title>
            <BentoBox.Description>Find inspiration for your next escape.</BentoBox.Description>
          </BentoBox.Header>
          <BentoBox.Value>24 trails</BentoBox.Value>
        </BentoBox.Overlay>
      </BentoBox>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByTestId('compact-image-tile'),
      overlay = box.querySelector<HTMLElement>('[data-slot=bento-box-overlay]'),
      image = box.querySelector('img')

    if (!overlay || !image) {
      throw new Error('The compact Bento Box needs an image and overlay.')
    }

    const originalWidth = box.style.width
    box.style.width = '7rem'
    const boxBounds = box.getBoundingClientRect(),
      overlayBounds = overlay.getBoundingClientRect(),
      imageBounds = image.getBoundingClientRect()

    await expect(overlayBounds.top).toBeGreaterThanOrEqual(boxBounds.top - 1)
    await expect(overlayBounds.bottom).toBeCloseTo(boxBounds.bottom, 0)
    await expect(imageBounds.height).toBeGreaterThanOrEqual(overlayBounds.height - 1)
    await expect(getComputedStyle(within(overlay).getByText('24 trails')).color).toBe(
      getComputedStyle(overlay).color,
    )
    box.style.width = originalWidth
  },
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
