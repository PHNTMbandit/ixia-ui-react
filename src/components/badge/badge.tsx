import { cn } from '@/utils/cn'

import { badgeVariants } from './badge.types'
import type { BadgeProps } from './badge.types'

export function Badge({ className, size, tone, variant, ref, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ className, size, tone, variant }))} ref={ref} {...props} />
  )
}
