import { SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react'
import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useTableContext } from './table-feature-context'
import { TableSortMenu } from './table-sort-menu'
import type { TableSortChipProps } from './table.types'
import { getColumnHeaderLabel } from './table.utils'

export function TableSortChip<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableSortChipProps<TData>) {
  const table = useTableContext(),
    columnSort = column.getIsSorted(),
    buttonLabels = table.options.meta?.translations?.buttonLabels ?? {},
    ascendingLabel = buttonLabels.ascending ?? 'Ascending',
    descendingLabel = buttonLabels.descending ?? 'Descending'

  if (!columnSort) {
    return undefined
  }

  return (
    <TableSortMenu className={cn('', className)} ref={ref} {...props}>
      <Button tone="neutral" size="extraSmall" variant="soft">
        {columnSort === 'asc' && <SortDescendingIcon />}
        {columnSort === 'desc' && <SortAscendingIcon />}
        <span>{getColumnHeaderLabel(column)}</span>
        <span className="font-light lowercase">
          {columnSort === 'asc' && ascendingLabel}
          {columnSort === 'desc' && descendingLabel}
        </span>
        {children}
      </Button>
    </TableSortMenu>
  )
}
