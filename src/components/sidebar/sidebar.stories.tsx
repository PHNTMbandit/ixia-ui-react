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

const TONES = ['primary', 'secondary', 'ghost'] as const,
  APP_FRAME_CLASS = 'h-[70vh] w-[1100px] overflow-hidden rounded-2xl border border-border',
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
    tone,
    width,
    provider,
  }: {
    tone?: (typeof TONES)[number]
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
        <Sidebar tone={tone} width={width}>
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
            Main content area to demonstrate sidebar positioning and collapse behavior.
          </div>
        </div>
      </Sidebar.Provider>
    </div>
  )

export default {
  afterEach: async ({ canvasElement }) => {
    // Theme color transitions must settle before accessibility contrast checks.
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
    tone: {
      control: { type: 'select' },
      description: 'Visual surface treatment for the sidebar container.',
      options: TONES,
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    width: {
      control: { max: 520, min: 220, step: 10, type: 'number' },
      description: 'Expanded sidebar width in pixels.',
      table: {
        defaultValue: { summary: '400' },
      },
    },
  },
  args: {
    tone: 'primary',
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
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  render: (args) => <SidebarShell tone={args.tone} width={args.width as number} />,
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
} satisfies Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for width and tone with icon-collapse sidebar behavior.',
      },
    },
  },
}

export const CollapsibleIcon: Story = {
  name: 'Behavior / Collapsible Icon',
  render: (args) => (
    <SidebarShell
      provider={{ collapsible: 'icon' }}
      tone={args.tone}
      width={args.width as number}
    />
  ),
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
        <Sidebar tone={args.tone} width={args.width as number}>
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
    <SidebarShell
      provider={{ collapsible: 'none' }}
      tone={args.tone}
      width={args.width as number}
    />
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

export const GhostTone: Story = {
  args: {
    tone: 'ghost',
  },
  name: 'Tone / Ghost',
  render: (args) => (
    <SidebarShell
      provider={{ collapsible: 'icon' }}
      tone={args.tone}
      width={args.width as number}
    />
  ),
}

export const RightSide: Story = {
  name: 'Position / Right Side',
  render: (args) => (
    <SidebarShell provider={{ side: 'right' }} tone={args.tone} width={args.width as number} />
  ),
}

export const MobileResponsive: Story = {
  name: 'Behavior / Mobile Responsive',
  parameters: {
    docs: {
      description: {
        story:
          'On mobile viewports the sidebar switches to offcanvas mode and starts closed, including when resizing from an open desktop sidebar. Use `SidebarToggle` to open the mobile overlay. Desktop open state and its saved preference are preserved independently; returning to mobile starts closed again.',
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
        <Sidebar tone={args.tone} width={args.width as number}>
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
}
