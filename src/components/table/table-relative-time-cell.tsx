import { useState } from 'react'

import { useCellContext } from './table-feature-context'
import type { TableRelativeTimeCellProps } from './table.types'

const MILLISECONDS_PER_SECOND = 1000,
  ZERO = 0,
  SECONDS_PER_SECOND = 1,
  SECONDS_PER_MINUTE = 60,
  SECONDS_PER_HOUR = 3600,
  SECONDS_PER_DAY = 86_400,
  SECONDS_PER_WEEK = 604_800,
  SECONDS_PER_MONTH = 2_592_000,
  SECONDS_PER_YEAR = 31_536_000,
  RELATIVE_TIME_UNITS = [
    ['year', SECONDS_PER_YEAR],
    ['month', SECONDS_PER_MONTH],
    ['week', SECONDS_PER_WEEK],
    ['day', SECONDS_PER_DAY],
    ['hour', SECONDS_PER_HOUR],
    ['minute', SECONDS_PER_MINUTE],
    ['second', SECONDS_PER_SECOND],
  ] as const

function formatRelativeTime(
  date: Date,
  now: Date,
  { locale, options }: Pick<TableRelativeTimeCellProps, 'locale' | 'options'>,
) {
  const seconds = (date.getTime() - now.getTime()) / MILLISECONDS_PER_SECOND,
    [unit, divisor] =
      RELATIVE_TIME_UNITS.find(([, duration]) => Math.abs(seconds) >= duration) ??
      (['second', SECONDS_PER_SECOND] as const),
    amount = Math.round(seconds / divisor) || ZERO

  return new Intl.RelativeTimeFormat(locale, { numeric: 'auto', ...options }).format(amount, unit)
}

export function TableRelativeTimeCell({
  locale,
  options,
  now,
  children,
  ...props
}: TableRelativeTimeCellProps) {
  const cell = useCellContext<Date | null | undefined>(),
    date = cell.getValue(),
    // oxlint-disable-next-line react/hook-use-state -- Keep a fixed mount-time reference unless now is supplied.
    [mountedAt] = useState(() => new Date()),
    referenceDate = now ?? mountedAt

  if (!date) {
    return undefined
  }

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  if (Number.isNaN(referenceDate.getTime())) {
    throw new RangeError('TableRelativeTimeCell requires a valid now date')
  }

  return (
    <time dateTime={date.toISOString()} title={date.toLocaleString(locale)} {...props}>
      {children}
      {formatRelativeTime(date, referenceDate, { locale, options })}
    </time>
  )
}
