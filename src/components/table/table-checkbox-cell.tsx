import { cn } from '@/utils/cn'

import { Checkbox } from '../checkbox'
import { useCellContext, useTableContext } from './table-feature-context'
import type { TableCheckboxCellProps } from './table.types'

export function TableCheckboxCell({ className, ref, ...props }: TableCheckboxCellProps) {
  const cell = useCellContext(),
    table = useTableContext(),
    { row } = cell

  return (
    <table.Subscribe selector={(state) => state.rowSelection}>
      {() => (
        <Checkbox
          aria-label="Select row"
          checked={
            row.getIsSelected() || (row.getCanSelectSubRows() && row.getIsAllSubRowsSelected())
          }
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
          className={cn('', className)}
          ref={ref}
          {...props}
        />
      )}
    </table.Subscribe>
  )
}
