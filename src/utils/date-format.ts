type DateInput = Date | number | string

type RelativeTimeUnit = Extract<
  Intl.RelativeTimeFormatUnit,
  'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'
>

interface DateRange {
  start: DateInput
  end: DateInput
}

interface RelativeTimeOptions extends Intl.RelativeTimeFormatOptions {
  now?: DateInput
  unit?: RelativeTimeUnit
}

interface RelativeTimeValue {
  unit: RelativeTimeUnit
  value: number
}

const MILLISECONDS_PER_SECOND = 1000,
  ZERO = 0,
  UNIT_SECONDS: Record<RelativeTimeUnit, number> = {
    day: 86_400,
    hour: 3600,
    minute: 60,
    month: 2_629_800,
    quarter: 7_889_400,
    second: 1,
    week: 604_800,
    year: 31_557_600,
  },
  AUTO_UNITS = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'] as const,
  dateTimeFormatCache = new Map<string, Intl.DateTimeFormat>(),
  relativeTimeFormatCache = new Map<string, Intl.RelativeTimeFormat>(),
  getCacheKey = (locale: Intl.LocalesArgument, options: object | undefined): string =>
    `${String(locale ?? '')}|${JSON.stringify(options ?? {})}`,
  toDate = (value: DateInput): Date => {
    if (value instanceof Date) {
      return value
    }

    return new Date(value)
  },
  isValidDate = (value: unknown): value is Date =>
    value instanceof Date && !Number.isNaN(value.getTime()),
  toValidDate = (value: DateInput, name = 'date'): Date => {
    const date = toDate(value)

    if (!isValidDate(date)) {
      throw new RangeError(`Invalid ${name}: ${String(value)}`)
    }

    return date
  },
  getDateTimeFormat = (
    locale?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): Intl.DateTimeFormat => {
    const key = getCacheKey(locale, options),
      formatter = dateTimeFormatCache.get(key) ?? new Intl.DateTimeFormat(locale, options)

    dateTimeFormatCache.set(key, formatter)
    return formatter
  },
  getRelativeTimeFormat = (
    locale?: Intl.LocalesArgument,
    options?: Intl.RelativeTimeFormatOptions,
  ): Intl.RelativeTimeFormat => {
    const key = getCacheKey(locale, options),
      formatter = relativeTimeFormatCache.get(key) ?? new Intl.RelativeTimeFormat(locale, options)

    relativeTimeFormatCache.set(key, formatter)
    return formatter
  },
  formatDate = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): string => getDateTimeFormat(locale, options).format(toValidDate(date)),
  formatTime = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    options: Intl.DateTimeFormatOptions = { timeStyle: 'short' },
  ): string => formatDate(date, locale, options),
  formatDateTime = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' },
  ): string => formatDate(date, locale, options),
  formatDateToParts = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): Intl.DateTimeFormatPart[] =>
    getDateTimeFormat(locale, options).formatToParts(toValidDate(date)),
  formatDateRange = (
    { start, end }: DateRange,
    locale?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): string =>
    getDateTimeFormat(locale, options).formatRange(
      toValidDate(start, 'start date'),
      toValidDate(end, 'end date'),
    ),
  formatDateRangeToParts = (
    { start, end }: DateRange,
    locale?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
  ): Intl.DateTimeRangeFormatPart[] =>
    getDateTimeFormat(locale, options).formatRangeToParts(
      toValidDate(start, 'start date'),
      toValidDate(end, 'end date'),
    ),
  getRelativeTimeUnit = (seconds: number): RelativeTimeUnit => {
    const absolute = Math.abs(seconds)
    return AUTO_UNITS.find((unit) => absolute >= UNIT_SECONDS[unit]) ?? 'second'
  },
  getRelativeTimeValue = (
    date: DateInput,
    { now = Date.now(), unit }: Pick<RelativeTimeOptions, 'now' | 'unit'> = {},
  ): RelativeTimeValue => {
    const seconds =
        (toValidDate(date).getTime() - toValidDate(now, 'reference date').getTime()) /
        MILLISECONDS_PER_SECOND,
      resolvedUnit = unit ?? getRelativeTimeUnit(seconds),
      value = Math.round(seconds / UNIT_SECONDS[resolvedUnit]) || ZERO

    return { unit: resolvedUnit, value }
  },
  formatRelativeTime = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    { now, unit, ...options }: RelativeTimeOptions = {},
  ): string => {
    const relative = getRelativeTimeValue(date, { now, unit })
    return getRelativeTimeFormat(locale, { numeric: 'auto', ...options }).format(
      relative.value,
      relative.unit,
    )
  },
  formatRelativeTimeToParts = (
    date: DateInput,
    locale?: Intl.LocalesArgument,
    { now, unit, ...options }: RelativeTimeOptions = {},
  ): Intl.RelativeTimeFormatPart[] => {
    const relative = getRelativeTimeValue(date, { now, unit })
    return getRelativeTimeFormat(locale, { numeric: 'auto', ...options }).formatToParts(
      relative.value,
      relative.unit,
    )
  },
  getTimeZone = (): string => getDateTimeFormat().resolvedOptions().timeZone

export type { DateInput, DateRange, RelativeTimeOptions, RelativeTimeUnit, RelativeTimeValue }
export {
  formatDate,
  formatDateRange,
  formatDateRangeToParts,
  formatDateTime,
  formatDateToParts,
  formatRelativeTime,
  formatRelativeTimeToParts,
  formatTime,
  getDateTimeFormat,
  getRelativeTimeFormat,
  getRelativeTimeUnit,
  getRelativeTimeValue,
  getTimeZone,
  isValidDate,
  toDate,
}
