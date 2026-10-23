import { Meter } from '../meter'
import { useCellContext } from './table-feature-context'
import type { TableProgressCellProps } from './table.types'

export function TableProgressCell({
  showValue = true,
  children,
  ...props
}: TableProgressCellProps) {
  const cell = useCellContext<number | null | undefined>(),
    value = cell.getValue()

  if (value === undefined || value === null) {
    return undefined
  }

  return (
    <Meter orientation="horizontal" aria-label="Progress" {...props} value={value}>
      <Meter.Track>
        <Meter.Indicator />
      </Meter.Track>
      {showValue && <Meter.Value />}
      {children}
    </Meter>
  )
}
