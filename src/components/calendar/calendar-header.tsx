import { cn } from '@/utils/cn'

import type { CalendarHeaderProps } from './calendar.types'

export function CalendarHeader({ className, children, ref, ...props }: CalendarHeaderProps) {
  return (
    <div className={cn('', className)} ref={ref} {...props}>
      {children}
    </div>
  )
}
