import { formatDate } from '@/utils'
import { cn } from '@/utils/cn'

import { useCellContext } from './table-feature-context'
import type { TableDateCellProps } from './table.types'

export function TableDateTimeCell({
  locale,
  options,
  className,
  children,
  ref,
  ...props
}: TableDateCellProps) {
  const cell = useCellContext<Date | undefined>(),
    date = cell.getValue()

  if (!date) {
    return undefined
  }

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {formatDate(date, locale, options)}
    </span>
  )
}
