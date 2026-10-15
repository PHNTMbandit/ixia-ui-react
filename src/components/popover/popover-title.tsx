import { Popover as BasePopover } from '@base-ui/react/popover'

import { cn } from '@/utils/cn'

import type { PopoverTitleProps } from './popover.types'

export function PopoverTitle({ className, ref, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={cn('flex items-center gap-2xs style-text-strong-0 [&>svg]:size-sm', className)}
      ref={ref}
      {...props}
    />
  )
}
