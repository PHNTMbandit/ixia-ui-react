import { cn } from '@/utils/cn'

import { calendarPanelVariants } from './calendar.types'
import type { CalendarPanelProps } from './calendar.types'

export function CalendarPanel({ variant, className, children, ref, ...props }: CalendarPanelProps) {
  return (
    <div className={cn(calendarPanelVariants({ variant }), className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
