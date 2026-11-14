import {
  ChartLineIcon,
  ChatIcon,
  CloudRainIcon,
  GridFourIcon,
  MapTrifoldIcon,
  MegaphoneIcon,
  MountainsIcon,
  NotePencilIcon,
  QuestionIcon,
  SidebarSimpleIcon,
  SquareHalfIcon,
  UserIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import { Avatar, AvatarFallback } from '../avatar'
import { Profile, ProfileContent, ProfileName, ProfileSubname } from '../profile'
import { Sidebar } from './index'
import { getStoredSidebarOpen } from './sidebar.utils'

const APP_FRAME_CLASS = 'h-svh overflow-hidden rounded-2xl border border-border',
  SidebarLogo = ({ isExpanded }: { isExpanded: boolean }) => (
    <div className="flex items-center justify-center gap-xs">
      <GridFourIcon weight="fill" />
      {isExpanded ? <span>My Application</span> : null}
    </div>
  ),
  PrimaryNavigation = () => (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Menu</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <GridFourIcon weight="bold" />
            <span>Dashboard</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <MapTrifoldIcon weight="bold" />
            <span>Map</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <ChartLineIcon weight="bold" />
            <span>Usage</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
        <Sidebar.MenuCollapsible>
          <Sidebar.MenuCollapsibleTrigger>
            <NotePencilIcon weight="bold" />
            <span>Projects</span>
          </Sidebar.MenuCollapsibleTrigger>
          <Sidebar.MenuCollapsiblePanel>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <CloudRainIcon weight="bold" />
                <span>Point Cloud Viewer</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton isActive>
                <MountainsIcon weight="bold" />
                <span>3D Tile Projects</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.MenuCollapsiblePanel>
        </Sidebar.MenuCollapsible>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <MegaphoneIcon weight="bold" />
            <span>Announcements</span>
          </Sidebar.MenuButton>
          <Sidebar.MenuBadge tone="accent">9</Sidebar.MenuBadge>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton>
            <QuestionIcon weight="bold" />
            <span>Help Center</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  ),
  SecondaryNavigation = () => (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Admin</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <ChatIcon weight="bold" />
              <span>Communications</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <UserIcon weight="bold" />
              <span>Team Members</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  ),
  SidebarShell = ({
    width,
    provider,
  }: {
    width?: number
    provider?: { collapsible?: 'icon' | 'offcanvas' | 'none'; side?: 'left' | 'right' }
  }) => (
    <div className={APP_FRAME_CLASS}>
      <Sidebar.Provider
        id="main-sidebar"
        defaultOpen={getStoredSidebarOpen('main-sidebar', true)}
        collapsible={provider?.collapsible}
        side={provider?.side}
      >
        <Sidebar width={width}>
          <Sidebar.Header>
            {(isExpanded, isMobile) => (
              <>
                {isExpanded ? <SidebarLogo isExpanded={isExpanded} /> : null}
                {!isMobile && (
                  <Sidebar.Toggle>
                    {(open) => (
                      <>
                        {open ? (
                          <SquareHalfIcon weight="bold" />
                        ) : (
                          <SidebarSimpleIcon weight="bold" />
                        )}
                      </>
                    )}
                  </Sidebar.Toggle>
                )}
              </>
            )}
          </Sidebar.Header>
          <Sidebar.Content>
            <PrimaryNavigation />
            <SecondaryNavigation />
          </Sidebar.Content>
          <Sidebar.Footer>
            {(isExpanded) =>
              isExpanded ? (
                <Profile>
                  <Avatar>
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <ProfileContent>
                    <ProfileName>Domenic Pittari</ProfileName>
                    <ProfileSubname>dom.pittari@gmail.com</ProfileSubname>
                  </ProfileContent>
                </Profile>
              ) : (
                <Avatar>
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              )
            }
          </Sidebar.Footer>
        </Sidebar>

        <Sidebar.Inset>
          <div className="flex flex-1 flex-col gap-sm bg-surface-background p-md">
            <div className="flex items-center justify-between rounded-lg bg-surface-low p-sm">
              <p className="style-text-strong--1 text-on-surface">Workspace Content</p>
              <Sidebar.Toggle>
                {(open) => (
                  <>
                    {open ? <SquareHalfIcon weight="bold" /> : <SidebarSimpleIcon weight="bold" />}
                  </>
                )}
              </Sidebar.Toggle>
            </div>
            <div className="flex-1 rounded-lg bg-surface-low p-sm style-text-default--1 text-on-surface-variant">
              Main content area to demonstrate sidebar positioning and collapse behavior.
            </div>
          </div>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  )

export default {
  afterEach: async ({ canvasElement }) => {
    await waitFor(() => {
      const animations = canvasElement
        .getAnimations({ subtree: true })
        .filter(
          (animation) =>
            (animation.playState === 'running' || animation.pending) &&
            animation.effect?.getComputedTiming().endTime !== Infinity,
        )
      expect(animations).toHaveLength(0)
    })
  },
  argTypes: {
    width: {
      control: { max: 520, min: 220, step: 10, type: 'number' },
      description: 'Expanded sidebar width in pixels.',
      table: {
        defaultValue: { summary: '400' },
      },
    },
  },
  args: {
    width: 400,
  },
  component: Sidebar,
  parameters: {
    docs: {
      description: {
        component:
          'Sidebar is a layout-aware navigation surface built from composable primitives such as groups, menu items, badges, and collapsible sections. Pair `SidebarProvider` with `Sidebar` to control side placement and collapse mode (`icon`, `offcanvas`, `none`). Use `SidebarToggle` to expose runtime control in app-shell layouts. Closed offcanvas sidebars (including mobile) hide their contents and remove them from keyboard navigation and the accessibility tree; desktop icon-collapse mode remains interactive.',
      },
      subtitle:
        'A composable navigation sidebar with collapse modes, grouped menus, and app-shell behavior.',
    },
    layout: 'fullscreen',
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  render: (args) => <SidebarShell width={args.width as number} />,
  subcomponents: {
    SidebarContent: Sidebar.Content,
    SidebarFooter: Sidebar.Footer,
    SidebarGroup: Sidebar.Group,
    SidebarGroupContent: Sidebar.GroupContent,
    SidebarGroupLabel: Sidebar.GroupLabel,
    SidebarHeader: Sidebar.Header,
    SidebarMenu: Sidebar.Menu,
    SidebarMenuBadge: Sidebar.MenuBadge,
    SidebarMenuButton: Sidebar.MenuButton,
    SidebarMenuCollapsible: Sidebar.MenuCollapsible,
    SidebarMenuCollapsiblePanel: Sidebar.MenuCollapsiblePanel,
    SidebarMenuCollapsibleTrigger: Sidebar.MenuCollapsibleTrigger,
    SidebarMenuItem: Sidebar.MenuItem,
    SidebarProvider: Sidebar.Provider,
    SidebarToggle: Sidebar.Toggle,
  },
  title: 'Components/Sidebar',
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for width with icon-collapse sidebar behavior.',
      },
    },
  },
}

