import { cn } from '@/utils/cn'

import type { SidebarGroupContentProps } from './sidebar.types'

export function SidebarGroupContent({ className, ref, ...props }: SidebarGroupContentProps) {
  return <div className={cn('flex w-full flex-col gap-3xs', className)} ref={ref} {...props} />
}
