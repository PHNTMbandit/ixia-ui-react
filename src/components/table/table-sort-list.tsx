import { cn } from '@/utils/cn'

import { useTableContext } from './table-feature-context'
import { TableSortChip } from './table-sort-chip'
import type { TableSortListProps } from './table.types'

export function TableSortList({ className, children, ref, ...props }: TableSortListProps) {
  const table = useTableContext()

  if (!table.getAllColumns().some((column) => column.getIsSorted())) {
    return undefined
  }

  return (
    <table.Subscribe selector={(state) => state.sorting}>
      {() => (
        <div className={cn('flex flex-wrap items-center gap-xs', className)} ref={ref} {...props}>
          {children}
          {table.getAllColumns().map((column) => {
            if (!column.getIsSorted()) {
              return undefined
            }

            return <TableSortChip key={column.id} column={column} />
          })}
        </div>
      )}
    </table.Subscribe>
  )
}
