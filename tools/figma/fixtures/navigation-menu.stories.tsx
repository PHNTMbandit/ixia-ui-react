import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Icon } from '../../../src/components/icon'
import { NavigationMenu } from '../../../src/components/navigation-menu'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Navigation Menu' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

function Context({ children, open = false }: { children: ReactNode; open?: boolean }) {
  return (
    <NavigationMenu aria-label="Project navigation" value={open ? 'project' : undefined}>
      <NavigationMenu.List>
        <NavigationMenu.Item value="project">{children}</NavigationMenu.Item>
      </NavigationMenu.List>
      {open && <NavigationMenu.Popup />}
    </NavigationMenu>
  )
}

export const IconSet: Story = {
  name: 'Icon',
  parameters: {
    figma: {
      component: 'Navigation Menu/Icon',
      group: 'Navigation Menu',
      order: 290,
      axes: { open: ['false', 'true'] },
      description:
        'A swappable indicator icon. Open uses the real primitive state to rotate the icon.',
      properties: { icon: 'children', open: '<NavigationMenu value>' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context open={combo.open === 'true'}>
          <NavigationMenu.Trigger aria-label="Project navigation">
            <NavigationMenu.Icon {...target(index)}>
              <Icon name="chevronDown" aria-hidden="true" {...swap('icon')} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>Project navigation</NavigationMenu.Content>
        </Context>
      )}
    />
  ),
}

export const Link: Story = {
  parameters: {
    figma: {
      component: 'Navigation Menu/Link',
      group: 'Navigation Menu',
      order: 291,
      cva: {
        axes: ['tone'],
        file: 'src/components/navigation-menu/navigation-menu.types.ts',
        name: 'navigationMenuLinkVariants',
      },
      states: ['Default', 'Hover'],
      interactive: { Hover: 'hover' },
      description:
        'The styled navigation-link container. Its children include a real named anchor; the wrapper itself is not an anchor in the React API.',
      properties: { label: 'children', leadingIcon: '<Icon /> inside the anchor' },
      usage: '<NavigationMenu.Link href="/projects">Projects</NavigationMenu.Link>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <NavigationMenu.Link href="#projects" tone={combo.tone as 'neutral'} {...target(index)}>
            <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Projects</span>
          </NavigationMenu.Link>
        </Context>
      )}
    />
  ),
}

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Navigation Menu/Trigger',
      group: 'Navigation Menu',
      order: 292,
      cva: {
        axes: ['tone', 'size'],
        file: 'src/components/navigation-menu/navigation-menu.types.ts',
        name: 'navigationMenuTriggerVariants',
      },
      states: ['Default', 'Open'],
      description:
        'A navigation disclosure button with editable text, optional leading icon, and a reusable Icon instance.',
      properties: { label: 'children', leadingIcon: '<Icon />', open: '<NavigationMenu value>' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context open={combo.State === 'Open'}>
          <NavigationMenu.Trigger
            {...target(index)}
            tone={combo.tone as 'neutral'}
            size={combo.size as 'medium'}
          >
            <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
            <span {...text('label')}>Projects</span>
            <NavigationMenu.Icon
              {...part('Navigation Menu/Icon', { open: String(combo.State === 'Open') })}
            >
              <Icon name="chevronDown" aria-hidden="true" {...swap('icon')} />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>Project navigation</NavigationMenu.Content>
        </Context>
      )}
    />
  ),
}

function Links() {
  return (
    <div className="flex flex-col" {...slot('links')}>
      {['Overview', 'Documentation', 'Examples'].map((label) => (
        <NavigationMenu.Link
          key={label}
          {...part('Navigation Menu/Link', { tone: 'neutral', State: 'Default' })}
        >
          <a href={`#${label.toLowerCase()}`} {...text('label')}>
            {label}
          </a>
        </NavigationMenu.Link>
      ))}
    </div>
  )
}

