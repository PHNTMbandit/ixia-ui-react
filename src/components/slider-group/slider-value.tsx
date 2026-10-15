import { cn } from '@/utils/cn'

import { getPrimaryValue, useSliderGroupContext } from './slider-group-context'
import type { SliderValueProps } from './slider-group.types'

export function SliderValue({ className, children, ref, ...props }: SliderValueProps) {
  const group = useSliderGroupContext()
  if (!group) {
    return undefined
  }

  return (
    <span
      data-slot="slider-value"
      className={cn('min-w-lg text-right style-text-default--1 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    >
      {children}
      {getPrimaryValue(group.value, group.min)}
    </span>
  )
}
