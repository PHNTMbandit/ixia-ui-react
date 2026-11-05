import { BookIcon, CaretDownIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { expect, waitFor, within } from 'storybook/test'

import { NavigationMenu } from './index'
import { navigationMenuContentLinkVariants } from './navigation-menu.types'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  MODES = ['light', 'dark'] as const,
  overviewLinks = [
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

const interactionTheme: CSSProperties & Record<`--${string}`, string> = {}
for (const tone of TONES) {
  interactionTheme[`--color-${tone}-container`] = 'rgb(72, 116, 160)'
  interactionTheme[`--color-${tone}-container-high`] = 'rgb(184, 146, 108)'
}

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
      <NavigationMenuContent>
        <NavigationMenuContentLink />
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" />
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuPopup />  — Shared floating popup (Portal → Positioner → Popup → Viewport)
</NavigationMenu>
\`\`\`

> **Important:** \`<NavigationMenuPopup />\` must be placed **outside** of
> \`<NavigationMenuList>\` as a sibling. It is shared across all items in the list.

Use \`NavigationMenu.Link\` for top-level navigation without a popup. It renders an anchor
and supports \`href\`, \`active\`, \`render\` (for router links), and \`closeOnClick\`.
\`NavigationMenu.ContentLink\` is a non-interactive \`<div>\` card for content inside the popup.
        `,
      },
    },
  },
  subcomponents: {
    NavigationMenuContent: NavigationMenu.Content,
    NavigationMenuContentLink: NavigationMenu.ContentLink,
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

export const LinkBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Top-level links navigate without opening a popup. Content links use a card layout ' +
          'and can close the popup on selection. `active` exposes the current page to assistive technology.',
      },
    },
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const page = within(canvasElement.ownerDocument.body)
    const topLink = canvas.getByRole('link', { name: 'Current page' })
    await expect(topLink).toHaveAttribute('href', '#current-page')
    await expect(topLink).toHaveAttribute('aria-current', 'page')
    await expect(topLink).toHaveClass('underline')
    await userEvent.click(topLink)
    await expect(page.queryByRole('heading', { name: 'Read the guide' })).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: 'Resources' }))
    const card = (await page.findByRole('heading', { name: 'Read the guide' })).parentElement!
    await expect(card.tagName).toBe('DIV')
    await expect(card).toHaveAttribute('data-card')
    await expect(card).toHaveClass('hover:bg-neutral-container')
    await expect(getComputedStyle(card).display).toBe('block')
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(page.queryByRole('heading', { name: 'Read the guide' })).not.toBeInTheDocument(),
    )
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#current-page"
            active
            className={(state) => (state.active ? 'underline' : undefined)}
            onClick={(event) => event.preventDefault()}
          >
            Current page
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.ContentLink data-card>
              <h3 className="style-text-strong-0">Read the guide</h3>
              <p className="style-text-prose--1">Learn how to build your first component.</p>
            </NavigationMenu.ContentLink>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}

