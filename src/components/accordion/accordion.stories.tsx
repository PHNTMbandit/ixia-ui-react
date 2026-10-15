import {
  BellIcon,
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionSubtitle,
  AccordionTitle,
} from './index'

const TONE_ICONS = {
    accent: <BellIcon weight="duotone" />,
    brand: <InfoIcon weight="duotone" />,
    error: <XCircleIcon weight="duotone" />,
    info: <InfoIcon weight="duotone" />,
    neutral: <InfoIcon weight="duotone" />,
    success: <CheckCircleIcon weight="duotone" />,
    warning: <WarningIcon weight="duotone" />,
  },
  TONE_CONTENT: Record<string, { title: string; subtitle: string; body: string }> = {
    accent: {
      body: 'Discover the latest features and improvements in this release. This section highlights notable changes and enhancements that improve the overall user experience.',
      subtitle: 'Check out this new update',
      title: 'Highlighted Feature',
    },
    brand: {
      body: 'This section contains important brand-related information, including color usage, typography standards, and logo guidelines to ensure a consistent visual identity.',
      subtitle: 'Core brand guidelines and assets',
      title: 'Brand Information',
    },
    error: {
      body: 'An error occurred while processing your request. Please review the details below and take the appropriate action to resolve the issue before continuing.',
      subtitle: 'Something went wrong',
      title: 'Error Details',
    },
    info: {
      body: 'This section provides additional context and background information. Expanding this panel will give you a deeper understanding of the subject matter.',
      subtitle: 'Learn more about this topic',
      title: 'Additional Information',
    },
    neutral: {
      body: 'This section provides general context and supplementary information. It is intended for neutral, non-critical content that supports the main content of the page.',
      subtitle: 'Background context and details',
      title: 'General Information',
    },
    success: {
      body: 'The operation completed successfully. All changes have been persisted and will take effect immediately. No further action is required on your part.',
      subtitle: 'Your changes have been saved',
      title: 'Action Completed',
    },
    warning: {
      body: 'This action may have significant consequences. Please read the following information carefully before proceeding to ensure you understand the potential impact.',
      subtitle: 'Review before continuing',
      title: 'Proceed with Caution',
    },
  },
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const

type Tone = (typeof TONES)[number]

const SingleItem = ({ tone = 'brand' }: { tone?: Tone }) => {
    const { title, subtitle, body } = TONE_CONTENT[tone]
    return (
      <Accordion.Item tone={tone}>
        <Accordion.Header>
          <Accordion.Icon>{TONE_ICONS[tone]}</Accordion.Icon>
          <Accordion.Title>{title}</Accordion.Title>
          <Accordion.Subtitle>{subtitle}</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>{body}</Accordion.Panel>
      </Accordion.Item>
    )
  },
  AllTonesItems = () => (
    <>
      {TONES.map((tone) => (
        <SingleItem key={tone} tone={tone} />
      ))}
    </>
  )

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    tone: {
      control: 'select',
      options: TONES,
    },
  },
  args: {
    disabled: false,
    size: 'medium',
    tone: 'brand',
  },
  component: Accordion.Item,
  parameters: {
    docs: {
      description: {
        component:
          'The Accordion component displays collapsible content panels. Items support multiple tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`) and two layout variants (`surface`, `ghost`). Multiple panels can optionally be open at once via the `multiple` prop on the root.',
      },
      subtitle: 'A vertically stacked set of interactive headings that reveal associated content.',
    },
  },
  render: (args) => (
    <Accordion className="w-[520px]">
      <Accordion.Item {...args}>
        <Accordion.Header>
          <Accordion.Icon>
            <InfoIcon weight="duotone" />
          </Accordion.Icon>
          <Accordion.Title>Accordion Item</Accordion.Title>
          <Accordion.Subtitle>A brief description of this section</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>
          Expand this panel to reveal additional content. You can place any content here, including
          text, images, or other components.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
  subcomponents: {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionSubtitle,
    AccordionTitle,
    AccordionIcon,
  },
  title: 'Components/Accordion',
} satisfies Meta<typeof AccordionItem>

type Story = StoryObj<typeof AccordionItem>

