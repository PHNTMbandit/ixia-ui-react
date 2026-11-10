import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Drawer } from '../../../src/components/drawer'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Drawer' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Trigger',
      group: 'Drawer',
      order: 220,
      description:
        'A Drawer opening control reusing Button. The control slot accepts one focusable component.',
      slots: { control: { description: 'Opening control.', preferred: ['Button'], max: 1 } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer>
        <div {...target(0)} style={{ display: 'inline-flex' }}>
          <div {...slot('control')} style={{ display: 'contents' }}>
            <Drawer.Trigger
              {...part('Button', { tone: 'brand', variant: 'fill', State: 'Default' })}
            >
              <Button>
                <span {...text('label')}>Open drawer</span>
              </Button>
            </Drawer.Trigger>
          </div>
        </div>
      </Drawer>
    </Drawer.Provider>
  ),
}

export const Close: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Close',
      group: 'Drawer',
      order: 221,
      description:
        'A named close control using the real Drawer.Close render prop and an icon-only Button instance.',
      slots: {
        control: {
          description: 'Closing control.',
          preferred: ['Button/Icon only', 'Button'],
          max: 1,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer>
        <div {...target(0)} style={{ display: 'inline-flex' }}>
          <div {...slot('control')} style={{ display: 'contents' }}>
            <Drawer.Close
              aria-label="Close drawer"
              render={<Button tone="neutral" variant="ghost" size="extraSmall" />}
              {...part('Button/Icon only', {
                tone: 'neutral',
                variant: 'ghost',
                size: 'extraSmall',
                State: 'Default',
              })}
            >
              <Icon name="close" aria-hidden="true" {...swap('icon')} />
            </Drawer.Close>
          </div>
        </div>
      </Drawer>
    </Drawer.Provider>
  ),
}

export const Title: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Title',
      group: 'Drawer',
      order: 222,
      description: 'The drawer heading and accessible name.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer>
        <Drawer.Title {...target(0)} {...text('label')}>
          Project settings
        </Drawer.Title>
      </Drawer>
    </Drawer.Provider>
  ),
}

export const Description: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Description',
      group: 'Drawer',
      order: 223,
      description: 'Explanatory text associated with the drawer.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer>
        <Drawer.Description {...target(0)} {...text('label')}>
          Manage the settings for your project.
        </Drawer.Description>
      </Drawer>
    </Drawer.Provider>
  ),
}

function Heading() {
  return (
    <div style={{ display: 'contents' }} {...slot('heading')}>
      <Drawer.Title {...part('Drawer/Title', {})} {...text('label')}>
        Project settings
      </Drawer.Title>
      <Drawer.Close
        aria-label="Close drawer"
        render={<Button tone="neutral" variant="ghost" size="extraSmall" />}
        {...part('Drawer/Close', {})}
        {...show('showClose')}
      >
        <Icon name="close" aria-hidden="true" {...swap('icon')} />
      </Drawer.Close>
    </div>
  )
}

export const Header: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Header',
      group: 'Drawer',
      order: 224,
      description:
        'A reusable Title with an optional Close instance. The native slot retains the header alignment.',
      slots: {
        heading: {
          description: 'Title and close control.',
          preferred: ['Drawer/Title', 'Drawer/Close'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer>
        <Drawer.Header {...target(0)} style={{ width: 360 }}>
          <Heading />
        </Drawer.Header>
      </Drawer>
    </Drawer.Provider>
  ),
}

function Body() {
  return (
    <div style={{ display: 'contents' }} {...slot('content')}>
      <Drawer.Header {...part('Drawer/Header', {})}>
        <Heading />
      </Drawer.Header>
      <Drawer.Description {...part('Drawer/Description', {})} {...text('label')}>
        Manage the settings for your project.
      </Drawer.Description>
      <Button
        {...part('Button', { tone: 'brand', variant: 'fill', State: 'Default' })}
        {...text('label')}
      >
        Save changes
      </Button>
    </div>
  )
}

export const Content: Story = {
  parameters: {
    figma: {
      component: 'Drawer/Content',
      group: 'Drawer',
      order: 225,
      description:
        'The width-constrained drawer body with a native slot for Header, Description and arbitrary content.',
      slots: {
        content: {
          description: 'Drawer body.',
          preferred: ['Drawer/Header', 'Drawer/Description', 'Button', 'Input'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Drawer.Provider>
      <Drawer open>
        <Drawer.Trigger>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Popup>
          <Drawer.Content {...target(0)} style={{ width: 360 }}>
            <Body />
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer>
    </Drawer.Provider>
  ),
}

function Surface({ combo, index }: { combo: Combo; index: number }) {
  return (
    <Drawer.Provider>
      <Drawer open swipeDirection={combo.swipeDirection as 'down'}>
        <Drawer.Trigger>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Popup {...target(index)}>
          <div {...slot('content')} style={{ display: 'contents' }}>
            <Drawer.Content {...part('Drawer/Content', {})}>
              <Body />
            </Drawer.Content>
          </div>
        </Drawer.Popup>
      </Drawer>
    </Drawer.Provider>
  )
}

const surface = {
  axes: { swipeDirection: ['down', 'up', 'right', 'left'] },
  group: 'Drawer',
  slots: { content: { description: 'Drawer content instances.', preferred: ['Drawer/Content'] } },
  usage:
    '<Drawer.Provider><Drawer swipeDirection="down"><Drawer.Trigger><Button>Open</Button></Drawer.Trigger><Drawer.Popup><Drawer.Content><Drawer.Header><Drawer.Title>Settings</Drawer.Title><Drawer.Close>Close</Drawer.Close></Drawer.Header><Drawer.Description>Manage project settings.</Drawer.Description></Drawer.Content></Drawer.Popup></Drawer></Drawer.Provider>',
} satisfies Partial<FigmaSpec>

export const Popup: Story = {
  parameters: {
    figma: {
      ...surface,
      component: 'Drawer/Popup',
      order: 226,
      description:
        'The sheet surface with actual direction-dependent corners, padding and shadow, containing a reusable Content instance.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(combo, index) => <Surface combo={combo} index={index} />} />,
}

export const Root: Story = {
  name: 'Drawer',
  parameters: {
    figma: {
      ...surface,
      component: 'Drawer',
      order: 227,
      description:
        'The open drawer composition. Provider and Root supply behavior; the visible sheet contains editable Content, Header, Title, Description and Close instances.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(combo, index) => <Surface combo={combo} index={index} />} />,
}