export const LinkVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Links and triggers share sizing, icon spacing, typography, and default colours. ' +
          'Links and triggers use container colours on hover, and triggers keep the same tint while open.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll<HTMLElement>('[data-variant-pair]')
    await expect(rows).toHaveLength(3 * TONES.length)
    for (const row of rows) {
      const trigger = row.querySelector('button')!
      const link = row.querySelector<HTMLAnchorElement>('[data-link]')!
      const tone = row.dataset.variantTone!
      const triggerStyle = getComputedStyle(trigger)
      const linkStyle = getComputedStyle(link)
      for (const property of [
        'height',
        'gap',
        'padding-left',
        'padding-right',
        'font-size',
        'line-height',
        'color',
        'border-radius',
      ]) {
        await expect(linkStyle.getPropertyValue(property)).toBe(
          triggerStyle.getPropertyValue(property),
        )
      }
      await expect(getComputedStyle(link.querySelector('svg')!).width).toBe(
        getComputedStyle(trigger.querySelector('svg')!).width,
      )
      await expect(
        getComputedStyle(link.querySelector('[data-slot=nav-menu-icon]')!).marginLeft,
      ).toBe(getComputedStyle(trigger.querySelector('[data-slot=nav-menu-icon]')!).marginLeft)
      await expect(link).not.toHaveAttribute('size')
      await expect(link.tagName).toBe('A')
      await expect(link).toHaveAttribute('href', '#navigation-link')
      await expect(link).toHaveClass(`hover:bg-${tone}-container`)
      await expect(trigger).toHaveClass(`hover:bg-${tone}-container`)
      await expect(trigger).toHaveClass(`hover:text-${tone}-on-container`)
      await expect(trigger).toHaveClass(`data-popup-open:bg-${tone}-container`)
      await expect(trigger).toHaveClass(`data-popup-open:text-${tone}-on-container`)
    }
    for (const tone of TONES) {
      await expect(navigationMenuContentLinkVariants({ tone }).split(' ')).toContain(
        `hover:bg-${tone}-container`,
      )
    }
  },
  render: (args) => (
    <div className="flex flex-col gap-sm">
      {(['small', 'medium', 'large'] as const).flatMap((size) =>
        TONES.map((tone) => (
          <NavigationMenu
            {...args}
            key={`${size}-${tone}`}
            aria-label={`${size} ${tone} navigation`}
            data-variant-pair
            data-variant-tone={tone}
          >
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger size={size} tone={tone}>
                  <BookIcon />
                  {size} {tone}
                  <NavigationMenu.Icon>
                    <CaretDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link size={size} tone={tone} href="#navigation-link" data-link>
                  <BookIcon />
                  {size} {tone}
                  <NavigationMenu.Icon>
                    <CaretDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu>
        )),
      )}
    </div>
  ),
}

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
                  <NavigationMenu.ContentLink>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.ContentLink>
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
                  <NavigationMenu.ContentLink>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.ContentLink>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            <BookIcon weight="bold" />
            Handbook
            <NavigationMenu.Icon>
              <CaretDownIcon weight="bold" />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul>
              {handbookLinks.map((item) => (
                <li key={item.href}>
                  <NavigationMenu.ContentLink>
                    <h3 className="">{item.title}</h3>
                    <p className="">{item.description}</p>
                  </NavigationMenu.ContentLink>
                </li>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="https://github.com/PHNTMbandit/ixia-ui-react">
            GitHub
          </NavigationMenu.Link>
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
          '`size` is shared by `NavigationMenuTrigger` and `NavigationMenuLink`. ' +
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
          '`tone` is shared by `NavigationMenuTrigger` and `NavigationMenuLink`. ' +
          'Available values: `brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`.',
      },
    },
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenu.List>
        {TONES.map((tone) => (
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
                    <NavigationMenu.ContentLink tone={tone}>
                      <h3 className="style-text-strong-0">{item.title}</h3>
                      <p className="style-text-prose--1">{item.description}</p>
                    </NavigationMenu.ContentLink>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <NavigationMenu.Popup />
    </NavigationMenu>
  ),
}

export const TokenStates: Story = {
  name: 'Token States',
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement)
    for (const mode of MODES) {
      const section = within(canvas.getByTestId(`token-states-${mode}`))
      for (const tone of TONES) {
        const trigger = section.getByRole('button', { name: new RegExp(`^${tone}$`, 'i') }),
          previousTransition = trigger.style.transition
        trigger.style.transition = 'none'
        try {
          await userEvent.click(trigger)
          await waitFor(() => expect(trigger).toHaveAttribute('data-popup-open'))
          await expect(trigger.matches(':hover')).toBe(false)
          await expect(getComputedStyle(trigger).backgroundColor).toBe('rgb(72, 116, 160)')
          await userEvent.keyboard('{Escape}')
          await waitFor(() => expect(trigger).not.toHaveAttribute('data-popup-open'))
        } finally {
          trigger.style.transition = previousTransition
        }
      }
    }
  },
  render: () => (
    <div className="flex flex-col gap-md">
      {MODES.map((mode) => (
        <section
          key={mode}
          data-testid={`token-states-${mode}`}
          data-theme={mode}
          style={interactionTheme}
          className="rounded-xl bg-surface p-sm"
        >
          <NavigationMenu aria-label={`${mode} token states`}>
            <NavigationMenu.List>
              {TONES.map((tone) => (
                <NavigationMenu.Item key={tone}>
                  <NavigationMenu.Trigger tone={tone}>{tone}</NavigationMenu.Trigger>
                  <NavigationMenu.Content>{tone} content</NavigationMenu.Content>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
            <NavigationMenu.Popup />
          </NavigationMenu>
        </section>
      ))}
    </div>
  ),
}
