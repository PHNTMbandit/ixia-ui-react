import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Input } from '../../../src/components/input'
import { Popover } from '../../../src/components/popover'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Popover' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Popover/Trigger',
      group: 'Popover',
      order: 240,
      description:
        'A Popover opening button, composed from a reusable Button in a single-control native slot.',
      slots: { control: { description: 'Focusable trigger.', preferred: ['Button'], max: 1 } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Popover>
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <div {...slot('control')} style={{ display: 'contents' }}>
          <Popover.Trigger
            {...part('Button', { tone: 'neutral', variant: 'ghost', State: 'Default' })}
          >
            <Button tone="neutral" variant="ghost">
              <span {...text('label')}>Project details</span>
            </Button>
          </Popover.Trigger>
        </div>
      </div>
    </Popover>
  ),
}

export const ButtonSet: Story = {
  name: 'Button',
  parameters: {
    figma: {
      component: 'Popover/Button',
      group: 'Popover',
      order: 241,
      cva: {
        axes: ['tone', 'variant', 'size'],
        file: 'src/components/button/button.types.ts',
        name: 'buttonVariants',
      },
      description:
        'A button used on popover surfaces. Preserves its special neutral ghost hover color and all actual Button variants.',
      states: ['Default', 'Hover', 'Disabled'],
      interactive: { Hover: 'hover' },
      properties: { label: 'children', leadingIcon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Popover.Button
          {...target(index)}
          tone={combo.tone as 'brand'}
          variant={combo.variant as 'fill'}
          size={combo.size as 'medium'}
          disabled={combo.State === 'Disabled'}
        >
          <Icon name="filter" aria-hidden="true" {...swap('leadingIcon', false)} />
          <span {...text('label')}>Settings</span>
        </Popover.Button>
      )}
    />
  ),
}

export const Title: Story = {
  parameters: {
    figma: {
      component: 'Popover/Title',
      group: 'Popover',
      order: 242,
      description:
        'The popover heading and accessible name with an optional swappable decorative icon.',
      properties: { label: 'children', leadingIcon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Popover>
      <Popover.Title {...target(0)}>
        <Icon name="info" aria-hidden="true" {...swap('leadingIcon', false)} />
        <span {...text('label')}>Project details</span>
      </Popover.Title>
    </Popover>
  ),
}

export const Description: Story = {
  parameters: {
    figma: {
      component: 'Popover/Description',
      group: 'Popover',
      order: 243,
      description: 'Supporting text associated with the popover.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Popover>
      <Popover.Description {...target(0)} {...text('label')}>
        A shared workspace for your team.
      </Popover.Description>
    </Popover>
  ),
}

function Heading() {
  return (
    <div style={{ display: 'contents' }} {...slot('heading')}>
      <Popover.Title {...part('Popover/Title', {})}>
        <span {...text('label')}>Project details</span>
      </Popover.Title>
      <Popover.Description {...part('Popover/Description', {})} {...text('label')}>
        A shared workspace for your team.
      </Popover.Description>
    </div>
  )
}

export const Header: Story = {
  parameters: {
    figma: {
      component: 'Popover/Header',
      group: 'Popover',
      order: 244,
      description: 'A vertical heading composed from reusable Title and Description instances.',
      slots: {
        heading: {
          description: 'Heading parts.',
          preferred: ['Popover/Title', 'Popover/Description'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Popover>
      <Popover.Header {...target(0)} style={{ width: 280 }}>
        <Heading />
      </Popover.Header>
    </Popover>
  ),
}

function Body() {
  return (
    <div style={{ display: 'contents' }} {...slot('content')}>
      <Popover.Header {...part('Popover/Header', {})}>
        <Heading />
      </Popover.Header>
      <Input
        aria-label="Project name"
        placeholder="Project name"
        {...part('Input', { size: 'medium', variant: 'primary', State: 'Default' })}
        {...text('value')}
      />
      <Popover.Button
        tone="neutral"
        variant="ghost"
        {...part('Popover/Button', {
          tone: 'neutral',
          variant: 'ghost',
          size: 'medium',
          State: 'Default',
        })}
      >
        <Icon name="filter" aria-hidden="true" {...swap('leadingIcon')} />
        <span {...text('label')}>Settings</span>
      </Popover.Button>
    </div>
  )
}

export const Content: Story = {
  parameters: {
    figma: {
      component: 'Popover/Content',
      group: 'Popover',
      order: 245,
      description:
        'A spaced body with a native slot for arbitrary content and reusable header and button parts.',
      slots: {
        content: {
          description: 'Popover body.',
          preferred: ['Popover/Header', 'Popover/Button', 'Input'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Popover>
      <Popover.Content {...target(0)} style={{ width: 280 }}>
        <Body />
      </Popover.Content>
    </Popover>
  ),
}

function Open({
  children,
  index,
  elevation = 'medium',
}: {
  children: ReactNode
  index: number
  elevation?: 'low' | 'medium' | 'high'
}) {
  return (
    <div style={{ height: 280, width: 360 }}>
      <Popover open>
        <Popover.Trigger>
          <Button>Project details</Button>
        </Popover.Trigger>
        <Popover.Panel
          elevation={elevation}
          ref={(node) => {
            node?.firstElementChild?.setAttribute('data-figma-target', String(index))
          }}
        >
          {children}
        </Popover.Panel>
      </Popover>
    </div>
  )
}

const surface = {
  cva: {
    axes: ['elevation'],
    file: 'src/components/popover/popover.types.ts',
    name: 'popoverPanelVariants',
  },
  group: 'Popover',
  slots: {
    content: {
      description: 'Popover content.',
      preferred: ['Popover/Content', 'Popover/Header', 'Popover/Button'],
    },
  },
  usage:
    '<Popover><Popover.Trigger><Button>Details</Button></Popover.Trigger><Popover.Panel elevation="medium"><Popover.Content><Popover.Header><Popover.Title>Details</Popover.Title><Popover.Description>Project information.</Popover.Description></Popover.Header></Popover.Content></Popover.Panel></Popover>',
} satisfies Partial<FigmaSpec>

export const Panel: Story = {
  parameters: {
    figma: {
      ...surface,
      component: 'Popover/Panel',
      order: 246,
      description:
        'The popover surface with the real elevation variants. Its native slot contains a reusable Content instance.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open index={index} elevation={combo.elevation as 'medium'}>
          <div {...slot('content')}>
            <Popover.Content {...part('Popover/Content', {})} style={{ width: 280 }}>
              <Body />
            </Popover.Content>
          </div>
        </Open>
      )}
    />
  ),
}

export const Root: Story = {
  name: 'Popover',
  parameters: {
    figma: {
      ...surface,
      component: 'Popover',
      order: 247,
      description:
        'The open popover composition with reusable Content, Header, Title, Description and Button instances. Root itself only supplies behavior.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Open index={index} elevation={combo.elevation as 'medium'}>
          <div {...slot('content')}>
            <Popover.Content {...part('Popover/Content', {})} style={{ width: 280 }}>
              <Body />
            </Popover.Content>
          </div>
        </Open>
      )}
    />
  ),
}