export const Content: Story = {
  parameters: {
    figma: {
      component: 'Navigation Menu/Content',
      group: 'Navigation Menu',
      order: 293,
      description:
        'The active navigation panel with a variable-count native slot of reusable Link instances.',
      slots: {
        links: {
          description: 'Navigation links or arbitrary panel content.',
          preferred: ['Navigation Menu/Link'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Context open>
      <NavigationMenu.Trigger>Projects</NavigationMenu.Trigger>
      <NavigationMenu.Content {...target(0)} style={{ width: 280 }}>
        <Links />
      </NavigationMenu.Content>
    </Context>
  ),
}

export const Item: Story = {
  parameters: {
    figma: {
      component: 'Navigation Menu/Item',
      group: 'Navigation Menu',
      order: 294,
      description:
        'One navigation-list item containing a reusable Trigger in a native slot. Associate its Content in code by the item value.',
      slots: {
        content: {
          description: 'One trigger or navigation link.',
          preferred: ['Navigation Menu/Trigger', 'Navigation Menu/Link'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <NavigationMenu aria-label="Project navigation">
      <NavigationMenu.List>
        <NavigationMenu.Item value="project" {...target(0)}>
          <div {...slot('content')} style={{ display: 'contents' }}>
            <NavigationMenu.Trigger
              {...part('Navigation Menu/Trigger', {
                tone: 'neutral',
                size: 'medium',
                State: 'Default',
              })}
            >
              <span {...text('label')}>Projects</span>
              <NavigationMenu.Icon {...part('Navigation Menu/Icon', { open: 'false' })}>
                <Icon name="chevronDown" aria-hidden="true" {...swap('icon')} />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
          </div>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
}

function Items() {
  return (
    <>
      {['Projects', 'Resources'].map((label) => (
        <NavigationMenu.Item value={label} key={label} {...part('Navigation Menu/Item', {})}>
          <div {...slot('content')} style={{ display: 'contents' }}>
            <NavigationMenu.Trigger
              {...part('Navigation Menu/Trigger', {
                tone: 'neutral',
                size: 'medium',
                State: 'Default',
              })}
            >
              <span {...text('label')}>{label}</span>
              <NavigationMenu.Icon {...part('Navigation Menu/Icon', { open: 'false' })}>
                <Icon name="chevronDown" aria-hidden="true" {...swap('icon')} />
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
          </div>
        </NavigationMenu.Item>
      ))}
    </>
  )
}

export const List: Story = {
  parameters: {
    figma: {
      component: 'Navigation Menu/List',
      group: 'Navigation Menu',
      order: 295,
      description:
        'A horizontal list with a native slot for a variable number of reusable Item instances.',
      slots: {
        items: {
          description: 'Navigation items.',
          preferred: ['Navigation Menu/Item'],
          only: true,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <NavigationMenu aria-label="Project navigation">
      <div {...target(0)} style={{ display: 'inline-flex' }}>
        <NavigationMenu.List {...slot('items')}>
          <Items />
        </NavigationMenu.List>
      </div>
    </NavigationMenu>
  ),
}

export const Popup: Story = {
  parameters: {
    figma: {
      annotate: [
        { selector: '[data-navigation-popup] > nav', attrs: { target: '0' } },
        {
          selector:
            '[data-navigation-popup] > nav > div:has(> [data-figma-part="Navigation Menu/Content"])',
          attrs: { slot: 'content' },
        },
      ],
      component: 'Navigation Menu/Popup',
      group: 'Navigation Menu',
      order: 296,
      description:
        'The floating navigation surface and viewport, containing a real reusable Content instance.',
      slots: {
        content: {
          description: 'Active navigation panel.',
          preferred: ['Navigation Menu/Content'],
          max: 1,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <NavigationMenu aria-label="Project navigation" value="project">
      <NavigationMenu.List>
        <NavigationMenu.Item value="project">
          <NavigationMenu.Trigger>Projects</NavigationMenu.Trigger>
          <NavigationMenu.Content style={{ width: 280 }} {...part('Navigation Menu/Content', {})}>
            <Links />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Popup data-navigation-popup="" />
    </NavigationMenu>
  ),
}

export const Root: Story = {
  name: 'Navigation Menu',
  parameters: {
    figma: {
      component: 'Navigation Menu',
      group: 'Navigation Menu',
      order: 297,
      description:
        'The navigation bar composed from a reusable List and editable Item, Trigger and Icon instances. Pair with Popup for the open panel.',
      slots: {
        lists: { description: 'Navigation lists.', preferred: ['Navigation Menu/List'], max: 1 },
      },
      usage:
        '<NavigationMenu><NavigationMenu.List><NavigationMenu.Item value="projects"><NavigationMenu.Trigger>Projects<NavigationMenu.Icon><Icon name="chevronDown" /></NavigationMenu.Icon></NavigationMenu.Trigger><NavigationMenu.Content>…</NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Popup /></NavigationMenu>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <NavigationMenu aria-label="Project navigation" {...target(0)}>
      <div {...slot('lists')} style={{ display: 'contents' }}>
        <div {...part('Navigation Menu/List', {})} style={{ display: 'inline-flex' }}>
          <NavigationMenu.List {...slot('items')}>
            <Items />
          </NavigationMenu.List>
        </div>
      </div>
    </NavigationMenu>
  ),
}
