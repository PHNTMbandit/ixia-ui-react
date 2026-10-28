import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import type { CalendarPreviousMonthButtonProps } from './calendar.types'

export function CalendarPreviousMonthButton({
  className,
  children,
  ...props
}: CalendarPreviousMonthButtonProps) {
  return (
    <Button {...props} variant="ghost" tone="neutral" size="small" className={cn('', className)}>
      {children ?? <Icon name="chevronLeft" />}
    </Button>
  )
}
