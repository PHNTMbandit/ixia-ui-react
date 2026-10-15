import { cn } from '@/utils/cn'

import type { PopoverHeaderProps } from './popover.types'

export function PopoverHeader({ className, ref, ...props }: PopoverHeaderProps) {
  return <div className={cn('flex flex-col pb-xs', className)} ref={ref} {...props} />
}
