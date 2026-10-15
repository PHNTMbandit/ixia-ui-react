export const formatDate = (
  date: Date,
  locale?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
): string => new Intl.DateTimeFormat(locale, options).format(date)
