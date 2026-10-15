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
import { TableStringFilterForm } from './table-string-filter-form'
import { defaultFilterOperatorLabels } from './table.types'
import type { TableStringFilterChipProps } from './table.types'
import { asFilterValue, getColumnHeaderLabel } from './table.utils'
import type { StringFilterValue } from './table.utils'

export function TableStringFilterChip<TData extends RowData>({
  column,
  className,
  children,
  ref,
  ...props
}: TableStringFilterChipProps<TData>) {
  const table = useTableContext(),
    filterOperatorLabels = table.options.meta?.translations?.filterOperatorLabels,
    columnFilter = asFilterValue<StringFilterValue>(column.getFilterValue())

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
          <span>{columnFilter.value}</span>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverPanel>
        <PopoverHeader>
          <PopoverTitle>{getColumnHeaderLabel(column)}</PopoverTitle>
        </PopoverHeader>
        <PopoverContent>
          <TableStringFilterForm column={column} />
        </PopoverContent>
      </PopoverPanel>
    </Popover>
  )
}
