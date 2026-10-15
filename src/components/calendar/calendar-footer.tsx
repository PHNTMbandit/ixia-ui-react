import { cn } from '@/utils/cn'

import type { CalendarFooterProps } from './calendar.types'

export function CalendarFooter({ className, children, ref, ...props }: CalendarFooterProps) {
  return (
    <div
      data-slot="calendar-footer"
      className={cn('mt-xs flex flex-col gap-3xs border-t border-border pt-xs', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
