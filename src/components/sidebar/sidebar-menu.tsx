import { cn } from '@/utils/cn'

import type { SidebarMenuProps } from './sidebar.types'

export function SidebarMenu({ className, ref, ...props }: SidebarMenuProps) {
  return (
    <div
      className={cn('flex w-full flex-col items-start gap-3xs p-3xs', className)}
      ref={ref}
      {...props}
    />
  )
}