export const CollapsibleIcon: Story = {
  name: 'Behavior / Collapsible Icon',
  parameters: {
    docs: {
      description: {
        story:
          'Collapsing to the icon rail keeps every row mounted: labels fade out while icons glide to the rail, and expanding reverses the motion.',
      },
    },
  },
  render: (args) => (
    <SidebarShell provider={{ collapsible: 'icon' }} width={args.width as number} />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    if (!('__vitest_browser_runner__' in globalThis)) return

    const { page } = await import('vite-plus/test/browser'),
      originalViewport = { height: innerHeight, width: innerWidth },
      iconRect = (button: HTMLElement) => button.querySelector('svg')!.getBoundingClientRect(),
      settled = () =>
        waitFor(() =>
          expect(
            canvasElement
              .getAnimations({ subtree: true })
              .some((animation) => animation.playState === 'running' || animation.pending),
          ).toBe(false),
        )

    try {
      await page.viewport(1280, 800)
      const [toggle] = canvas.getAllByRole('button', { name: 'Toggle sidebar' }),
        dashboard = canvas.getByRole('button', { name: 'Dashboard' }),
        dashboardLabel = dashboard.querySelector('span')!,
        projects = () => canvas.getByRole('button', { name: 'Projects' })

      if (getComputedStyle(dashboardLabel).opacity === '0') {
        await userEvent.click(toggle)
      }
      await settled()

      await expect(iconRect(projects()).width).toBeCloseTo(iconRect(dashboard).width, 1)
      await expect(iconRect(projects()).left).toBeCloseTo(iconRect(dashboard).left, 1)

      const openLeft = iconRect(dashboard).left
      await userEvent.click(toggle)
      await waitFor(() =>
        expect(
          dashboardLabel
            .getAnimations()
            .some(
              (animation) =>
                animation instanceof CSSTransition && animation.transitionProperty === 'opacity',
            ),
        ).toBe(true),
      )
      await expect(canvas.getByText('Menu')).toBeInTheDocument()
      await expect(Math.abs(iconRect(dashboard).left - openLeft)).toBeLessThan(4)

      await settled()
      await expect(getComputedStyle(dashboardLabel).opacity).toBe('0')
      await expect(dashboard).toHaveAccessibleName('Dashboard')
      await expect(dashboard.getBoundingClientRect().width).toBeCloseTo(
        projects().getBoundingClientRect().width,
        1,
      )
      await expect(iconRect(projects()).width).toBeCloseTo(iconRect(dashboard).width, 1)
      await expect(iconRect(projects()).left).toBeCloseTo(iconRect(dashboard).left, 1)

      await userEvent.click(toggle)
      await settled()
      await expect(getComputedStyle(dashboardLabel).opacity).toBe('1')
    } finally {
      await page.viewport(originalViewport.width, originalViewport.height)
    }
  },
}

