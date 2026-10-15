import { cn } from '@/utils/cn'

import type { NavBarItemIconProps } from './nav-bar.types'

export function NavBarItemIcon({ className, ref, ...props }: NavBarItemIconProps) {
  return <div className={cn('', className)} ref={ref} {...props} />
}
