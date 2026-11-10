import { cn } from '@/utils/cn'

import type { AccordionIconProps } from './accordion.types'

export function AccordionIcon({ className, ref, ...props }: AccordionIconProps) {
  return (
    <div
      data-slot="accordion-icon"
      className={cn(
        'col-start-1 row-start-1 flex shrink-0 items-center justify-center self-center transition-colors [:where(&)>svg]:size-(--accordion-icon-size,var(--spacing-md))',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
