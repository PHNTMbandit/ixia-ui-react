import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import type { CalendarNextMonthButtonProps } from './calendar.types'

export function CalendarNextMonthButton({
  className,
  children,
  ...props
}: CalendarNextMonthButtonProps) {
  return (
    <Button variant="ghost" tone="neutral" size="small" className={cn('', className)} {...props}>
      {children ?? <Icon name="chevronRight" />}
    </Button>
  )
}
