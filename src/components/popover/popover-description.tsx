import { Popover as BasePopover } from '@base-ui/react/popover'

import { cn } from '@/utils/cn'

import type { PopoverDescriptionProps } from './popover.types'

export function PopoverDescription({ className, ref, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn('style-text-prose--1', className)}
      ref={ref}
      {...props}
    />
  )
}
