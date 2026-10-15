import { cn } from '@/utils/cn'

import type { DrawerHeaderProps } from './drawer.types'

export function DrawerHeader({ className, ref, ...props }: DrawerHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between pb-sm', className)} ref={ref} {...props} />
  )
}