export const Brand: Story = {
  args: { tone: 'brand' },
}

export const Accent: Story = {
  args: { tone: 'accent' },
}

export const Neutral: Story = {
  args: { tone: 'neutral' },
}

export const Error: Story = {
  args: { tone: 'error' },
}

export const Info: Story = {
  args: { tone: 'info' },
}

export const Success: Story = {
  args: { tone: 'success' },
}

export const Warning: Story = {
  args: { tone: 'warning' },
}

export const Surface: Story = {
  render: () => (
    <Accordion className="w-[520px]" variant="surface">
      <AllTonesItems />
    </Accordion>
  ),
}

export const Ghost: Story = {
  render: () => (
    <Accordion className="w-[520px]" variant="ghost">
      <AllTonesItems />
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion className="w-[520px]" multiple>
      <SingleItem tone="brand" />
      <SingleItem tone="accent" />
      <SingleItem tone="success" />
    </Accordion>
  ),
}

export const Nested: Story = {
  render: () => (
    <Accordion className="w-[520px]">
      <Accordion.Item tone="brand">
        <Accordion.Header>
          <Accordion.Icon>
            <InfoIcon weight="duotone" />
          </Accordion.Icon>
          <Accordion.Title>Parent Accordion Item</Accordion.Title>
          <Accordion.Subtitle>Expand to reveal a nested accordion</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>
          <Accordion variant="ghost" multiple>
            <SingleItem tone="info" />
            <SingleItem tone="warning" />
            <SingleItem tone="success" />
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item tone="neutral">
        <Accordion.Header>
          <Accordion.Icon>
            <InfoIcon weight="duotone" />
          </Accordion.Icon>
          <Accordion.Title>Sibling Parent Item</Accordion.Title>
          <Accordion.Subtitle>Regular parent accordion content</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>
          This is a standard panel next to the nested example for quick comparison.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithoutSubtitle: Story = {
  render: () => (
    <Accordion className="w-[520px]">
      {TONES.map((tone) => (
        <Accordion.Item key={tone} tone={tone}>
          <Accordion.Header>
            <Accordion.Icon>{TONE_ICONS[tone]}</Accordion.Icon>
            <Accordion.Title>{TONE_CONTENT[tone].title}</Accordion.Title>
          </Accordion.Header>
          <Accordion.Panel>{TONE_CONTENT[tone].body}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
}

export const WithoutSeparators: Story = {
  render: () => (
    <Accordion className="w-[520px]" withSeparator={false}>
      <AllTonesItems />
    </Accordion>
  ),
}

export const AllTones: Story = {
  render: () => (
    <Accordion className="w-[520px]">
      <AllTonesItems />
    </Accordion>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <Accordion className="w-[520px]">
      <Accordion.Item size="small" tone="brand">
        <Accordion.Header>
          <Accordion.Icon>{TONE_ICONS['brand']}</Accordion.Icon>
          <Accordion.Title>Small Accordion Item</Accordion.Title>
          <Accordion.Subtitle>This is a small accordion item</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>Content for the small accordion item.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item size="medium" tone="brand">
        <Accordion.Header>
          <Accordion.Icon>{TONE_ICONS['brand']}</Accordion.Icon>
          <Accordion.Title>Medium Accordion Item</Accordion.Title>
          <Accordion.Subtitle>This is a medium accordion item</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>Content for the medium accordion item.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item size="large" tone="brand">
        <Accordion.Header>
          <Accordion.Icon>{TONE_ICONS['brand']}</Accordion.Icon>
          <Accordion.Title>Large Accordion Item</Accordion.Title>
          <Accordion.Subtitle>This is a large accordion item</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>Content for the large accordion item.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
}

export const NoIcon: Story = {
  render: () => (
    <Accordion className="w-[520px]">
      <Accordion.Item tone="brand">
        <Accordion.Header>
          <Accordion.Title>Accordion Item Without Icon</Accordion.Title>
          <Accordion.Subtitle>This item has no icon in the header</Accordion.Subtitle>
        </Accordion.Header>
        <Accordion.Panel>Content for the accordion item without an icon.</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
}
