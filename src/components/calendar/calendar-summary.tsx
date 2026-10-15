import { isDateRange } from '@daypicker/react'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/date-time'

import { useCalendar } from './calendar'
import type { CalendarSummaryProps } from './calendar.types'

const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
  formatCalendarDate = (date: Date) => formatDate(date, 'en-US', dateFormatOptions)

export function CalendarSummary({ className, children, ref, ...props }: CalendarSummaryProps) {
  const { state } = useCalendar()
  let formattedDate: string | undefined = undefined

  if (state.selectedDates instanceof Date) {
    formattedDate = formatCalendarDate(state.selectedDates)
  }

  if (isDateRange(state.selectedDates)) {
    const { from: startDate, to: endDate } = state.selectedDates
    if (startDate && endDate) {
      formattedDate = `${formatCalendarDate(startDate)} - ${formatCalendarDate(endDate)}`
    }
  }

  return (
    <div className={cn('flex flex-col', className)} ref={ref} {...props}>
      <span className="style-text-strong-1">{formatCalendarDate(new Date())}</span>
      <span className="style-text-strong-0">{formattedDate}</span>
      {children}
    </div>
  )
}
