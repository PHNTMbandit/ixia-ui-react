import { cn } from '@/utils/cn'

import type { SidebarMenuItemProps } from './sidebar.types'

export function SidebarMenuItem({ className, ref, ...props }: SidebarMenuItemProps) {
  return (
    <div
      className={cn('flex h-xl w-full items-center justify-between gap-2xs', className)}
      ref={ref}
      {...props}
    />
  )
}
