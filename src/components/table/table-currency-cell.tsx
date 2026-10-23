import { useCellContext } from './table-feature-context'
import type { TableCurrencyCellProps } from './table.types'

export function TableCurrencyCell({
  currency,
  locale,
  options,
  children,
  ...props
}: TableCurrencyCellProps) {
  const cell = useCellContext<number | null | undefined>(),
    value = cell.getValue()

  if (value === undefined || value === null) {
    return undefined
  }

  return (
    <span {...props}>
      {children}
      {new Intl.NumberFormat(locale, { ...options, currency, style: 'currency' }).format(value)}
    </span>
  )
}
