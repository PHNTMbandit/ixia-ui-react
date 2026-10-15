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
import { TableSelectFilterForm } from './table-select-filter-form'
import type { TableSelectFilterChipProps, TableSelectFilterValue } from './table.types'
import { asFilterValue, getColumnHeaderLabel } from './table.utils'

export function TableSelectFilterChip<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableSelectFilterChipProps<TData>) {
  const columnFilter = asFilterValue<TableSelectFilterValue>(column.getFilterValue()),
    header = getColumnHeaderLabel(column)

  return (
    <Popover>
      <PopoverTrigger className={cn('', className)} ref={ref} {...props}>
        <Button tone="neutral" size="extraSmall" variant="soft">
          <FunnelIcon />
          <span>{header}</span>
          <span className="font-light lowercase">{columnFilter.map(String).join(', ')}</span>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverPanel>
        <PopoverHeader>
          <PopoverTitle>{header}</PopoverTitle>
        </PopoverHeader>
        <PopoverContent>
          <TableSelectFilterForm column={column} />
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
