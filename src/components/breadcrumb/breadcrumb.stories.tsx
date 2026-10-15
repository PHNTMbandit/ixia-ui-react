import { BookIcon, HouseIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from './index'

const DefaultTrail = () => (
  <Breadcrumb aria-label="Breadcrumb">
    <Breadcrumb.Link>
      <HouseIcon weight="bold" />
      Home
    </Breadcrumb.Link>
    <Breadcrumb.Separator />
    <Breadcrumb.Link>
      <BookIcon weight="bold" />
      Documentation
    </Breadcrumb.Link>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>Buttons</Breadcrumb.Item>
  </Breadcrumb>
)

export default {
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          'The Breadcrumb component communicates the current location within a hierarchy of pages or views. It is composed from small primitives for links, separators, collapsed states, and the current page item, making it flexible enough for full navigation trails and compact collapsed paths.',
      },
      subtitle: 'Displays a breadcrumb navigation component.',
    },
  },
  subcomponents: {
    BreadcrumbEllipsis: Breadcrumb.Ellipsis,
    BreadcrumbItem: Breadcrumb.Item,
    BreadcrumbLink: Breadcrumb.Link,
    BreadcrumbSeparator: Breadcrumb.Separator,
  },
  title: 'Components/Breadcrumb',
} satisfies Meta<typeof Breadcrumb>

type Story = StoryObj<typeof Breadcrumb>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'A baseline breadcrumb trail showing link, separator, and current item roles together.',
      },
    },
  },
  render: () => <DefaultTrail />,
}

export const Default: Story = {
  name: 'Composition / Default Trail',
  parameters: {
    docs: {
      description: {
        story: 'Standard breadcrumb usage for small to medium navigation hierarchies.',
      },
    },
  },
  render: (args) => (
    <Breadcrumb {...args} aria-label="Breadcrumb">
      <Breadcrumb.Link>
        <HouseIcon weight="bold" />
        Home
      </Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Link>
        <BookIcon weight="bold" />
        Documentation
      </Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>Buttons</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const CollapsedPath: Story = {
  name: 'Composition / Collapsed Path',
  parameters: {
    docs: {
      description: {
        story: 'Use the ellipsis primitive when longer paths need to be compressed.',
      },
    },
  },
  render: () => (
    <Breadcrumb aria-label="Collapsed breadcrumb">
      <Breadcrumb.Link>
        <HouseIcon weight="bold" />
        Home
      </Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Ellipsis />
      <Breadcrumb.Separator />
      <Breadcrumb.Link>Documentation</Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>Button Group</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const IconFirstLink: Story = {
  name: 'Composition / Icon First Link',
  parameters: {
    docs: {
      description: {
        story: 'Icons help users quickly identify important root destinations like home or docs.',
      },
    },
  },
  render: () => (
    <Breadcrumb aria-label="Breadcrumb with icons">
      <Breadcrumb.Link>
        <HouseIcon weight="bold" />
        Dashboard
      </Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Link>
        <BookIcon weight="bold" />
        Components
      </Breadcrumb.Link>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const Item: Story = {
  name: 'Primitive / Current Item',
  parameters: {
    docs: {
      description: {
        story:
          'Represents the current page or location and is typically rendered last in the trail.',
      },
    },
  },
  render: () => (
    <Breadcrumb.Item>
      <HouseIcon weight="bold" />
      Home
    </Breadcrumb.Item>
  ),
}

export const Link: Story = {
  name: 'Primitive / Link',
  parameters: {
    docs: {
      description: {
        story: 'Interactive breadcrumb segment used for previous levels in the path.',
      },
    },
  },
  render: () => (
    <Breadcrumb.Link>
      <BookIcon weight="bold" />
      Documentation
    </Breadcrumb.Link>
  ),
}

export const Ellipsis: Story = {
  name: 'Primitive / Ellipsis',
  parameters: {
    docs: {
      description: {
        story: 'Collapsed segment used when intermediate levels are hidden from view.',
      },
    },
  },
  render: () => <Breadcrumb.Ellipsis />,
}

export const Separator: Story = {
  name: 'Primitive / Separator',
  parameters: {
    docs: {
      description: {
        story: 'Visual separator inserted between breadcrumb segments.',
      },
    },
  },
  render: () => <Breadcrumb.Separator />,
}
