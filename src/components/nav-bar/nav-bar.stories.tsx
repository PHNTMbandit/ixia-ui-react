import {
  BellIcon,
  ChartLineIcon,
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { NavBar } from './index'
import type { NavBarItemProps } from './nav-bar.types'

const SIZES = ['small', 'medium', 'large'] as const,
  VARIANTS = ['outline', 'floating'] as const,
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  // ─── Mobile shell ────────────────────────────────────────────────────────────

  PHONE_SIZES = {
    large: { h: 932, w: 430 },
    medium: { h: 844, w: 390 },
    small: { h: 568, w: 320 },
  } as const,
  MobileShell = ({
    children,
    navBar,
    size = 'medium',
  }: {
    children?: React.ReactNode
    navBar: React.ReactNode
    size?: keyof typeof PHONE_SIZES
  }) => {
    const { w, h } = PHONE_SIZES[size]
    return (
      <div
        className="relative mx-auto flex flex-col overflow-hidden rounded-3xl border-[6px] border-neutral-default bg-surface-background shadow-lg"
        style={{ height: h, width: w }}
      >
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between px-sm pt-xs pb-3xs">
          <span className="style-text-strong--2 text-on-surface">9:41</span>
          <div className="flex items-center gap-3xs opacity-50">
            <div className="h-[6px] w-[16px] rounded-sm bg-on-surface" />
            <div className="size-[6px] rounded-sm bg-on-surface" />
            <div className="size-[6px] rounded-sm bg-on-surface" />
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col gap-sm overflow-hidden px-md pb-sm">
          {children ?? (
            <>
              <p className="style-text-strong-0 text-on-surface">Dashboard</p>
              <div className="flex-1 rounded-2xl bg-surface-low" />
              <div className="grid grid-cols-2 gap-sm">
                <div className="h-[96px] rounded-xl bg-surface-low" />
                <div className="h-[96px] rounded-xl bg-surface-low" />
              </div>
            </>
          )}
        </div>

        {/* Nav bar pinned to bottom */}
        <div className="flex shrink-0 justify-center pt-xs">{navBar}</div>
      </div>
    )
  },
  // ─── Shared nav items ─────────────────────────────────────────────────────────

  DefaultItems = ({ tone }: { tone?: NavBarItemProps['tone'] }) => (
    <>
      <NavBar.Item isActive tone={tone}>
        <NavBar.ItemIcon>
          <HouseIcon />
        </NavBar.ItemIcon>
        <NavBar.ItemLabel>Home</NavBar.ItemLabel>
      </NavBar.Item>
      <NavBar.Item tone={tone}>
        <NavBar.ItemIcon>
          <MagnifyingGlassIcon />
        </NavBar.ItemIcon>
        <NavBar.ItemLabel>Search</NavBar.ItemLabel>
      </NavBar.Item>
      <NavBar.Item tone={tone}>
        <NavBar.ItemIcon>
          <ChartLineIcon />
        </NavBar.ItemIcon>
        <NavBar.ItemLabel>Stats</NavBar.ItemLabel>
      </NavBar.Item>
      <NavBar.Item tone={tone}>
        <NavBar.ItemIcon>
          <BellIcon />
        </NavBar.ItemIcon>
        <NavBar.ItemLabel>Alerts</NavBar.ItemLabel>
      </NavBar.Item>
    </>
  )

export default {
  argTypes: {
    size: {
      control: { type: 'select' },
      options: SIZES,
      table: { defaultValue: { summary: 'medium' } },
    },
    variant: {
      control: { type: 'select' },
      options: VARIANTS,
      table: { defaultValue: { summary: 'outline' } },
    },
  },
  args: {
    size: 'medium',
    variant: 'outline',
  },
  component: NavBar,
  parameters: {
    docs: {
      description: {
        component:
          'NavBar is a compact bottom navigation surface composed of `NavBarItem`, `NavBarItemIcon`, and `NavBarItemLabel`. It supports three sizes, two visual variants, and per-item tone coloring.',
      },
      subtitle: 'A floating navigation bar for mobile app-shell layouts.',
    },
  },
  title: 'Components/Nav Bar',
} satisfies Meta<typeof NavBar>

type Story = StoryObj<typeof NavBar>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => (
    <MobileShell
      navBar={
        <NavBar {...args}>
          <DefaultItems />
        </NavBar>
      }
    />
  ),
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end justify-center gap-xl">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-sm">
          <MobileShell
            size={size}
            navBar={
              <NavBar {...args} size={size}>
                <DefaultItems />
              </NavBar>
            }
          />
          <span className="style-text-strong--1 text-on-surface capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end justify-center gap-xl">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-sm">
          <MobileShell
            navBar={
              <NavBar {...args} variant={variant}>
                <DefaultItems />
              </NavBar>
            }
          />
          <span className="style-text-strong--1 text-on-surface capitalize">{variant}</span>
        </div>
      ))}
    </div>
  ),
}

// ─── Tones ───────────────────────────────────────────────────────────────────

export const Tones: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end justify-center gap-xl">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-col items-center gap-sm">
          <MobileShell
            navBar={
              <NavBar {...args}>
                <NavBar.Item isActive tone={tone}>
                  <NavBar.ItemIcon>
                    <HouseIcon />
                  </NavBar.ItemIcon>
                  <NavBar.ItemLabel>Home</NavBar.ItemLabel>
                </NavBar.Item>
                <NavBar.Item tone={tone}>
                  <NavBar.ItemIcon>
                    <MagnifyingGlassIcon />
                  </NavBar.ItemIcon>
                  <NavBar.ItemLabel>Search</NavBar.ItemLabel>
                </NavBar.Item>
                <NavBar.Item tone={tone}>
                  <NavBar.ItemIcon>
                    <GearIcon />
                  </NavBar.ItemIcon>
                  <NavBar.ItemLabel>Settings</NavBar.ItemLabel>
                </NavBar.Item>
              </NavBar>
            }
          />
          <span className="style-text-strong--1 text-on-surface capitalize">{tone}</span>
        </div>
      ))}
    </div>
  ),
}

export const HorizontalItems: Story = {
  render: (args) => (
    <MobileShell
      navBar={
        <NavBar {...args} itemOrientation="horizontal">
          <DefaultItems />
        </NavBar>
      }
    />
  ),
}
