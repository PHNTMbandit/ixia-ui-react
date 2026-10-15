import { Children, isValidElement } from 'react'
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
  ...props
}: SidebarMenuCollapsibleProps) {
  const { open } = useSidebar()

  if (!open) {
    return <Popover>{children}</Popover>
  }

  return (
    <Collapsible
      defaultOpen={hasActiveDescendant(children)}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
    </Collapsible>
  )
}
