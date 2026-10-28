import { cn } from '@/utils'

import type { AccordionHeaderContentProps } from './accordion.types'

export function AccordionHeaderContent({
  className,
  children,
  ref,
  ...props
}: AccordionHeaderContentProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min items-center gap-x-sm has-data-[slot=accordion-icon]:grid-cols-[auto_1fr] has-data-[slot=accordion-subtitle]:grid-rows-[auto_auto] has-data-[slot=accordion-subtitle]:**:data-[slot=accordion-icon]:row-span-2',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
