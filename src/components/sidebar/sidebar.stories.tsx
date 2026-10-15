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
          'Sidebar is a layout-aware navigation surface built from composable primitives such as groups, menu items, badges, and collapsible sections. Pair `SidebarProvider` with `Sidebar` to control side placement and collapse mode (`icon`, `offcanvas`, `none`). Use `SidebarToggle` to expose runtime control in app-shell layouts.',
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
          'On mobile viewports the sidebar automatically switches to offcanvas mode, so an open sidebar collapses into an overlay driven by `useMediaQuery`. Use `SidebarToggle` to slide it in and out.',
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