export const CollapsibleOffcanvas: Story = {
  name: 'Behavior / Collapsible Offcanvas',
  render: (args) => (
    <div className={APP_FRAME_CLASS}>
      <Sidebar.Provider
        id="main-sidebar"
        defaultOpen={getStoredSidebarOpen('main-sidebar', true)}
        collapsible="offcanvas"
        side="left"
      >
        <Sidebar width={args.width as number}>
          <Sidebar.Header>
            {(isExpanded) => <>{isExpanded ? <SidebarLogo isExpanded={isExpanded} /> : null}</>}
          </Sidebar.Header>
          <Sidebar.Content>
            <PrimaryNavigation />
            <SecondaryNavigation />
          </Sidebar.Content>
          <Sidebar.Footer>
            {(isExpanded) =>
              isExpanded ? (
                <Profile>
                  <Avatar>
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <ProfileContent>
                    <ProfileName>Domenic Pittari</ProfileName>
                    <ProfileSubname>dom.pittari@gmail.com</ProfileSubname>
                  </ProfileContent>
                </Profile>
              ) : (
                <Avatar>
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              )
            }
          </Sidebar.Footer>
        </Sidebar>

        <div className="flex flex-1 flex-col gap-sm bg-surface-background p-md">
          <Sidebar.Toggle>
            {(open) => (
              <>
                {open ? (
                  <SidebarSimpleIcon weight="bold" className="rotate-90" />
                ) : (
                  <SidebarSimpleIcon weight="bold" />
                )}
              </>
            )}
          </Sidebar.Toggle>
          <div className="flex items-center justify-between rounded-lg bg-surface-low p-sm">
            <p className="style-text-strong--1 text-on-surface">Workspace Content</p>
          </div>
          <div className="flex-1 rounded-lg bg-surface-low p-sm style-text-default--1 text-on-surface-variant">
            Main content area to demonstrate sidebar positioning and collapse behavior.
          </div>
        </div>
      </Sidebar.Provider>
    </div>
  ),
}

export const NonCollapsible: Story = {
  name: 'Behavior / Non Collapsible',
  render: (args) => (
    <SidebarShell provider={{ collapsible: 'none' }} width={args.width as number} />
  ),
}

