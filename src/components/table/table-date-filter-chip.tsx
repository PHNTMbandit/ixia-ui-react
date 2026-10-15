import { FunnelIcon } from '@phosphor-icons/react'
import type { RowData } from '@tanstack/react-table'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import {
  Popover,
  PopoverTrigger,
  PopoverPanel,
  PopoverHeader,
  PopoverContent,
  PopoverTitle,
} from '../popover'
import { TableDateFilterForm } from './table-date-filter-form'
import { useTableContext } from './table-feature-context'
import { defaultFilterOperatorLabels } from './table.types'
import type { TableDateFilterChipProps } from './table.types'
import { asFilterValue, getColumnHeaderLabel } from './table.utils'
import type { DateFilterValue } from './table.utils'

const FIRST_DATE_INDEX = 0,
  LAST_DATE_INDEX = 1

function getDateFilterLabel(date: DateFilterValue['date'] | string): string {
  if (Array.isArray(date)) {
    if (date[LAST_DATE_INDEX] !== '') {
      return date.join(' - ')
    }
    return date[FIRST_DATE_INDEX]
  }
  return date
}

export function TableDateFilterChip<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableDateFilterChipProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    columnFilter = asFilterValue<DateFilterValue>(column.getFilterValue())

  return (
    <Popover key={column.id}>
      <PopoverTrigger className={cn('', className)} ref={ref} {...props}>
        <Button tone="neutral" size="extraSmall" variant="soft">
          <FunnelIcon />
          <span>{getColumnHeaderLabel(column)}</span>
          <span className="lowercase">
            {filterOperatorLabels?.[columnFilter.operator] ??
              defaultFilterOperatorLabels[columnFilter.operator]}
          </span>
          <span>{getDateFilterLabel(columnFilter.date)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverPanel>
        <PopoverHeader>
          <PopoverTitle>{getColumnHeaderLabel(column)}</PopoverTitle>
          <PopoverContent>
            {children}
            <TableDateFilterForm column={column} />
          </PopoverContent>
        </PopoverHeader>
      </PopoverPanel>
    </Popover>
  )
}
