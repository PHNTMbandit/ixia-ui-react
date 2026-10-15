import type { Meta, StoryObj } from '@storybook/react-vite'

import { ScrollArea } from './index'

const ORIENTATIONS = ['vertical', 'horizontal'] as const,
  ARTICLE_PARAGRAPHS = [
    'Product teams often need dense content in constrained spaces. Scroll areas keep the layout compact while still exposing long-form details when needed.',
    'This example demonstrates a vertical viewport that keeps surrounding UI fixed while body copy remains fully accessible through native scrolling.',
    'Use scroll areas in cards, side panels, activity feeds, and settings pages where available height is intentionally limited.',
    'For accessibility and discoverability, keep enough visible context and ensure focusable children remain keyboard reachable inside the viewport.',
  ] as const,
  CHAT_MESSAGES = [
    { text: 'Can we review the component docs before release?', user: 'Mila' },
    { text: 'I pushed updates for keyboard navigation and focus states.', user: 'Noah' },
    { text: 'Great. I will verify empty states and long-content behavior next.', user: 'Ava' },
    { text: 'Please include guidance on horizontal usage for media galleries.', user: 'Liam' },
    { text: 'On it. I will add examples for both orientations.', user: 'Emma' },
    { text: 'Thanks. That should make onboarding easier for new contributors.', user: 'Kai' },
  ] as const

interface Artwork {
  artist: string
  art: string
}

const works: Artwork[] = [
    {
      art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
      artist: 'Ornella Binni',
    },
    {
      art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
      artist: 'Tom Byrom',
    },
    {
      art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
      artist: 'Vladimir Malyavko',
    },
    {
      art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80',
      artist: 'Ornella Binni',
    },
    {
      art: 'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
      artist: 'Tom Byrom',
    },
    {
      art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
      artist: 'Vladimir Malyavko',
    },
  ],
  VerticalTemplate = ({
    orientation,
    variant,
  }: {
    orientation: 'vertical' | 'horizontal' | undefined | null
    variant: 'default' | 'ghost' | 'outline' | undefined | null
  }) => (
    <ScrollArea className="h-[100px] w-[400px]" orientation={orientation} variant={variant}>
      <div className="space-y-sm px-2xs">
        <h4 className="style-text-strong--1 text-on-surface">Scrollable Article</h4>
        {ARTICLE_PARAGRAPHS.map((paragraph, index) => (
          <p key={paragraph} className="style-text-default--1 text-on-surface-variant">
            {index + 1}. {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
  HorizontalTemplate = ({
    orientation,
    variant,
  }: {
    orientation: 'vertical' | 'horizontal' | undefined | null
    variant: 'default' | 'ghost' | 'outline' | undefined | null
  }) => (
    <div className="h-[220px] w-[640px]">
      <ScrollArea orientation={orientation} variant={variant}>
        {works.map((artwork, index) => (
          <figure className="shrink-0" key={`${artwork.artist}-${index}`}>
            <div className="overflow-hidden rounded-md">
              <img
                alt={artwork.artist}
                className="aspect-3/4 size-fit object-cover"
                height={400}
                src={artwork.art}
                width={300}
              />
            </div>
            <figcaption className="pt-xs style-text-default--2 text-on-surface-variant">
              Photo by <span className="text-on-surface">{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </ScrollArea>
    </div>
  )

export default {
  argTypes: {
    orientation: {
      control: { type: 'select' },
      description: 'Sets scroll direction and scrollbar axis.',
      options: ORIENTATIONS,
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    variant: {
      control: { type: 'select' },
      description: 'Applies a preset combination of background, borders, and viewport padding.',
      options: ['default', 'ghost', 'outline'],
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    orientation: 'vertical',
    variant: 'default',
  },
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component:
          'ScrollArea provides a polished container for content that exceeds its visible bounds. It supports vertical and horizontal orientation, styled scrollbars, and subtle edge gradients that hint at additional content. Use it for article sections, chat logs, media rails, activity lists, and any constrained layout where native overflow would feel too raw.',
      },
      subtitle: 'A styled viewport for overflowing content with custom scroll behavior and chrome.',
    },
  },
  render: (args) => <VerticalTemplate orientation={args.orientation} variant={args.variant} />,
  title: 'Components/Scroll Area',
} satisfies Meta<typeof ScrollArea>

type Story = StoryObj<typeof ScrollArea>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use controls to switch orientation.',
      },
    },
  },
}

export const VerticalArticle: Story = {
  name: 'Orientation / Vertical Article',
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  name: 'Orientation / Horizontal Gallery',
  render: (args) => <HorizontalTemplate orientation={args.orientation} variant={args.variant} />,
}

export const ChatFeed: Story = {
  args: {
    orientation: 'vertical',
  },
  name: 'Composition / Chat Feed',
  parameters: {
    docs: {
      description: {
        story: 'A realistic message list where content grows over time inside a fixed-height area.',
      },
    },
  },
  render: (args) => (
    <ScrollArea className="w-[420px]" orientation={args.orientation}>
      <div className="space-y-xs">
        {CHAT_MESSAGES.map((message) => (
          <div key={`${message.user}-${message.text}`} className="rounded-lg bg-surface p-xs">
            <p className="style-text-strong--2 text-on-surface">{message.user}</p>
            <p className="style-text-default--1 text-on-surface-variant">{message.text}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const DefaultVariant: Story = {
  args: {
    variant: 'default',
  },
  name: 'Variant / Default',
}

export const GhostVariant: Story = {
  args: {
    variant: 'ghost',
  },
  name: 'Variant / Ghost',
}

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
  },
  name: 'Variant / Outline',
}
