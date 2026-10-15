import { cn } from '@/utils/cn'

import type { SidebarGroupProps } from './sidebar.types'

export function SidebarGroup({ className, ref, ...props }: SidebarGroupProps) {
  return (
    <div
      className={cn('flex w-full flex-col items-start gap-3xs not-last-of-type:pb-md', className)}
      ref={ref}
      {...props}
    />
  )
}
