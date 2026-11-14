import { Children, isValidElement, useState } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

import { Collapsible } from '../collapsible'
import { Popover } from '../popover'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuCollapsibleProps } from './sidebar.types'

const hasActiveDescendant = (children: ReactNode): boolean =>
  Children.toArray(children).some((child) => {
    if (!isValidElement<{ isActive?: boolean; children?: ReactNode }>(child)) {
      return false
    }

    return child.props.isActive === true || hasActiveDescendant(child.props.children)
  })

export function SidebarMenuCollapsible({
  className,
  children,
  ref,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: SidebarMenuCollapsibleProps) {
  const { open } = useSidebar(),
    [expanded, setExpanded] = useState(() => defaultOpen ?? hasActiveDescendant(children)),
    [popoverOpen, setPopoverOpen] = useState(false),
    handleOpenChange: NonNullable<SidebarMenuCollapsibleProps['onOpenChange']> = (
      nextOpen,
      eventDetails,
    ) => {
      setExpanded(nextOpen)
      onOpenChange?.(nextOpen, eventDetails)
    }

  if (open && popoverOpen) {
    setPopoverOpen(false)
  }

  return (
    <Collapsible
      className={cn('', className)}
      open={open && (openProp ?? expanded)}
      onOpenChange={handleOpenChange}
      ref={ref}
      {...props}
    >
      <Popover open={!open && popoverOpen} onOpenChange={setPopoverOpen}>
        {children}
      </Popover>
    </Collapsible>
  )
}
