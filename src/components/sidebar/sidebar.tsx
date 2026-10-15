import React from 'react'

import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarProps } from './sidebar.types'

const DEFAULT_SIDEBAR_WIDTH = 400

interface SidebarLayoutProps {
  collapsible?: 'offcanvas' | 'icon' | 'none'
  open?: boolean
  isMobile?: boolean
  width: string | number
}

function getOffcanvasWidth(
  open: boolean | undefined,
  isMobile: boolean | undefined,
  fullWidth: React.CSSProperties,
): React.CSSProperties {
  if (!open) {
    return { width: '0px' }
  }
  if (isMobile) {
    return { width: '33.333333%' }
  }
  return fullWidth
}

function getIconWidth(
  open: boolean | undefined,
  isMobile: boolean | undefined,
  fullWidth: React.CSSProperties,
): React.CSSProperties {
  if (open) {
    return fullWidth
  }
  if (isMobile) {
    return { width: '0px' }
  }
  return { width: '80px' }
}

function getWidthStyle({
  collapsible,
  open,
  isMobile,
  width,
}: SidebarLayoutProps): React.CSSProperties {
  const fullWidth: React.CSSProperties = { width: `${width}px` }
  if (collapsible === 'offcanvas') {
    return getOffcanvasWidth(open, isMobile, fullWidth)
  }
  if (collapsible === 'icon') {
    return getIconWidth(open, isMobile, fullWidth)
  }
  return fullWidth
}

function getGapClasses({ collapsible, open }: SidebarLayoutProps) {
  if (collapsible === 'none') {
    return 'gap-lg'
  }
  if (open) {
    return 'gap-lg'
  }
  return 'gap-sm'
}

function getPositionClasses({ collapsible, open, isMobile }: SidebarLayoutProps) {
  if ((collapsible === 'offcanvas' || collapsible === 'icon') && !open && isMobile) {
    return 'absolute z-50 -translate-x-full'
  }

  if ((collapsible === 'offcanvas' || collapsible === 'icon') && open && isMobile) {
    return 'absolute z-50'
  }

  return ''
}

export function Sidebar({
  tone = 'primary',
  width = DEFAULT_SIDEBAR_WIDTH,
  className,
  ...props
}: SidebarProps) {
  const { open, setOpen, isMobile, collapsible, side } = useSidebar(),
    sidebarRef = React.useRef<HTMLDivElement>(null),
    layout: SidebarLayoutProps = { collapsible, isMobile, open, width }

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
    <div
      className={cn(
        'sticky left-[0px] flex h-full max-h-dvh min-h-0 shrink-0 flex-col overflow-hidden border-border bg-surface transition-[width,transform] duration-300 ease-in-out',
        className,
        tone === 'primary' && 'bg-surface-background',
        tone === 'secondary' && 'bg-surface',
        tone === 'ghost' && 'bg-transparent',
        getGapClasses(layout),
        getPositionClasses(layout),
        collapsible === 'offcanvas' && !open && 'border-none',
        open && 'p-md',
        collapsible === 'icon' && !open && 'py-md',
        isMobile && 'border-none',
        side === 'left' && 'border-r',
        side === 'right' && 'border-l',
      )}
      ref={sidebarRef}
      style={getWidthStyle(layout)}
      {...props}
    />
  )
}