export const ClosedOffcanvas: Story = {
  name: 'Behavior / Closed Offcanvas',
  parameters: {
    docs: {
      description: {
        story:
          'A closed offcanvas sidebar keeps its content mounted but invisible and inert. An external toggle restores the content. The same behavior applies when mobile viewports switch the sidebar to offcanvas mode.',
      },
    },
  },
  render: (args) => (
    <div className={APP_FRAME_CLASS}>
      <Sidebar.Provider id="closed-offcanvas-sidebar" defaultOpen={false} collapsible="offcanvas">
        <Sidebar {...args} data-testid="offcanvas-sidebar">
          <Sidebar.Content>
            <PrimaryNavigation />
          </Sidebar.Content>
        </Sidebar>
        <Sidebar.Inset>
          <Sidebar.Toggle>Toggle sidebar</Sidebar.Toggle>
          <p>Workspace Content</p>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const sidebar = canvas.getByTestId('offcanvas-sidebar'),
      dashboard = canvas.getByText('Dashboard'),
      toggle = canvas.getByRole('button', { name: 'Toggle sidebar' })

    await expect(sidebar).not.toBeVisible()
    await expect(sidebar).toHaveAttribute('inert')
    await expect(sidebar).toHaveAttribute('aria-hidden', 'true')
    await expect(dashboard).not.toBeVisible()
    await expect(canvas.queryByRole('button', { name: 'Dashboard' })).not.toBeInTheDocument()

    await userEvent.click(toggle)
    await expect(sidebar).toBeVisible()
    await expect(sidebar).not.toHaveAttribute('inert')
    await expect(sidebar).not.toHaveAttribute('aria-hidden')
    await expect(await canvas.findByRole('button', { name: 'Dashboard' })).toBeVisible()

    await userEvent.click(toggle)
    await expect(sidebar).not.toBeVisible()
    await expect(dashboard).not.toBeVisible()
    await expect(sidebar).toHaveAttribute('inert')
  },
}

export const RightSide: Story = {
  name: 'Position / Right Side',
  render: (args) => <SidebarShell provider={{ side: 'right' }} width={args.width as number} />,
}

