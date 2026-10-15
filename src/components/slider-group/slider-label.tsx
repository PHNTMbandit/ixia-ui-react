import { cn } from '@/utils/cn'

import type { SliderLabelProps } from './slider-group.types'

export function SliderLabel({ className, ref, ...props }: SliderLabelProps) {
  return (
    <span
      data-slot="slider-label"
      className={cn('style-text-default-0', className)}
      ref={ref}
      {...props}
    />
  )
}
