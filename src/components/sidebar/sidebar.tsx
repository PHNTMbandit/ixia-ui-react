import React from 'react'

import { cn } from '@/utils/cn'

import { SidebarContext, useSidebar } from './sidebar-provider'
import type { SidebarProps } from './sidebar.types'

const DEFAULT_SIDEBAR_WIDTH = 400,
  ICON_RAIL_WIDTH = 80,
  SIDEBAR_BORDER_WIDTH = 1,
  MOBILE_SLIDE_CLASSES = {
    left: { edge: 'left-0', enter: 'slide-in-from-left', exit: 'slide-out-to-left' },
    right: { edge: 'right-0 left-auto', enter: 'slide-in-from-right', exit: 'slide-out-to-right' },
  }

interface SidebarLayoutProps {
  collapsible?: 'offcanvas' | 'icon' | 'none'
  hasOpened?: boolean
  open?: boolean
  isMobile?: boolean
  side?: 'left' | 'right'
  width: string | number
}

function getOffcanvasWidth(
  open: boolean | undefined,
  fullWidth: React.CSSProperties,
): React.CSSProperties {
  if (!open) {
    return { width: '0px' }
  }
  return fullWidth
}

function getIconWidth(
  open: boolean | undefined,
  fullWidth: React.CSSProperties,
): React.CSSProperties {
  if (open) {
    return fullWidth
  }
  return {
    paddingInline: `calc((${ICON_RAIL_WIDTH - SIDEBAR_BORDER_WIDTH}px - var(--spacing-xl)) / 2 - 2 * var(--spacing-3xs))`,
    width: `${ICON_RAIL_WIDTH}px`,
  }
}

function getWidthStyle({
  collapsible,
  open,
  isMobile,
  width,
}: SidebarLayoutProps): React.CSSProperties {
  if (isMobile) {
    return { maxWidth: '100%', width: 'max-content' }
  }
  const fullWidth: React.CSSProperties = { width: `${width}px` }
  if (collapsible === 'offcanvas') {
    return getOffcanvasWidth(open, fullWidth)
  }
  if (collapsible === 'icon') {
    return getIconWidth(open, fullWidth)
  }
  return fullWidth
}

function getGapClasses({ collapsible, open, isMobile }: SidebarLayoutProps) {
  if (collapsible === 'none') {
    return 'gap-lg'
  }
  if (open || isMobile) {
    return 'gap-lg'
  }
  return 'gap-sm'
}

function getPositionClasses({ open, hasOpened, isMobile, side }: SidebarLayoutProps) {
  if (!isMobile) {
    return ''
  }

  const { edge, enter, exit } = MOBILE_SLIDE_CLASSES[side === 'right' ? 'right' : 'left'],
    base = cn('absolute z-50 p-md', edge)

  if (open) {
    return cn(base, 'animate-in motion-reduce:animate-none', enter)
  }

  if (!hasOpened) {
    return cn(base, 'opacity-0 transition-none')
  }

  return cn(
    base,
    'animate-out transition-[visibility] fill-mode-forwards motion-reduce:animate-none motion-reduce:transition-none',
    exit,
  )
}

export function Sidebar({ width = DEFAULT_SIDEBAR_WIDTH, className, ...props }: SidebarProps) {
  const sidebar = useSidebar(),
    { open, setOpen, isMobile, collapsible, side } = sidebar,
    sidebarRef = React.useRef<HTMLDivElement>(null),
    [hasOpened, setHasOpened] = React.useState(false),
    layout: SidebarLayoutProps = { collapsible, hasOpened, isMobile, open, side, width },
    isHidden = collapsible === 'offcanvas' && !open,
    nextHasOpened = Boolean(isMobile) && (hasOpened || Boolean(open))

  if (nextHasOpened !== hasOpened) {
    setHasOpened(nextHasOpened)
  }

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        event.target instanceof Node &&
        !sidebarRef.current.contains(event.target) &&
        isMobile &&
        open &&
        setOpen
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [open, setOpen, isMobile])

  return (
    <SidebarContext.Provider value={isMobile ? { ...sidebar, open: true } : sidebar}>
      <div
        className={cn(
          'sticky left-[0px] flex h-full max-h-dvh min-h-0 shrink-0 flex-col overflow-hidden border-border bg-surface-background transition-[width,transform,padding,gap] duration-300 ease-in-out motion-reduce:transition-none',
          className,
          getGapClasses(layout),
          getPositionClasses(layout),
          isHidden && 'invisible',
          collapsible === 'offcanvas' && !open && 'border-none',
          open && 'p-md',
          collapsible === 'icon' && !open && 'py-md',
          isMobile && 'bg-surface shadow-lg',
          side === 'left' && 'border-r',
          side === 'right' && 'border-l',
        )}
        ref={sidebarRef}
        style={getWidthStyle(layout)}
        {...props}
        aria-hidden={isHidden || undefined}
        inert={isHidden}
      />
    </SidebarContext.Provider>
  )
}
