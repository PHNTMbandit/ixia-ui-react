import { cn } from '@/utils/cn'

import type { PopoverContentProps } from './popover.types'

export function PopoverContent({ className, ref, ...props }: PopoverContentProps) {
  return <div className={cn('space-y-3xs', className)} ref={ref} {...props} />
}
