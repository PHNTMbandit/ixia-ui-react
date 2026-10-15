import { cn } from '@/utils/cn'

import type { AccordionIconProps } from './accordion.types'

export function AccordionIcon({ className, ref, ...props }: AccordionIconProps) {
  return (
    <div
      data-slot="accordion-icon"
      className={cn(
        'col-start-1 row-start-1 self-center transition-colors [&>svg]:size-md',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
