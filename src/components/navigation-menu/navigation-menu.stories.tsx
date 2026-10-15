import { CaretDownIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { NavigationMenu } from './index'

const overviewLinks = [
    {
      description: 'Install and assemble your first component.',
      href: '/react/overview/quick-start',
      title: 'Quick Start',
    },
    {
      description: 'Learn how we build accessible components.',
      href: '/react/overview/accessibility',
      title: 'Accessibility',
    },
    {
      description: "See what's new in the latest Base UI versions.",
      href: '/react/overview/releases',
      title: 'Releases',
    },
    {
      description: 'Learn more about Base UI and our mission.',
      href: '/react/overview/about',
      title: 'About',
    },
  ] as const,
  handbookLinks = [
    {
      description: 'Style with plain CSS, Tailwind, CSS-in-JS, or CSS Modules.',
      href: '/react/handbook/styling',
      title: 'Styling',
    },
    {
      description: 'Animate with CSS transitions, CSS animations, or JS libraries.',
      href: '/react/handbook/animation',
      title: 'Animation',
    },
    {
      description: 'Replace and compose components with your own existing components.',
      href: '/react/handbook/composition',
      title: 'Composition',
    },
  ] as const

export default {
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component: `
A collection of links and menus for website navigation, built on top of
[Base UI NavigationMenu](https://base-ui.com/react/components/navigation-menu).

**Anatomy**

\`\`\`
<NavigationMenu>           — Root <nav>
  <NavigationMenuList>     — <ul> of items
    <NavigationMenuItem>   — <li>
      <NavigationMenuTrigger>
        <NavigationMenuIcon />
      </NavigationMenuTrigger>
      <NavigationMenuContent />
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPopup />  — Shared floating popup (Portal → Positioner → Popup → Viewport)
</NavigationMenu>
\`\`\`

> **Important:** \`<NavigationMenuPopup />\` must be placed **outside** of
> \`<NavigationMenuList>\` as a sibling. It is shared across all items in the list.
        `,
      },
    },
  },
  subcomponents: {
    NavigationMenuContent: NavigationMenu.Content,
    NavigationMenuIcon: NavigationMenu.Icon,
    NavigationMenuItem: NavigationMenu.Item,
    NavigationMenuLink: NavigationMenu.Link,
    NavigationMenuList: NavigationMenu.List,
    NavigationMenuPopup: NavigationMenu.Popup,
    NavigationMenuTrigger: NavigationMenu.Trigger,
  },
  title: 'Components/Navigation Menu',
} as Meta<typeof NavigationMenu>

type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A single dropdown item containing a grid of link cards. ' +
          '`NavigationMenuPopup` is rendered as a sibling to `NavigationMenuList` so it is shared across all items.',
      },
    },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Overview
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              {overviewLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}

export const MultipleItems: Story = {
  name: 'Multiple Items',
  parameters: {
    docs: {
      description: {
        story:
          'Multiple menu items sharing a single `NavigationMenuPopup`. ' +
          'The third item is a plain `NavigationMenuLink` with no dropdown — ' +
          'use this pattern for top-level links like "GitHub" or "Releases".',
      },
    },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Overview
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              {overviewLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Handbook
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              {handbookLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.Link>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link>GitHub</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`size` is a design-system extension on `NavigationMenuTrigger` (not a Base UI prop). ' +
          'Available values: `small`, `medium` (default), `large`.',
      },
    },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger size="small">
            Small
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>Small content</NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger size="medium">
            Medium
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>Medium content</NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger size="large">
            Large
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>Large content</NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}

export const Tones: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`tone` is a design-system extension on `NavigationMenuTrigger` (not a Base UI prop). ' +
          'Available values: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`.',
      },
    },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        {(['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const).map(
          (tone) => (
            <NavigationMenu.Item key={tone}>
              <NavigationMenu.Trigger tone={tone}>
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
                <NavigationMenu.Icon>
                  <CaretDownIcon weight="bold" />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                {' '}
                <ul>
                  {handbookLinks.map((item) => (
                    <li key={item.href}>
                      <NavigationMenu.Link tone={tone}>
                        <h3 className="style-text-strong-0">{item.title}</h3>
                        <p className="style-text-prose--1">{item.description}</p>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}
