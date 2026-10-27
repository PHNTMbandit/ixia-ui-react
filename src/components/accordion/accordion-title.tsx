import { cn } from '@/utils/cn'

import type { AccordionTitleProps } from './accordion.types'

export function AccordionTitle({ className, ref, ...props }: AccordionTitleProps) {
  return (
    <div
      data-slot="accordion-title"
      className={cn(
        'text-left font-heading text-base font-bold transition-colors [&:has(~_[data-slot=accordion-subtitle])]:leading-[1.2] [&:not(:has(~_[data-slot=accordion-subtitle]))]:leading-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
