import { cn } from '@/utils/cn'

import { Badge } from '../badge'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuBadgeProps } from './sidebar.types'

export function SidebarMenuBadge({ className, ref, ...props }: SidebarMenuBadgeProps) {
  const { open } = useSidebar()

  return <Badge className={cn(!open && 'hidden', className)} ref={ref} {...props} />
}
