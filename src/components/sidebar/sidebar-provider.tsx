import React from 'react'

import { useMediaQuery } from '@/hooks'
import { cn } from '@/utils/cn'

type SidebarContextProps = React.ComponentProps<'div'> & {
  id: string
  defaultOpen?: boolean
  trigger?: () => void
  open?: boolean
  setOpen?: (open: boolean) => void
  isMobile?: boolean
  side?: 'left' | 'right'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

// 7 days in seconds
const SIDEBAR_COOKIE_MAX_AGE_SECONDS = 604_800,
  // oxlint-disable-next-line unicorn/no-null
  SidebarContext = React.createContext<SidebarContextProps | null>(null),
  useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
  }

function resolveOpenState(
  value: boolean | ((open: boolean) => boolean),
  previous: boolean,
): boolean {
  if (typeof value === 'function') {
    return value(previous)
  }
  return value
}

function SidebarProvider({
  id,
  defaultOpen = true,
  side = 'left',
  collapsible = 'icon',
  className,
  ref,
  ...props
}: SidebarContextProps) {
  const cookieName = `sidebar-state-${id}`,
    [openState, setOpenState] = React.useState<boolean>(defaultOpen),
    isMobile = useMediaQuery('mobile'),
    setOpen = (value: boolean | ((open: boolean) => boolean)) => {
      setOpenState((prev) => {
        const nextOpen = resolveOpenState(value, prev)

        document.cookie = [
          `${cookieName}=${encodeURIComponent(String(nextOpen))}`,
          'path=/',
          `max-age=${SIDEBAR_COOKIE_MAX_AGE_SECONDS}`,
          'samesite=lax',
        ].join('; ')

        return nextOpen
      })
    },
    trigger = () => setOpen((prev) => !prev)

  let effectiveCollapsible = collapsible
  if (isMobile) {
    effectiveCollapsible = 'offcanvas'
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsible: effectiveCollapsible,
        defaultOpen,
        id,
        isMobile,
        open: openState,
        setOpen,
        side,
        trigger,
      }}
    >
      <div
        className={cn(
          'relative size-full min-h-0',
          side === 'left' && 'flex flex-row',
          side === 'right' && 'flex flex-row-reverse',
          className,
        )}
        ref={ref}
        {...props}
      />
    </SidebarContext.Provider>
  )
}

export { SidebarProvider, useSidebar }
