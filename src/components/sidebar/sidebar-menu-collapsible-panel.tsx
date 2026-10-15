import { cn } from '@/utils/cn'

import { CollapsiblePanel } from '../collapsible'
import { PopoverContent, PopoverPanel } from '../popover'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuCollapsiblePanelProps } from './sidebar.types'

export function SidebarMenuCollapsiblePanel({
  className,
  children,
  ref,
  ...props
}: SidebarMenuCollapsiblePanelProps) {
  const { open } = useSidebar()

  if (!open) {
    return (
      <PopoverPanel side="right" className="w-fit bg-surface p-[0.5rem_0.5rem]">
        <PopoverContent className="flex gap-3xs">{children}</PopoverContent>
      </PopoverPanel>
    )
  }

  return (
    <CollapsiblePanel className={cn('py-3xs', className)} ref={ref} {...props}>
      {children}
    </CollapsiblePanel>
  )
}
