import { cn } from '@/utils/cn'

import { TableDateFilterChip } from './table-date-filter-chip'
import { useTableContext } from './table-feature-context'
import { TableNumberFilterChip } from './table-number-filter-chip'
import { TableSelectFilterChip } from './table-select-filter-chip'
import { TableStringFilterChip } from './table-string-filter-chip'
import type { TableFilterListProps } from './table.types'

export function TableFilterList({ className, children, ref, ...props }: TableFilterListProps) {
  const table = useTableContext()

  return (
    <table.Subscribe selector={(state) => state.columnFilters}>
      {() => {
        if (!table.getAllColumns().some((column) => column.getIsFiltered())) {
          return undefined
        }

        return (
          <div className={cn('flex flex-wrap items-center gap-xs', className)} ref={ref} {...props}>
            {children}
            {table.getAllColumns().map((column) => {
              if (!column.getIsFiltered()) {
                return undefined
              }

              switch (column.columnDef.meta?.filterVariant) {
                case 'date': {
                  return <TableDateFilterChip key={column.id} column={column} />
                }
                case 'number': {
                  return <TableNumberFilterChip key={column.id} column={column} />
                }
                case 'select': {
                  return <TableSelectFilterChip key={column.id} column={column} />
                }
                case 'string': {
                  return <TableStringFilterChip key={column.id} column={column} />
                }
                default: {
                  return undefined
                }
              }
            })}
          </div>
        )
      }}
    </table.Subscribe>
  )
}
