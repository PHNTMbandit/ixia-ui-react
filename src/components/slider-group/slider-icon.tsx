import { cn } from '@/utils/cn'

import type { SliderIconProps } from './slider-group.types'

export function SliderIcon({ className, ref, ...props }: SliderIconProps) {
  return (
    <div
      data-slot="slider-icon"
      className={cn('[&>svg]:shrink-0 [:where(&)>svg]:size-sm', className)}
      ref={ref}
      {...props}
    />
  )
}
