import { cn } from '@/utils/cn'

import type { AccordionTitleProps } from './accordion.types'

export function AccordionTitle({ className, ref, ...props }: AccordionTitleProps) {
  return (
    <div
      data-slot="accordion-title"
      className={cn(
        'text-left style-text-strong-0 transition-colors [&:not(:has(~_[data-slot=accordion-subtitle]))]:leading-0',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
