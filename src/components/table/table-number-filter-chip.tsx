import { FunnelIcon } from '@phosphor-icons/react'
import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverPanel,
  PopoverTitle,
  PopoverTrigger,
} from '../popover'
import { useTableContext } from './table-feature-context'
import { TableNumberFilterForm } from './table-number-filter-form'
import { defaultFilterOperatorLabels } from './table.types'
import type { TableNumberFilterChipProps } from './table.types'
import { asFilterValue, getColumnHeaderLabel } from './table.utils'
import type { NumberFilterValue } from './table.utils'

const FIRST_RANGE_INDEX = 0

function getFilterDisplayValue(filterValue: NumberFilterValue): string {
  if (filterValue.operator === 'between') {
    return filterValue.number.filter(Boolean).join(' - ')
  }
  return filterValue.number[FIRST_RANGE_INDEX]
}

export function TableNumberFilterChip<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableNumberFilterChipProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    columnFilter = asFilterValue<NumberFilterValue>(column.getFilterValue()),
    filterValue = getFilterDisplayValue(columnFilter)

  return (
    <Popover>
      <PopoverTrigger className={cn('', className)} ref={ref} {...props}>
        <Button tone="neutral" size="extraSmall" variant="soft">
          <FunnelIcon />
          <span>{getColumnHeaderLabel(column)}</span>
          <span className="font-light lowercase">
            {filterOperatorLabels?.[columnFilter.operator] ??
              defaultFilterOperatorLabels[columnFilter.operator]}
          </span>
          <span>{filterValue}</span>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverPanel>
        <PopoverHeader>
          <PopoverTitle>{getColumnHeaderLabel(column)}</PopoverTitle>
        </PopoverHeader>
        <PopoverContent>
          <TableNumberFilterForm column={column} />
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
