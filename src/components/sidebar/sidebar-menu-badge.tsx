import { cn } from '@/utils/cn'

import { Badge } from '../badge'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuBadgeProps } from './sidebar.types'

export function SidebarMenuBadge({ className, ref, ...props }: SidebarMenuBadgeProps) {
  const { open } = useSidebar()

  return (
    <Badge
      className={cn(
        'duration-300 ease-in-out motion-reduce:transition-none',
        !open && 'pointer-events-none absolute right-0 opacity-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
