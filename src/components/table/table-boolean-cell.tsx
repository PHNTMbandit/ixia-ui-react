import { useCellContext } from './table-feature-context'
import type { TableBooleanCellProps } from './table.types'

export function TableBooleanCell({
  trueLabel = 'Yes',
  falseLabel = 'No',
  children,
  ...props
}: TableBooleanCellProps) {
  const cell = useCellContext<boolean | null | undefined>(),
    value = cell.getValue()

  if (value === undefined || value === null) {
    return undefined
  }

  return (
    <span {...props}>
      {children}
      {value && trueLabel}
      {!value && falseLabel}
    </span>
  )
}
