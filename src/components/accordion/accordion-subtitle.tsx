import { cn } from '@/utils/cn'

import type { AccordionSubtitleProps } from './accordion.types'

export function AccordionSubtitle({ className, ref, ...props }: AccordionSubtitleProps) {
  return (
    <div
      data-slot="accordion-subtitle"
      className={cn('text-left style-text-prose--1 transition-colors', className)}
      ref={ref}
      {...props}
    />
  )
}
