import { useCellContext } from './table-feature-context'
import type { TablePercentCellProps } from './table.types'

export function TablePercentCell({ locale, options, children, ...props }: TablePercentCellProps) {
  const cell = useCellContext<number | null | undefined>(),
    value = cell.getValue()

  if (value === undefined || value === null) {
    return undefined
  }

  return (
    <span {...props}>
      {children}
      {new Intl.NumberFormat(locale, { ...options, style: 'percent' }).format(value)}
    </span>
  )
}