export const MobileResponsive: Story = {
  name: 'Behavior / Mobile Responsive',
  parameters: {
    docs: {
      description: {
        story:
          'On mobile viewports the sidebar switches to offcanvas mode and starts closed, including when resizing from an open desktop sidebar. The panel and its content hide together immediately at the breakpoint. Use `SidebarToggle` to open the mobile overlay. Desktop open state and its saved preference are preserved independently; returning to mobile starts closed again.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
      options: INITIAL_VIEWPORTS,
    },
  },
  render: (args) => (
    <div className={APP_FRAME_CLASS}>
      <Sidebar.Provider
        id="mobile-sidebar"
        defaultOpen={getStoredSidebarOpen('mobile-sidebar', true)}
        collapsible="icon"
        side="left"
      >
        <Sidebar width={args.width as number} data-testid="responsive-sidebar">
          <Sidebar.Header>
            {(isExpanded) => (
              <>
                {isExpanded ? <SidebarLogo isExpanded={isExpanded} /> : null}
                <Sidebar.Toggle>
                  {(open) => (
                    <>
                      {open ? (
                        <SquareHalfIcon weight="bold" />
                      ) : (
                        <SidebarSimpleIcon weight="bold" />
                      )}
                    </>
                  )}
                </Sidebar.Toggle>
              </>
            )}
          </Sidebar.Header>
          <Sidebar.Content>
            <PrimaryNavigation />
            <SecondaryNavigation />
          </Sidebar.Content>
          <Sidebar.Footer>
            {(isExpanded) =>
              isExpanded ? (
                <Profile>
                  <Avatar>
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <ProfileContent>
                    <ProfileName>Domenic Pittari</ProfileName>
                    <ProfileSubname>dom.pittari@gmail.com</ProfileSubname>
                  </ProfileContent>
                </Profile>
              ) : (
                <Avatar>
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              )
            }
          </Sidebar.Footer>
        </Sidebar>

        <div className="flex flex-1 flex-col gap-sm bg-surface-background p-md">
          <div className="flex items-center justify-between rounded-lg bg-surface-low p-sm">
            <p className="style-text-strong--1 text-on-surface">Workspace Content</p>
            <Sidebar.Toggle>
              {(open) => (
                <>{open ? <SquareHalfIcon weight="bold" /> : <SidebarSimpleIcon weight="bold" />}</>
              )}
            </Sidebar.Toggle>
          </div>
          <div className="flex-1 rounded-lg bg-surface-low p-sm style-text-default--1 text-on-surface-variant">
            Resize to a mobile viewport and the sidebar becomes an offcanvas overlay automatically.
          </div>
        </div>
      </Sidebar.Provider>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    if (!('__vitest_browser_runner__' in globalThis)) return

    const { page } = await import('vite-plus/test/browser'),
      sidebar = canvas.getByTestId('responsive-sidebar'),
      originalViewport = { height: innerHeight, width: innerWidth }

    try {
      for (let pass = 0; pass < 2; pass++) {
        await page.viewport(1280, 800)
        await waitFor(() => expect(getComputedStyle(sidebar).position).toBe('sticky'))
        await expect(sidebar).not.toHaveAttribute('inert')
        await expect(sidebar).toBeVisible()

        const visibleCounts: number[] = []
        let frame = 0
        const sample = () => {
          if (sidebar.inert) {
            visibleCounts.push(
              [...sidebar.querySelectorAll('*')].filter((element) =>
                element.checkVisibility({ opacityProperty: true, visibilityProperty: true }),
              ).length,
            )
          }
          frame = requestAnimationFrame(sample)
        }

        frame = requestAnimationFrame(sample)
        try {
          await page.viewport(420, 800)
          await waitFor(() => expect(sidebar).toHaveAttribute('inert'))
          await waitFor(() => expect(visibleCounts.length).toBeGreaterThan(0))
          await expect(visibleCounts.every((count) => count === 0)).toBe(true)
        } finally {
          cancelAnimationFrame(frame)
        }

        await userEvent.click(canvas.getByRole('button', { name: 'Toggle sidebar' }))
        await expect(sidebar).not.toHaveAttribute('inert')
        await expect(sidebar).toBeVisible()
        await waitFor(() =>
          expect(
            sidebar
              .getAnimations({ subtree: true })
              .some((animation) => animation.playState === 'running' || animation.pending),
          ).toBe(false),
        )
      }
    } finally {
      await page.viewport(originalViewport.width, originalViewport.height)
    }
  },
}

export const FillScreenHeight: Story = {
  name: 'Layout / Fill Screen Height',
  parameters: {
    docs: {
      description: {
        story:
          'The sidebar and content area fill the full screen height. The sidebar provider uses h-full to ensure both the sidebar and inset content stretch to fill the parent container.',
      },
    },
  },
  render: (args) => (
    <SidebarShell width={args.width as number} provider={{ collapsible: 'icon' }} />
  ),
  play: async ({ canvasElement }) => {
    const frameEl = canvasElement.querySelector('.h-svh')
    const provider = canvasElement.querySelector('[class*="flex"][class*="flex-row"]')
    const sidebar = canvasElement.querySelector('[class*="flex-col"][class*="overflow-hidden"]')
    const inset = canvasElement.querySelector('[class*="flex-1"][class*="min-h-0"]')

    if (frameEl) {
      await expect(frameEl).toBeInTheDocument()
    }

    if (provider) {
      const providerHeight = provider.getBoundingClientRect().height
      await expect(providerHeight).toBeGreaterThan(0)
    }

    if (sidebar) {
      const sidebarHeight = sidebar.getBoundingClientRect().height
      await expect(sidebarHeight).toBeGreaterThan(0)
    }

    if (inset) {
      const insetHeight = inset.getBoundingClientRect().height
      await expect(insetHeight).toBeGreaterThan(0)
    }
  },
}

export const MobileSlideAnimation: Story = {
  name: 'Animation / Mobile Slide In/Out',
  parameters: {
    docs: {
      description: {
        story:
          'On mobile the sidebar fits its content and slides in from its edge with `animate-in` / `slide-in-from-left`, then slides back out with `animate-out` / `slide-out-to-left` (from `tw-animate-css`). Toggle it to see both directions.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
      options: INITIAL_VIEWPORTS,
    },
  },
  render: (args) => (
    <div className={APP_FRAME_CLASS}>
      <Sidebar.Provider
        id="slide-animation-sidebar"
        defaultOpen={false}
        collapsible="offcanvas"
        side="left"
      >
        <Sidebar width={args.width as number} data-testid="slide-sidebar">
          <Sidebar.Header>
            {(isExpanded, isMobile) => (
              <>
                {isExpanded ? <SidebarLogo isExpanded={isExpanded} /> : null}
                {!isMobile && (
                  <Sidebar.Toggle>
                    {(open) => (
                      <>
                        {open ? (
                          <SquareHalfIcon weight="bold" />
                        ) : (
                          <SidebarSimpleIcon weight="bold" />
                        )}
                      </>
                    )}
                  </Sidebar.Toggle>
                )}
              </>
            )}
          </Sidebar.Header>
          <Sidebar.Content>
            <PrimaryNavigation />
            <SecondaryNavigation />
          </Sidebar.Content>
          <Sidebar.Footer>
            {(isExpanded) =>
              isExpanded ? (
                <Profile>
                  <Avatar>
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <ProfileContent>
                    <ProfileName>Domenic Pittari</ProfileName>
                    <ProfileSubname>dom.pittari@gmail.com</ProfileSubname>
                  </ProfileContent>
                </Profile>
              ) : (
                <Avatar>
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              )
            }
          </Sidebar.Footer>
        </Sidebar>

        <div className="flex flex-1 flex-col gap-sm bg-surface-background p-md">
          <div className="flex items-center justify-between rounded-lg bg-surface-low p-sm">
            <p className="style-text-strong--1 text-on-surface">Workspace Content</p>
            <Sidebar.Toggle>
              {(open) => (
                <>{open ? <SquareHalfIcon weight="bold" /> : <SidebarSimpleIcon weight="bold" />}</>
              )}
            </Sidebar.Toggle>
          </div>
          <div className="flex-1 rounded-lg bg-surface-low p-sm style-text-default--1 text-on-surface-variant">
            Click the toggle button to see the sidebar slide in and out with smooth animations.
          </div>
        </div>
      </Sidebar.Provider>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const sidebar = canvas.getByTestId('slide-sidebar'),
      toggle = canvas.getByRole('button', { name: 'Toggle sidebar' }),
      getRect = () => sidebar.getBoundingClientRect(),
      getFrameLeft = () => sidebar.parentElement?.getBoundingClientRect().left ?? 0,
      getSlide = (name: 'enter' | 'exit') =>
        sidebar
          .getAnimations()
          .find(
            (animation): animation is CSSAnimation =>
              animation instanceof CSSAnimation && animation.animationName === name,
          ),
      freezeHalfway = async (name: 'enter' | 'exit') => {
        await waitFor(() => expect(getSlide(name)).toBeDefined())
        for (const animation of sidebar.getAnimations()) {
          animation.pause()
          animation.currentTime = Number(animation.effect?.getComputedTiming().duration) / 2
        }
      },
      finishAnimations = () => {
        for (const animation of sidebar.getAnimations()) {
          animation.finish()
        }
      }

    await expect(sidebar).toHaveAttribute('inert')
    await expect(sidebar).toHaveAttribute('aria-hidden', 'true')
    await expect(sidebar).not.toBeVisible()
    await expect(sidebar.getAnimations()).toHaveLength(0)
    await expect(getRect().width).toBeGreaterThan(80)

    await userEvent.click(toggle)
    await expect(sidebar).not.toHaveAttribute('inert')
    await freezeHalfway('enter')
    await expect(sidebar).toBeVisible()
    await expect(getRect().left).toBeLessThan(getFrameLeft())
    await expect(getRect().right).toBeGreaterThan(getFrameLeft())
    finishAnimations()
    await waitFor(() => expect(getRect().left).toBeCloseTo(getFrameLeft(), 0))
    await expect(sidebar).toBeVisible()

    await userEvent.click(toggle)
    await expect(sidebar).toHaveAttribute('inert')
    await freezeHalfway('exit')
    await expect(sidebar).toBeVisible()
    await expect(getRect().left).toBeLessThan(getFrameLeft())
    await expect(getRect().right).toBeGreaterThan(getFrameLeft())
    finishAnimations()
    await waitFor(() => expect(getRect().right).toBeLessThanOrEqual(getFrameLeft()))
    await waitFor(() => expect(sidebar).not.toBeVisible())
  },
}
