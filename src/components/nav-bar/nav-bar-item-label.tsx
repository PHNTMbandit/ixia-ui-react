import { cn } from '@/utils/cn'

import type { NavBarItemLabelProps } from './nav-bar.types'

export function NavBarItemLabel({ className, ref, ...props }: NavBarItemLabelProps) {
  return <span className={cn('', className)} ref={ref} {...props} />
}
