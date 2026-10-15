import { cn } from '@/utils/cn'

import type { SliderDescriptionProps } from './slider-group.types'

export function SliderDescription({ className, ref, ...props }: SliderDescriptionProps) {
  return (
    <p
      data-slot="slider-description"
      className={cn('style-text-prose--1 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
